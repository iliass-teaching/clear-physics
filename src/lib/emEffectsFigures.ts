// SVG figures for Unit 15 (electromagnetic effects). Simple diagrams, not to scale.
import { fieldLinesSvg } from './magnetField';

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

export function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.5, size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

const N_COL = '#d84b3a';
const S_COL = '#3a6fd8';

// Current out of the page (dot) or into the page (cross).
export function wireEnd(x: number, y: number, out: boolean, r = 12): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--bg);stroke:var(--ink);stroke-width:2"/>` +
    (out ? `<circle cx="${x}" cy="${y}" r="3.5" class="ink-head"/>` : `<line class="ink" style="stroke-width:2" x1="${x - 7}" y1="${y - 7}" x2="${x + 7}" y2="${y + 7}"/><line class="ink" style="stroke-width:2" x1="${x - 7}" y1="${y + 7}" x2="${x + 7}" y2="${y - 7}"/>`);
}

// Magnetic field around a straight wire: circles, closer together near the wire.
export function wireFieldSvg(): string {
  const rings = (cx: number, cy: number, anticlockwise: boolean) =>
    [26, 44, 68, 98]
      .map((r) => {
        // Arrow head at the top of each circle: anticlockwise means moving left at the top.
        const dir = anticlockwise ? Math.PI : 0;
        return `<circle cx="${cx}" cy="${cy}" r="${r}" class="arrow" style="fill:none;stroke-width:1.6"/>` + head(cx, cy - r, dir, 'arrow', 8);
      })
      .join('');
  return svg('0 0 500 250', 'Magnetic field around a straight wire: circles around the wire. Current out of the page: anticlockwise field. Current into the page: clockwise field', `
    ${rings(120, 120, true)}${wireEnd(120, 120, true)}
    ${rings(380, 120, false)}${wireEnd(380, 120, false)}
    <text class="txt" x="120" y="242" text-anchor="middle">current out of the page: anticlockwise</text>
    <text class="txt" x="380" y="242" text-anchor="middle">current into the page: clockwise</text>
  `);
}

// Magnetic field of a solenoid: like a bar magnet.
export function solenoidSvg(): string {
  const coils: string[] = [];
  for (let k = 0; k < 9; k++) {
    const x = 228 + k * 18;
    coils.push(`<rect x="${x - 6}" y="146" width="12" height="48" rx="6" style="fill:#b87333;opacity:0.85;stroke:var(--ink);stroke-width:1"/>`);
  }
  return `<svg class="fig" viewBox="0 0 600 340" role="img" aria-label="The magnetic field of a solenoid is like the field of a bar magnet, with a N pole at one end and a S pole at the other" style="overflow:hidden">
    ${fieldLinesSvg('one', 14)}
    <rect x="220" y="150" width="160" height="40" style="fill:var(--bg);stroke:none"/>
    ${[160, 170, 180].map((y) => `<line class="arrow" style="stroke-width:1.6" x1="224" y1="${y}" x2="376" y2="${y}"/>` + head(300, y, 0, 'arrow', 7)).join('')}
    ${coils.join('')}
    <text class="txt halo" x="392" y="176" style="font-weight:700;font-size:16px">N</text>
    <text class="txt halo" x="196" y="176" style="font-weight:700;font-size:16px">S</text>
  </svg>`;
}

// A relay: a small current in the coil closes a switch in a second circuit.
export function relaySvg(): string {
  const turns = [0, 1, 2, 3, 4, 5].map((k) => `<rect x="${70 + k * 12}" y="112" width="8" height="40" rx="4" style="fill:#b87333;stroke:var(--ink);stroke-width:1"/>`).join('');
  return svg('0 0 620 245', 'A relay: a current in the coil magnetises the iron core, which pulls the iron armature and closes the contacts of the second circuit', `<g transform="translate(60,0)">
    <rect x="62" y="122" width="88" height="20" style="fill:#9aa0a6;stroke:var(--ink)"/>
    ${turns}
    <polyline class="wire" fill="none" points="70,152 70,200 30,200"/>
    <polyline class="wire" fill="none" points="138,152 138,210 30,210"/>
    <text class="txt" x="26" y="196" text-anchor="end">small</text>
    <text class="txt" x="26" y="214" text-anchor="end">current</text>
    <line class="ink" style="stroke-width:6" x1="180" y1="98" x2="300" y2="98"/>
    <circle cx="180" cy="98" r="5" class="ink-head"/>
    <rect x="290" y="80" width="10" height="18" style="fill:#c9a227;stroke:var(--ink)"/>
    <rect x="290" y="56" width="10" height="16" style="fill:#c9a227;stroke:var(--ink)"/>
    <polyline class="wire" fill="none" points="295,56 295,30 420,30"/>
    <polyline class="wire" fill="none" points="300,98 330,98 330,60 420,60"/>
    ${arrow(240, 130, 240, 106, 'arrow2', 2.2, 8)}
    <text class="txt" x="250" y="122">iron armature</text>
    <text class="txt" x="106" y="232" text-anchor="middle">coil on iron core</text>
    <text class="txt" x="426" y="34">second circuit</text>
    <text class="txt" x="426" y="52">(big current,</text>
    <text class="txt" x="426" y="70">e.g. a motor)</text>
    <text class="txt" x="340" y="90">contacts close</text>
  </g>`);
}

