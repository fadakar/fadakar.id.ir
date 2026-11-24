import type { PointerEvent } from 'react';

type Props = {
  consumer?: boolean;
  connections: readonly { start: number }[];
  active: number | null;
  selected: number | null;
  paused: boolean;
  onHover: (index: number | null) => void;
  onFocus: (index: number | null) => void;
  onSelect: (index: number) => void;
};

function tilt(event: PointerEvent<HTMLButtonElement>) {
  const node = event.currentTarget;
  const bounds = node.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  node.style.setProperty('--tilt-x', -y * 16 + 'deg');
  node.style.setProperty('--tilt-y', x * 20 + 'deg');
}

export default function StreamDrawing({
  consumer = false,
  connections,
  active,
  selected,
  paused,
  onHover,
  onFocus,
  onSelect,
}: Props) {
  const side = consumer ? 'consumer' : 'producer';
  return (
    <div
      className={'stream-drawing ' + side}
      role='group'
      aria-label={consumer ? 'Message consumers' : 'Message producers'}
      data-paused={paused || undefined}
    >
      <span className='drawing-caption' aria-hidden='true'>
        {consumer ? 'consumer.poll()' : 'producer.send()'}
      </span>
      <div className='node-bank'>
        {connections.map((connection, i) => (
          <button
            type='button'
            className='stream-node'
            key={connection.start}
            aria-label={`Trace ${side} ${i + 1} connection`}
            aria-pressed={selected === i}
            data-active={active === i || undefined}
            onPointerEnter={(event) => {
              if (event.pointerType !== 'touch') onHover(i);
            }}
            onPointerMove={(event) => {
              if (event.pointerType === 'touch') return;
              if (active !== i) onHover(i);
              if (!paused) tilt(event);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.removeProperty('--tilt-x');
              event.currentTarget.style.removeProperty('--tilt-y');
              onHover(null);
            }}
            onFocus={(event) => {
              if (event.currentTarget.matches(':focus-visible')) {
                onHover(null);
                onFocus(i);
              }
            }}
            onBlur={() => onFocus(null)}
            onClick={() => onSelect(i)}
          >
            <svg viewBox='0 0 96 76' fill='none' aria-hidden='true' focusable='false'>
              <path className='node-lead' d={consumer ? 'M20 45 10 51H3' : 'm76 45 10 6h7'} />
              <circle className='node-port' cx={consumer ? 3 : 93} cy='51' r='1.8' />
              <g className='node-device' strokeLinejoin='round'>
                {[1, 0].map((layer) => (
                  <g key={layer} transform={'translate(0 ' + layer * 12 + ')'}>
                    <g className={layer === 0 ? 'node-lid' : undefined}>
                      <path className='slab-top' d='m9 27 36-20 42 24-36 20z' />
                      <path className='slab-left' d='m9 27 42 24v7L9 34z' />
                      <path className='slab-right' d='m51 51 36-20v7L51 58z' />
                      <path className='port-line' d='m15 33 8 4.5m4 2.3 2 1.2m43 4 8-4.5' />
                      {layer === 0 && (
                        <g className='etched-mark' transform='matrix(1 .57 -1 .57 47 21)'>
                          {consumer ? (
                            <path d='M0 0h17v12H0zM1 1l7.5 6L16 1' />
                          ) : (
                            <path d='M0 0h17v12H0zM3 3l3 3-3 3m5 0h5' />
                          )}
                        </g>
                      )}
                    </g>
                  </g>
                ))}
              </g>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
