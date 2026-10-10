// SVG figures for Unit 8 (thermal physics). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

// A straight arrow with a small head. cls: 'arrow' (blue), 'arrow2' (red) or 'ray' (yellow).
function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.5, head = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (ang: number) => `${r1(x2 - head * Math.cos(a + ang))},${r1(y2 - head * Math.sin(a + ang))}`;
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${x1}" y1="${y1}" x2="${r1(x2 - head * 0.6 * Math.cos(a))}" y2="${r1(y2 - head * 0.6 * Math.sin(a))}"/>` +
    `<polygon class="${cls}-head" points="${x2},${y2} ${p(0.45)} ${p(-0.45)}"/>`
  );
}

const flame = (x: number, y: number) =>
  `<path class="sun" d="M${x},${y - 26} C${x + 14},${y - 10} ${x + 12},${y} ${x},${y} C${x - 12},${y} ${x - 14},${y - 10} ${x},${y - 26} Z"/>`;

// Railway tracks: a gap between the rails, smaller on a hot day.
export function railGapSvg(): string {
  const row = (y: number, gapStart: number, gapEnd: number, label: string) => `
    <text class="txt" x="40" y="${y - 10}" style="font-weight:700">${label}</text>
    <rect class="stone" x="40" y="${y}" width="${gapStart - 40}" height="12"/>
    <rect class="stone" x="${gapEnd}" y="${y}" width="${380 - gapEnd}" height="12"/>
    <line class="dash" x1="${gapStart}" y1="${y + 16}" x2="${gapStart}" y2="${y + 22}"/>
    <line class="dash" x1="${gapEnd}" y1="${y + 16}" x2="${gapEnd}" y2="${y + 22}"/>
    <text class="txt" x="${(gapStart + gapEnd) / 2}" y="${y + 36}" text-anchor="middle">gap</text>`;
  return svg('0 0 420 160', 'Railway rails with a big gap on a cold day and a small gap on a hot day', `
    ${row(32, 196, 220, 'cold day: big gap')}
    ${row(104, 204, 210, 'hot day: the rails expand, the gap is small')}
  `);
}

// A bimetallic strip: straight when cold, bent when hot (brass expands more than iron).
export function bimetallicSvg(): string {
  return svg('0 0 440 172', 'A bimetallic strip of brass and iron. It is straight when cold and bends when hot', `
    <rect class="stone" x="20" y="40" width="14" height="36"/>
    <line style="stroke:#c9a227;stroke-width:8" x1="34" y1="54" x2="190" y2="54"/>
    <line style="stroke:#7d838c;stroke-width:8" x1="34" y1="62" x2="190" y2="62"/>
    <text class="txt" x="112" y="44" text-anchor="middle">brass</text>
    <text class="txt" x="112" y="84" text-anchor="middle">iron</text>
    <text class="txt" x="105" y="140" text-anchor="middle" style="font-weight:700">cold: straight</text>
    <rect class="stone" x="236" y="40" width="14" height="36"/>
    <path style="stroke:#c9a227;stroke-width:8;fill:none" d="M250,54 Q326,54 382,100"/>
    <path style="stroke:#7d838c;stroke-width:8;fill:none" d="M250,62 Q321,62 376,105"/>
    <text class="txt" x="320" y="140" text-anchor="middle" style="font-weight:700">hot: brass expands more,</text>
    <text class="txt" x="320" y="158" text-anchor="middle" style="font-weight:700">so the strip bends</text>
  `);
}

