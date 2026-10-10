// SVG figures for Unit 12 (magnets and electric charge). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.5, size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

const N_COL = '#d84b3a';
const S_COL = '#3a6fd8';

// A small bar magnet. left = pole at the left end.
function barMagnet(x: number, y: number, w: number, h: number, left: 'N' | 'S'): string {
  const right = left === 'N' ? 'S' : 'N';
  const col = (p: string) => (p === 'N' ? N_COL : S_COL);
  return (
    `<rect x="${x}" y="${y}" width="${w / 2}" height="${h}" style="fill:${col(left)}"/>` +
    `<rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h}" style="fill:${col(right)}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:none;stroke:var(--ink);stroke-width:1.2"/>` +
    `<text class="txt-light" x="${x + 12}" y="${y + h / 2 + 5}" text-anchor="middle" style="font-weight:700;font-size:14px">${left}</text>` +
    `<text class="txt-light" x="${x + w - 12}" y="${y + h / 2 + 5}" text-anchor="middle" style="font-weight:700;font-size:14px">${right}</text>`
  );
}

// Forces between magnetic poles.
export function polesForcesSvg(): string {
  const row = (y: number, a: 'N' | 'S', b: 'N' | 'S', attract: boolean, label: string) =>
    barMagnet(30, y, 100, 26, a) +
    barMagnet(170, y, 100, 26, b) +
    (attract
      ? arrow(70, y + 40, 112, y + 40, 'arrow2', 2.2, 7) + arrow(230, y + 40, 188, y + 40, 'arrow2', 2.2, 7)
      : arrow(112, y + 40, 70, y + 40, 'arrow2', 2.2, 7) + arrow(188, y + 40, 230, y + 40, 'arrow2', 2.2, 7)) +
    `<text class="txt" x="296" y="${y + 18}" style="font-weight:700">${label}</text>`;
  return svg('0 0 440 208', 'Unlike poles attract. Like poles repel', `
    ${row(12, 'S', 'S', true, 'N and S: attract')}
    ${row(78, 'S', 'N', false, 'N and N: repel')}
    ${row(144, 'N', 'S', false, 'S and S: repel')}
  `);
}

// Induced magnetism: a magnet makes an iron nail into a magnet.
export function inducedSvg(): string {
  const clip = (x: number, y: number) => `<rect x="${x - 4}" y="${y}" width="8" height="18" rx="4" style="fill:none;stroke:var(--ink-soft);stroke-width:1.6"/>`;
  return svg('0 0 440 190', 'A bar magnet near an iron nail. The nail becomes a magnet: its end near the magnet becomes an S pole. Paper clips hang from the nail', `
    ${barMagnet(30, 50, 120, 30, 'S')}
    <rect x="166" y="60" width="150" height="10" style="fill:#9aa0a6;stroke:var(--ink);stroke-width:1"/>
    <polygon points="316,58 316,72 334,65" style="fill:#9aa0a6;stroke:var(--ink);stroke-width:1"/>
    <rect x="162" y="54" width="6" height="22" style="fill:#9aa0a6;stroke:var(--ink);stroke-width:1"/>
    <text class="txt" x="178" y="50" style="font-weight:700">S</text>
    <text class="txt" x="306" y="50" style="font-weight:700">N</text>
    ${clip(326, 74)}${clip(326, 92)}${clip(326, 110)}
    <text class="txt" x="240" y="92" text-anchor="middle">iron nail</text>
    <text class="txt" x="220" y="160" text-anchor="middle">The nail becomes a magnet: induced magnetism.</text>
    <text class="txt" x="220" y="178" text-anchor="middle">The pole near the magnet is the opposite pole, so they attract.</text>
  `);
}

// Forces between charges.
export function chargesSvg(): string {
  const charge = (x: number, y: number, s: '+' | '−') =>
    `<circle cx="${x}" cy="${y}" r="16" style="fill:${s === '+' ? N_COL : S_COL}"/>` +
    `<text class="txt-light" x="${x}" y="${y + 6}" text-anchor="middle" style="font-weight:700;font-size:18px">${s}</text>`;
  const row = (y: number, a: '+' | '−', b: '+' | '−', label: string) => {
    const attract = a !== b;
    return charge(90, y, a) + charge(200, y, b) +
      (attract ? arrow(108, y, 140, y, 'arrow2', 2.2, 7) + arrow(182, y, 150, y, 'arrow2', 2.2, 7)
        : arrow(72, y, 34, y, 'arrow2', 2.2, 7) + arrow(218, y, 256, y, 'arrow2', 2.2, 7)) +
      `<text class="txt" x="280" y="${y + 5}" style="font-weight:700">${label}</text>`;
  };
  return svg('0 0 500 180', 'Like charges repel. Unlike charges attract', `
    ${row(30, '+', '+', 'positive and positive: repel')}
    ${row(90, '−', '−', 'negative and negative: repel')}
    ${row(150, '+', '−', 'positive and negative: attract')}
  `);
}

