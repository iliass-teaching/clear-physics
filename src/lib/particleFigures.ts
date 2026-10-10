// SVG figures for Unit 7 (particles and matter). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

// Small seeded random generator, so that the figures are the same on every build.
function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

// A straight arrow with a small head. cls: 'arrow' (blue) or 'arrow2' (orange).
function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2, head = 7): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (ang: number) => `${r1(x2 - head * Math.cos(a + ang))},${r1(y2 - head * Math.sin(a + ang))}`;
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - head * 0.6 * Math.cos(a))}" y2="${r1(y2 - head * 0.6 * Math.sin(a))}"/>` +
    `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`
  );
}

// A curved arrow (quadratic Bézier) with a head at the end.
function curvedArrow(x1: number, y1: number, cx: number, cy: number, x2: number, y2: number, cls = 'arrow'): string {
  const a = Math.atan2(y2 - cy, x2 - cx);
  const h = 9;
  const p = (ang: number) => `${r1(x2 - h * Math.cos(a + ang))},${r1(y2 - h * Math.sin(a + ang))}`;
  return (
    `<path class="${cls}" style="stroke-width:2.5" d="M${x1},${y1} Q${cx},${cy} ${r1(x2 - 5 * Math.cos(a))},${r1(y2 - 5 * Math.sin(a))}"/>` +
    `<polygon class="${cls}-head" points="${x2},${y2} ${p(0.45)} ${p(-0.45)}"/>`
  );
}

// Particles in a solid, a liquid and a gas.
export function statesSvg(): string {
  const rand = rng(7);
  const parts: string[] = [];
  const boxes = [20, 175, 330];
  const top = 20;
  const bottom = 140;
  for (const x of boxes) parts.push(`<rect class="ink" x="${x}" y="${top}" width="130" height="${bottom - top}"/>`);

  // Solid: a regular pattern, particles touching.
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 5; j++) parts.push(`<circle class="obj" cx="${40 + 18 * i}" cy="${bottom - 11 - 18 * j}" r="8.5"/>`);
  // Small marks: the particles vibrate.
  parts.push(`<path class="soft" d="M33,62 l-4,-3 M33,68 l-4,3 M133,62 l4,-3 M133,68 l4,3" />`);

  // Liquid: close together, no regular pattern, at the bottom of the box.
  // A small "settling" simulation: the particles fall and push each other apart,
  // so that each one rests on the bottom, on a wall or on two particles. No particle floats.
  const R = 8.5;
  const L0 = 175 + R + 1;
  const L1 = 305 - R - 1;
  const floor = bottom - R - 1;
  const liquid: [number, number][] = [];
  for (let n = 0; n < 23; n++) liquid.push([L0 + rand() * (L1 - L0), floor - 40 - rand() * 90]);
  for (let it = 0; it < 3000; it++) {
    for (const p of liquid) p[1] += 0.25;
    for (let pass = 0; pass < 4; pass++) {
      for (let i = 0; i < liquid.length; i++)
        for (let j = i + 1; j < liquid.length; j++) {
          const [p, q] = [liquid[i], liquid[j]];
          const dx = q[0] - p[0];
          const dy = q[1] - p[1];
          const dist = Math.hypot(dx, dy) || 0.01;
          if (dist < 2 * R) {
            const push = (2 * R - dist) / 2;
            p[0] -= (dx / dist) * push;
            p[1] -= (dy / dist) * push;
            q[0] += (dx / dist) * push;
            q[1] += (dy / dist) * push;
          }
        }
      for (const p of liquid) {
        p[0] = Math.min(L1, Math.max(L0, p[0]));
        p[1] = Math.min(floor, p[1]);
      }
    }
  }
  for (const [cx, cy] of liquid) parts.push(`<circle class="obj" cx="${r1(cx)}" cy="${r1(cy)}" r="${R}"/>`);

  // Gas: far apart, moving fast in all directions.
  const gas: [number, number, number][] = [
    [350, 40, 20], [400, 35, 160], [445, 55, 250], [365, 85, 300], [420, 90, 45], [443, 122, 200], [350, 125, 340], [400, 128, 200],
  ];
  for (const [cx, cy, deg] of gas) {
    const a = (deg * Math.PI) / 180;
    parts.push(`<circle class="obj" cx="${cx}" cy="${cy}" r="8.5"/>`);
    parts.push(arrow(cx + 10 * Math.cos(a), cy + 10 * Math.sin(a), cx + 24 * Math.cos(a), cy + 24 * Math.sin(a), 'arrow2', 1.6, 6));
  }

  const names = [
    ['solid', 'vibrate in fixed places'],
    ['liquid', 'slide past each other'],
    ['gas', 'move fast, far apart'],
  ];
  names.forEach(([n, d], i) => {
    parts.push(`<text class="txt" x="${boxes[i] + 65}" y="160" text-anchor="middle" style="font-weight:700">${n}</text>`);
    parts.push(`<text class="txt" x="${boxes[i] + 65}" y="180" text-anchor="middle">${d}</text>`);
  });
  return svg('0 0 480 190', 'Particles in a solid, a liquid and a gas', parts.join(''));
}

