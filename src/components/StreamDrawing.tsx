import type { ReactNode } from 'react';

const paper = 'var(--surface)';
const wash = 'var(--channel-wash, var(--tint))';
const accent = 'var(--channel, var(--accent))';
const shaded = 'color-mix(in srgb, var(--channel, var(--accent)) 32%, var(--surface))';

const compactLabels: Record<string, string> = {
  Uploader: 'Upload',
  'Profile API': 'API',
  'Image view': 'View',
};

const producerDrawings = [
  // A photograph sliding into a shallow upload tray.
  <g key='photo-tray'>
    <path d='m4 26 11-6 26 4 4 5-14 7-27-6z' fill={shaded} />
    <path d='m4 26 14-7 27 6-14 7z' fill={wash} />
    <path d='m10 26 9-4 19 4-9 4z' fill={accent} stroke='none' />
    <path d='m10 6 22-3 6 19-23 4z' fill={shaded} />
    <path d='m7 7 22-3 6 19-23 4z' fill={paper} />
    <path d='m12 21 4-7 5 3 3-6 7 9z' fill={wash} stroke={accent} />
    <circle cx='13.5' cy='11.8' r='1.35' fill={accent} stroke='none' />
  </g>,

  // A terminal console with a sloped keyboard and a recessed screen.
  <g key='console'>
    <path d='m9 7 5-3 24 3-5 4z' fill={wash} />
    <path d='m33 11 5-4v15l-5 4z' fill={shaded} />
    <path d='m9 7 24 4v15l-24-4z' fill={paper} />
    <path d='m12 10 18 3v9l-18-3z' fill={accent} stroke='none' />
    <path d='m15 13 3 2.5-3 1.4m6 1.4 4 .6' stroke={paper} strokeWidth='1.6' />
    <path d='m9 22 24 4 7-3-1 4-9 7-26-5v-3z' fill={shaded} />
    <path d='m9 22 24 4-5 5-24-5z' fill={wash} />
    <path d='m12 25 11 2m6 .8 1 .1' stroke={accent} />
  </g>,

  // Pencil, graphite tip and the three exposed edges of a manuscript.
  <g key='manuscript'>
    <path d='m3 23 16-12 24 5v5L26 35 3 29z' fill={shaded} />
    <path d='m3 23 16-13 24 5-17 15z' fill={paper} />
    <path d='m8 26 17 4m-12-9 8 2m-4-5 6 1.5' stroke={accent} strokeWidth='1.25' />
    <path d='m18 19 17-15q1.5-1.4 3 .1l2 2q1.4 1.5-.1 2.7L23 23l-7 2z' fill={wash} />
    <path d='m18 19 5 4-7 2zm15-13 5 4' fill={shaded} />
    <path d='m20 20 15-13' stroke={accent} strokeWidth='1.15' />
  </g>,
];

const consumerDrawings = [
  // The angled edge and central foot give the image display its own silhouette.
  <g key='image-display'>
    <path d='m22 26 7-2v6l7 2-10 4-12-3 8-3z' fill={shaded} />
    <path d='m5 6 31-3 5 3v20l-31 4-5-3z' fill={shaded} />
    <path d='m5 6 31-3v21L5 27z' fill={paper} />
    <path d='m9 9 23-2v13l-23 3z' fill={wash} />
    <path d='m10 21 6-7 4 3 5-6 6 8z' fill={accent} stroke='none' />
    <circle cx='13' cy='12' r='1.5' fill={accent} stroke='none' />
    <path d='m36 3 5 3M36 24l5 2' />
  </g>,

  // Three exploded layout plates, with a masthead and two columns on the upper sheet.
  <g key='layout-plates'>
    <path d='m3 24 18-10 24 9-18 12z' fill={shaded} />
    <path d='m3 18 18-10 24 9-18 12z' fill={wash} />
    <path d='m3 12 18-10 24 9-18 12z' fill={paper} />
    <path d='m8 12 13-7 17 6-13 8z' fill={wash} stroke={accent} strokeWidth='1.15' />
    <path d='m13 9 18 7m-10-4-6 3' stroke={accent} />
  </g>,

  // An open book with a visible spine and a small hanging ribbon.
  <g key='reader'>
    <path d='m3 10 18-4 4 4 17-4 3 20-17 7-6-2-16 2z' fill={shaded} />
    <path d='M4 7q9-4 17-3l4 4 2 21q-8-5-20 0z' fill={paper} />
    <path d='m25 8 4-3q6-2 12-2l2 21q-8 0-16 5z' fill={wash} />
    <path d='m32 5 4-1 1 10-2-1.4-2 2z' fill={accent} stroke='none' />
    <path d='m9 11 9-2m-8 7 9-2' stroke={accent} strokeWidth='1.3' />
  </g>,
];

function Glyph({
  children,
  className = 'module-art',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox='0 0 48 38'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
      strokeLinecap='round'
      aria-hidden='true'
      focusable='false'
    >
      {children}
    </svg>
  );
}

export default function StreamDrawing({
  index,
  label,
  consumer = false,
  selected,
}: {
  index: number;
  label: string;
  consumer?: boolean;
  selected: boolean;
}) {
  const side = consumer ? 'consumer' : 'producer';
  return (
    <button
      type='button'
      className={'flow-node endpoint ' + side}
      aria-pressed={selected}
      aria-label={`Trace ${side} ${index + 1}, ${label}`}
    >
      <Glyph>{(consumer ? consumerDrawings : producerDrawings)[index]}</Glyph>
      <span className='endpoint-label'>
        {compactLabels[label] ? (
          <>
            <span className='full-label'>{label}</span>
            <span className='compact-label'>{compactLabels[label]}</span>
          </>
        ) : (
          label
        )}
      </span>
      <i className='socket node-port' aria-hidden='true' />
    </button>
  );
}
