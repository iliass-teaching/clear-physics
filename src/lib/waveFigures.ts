// SVG figures for Unit 9 (general properties of waves). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

// Arrow with one head (cls 'arrow' blue, 'arrow2' red).
function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow', width = 2.5, size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2 - size * 0.6 * Math.cos(a))}" y2="${r1(y2 - size * 0.6 * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size)
  );
}

// Arrow with a head at each end.
function arrow2(x1: number, y1: number, x2: number, y2: number, cls = 'arrow2', width = 2, size = 7): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const k = size * 0.6;
  return (
    `<line class="${cls}" style="stroke-width:${width}" x1="${r1(x1 + k * Math.cos(a))}" y1="${r1(y1 + k * Math.sin(a))}" x2="${r1(x2 - k * Math.cos(a))}" y2="${r1(y2 - k * Math.sin(a))}"/>` +
    head(x2, y2, a, cls, size) +
    head(x1, y1, a + Math.PI, cls, size)
  );
}

// A sine curve as an SVG path.
function sinePath(x0: number, x1: number, yMid: number, amp: number, lambda: number, phase = 0): string {
  const pts: string[] = [];
  for (let x = x0; x <= x1 + 0.01; x += 2) {
    pts.push(`${r1(x)},${r1(yMid - amp * Math.sin((2 * Math.PI * (x - x0)) / lambda + phase))}`);
  }
  return `M${pts.join(' L')}`;
}

// A transverse wave on a rope.
export function transverseSvg(): string {
  return svg('0 0 460 172', 'A transverse wave on a rope. A point on the rope moves up and down. The wave travels to the right', `
    <path class="ink" style="stroke-width:3" fill="none" d="${sinePath(30, 420, 85, 35, 130)}"/>
    <circle cx="225" cy="85" r="6" style="fill:var(--exit)"/>
    ${arrow2(250, 52, 250, 118, 'arrow2', 2, 7)}
    <text class="txt" x="250" y="40" text-anchor="middle">vibration</text>
    ${arrow(300, 152, 420, 152, 'arrow', 2.5, 9)}
    <text class="txt" x="290" y="156" text-anchor="end">direction the wave travels</text>
  `);
}

// A longitudinal wave on a spring: compressions and rarefactions.
export function longitudinalSvg(): string {
  const k = (2 * Math.PI) / 130;
  const A = 12;
  const coils: string[] = [];
  for (let i = 0; i <= 49; i++) {
    const x0 = 30 + 8 * i;
    const x = x0 + A * Math.sin(k * (x0 - 30));
    const red = x0 === 230;
    coils.push(`<line style="stroke:${red ? 'var(--exit)' : 'var(--ink)'};stroke-width:${red ? 3 : 1.6}" x1="${r1(x)}" y1="62" x2="${r1(x)}" y2="108"/>`);
  }
  return svg('0 0 460 172', 'A longitudinal wave on a spring, with compressions and rarefactions. The coils move left and right. The wave travels to the right', `
    ${coils.join('')}
    ${arrow2(208, 44, 252, 44, 'arrow2', 2, 7)}
    <text class="txt" x="230" y="30" text-anchor="middle">vibration</text>
    <text class="txt" x="95" y="128" text-anchor="middle">compression</text>
    <text class="txt" x="290" y="128" text-anchor="middle">rarefaction</text>
    ${arrow(300, 154, 420, 154, 'arrow', 2.5, 9)}
    <text class="txt" x="290" y="158" text-anchor="end">direction the wave travels</text>
  `);
}

