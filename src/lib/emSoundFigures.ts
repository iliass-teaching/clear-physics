// SVG figures for Unit 11 (electromagnetic spectrum, communication, sound). Simple diagrams, not to scale.

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

function arrow2(x1: number, y1: number, x2: number, y2: number, cls = 'arrow2', width = 2, size = 7): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const k = size * 0.6;
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1 + k * Math.cos(a))}" y1="${r1(y1 + k * Math.sin(a))}" x2="${r1(x2 - k * Math.cos(a))}" y2="${r1(y2 - k * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size) +
    head(x1, y1, a + Math.PI, cls, size)
  );
}

function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// The electromagnetic spectrum as a band.
export function emSpectrumSvg(): string {
  const names = ['Radio waves', 'Microwaves', 'Infrared', 'Visible', 'Ultraviolet', 'X-rays', 'Gamma rays'];
  const fills = ['#8d6e63', '#a1887f', '#e57373', 'url(#rainbow)', '#9575cd', '#7986cb', '#5c6bc0'];
  const cells = names.map((n, k) => {
    const x = 10 + k * 80;
    return `<rect x="${x}" y="58" width="78" height="48" style="fill:${fills[k]}"/>` +
      `<text class="${k === 3 ? 'txt-dark' : 'txt-light'}" x="${x + 39}" y="87" text-anchor="middle" style="font-weight:700">${n}</text>`;
  });
  return svg('0 0 580 150', 'The electromagnetic spectrum: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays', `
    <defs><linearGradient id="rainbow" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#e53935"/><stop offset="0.2" stop-color="#fb8c00"/><stop offset="0.35" stop-color="#fdd835"/>
      <stop offset="0.5" stop-color="#43a047"/><stop offset="0.7" stop-color="#1e88e5"/><stop offset="0.85" stop-color="#3949ab"/><stop offset="1" stop-color="#8e24aa"/>
    </linearGradient></defs>
    ${cells.join('')}
    ${arrow(330, 38, 568, 38, 'arrow', 2.5, 9)}
    <text class="txt" x="324" y="42" text-anchor="end">frequency gets higher</text>
    ${arrow(250, 128, 12, 128, 'arrow2', 2.5, 9)}
    <text class="txt" x="256" y="132">wavelength gets longer</text>
  `);
}

// A sine-like analogue signal and a digital (on/off) signal.
export function analogueDigitalSvg(): string {
  const pts: string[] = [];
  for (let x = 0; x <= 180; x += 3) {
    const y = 60 - 26 * Math.sin(x / 18) - 10 * Math.sin(x / 7);
    pts.push(`${30 + x},${r1(y)}`);
  }
  const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1];
  let d = `M260,${bits[0] ? 34 : 86}`;
  bits.forEach((b, k) => {
    const y = b ? 34 : 86;
    const x = 260 + k * 20;
    d += ` L${x},${y} L${x + 20},${y}`;
  });
  return svg('0 0 460 140', 'An analogue signal changes smoothly and can have any value. A digital signal has only two values, on and off', `
    <line class="soft" x1="30" y1="60" x2="210" y2="60"/>
    <path class="arrow" style="stroke-width:2.5" fill="none" d="M${pts.join(' L')}"/>
    <path class="arrow2" style="stroke-width:2.5" fill="none" d="${d}"/>
    <text class="txt" x="120" y="112" text-anchor="middle" style="font-weight:700">analogue</text>
    <text class="txt" x="120" y="129" text-anchor="middle">any value, changes smoothly</text>
    <text class="txt" x="350" y="112" text-anchor="middle" style="font-weight:700">digital</text>
    <text class="txt" x="350" y="129" text-anchor="middle">only two values: 1 (on) and 0 (off)</text>
    <text class="txt" x="252" y="38" text-anchor="end">1</text>
    <text class="txt" x="252" y="90" text-anchor="end">0</text>
  `);
}

// Noise on a long cable: a digital signal can be regenerated exactly; an analogue one cannot.
export function regenerationSvg(): string {
  const rand = rng(5);
  const bits = [1, 0, 1, 1, 0, 1, 0, 0];
  const digital = (x0: number, y0: number, noise: number) => {
    let d = '';
    bits.forEach((b, k) => {
      for (let s = 0; s <= 20; s += 4) {
        const y = y0 + (b ? -18 : 18) + (rand() - 0.5) * noise;
        d += `${d ? ' L' : 'M'}${x0 + k * 20 + s},${r1(y)}`;
      }
    });
    return `<path class="arrow2" style="stroke-width:2" fill="none" d="${d}"/>`;
  };
  const analogue = (x0: number, y0: number, noise: number, gainK: number) => {
    let d = '';
    for (let x = 0; x <= 160; x += 4) {
      const y = y0 - gainK * (18 * Math.sin(x / 15) + (rand() - 0.5) * noise);
      d += `${d ? ' L' : 'M'}${x0 + x},${r1(y)}`;
    }
    return `<path class="arrow" style="stroke-width:2" fill="none" d="${d}"/>`;
  };
  return svg('0 0 470 236', 'With noise, a digital signal can be regenerated exactly. An analogue signal cannot: the noise is amplified too', `
    <text class="txt" x="10" y="16" style="font-weight:700">digital</text>
    ${digital(20, 55, 12)}
    ${arrow(196, 55, 254, 55, 'arrow', 2, 8)}
    ${digital(270, 55, 0)}
    <text class="txt" x="100" y="96" text-anchor="middle">with noise, after a long distance</text>
    <text class="txt" x="350" y="96" text-anchor="middle">regenerated: exactly like the start</text>
    <text class="txt" x="10" y="128" style="font-weight:700">analogue</text>
    ${analogue(20, 170, 14, 0.6)}
    ${arrow(196, 170, 254, 170, 'arrow', 2, 8)}
    ${analogue(270, 170, 14, 1)}
    <text class="txt" x="100" y="226" text-anchor="middle">with noise, after a long distance</text>
    <text class="txt" x="350" y="226" text-anchor="middle">amplified: the noise is amplified too</text>
  `);
}

