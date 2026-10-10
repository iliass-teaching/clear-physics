// SVG figures for Unit 6 (pressure).

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

// The same brick on two faces: same weight, different area, different pressure.
export function brickSvg(): string {
  return svg('0 0 460 200', 'The same brick standing on a small face and lying on a big face', `
    <line class="ink" x1="10" y1="150" x2="450" y2="150"/>
    <rect class="box" x="70" y="40" width="50" height="110"/>
    <rect class="layer-honey" x="70" y="145" width="50" height="5"/>
    <text class="txt" x="95" y="170" text-anchor="middle" style="font-weight:700">small area</text>
    <text class="txt" x="95" y="189" text-anchor="middle">big pressure</text>
    <rect class="box" x="240" y="100" width="170" height="50"/>
    <rect class="layer-honey" x="240" y="145" width="170" height="5"/>
    <text class="txt" x="325" y="170" text-anchor="middle" style="font-weight:700">big area</text>
    <text class="txt" x="325" y="189" text-anchor="middle">small pressure</text>
    <text class="txt" x="230" y="30" text-anchor="middle">same brick, same weight (20 N)</text>
  `);
}

// A tall bottle of water with three holes. The deepest hole squirts the strongest jet.
export function holesSvg(): string {
  const jet = (y: number, reach: number) =>
    `<path class="jet" d="M150,${y} Q${150 + reach * 0.6},${y} ${150 + reach},${y + 60 + (240 - y) * 0.15}"/>`;
  return svg('0 0 420 290', 'A bottle of water with three holes. Water squirts out further from the lower holes', `
    <rect class="layer-water" x="70" y="40" width="80" height="210"/>
    <path class="ink" d="M70,20 L70,250 L150,250 L150,20"/>
    <circle class="ink-head" cx="150" cy="90" r="3"/>
    <circle class="ink-head" cx="150" cy="150" r="3"/>
    <circle class="ink-head" cx="150" cy="210" r="3"/>
    ${jet(90, 45)}${jet(150, 85)}${jet(210, 125)}
    <text class="txt" x="40" y="94" text-anchor="end">top</text>
    <text class="txt" x="40" y="214" text-anchor="end">bottom</text>
    <text class="txt" x="175" y="30">deeper: bigger pressure,</text>
    <text class="txt" x="175" y="50">water squirts out faster</text>
  `);
}

// A dam: thicker at the bottom, where the pressure of the water is biggest.
export function damSvg(): string {
  return svg('0 0 420 230', 'A dam that is thicker at the bottom than at the top', `
    <rect class="layer-water" x="20" y="50" width="200" height="150"/>
    <polygon class="stone" points="220,30 255,30 330,200 220,200"/>
    <line class="ink" x1="10" y1="200" x2="410" y2="200"/>
    <text class="txt" x="120" y="40" text-anchor="middle">water</text>
    <text class="txt" x="264" y="26">thin at the top</text>
    <text class="txt" x="275" y="218" text-anchor="middle">thick at the bottom</text>
    <line class="dash" x1="60" y1="70" x2="60" y2="195"/>
    <text class="txt" x="66" y="140">depth</text>
  `);
}
