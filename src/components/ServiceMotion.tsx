import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';
import { serviceMotionData, type ServiceSide } from './serviceMotionData';

type Props = { side: ServiceSide; paused: boolean; active: boolean };

export default function ServiceMotion({ side, paused, active }: Props) {
  const host = useRef<HTMLSpanElement>(null);
  const controls = useRef({ paused, active, refresh: () => {} });

  useEffect(() => {
    controls.current.paused = paused;
    controls.current.active = active;
    controls.current.refresh();
  }, [paused, active]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    const settings = controls.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let player: AnimationItem | undefined;
    let requested = false;
    let disposed = false;
    let visible = false;

    const refresh = () => {
      const running = visible && !document.hidden && !settings.paused && !reducedMotion.matches;
      if (player) {
        player.setSpeed(settings.active ? 1.55 : 1);
        if (running) player.play();
        else player.pause();
      } else if (running && !requested) {
        requested = true;
        void import('lottie-web/build/player/lottie_light')
          .then(({ default: lottie }) => {
            if (disposed) return;
            player = lottie.loadAnimation({
              container,
              renderer: 'svg',
              loop: true,
              autoplay: false,
              animationData: serviceMotionData(side),
            });
            player.addEventListener('DOMLoaded', () => {
              if (disposed) return;
              container.querySelectorAll('path').forEach((path) => {
                path.style.fill = 'var(--channel, var(--accent))';
              });
              refresh();
            });
            refresh();
          })
          .catch(() => {
            // The inline service drawing remains available if the optional animation cannot load.
          });
      }
      container.style.visibility = settings.paused || reducedMotion.matches ? 'hidden' : 'visible';
    };

    settings.refresh = refresh;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    observer.observe(container);
    document.addEventListener('visibilitychange', refresh);
    reducedMotion.addEventListener('change', refresh);

    return () => {
      disposed = true;
      settings.refresh = () => {};
      observer.disconnect();
      document.removeEventListener('visibilitychange', refresh);
      reducedMotion.removeEventListener('change', refresh);
      player?.destroy();
    };
  }, [side]);

  return (
    <span
      className='module-art broker-art service-motion'
      data-service={side}
      aria-hidden='true'
      style={{ display: 'block', position: 'relative', aspectRatio: '64 / 48' }}
    >
      <svg
        viewBox='0 0 64 48'
        width='100%'
        height='100%'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ display: 'block' }}
        focusable='false'
      >
        <g transform={side === 'out' ? 'translate(64 0) scale(-1 1)' : undefined}>
          <path d='M3 8h6l12 16h7M3 24h25M3 40h6l12-16m30 0h10' opacity='.55' />
          <g fill='var(--channel-wash, var(--tint))'>
            <circle cx='3' cy='8' r='1.8' />
            <circle cx='3' cy='24' r='1.8' />
            <circle cx='3' cy='40' r='1.8' />
            <circle cx='61' cy='24' r='1.8' />
          </g>
          <path d='m26 21 12-7 14 7v8l-12 7-14-7z' fill='var(--channel-wash, var(--tint))' />
          <path d='m26 18 12-7 14 7-12 7z' fill='var(--surface)' />
          <path d='m26 18 14 7v8l-14-7z' fill='var(--channel-wash, var(--tint))' />
          <path d='m40 25 12-7v8l-12 7z' fill='var(--surface)' />
          <path d='m33 18 6-3m-2 5 6-3m1 10 4-2' stroke='var(--channel, var(--accent))' />
        </g>
      </svg>
      <span ref={host} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
    </span>
  );
}
