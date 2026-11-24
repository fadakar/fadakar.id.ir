import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { usePacketMotion } from '../hooks/usePacketMotion';
import Icon from './Icon';
import ProfileStore from './ProfileStore';
import ServiceMotion from './ServiceMotion';
import StreamDrawing from './StreamDrawing';

const channels = [
  { id: 'asset', producer: 'Uploader', store: 'Object storage', consumer: 'Image view' },
  { id: 'profile', producer: 'Profile API', store: 'profile.db', consumer: 'Header' },
  { id: 'summary', producer: 'Editor', store: 'summary.db', consumer: 'Reader' },
];

type Trace = number | 'in' | 'out' | null;

function traceOf(node: Element): Trace {
  const side = node.closest<HTMLElement>('.message-broker')?.dataset.side;
  if (side === 'in' || side === 'out') return side;
  const record = node.closest<HTMLElement>('[data-record]')?.dataset.record;
  const lane = record ?? node.closest<HTMLElement>('.flow-row')?.dataset.lane;
  return lane === undefined ? null : Number(lane);
}

export default function PacketFlow({ children }: { children: ReactNode }) {
  const field = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<Trace>(null);
  const [focused, setFocused] = useState<Trace>(null);
  const [selected, setSelected] = useState<Trace>(null);
  const active = hovered ?? focused ?? selected;
  usePacketMotion(field, paused);

  const hover = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const node = (event.target as Element).closest<HTMLElement>('.flow-node, [data-record]');
    setHovered(node ? traceOf(node) : null);
    if (node?.classList.contains('endpoint') && !paused) {
      const rect = node.getBoundingClientRect();
      node.style.setProperty(
        '--lean',
        ((event.clientX - rect.left) / rect.width - 0.5) * 8 + 'deg',
      );
    }
  };

  return (
    <div
      className='container hero'
      data-trace={active ?? undefined}
      onPointerMove={hover}
      onPointerLeave={() => setHovered(null)}
      onFocusCapture={(event) => {
        const target = event.target;
        if (target.matches(':focus-visible')) {
          setHovered(null);
          setFocused(target.closest('.flow-node') ? traceOf(target) : null);
        }
      }}
      onBlurCapture={() => setFocused(null)}
      onClick={(event) => {
        const node = (event.target as Element).closest('.flow-node');
        if (!node) {
          setSelected(null);
          return;
        }
        if (window.getSelection()?.isCollapsed === false) return;
        const index = traceOf(node);
        setSelected((last) => (last === index ? null : index));
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setSelected(null);
      }}
    >
      {children}
      <div
        className='system-map'
        role='group'
        aria-label='Résumé data flow'
        data-paused={paused || undefined}
        data-trace={active ?? undefined}
      >
        <span className='flow-role source-role' aria-hidden='true'>
          Producers
        </span>
        <span className='flow-role sink-role' aria-hidden='true'>
          Consumers
        </span>
        <button
          className='flow-toggle'
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            setPaused(!paused);
          }}
          aria-label={paused ? 'Resume packet animation' : 'Pause packet animation'}
          title={paused ? 'Resume packet animation' : 'Pause packet animation'}
        >
          <Icon name={paused ? 'play' : 'pause'} />
        </button>
        <svg className='packet-field' ref={field} aria-hidden='true' focusable='false' fill='none'>
          <defs>
            {channels.map(({ id }) => (
              <marker
                id={'packet-arrow-' + id}
                key={id}
                className={'channel-' + id}
                viewBox='0 0 8 8'
                refX='11'
                refY='4'
                markerWidth='6'
                markerHeight='6'
                orient='auto'
                markerUnits='userSpaceOnUse'
                overflow='visible'
              >
                <path d='M1 1.2 7 4 1 6.8z' fill='var(--channel)' />
              </marker>
            ))}
          </defs>
          {channels.map((channel, i) => (
            <g
              key={channel.id}
              className={'channel-' + channel.id}
              markerEnd={'url(#packet-arrow-' + channel.id + ')'}
              data-active={active === i || undefined}
            >
              <path className='packet-lane inbound' />
              <path className='packet-lane outbound' />
            </g>
          ))}
          <circle className='packet-obstacle' r='6' />
          {channels.map((channel, i) => (
            <g
              key={channel.id}
              className={'packet-train channel-' + channel.id}
              data-active={active === i || undefined}
            >
              <rect x='-3.5' y='-2.3' width='7.5' height='4.6' rx='1.1' />
              <rect x='-9.5' y='-1.65' width='3.8' height='3.3' rx='.8' opacity='.6' />
            </g>
          ))}
        </svg>
        {(['in', 'out'] as const).map((side) => (
          <button
            className='flow-node message-broker'
            key={side}
            type='button'
            data-side={side}
            aria-label={
              side === 'in' ? 'Trace all incoming messages' : 'Trace all outgoing messages'
            }
            aria-pressed={selected === side}
          >
            <ServiceMotion
              side={side}
              paused={paused}
              active={active === side || typeof active === 'number'}
            />
            <span className='broker-label'>{side === 'in' ? 'Broker' : 'Router'}</span>
            <i className='broker-port' aria-hidden='true' />
          </button>
        ))}
        {channels.map((channel, i) => (
          <div
            className={'flow-row channel-' + channel.id}
            key={channel.id}
            data-lane={i}
            data-source={channel.producer}
            data-store={channel.store}
            data-sink={channel.consumer}
            data-active={active === i || undefined}
          >
            <StreamDrawing index={i} label={channel.producer} selected={selected === i} />
            <ProfileStore index={i} name={channel.store} selected={selected === i} />
            <StreamDrawing index={i} label={channel.consumer} selected={selected === i} consumer />
          </div>
        ))}
        <output className='delivery-status' aria-label='Last delivered packet' aria-live='off'>
          <span className='delivery-caption'>Delivered</span>
          <span className='delivery-note' />
        </output>
      </div>
    </div>
  );
}
