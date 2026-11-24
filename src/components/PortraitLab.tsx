import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { INFORMATION } from '../settings';
import { drawPortrait, FRAME_HEIGHT, FRAME_WIDTH, samplePortrait } from '../vision/portrait';
import source from '../vision/palette.ts?raw';
import Icon from './Icon';

const views = ['Output', 'Input', 'Code'] as const;
type View = (typeof views)[number];

export default function PortraitLab() {
  const [view, setView] = useState<View>('Output');
  const [clusters, setClusters] = useState(8);
  const [sample, setSample] = useState<ReturnType<typeof samplePortrait>>(null);
  const [failed, setFailed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLOutputElement>(null);
  const cursor = useRef({ x: 0.5, y: 0.5 });
  const model = useRef<ReturnType<typeof drawPortrait>>(null);

  useEffect(() => {
    if (!sample || !canvas.current) return;
    model.current = drawPortrait(canvas.current, sample, clusters);
    canvas.current.hidden = !model.current;
  }, [clusters, sample]);

  const clearLens = () => {
    if (frame.current) delete frame.current.dataset.inspecting;
  };
  const inspectAt = (x: number, y: number, announce = false) => {
    const panel = frame.current;
    if (!panel || !sample || !model.current || !readout.current || view !== 'Output') return;
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    cursor.current = { x, y };
    const col = Math.min(FRAME_WIDTH - 1, Math.floor(x * FRAME_WIDTH));
    const row = Math.min(FRAME_HEIGHT - 1, Math.floor(y * FRAME_HEIGHT));
    const label = model.current.labels[sample.tones[row * FRAME_WIDTH + col]];
    panel.style.setProperty('--x', x * 100 + '%');
    panel.style.setProperty('--y', y * 100 + '%');
    panel.dataset.inspecting = 'true';
    readout.current.setAttribute('aria-live', announce ? 'polite' : 'off');
    readout.current.value = `[${col}, ${row}] · cluster ${label}`;
  };
  const inspect = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    inspectAt((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
  };
  const moveLens = (event: KeyboardEvent<HTMLDivElement>) => {
    const { x, y } = cursor.current;
    if (event.key === 'Escape') {
      clearLens();
      return;
    }
    switch (event.key) {
      case 'ArrowLeft':
        inspectAt(x - 0.025, y, true);
        break;
      case 'ArrowRight':
        inspectAt(x + 0.025, y, true);
        break;
      case 'ArrowUp':
        inspectAt(x, y - 0.025, true);
        break;
      case 'ArrowDown':
        inspectAt(x, y + 0.025, true);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <figure className='vision-lab' aria-labelledby='lab-name'>
      <div className='lab-toolbar'>
        <span id='lab-name'>
          <Icon name='code' />
          Vision lab
        </span>
        <div className='view-options' role='group' aria-label='Portrait view'>
          {views.map((item) => (
            <button
              type='button'
              aria-pressed={view === item}
              key={item}
              onClick={() => {
                clearLens();
                setView(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div
        className='lab-frame'
        ref={frame}
        role='group'
        tabIndex={view === 'Output' && sample ? 0 : undefined}
        aria-label={
          view === 'Output'
            ? 'Encoded portrait. Use the arrow keys to inspect pixels.'
            : view + ' view'
        }
        onKeyDown={view === 'Output' ? moveLens : undefined}
        onBlur={clearLens}
        data-view={view}
        onPointerMove={inspect}
        onPointerDown={inspect}
        onPointerLeave={clearLens}
        onPointerCancel={clearLens}
        onPointerUp={(event) => {
          if (event.pointerType === 'touch') clearLens();
        }}
      >
        <img
          className='original-photo'
          src={INFORMATION.profileImage}
          width='1024'
          height='1024'
          alt={INFORMATION.name}
          fetchPriority='high'
          onLoad={(event) => {
            try {
              const pixels = samplePortrait(event.currentTarget);
              setSample(pixels);
              setFailed(!pixels);
            } catch {
              setFailed(true);
            }
          }}
          onError={() => setFailed(true)}
        />
        <canvas
          ref={canvas}
          className='encoded-photo'
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          hidden={!sample}
          aria-hidden='true'
        />
        {view === 'Output' && sample && (
          <>
            <img className='inspection-photo' src={INFORMATION.profileImage} alt='' />
            <span className='lens-outline' aria-hidden='true' />
            <output className='pixel-readout' ref={readout} aria-live='off' />
          </>
        )}
        {view === 'Code' && (
          <div className='source-view'>
            <div className='source-path'>src/vision/palette.ts</div>
            <pre tabIndex={0} aria-label='K-means TypeScript source'>
              <code>
                {source
                  .trimEnd()
                  .split('\n')
                  .map((line, i) => (
                    <span className={line.startsWith('//') ? 'comment' : undefined} key={i}>
                      <i aria-hidden='true'>{i + 1}</i>
                      {line || ' '}
                      {'\n'}
                    </span>
                  ))}
              </code>
            </pre>
          </div>
        )}
      </div>
      <div className='lab-settings'>
        <div className='model-label'>
          <span className='model-glyph' aria-hidden='true'>
            ⠿
          </span>
          <span>K-means</span>
        </div>
        <div className='cluster-options' role='group' aria-label='Number of clusters'>
          <span>k =</span>
          {[4, 8, 16].map((k) => (
            <button
              type='button'
              key={k}
              aria-pressed={clusters === k}
              aria-label={k + ' clusters'}
              onClick={() => {
                setClusters(k);
                setView('Output');
                clearLens();
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <figcaption className='lab-note'>
        {failed
          ? 'The portrait model could not load on this device.'
          : view === 'Code'
            ? 'The TypeScript function used to learn the portrait palette.'
            : view === 'Input'
              ? 'Original photograph used as input for the model.'
              : 'Change k to regroup tones. Hover or touch the portrait to inspect a pixel.'}
      </figcaption>
    </figure>
  );
}