// A loudspeaker: a coil on a cone, in the field of a permanent magnet.
export function loudspeakerSvg(): string {
  return svg('0 0 460 220', 'A loudspeaker: an alternating current in the coil makes the coil and the cone move in and out, in the field of a permanent magnet', `
    <rect x="40" y="70" width="70" height="80" style="fill:${S_COL};opacity:0.85"/>
    <rect x="110" y="96" width="50" height="28" style="fill:${N_COL};opacity:0.85"/>
    <text class="txt-light" x="135" y="115" text-anchor="middle" style="font-weight:700">N</text>
    <text class="txt-light" x="75" y="88" text-anchor="middle" style="font-weight:700">S</text>
    <text class="txt-light" x="75" y="146" text-anchor="middle" style="font-weight:700">S</text>
    ${[0, 1, 2, 3].map((k) => `<rect x="${118 + k * 10}" y="86" width="6" height="48" rx="3" style="fill:#b87333;stroke:var(--ink);stroke-width:0.8"/>`).join('')}
    <polygon points="165,86 300,20 300,200 165,134" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>
    ${arrow(320, 110, 360, 110, 'arrow2', 2.2, 8)}${arrow(360, 110, 320, 110, 'arrow2', 2.2, 8)}
    <text class="txt" x="372" y="103">cone moves</text>
    <text class="txt" x="372" y="124">in and out</text>
    <text class="txt" x="140" y="176" text-anchor="middle">coil</text>
    <text class="txt" x="75" y="176" text-anchor="middle">permanent magnet</text>
    <text class="txt" x="230" y="214" text-anchor="middle">a.c. in the coil → force changes direction → sound waves</text>
  `);
}

// Force on a current-carrying wire in a magnetic field (seen from the side).
export function motorEffectSvg(): string {
  return svg('0 0 460 220', 'A wire carrying a current between the poles of a magnet. The wire feels a force at right angles to the current and to the field', `
    <rect x="40" y="60" width="90" height="100" style="fill:${N_COL}"/>
    <rect x="330" y="60" width="90" height="100" style="fill:${S_COL}"/>
    <text class="txt-light" x="85" y="117" text-anchor="middle" style="font-weight:700;font-size:20px">N</text>
    <text class="txt-light" x="375" y="117" text-anchor="middle" style="font-weight:700;font-size:20px">S</text>
    ${[80, 110, 140].map((y) => arrow(138, y, 322, y, 'arrow', 1.4, 7)).join('')}
    ${wireEnd(230, 110, true, 14)}
    ${arrow(230, 92, 230, 30, 'arrow2', 3.2, 11)}
    <text class="txt" x="242" y="40" style="font-weight:700">force</text>
    <text class="txt" x="230" y="186" text-anchor="middle">wire: current out of the page</text>
    <text class="txt" x="230" y="204" text-anchor="middle">field: from N to S</text>
  `);
}