// The changes of state between solid, liquid and gas, including solid <-> gas.
export function changesOfStateSvg(): string {
  const box = (x: number, name: string) =>
    `<rect class="box" x="${x}" y="110" width="100" height="40" rx="6"/>` +
    `<text class="txt" x="${x + 50}" y="135" text-anchor="middle" style="font-weight:700;font-size:14px">${name}</text>`;
  return svg('0 -30 480 322', 'Changes of state: melting, boiling or evaporation, sublimation, condensation, freezing, deposition', `
    ${box(20, 'solid')}${box(190, 'liquid')}${box(360, 'gas')}
    ${curvedArrow(95, 106, 155, 72, 215, 106)}
    ${curvedArrow(265, 106, 325, 72, 385, 106)}
    ${curvedArrow(50, 106, 240, -110, 430, 106)}
    ${curvedArrow(215, 154, 155, 194, 95, 154, 'arrow2')}
    ${curvedArrow(385, 154, 325, 194, 265, 154, 'arrow2')}
    ${curvedArrow(430, 154, 240, 370, 50, 154, 'arrow2')}
    <text class="txt" x="155" y="78" text-anchor="middle">melting</text>
    <text class="txt" x="325" y="78" text-anchor="middle">boiling or evaporation</text>
    <text class="txt" x="240" y="-14" text-anchor="middle">sublimation</text>
    <text class="txt" x="155" y="192" text-anchor="middle">freezing</text>
    <text class="txt" x="325" y="192" text-anchor="middle">condensation</text>
    <text class="txt" x="240" y="282" text-anchor="middle">deposition</text>
    <text class="txt" x="10" y="-16" style="font-weight:700">heating →</text>
    <text class="txt" x="10" y="286" style="font-weight:700">← cooling</text>
  `);
}

// The Celsius and kelvin scales side by side.
export function temperatureScalesSvg(): string {
  const y = (c: number) => r1(220 - ((c + 273) / 373) * 190);
  const row = (c: number, k: number, what: string) => `
    <line class="dash" x1="110" y1="${y(c)}" x2="250" y2="${y(c)}"/>
    <line class="ink" x1="104" y1="${y(c)}" x2="116" y2="${y(c)}"/>
    <line class="ink" x1="244" y1="${y(c)}" x2="256" y2="${y(c)}"/>
    <text class="txt" x="98" y="${y(c) + 4}" text-anchor="end">${c === -273 ? '−273' : c} °C</text>
    <text class="txt" x="262" y="${y(c) + 4}">${k} K</text>
    <text class="txt" x="180" y="${y(c) - 6}" text-anchor="middle">${what}</text>`;
  return svg('0 0 360 236', 'The Celsius scale and the kelvin scale. Absolute zero is −273 °C or 0 K', `
    <line class="ink" x1="110" y1="26" x2="110" y2="224"/>
    <line class="ink" x1="250" y1="26" x2="250" y2="224"/>
    <text class="txt" x="110" y="16" text-anchor="middle" style="font-weight:700">Celsius</text>
    <text class="txt" x="250" y="16" text-anchor="middle" style="font-weight:700">kelvin</text>
    ${row(100, 373, 'water boils')}
    ${row(0, 273, 'ice melts')}
    ${row(-273, 0, 'absolute zero')}
  `);
}

// The random path of one smoke particle, seen in a microscope.
export function brownianSvg(): string {
  const rand = rng(11);
  let x = 150;
  let y = 105;
  const pts = [[x, y]];
  for (let i = 0; i < 28; i++) {
    const a = rand() * 2 * Math.PI;
    const l = 10 + rand() * 16;
    let nx = x + l * Math.cos(a);
    let ny = y + l * Math.sin(a);
    if (Math.hypot(nx - 150, ny - 105) > 72) {
      nx = x - l * Math.cos(a);
      ny = y - l * Math.sin(a);
    }
    x = nx;
    y = ny;
    pts.push([r1(x), r1(y)]);
  }
  const last = pts[pts.length - 1];
  return svg('0 0 300 226', 'The zigzag path of one smoke particle in air, seen in a microscope', `
    <circle class="ink" cx="150" cy="105" r="95"/>
    <polyline class="arrow2" style="stroke-width:1.8;stroke-linejoin:round" fill="none" points="${pts.map((p) => p.join(',')).join(' ')}"/>
    <circle class="ink-head" cx="150" cy="105" r="4"/>
    <circle class="obj" cx="${last[0]}" cy="${last[1]}" r="5"/>
    <text class="txt" x="150" y="220" text-anchor="middle">the path of one smoke particle</text>
  `);
}