// A wave drawn as displacement against distance, with crest, trough, wavelength and amplitude.
export function waveDiagramSvg(): string {
  return svg('0 0 460 206', 'A wave with a crest, a trough, the wavelength between two crests and the amplitude from the middle line to a crest', `
    <line class="ink" x1="40" y1="110" x2="440" y2="110"/>
    <line class="ink" x1="40" y1="20" x2="40" y2="196"/>
    <path class="arrow" style="stroke-width:3" fill="none" d="${sinePath(40, 360, 110, 60, 160)}"/>
    <line class="dash" x1="80" y1="50" x2="392" y2="50"/>
    ${arrow2(80, 26, 240, 26, 'arrow2', 2, 7)}
    <text class="txt" x="160" y="18" text-anchor="middle" style="font-weight:700">wavelength λ</text>
    <text class="txt" x="80" y="44" text-anchor="middle">crest</text>
    <text class="txt" x="160" y="190" text-anchor="middle">trough</text>
    ${arrow2(380, 110, 380, 50, 'arrow2', 2, 7)}
    <text class="txt" x="386" y="84" style="font-weight:700">amplitude</text>
    <text class="txt" x="440" y="128" text-anchor="end">distance</text>
    <text class="txt" x="46" y="16">displacement</text>
  `);
}

// Straight wavefronts seen from above.
export function wavefrontsSvg(): string {
  const lines = [60, 110, 160, 210, 260].map((x) => `<line class="arrow" style="stroke-width:3" x1="${x}" y1="34" x2="${x}" y2="130"/>`);
  return svg('0 0 420 176', 'Straight wavefronts seen from above. The distance between two wavefronts is the wavelength', `
    ${lines.join('')}
    <text class="txt" x="160" y="22" text-anchor="middle">wavefronts (crests seen from above)</text>
    ${arrow2(110, 146, 160, 146, 'arrow2', 2, 7)}
    <text class="txt" x="135" y="166" text-anchor="middle">wavelength</text>
    ${arrow(290, 82, 390, 82, 'arrow', 2.5, 9)}
    <text class="txt" x="340" y="72" text-anchor="middle">direction of travel</text>
  `);
}

// A ripple tank, seen from the side.
export function rippleTankSvg(): string {
  const bright = [150, 190, 230, 270, 310].map((x) => `<line class="ray" style="stroke-width:5" x1="${x}" y1="194" x2="${x}" y2="206"/>`);
  return svg('0 0 440 232', 'A ripple tank: a lamp above a shallow tank of water, a vibrating bar driven by a motor, and a screen below', `
    <circle class="sun" cx="220" cy="22" r="11"/>
    <text class="txt" x="238" y="26">lamp</text>
    <line class="dash" x1="214" y1="34" x2="120" y2="196"/>
    <line class="dash" x1="226" y1="34" x2="330" y2="196"/>
    <rect class="layer-water" x="60" y="92" width="320" height="16"/>
    <path class="ink" style="stroke-width:2" d="M60,80 V110 H380 V80"/>
    <rect class="stone" x="80" y="72" width="12" height="28"/>
    <rect class="box" x="66" y="48" width="44" height="22" rx="3"/>
    <text class="txt" x="118" y="63">motor</text>
    <line class="soft" x1="62" y1="124" x2="82" y2="104"/>
    <text class="txt" x="20" y="136">vibrating bar</text>
    <text class="txt" x="386" y="104">water</text>
    <line class="ink" x1="40" y1="200" x2="400" y2="200"/>
    ${bright.join('')}
    <text class="txt" x="220" y="224" text-anchor="middle">screen: bright and dark lines show the waves</text>
  `);
}

// Reflection of straight waves at a flat barrier (seen from above).
export function reflectionWavesSvg(): string {
  const s2 = Math.SQRT1_2;
  const parts: string[] = [];
  for (const s of [45, 75, 105, 135, 165]) {
    const px = 200 - s * s2;
    const py = 180 - s * s2;
    parts.push(`<line class="arrow" style="stroke-width:3" x1="${r1(px + 40 * s2)}" y1="${r1(py - 40 * s2)}" x2="${r1(px - 40 * s2)}" y2="${r1(py + 40 * s2)}"/>`);
    const qx = 200 + s * s2;
    const qy = 180 - s * s2;
    parts.push(`<line class="arrow2" style="stroke-width:3" x1="${r1(qx + 40 * s2)}" y1="${r1(qy + 40 * s2)}" x2="${r1(qx - 40 * s2)}" y2="${r1(qy - 40 * s2)}"/>`);
  }
  return svg('0 0 400 214', 'Straight waves hit a flat barrier at an angle and reflect at the same angle', `
    ${parts.join('')}
    <line class="dash" x1="200" y1="90" x2="200" y2="178"/>
    <rect class="stone" x="30" y="180" width="340" height="8"/>
    <text class="txt" x="20" y="16">waves come in</text>
    <text class="txt" x="380" y="16" text-anchor="end">reflected waves</text>
    <text class="txt" x="200" y="206" text-anchor="middle">flat barrier</text>
  `);
}

