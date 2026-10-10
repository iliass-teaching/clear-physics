// SVG figures for Unit 2 (mass, weight, density). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

// A jar with three liquids that do not mix, and objects floating at different levels.
export function densityColumnSvg(): string {
  const x0 = 120;
  const x1 = 240;
  const top = 40;
  const oilTop = 80;
  const waterTop = 150;
  const honeyTop = 220;
  const bottom = 290;
  const label = (y: number, name: string, rho: string) =>
    `<line class="dash" x1="${x1 + 6}" y1="${y}" x2="${x1 + 26}" y2="${y}"/>` +
    `<text class="txt" x="${x1 + 32}" y="${y - 5}" style="font-weight:700">${name}</text>` +
    `<text class="txt" x="${x1 + 32}" y="${y + 14}">${rho}</text>`;
  return svg('0 0 430 310', 'A jar with honey at the bottom, water in the middle and oil on top. Objects float at different levels', `
    <rect class="layer-oil" x="${x0}" y="${oilTop}" width="${x1 - x0}" height="${waterTop - oilTop}"/>
    <rect class="layer-water" x="${x0}" y="${waterTop}" width="${x1 - x0}" height="${honeyTop - waterTop}"/>
    <rect class="layer-honey" x="${x0}" y="${honeyTop}" width="${x1 - x0}" height="${bottom - honeyTop}"/>
    <path class="ink" d="M${x0},${top} L${x0},${bottom} L${x1},${bottom} L${x1},${top}"/>
    ${label((oilTop + waterTop) / 2, 'cooking oil', '0.92 g/cm³')}
    ${label((waterTop + honeyTop) / 2, 'water', '1.0 g/cm³')}
    ${label((honeyTop + bottom) / 2, 'honey', '1.4 g/cm³')}
    <rect x="140" y="${oilTop - 12}" width="28" height="18" rx="3" fill="#c49a6c" stroke="var(--ink)"/>
    <text class="txt" x="40" y="${oilTop}" text-anchor="start">wood</text>
    <line class="dash" x1="75" y1="${oilTop - 4}" x2="136" y2="${oilTop - 4}"/>
    <circle cx="200" cy="${honeyTop - 8}" r="9" fill="#d84a6b" stroke="var(--ink)"/>
    <text class="txt" x="40" y="${honeyTop - 4}">plastic bead</text>
    <line class="dash" x1="110" y1="${honeyTop - 8}" x2="189" y2="${honeyTop - 8}"/>
    <polygon points="160,${bottom - 2} 184,${bottom - 2} 190,${bottom - 14} 172,${bottom - 22} 154,${bottom - 14}" fill="#8a8f98" stroke="var(--ink)"/>
    <text class="txt" x="40" y="${bottom - 8}">iron nut</text>
    <line class="dash" x1="88" y1="${bottom - 12}" x2="150" y2="${bottom - 12}"/>
  `);
}
