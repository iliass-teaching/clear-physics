// Draws a simple line graph as an SVG string, in the exam style:
// grid, axes labelled "quantity / unit", straight lines between points.
// Pure function: used both on the server (Graph.astro) and in practice questions.

export interface GraphSpec {
  xLabel: string; // e.g. "time / s"
  yLabel: string; // e.g. "distance / m"
  xMax: number;
  yMax: number;
  yMin?: number; // default 0; can be negative (e.g. temperature in °C)
  xStep: number; // one grid line every xStep
  yStep: number;
  points: [number, number][];
  curve?: boolean; // draw a smooth curve through the points
  shade?: boolean; // shade the area under the line
  labels?: { x: number; y: number; text: string }[];
  markers?: [number, number][]; // data points drawn as crosses
  noLine?: boolean; // draw only the markers
  title?: string; // accessible description
}

const W = 360;
const H = 260;
const L = 52; // left margin
const B = 42; // bottom margin
const T = 14;
const R = 16;

export function graphSvg(g: GraphSpec): string {
  const pw = W - L - R;
  const ph = H - T - B;
  const sx = (x: number) => L + (x / g.xMax) * pw;
  const yMin = g.yMin ?? 0;
  const sy = (y: number) => T + ph - ((y - yMin) / (g.yMax - yMin)) * ph;
  const r = (n: number) => Math.round(n * 10) / 10;

  const parts: string[] = [];

  // Grid
  for (let x = 0; x <= g.xMax + 1e-9; x += g.xStep) {
    parts.push(`<line class="grid" x1="${r(sx(x))}" y1="${T}" x2="${r(sx(x))}" y2="${T + ph}"/>`);
    parts.push(`<text class="tick" x="${r(sx(x))}" y="${T + ph + 16}" text-anchor="middle">${+x.toFixed(6)}</text>`);
  }
  for (let y = yMin; y <= g.yMax + 1e-9; y += g.yStep) {
    parts.push(`<line class="grid" x1="${L}" y1="${r(sy(y))}" x2="${L + pw}" y2="${r(sy(y))}"/>`);
    parts.push(`<text class="tick" x="${L - 6}" y="${r(sy(y)) + 4}" text-anchor="end">${String(+y.toFixed(6)).replace('-', '−')}</text>`);
  }

  // Axes
  parts.push(`<line class="axis" x1="${L}" y1="${T + ph}" x2="${L + pw}" y2="${T + ph}"/>`);
  parts.push(`<line class="axis" x1="${L}" y1="${T}" x2="${L}" y2="${T + ph}"/>`);
  parts.push(`<text class="label" x="${L + pw / 2}" y="${H - 4}" text-anchor="middle">${g.xLabel}</text>`);
  parts.push(
    `<text class="label" x="12" y="${T + ph / 2}" text-anchor="middle" transform="rotate(-90 12 ${T + ph / 2})">${g.yLabel}</text>`,
  );

  const pts = g.points.map(([x, y]) => [r(sx(x)), r(sy(y))] as const);

  if (g.shade && pts.length > 1) {
    const poly = [`${pts[0][0]},${T + ph}`, ...pts.map(([x, y]) => `${x},${y}`), `${pts[pts.length - 1][0]},${T + ph}`];
    parts.push(`<polygon class="area" points="${poly.join(' ')}"/>`);
  }

  if (g.noLine || pts.length < 2) {
    // no line
  } else if (g.curve && pts.length > 2) {
    // Smooth curve (Catmull-Rom spline converted to Bézier segments).
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(i + 2, pts.length - 1)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${p2[0]},${p2[1]}`;
    }
    parts.push(`<path class="line" d="${d}"/>`);
  } else {
    parts.push(`<polyline class="line" points="${pts.map(([x, y]) => `${x},${y}`).join(' ')}"/>`);
  }

  for (const [mx, my] of g.markers ?? []) {
    const cx = r(sx(mx));
    const cy = r(sy(my));
    parts.push(`<path class="marker" d="M${cx - 5},${cy - 5} L${cx + 5},${cy + 5} M${cx - 5},${cy + 5} L${cx + 5},${cy - 5}"/>`);
  }

  for (const lab of g.labels ?? []) {
    parts.push(`<text class="seg" x="${r(sx(lab.x))}" y="${r(sy(lab.y))}" text-anchor="middle">${lab.text}</text>`);
  }

  const title = g.title ?? `Graph of ${g.yLabel} against ${g.xLabel}`;
  return `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">${parts.join('')}</svg>`;
}