// Clip the line n·p = c to a rectangle. Returns the two end points, or null.
function clip(nx: number, ny: number, c: number, x0: number, x1: number, y0: number, y1: number): [number, number, number, number] | null {
  const pts: [number, number][] = [];
  if (Math.abs(ny) > 1e-9) {
    for (const x of [x0, x1]) {
      const y = (c - nx * x) / ny;
      if (y >= y0 - 1e-6 && y <= y1 + 1e-6) pts.push([x, y]);
    }
  }
  if (Math.abs(nx) > 1e-9) {
    for (const y of [y0, y1]) {
      const x = (c - ny * y) / nx;
      if (x >= x0 - 1e-6 && x <= x1 + 1e-6) pts.push([x, y]);
    }
  }
  if (pts.length < 2) return null;
  pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const [a, b] = [pts[0], pts[pts.length - 1]];
  if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 4) return null;
  return [a[0], a[1], b[0], b[1]];
}

// Refraction of water waves: deep water to shallow water (slower, shorter wavelength, change of direction).
export function refractionWavesSvg(): string {
  const B = 210; // boundary
  const t1 = (40 * Math.PI) / 180;
  const ratio = 0.6;
  const t2 = Math.asin(ratio * Math.sin(t1));
  const d1 = [Math.cos(t1), Math.sin(t1)];
  const d2 = [Math.cos(t2), Math.sin(t2)];
  const lam1 = 36;
  const parts: string[] = [];
  for (let k = -12; k <= 12; k++) {
    const c = d1[0] * B + d1[1] * 100 + k * lam1;
    const seg = clip(d1[0], d1[1], c, 20, B, 20, 180);
    if (seg) parts.push(`<line class="arrow" style="stroke-width:2.5" x1="${r1(seg[0])}" y1="${r1(seg[1])}" x2="${r1(seg[2])}" y2="${r1(seg[3])}"/>`);
    // The same wavefront continues in shallow water, from the point where it meets the boundary.
    const yB = (c - d1[0] * B) / d1[1];
    const c2 = d2[0] * B + d2[1] * yB;
    const seg2 = clip(d2[0], d2[1], c2, B, 400, 20, 180);
    if (seg2) parts.push(`<line class="arrow" style="stroke-width:2.5" x1="${r1(seg2[0])}" y1="${r1(seg2[1])}" x2="${r1(seg2[2])}" y2="${r1(seg2[3])}"/>`);
  }
  return svg('0 0 420 226', 'Water waves go from deep water into shallow water. They slow down, the wavelength gets shorter and they change direction', `
    <rect x="${B}" y="20" width="190" height="160" style="fill:#4a90d9;opacity:0.12"/>
    ${parts.join('')}
    <line class="ink" style="stroke-width:2" x1="${B}" y1="16" x2="${B}" y2="184"/>
    <text class="txt" x="115" y="200" text-anchor="middle" style="font-weight:700">deep water</text>
    <text class="txt" x="115" y="218" text-anchor="middle">faster</text>
    <text class="txt" x="305" y="200" text-anchor="middle" style="font-weight:700">shallow water</text>
    <text class="txt" x="305" y="218" text-anchor="middle">slower, shorter wavelength</text>
  `);
}

// Arc of radius r centred on (cx, cy), from angle -a to +a (radians, 0 = to the right).
function arc(cx: number, cy: number, r: number, a: number, cls = 'arrow2'): string {
  const x1 = cx + r * Math.cos(-a);
  const y1 = cy + r * Math.sin(-a);
  const x2 = cx + r * Math.cos(a);
  const y2 = cy + r * Math.sin(a);
  return `<path class="${cls}" style="stroke-width:2.5" fill="none" d="M${r1(x1)},${r1(y1)} A${r},${r} 0 0 1 ${r1(x2)},${r1(y2)}"/>`;
}

