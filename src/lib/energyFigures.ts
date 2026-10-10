// SVG figures for Unit 5 (energy). Sankey diagrams, flow diagrams, a power station, a roller coaster.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

export interface SankeyOutput {
  label: string;
  value: number; // J (or W)
  useful?: boolean;
}

// A Sankey diagram: the input arrow on the left. The useful output goes straight on,
// the wasted outputs bend down. Widths are proportional to the energy.
export function sankeySvg(inputLabel: string, input: number, outputs: SankeyOutput[], unit = 'J'): string {
  const scale = 120 / input; // the input arrow is 120 px wide
  const top = 30;
  const x0 = 20;
  const xSplit = 200;
  const parts: string[] = [];
  const inW = input * scale;
  parts.push(`<rect class="sk-in" x="${x0}" y="${top}" width="${xSplit - x0}" height="${inW}"/>`);
  parts.push(`<text class="txt" x="${x0 + 6}" y="${top + inW / 2 + 4}" style="font-weight:700">${inputLabel}: ${input} ${unit}</text>`);
  const useful = outputs.filter((o) => o.useful);
  const wasted = outputs.filter((o) => !o.useful);
  let y = top;
  for (const o of useful) {
    const w = o.value * scale;
    parts.push(`<polygon class="sk-useful" points="${xSplit},${y} ${400},${y} ${420},${y + w / 2} ${400},${y + w} ${xSplit},${y + w}"/>`);
    parts.push(`<text class="txt" x="${428}" y="${y + w / 2 + 4}" style="font-weight:700">${o.label}: ${o.value} ${unit}</text>`);
    y += w;
  }
  // Wasted bands turn down. The lowest band turns first (inside); each band above
  // turns further to the right, so the bands never cross.
  const yEnd = 240;
  const bands = wasted.map((o) => {
    const w = o.value * scale;
    const b = { o, w, yTop: y, yBot: y + w, xEnd: 0 };
    y += w;
    return b;
  });
  let xRight = xSplit + 30;
  for (let i = bands.length - 1; i >= 0; i--) {
    const b = bands[i];
    b.xEnd = Math.max(xRight + b.w, xSplit + 30 + b.w);
    xRight = b.xEnd + 90; // room for the label of the next band
  }
  for (const b of bands) {
    const { w, yTop, yBot, xEnd } = b;
    parts.push(
      `<path class="sk-waste" d="M${xSplit},${yTop} Q${xEnd},${yTop} ${xEnd},${yEnd - 15} L${xEnd + 8},${yEnd - 15} L${xEnd - w / 2},${yEnd} L${xEnd - w - 8},${yEnd - 15} L${xEnd - w},${yEnd - 15} Q${xEnd - w},${yBot} ${xSplit},${yBot} Z"/>`,
    );
    parts.push(`<text class="txt" x="${xEnd - w / 2}" y="${yEnd + 16}" text-anchor="middle">${b.o.label}: ${b.o.value} ${unit}</text>`);
  }
  return svg('0 0 640 270', 'A Sankey diagram', parts.join(''));
}

// A simple flow diagram: boxes joined by arrows.
export function flowSvg(steps: string[]): string {
  const w = 150;
  const gap = 40;
  const total = steps.length * w + (steps.length - 1) * gap;
  const parts: string[] = [];
  steps.forEach((s, i) => {
    const x = i * (w + gap);
    const lines = s.split('|');
    parts.push(`<rect class="box" x="${x + 2}" y="6" width="${w - 4}" height="64" rx="8"/>`);
    lines.forEach((l, j) => {
      parts.push(`<text class="txt" x="${x + w / 2}" y="${42 + (j - (lines.length - 1) / 2) * 18}" text-anchor="middle">${l}</text>`);
    });
    if (i < steps.length - 1) {
      const ax = x + w;
      parts.push(`<line class="ink" x1="${ax + 2}" y1="38" x2="${ax + gap - 10}" y2="38"/>`);
      parts.push(`<polygon class="ink-head" points="${ax + gap - 2},38 ${ax + gap - 12},33 ${ax + gap - 12},43"/>`);
    }
  });
  return svg(`0 0 ${total} 76`, 'A flow diagram of energy transfers', parts.join(''));
}

// A thermal power station: fuel heats water in a boiler, steam turns a turbine, the turbine turns a generator.
export function powerStationSvg(): string {
  return svg('0 0 640 200', 'A power station: boiler, turbine, generator', `
    <rect class="box" x="20" y="60" width="120" height="90" rx="8"/>
    <text class="txt" x="80" y="92" text-anchor="middle" style="font-weight:700">boiler</text>
    <text class="txt" x="80" y="110" text-anchor="middle">fuel heats water</text>
    <text class="txt" x="80" y="126" text-anchor="middle">to make steam</text>
    <path class="sk-waste" d="M50,150 q10,-12 20,0 q10,-12 20,0 q10,-12 20,0" fill="none" style="fill:none;stroke:#e0a200;stroke-width:3"/>
    <line class="ink" x1="140" y1="85" x2="210" y2="85"/>
    <polygon class="ink-head" points="220,85 208,79 208,91"/>
    <text class="txt" x="180" y="75" text-anchor="middle">steam</text>
    <rect class="box" x="225" y="55" width="130" height="60" rx="8"/>
    <text class="txt" x="290" y="82" text-anchor="middle" style="font-weight:700">turbine</text>
    <text class="txt" x="290" y="100" text-anchor="middle">steam turns the blades</text>
    <line class="ink" x1="355" y1="85" x2="410" y2="85" style="stroke-width:5"/>
    <text class="txt" x="382" y="75" text-anchor="middle">shaft</text>
    <rect class="box" x="410" y="55" width="130" height="60" rx="8"/>
    <text class="txt" x="475" y="82" text-anchor="middle" style="font-weight:700">generator</text>
    <text class="txt" x="475" y="100" text-anchor="middle">makes electricity</text>
    <line class="ink" x1="540" y1="85" x2="600" y2="85"/>
    <polygon class="ink-head" points="610,85 598,79 598,91"/>
    <text class="txt" x="590" y="112" text-anchor="middle">to homes</text>
    <line class="ink" x1="290" y1="115" x2="290" y2="160"/>
    <polygon class="ink-head" points="290,170 284,158 296,158"/>
    <text class="txt" x="300" y="185">steam cools back into water</text>
  `);
}

// A roller coaster track with three points A, B, C at different heights.
export function rollerCoasterSvg(hA: number, hB: number, hC: number): string {
  const base = 210;
  const s = 160 / Math.max(hA, hB, hC); // pixels per metre
  const yA = base - hA * s;
  const yB = base - hB * s;
  const yC = base - hC * s;
  return svg('0 0 560 240', 'A roller coaster track with points A, B and C at different heights', `
    <line class="ink" x1="10" y1="${base}" x2="550" y2="${base}"/>
    <path class="ink" style="stroke-width:3" d="M30,${yA} C100,${yA} 140,${yB} 230,${yB} C320,${yB} 340,${yC} 430,${yC} C480,${yC} 500,${yC} 540,${yC}"/>
    <circle class="arrow2-head" cx="30" cy="${yA}" r="6"/><text class="txt" x="40" y="${yA - 8}" style="font-weight:700">A (${hA} m)</text>
    <circle class="arrow2-head" cx="230" cy="${yB}" r="6"/><text class="txt" x="240" y="${yB - 8}" style="font-weight:700">B (${hB} m)</text>
    <circle class="arrow2-head" cx="430" cy="${yC}" r="6"/><text class="txt" x="440" y="${yC - 8}" style="font-weight:700">C (${hC} m)</text>
  `);
}
