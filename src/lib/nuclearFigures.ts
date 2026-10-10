// SVG figures for Unit 16 (atoms and radioactivity). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.2, size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

const P_COL = '#d84b3a';
const N_COL = '#9aa0a6';
const E_COL = '#3a6fd8';

// Exact colouring helper: p protons then n neutrons, mixed.
function nucleusExact(cx: number, cy: number, p: number, n: number, r = 6): string {
  const order: boolean[] = [];
  let pp = p;
  let nn = n;
  for (let k = 0; k < p + n; k++) {
    const takeP = pp > 0 && (nn === 0 || k % 2 === 0);
    order.push(takeP);
    if (takeP) pp--;
    else nn--;
  }
  return order
    .map((isP, k) => {
      const rr = r * 1.15 * Math.sqrt(k);
      const a = k * 2.4;
      return `<circle cx="${r1(cx + rr * Math.cos(a))}" cy="${r1(cy + rr * Math.sin(a))}" r="${r}" style="fill:${isP ? P_COL : N_COL};stroke:var(--ink);stroke-width:0.8"/>`;
    })
    .join('');
}

// The nuclear model of the atom (a lithium atom: 3 protons, 4 neutrons, 3 electrons).
export function atomSvg(): string {
  return svg('0 0 460 250', 'An atom: a small positive nucleus of protons and neutrons, with negative electrons in orbit around it. Not to scale', `
    <circle cx="160" cy="125" r="60" style="fill:none;stroke:var(--ink-soft);stroke-dasharray:4 4"/>
    <circle cx="160" cy="125" r="100" style="fill:none;stroke:var(--ink-soft);stroke-dasharray:4 4"/>
    ${nucleusExact(160, 125, 3, 4, 6)}
    <circle cx="220" cy="125" r="6" style="fill:${E_COL}"/>
    <circle cx="100" cy="125" r="6" style="fill:${E_COL}"/>
    <circle cx="160" cy="25" r="6" style="fill:${E_COL}"/>
    <circle cx="300" cy="60" r="7" style="fill:${P_COL};stroke:var(--ink);stroke-width:0.8"/><text class="txt" x="314" y="65">proton (+1)</text>
    <circle cx="300" cy="100" r="7" style="fill:${N_COL};stroke:var(--ink);stroke-width:0.8"/><text class="txt" x="314" y="105">neutron (0)</text>
    <circle cx="300" cy="140" r="6" style="fill:${E_COL}"/><text class="txt" x="314" y="145">electron (−1)</text>
    <text class="txt" x="300" y="190">nucleus: protons and neutrons</text>
    <text class="txt" x="300" y="208">(very small, positive)</text>
    <text class="txt" x="160" y="244" text-anchor="middle">not to scale: the nucleus is about 100 000 times smaller</text>
  `);
}

// Ions: losing an electron gives a positive ion; gaining one gives a negative ion.
export function ionsSvg(): string {
  const atom = (cx: number, electrons: number, label: string, sub: string) => {
    const es = Array.from({ length: electrons }, (_, k) => {
      const a = (2 * Math.PI * k) / electrons - Math.PI / 2;
      return `<circle cx="${r1(cx + 42 * Math.cos(a))}" cy="${r1(80 + 42 * Math.sin(a))}" r="5" style="fill:${E_COL}"/>`;
    }).join('');
    return `<circle cx="${cx}" cy="80" r="42" style="fill:none;stroke:var(--ink-soft);stroke-dasharray:4 4"/>
      <circle cx="${cx}" cy="80" r="14" style="fill:${P_COL}"/><text class="txt-light" x="${cx}" y="85" text-anchor="middle" style="font-weight:700">+3</text>${es}
      <text class="txt" x="${cx}" y="150" text-anchor="middle" style="font-weight:700">${label}</text>
      <text class="txt" x="${cx}" y="170" text-anchor="middle">${sub}</text>`;
  };
  return svg('0 0 500 184', 'An atom with 3 protons and 3 electrons is neutral. If it loses an electron it becomes a positive ion. If it gains an electron it becomes a negative ion', `
    ${atom(80, 2, 'positive ion', '3 protons, 2 electrons: +1')}
    ${atom(250, 3, 'neutral atom', '3 protons, 3 electrons: 0')}
    ${atom(420, 4, 'negative ion', '3 protons, 4 electrons: −1')}
    ${arrow(200, 40, 140, 40, 'arrow2', 1.8, 7)}<text class="txt" x="170" y="30" text-anchor="middle">loses e⁻</text>
    ${arrow(300, 40, 360, 40, 'arrow2', 1.8, 7)}<text class="txt" x="330" y="30" text-anchor="middle">gains e⁻</text>
  `);
}

