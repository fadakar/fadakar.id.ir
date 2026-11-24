import { useEffect, useRef, type RefObject } from 'react';

type Point = { x: number; y: number };
type Sample = Point & { distance: number };
type Bounds = { left: number; top: number; right: number; bottom: number };
type Route = {
  line: SVGPathElement;
  original: string;
  baseLength: number;
  brokerDistance: number;
  length: number;
  samples: Sample[];
  bent: boolean;
  near: boolean;
  side: number;
};
type Phase = 'inbound' | 'storing' | 'outbound' | 'resting';
type Journey = { phase: Phase; progress: number };

const phases: Phase[] = ['inbound', 'storing', 'outbound', 'resting'];

// Stagger the vertical runs so neighbouring service bindings remain distinguishable.
function branchPath(start: Point, end: Point, track: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const move = `M${start.x},${start.y}`;
  if (Math.abs(dx) < 0.5 || Math.abs(dy) < 0.5) return `${move} L${end.x},${end.y}`;
  const turn = start.x + dx * track;
  const radius = Math.min(
    5,
    Math.abs(dy) / 2,
    Math.abs(turn - start.x) / 2,
    Math.abs(end.x - turn) / 2,
  );
  const rx = Math.sign(dx) * radius;
  const ry = Math.sign(dy) * radius;
  return [
    `${move} H${turn - rx}`,
    `Q${turn},${start.y} ${turn},${start.y + ry}`,
    `V${end.y - ry} Q${turn},${end.y} ${turn + rx},${end.y}`,
    `H${end.x}`,
  ].join(' ');
}

function measureRoute(line: SVGPathElement, first: string, second: string, broker: Point): Route {
  line.setAttribute('d', first);
  const brokerDistance = line.getTotalLength();
  const original = first + ' ' + second;
  line.setAttribute('d', original);
  const length = line.getTotalLength();
  const samples: Sample[] = [];
  // Put a sample exactly at the common port, even when it falls between regular samples.
  for (const [from, to] of [
    [0, brokerDistance],
    [brokerDistance, length],
  ]) {
    const count = Math.max(1, Math.ceil((to - from) / 3));
    for (let i = samples.length ? 1 : 0; i <= count; i++) {
      const distance = i === count ? to : from + (i * (to - from)) / count;
      const { x, y } = distance === brokerDistance ? broker : line.getPointAtLength(distance);
      samples.push({ x, y, distance });
    }
  }
  return {
    line,
    original,
    baseLength: length,
    brokerDistance,
    length,
    samples,
    bent: false,
    near: false,
    side: 1,
  };
}

function restoreRoute(route: Route) {
  if (route.bent) route.line.setAttribute('d', route.original);
  route.bent = false;
  route.length = route.baseLength;
}