// Charging by friction: electrons move from the cloth to the polythene rod.
export function frictionSvg(): string {
  const signs = (x0: number, y0: number, n: number, s: string, dx: number) =>
    Array.from({ length: n }, (_, k) => `<text class="txt" x="${x0 + k * dx}" y="${y0}" text-anchor="middle" style="font-weight:700;font-size:15px">${s}</text>`).join('');
  return svg('0 0 460 200', 'A polythene rod is rubbed with a cloth. Electrons move from the cloth to the rod. The rod becomes negative and the cloth becomes positive', `
    <text class="txt" x="110" y="20" text-anchor="middle" style="font-weight:700">before rubbing</text>
    <rect x="30" y="40" width="160" height="22" rx="6" style="fill:#3a3f4b"/>
    <path d="M40,90 q20,-12 40,0 t40,0 t40,0 v30 h-120 Z" style="fill:#c9a227;opacity:0.7;stroke:var(--ink)"/>
    <text class="txt" x="110" y="146" text-anchor="middle">rod: neutral; cloth: neutral</text>
    ${arrow(205, 90, 255, 90, 'arrow', 2.5, 9)}
    <text class="txt" x="350" y="20" text-anchor="middle" style="font-weight:700">after rubbing</text>
    <rect x="270" y="40" width="160" height="22" rx="6" style="fill:#3a3f4b"/>
    ${signs(290, 80, 6, '−', 24)}
    <path d="M280,100 q20,-12 40,0 t40,0 t40,0 v30 h-120 Z" style="fill:#c9a227;opacity:0.7;stroke:var(--ink)"/>
    ${signs(298, 124, 5, '+', 24)}
    <text class="txt" x="350" y="152" text-anchor="middle">rod: negative; cloth: positive</text>
    <text class="txt" x="230" y="188" text-anchor="middle">Electrons (negative) move from the cloth to the rod.</text>
  `);
}

// A gold-leaf electroscope: uncharged and charged.
export function electroscopeSvg(): string {
  const scope = (x: number, charged: boolean) => {
    const leaf = charged
      ? `<line x1="${x}" y1="120" x2="${x + 26}" y2="150" style="stroke:#c9a227;stroke-width:4"/>`
      : `<line x1="${x + 2}" y1="120" x2="${x + 3}" y2="160" style="stroke:#c9a227;stroke-width:4"/>`;
    const minus = charged
      ? [[-16, 34], [0, 34], [16, 34], [-6, 100], [-6, 130], [26, 136]].map(([dx, y]) => `<text class="txt" x="${x + dx}" y="${y}" text-anchor="middle" style="font-weight:700">−</text>`).join('')
      : '';
    return `
      <rect x="${x - 50}" y="70" width="100" height="110" rx="8" style="fill:#4a90d9;opacity:0.12;stroke:var(--ink);stroke-width:1.5"/>
      <ellipse cx="${x}" cy="44" rx="30" ry="6" style="fill:#c9a227;stroke:var(--ink)"/>
      <rect x="${x - 3}" y="48" width="6" height="88" style="fill:#c9a227;stroke:var(--ink);stroke-width:0.8"/>
      <rect x="${x - 10}" y="66" width="20" height="10" class="stone"/>
      ${leaf}${minus}`;
  };
  return svg('0 0 460 230', 'A gold-leaf electroscope. When it is charged, the gold leaf rises away from the metal rod', `
    ${scope(120, false)}
    ${scope(340, true)}
    <text class="txt" x="120" y="204" text-anchor="middle" style="font-weight:700">not charged</text>
    <text class="txt" x="120" y="221" text-anchor="middle">the leaf hangs down</text>
    <text class="txt" x="340" y="204" text-anchor="middle" style="font-weight:700">charged</text>
    <text class="txt" x="340" y="221" text-anchor="middle">same charge on rod and leaf: they repel</text>
    <text class="txt" x="190" y="48">metal cap</text>
    <text class="txt" x="190" y="128">gold leaf</text>
    <line class="soft" x1="186" y1="124" x2="126" y2="138"/>
  `);
}

