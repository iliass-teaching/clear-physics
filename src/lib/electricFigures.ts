// SVG figures for Unit 13 (current, p.d., resistance, power). Simple diagrams, not to scale.
import { wire, symbol, junction, circuitSvg } from './circuit';

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.5, size = 8, dashed = false): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}${dashed ? ';stroke-dasharray:6 4' : ''}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

// Conventional current and electron flow in a simple circuit.
export function currentDirectionSvg(): string {
  return circuitSvg('0 0 460 230', 'A cell and a lamp. Conventional current goes from the positive terminal round to the negative terminal. Electrons flow the other way', `
    ${wire([[80, 50], [380, 50], [380, 170], [80, 170], [80, 50]])}
    ${symbol('cell', 80, 110, 90)}
    ${symbol('lamp', 230, 50)}
    <text class="txt" x="98" y="98" style="font-weight:700">+</text>
    <text class="txt" x="98" y="130" style="font-weight:700">−</text>
    ${arrow(300, 188, 160, 188, 'arrow2', 2.5, 9)}
    <text class="txt" x="230" y="210" text-anchor="middle">conventional current: from + to −</text>
    ${arrow(160, 152, 300, 152, 'arrow', 2.5, 9, true)}
    <text class="txt" x="230" y="140" text-anchor="middle">flow of electrons: from − to +</text>
  `);
}

// A circuit to measure resistance: ammeter in series, voltmeter in parallel with the resistor.
export function measureCircuitSvg(): string {
  return circuitSvg('0 0 460 230', 'A cell, a variable resistor, an ammeter in series and a voltmeter in parallel with a resistor', `
    ${wire([[60, 80], [380, 80], [380, 200], [60, 200], [60, 80]])}
    ${wire([[180, 80], [180, 30], [280, 30], [280, 80]])}
    ${junction(180, 80)}${junction(280, 80)}
    ${symbol('battery', 60, 140, 90)}
    ${symbol('resistor', 230, 80)}
    ${symbol('voltmeter', 230, 30)}
    ${symbol('ammeter', 380, 140, 90)}
    ${symbol('variable-resistor', 220, 200)}
    <text class="txt" x="230" y="108" text-anchor="middle">resistor R</text>
    <text class="txt" x="296" y="24">voltmeter: in parallel</text>
    <text class="txt" x="396" y="124">ammeter:</text>
    <text class="txt" x="396" y="143">in series</text>
    <text class="txt" x="220" y="226" text-anchor="middle">variable resistor (to change the current)</text>
  `);
}

// An analogue ammeter with two scales, and a digital ammeter.
export function ammeterDialSvg(): string {
  const cx = 150;
  const cy = 150;
  const R = 110;
  const ang = (f: number) => Math.PI * (1 - f); // f = 0 (left) to 1 (right)
  const ticks: string[] = [];
  for (let k = 0; k <= 10; k++) {
    const a = ang(k / 10);
    const big = k % 5 === 0;
    ticks.push(`<line class="ink" style="stroke-width:${big ? 2 : 1}" x1="${r1(cx + R * Math.cos(a))}" y1="${r1(cy - R * Math.sin(a))}" x2="${r1(cx + (R - (big ? 14 : 8)) * Math.cos(a))}" y2="${r1(cy - (R - (big ? 14 : 8)) * Math.sin(a))}"/>`);
    if (big || k % 2 === 0) {
      ticks.push(`<text class="txt" x="${r1(cx + (R + 12) * Math.cos(a))}" y="${r1(cy - (R + 12) * Math.sin(a) + 4)}" text-anchor="middle" style="font-size:11px">${(k / 10).toFixed(1)}</text>`);
      ticks.push(`<text class="txt" x="${r1(cx + (R - 26) * Math.cos(a))}" y="${r1(cy - (R - 26) * Math.sin(a) + 4)}" text-anchor="middle" style="font-size:10px;fill:var(--exit)">${k / 2}</text>`);
    }
  }
  const na = ang(0.62);
  return svg('0 0 460 200', 'An analogue ammeter with two scales, 0 to 1 A and 0 to 5 A, and a digital ammeter showing 0.62 A', `
    <path class="ink" style="stroke-width:1.5" fill="none" d="M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy}"/>
    ${ticks.join('')}
    <line style="stroke:var(--exit);stroke-width:2.5" x1="${cx}" y1="${cy}" x2="${r1(cx + (R - 6) * Math.cos(na))}" y2="${r1(cy - (R - 6) * Math.sin(na))}"/>
    <circle cx="${cx}" cy="${cy}" r="5" class="ink-head"/>
    <text class="txt" x="${cx}" y="${cy - 34}" text-anchor="middle" style="font-weight:700;font-size:16px">A</text>
    <text class="txt" x="${cx}" y="${cy + 26}" text-anchor="middle">outer scale 0–1 A; inner scale 0–5 A</text>
    <rect x="320" y="70" width="120" height="56" rx="8" style="fill:#10261a"/>
    <text x="380" y="108" text-anchor="middle" style="fill:#7dff9a;font-size:26px;font-family:monospace">0.62 A</text>
    <text class="txt" x="380" y="146" text-anchor="middle">digital ammeter</text>
  `);
}