function deflect(
  route: Route,
  obstacle: Point | null,
  clearance: number,
  reading: Bounds[],
  animate: boolean,
) {
  const { samples } = route;
  // On narrow phones the ports can be close together. Both ends must stay anchored.
  const radius = Math.min(clearance, route.baseLength / 3.5);
  let gap = radius;
  let nearest = -1;
  if (obstacle) {
    for (let i = 1; i < samples.length - 1; i++) {
      if (samples[i].distance === route.brokerDistance) continue;
      const d = Math.hypot(samples[i].x - obstacle.x, samples[i].y - obstacle.y);
      if (d < gap) {
        gap = d;
        nearest = i;
      }
    }
  }
  route.near = nearest >= 0;
  if (!obstacle || !route.near || !animate) {
    restoreRoute(route);
    return;
  }
  const center = samples[nearest];
  const dx = samples[nearest + 1].x - samples[nearest - 1].x;
  const dy = samples[nearest + 1].y - samples[nearest - 1].y;
  const magnitude = Math.hypot(dx, dy) || 1;
  const nx = -dy / magnitude;
  const ny = dx / magnitude;
  const offset = (obstacle.x - center.x) * nx + (obstacle.y - center.y) * ny;
  if (!route.bent || Math.abs(offset) > 3) route.side = offset > 0 ? -1 : 1;
  const clearanceHeight = route.side * (radius + 4);
  const weights = samples.map((point) => {
    const t = Math.min(1, Math.abs(point.distance - center.distance) / (radius * 3.15));
    const ends = Math.min(
      1,
      point.distance / radius,
      Math.abs(point.distance - route.brokerDistance) / radius,
      (route.baseLength - point.distance) / radius,
    );
    return (ends * (1 + Math.cos(t * Math.PI))) / 2;
  });
  const preferred = offset + clearanceHeight;
  const opposite = offset - clearanceHeight;
  // Choose a clear bypass before drawing it; the text bounds are cached on layout changes.
  const height = [preferred, opposite, preferred / 2, opposite / 2].find((candidate) =>
    samples.every((point, i) => {
      if (!weights[i]) return true;
      const x = point.x + nx * candidate * weights[i];
      const y = point.y + ny * candidate * weights[i];
      return !reading.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
    }),
  );
  if (height === undefined) {
    restoreRoute(route);
    return;
  }
  route.side = Math.sign(height - offset) || route.side;
  const detour = samples.map((point, i) => {
    const bend = height * weights[i];
    return `${i ? 'L' : 'M'}${(point.x + nx * bend).toFixed(2)},${(point.y + ny * bend).toFixed(2)}`;
  });
  route.line.setAttribute('d', detour.join(' '));
  route.length = route.line.getTotalLength();
  route.bent = true;
}

function placePacket(
  packet: SVGGElement,
  line: SVGPathElement,
  length: number,
  progress: number,
  minimumOpacity = 0,
) {
  const distance = progress * length;
  const point = line.getPointAtLength(distance);
  const ahead = line.getPointAtLength(Math.min(length, distance + 0.8));
  const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  packet.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
  packet.style.opacity = String(
    Math.max(minimumOpacity, Math.min(1, distance / 5, (length - distance) / 8)),
  );
}

