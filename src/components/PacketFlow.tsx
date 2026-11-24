import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import StreamDrawing from './StreamDrawing';

type Point = { x: number; y: number };
type Sample = Point & { distance: number };
type Route = {
  line: SVGPathElement;
  original: string;
  length: number;
  originalLength: number;
  samples: Sample[];
  bent: boolean;
  side: number;
};

// The lead packet and its smaller followers travel together along one lane.
const trains = [
  { start: 0.15, speed: 53 },
  { start: 0.49, speed: 58 },
  { start: 0.83, speed: 55 },
];

function placePacket(packet: SVGGElement, line: SVGPathElement, length: number, distance: number) {
  const point = line.getPointAtLength(distance);
  const ahead = line.getPointAtLength(Math.min(length, distance + 1));
  const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  packet.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
}

function deflect(route: Route, obstacle: Point | null, clearance: number) {
  const { samples, line } = route;
  let nearest = -1;
  let separation = clearance;
  if (obstacle) {
    for (let i = 1; i < samples.length - 1; i++) {
      const gap = Math.hypot(samples[i].x - obstacle.x, samples[i].y - obstacle.y);
      if (gap < separation) {
        separation = gap;
        nearest = i;
      }
    }
  }
  if (nearest < 0 || !obstacle) {
    if (route.bent) line.setAttribute('d', route.original);
    route.length = route.originalLength;
    route.bent = false;
    return;
  }

  const center = samples[nearest];
  const dx = samples[nearest + 1].x - samples[nearest - 1].x;
  const dy = samples[nearest + 1].y - samples[nearest - 1].y;
  const magnitude = Math.hypot(dx, dy) || 1;
  const normal = { x: -dy / magnitude, y: dx / magnitude };
  const offset = (obstacle.x - center.x) * normal.x + (obstacle.y - center.y) * normal.y;
  // Keep the same bypass side for small cursor movements along the middle of a lane.
  if (!route.bent || Math.abs(offset) > 3) route.side = offset > 0 ? -1 : 1;
  const height = offset + route.side * (clearance + 4);
  const reach = clearance * 3.15;
  const detour = samples.map((p, i) => {
    const t = Math.min(1, Math.abs(p.distance - center.distance) / reach);
    const ends = Math.min(
      1,
      p.distance / clearance,
      (route.originalLength - p.distance) / clearance,
    );
    const bend = (height * ends * (1 + Math.cos(t * Math.PI))) / 2;
    return (
      (i ? 'L' : 'M') +
      (p.x + normal.x * bend).toFixed(2) +
      ',' +
      (p.y + normal.y * bend).toFixed(2)
    );
  });
  line.setAttribute('d', detour.join(' '));
  route.length = line.getTotalLength();
  route.bent = true;
}