// Measuring specific heat capacity: a metal block, a heater, a thermometer and a joulemeter.
export function shcSetupSvg(): string {
  return svg('0 0 440 222', 'A metal block with a heater and a thermometer in two holes, insulation around it, and a joulemeter', `
    <rect class="box" x="20" y="20" width="100" height="44" rx="5"/>
    <text class="txt" x="70" y="47" text-anchor="middle" style="font-weight:700">joulemeter</text>
    <rect class="box" x="20" y="104" width="100" height="44" rx="5"/>
    <text class="txt" x="70" y="131" text-anchor="middle" style="font-weight:700">power supply</text>
    <path class="ink" style="stroke-width:2" d="M70,104 V64"/>
    <path class="ink" style="stroke-width:2" d="M120,42 H183 V62"/>
    <rect class="dash" x="140" y="72" width="140" height="130"/>
    <rect x="150" y="80" width="120" height="112" style="fill:#c3c7cf;stroke:var(--ink);stroke-width:1.5"/>
    <rect x="176" y="62" width="14" height="110" style="fill:#3a3f4b"/>
    <rect x="236" y="20" width="8" height="140" rx="4" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.2"/>
    <rect x="238.5" y="96" width="3" height="62" style="fill:#c0392b"/>
    <circle cx="240" cy="162" r="7" style="fill:#c0392b"/>
    <line class="soft" x1="248" y1="34" x2="296" y2="34"/>
    <text class="txt" x="300" y="38">thermometer</text>
    <line class="soft" x1="271" y1="132" x2="296" y2="132"/>
    <text class="txt" x="300" y="136">metal block (1 kg)</text>
    <line class="soft" x1="281" y1="196" x2="296" y2="196"/>
    <text class="txt" x="300" y="200">insulation</text>
    <line class="soft" x1="176" y1="160" x2="130" y2="180"/>
    <text class="txt" x="126" y="190" text-anchor="end">heater</text>
  `);
}

// Evaporation: the fastest particles escape from the surface.
export function evaporationSvg(): string {
  const inside: [number, number, number][] = [
    [80, 120, 30], [130, 150, 200], [180, 115, 320], [230, 145, 110], [280, 120, 250], [110, 170, 0], [210, 172, 160], [265, 165, 60],
  ];
  const parts = inside.map(([x, y, d]) => {
    const a = (d * Math.PI) / 180;
    return `<circle class="obj" cx="${x}" cy="${y}" r="6"/>` + arrow(x + 8 * Math.cos(a), y + 8 * Math.sin(a), r1(x + 20 * Math.cos(a)), r1(y + 20 * Math.sin(a)), 'arrow2', 1.6, 6);
  });
  return svg('0 0 360 232', 'A liquid. The fastest particles escape from the surface. The slower particles stay', `
    <rect class="layer-water" x="40" y="95" width="280" height="90"/>
    <path class="ink" style="stroke-width:2" d="M40,60 V185 H320 V60"/>
    ${parts.join('')}
    <circle class="obj" cx="120" cy="62" r="6"/>
    ${arrow(116, 55, 96, 26, 'arrow2', 2.2, 8)}
    <circle class="obj" cx="245" cy="70" r="6"/>
    ${arrow(250, 63, 274, 30, 'arrow2', 2.2, 8)}
    <text class="txt" x="180" y="22" text-anchor="middle" style="font-weight:700">fast particles escape</text>
    <text class="txt" x="180" y="205" text-anchor="middle">slower particles stay:</text>
    <text class="txt" x="180" y="224" text-anchor="middle">the liquid cools</text>
  `);
}

// Conduction: rods of different materials, heated at one end. Pins are fixed with wax.
export function conductionRodsSvg(): string {
  const rod = (y: number, name: string, melted: number) => {
    const pins = [110, 170, 230, 290, 350].filter((x) => x > melted);
    return `
      <rect class="sk-waste" x="60" y="${y}" width="${melted - 60}" height="10"/>
      <rect class="ink" x="60" y="${y}" width="320" height="10"/>
      ${pins.map((x) => `<circle cx="${x}" cy="${y + 12}" r="4" style="fill:#e8d36a;stroke:var(--ink);stroke-width:0.8"/><line class="ink" x1="${x}" y1="${y + 15}" x2="${x}" y2="${y + 28}"/>`).join('')}
      <text class="txt" x="386" y="${y + 9}" style="font-weight:700">${name}</text>`;
  };
  return svg('0 0 440 214', 'Rods of copper, iron and glass heated at one end. The pins fall when the wax melts', `
    <rect class="sk-waste" x="36" y="30" width="24" height="150"/>
    ${flame(48, 208)}
    ${rod(40, 'copper', 260)}
    ${rod(95, 'iron', 150)}
    ${rod(150, 'glass', 75)}
    <text class="txt" x="230" y="18" text-anchor="middle">pins fixed with wax: the wax melts, the pin falls</text>
  `);
}

