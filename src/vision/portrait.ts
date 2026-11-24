import { learnPalette } from './palette';

export const FRAME_WIDTH = 600;
export const FRAME_HEIGHT = 480;

export function samplePortrait(image: HTMLImageElement) {
  const sampling = document.createElement('canvas');
  sampling.width = FRAME_WIDTH;
  sampling.height = FRAME_HEIGHT;
  const context = sampling.getContext('2d', { willReadFrequently: true });
  if (!context) return null;
  // Match the input photograph's CSS crop so the inspection lens registers pixel for pixel.
  const scale = Math.max(FRAME_WIDTH / image.naturalWidth, FRAME_HEIGHT / image.naturalHeight);
  const w = image.naturalWidth * scale;
  const h = image.naturalHeight * scale;
  context.drawImage(image, (FRAME_WIDTH - w) * 0.5, (FRAME_HEIGHT - h) * 0.2, w, h);
  const { data } = context.getImageData(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
  const tones = new Uint8Array(FRAME_WIDTH * FRAME_HEIGHT);
  const histogram = new Uint32Array(256);
  for (let i = 0; i < tones.length; i++) {
    const p = i * 4;
    tones[i] = Math.round(0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]);
    histogram[tones[i]]++;
  }
  return { tones, histogram };
}

const inks = [
  [12, 19, 65],
  [32, 47, 150],
  [78, 99, 228],
  [148, 165, 247],
  [239, 233, 222],
];
const background = [68, 82, 215];
const gridPoint = [164, 179, 255];

export function drawPortrait(
  canvas: HTMLCanvasElement,
  sample: NonNullable<ReturnType<typeof samplePortrait>>,
  clusters: number,
) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const model = learnPalette(sample.histogram, clusters);
  const frame = context.createImageData(FRAME_WIDTH, FRAME_HEIGHT);
  const palette = model.centers.map((center) => {
    const position = (center / 255) * (inks.length - 1);
    const low = Math.floor(position);
    const high = Math.min(inks.length - 1, low + 1);
    return inks[low].map((c, j) => c + (inks[high][j] - c) * (position - low));
  });
  for (let i = 0; i < sample.tones.length; i++) {
    const tone = sample.tones[i];
    const color = palette[model.labels[tone]];
    const x = i % FRAME_WIDTH,
      y = Math.floor(i / FRAME_WIDTH);
    const paper = tone > 247;
    const grid = x % 24 === 0 && y % 24 === 0;
    const dot = (x + (y % 6 < 3 ? 2 : 0)) % 5 === 0 && y % 3 === 0;
    const base = paper ? (grid ? gridPoint : background) : color;
    const shade = dot && !paper ? 0.72 : 1;
    const p = i * 4;
    frame.data[p] = base[0] * shade;
    frame.data[p + 1] = base[1] * shade;
    frame.data[p + 2] = base[2] * shade;
    frame.data[p + 3] = 255;
  }
  context.putImageData(frame, 0, 0);
  return model;
}