// A d.c. motor: coil, split-ring commutator, brushes.
export function dcMotorSvg(): string {
  return svg('0 0 480 260', 'A d.c. motor: a coil between the poles of a magnet, a split-ring commutator and two brushes. The forces on the two sides of the coil are in opposite directions, so the coil turns', `
    <rect x="20" y="40" width="70" height="120" style="fill:${N_COL}"/>
    <rect x="390" y="40" width="70" height="120" style="fill:${S_COL}"/>
    <text class="txt-light" x="55" y="106" text-anchor="middle" style="font-weight:700;font-size:20px">N</text>
    <text class="txt-light" x="425" y="106" text-anchor="middle" style="font-weight:700;font-size:20px">S</text>
    <polygon points="140,70 330,50 340,130 150,150" style="fill:none;stroke:#b87333;stroke-width:5"/>
    <line x1="240" y1="140" x2="240" y2="190" style="stroke:#b87333;stroke-width:3"/>
    <path d="M222,198 A18,18 0 0 1 238,182" style="fill:none;stroke:#c9a227;stroke-width:8"/>
    <path d="M242,182 A18,18 0 0 1 258,198" style="fill:none;stroke:#c9a227;stroke-width:8"/>
    <rect x="196" y="194" width="18" height="12" class="stone"/>
    <rect x="266" y="194" width="18" height="12" class="stone"/>
    ${arrow(145, 110, 145, 40, 'arrow2', 3, 10)}
    ${arrow(335, 90, 335, 160, 'arrow2', 3, 10)}
    <text class="txt" x="128" y="36" text-anchor="end">force up</text>
    <text class="txt" x="350" y="176">force down</text>
    <text class="txt" x="240" y="232" text-anchor="middle">split-ring commutator and brushes</text>
    <text class="txt" x="240" y="250" text-anchor="middle">(reverse the current in the coil every half turn)</text>
    <text class="txt" x="240" y="40" text-anchor="middle">coil</text>
  `);
}

