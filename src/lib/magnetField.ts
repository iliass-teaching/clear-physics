// Magnetic field lines of bar magnets, computed from magnetic poles (a simple model:
// each pole acts like a point source, N = +1, S = −1, field ∝ 1/r²).
// Used by the static figures and by MagnetSim (pure functions: no DOM).

export interface Pole {
  x: number;
  y: number;
  q: number; // +1 for N, −1 for S
}

export interface Magnet {
  x: number; // left
  y: number; // top
  w: number;
  h: number;
  left: 'N' | 'S'; // pole at the left end
}

export type Setup = 'one' | 'attract' | 'repel';

export const W = 600;
export const H = 340;

export function magnets(setup: Setup): Magnet[] {
  if (setup === 'one') return [{ x: 220, y: 150, w: 160, h: 40, left: 'S' }];
  if (setup === 'attract')
    return [
      { x: 50, y: 150, w: 150, h: 40, left: 'S' },
      { x: 400, y: 150, w: 150, h: 40, left: 'S' },
    ];
  return [
    { x: 50, y: 150, w: 150, h: 40, left: 'S' },
    { x: 400, y: 150, w: 150, h: 40, left: 'N' },
  ];
}

export function poles(ms: Magnet[]): Pole[] {
  const out: Pole[] = [];
  for (const m of ms) {
    const cy = m.y + m.h / 2;
    const l = m.left === 'N' ? 1 : -1;
    out.push({ x: m.x + 12, y: cy, q: l }, { x: m.x + m.w - 12, y: cy, q: -l });
  }
  return out;
}

export function field(ps: Pole[], x: number, y: number): [number, number] {
  let bx = 0;
  let by = 0;
  for (const p of ps) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r2 = dx * dx + dy * dy + 1;
    const r3 = r2 * Math.sqrt(r2);
    bx += (p.q * dx) / r3;
    by += (p.q * dy) / r3;
  }
  return [bx, by];
}

const inside = (ms: Magnet[], x: number, y: number) => ms.some((m) => x > m.x && x < m.x + m.w && y > m.y && y < m.y + m.h);

// Field lines start near each N pole and follow the field until they reach an S pole or leave the drawing.
export function fieldLines(setup: Setup, count = 14): [number, number][][] {
  const ms = magnets(setup);
  const ps = poles(ms);
  const lines: [number, number][][] = [];
  for (const p of ps.filter((q) => q.q > 0)) {
    for (let k = 0; k < count; k++) {
      const a = (2 * Math.PI * (k + 0.5)) / count;
      let x = p.x + 14 * Math.cos(a);
      let y = p.y + 14 * Math.sin(a);
      // Move out of the magnet along the start direction.
      let guard = 0;
      while (inside(ms, x, y) && guard < 40) {
        x += 2 * Math.cos(a);
        y += 2 * Math.sin(a);
        guard++;
      }
      if (inside(ms, x, y)) continue;
      // Skip lines that would start by going back into the same magnet.
      const [fx, fy] = field(ps, x, y);
      const n0 = Math.hypot(fx, fy);
      if (inside(ms, x + (6 * fx) / n0, y + (6 * fy) / n0)) continue;
      const pts: [number, number][] = [[x, y]];
      for (let s = 0; s < 1200; s++) {
        const [bx, by] = field(ps, x, y);
        const n = Math.hypot(bx, by);
        if (n === 0) break;
        // Midpoint (RK2) step of 3 px.
        const mx = x + (1.5 * bx) / n;
        const my = y + (1.5 * by) / n;
        const [cx, cy] = field(ps, mx, my);
        const nc = Math.hypot(cx, cy);
        x += (3 * cx) / nc;
        y += (3 * cy) / nc;
        pts.push([x, y]);
        if (inside(ms, x, y)) break;
        if (x < -80 || x > W + 80 || y < -80 || y > H + 80) break;
      }
      if (pts.length > 4) lines.push(pts);
    }
  }
  return lines;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

// SVG for the magnets.
export function magnetsSvg(setup: Setup): string {
  return magnets(setup)
    .map((m) => {
      const half = m.w / 2;
      const leftFill = m.left === 'N' ? '#d84b3a' : '#3a6fd8';
      const rightFill = m.left === 'N' ? '#3a6fd8' : '#d84b3a';
      const right = m.left === 'N' ? 'S' : 'N';
      return (
        `<rect x="${m.x}" y="${m.y}" width="${half}" height="${m.h}" style="fill:${leftFill}"/>` +
        `<rect x="${m.x + half}" y="${m.y}" width="${half}" height="${m.h}" style="fill:${rightFill}"/>` +
        `<rect x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>` +
        `<text x="${m.x + 16}" y="${m.y + m.h / 2 + 6}" text-anchor="middle" style="fill:#fff;font-weight:700;font-size:calc(17px * min(var(--tz, 1), 1.4));font-family:var(--sans)">${m.left}</text>` +
        `<text x="${m.x + m.w - 16}" y="${m.y + m.h / 2 + 6}" text-anchor="middle" style="fill:#fff;font-weight:700;font-size:calc(17px * min(var(--tz, 1), 1.4));font-family:var(--sans)">${right}</text>`
      );
    })
    .join('');
}

// SVG for the field lines, with an arrow head (N → S) on each line.
export function fieldLinesSvg(setup: Setup, count = 14): string {
  return fieldLines(setup, count)
    .map((pts) => {
      const d = `M${pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' L')}`;
      // Arrow head about one third along the line (inside the drawing).
      const visible = pts.filter(([x, y]) => x > 10 && x < W - 10 && y > 10 && y < H - 10);
      let head = '';
      if (visible.length > 12) {
        const i = Math.floor(visible.length / 3);
        const [x1, y1] = visible[i];
        const [x2, y2] = visible[i + 2];
        const a = Math.atan2(y2 - y1, x2 - x1);
        const p = (s: number) => `${r1(x2 - 9 * Math.cos(a + s))},${r1(y2 - 9 * Math.sin(a + s))}`;
        head = `<polygon class="arrow-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
      }
      return `<path class="arrow" style="stroke-width:1.6" fill="none" d="${d}"/>${head}`;
    })
    .join('');
}

export function magnetFieldSvg(setup: Setup, label: string, count = 14): string {
  return `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" style="overflow:hidden">${fieldLinesSvg(setup, count)}${magnetsSvg(setup)}</svg>`;
}