// Satellites: a low orbit and a geostationary orbit (not to scale).
export function satellitesSvg(): string {
  const sat = (x: number, y: number) =>
    `<rect x="${x - 5}" y="${y - 4}" width="10" height="8" class="stone"/><rect x="${x - 17}" y="${y - 2}" width="10" height="4" style="fill:#5c6bc0"/><rect x="${x + 7}" y="${y - 2}" width="10" height="4" style="fill:#5c6bc0"/>`;
  const C = [110, 152];
  const a1 = (-130 * Math.PI) / 180;
  const low = [C[0] + 74 * Math.cos(a1), C[1] + 74 * Math.sin(a1)];
  return svg('0 0 470 280', 'The Earth with a satellite in a low orbit, close to the Earth, and a geostationary satellite much further away. Not to scale', `
    <circle class="orbit" cx="${C[0]}" cy="${C[1]}" r="74"/>
    <path class="orbit" d="M${r1(C[0] + 190 * Math.cos(-0.7))},${r1(C[1] + 190 * Math.sin(-0.7))} A190,190 0 0 1 ${r1(C[0] + 190 * Math.cos(0.7))},${r1(C[1] + 190 * Math.sin(0.7))}"/>
    <circle class="earth" cx="${C[0]}" cy="${C[1]}" r="55"/>
    ${sat(low[0], low[1])}
    ${sat(C[0] + 190, C[1])}
    <text class="txt" x="10" y="26" style="font-weight:700">low-orbit satellite</text>
    <text class="txt" x="10" y="44">a few hundred km high;</text>
    <text class="txt" x="10" y="62">goes around in about 1.5 hours</text>
    <text class="txt" x="322" y="118" style="font-weight:700">geostationary satellite</text>
    <text class="txt" x="322" y="136">about 36 000 km high;</text>
    <text class="txt" x="322" y="154">once around in 24 hours,</text>
    <text class="txt" x="322" y="172">above the same place</text>
    <text class="txt" x="110" y="272" text-anchor="middle">not to scale</text>
  `);
}

// A loudspeaker makes compressions and rarefactions in the air.
export function soundCompressionSvg(): string {
  const rand = rng(9);
  const k = (2 * Math.PI) / 90;
  const dots: string[] = [];
  for (let i = 0; i < 44; i++) {
    const x0 = 96 + 7.5 * i;
    const x = x0 + 9 * Math.sin(k * (x0 - 96));
    for (let j = 0; j < 7; j++) {
      const y = 46 + j * 13 + (rand() - 0.5) * 7;
      dots.push(`<circle class="obj" cx="${r1(x + (rand() - 0.5) * 3)}" cy="${r1(y)}" r="2.6"/>`);
    }
  }
  return svg('0 0 460 190', 'A loudspeaker cone vibrates and makes compressions and rarefactions in the air. The sound travels away from the loudspeaker', `
    <rect class="stone" x="30" y="60" width="26" height="70"/>
    <polygon points="56,70 84,40 84,150 56,120" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    ${arrow2(70, 168, 98, 168, 'arrow2', 2, 6)}
    <text class="txt" x="40" y="182">cone vibrates</text>
    ${dots.join('')}
    <text class="txt" x="141" y="30" text-anchor="middle">compression</text>
    <text class="txt" x="186" y="152" text-anchor="middle">rarefaction</text>
    ${arrow(300, 170, 420, 170, 'arrow', 2.5, 9)}
    <text class="txt" x="360" y="160" text-anchor="middle">sound travels</text>
  `);
}