// A box of gas: particles move at random. arrowLength gives the speed.
function gasBox(x: number, y: number, w: number, h: number, seed: number, n: number, arrowLength: number, minDist = 30): string {
  const rand = rng(seed);
  const parts = [`<rect class="ink" style="stroke-width:2" x="${x}" y="${y}" width="${w}" height="${h}"/>`];
  const placed: [number, number][] = [];
  const inside = (px: number, py: number) => px > x + 3 && px < x + w - 3 && py > y + 3 && py < y + h - 3;
  let tries = 0;
  while (placed.length < n && tries < 2000) {
    tries++;
    const cx = x + 10 + rand() * (w - 20);
    const cy = y + 10 + rand() * (h - 20);
    if (placed.some(([px, py]) => Math.hypot(px - cx, py - cy) < minDist)) continue;
    // Choose a direction where the arrow stays inside the box.
    let a = 0;
    let ok = false;
    for (let t = 0; t < 20 && !ok; t++) {
      a = rand() * 2 * Math.PI;
      ok = inside(cx + (8 + arrowLength) * Math.cos(a), cy + (8 + arrowLength) * Math.sin(a));
    }
    if (!ok) continue;
    placed.push([cx, cy]);
    parts.push(`<circle class="obj" cx="${r1(cx)}" cy="${r1(cy)}" r="6"/>`);
    parts.push(arrow(cx + 8 * Math.cos(a), cy + 8 * Math.sin(a), cx + (8 + arrowLength) * Math.cos(a), cy + (8 + arrowLength) * Math.sin(a), 'arrow2', 1.6, 6));
  }
  return parts.join('');
}

// One particle hits the wall and bounces back: a force on the wall.
export function gasWallSvg(): string {
  return svg('0 0 430 210', 'Gas particles in a box. A particle hits the wall and bounces back, and pushes on the wall', `
    ${gasBox(30, 20, 230, 170, 3, 7, 14)}
    <circle class="obj" cx="245" cy="105" r="6"/>
    ${arrow(185, 60, 237, 99, 'arrow2', 2, 7)}
    ${arrow(240, 113, 190, 152, 'arrow2', 2, 7)}
    ${arrow(266, 105, 316, 105, 'arrow', 3.5, 11)}
    <text class="txt" x="326" y="98" style="font-weight:700">force on</text>
    <text class="txt" x="326" y="117" style="font-weight:700">the wall</text>
    <text class="txt" x="290" y="40">The particle hits</text>
    <text class="txt" x="290" y="59">the wall and</text>
    <text class="txt" x="290" y="78">bounces back.</text>
  `);
}

// The same gas: cold and hot (same volume), or big and small volume (same temperature).
export function gasCompareSvg(kind: 'temperature' | 'volume'): string {
  const left = kind === 'temperature' ? gasBox(20, 20, 160, 120, 5, 8, 9) : gasBox(20, 20, 160, 120, 5, 8, 10);
  const right = kind === 'temperature' ? gasBox(250, 20, 160, 120, 5, 8, 24) : gasBox(250, 20, 80, 120, 9, 8, 10, 20);
  const labels =
    kind === 'temperature'
      ? [['cold gas', 'slower particles'], ['hot gas', 'faster particles: more hits,'], ['', 'and harder hits']]
      : [['big volume', 'fewer hits each second'], ['small volume', 'more hits each second'], ['', '']];
  const cx2 = kind === 'temperature' ? 330 : 290;
  const piston = kind === 'volume' ? `<rect class="stone" x="330" y="14" width="10" height="132"/><line class="ink" style="stroke-width:3" x1="340" y1="80" x2="400" y2="80"/>` : '';
  return svg('0 0 430 208', kind === 'temperature' ? 'The same gas, cold and hot. The hot particles move faster' : 'The same gas in a big volume and in a small volume', `
    ${left}${right}${piston}
    <text class="txt" x="100" y="162" text-anchor="middle" style="font-weight:700">${labels[0][0]}</text>
    <text class="txt" x="100" y="180" text-anchor="middle">${labels[0][1]}</text>
    <text class="txt" x="${cx2}" y="162" text-anchor="middle" style="font-weight:700">${labels[1][0]}</text>
    <text class="txt" x="${cx2}" y="180" text-anchor="middle">${labels[1][1]}</text>
    <text class="txt" x="${cx2}" y="198" text-anchor="middle">${labels[2][1]}</text>
  `);
}
