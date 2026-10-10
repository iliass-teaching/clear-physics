// Circuit diagram symbols (IGCSE style), drawn as SVG strings.
// How to use: draw the wires first (wire()), then put symbols on top. Each symbol has a small
// background rectangle ("cut") that hides the wire under it.

export type SymbolType =
  | 'cell'
  | 'battery'
  | 'lamp'
  | 'resistor'
  | 'variable-resistor'
  | 'ammeter'
  | 'voltmeter'
  | 'switch-open'
  | 'switch-closed'
  | 'diode'
  | 'led'
  | 'fuse'
  | 'heater'
  | 'ldr'
  | 'thermistor'
  | 'motor'
  | 'bell'
  | 'power-supply'
  | 'generator'
  | 'coil'
  | 'transformer'
  | 'relay'
  | 'potential-divider';

const r1 = (n: number) => Math.round(n * 10) / 10;

export function wire(points: [number, number][]): string {
  return `<polyline class="wire" points="${points.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ')}" fill="none"/>`;
}

// A dot at a junction.
export function junction(x: number, y: number): string {
  return `<circle cx="${x}" cy="${y}" r="3.5" class="ink-head"/>`;
}

// Text that stays upright inside a rotated symbol.
const letter = (s: string, rot: number) =>
  `<text x="0" y="5" text-anchor="middle" transform="rotate(${-rot})" class="sym-text">${s}</text>`;