// Diffraction through a narrow gap and through a wide gap.
export function diffractionGapSvg(): string {
  const panel = (ox: number, gap: number, title: string, sub: string) => {
    const bx = ox + 80;
    const parts: string[] = [];
    for (const x of [ox + 20, ox + 45, ox + 70]) parts.push(`<line class="arrow" style="stroke-width:2.5" x1="${x}" y1="30" x2="${x}" y2="170"/>`);
    parts.push(`<rect class="stone" x="${bx}" y="24" width="7" height="${100 - gap / 2 - 24}"/>`);
    parts.push(`<rect class="stone" x="${bx}" y="${100 + gap / 2}" width="7" height="${176 - 100 - gap / 2}"/>`);
    for (const r of [22, 47, 72, 97, 122]) {
      if (gap < 40) {
        const a = Math.min((80 * Math.PI) / 180, Math.asin(Math.min(1, 72 / r)));
        parts.push(arc(bx + 7, 100, r, a));
      } else {
        // Straight in the middle, curved only at the ends.
        const half = gap / 2;
        const x = bx + 7 + r;
        const bend = Math.min((40 * Math.PI) / 180, Math.asin(Math.min(1, (72 - half) / r)));
        parts.push(`<line class="arrow2" style="stroke-width:2.5" x1="${x}" y1="${100 - half}" x2="${x}" y2="${100 + half}"/>`);
        const ex = bx + 7;
        parts.push(`<path class="arrow2" style="stroke-width:2.5" fill="none" d="M${x},${100 - half} A${r},${r} 0 0 0 ${r1(ex + r * Math.cos(bend))},${r1(100 - half - r * Math.sin(bend))}"/>`);
        parts.push(`<path class="arrow2" style="stroke-width:2.5" fill="none" d="M${x},${100 + half} A${r},${r} 0 0 1 ${r1(ex + r * Math.cos(bend))},${r1(100 + half + r * Math.sin(bend))}"/>`);
      }
    }
    parts.push(`<text class="txt" x="${ox + 105}" y="195" text-anchor="middle" style="font-weight:700">${title}</text>`);
    parts.push(`<text class="txt" x="${ox + 105}" y="215" text-anchor="middle">${sub}</text>`);
    return parts.join('');
  };
  return svg('0 0 470 224', 'Waves pass through a narrow gap and spread out a lot. Waves pass through a wide gap and spread out only a little', `
    ${panel(0, 22, 'narrow gap', 'the waves spread out a lot')}
    ${panel(240, 90, 'wide gap', 'the waves spread out a little')}
  `);
}

// Diffraction at an edge.
export function diffractionEdgeSvg(): string {
  const parts: string[] = [];
  for (const x of [40, 70, 100, 130]) parts.push(`<line class="arrow" style="stroke-width:2.5" x1="${x}" y1="24" x2="${x}" y2="176"/>`);
  for (const r of [20, 50, 80, 110, 140]) {
    const x = 167 + r;
    const a = Math.min((70 * Math.PI) / 180, Math.asin(Math.min(1, 76 / r)));
    parts.push(`<line class="arrow2" style="stroke-width:2.5" x1="${x}" y1="24" x2="${x}" y2="100"/>`);
    parts.push(`<path class="arrow2" style="stroke-width:2.5" fill="none" d="M${x},100 A${r},${r} 0 0 1 ${r1(167 + r * Math.cos(a))},${r1(100 + r * Math.sin(a))}"/>`);
  }
  return svg('0 0 340 222', 'Waves pass the edge of a barrier and bend around it', `
    ${parts.join('')}
    <rect class="stone" x="160" y="100" width="7" height="80"/>
    <text class="txt" x="160" y="198" text-anchor="middle">barrier</text>
    <text class="txt" x="270" y="198" text-anchor="middle">the waves bend</text>
    <text class="txt" x="270" y="216" text-anchor="middle">around the edge</text>
  `);
}