// Conduction with particles: vibrations in all solids, and free electrons in metals.
export function conductionParticlesSvg(): string {
  const grid = (x0: number) => {
    const out: string[] = [];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) out.push(`<circle class="obj" cx="${x0 + 22 * i}" cy="${34 + 22 * j}" r="8"/>`);
    return out.join('');
  };
  const electrons: [number, number, number][] = [
    [281, 45, 0], [325, 67, 200], [347, 45, 120], [303, 89, 330], [369, 89, 30], [259, 67, 250], [347, 111, 180],
  ];
  return svg('0 0 440 200', 'Particles in a non-metal and in a metal. In a metal, free electrons also carry energy', `
    <text class="txt" x="85" y="14" text-anchor="middle" style="font-weight:700">non-metal (for example glass)</text>
    <text class="txt" x="315" y="14" text-anchor="middle" style="font-weight:700">metal</text>
    ${grid(30)}${grid(260)}
    ${electrons
      .map(([x, y, d]) => {
        const a = (d * Math.PI) / 180;
        return `<circle cx="${x}" cy="${y}" r="3.5" style="fill:#c9a227;stroke:var(--ink);stroke-width:0.6"/>` + arrow(x + 4 * Math.cos(a), y + 4 * Math.sin(a), r1(x + 10 * Math.cos(a)), r1(y + 10 * Math.sin(a)), 'arrow2', 1.2, 4);
      })
      .join('')}
    ${arrow(30, 132, 140, 132, 'arrow2', 2.5, 8)}
    ${arrow(260, 132, 370, 132, 'arrow2', 2.5, 8)}
    <text class="txt" x="85" y="156" text-anchor="middle">vibrations pass from</text>
    <text class="txt" x="85" y="176" text-anchor="middle">particle to particle (slow)</text>
    <text class="txt" x="315" y="156" text-anchor="middle">vibrations, and free electrons</text>
    <text class="txt" x="315" y="176" text-anchor="middle">that move fast (much faster)</text>
  `);
}

// A loop of arrows (a convection current) inside a rectangle.
function loop(x1: number, y1: number, x2: number, y2: number, upLeft = true): string {
  const parts = upLeft
    ? [arrow(x1, y2, x1, y1), arrow(x1 + 10, y1 - 8, x2, y1 - 8), arrow(x2 + 8, y1 + 4, x2 + 8, y2 - 4), arrow(x2, y2 + 6, x1 + 10, y2 + 6)]
    : [];
  return parts.join('');
}

// Convection in a beaker of water, heated under one side.
export function convectionBeakerSvg(): string {
  return svg('0 0 470 252', 'A beaker of water heated under the left side. Hot water rises, moves across, cools and sinks', `
    <rect class="layer-water" x="160" y="50" width="180" height="150"/>
    <path class="ink" style="stroke-width:2" d="M160,30 V200 H340 V30"/>
    ${loop(200, 80, 296, 176)}
    ${flame(200, 236)}
    <text class="txt" x="152" y="124" text-anchor="end">hot water rises</text>
    <text class="txt" x="350" y="124">cool water sinks</text>
    <text class="txt" x="250" y="22" text-anchor="middle">a convection current</text>
    <text class="txt" x="222" y="232">heat</text>
  `);
}

// Convection in a room with a heater near the floor.
export function roomConvectionSvg(): string {
  return svg('0 0 380 230', 'A room with a heater near the floor. Warm air rises, moves across the ceiling, cools and sinks', `
    <rect class="ink" style="stroke-width:2" x="20" y="20" width="340" height="190"/>
    <rect class="sk-waste" x="24" y="150" width="18" height="56"/>
    <text class="txt" x="48" y="200">heater</text>
    ${loop(62, 48, 316, 176)}
    <text class="txt" x="76" y="118">warm air rises</text>
    <text class="txt" x="308" y="118" text-anchor="end">cool air sinks</text>
  `);
}