// Alpha particles fired at a thin gold foil.
export function alphaScatterSvg(): string {
  const nuclei = [50, 100, 150, 200].map((y) => `<circle cx="250" cy="${y}" r="3.5" style="fill:${P_COL}"/>`).join('');
  return svg('0 0 500 272', 'Alpha particles fired at gold foil: most go straight through, a few are deflected, and a very few bounce back', `
    <rect x="240" y="20" width="20" height="210" style="fill:#e8c34a;opacity:0.35"/>
    ${nuclei}
    ${[40, 75, 125, 175, 215].map((y) => arrow(20, y, 470, y, 'arrow', 1.6, 7)).join('')}
    <path class="arrow2" style="stroke-width:1.8" fill="none" d="M20,92 L238,92 Q252,94 470,140"/>${head(470, 140, 0.21, 'arrow2', 7)}
    <path class="arrow2" style="stroke-width:1.8" fill="none" d="M20,152 L236,152 Q246,150 470,214"/>${head(470, 214, 0.28, 'arrow2', 7)}
    <path class="arrow2" style="stroke-width:1.8" fill="none" d="M20,198 L242,198 Q256,200 40,250"/>${head(40, 250, Math.PI - 0.23, 'arrow2', 7)}
    <text class="txt" x="250" y="14" text-anchor="middle">thin gold foil</text>
    <text class="txt" x="20" y="26">α-particles</text>
    <text class="txt" x="490" y="28" text-anchor="end">most go straight through</text>
    <text class="txt" x="490" y="160" text-anchor="end">a few are deflected</text>
    <text class="txt" x="140" y="266" text-anchor="middle">a very few bounce back</text>
  `);
}

// Nuclide notation.
export function nuclideNotationSvg(): string {
  return svg('0 0 420 170', 'Nuclide notation: the nucleon number A at the top left, the proton number Z at the bottom left, and the symbol of the element', `
    <text class="txt" x="190" y="104" style="font-size:64px;font-weight:700">Na</text>
    <text class="txt" x="182" y="58" text-anchor="end" style="font-size:28px;font-weight:700">23</text>
    <text class="txt" x="182" y="118" text-anchor="end" style="font-size:28px;font-weight:700">11</text>
    <line class="soft" x1="140" y1="48" x2="70" y2="40"/>
    <line class="soft" x1="140" y1="110" x2="70" y2="130"/>
    <text class="txt" x="66" y="36" text-anchor="end" style="font-weight:700">A</text>
    <text class="txt" x="66" y="136" text-anchor="end" style="font-weight:700">Z</text>
    <text class="txt" x="10" y="14">nucleon number</text>
    <text class="txt" x="10" y="156">proton number</text>
    <text class="txt" x="300" y="70">element: sodium</text>
    <text class="txt" x="300" y="92">neutrons: 23 − 11 = 12</text>
  `);
}

// Two isotopes of carbon.
export function isotopesSvg(): string {
  return svg('0 0 440 190', 'Two isotopes of carbon: carbon-12 has 6 protons and 6 neutrons; carbon-14 has 6 protons and 8 neutrons', `
    ${nucleusExact(110, 85, 6, 6, 9)}
    ${nucleusExact(330, 85, 6, 8, 9)}
    <text class="txt" x="110" y="160" text-anchor="middle" style="font-weight:700">carbon-12</text>
    <text class="txt" x="110" y="178" text-anchor="middle">6 protons, 6 neutrons</text>
    <text class="txt" x="330" y="160" text-anchor="middle" style="font-weight:700">carbon-14</text>
    <text class="txt" x="330" y="178" text-anchor="middle">6 protons, 8 neutrons</text>
  `);
}