// Electric field patterns: point charge, charged sphere, parallel plates.
export function electricFieldsSvg(): string {
  const radial = (cx: number, cy: number, r0: number, r1x: number, outward: boolean) =>
    Array.from({ length: 12 }, (_, k) => {
      const a = (2 * Math.PI * k) / 12;
      const x1 = cx + r0 * Math.cos(a);
      const y1 = cy + r0 * Math.sin(a);
      const x2 = cx + r1x * Math.cos(a);
      const y2 = cy + r1x * Math.sin(a);
      return outward ? arrow(x1, y1, x2, y2, 'arrow', 1.6, 7) : arrow(x2, y2, x1, y1, 'arrow', 1.6, 7);
    }).join('');
  const plates = [430, 460, 490, 520, 550].map((x) => arrow(x, 58, x, 152, 'arrow', 1.6, 7)).join('');
  return svg('0 0 600 210', 'Electric field patterns: lines go out from a positive point charge, into a negatively charged sphere, and straight from a positive plate to a negative plate', `
    ${radial(100, 100, 14, 74, true)}
    <circle cx="100" cy="100" r="9" style="fill:${N_COL}"/><text class="txt-light" x="100" y="105" text-anchor="middle" style="font-weight:700">+</text>
    ${radial(300, 100, 30, 80, false)}
    <circle cx="300" cy="100" r="26" style="fill:${S_COL}"/><text class="txt-light" x="300" y="106" text-anchor="middle" style="font-weight:700;font-size:18px">−</text>
    <rect x="415" y="44" width="150" height="10" style="fill:${N_COL}"/>
    <rect x="415" y="156" width="150" height="10" style="fill:${S_COL}"/>
    ${plates}
    <text class="txt" x="${415 + 160}" y="54">+</text>
    <text class="txt" x="${415 + 160}" y="166">−</text>
    <text class="txt" x="100" y="198" text-anchor="middle">positive point charge</text>
    <text class="txt" x="300" y="198" text-anchor="middle">negative charged sphere</text>
    <text class="txt" x="490" y="198" text-anchor="middle">parallel plates</text>
  `);
}

// Conductors and insulators: free electrons in a metal; electrons held by atoms in an insulator.
export function conductorsSvg(): string {
  const ions: string[] = [];
  const free: string[] = [];
  const held: string[] = [];
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 4; j++) {
      const x = 40 + i * 30;
      const y = 50 + j * 30;
      ions.push(`<circle cx="${x}" cy="${y}" r="9" style="fill:${N_COL};opacity:0.8"/><text class="txt-light" x="${x}" y="${y + 4}" text-anchor="middle" style="font-size:11px;font-weight:700">+</text>`);
      const ax = 270 + i * 30;
      held.push(`<circle cx="${ax}" cy="${y}" r="9" style="fill:#9aa0a6"/><circle cx="${ax + 11}" cy="${y - 7}" r="3" style="fill:${S_COL}"/>`);
    }
  const fe = [[55, 38], [86, 64], [118, 40], [150, 70], [178, 52], [64, 96], [100, 122], [132, 98], [170, 128], [48, 140], [196, 104]];
  for (const [x, y] of fe) free.push(`<circle cx="${x}" cy="${y}" r="3.5" style="fill:${S_COL}"/>`);
  return svg('0 0 460 210', 'In a metal, some electrons are free to move between the ions. In an insulator, every electron is held by its atom', `
    <rect x="22" y="30" width="196" height="132" rx="6" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>
    <rect x="252" y="30" width="196" height="132" rx="6" style="fill:none;stroke:var(--ink);stroke-width:1.5"/>
    ${ions.join('')}${free.join('')}${held.join('')}
    <text class="txt" x="120" y="20" text-anchor="middle" style="font-weight:700">conductor (metal)</text>
    <text class="txt" x="350" y="20" text-anchor="middle" style="font-weight:700">insulator (plastic)</text>
    <text class="txt" x="120" y="184" text-anchor="middle">free electrons can move</text>
    <text class="txt" x="350" y="184" text-anchor="middle">electrons cannot move</text>
    <text class="txt" x="230" y="204" text-anchor="middle">blue dots: electrons</text>
  `);
}
