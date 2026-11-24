type Point = [number, number];
type MotionKey = { frame: number; point: Point };

export type ServiceSide = 'in' | 'out';

const frames = 78;
const branchHeights = [8, 24, 40];

function positionKeys(keys: MotionKey[]) {
  return keys.map(({ frame, point }, i) => {
    const next = keys[i + 1];
    if (!next) return { t: frame, s: point };
    return {
      t: frame,
      s: point,
      e: next.point,
      o: { x: 0.33, y: 0.33 },
      i: { x: 0.67, y: 0.67 },
    };
  });
}

function signal(index: number, keys: MotionKey[], diameter: number) {
  return {
    ty: 4,
    ind: index,
    nm: 'Packet ' + index,
    ddd: 0,
    sr: 1,
    ip: keys[0].frame,
    op: keys[keys.length - 1].frame,
    st: 0,
    ks: {
      a: { a: 0, k: [0, 0] },
      p: { a: 1, k: positionKeys(keys) },
      s: { a: 0, k: [100, 100] },
      r: { a: 0, k: 0 },
      o: { a: 0, k: 100 },
    },
    shapes: [
      {
        ty: 'el',
        nm: 'Signal',
        p: { a: 0, k: [0, 0] },
        s: { a: 0, k: [diameter, diameter] },
        d: 1,
      },
      { ty: 'fl', nm: 'Ink', c: { a: 0, k: [0.31, 0.43, 0.71, 1] }, o: { a: 0, k: 100 }, r: 1 },
    ],
  };
}

// The gateway coalesces three deliveries; the router copies one delivery to three destinations.
export function serviceMotionData(side: ServiceSide) {
  const incoming = side === 'in';
  const branches = branchHeights.map((height, i) => {
    const keys: MotionKey[] = incoming
      ? [
          { frame: 4 + i * 2, point: [3, height] },
          { frame: 11 + i * 2, point: [9, height] },
          { frame: 34, point: [21, 24] },
          { frame: 42, point: [28, 24] },
        ]
      : [
          { frame: 26, point: [36, 24] },
          { frame: 34, point: [43, 24] },
          { frame: 53 + i * 2, point: [55, height] },
          { frame: 62 + i * 2, point: [61, height] },
        ];
    return signal(i + 1, keys, 5);
  });
  const trunk: MotionKey[] = incoming
    ? [
        { frame: 42, point: [51, 24] },
        { frame: 63, point: [61, 24] },
      ]
    : [
        { frame: 4, point: [3, 24] },
        { frame: 26, point: [13, 24] },
      ];
  return {
    v: '5.12.2',
    nm: incoming ? 'Gateway ingress' : 'Router fan-out',
    w: 64,
    h: 48,
    fr: 24,
    ip: 0,
    op: frames,
    ddd: 0,
    assets: [],
    layers: [...branches, signal(4, trunk, 5.6)],
  };
}