// Fission (top) and fusion (bottom).
export function fissionFusionSvg(): string {
  const neutron = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="6" style="fill:${N_COL};stroke:var(--ink);stroke-width:0.8"/>`;
  return svg('0 0 560 300', 'Fission: a neutron hits a uranium-235 nucleus, which splits into two smaller nuclei and two or three neutrons, and releases energy. Fusion: two small nuclei join to make a bigger nucleus and release energy', `
    <text class="txt" x="10" y="20" style="font-weight:700">fission: a big nucleus splits</text>
    ${neutron(30, 85)}${arrow(40, 85, 92, 85, 'arrow', 1.8, 7)}
    ${nucleusExact(140, 85, 9, 13, 5.5)}
    <text class="txt" x="140" y="146" text-anchor="middle">uranium-235</text>
    ${arrow(200, 85, 250, 85, 'arrow', 2.5, 9)}
    ${nucleusExact(310, 55, 5, 6, 5.5)}${nucleusExact(310, 120, 4, 6, 5.5)}
    ${neutron(390, 50)}${neutron(400, 88)}${neutron(390, 124)}
    ${arrow(400, 50, 440, 40, 'arrow', 1.4, 6)}${arrow(410, 88, 450, 88, 'arrow', 1.4, 6)}${arrow(400, 124, 440, 134, 'arrow', 1.4, 6)}
    <text class="txt" x="470" y="82" style="font-weight:700;fill:var(--exit)">+ energy</text>
    <text class="txt" x="310" y="160" text-anchor="middle">two smaller nuclei + 2 or 3 neutrons</text>
    <text class="txt" x="10" y="200" style="font-weight:700">fusion: small nuclei join</text>
    ${nucleusExact(60, 255, 1, 1, 7)}${nucleusExact(130, 255, 1, 2, 7)}
    <text class="txt" x="95" y="260" text-anchor="middle" style="font-weight:700">+</text>
    ${arrow(170, 255, 230, 255, 'arrow', 2.5, 9)}
    ${nucleusExact(290, 255, 2, 2, 7)}${neutron(350, 255)}
    <text class="txt" x="325" y="260" text-anchor="middle" style="font-weight:700">+</text>
    <text class="txt" x="400" y="260" style="font-weight:700;fill:var(--exit)">+ energy</text>
    <text class="txt" x="95" y="292" text-anchor="middle">two hydrogen nuclei</text>
    <text class="txt" x="300" y="292" text-anchor="middle">helium + a neutron</text>
  `);
}

// Penetration of alpha, beta and gamma radiation.
export function penetrationSvg(): string {
  const row = (y: number, name: string, stopAt: number, cls: string) =>
    `<text class="txt" x="20" y="${y + 5}" style="font-weight:700">${name}</text>` +
    arrow(70, y, stopAt, y, cls, 2.5, 8);
  return svg('0 0 520 214', 'Alpha is stopped by paper. Beta is stopped by a few millimetres of aluminium. Gamma is only reduced by thick lead', `
    <rect x="160" y="30" width="6" height="140" style="fill:#f4efe0;stroke:var(--ink-soft)"/>
    <rect x="270" y="30" width="16" height="140" style="fill:#c3c7cf;stroke:var(--ink-soft)"/>
    <rect x="380" y="30" width="44" height="140" style="fill:#6b7280;stroke:var(--ink-soft)"/>
    ${row(55, 'α', 158, 'arrow2')}
    ${row(100, 'β', 268, 'arrow')}
    ${row(145, 'γ', 500, 'ray')}
    <line class="ray" style="stroke-width:1.2;stroke-dasharray:4 4" x1="424" y1="145" x2="500" y2="145"/>
    <text class="txt" x="163" y="190" text-anchor="middle">paper</text>
    <text class="txt" x="278" y="190" text-anchor="middle">aluminium</text>
    <text class="txt" x="278" y="208" text-anchor="middle">(a few mm)</text>
    <text class="txt" x="402" y="190" text-anchor="middle">lead</text>
    <text class="txt" x="402" y="208" text-anchor="middle">(several cm)</text>
  `);
}

// Deflection in an electric field (between plates) and in a magnetic field.
export function deflectionSvg(): string {
  return svg('0 0 560 240', 'In an electric field, alpha bends a little towards the negative plate, beta bends more towards the positive plate, gamma goes straight on. In a magnetic field, alpha and beta curve in opposite directions and gamma goes straight on', `
    <rect x="80" y="30" width="180" height="10" style="fill:#d84b3a"/><text class="txt" x="268" y="40">+</text>
    <rect x="80" y="190" width="180" height="10" style="fill:#3a6fd8"/><text class="txt" x="268" y="200">−</text>
    <path class="arrow" style="stroke-width:2" fill="none" d="M20,115 L80,115 Q170,115 260,60"/>${head(260, 60, -0.55, 'arrow', 7)}
    <path class="arrow2" style="stroke-width:2" fill="none" d="M20,115 L80,115 Q170,115 260,138"/>${head(260, 138, 0.25, 'arrow2', 7)}
    <path class="ray" style="stroke-width:2" fill="none" d="M20,115 L262,115"/>${head(262, 115, 0, 'ray', 7)}
    <text class="txt" x="266" y="64">β</text><text class="txt" x="266" y="148">α</text><text class="txt" x="268" y="119">γ</text>
    <text class="txt" x="170" y="226" text-anchor="middle" style="font-weight:700">electric field</text>
    <rect x="330" y="30" width="200" height="170" style="fill:none;stroke:var(--ink-soft);stroke-dasharray:4 4"/>
    ${[60, 100, 140, 180].flatMap((y) => [360, 410, 460, 510].map((x) => `<text class="txt" x="${x}" y="${y}" text-anchor="middle" style="fill:var(--ink-soft)">×</text>`)).join('')}
    <path class="arrow" style="stroke-width:2" fill="none" d="M300,115 L330,115 Q400,115 430,190"/>${head(430, 190, 1.2, 'arrow', 7)}
    <path class="arrow2" style="stroke-width:2" fill="none" d="M300,115 L330,115 Q450,115 530,80"/>${head(530, 80, -0.4, 'arrow2', 7)}
    <text class="txt" x="420" y="196" text-anchor="end">β</text><text class="txt" x="522" y="72" text-anchor="end">α</text><text class="txt" x="522" y="108" text-anchor="end">γ</text>
    <path class="ray" style="stroke-width:2" fill="none" d="M300,115 L530,115"/>${head(530, 115, 0, 'ray', 7)}
    <text class="txt" x="430" y="226" text-anchor="middle" style="font-weight:700">magnetic field (into the page)</text>
  `);
}

// A detector (Geiger–Müller tube) connected to a counter.
export function detectorSvg(): string {
  return svg('0 0 460 150', 'A radioactive source, a Geiger–Müller tube and a counter', `
    <rect x="20" y="62" width="40" height="26" rx="4" class="stone"/>
    <text class="txt" x="40" y="110" text-anchor="middle">source</text>
    ${arrow(64, 75, 130, 75, 'arrow2', 1.6, 7)}
    <rect x="140" y="60" width="140" height="30" rx="15" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    <text class="txt" x="210" y="110" text-anchor="middle">Geiger–Müller tube (detector)</text>
    <polyline class="wire" fill="none" points="280,75 330,75"/>
    <rect x="330" y="50" width="110" height="50" rx="6" style="fill:#10261a"/>
    <text x="385" y="83" text-anchor="middle" style="fill:#7dff9a;font-family:monospace;font-size:20px">00 347</text>
    <text class="txt" x="385" y="120" text-anchor="middle">counter</text>
  `);
}

// A thickness gauge for paper, using a beta source.
export function thicknessGaugeSvg(): string {
  return svg('0 0 500 210', 'Paper passes between a beta source and a detector. If the paper is too thick, fewer beta particles reach the detector and the rollers are adjusted', `
    <circle cx="80" cy="60" r="22" class="stone"/><circle cx="80" cy="128" r="22" class="stone"/>
    <rect x="102" y="88" width="380" height="12" style="fill:#f4efe0;stroke:var(--ink-soft)"/>
    ${arrow(320, 80, 440, 80, 'arrow', 2, 8)}
    <rect x="232" y="140" width="36" height="22" rx="3" class="stone"/>
    ${arrow(250, 138, 250, 104, 'arrow2', 1.6, 6)}${arrow(250, 86, 250, 52, 'arrow2', 1.6, 6)}
    <rect x="226" y="20" width="48" height="28" rx="8" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    <text class="txt" x="282" y="38">detector</text>
    <text class="txt" x="276" y="158">β source</text>
    <text class="txt" x="80" y="186" text-anchor="middle">rollers</text>
    <text class="txt" x="380" y="70" text-anchor="middle">paper moves</text>
    <text class="txt" x="250" y="200" text-anchor="middle">fewer counts → paper too thick → rollers press harder</text>
  `);
}