// Electromagnetic induction: a magnet pushed into a coil connected to a sensitive meter.
export function inductionSvg(): string {
  const turns = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<ellipse cx="${200 + k * 16}" cy="110" rx="7" ry="40" style="fill:none;stroke:#b87333;stroke-width:4"/>`).join('');
  return svg('0 0 470 240', 'A magnet is pushed into a coil. The coil is connected to a sensitive meter. The meter shows an induced current while the magnet moves', `
    <rect x="40" y="96" width="60" height="28" style="fill:${S_COL}"/>
    <rect x="100" y="96" width="60" height="28" style="fill:${N_COL}"/>
    <text class="txt-light" x="70" y="115" text-anchor="middle" style="font-weight:700">S</text>
    <text class="txt-light" x="130" y="115" text-anchor="middle" style="font-weight:700">N</text>
    ${arrow(100, 150, 160, 150, 'arrow2', 2.5, 9)}
    <text class="txt" x="130" y="172" text-anchor="middle">push in</text>
    ${turns}
    <polyline class="wire" fill="none" points="200,150 200,215 330,215"/>
    <polyline class="wire" fill="none" points="312,150 312,190 400,190 400,215 370,215"/>
    <circle cx="350" cy="215" r="20" style="fill:var(--bg);stroke:var(--ink);stroke-width:2"/>
    <line x1="350" y1="226" x2="358" y2="202" style="stroke:var(--exit);stroke-width:2.5"/>
    <text class="txt" x="424" y="220">meter</text>
    <text class="txt" x="256" y="56" text-anchor="middle">coil</text>
  `);
}

// The a.c. generator: a coil turns between the poles; slip rings and brushes.
export function generatorSvg(): string {
  return svg('0 0 480 260', 'An a.c. generator: a coil turns between the poles of a magnet. Slip rings and brushes connect the coil to the outside circuit', `
    <rect x="20" y="40" width="70" height="120" style="fill:${N_COL}"/>
    <rect x="390" y="40" width="70" height="120" style="fill:${S_COL}"/>
    <text class="txt-light" x="55" y="106" text-anchor="middle" style="font-weight:700;font-size:20px">N</text>
    <text class="txt-light" x="425" y="106" text-anchor="middle" style="font-weight:700;font-size:20px">S</text>
    <polygon points="140,70 330,50 340,130 150,150" style="fill:none;stroke:#b87333;stroke-width:5"/>
    <line x1="232" y1="140" x2="232" y2="200" style="stroke:#b87333;stroke-width:3"/>
    <line x1="248" y1="140" x2="248" y2="180" style="stroke:#b87333;stroke-width:3"/>
    <ellipse cx="240" cy="182" rx="22" ry="6" style="fill:none;stroke:#c9a227;stroke-width:5"/>
    <ellipse cx="240" cy="202" rx="22" ry="6" style="fill:none;stroke:#c9a227;stroke-width:5"/>
    <rect x="266" y="176" width="16" height="10" class="stone"/>
    <rect x="266" y="196" width="16" height="10" class="stone"/>
    <polyline class="wire" fill="none" points="282,181 360,181 360,220"/>
    <polyline class="wire" fill="none" points="282,201 330,201 330,220"/>
    <circle cx="345" cy="232" r="16" style="fill:var(--bg);stroke:var(--ink);stroke-width:2"/>
    <text class="txt" x="345" y="237" text-anchor="middle" style="font-weight:700">~</text>
    <path d="M240,22 A40,12 0 1 1 239,22" style="fill:none;stroke:var(--ink-soft);stroke-width:1.5"/>
    ${head(282, 26, 0.3, 'ink', 8)}
    <text class="txt" x="290" y="18">the coil turns</text>
    <text class="txt" x="170" y="232" text-anchor="end">slip rings</text>
    <text class="txt" x="290" y="168">brushes</text>
    <text class="txt" x="372" y="256" text-anchor="middle">output (a.c.)</text>
  `);
}

// A transformer: primary and secondary coils on a soft-iron core.
export function transformerSvg(): string {
  const coil = (x: number, n: number) =>
    Array.from({ length: n }, (_, k) => `<ellipse cx="${x}" cy="${70 + k * (100 / (n - 1))}" rx="26" ry="5" style="fill:none;stroke:#b87333;stroke-width:3.5"/>`).join('');
  return svg('0 0 460 220', 'A transformer: a primary coil and a secondary coil on the same soft-iron core', `
    <path d="M120,40 H340 V200 H120 Z M150,70 V170 H310 V70 Z" fill-rule="evenodd" style="fill:#9aa0a6;stroke:var(--ink);stroke-width:1.5"/>
    ${coil(135, 6)}
    ${coil(325, 11)}
    <polyline class="wire" fill="none" points="109,70 40,70"/><polyline class="wire" fill="none" points="109,170 40,170"/>
    <polyline class="wire" fill="none" points="351,70 420,70"/><polyline class="wire" fill="none" points="351,170 420,170"/>
    <text class="txt" x="34" y="124" text-anchor="end" style="font-weight:700">Vp</text>
    <text class="txt" x="426" y="124" style="font-weight:700">Vs</text>
    <text class="txt" x="135" y="214" text-anchor="middle">primary coil (Np turns)</text>
    <text class="txt" x="325" y="214" text-anchor="middle">secondary coil (Ns turns)</text>
    <text class="txt" x="230" y="30" text-anchor="middle">soft-iron core</text>
    <text class="txt" x="40" y="60">a.c. in</text>
    <text class="txt" x="380" y="60">a.c. out</text>
  `);
}

// High-voltage transmission: step-up, cables, step-down.
export function transmissionSvg(): string {
  const box = (x: number, t1: string, t2: string) =>
    `<rect class="box" x="${x}" y="56" width="92" height="50" rx="6"/>` +
    `<text class="txt" x="${x + 46}" y="78" text-anchor="middle" style="font-weight:700">${t1}</text>` +
    `<text class="txt" x="${x + 46}" y="96" text-anchor="middle">${t2}</text>`;
  return svg('0 0 560 170', 'Electricity from a power station goes through a step-up transformer, high-voltage cables and a step-down transformer to homes', `
    ${box(4, 'power', 'station')}
    ${box(120, 'step-up', 'transformer')}
    ${box(344, 'step-down', 'transformer')}
    ${box(460, 'homes', '230 V')}
    ${arrow(98, 81, 116, 81, 'arrow', 2, 7)}
    ${arrow(440, 81, 456, 81, 'arrow', 2, 7)}
    <path d="M214,70 Q279,98 344,70" style="fill:none;stroke:var(--ink);stroke-width:2"/>
    <path d="M214,84 Q279,112 344,84" style="fill:none;stroke:var(--ink);stroke-width:2"/>
    <text class="txt" x="279" y="40" text-anchor="middle" style="font-weight:700">cables at a very high p.d.</text>
    <text class="txt" x="279" y="152" text-anchor="middle">small current → small energy losses</text>
    <text class="txt" x="50" y="126" text-anchor="middle">about 25 kV</text>
    <text class="txt" x="166" y="126" text-anchor="middle">up to 400 kV</text>
  `);
}