// A Leslie cube (seen from above): four faces, one infrared detector.
export function leslieCubeSvg(): string {
  return svg('0 0 400 214', 'A Leslie cube full of hot water, seen from above, with four different faces, and an infrared detector', `
    <rect x="110" y="60" width="100" height="100" style="fill:var(--surface-2);stroke:none"/>
    <line style="stroke:#c0c4cc;stroke-width:7" x1="110" y1="60" x2="210" y2="60"/>
    <line style="stroke:#f4f4f4;stroke-width:7" x1="110" y1="60" x2="110" y2="160"/>
    <line style="stroke:#1d2433;stroke-width:7" x1="210" y1="60" x2="210" y2="160"/>
    <line style="stroke:#1d2433;stroke-width:7" x1="110" y1="160" x2="210" y2="160"/>
    <rect class="ink" x="106" y="56" width="108" height="108"/>
    <text class="txt" x="160" y="114" text-anchor="middle">hot water</text>
    <text class="txt" x="160" y="44" text-anchor="middle">shiny silver</text>
    <text class="txt" x="100" y="114" text-anchor="end">matt white</text>
    <text class="txt" x="160" y="186" text-anchor="middle">shiny black</text>
    <text class="txt" x="222" y="86">matt black</text>
    ${arrow(218, 100, 296, 100, 'ray', 2.2, 8)}
    ${arrow(218, 112, 296, 112, 'ray', 2.2, 8)}
    ${arrow(218, 124, 296, 124, 'ray', 2.2, 8)}
    <rect class="box" x="300" y="92" width="36" height="40" rx="4"/>
    <text class="txt" x="318" y="150" text-anchor="middle">infrared</text>
    <text class="txt" x="318" y="170" text-anchor="middle">detector</text>
  `);
}

// Good and bad absorbers: two plates at the same distance from a heater. Wax holds a coin on the back.
export function absorbersSvg(): string {
  return svg('0 0 400 200', 'A heater between a matt black plate and a shiny plate. The wax on the black plate melts first', `
    <rect class="sk-waste" x="185" y="40" width="30" height="110"/>
    <text class="txt" x="200" y="28" text-anchor="middle">heater</text>
    ${arrow(182, 80, 98, 80, 'ray', 2.2, 8)}
    ${arrow(182, 110, 98, 110, 'ray', 2.2, 8)}
    ${arrow(218, 80, 302, 80, 'ray', 2.2, 8)}
    ${arrow(218, 110, 302, 110, 'ray', 2.2, 8)}
    <rect x="84" y="40" width="10" height="110" style="fill:#1d2433;stroke:var(--ink)"/>
    <rect x="306" y="40" width="10" height="110" style="fill:#d6dae0;stroke:var(--ink)"/>
    <rect x="76" y="86" width="8" height="18" style="fill:#e8d36a;stroke:var(--ink);stroke-width:0.8"/>
    <rect x="316" y="86" width="8" height="18" style="fill:#e8d36a;stroke:var(--ink);stroke-width:0.8"/>
    <text class="txt" x="89" y="172" text-anchor="middle">matt black</text>
    <text class="txt" x="311" y="172" text-anchor="middle">shiny</text>
    <text class="txt" x="200" y="192" text-anchor="middle">wax on the back of each plate</text>
  `);
}

// The Earth: radiation in from the Sun, infrared out from the Earth.
export function earthBalanceSvg(): string {
  return svg('0 0 430 232', 'Radiation from the Sun reaches the Earth. The Earth emits infrared radiation. The atmosphere keeps some of it', `
    <circle class="sun" cx="44" cy="120" r="32"/>
    <circle cx="300" cy="130" r="78" style="fill:#4a90d9;opacity:0.15"/>
    <circle class="earth" cx="300" cy="130" r="55"/>
    ${arrow(84, 100, 238, 100, 'ray', 2.5, 9)}
    ${arrow(84, 120, 242, 120, 'ray', 2.5, 9)}
    ${arrow(84, 140, 240, 140, 'ray', 2.5, 9)}
    ${arrow(338, 90, 392, 34, 'arrow2', 2.5, 9)}
    ${arrow(352, 112, 418, 84, 'arrow2', 2.5, 9)}
    ${arrow(300, 72, 300, 56, 'arrow2', 2, 7)}
    ${arrow(292, 56, 292, 72, 'arrow2', 2, 7)}
    <text class="txt" x="160" y="86" text-anchor="middle">radiation in from the Sun</text>
    <text class="txt" x="426" y="22" text-anchor="end">infrared out</text>
    <text class="txt" x="300" y="226" text-anchor="middle">atmosphere</text>
  `);
}