export function usePacketMotion(field: RefObject<SVGSVGElement | null>, paused: boolean) {
  const playback = useRef({ paused, refresh: () => {} });
  useEffect(() => {
    playback.current.paused = paused;
    playback.current.refresh();
  }, [paused]);

  useEffect(() => {
    const controls = playback.current;
    const svg = field.current;
    const map = svg?.parentElement;
    if (!svg || !map) return;
    const lines = svg.querySelectorAll<SVGPathElement>('.packet-lane');
    const packets = svg.querySelectorAll<SVGGElement>('.packet-train');
    const ingress = map.querySelector(".message-broker[data-side='in'] .broker-port");
    const egress = map.querySelector(".message-broker[data-side='out'] .broker-port");
    if (!ingress || !egress) return;
    const obstacleMark = svg.querySelector<SVGCircleElement>('.packet-obstacle');
    const deliveryNote = map.querySelector<HTMLElement>('.delivery-note');
    const rows = Array.from(map.querySelectorAll<HTMLElement>('.flow-row')).flatMap((row, i) => {
      const source = row.querySelector('.producer .node-port');
      const entry = row.querySelector('.store-in');
      const exit = row.querySelector('.store-out');
      const sink = row.querySelector('.consumer .node-port');
      const producer = row.querySelector('.producer');
      const consumer = row.querySelector('.consumer');
      if (
        !producer ||
        !consumer ||
        !source ||
        !entry ||
        !exit ||
        !sink ||
        !lines[i * 2 + 1] ||
        !packets[i]
      )
        return [];
      const journey: Journey = {
        phase: i === 1 ? 'outbound' : 'inbound',
        progress: [0.14, 0.23, 0.6][i] ?? 0,
      };
      return [
        {
          row,
          source,
          producer,
          consumer,
          entry,
          exit,
          sink,
          packet: packets[i],
          journey,
          lines: [lines[i * 2], lines[i * 2 + 1]],
          routes: [] as Route[],
        },
      ];
    });
    if (!rows.length) return;

    const orbit = rows[0].row.querySelector<SVGPathElement>('.portrait-route');
    const arrival = rows[0].row.querySelector<SVGGElement>('.portrait-packet');
    const orbitLength = orbit?.getTotalLength() ?? 0;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 640px)');
    let frame = 0;
    let lastTime = 0;
    let visible = true;
    let disposed = false;
    let layoutDirty = true;
    let cursorDirty = true;
    let cursor: Point | null = null;
    let reading: Bounds[] = [];

    const measure = () => {
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const toLocal = matrix.inverse();
      const local = (x: number, y: number) => new DOMPoint(x, y).matrixTransform(toLocal);
      const center = (el: Element) => {
        const r = el.getBoundingClientRect();
        return local(r.x + r.width / 2, r.y + r.height / 2);
      };
      reading = [];
      for (const text of map.querySelectorAll(
        '.record-value, .object-caption, .endpoint-label, .broker-label, .database-key',
      )) {
        const range = document.createRange();
        const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent?.trim()) continue;
          range.selectNodeContents(walker.currentNode);
          for (const box of range.getClientRects()) {
            const { x: left, y: top } = local(box.left - 5, box.top - 5);
            const { x: right, y: bottom } = local(box.right + 5, box.bottom + 5);
            reading.push({ left, right, top, bottom });
          }
        }
      }
      const hubs = [center(ingress), center(egress)];
      rows.forEach((row, index) => {
        const track = 0.5 + (index - 1) * 0.1;
        const ports = [center(row.source), center(row.entry), center(row.exit), center(row.sink)];
        hubs.forEach((hub, i) => {
          const first = branchPath(ports[2 * i], hub, track);
          const second = branchPath(hub, ports[2 * i + 1], 1 - track);
          if (row.routes[i]?.original !== first + ' ' + second) {
            row.routes[i] = measureRoute(row.lines[i], first, second, hub);
          }
        });
      });
      cursorDirty = true;
    };

    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || disposed) return;
      const running = !controls.paused && !motion.matches;
      const dt = running && lastTime ? Math.min(0.064, (now - lastTime) / 1000) : 0;
      lastTime = running ? now : 0;
      if (layoutDirty) {
        measure();
        layoutDirty = false;
      }
      if (cursorDirty && (!controls.paused || motion.matches)) {
        let obstacle: Point | null = null;
        const matrix = cursor ? svg.getScreenCTM() : null;
        if (cursor && matrix)
          obstacle = new DOMPoint(cursor.x, cursor.y).matrixTransform(matrix.inverse());
        let blocked = false;
        for (const row of rows) {
          for (const route of row.routes) {
            deflect(route, obstacle, compact.matches ? 14 : 20, reading, !motion.matches);
            route.line.toggleAttribute('data-near', route.near);
          }
          const near = row.routes.some((route) => route.near);
          row.row.toggleAttribute('data-near', near);
          blocked ||= near;
        }
        if (obstacleMark) {
          obstacleMark.style.opacity = blocked && !motion.matches ? '1' : '0';
          if (obstacle && blocked) {
            obstacleMark.setAttribute('cx', String(obstacle.x));
            obstacleMark.setAttribute('cy', String(obstacle.y));
          }
        }
        cursorDirty = false;
      }

      rows.forEach(({ row, routes, packet, journey }, i) => {
        if (routes.length < 2) return;
        const { phase, progress } = journey;
        const pipelined = i === 1;
        const leg = phase === 'inbound' ? routes[0] : phase === 'outbound' ? routes[1] : null;
        const active =
          leg?.near ||
          packet.hasAttribute('data-active') ||
          (phase === 'inbound' && map.dataset.trace === 'in') ||
          (phase === 'outbound' && map.dataset.trace === 'out');
        const speed = (50 + i * 3) * (active ? 1.8 : 1);
        const duration = leg
          ? Math.max(pipelined ? 0.45 : 0.28, leg.baseLength / speed)
          : phase === 'storing'
            ? i === 0
              ? 3.1
              : 0.85
            : 1.45;
        journey.progress = progress + dt / duration;
        if (journey.progress >= 1) {
          const trace = map.dataset.trace;
          if (
            deliveryNote &&
            leg &&
            !motion.matches &&
            (trace === undefined || trace === 'in' || trace === 'out' || trace === String(i))
          ) {
            const { source, store, sink } = row.dataset;
            const sender = phase === 'inbound' ? source : store;
            const receiver = phase === 'inbound' ? store : sink;
            if (sender && receiver) {
              const delivery = `${sender} → ${receiver}`;
              if (deliveryNote.textContent !== delivery) deliveryNote.textContent = delivery;
            }
          }
          // The profile channel accepts the next record while the previous one waits in storage.
          // Its alternating inbound and outbound messages keep the diagram in motion during other dwells.
          if (pipelined) journey.phase = phase === 'inbound' ? 'outbound' : 'inbound';
          else journey.phase = phases[(phases.indexOf(phase) + 1) % phases.length];
          journey.progress = 0;
        }
        const storing =
          journey.phase === 'storing' ||
          (pipelined &&
            ((journey.phase === 'inbound' && journey.progress > 0.88) ||
              (journey.phase === 'outbound' && journey.progress < 0.12)));
        const stage = storing ? 'store' : journey.phase === 'inbound' ? 'producer' : 'consumer';
        if (row.dataset.stage !== stage) row.dataset.stage = stage;
        if (journey.phase === 'inbound' || journey.phase === 'outbound') {
          const route = routes[journey.phase === 'inbound' ? 0 : 1];
          placePacket(packet, route.line, route.length, journey.progress, pipelined ? 0.55 : 0);
        } else {
          packet.style.opacity = '0';
        }
        if (i === 0 && arrival && orbit) {
          if (journey.phase === 'storing' && !motion.matches && orbitLength > 0) {
            placePacket(arrival, orbit, orbitLength, journey.progress);
          } else {
            arrival.style.opacity = '0';
          }
        }
      });
      if (running) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
    };
    const refresh = () => {
      lastTime = 0;
      cursorDirty = true;
      if (!visible || document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        schedule();
      }
    };
    const resize = () => {
      layoutDirty = true;
      schedule();
    };
    const pointAt = (event: PointerEvent) => {
      const overNode =
        event.target instanceof Element && event.target.closest('.flow-node, .message-broker');
      cursor = overNode ? null : { x: event.clientX, y: event.clientY };
      cursorDirty = true;
      if (!controls.paused || motion.matches) schedule();
    };
    const clear = () => {
      cursor = null;
      cursorDirty = true;
      schedule();
    };
    const releaseTouch = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') clear();
    };
    const onScroll = () => {
      if (cursor) {
        cursorDirty = true;
        schedule();
      }
    };

    controls.refresh = refresh;
    const observer = new ResizeObserver(resize);
    [map, svg, ingress, egress].forEach((el) => observer.observe(el));
    for (const { row, producer, consumer, source, entry, exit, sink } of rows) {
      [row, producer, consumer, source, entry, exit, sink].forEach((el) => observer.observe(el));
    }
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    intersection.observe(svg);
    map.addEventListener('pointermove', pointAt, { passive: true });
    map.addEventListener('pointerdown', pointAt, { passive: true });
    map.addEventListener('pointerleave', clear);
    map.addEventListener('pointercancel', clear);
    map.addEventListener('pointerup', releaseTouch);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', refresh);
    document.fonts.addEventListener('loadingdone', resize);
    void document.fonts.ready.then(resize);
    motion.addEventListener('change', refresh);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      controls.refresh = () => {};
      observer.disconnect();
      intersection.disconnect();
      map.removeEventListener('pointermove', pointAt);
      map.removeEventListener('pointerdown', pointAt);
      map.removeEventListener('pointerleave', clear);
      map.removeEventListener('pointercancel', clear);
      map.removeEventListener('pointerup', releaseTouch);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', refresh);
      document.fonts.removeEventListener('loadingdone', resize);
      motion.removeEventListener('change', refresh);
    };
  }, [field]);
}