function shapes(type: SymbolType, rot: number): string {
  switch (type) {
    case 'cell':
      // Long thin line = positive terminal, short thick line = negative terminal.
      return `<rect class="cut" x="-6" y="-17" width="12" height="34"/>` +
        `<line class="sym" x1="-4" y1="-15" x2="-4" y2="15"/><line class="sym" style="stroke-width:5" x1="5" y1="-8" x2="5" y2="8"/>`;
    case 'battery':
      return `<rect class="cut" x="-16" y="-17" width="32" height="34"/>` +
        `<line class="sym" x1="-13" y1="-15" x2="-13" y2="15"/><line class="sym" style="stroke-width:5" x1="-5" y1="-8" x2="-5" y2="8"/>` +
        `<line class="sym" x1="5" y1="-15" x2="5" y2="15"/><line class="sym" style="stroke-width:5" x1="13" y1="-8" x2="13" y2="8"/>`;
    case 'power-supply':
      return `<rect class="cut" x="-16" y="-17" width="32" height="34"/>` +
        `<line class="sym" x1="-6" y1="-15" x2="-6" y2="15"/><line class="sym" style="stroke-width:5" x1="4" y1="-8" x2="4" y2="8"/>` +
        `<line class="sym" style="stroke-dasharray:3 3" x1="-16" y1="-20" x2="16" y2="-20"/>`;
    case 'lamp':
      return `<circle class="sym-fill" r="13"/><line class="sym" x1="-9" y1="-9" x2="9" y2="9"/><line class="sym" x1="-9" y1="9" x2="9" y2="-9"/>`;
    case 'resistor':
      return `<rect class="sym-fill" x="-20" y="-7" width="40" height="14"/>`;
    case 'variable-resistor':
      return `<rect class="sym-fill" x="-20" y="-7" width="40" height="14"/><line class="sym" x1="-16" y1="14" x2="16" y2="-14"/><polygon class="sym-head" points="16,-14 7,-12 13,-6"/>`;
    case 'heater':
      return `<rect class="sym-fill" x="-20" y="-7" width="40" height="14"/><line class="sym" x1="-10" y1="-7" x2="-10" y2="7"/><line class="sym" x1="0" y1="-7" x2="0" y2="7"/><line class="sym" x1="10" y1="-7" x2="10" y2="7"/>`;
    case 'fuse':
      return `<rect class="sym-fill" x="-18" y="-6" width="36" height="12"/><line class="sym" x1="-26" y1="0" x2="26" y2="0"/>`;
    case 'thermistor':
      return `<rect class="sym-fill" x="-20" y="-7" width="40" height="14"/><polyline class="sym" fill="none" points="-18,13 -10,13 12,-13"/>`;
    case 'ldr':
      return `<circle class="sym-fill" r="16"/><rect class="sym-fill" x="-12" y="-5" width="24" height="10"/>` +
        `<line class="sym" x1="-22" y1="-26" x2="-10" y2="-14"/><polygon class="sym-head" points="-10,-14 -17,-16 -12,-21"/>` +
        `<line class="sym" x1="-10" y1="-30" x2="2" y2="-18"/><polygon class="sym-head" points="2,-18 -5,-20 0,-25"/>`;
    case 'ammeter':
      return `<circle class="sym-fill" r="13"/>${letter('A', rot)}`;
    case 'voltmeter':
      return `<circle class="sym-fill" r="13"/>${letter('V', rot)}`;
    case 'motor':
      return `<circle class="sym-fill" r="13"/>${letter('M', rot)}`;
    case 'switch-open':
      return `<rect class="cut" x="-18" y="-16" width="36" height="20"/><circle class="sym-fill" cx="-14" cy="0" r="3"/><circle class="sym-fill" cx="14" cy="0" r="3"/><line class="sym" x1="-12" y1="-1" x2="12" y2="-14"/>`;
    case 'switch-closed':
      return `<rect class="cut" x="-18" y="-6" width="36" height="12"/><circle class="sym-fill" cx="-14" cy="0" r="3"/><circle class="sym-fill" cx="14" cy="0" r="3"/><line class="sym" x1="-12" y1="-2" x2="13" y2="-2"/>`;
    case 'diode':
      return `<rect class="cut" x="-12" y="-13" width="24" height="26"/><polygon class="sym-solid" points="-10,-11 -10,11 9,0"/><line class="sym" x1="10" y1="-11" x2="10" y2="11"/>`;
    case 'led':
      return `<rect class="cut" x="-12" y="-13" width="24" height="26"/><polygon class="sym-solid" points="-10,-11 -10,11 9,0"/><line class="sym" x1="10" y1="-11" x2="10" y2="11"/>` +
        `<line class="sym" x1="2" y1="-14" x2="12" y2="-26"/><polygon class="sym-head" points="12,-26 5,-23 10,-19"/>` +
        `<line class="sym" x1="10" y1="-10" x2="20" y2="-22"/><polygon class="sym-head" points="20,-22 13,-19 18,-15"/>`;
    case 'generator':
      return `<circle class="sym-fill" r="13"/>${letter('G', rot)}`;
    case 'coil':
      return `<rect class="cut" x="-22" y="-12" width="44" height="14"/><path class="sym" fill="none" d="M-22,0 a5.5,5.5 0 0 1 11,0 a5.5,5.5 0 0 1 11,0 a5.5,5.5 0 0 1 11,0 a5.5,5.5 0 0 1 11,0"/>`;
    case 'transformer':
      return `<rect class="cut" x="-22" y="-26" width="44" height="52"/>` +
        `<path class="sym" fill="none" d="M-16,-22 a5,5 0 0 1 0,10 a5,5 0 0 1 0,10 a5,5 0 0 1 0,10 a5,5 0 0 1 0,10"/>` +
        `<path class="sym" fill="none" d="M16,-22 a5,5 0 0 0 0,10 a5,5 0 0 0 0,10 a5,5 0 0 0 0,10 a5,5 0 0 0 0,10"/>` +
        `<line class="sym" x1="-4" y1="-24" x2="-4" y2="24"/><line class="sym" x1="4" y1="-24" x2="4" y2="24"/>`;
    case 'relay':
      return `<rect class="sym-fill" x="-22" y="-12" width="22" height="24"/><line class="sym" x1="-22" y1="12" x2="0" y2="-12"/>` +
        `<rect class="cut" x="2" y="-14" width="22" height="18"/><circle class="sym-fill" cx="5" cy="0" r="2.5"/><circle class="sym-fill" cx="21" cy="0" r="2.5"/><line class="sym" x1="7" y1="-1" x2="21" y2="-10"/>` +
        `<line class="sym" style="stroke-dasharray:3 3" x1="-11" y1="-12" x2="-11" y2="-18"/><line class="sym" style="stroke-dasharray:3 3" x1="-11" y1="-18" x2="13" y2="-18"/><line class="sym" style="stroke-dasharray:3 3" x1="13" y1="-18" x2="13" y2="-6"/>`;
    case 'potential-divider':
      return `<rect class="sym-fill" x="-20" y="-7" width="40" height="14"/><line class="sym" x1="0" y1="24" x2="0" y2="9"/><polygon class="sym-head" points="0,8 -5,16 5,16"/>`;
    case 'bell':
      return `<rect class="cut" x="-16" y="-16" width="32" height="20"/><path class="sym-fill" d="M-14,2 A14,14 0 0 1 14,2 Z"/>`;
  }
}

// A symbol centred at (x, y). rot = 0 for a horizontal wire, 90 for a vertical wire.
export function symbol(type: SymbolType, x: number, y: number, rot = 0): string {
  return `<g transform="translate(${x},${y}) rotate(${rot})">${shapes(type, rot)}</g>`;
}

// A whole circuit diagram as an SVG string.
export function circuitSvg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig circuit" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}