// Four oscilloscope traces: loud/quiet, high/low pitch.
export function soundTracesSvg(): string {
  const screen = (x0: number, y0: number, amp: number, waves: number, title: string) => {
    const pts: string[] = [];
    for (let x = 0; x <= 180; x += 2) pts.push(`${x0 + 10 + x},${r1(y0 + 45 - amp * Math.sin((2 * Math.PI * waves * x) / 180))}`);
    return `<rect x="${x0}" y="${y0}" width="200" height="90" rx="6" style="fill:#10261a"/>` +
      `<line x1="${x0 + 10}" y1="${y0 + 45}" x2="${x0 + 190}" y2="${y0 + 45}" style="stroke:#2f5a40"/>` +
      `<path d="M${pts.join(' L')}" style="fill:none;stroke:#7dff9a;stroke-width:2"/>` +
      `<text class="txt" x="${x0 + 100}" y="${y0 + 108}" text-anchor="middle">${title}</text>`;
  };
  return svg('0 0 450 250', 'Four sound waves on an oscilloscope: quiet and loud, low pitch and high pitch', `
    ${screen(10, 10, 12, 2, 'quiet, low pitch')}
    ${screen(240, 10, 36, 2, 'loud, low pitch')}
    ${screen(10, 132, 12, 6, 'quiet, high pitch')}
    ${screen(240, 132, 36, 6, 'loud, high pitch')}
  `);
}

// An echo: sound goes to a wall and comes back.
export function echoSvg(): string {
  return svg('0 0 440 200', 'A student claps in front of a wall. The sound travels to the wall and back: twice the distance', `
    <circle cx="60" cy="58" r="12" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    <line class="ink" style="stroke-width:2" x1="60" y1="70" x2="60" y2="120"/>
    <line class="ink" style="stroke-width:2" x1="60" y1="84" x2="80" y2="74"/>
    <line class="ink" style="stroke-width:2" x1="60" y1="120" x2="48" y2="150"/>
    <line class="ink" style="stroke-width:2" x1="60" y1="120" x2="72" y2="150"/>
    <rect class="stone" x="380" y="20" width="22" height="140"/>
    ${arrow(92, 76, 374, 76, 'arrow', 2.5, 9)}
    ${arrow(374, 108, 92, 108, 'arrow2', 2.5, 9)}
    <text class="txt" x="230" y="68" text-anchor="middle">sound goes to the wall</text>
    <text class="txt" x="230" y="126" text-anchor="middle">the echo comes back</text>
    ${arrow2(60, 172, 380, 172, 'arrow2', 1.6, 7)}
    <text class="txt" x="220" y="192" text-anchor="middle">distance to the wall d: the sound travels 2d</text>
    <text class="txt" x="391" y="16" text-anchor="middle">wall</text>
  `);
}

// Measuring the speed of sound outdoors: see the blocks hit, hear the sound later.
export function speedOfSoundSvg(): string {
  const person = (x: number) => `
    <circle cx="${x}" cy="66" r="11" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    <line class="ink" style="stroke-width:2" x1="${x}" y1="77" x2="${x}" y2="120"/>
    <line class="ink" style="stroke-width:2" x1="${x}" y1="120" x2="${x - 10}" y2="148"/>
    <line class="ink" style="stroke-width:2" x1="${x}" y1="120" x2="${x + 10}" y2="148"/>`;
  return svg('0 0 460 210', 'Student A hits two wooden blocks together. Student B, far away, starts a stopwatch when she sees the blocks hit and stops it when she hears the sound', `
    ${person(50)}${person(410)}
    <rect class="stone" x="62" y="76" width="16" height="10"/><rect class="stone" x="62" y="92" width="16" height="10"/>
    <rect class="box" x="384" y="84" width="16" height="20" rx="3"/>
    ${arrow(90, 70, 370, 70, 'ray', 2, 8)}
    ${arrow(90, 100, 370, 100, 'arrow', 2, 8)}
    <text class="txt" x="230" y="62" text-anchor="middle">light: arrives almost at once</text>
    <text class="txt" x="230" y="118" text-anchor="middle">sound: arrives later</text>
    ${arrow2(50, 166, 410, 166, 'arrow2', 1.6, 7)}
    <text class="txt" x="230" y="186" text-anchor="middle">distance measured with a tape (for example 200 m)</text>
    <text class="txt" x="50" y="40" text-anchor="middle">A</text>
    <text class="txt" x="410" y="40" text-anchor="middle">B</text>
  `);
}

// Sonar: a ship sends ultrasound to the sea bed and detects the echo.
export function sonarSvg(): string {
  return svg('0 0 420 236', 'A ship sends a pulse of ultrasound down to the sea bed. The echo comes back. depth = speed × time ÷ 2', `
    <rect class="layer-water" x="10" y="60" width="400" height="140"/>
    <path class="stone" d="M10,200 Q110,190 210,204 T410,198 L410,230 L10,230 Z"/>
    <polygon points="130,60 270,60 250,40 150,40" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    <rect x="190" y="22" width="22" height="18" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    ${arrow(190, 66, 190, 196, 'arrow2', 2.5, 9)}
    ${arrow(214, 196, 214, 66, 'arrow', 2.5, 9)}
    <text class="txt" x="182" y="140" text-anchor="end">ultrasound pulse</text>
    <text class="txt" x="222" y="140">echo</text>
    ${arrow2(320, 62, 320, 196, 'arrow2', 1.6, 7)}
    <text class="txt" x="328" y="134">depth d</text>
    <text class="txt" x="40" y="222" style="font-weight:700">sea bed</text>
  `);
}