export default function PacketFlow() {
  const field = useRef<SVGSVGElement>(null);
  const elapsed = useRef(0);
  const traveled = useRef(trains.map(() => 0));
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;
  const nodeProps = {
    connections: trains,
    active,
    selected,
    paused,
    onHover: setHovered,
    onFocus: setFocused,
    onSelect: (index: number) => setSelected((previous) => (previous === index ? null : index)),
  };

  useEffect(() => {
    const svg = field.current;
    const hero = svg?.parentElement;
    const avatar = hero?.querySelector('.avatar');
    if (!svg || !hero || !avatar) return;
    const sources = hero.querySelectorAll('.producer .node-port');
    const sinks = hero.querySelectorAll('.consumer .node-port');

    const lines = Array.from(svg.querySelectorAll<SVGPathElement>('.packet-lane'));
    const orbit = svg.querySelector<SVGPathElement>('.portrait-route');
    const arrival = svg.querySelector<SVGGElement>('.portrait-packet');
    if (!orbit || !arrival) return;
    const obstruction = svg.querySelector<SVGCircleElement>('.packet-obstacle');
    const packets = Array.from(svg.querySelectorAll<SVGGElement>('.packet-train'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let routes: Route[] = [];
    let orbitLength = 0;
    let cursor: Point | null = null;
    let compact = false;
    let changed = true;
    let visible = true;
    let frame = 0;
    let lastTime = 0;

    const draw = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) {
        lastTime = 0;
        return;
      }
      const running = !paused && !motion.matches;
      const seconds = running && lastTime ? Math.min(60, now - lastTime) / 1000 : 0;
      elapsed.current += seconds;
      lastTime = running ? now : 0;
      if (changed) {
        let obstacle: Point | null = null;
        if (cursor && !motion.matches && !paused) {
          const bounds = svg.getBoundingClientRect();
          obstacle = { x: cursor.x - bounds.left, y: cursor.y - bounds.top };
        }
        routes.forEach((route) => deflect(route, obstacle, compact ? 18 : 25));
        if (obstruction) {
          const blocked = obstacle && routes.some((route) => route.bent);
          obstruction.style.opacity = blocked ? '1' : '0';
          if (blocked && obstacle) {
            obstruction.setAttribute('cx', String(obstacle.x));
            obstruction.setAttribute('cy', String(obstacle.y));
          }
        }
        changed = false;
      }
      packets.forEach((packet, i) => {
        const train = trains[i];
        const route = routes[i];
        if (!route) return;
        const speed = packet.hasAttribute('data-active') ? train.speed * 1.8 : train.speed;
        traveled.current[i] += seconds * speed;
        const phase = (train.start + traveled.current[i] / route.originalLength) % 1;
        const distance = phase * route.length;
        placePacket(packet, route.line, route.length, distance);
        packet.style.opacity = String(Math.min(1, distance / 15, (route.length - distance) / 12));
      });
      // One arrival and one lap, followed by a quiet interval before the next packet.
      const lapTime = 4.6;
      const progress = (elapsed.current % (lapTime + 3.2)) / lapTime;
      if (orbitLength && progress < 1 && !motion.matches) {
        const distance = progress * orbitLength;
        placePacket(arrival, orbit, orbitLength, distance);
        arrival.style.opacity = String(Math.min(1, distance / 7, (orbitLength - distance) / 22));
      } else {
        arrival.style.opacity = '0';
      }
      if (running) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const measure = () => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const portrait = avatar.getBoundingClientRect();
      const cx = portrait.left - box.left + portrait.width / 2;
      const cy = portrait.top - box.top + portrait.height / 2;
      const radius = portrait.width / 2 + 4;
      const crown = cy - radius;
      // The small rounded elbow enters the outer rim tangentially at twelve o'clock.
      orbit.setAttribute(
        'd',
        [
          `M ${cx - 4} 0 V ${crown - 4} Q ${cx - 4} ${crown} ${cx} ${crown}`,
          `A ${radius} ${radius} 0 0 1 ${cx} ${cy + radius}`,
          `A ${radius} ${radius} 0 0 1 ${cx} ${crown}`,
        ].join(' '),
      );
      orbitLength = orbit.getTotalLength();
      const port = (node: Element): Point => {
        const r = node.getBoundingClientRect();
        return {
          x: r.left - box.left + r.width / 2,
          y: r.top - box.top + r.height / 2,
        };
      };
      compact = window.matchMedia('(max-width: 1023px)').matches;
      const baseline = compact ? port(sources[1]).y : box.height - 43;
      routes = lines.map((line, i) => {
        const start = port(sources[i]);
        const end = port(sinks[i]);
        const lead = Math.min((end.x - start.x) * 0.2, compact ? 64 : 74);
        const y = baseline + (i - 1) * (compact ? 12 : 9);
        const d = [
          `M ${start.x} ${start.y}`,
          `C ${start.x + lead * 0.45} ${start.y}, ${start.x + lead * 0.46} ${y}, ${start.x + lead} ${y}`,
          `H ${end.x - lead}`,
          `C ${end.x - lead * 0.46} ${y}, ${end.x - lead * 0.45} ${end.y}, ${end.x} ${end.y}`,
        ].join(' ');
        line.setAttribute('d', d);
        const length = line.getTotalLength();
        const count = Math.max(2, Math.ceil(length / 4));
        const samples = Array.from({ length: count + 1 }, (_, n) => {
          const distance = (length * n) / count;
          const { x, y } = line.getPointAtLength(distance);
          return { x, y, distance };
        });
        return { line, original: d, length, originalLength: length, samples, bent: false, side: 1 };
      });
      changed = true;
      schedule();
    };
    const pointAt = (event: PointerEvent) => {
      if (paused || motion.matches) return;
      const overNode = event.target instanceof Element && event.target.closest('.stream-node');
      cursor = overNode ? null : { x: event.clientX, y: event.clientY };
      changed = true;
      schedule();
    };
    const clear = () => {
      cursor = null;
      changed = true;
      schedule();
    };
    const onScroll = () => {
      if (cursor && visible) {
        changed = true;
        schedule();
      }
    };
    const releaseTouch = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') clear();
    };
    const pointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element && event.target.closest('.stream-node')))
        setSelected(null);
      pointAt(event);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    const refresh = () => {
      lastTime = 0;
      changed = true;
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(hero);
    resize.observe(avatar);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    intersection.observe(hero);
    hero.addEventListener('pointermove', pointAt, { passive: true });
    hero.addEventListener('pointerdown', pointerDown, { passive: true });
    hero.addEventListener('keydown', onKey);
    hero.addEventListener('pointerleave', clear);
    hero.addEventListener('pointercancel', clear);
    hero.addEventListener('pointerup', releaseTouch);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', refresh);
    motion.addEventListener('change', refresh);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      hero.removeEventListener('pointermove', pointAt);
      hero.removeEventListener('pointerdown', pointerDown);
      hero.removeEventListener('keydown', onKey);
      hero.removeEventListener('pointerleave', clear);
      hero.removeEventListener('pointercancel', clear);
      hero.removeEventListener('pointerup', releaseTouch);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', refresh);
      motion.removeEventListener('change', refresh);
    };
  }, [paused]);

  return (
    <>
      <svg className='packet-field' ref={field} aria-hidden='true' focusable='false' fill='none'>
        {trains.map((train, i) => (
          <path className='packet-lane' data-active={i === active || undefined} key={train.start} />
        ))}
        <path className='portrait-route' />
        <g className='portrait-packet'>
          <rect x='-2.75' y='-1.75' width='5.5' height='3.5' rx='1.5' />
          <circle cx='-5.5' r='1.1' opacity='.55' />
        </g>
        <circle className='packet-obstacle' r='8' />
        {trains.map((train, i) => (
          <g className='packet-train' data-active={i === active || undefined} key={train.start}>
            <rect x='-3' y='-2.5' width='8.5' height='5' rx='1.5' />
            <rect x='-10' y='-1.9' width='4.5' height='3.8' rx='1' opacity='.68' />
            <rect x='-15' y='-1.4' width='2.8' height='2.8' rx='.8' opacity='.43' />
          </g>
        ))}
      </svg>
      <StreamDrawing {...nodeProps} />
      <StreamDrawing {...nodeProps} consumer />
      <button
        type='button'
        className='flow-toggle'
        onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Resume packet animation' : 'Pause packet animation'}
        title={paused ? 'Resume packet animation' : 'Pause packet animation'}
      >
        <Icon name={paused ? 'play' : 'pause'} />
      </button>
    </>
  );
}
