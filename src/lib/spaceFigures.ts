// SVG figures for Unit 17 (space physics). Simple diagrams, not to scale.
// Colours come from CSS classes in global.css (.fig ...), so they work in light and dark mode.

function arrowHead(x: number, y: number, angle: number, cls: string, size = 9): string {
  const a1 = angle - 0.45;
  const a2 = angle + 0.45;
  return `<polygon class="${cls}" points="${x},${y} ${(x - size * Math.cos(a1)).toFixed(1)},${(y - size * Math.sin(a1)).toFixed(1)} ${(x - size * Math.cos(a2)).toFixed(1)},${(y - size * Math.sin(a2)).toFixed(1)}"/>`;
}

function ray(x1: number, y1: number, x2: number, y2: number): string {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  return `<line class="ray" x1="${x1}" y1="${y1}" x2="${x2 - 6 * Math.cos(ang)}" y2="${y2 - 6 * Math.sin(ang)}"/>${arrowHead(x2, y2, ang, 'ray-head')}`;
}

// A round body lit from one side: 'left' or 'right' half lit, or 'all' / 'none'.
function litBody(cx: number, cy: number, r: number, lit: 'left' | 'right' | 'all' | 'none'): string {
  const base = `<circle class="dark" cx="${cx}" cy="${cy}" r="${r}"/>`;
  if (lit === 'none') return base;
  if (lit === 'all') return `<circle class="lit" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const sweep = lit === 'left' ? 0 : 1;
  return base + `<path class="lit" d="M${cx},${cy - r} A${r},${r} 0 0,${sweep} ${cx},${cy + r} Z"/>`;
}

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

export function dayNightSvg(): string {
  const cx = 280;
  const cy = 135;
  const r = 70;
  const tilt = (23.5 * Math.PI) / 180;
  const ax = Math.sin(tilt) * (r + 22);
  const ay = Math.cos(tilt) * (r + 22);
  return svg('0 0 440 250', 'The Earth lit by the Sun: one half has day, the other half has night', `
    ${ray(20, 75, 150, 75)}${ray(20, 135, 150, 135)}${ray(20, 195, 150, 195)}
    <text class="txt" x="20" y="60">sunlight</text>
    ${litBody(cx, cy, r, 'left')}
    <line class="ink" x1="${cx - ax}" y1="${cy + ay}" x2="${cx + ax}" y2="${cy - ay}" stroke-dasharray="5 4"/>
    <text class="txt" x="${cx - ax - 6}" y="${cy + ay}" text-anchor="end">axis</text>
    <text class="txt-dark" x="${cx - 40}" y="${cy + 5}" text-anchor="middle" style="font-weight:700">day</text>
    <text class="txt-light" x="${cx + 38}" y="${cy + 5}" text-anchor="middle" style="font-weight:700">night</text>
    <path class="ink" d="M${cx - 40},${cy - r - 18} Q${cx},${cy - r - 34} ${cx + 40},${cy - r - 18}" fill="none"/>
    ${arrowHead(cx + 40, cy - r - 18, 0.5, 'ink-head', 8)}
    <text class="txt" x="${cx}" y="${cy - r - 40}" text-anchor="middle">spins once in about 24 h</text>
  `);
}

export function seasonsSvg(): string {
  const earth = (x: number, lit: 'left' | 'right', label: string) => {
    const tilt = (23.5 * Math.PI) / 180;
    const ax = Math.sin(tilt) * 34;
    const ay = Math.cos(tilt) * 34;
    return `${litBody(x, 115, 22, lit)}
      <line class="ink" x1="${x - ax}" y1="${115 + ay}" x2="${x + ax}" y2="${115 - ay}"/>
      <text class="txt" x="${x + ax + 2}" y="${115 - ay - 2}" style="font-weight:700">N</text>
      <text class="txt" x="${x}" y="170" text-anchor="middle" style="font-weight:700">${label}</text>`;
  };
  return svg('0 0 520 220', 'The Earth at two points of its orbit, with its axis always tilted the same way', `
    <ellipse class="orbit" cx="260" cy="115" rx="160" ry="50"/>
    <circle class="sun" cx="260" cy="115" r="30"/>
    <text class="txt" x="260" y="70" text-anchor="middle">Sun</text>
    ${earth(100, 'right', 'June')}
    ${earth(420, 'left', 'December')}
    <text class="txt" x="100" y="192" text-anchor="middle">North tilted towards the Sun:</text>
    <text class="txt" x="100" y="208" text-anchor="middle">summer in the north</text>
    <text class="txt" x="420" y="192" text-anchor="middle">North tilted away from the Sun:</text>
    <text class="txt" x="420" y="208" text-anchor="middle">winter in the north</text>
  `);
}

export function moonPhasesSvg(): string {
  const ex = 230;
  const ey = 135;
  const R = 85;
  // Positions: sunlight comes from the right. The Moon orbits anticlockwise (seen from above the North Pole).
  const positions = [
    { x: ex + R, y: ey, name: 'new moon', look: 'none' as const },
    { x: ex, y: ey - R, name: 'first quarter', look: 'right' as const },
    { x: ex - R, y: ey, name: 'full moon', look: 'all' as const },
    { x: ex, y: ey + R, name: 'last quarter', look: 'left' as const },
  ];
  const moons = positions.map((p) => litBody(p.x, p.y, 13, 'right')).join('');
  const names = positions
    .map((p, i) => {
      const dx = i === 0 ? 20 : i === 2 ? -20 : 0;
      const dy = i === 1 ? -20 : i === 3 ? 30 : 4;
      const anchor = i === 0 ? 'start' : i === 2 ? 'end' : 'middle';
      return `<text class="txt" x="${p.x + dx}" y="${p.y + dy}" text-anchor="${anchor}">${p.name}</text>`;
    })
    .join('');
  const views = positions
    .map((p, i) => {
      const x = 110 + i * 100;
      return `${litBody(x, 290, 18, p.look)}<text class="txt" x="${x}" y="325" text-anchor="middle">${p.name}</text>`;
    })
    .join('');
  return svg('0 0 520 335', 'The Moon at four points of its orbit, and how it looks from the Earth', `
    ${ray(505, 80, 430, 80)}${ray(505, 135, 430, 135)}${ray(505, 190, 430, 190)}
    <text class="txt" x="505" y="65" text-anchor="end">sunlight</text>
    <circle class="orbit" cx="${ex}" cy="${ey}" r="${R}"/>
    <circle class="earth" cx="${ex}" cy="${ey}" r="18"/>
    <text class="txt-light" x="${ex}" y="${ey + 4}" text-anchor="middle">Earth</text>
    ${arrowHead(ex + R * Math.cos(-0.8), ey + R * Math.sin(-0.8), -0.8 - Math.PI / 2, 'ink-head', 9)}
    ${moons}${names}
    <text class="txt" x="20" y="260" style="font-weight:700">What we see from the Earth:</text>
    ${views}
  `);
}

export function solarSystemSvg(): string {
  const planets = [
    { name: 'Mercury', r: 4, type: 'rocky' },
    { name: 'Venus', r: 7, type: 'rocky' },
    { name: 'Earth', r: 7.5, type: 'rocky' },
    { name: 'Mars', r: 5, type: 'rocky' },
    { name: 'Jupiter', r: 26, type: 'gas' },
    { name: 'Saturn', r: 22, type: 'gas' },
    { name: 'Uranus', r: 13, type: 'gas' },
    { name: 'Neptune', r: 12.5, type: 'gas' },
  ];
  const xs = [95, 135, 175, 212, 300, 390, 470, 545];
  const body = planets
    .map(
      (p, i) =>
        `<circle class="${p.type}" cx="${xs[i]}" cy="70" r="${p.r}"/>` +
        (p.name === 'Saturn' ? `<ellipse class="ink" cx="${xs[i]}" cy="70" rx="${p.r + 12}" ry="6"/>` : '') +
        `<text class="txt" x="${xs[i]}" y="${i % 2 ? 125 : 112}" text-anchor="middle">${p.name}</text>`,
    )
    .join('');
  let belt = '';
  for (let i = 0; i < 26; i++) {
    belt += `<circle class="soft-fill" cx="${240 + (i % 5) * 4 + Math.sin(i) * 3}" cy="${45 + i * 2}" r="1.3"/>`;
  }
  return svg('0 0 600 140', 'The Sun and the eight planets in order. Sizes and distances are not to scale', `
    <circle class="sun" cx="0" cy="70" r="60"/>
    <text class="txt" x="8" y="135">Sun</text>
    ${belt}
    <text class="txt" x="247" y="36" text-anchor="middle" style="font-size:10px">asteroid belt</text>
    ${body}
    <text class="txt" x="153" y="20" text-anchor="middle" style="font-weight:700">rocky and small</text>
    <text class="txt" x="430" y="20" text-anchor="middle" style="font-weight:700">gas and large</text>
  `);
}

export function ellipticalOrbitSvg(): string {
  const cx = 210;
  const cy = 110;
  const rx = 175;
  const ry = 95;
  const c = Math.sqrt(rx * rx - ry * ry);
  const sunX = cx - c;
  return svg('0 0 420 225', 'An elliptical orbit with the Sun not at the centre', `
    <ellipse class="orbit" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>
    <circle class="sun" cx="${sunX}" cy="${cy}" r="14"/>
    <text class="txt" x="${sunX}" y="${cy + 32}" text-anchor="middle">Sun</text>
    <circle class="soft-fill" cx="${cx}" cy="${cy}" r="2.5"/>
    <text class="txt" x="${cx}" y="${cy + 16}" text-anchor="middle" style="font-size:10px">centre</text>
    <circle class="rocky" cx="${cx - rx}" cy="${cy}" r="8"/>
    <text class="txt" x="${cx - rx + 2}" y="${cy - 16}" style="font-weight:700">closest: fastest</text>
    <circle class="rocky" cx="${cx + rx}" cy="${cy}" r="8"/>
    <text class="txt" x="${cx + rx - 4}" y="${cy - 16}" text-anchor="end" style="font-weight:700">furthest: slowest</text>
  `);
}

export function accretionSvg(): string {
  let cloud = '';
  for (let i = 0; i < 70; i++) {
    const a = i * 2.39996;
    const rr = 8 + ((i * 37) % 48);
    cloud += `<circle class="soft-fill" cx="${(95 + rr * Math.cos(a)).toFixed(1)}" cy="${(85 + rr * 0.85 * Math.sin(a)).toFixed(1)}" r="1.6"/>`;
  }
  return svg('0 0 600 190', 'Three steps: a cloud of gas and dust, a spinning disc, and the Sun with planets', `
    ${cloud}
    <text class="txt" x="95" y="162" text-anchor="middle">1. A cloud of gas and dust</text>
    <text class="txt" x="95" y="180" text-anchor="middle">collapses (gravity)</text>
    ${ray(165, 85, 205, 85)}
    <ellipse class="disc" cx="300" cy="85" rx="85" ry="22"/>
    <circle class="sun" cx="300" cy="85" r="12"/>
    <path class="ink" d="M240,52 Q300,38 360,52" fill="none"/>${arrowHead(360, 52, 0.2, 'ink-head', 8)}
    <text class="txt" x="300" y="162" text-anchor="middle">2. It spins and becomes</text>
    <text class="txt" x="300" y="180" text-anchor="middle">a flat accretion disc</text>
    ${ray(395, 85, 430, 85)}
    <circle class="sun" cx="445" cy="85" r="12"/>
    <circle class="rocky" cx="468" cy="85" r="3"/><circle class="rocky" cx="480" cy="85" r="3.5"/>
    <circle class="gas" cx="515" cy="85" r="11"/><circle class="gas" cx="550" cy="85" r="9"/><circle class="gas" cx="580" cy="85" r="6"/>
    <text class="txt" x="510" y="162" text-anchor="middle">3. The Sun forms in the centre.</text>
    <text class="txt" x="510" y="180" text-anchor="middle">Planets form in the disc.</text>
  `);
}

export function starLifeSvg(): string {
  const box = (x: number, y: number, w: number, lines: string[]) =>
    `<rect class="box" x="${x}" y="${y}" width="${w}" height="${18 + 15 * lines.length}" rx="7"/>` +
    lines.map((l, i) => `<text class="txt" x="${x + w / 2}" y="${y + 22 + i * 15}" text-anchor="middle">${l}</text>`).join('');
  const arrow = (x1: number, y1: number, x2: number, y2: number) => {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    return `<line class="ink" x1="${x1}" y1="${y1}" x2="${x2 - 7 * Math.cos(ang)}" y2="${y2 - 7 * Math.sin(ang)}"/>${arrowHead(x2, y2, ang, 'ink-head', 8)}`;
  };
  return svg('0 0 620 360', 'The life cycle of a star', `
    ${box(10, 10, 170, ['cloud of gas and dust', '(nebula)'])}
    ${arrow(180, 30, 220, 30)}
    ${box(220, 10, 140, ['protostar'])}
    ${arrow(360, 30, 400, 30)}
    ${box(400, 10, 200, ['stable star', '(fusion of hydrogen)'])}
    ${arrow(450, 58, 160, 110)}
    ${arrow(550, 58, 480, 110)}
    <text class="txt" x="240" y="85" style="font-style:italic">less massive star</text>
    <text class="txt" x="520" y="95" style="font-style:italic">very massive star</text>
    ${box(60, 110, 200, ['red giant'])}
    ${arrow(160, 143, 160, 180)}
    ${box(40, 180, 240, ['planetary nebula', '+ white dwarf'])}
    ${box(380, 110, 200, ['red supergiant'])}
    ${arrow(480, 143, 480, 180)}
    ${box(400, 180, 160, ['supernova'])}
    ${arrow(480, 213, 480, 250)}
    ${box(380, 250, 200, ['neutron star', 'or black hole'])}
    <path class="dash" d="M400,200 C300,300 60,330 40,60" fill="none"/>
    ${arrowHead(40, 60, -Math.PI / 2 - 0.15, 'ink-head', 8)}
    <text class="txt" x="190" y="315" text-anchor="middle">nebula with hydrogen and new heavier elements:</text>
    <text class="txt" x="190" y="330" text-anchor="middle">new stars and planets can form</text>
  `);
}

export function redshiftSvg(id = 'rs'): string {
  // Absorption lines at the same pattern; the galaxy's lines are shifted towards the red end.
  const lines = [70, 120, 205, 300];
  const shift = 38;
  const spectrum = (y: number, dx: number) =>
    `<rect x="40" y="${y}" width="440" height="40" fill="url(#${id}-g)"/>` +
    lines.map((x) => `<rect x="${40 + x + dx}" y="${y}" width="4" height="40" fill="#111"/>`).join('');
  return svg('0 0 520 210', 'Two spectra: the dark lines from a distant galaxy are shifted towards the red end', `
    <defs><linearGradient id="${id}-g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#6a2cbf"/><stop offset="0.18" stop-color="#2b4cdb"/>
      <stop offset="0.36" stop-color="#22a6c9"/><stop offset="0.52" stop-color="#3cb44b"/>
      <stop offset="0.68" stop-color="#f2d531"/><stop offset="0.84" stop-color="#f28c28"/>
      <stop offset="1" stop-color="#d62828"/></linearGradient></defs>
    <text class="txt" x="40" y="22" style="font-weight:700">Light from a source on the Earth</text>
    ${spectrum(30, 0)}
    <text class="txt" x="40" y="105" style="font-weight:700">Light from a distant galaxy</text>
    ${spectrum(113, shift)}
    ${lines.map((x) => `<line class="dash" x1="${42 + x}" y1="72" x2="${42 + x + shift}" y2="111"/>`).join('')}
    <text class="txt" x="40" y="175">shorter wavelength (violet)</text>
    <text class="txt" x="480" y="175" text-anchor="end">longer wavelength (red)</text>
    ${ray(200, 195, 330, 195)}
    <text class="txt" x="340" y="199">lines move towards red: redshift</text>
  `);
}