// Resistance of a wire: length and cross-sectional area.
export function wireResistanceSvg(): string {
  const w = (x: number, y: number, len: number, thick: number, label: string, r: string) =>
    `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" style="stroke:#b87333;stroke-width:${thick};stroke-linecap:round"/>` +
    `<text class="txt" x="${x}" y="${y - 12}">${label}</text>` +
    `<text class="txt" x="430" y="${y + 5}" text-anchor="end" style="font-weight:700">${r}</text>`;
  return svg('0 0 440 200', 'Three copper wires. Twice the length: twice the resistance. Twice the cross-sectional area: half the resistance', `
    ${w(20, 40, 150, 3, 'length L, area A', 'R')}
    ${w(20, 100, 300, 3, 'length 2L, area A', '2R')}
    ${w(20, 160, 150, 7, 'length L, area 2A (thicker)', 'R ÷ 2')}
  `);
}

// Current–voltage graphs: resistor, filament lamp, diode.
export function ivGraphsSvg(): string {
  const panel = (ox: number, kind: 'resistor' | 'lamp' | 'diode', title: string) => {
    const cx = ox + 80;
    const cy = 90;
    const f = (v: number) => {
      // v from -1 to 1 (axis units) -> i from -1 to 1
      if (kind === 'resistor') return 0.8 * v;
      if (kind === 'lamp') return Math.sign(v) * 0.85 * Math.pow(Math.abs(v), 0.45);
      return v < 0.35 ? 0 : Math.min(1, (v - 0.35) * 4);
    };
    const pts: string[] = [];
    for (let k = 0; k <= 100; k++) {
      const v = -1 + (2 * k) / 100;
      const i = f(v);
      if (Math.abs(i) <= 1) pts.push(`${r1(cx + 65 * v)},${r1(cy - 65 * i)}`);
    }
    return `
      <line class="ink" x1="${cx - 72}" y1="${cy}" x2="${cx + 72}" y2="${cy}"/>
      <line class="ink" x1="${cx}" y1="${cy + 72}" x2="${cx}" y2="${cy - 72}"/>
      <text class="txt" x="${cx + 70}" y="${cy + 16}" text-anchor="end">V</text>
      <text class="txt" x="${cx + 6}" y="${cy - 62}">I</text>
      <polyline class="arrow" style="stroke-width:2.8" fill="none" points="${pts.join(' ')}"/>
      <text class="txt" x="${cx}" y="${cy + 92}" text-anchor="middle" style="font-weight:700">${title}</text>`;
  };
  return svg('0 0 500 200', 'Current against voltage: a straight line through the origin for a resistor, an S-shaped curve for a filament lamp, and for a diode almost no current in one direction', `
    ${panel(0, 'resistor', 'resistor')}
    ${panel(170, 'lamp', 'filament lamp')}
    ${panel(340, 'diode', 'diode')}
  `);
}

// Energy is transferred from the source, by the circuit, to the components and the surroundings.
export function energyFlowSvg(): string {
  const box = (x: number, t1: string, t2: string) =>
    `<rect class="box" x="${x}" y="40" width="120" height="56" rx="8"/>` +
    `<text class="txt" x="${x + 60}" y="64" text-anchor="middle" style="font-weight:700">${t1}</text>` +
    `<text class="txt" x="${x + 60}" y="82" text-anchor="middle">${t2}</text>`;
  return svg('0 0 460 130', 'Energy goes from the cell to the circuit components and then to the surroundings', `
    ${box(10, 'cell', '(chemical store)')}
    ${box(170, 'lamp', 'electrical work')}
    ${box(330, 'surroundings', 'light and heat')}
    ${arrow(134, 68, 166, 68, 'arrow', 2.5, 8)}
    ${arrow(294, 68, 326, 68, 'arrow', 2.5, 8)}
    <text class="txt" x="230" y="122" text-anchor="middle">The current carries energy from the source to the components.</text>
  `);
}
