// Fit a one-dimensional K-means model to the image's luminance histogram.
// Histogram counts give frequent pixel values proportionally more weight.
export function learnPalette(histogram: Uint32Array, clusters: number) {
  const centers = Array.from({ length: clusters }, (_, i) => (255 * i) / (clusters - 1));
  const labels = new Uint8Array(256);
  for (let pass = 0; pass < 32; pass++) {
    const sums = new Float64Array(clusters);
    const counts = new Uint32Array(clusters);
    let bin = 0;
    for (let value = 0; value < 256; value++) {
      while (bin + 1 < clusters && value > (centers[bin] + centers[bin + 1]) / 2) bin++;
      labels[value] = bin;
      counts[bin] += histogram[value];
      sums[bin] += histogram[value] * value;
    }
    const next = centers.map((old, i) => (counts[i] ? sums[i] / counts[i] : old));
    const converged = next.every((center, i) => Math.abs(center - centers[i]) < 0.05);
    if (converged || pass === 31) break;
    centers.splice(0, clusters, ...next);
  }
  return { centers, labels };
}
