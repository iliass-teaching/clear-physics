// SVG figures for Unit 14 (circuits and electrical safety).
import { wire, symbol, junction, circuitSvg } from './circuit';

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow2', width = 2.2, size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

// Two lamps in series and two lamps in parallel.
export function seriesParallelSvg(): string {
  return circuitSvg('0 0 520 210', 'Left: two lamps in series, in one loop. Right: two lamps in parallel, on two branches', `
    ${wire([[30, 50], [220, 50], [220, 160], [30, 160], [30, 50]])}
    ${symbol('battery', 30, 105, 90)}${symbol('lamp', 90, 50)}${symbol('lamp', 165, 50)}
    <text class="txt" x="125" y="196" text-anchor="middle" style="font-weight:700">series: one loop</text>
    ${wire([[290, 50], [490, 50], [490, 160], [290, 160], [290, 50]])}
    ${wire([[350, 50], [350, 110], [430, 110], [430, 50]])}
    ${junction(350, 50)}${junction(430, 50)}
    ${symbol('battery', 290, 105, 90)}${symbol('lamp', 390, 50)}${symbol('lamp', 390, 110)}
    <text class="txt" x="390" y="196" text-anchor="middle" style="font-weight:700">parallel: two branches</text>
  `);
}

// Currents at a junction.
export function junctionSvg(): string {
  return circuitSvg('0 0 420 180', 'A current of 0.5 A goes into a junction. 0.2 A and 0.3 A come out', `
    ${wire([[30, 90], [200, 90]])}
    ${wire([[200, 90], [260, 40], [390, 40]])}
    ${wire([[200, 90], [260, 140], [390, 140]])}
    ${junction(200, 90)}
    ${arrow(70, 76, 150, 76)}
    ${arrow(290, 26, 360, 26)}
    ${arrow(290, 126, 360, 126)}
    <text class="txt" x="110" y="66" text-anchor="middle" style="font-weight:700">0.5 A in</text>
    <text class="txt" x="325" y="18" text-anchor="middle" style="font-weight:700">0.2 A out</text>
    <text class="txt" x="325" y="166" text-anchor="middle" style="font-weight:700">0.3 A out</text>
    <text class="txt" x="196" y="118" text-anchor="end">junction</text>
  `);
}

// A potential divider: two resistors in series across a supply.
export function potentialDividerSvg(): string {
  return circuitSvg('0 0 400 260', 'Two resistors R1 and R2 in series across a supply. The p.d. across each resistor is in the same ratio as the resistances', `
    ${wire([[60, 30], [220, 30], [220, 230], [60, 230], [60, 30]])}
    ${symbol('power-supply', 60, 130, 90)}
    ${symbol('resistor', 220, 80, 90)}
    ${symbol('resistor', 220, 180, 90)}
    <text class="txt" x="240" y="84" style="font-weight:700">R₁</text>
    <text class="txt" x="240" y="184" style="font-weight:700">R₂</text>
    ${arrow(300, 36, 300, 124, 'arrow2', 1.6, 7)}${arrow(300, 124, 300, 36, 'arrow2', 1.6, 7)}
    ${arrow(300, 136, 300, 224, 'arrow2', 1.6, 7)}${arrow(300, 224, 300, 136, 'arrow2', 1.6, 7)}
    <text class="txt" x="312" y="84" style="font-weight:700">V₁</text>
    <text class="txt" x="312" y="184" style="font-weight:700">V₂</text>
    <text class="txt" x="40" y="136" text-anchor="end">V</text>
  `);
}

const LIVE = '#8d5a2b';
const NEUTRAL = '#1e6fd9';
const EARTH = '#3a9d3a';

// A mains circuit: live, neutral and earth wires; fuse and switch in the live wire; earthed metal case.
export function mainsCircuitSvg(fault = false): string {
  const live = `<polyline points="60,50 400,50 400,120" fill="none" style="stroke:${LIVE};stroke-width:4"/>`;
  const neutral = `<polyline points="60,110 330,110 330,130 365,130" fill="none" style="stroke:${NEUTRAL};stroke-width:4"/>`;
  const earth = `<polyline points="60,170 300,170 300,190 340,190" fill="none" style="stroke:${EARTH};stroke-width:4;stroke-dasharray:10 5"/><polyline points="60,170 300,170 300,190 340,190" fill="none" style="stroke:#e3c534;stroke-width:4;stroke-dasharray:5 10;stroke-dashoffset:-10"/>`;
  const caseRect = `<rect x="340" y="90" width="110" height="120" rx="8" style="fill:#c3c7cf;opacity:0.5;stroke:var(--ink);stroke-width:2"/>`;
  const heater = `<rect x="365" y="120" width="70" height="20" style="fill:var(--bg);stroke:var(--ink);stroke-width:1.5"/>`;
  const touch = fault ? `<polyline points="400,100 400,106 352,106" fill="none" style="stroke:${LIVE};stroke-width:4"/><text class="txt" x="235" y="240" text-anchor="middle" style="font-weight:700;fill:var(--exit)">fault: the live wire touches the case</text>` : '';
  const faultArrow = fault ? arrow(320, 160, 220, 160, 'arrow2', 2.5, 9) + `<text class="txt" x="270" y="150" text-anchor="middle" style="fill:var(--exit)">big current to earth</text>` : '';
  return `<svg class="fig circuit" viewBox="0 0 470 250" role="img" aria-label="${fault ? 'A fault: the live wire touches the metal case. A big current flows to earth and the fuse melts' : 'A mains circuit: the fuse and the switch are in the live wire; the metal case is connected to the earth wire'}">
    ${live}${neutral}${earth}${caseRect}${heater}${touch}
    ${symbol('fuse', 150, 50)}${symbol('switch-closed', 250, 50)}
    <text class="txt" x="56" y="54" text-anchor="end" style="font-weight:700;fill:${LIVE}">live</text>
    <text class="txt" x="56" y="114" text-anchor="end" style="font-weight:700;fill:${NEUTRAL}">neutral</text>
    <text class="txt" x="56" y="174" text-anchor="end" style="font-weight:700;fill:${EARTH}">earth</text>
    <text class="txt" x="150" y="80" text-anchor="middle">fuse</text>
    <text class="txt" x="250" y="80" text-anchor="middle">switch</text>
    <text class="txt" x="395" y="178" text-anchor="middle">metal case</text>
    ${faultArrow}
  </svg>`;
}

export function earthFaultSvg(): string {
  return mainsCircuitSvg(true);
}

// The double-insulation symbol.
export function doubleInsulationSvg(): string {
  return `<svg class="fig" viewBox="0 0 120 120" role="img" aria-label="The double insulation symbol: a square inside a square">
    <rect x="15" y="15" width="90" height="90" style="fill:none;stroke:var(--ink);stroke-width:5"/>
    <rect x="38" y="38" width="44" height="44" style="fill:none;stroke:var(--ink);stroke-width:5"/>
  </svg>`;
}
