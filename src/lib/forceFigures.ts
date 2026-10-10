// SVG figures for Unit 3 (forces). Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

function head(x: number, y: number, angle: number, cls: string, size = 10): string {
  const a1 = angle - 0.45;
  const a2 = angle + 0.45;
  return `<polygon class="${cls}" points="${x},${y} ${(x - size * Math.cos(a1)).toFixed(1)},${(y - size * Math.sin(a1)).toFixed(1)} ${(x - size * Math.cos(a2)).toFixed(1)},${(y - size * Math.sin(a2)).toFixed(1)}"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, cls = 'arrow'): string {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const lx = x2 - 8 * Math.cos(ang);
  const ly = y2 - 8 * Math.sin(ang);
  return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}"/>${head(x2, y2, ang, `${cls}-head`)}`;
}

export interface ForceArrow {
  // 'pushRight': an arrow on the left side that points into the box (a push to the right)
  dir: 'left' | 'right' | 'up' | 'down' | 'pushRight';
  size: number; // in N, sets the length of the arrow
  label: string;
}

// A box with force arrows. The length of each arrow shows the size of the force.
export function forceDiagramSvg(forces: ForceArrow[], scale = 1.4): string {
  const cx = 210;
  const cy = 120;
  const hw = 45;
  const hh = 32;
  const parts: string[] = [`<rect class="box" x="${cx - hw}" y="${cy - hh}" width="${2 * hw}" height="${2 * hh}" rx="4"/>`];
  for (const f of forces) {
    const L = Math.max(25, f.size * scale);
    if (f.dir === 'right') {
      parts.push(arrow(cx + hw, cy, cx + hw + L, cy));
      parts.push(`<text class="txt" x="${cx + hw + L + 6}" y="${cy + 4}">${f.label}</text>`);
    } else if (f.dir === 'pushRight') {
      parts.push(arrow(cx - hw - L, cy, cx - hw, cy));
      parts.push(`<text class="txt" x="${cx - hw - L - 6}" y="${cy + 4}" text-anchor="end">${f.label}</text>`);
    } else if (f.dir === 'left') {
      parts.push(arrow(cx - hw, cy, cx - hw - L, cy));
      parts.push(`<text class="txt" x="${cx - hw - L - 6}" y="${cy + 4}" text-anchor="end">${f.label}</text>`);
    } else if (f.dir === 'up') {
      parts.push(arrow(cx, cy - hh, cx, cy - hh - L * 0.6));
      parts.push(`<text class="txt" x="${cx + 8}" y="${cy - hh - L * 0.6 + 10}">${f.label}</text>`);
    } else {
      parts.push(arrow(cx, cy + hh, cx, cy + hh + L * 0.6));
      parts.push(`<text class="txt" x="${cx + 8}" y="${cy + hh + L * 0.6}">${f.label}</text>`);
    }
  }
  return svg('0 0 420 240', 'A box with force arrows', parts.join(''));
}

// A spring hanging from a clamp, with masses on a hanger, next to a metre rule.
export function springSvg(): string {
  const coil = (x: number, y0: number, y1: number, n: number) => {
    const step = (y1 - y0) / n;
    let d = `M${x},${y0}`;
    for (let i = 0; i < n; i++) d += ` L${i % 2 ? x - 12 : x + 12},${y0 + step * (i + 0.5)}`;
    return `${d} L${x},${y1}`;
  };
  const ruler = [...Array(11).keys()]
    .map((i) => `<line class="soft" x1="232" y1="${40 + i * 20}" x2="${i % 5 === 0 ? 246 : 240}" y2="${40 + i * 20}"/>`)
    .join('');
  return svg('0 0 420 290', 'A spring stretched by a load, with a ruler to measure its length', `
    <rect class="ink" x="40" y="20" width="200" height="12"/>
    <line class="ink" x1="70" y1="32" x2="70" y2="40"/>
    <path class="ink" d="${coil(70, 40, 150, 12)}"/>
    <line class="ink" x1="70" y1="150" x2="70" y2="168"/>
    <rect class="stone" x="50" y="168" width="40" height="16" rx="2"/>
    <rect class="stone" x="50" y="186" width="40" height="16" rx="2"/>
    <rect class="stone" x="50" y="204" width="40" height="16" rx="2"/>
    <text class="txt" x="100" y="200">masses (the load)</text>
    <rect class="ink" x="230" y="36" width="22" height="210"/>
    ${ruler}
    <text class="txt" x="262" y="44">metre rule</text>
    <line class="dash" x1="70" y1="150" x2="230" y2="150"/>
    <text class="txt" x="262" y="154">read the bottom of the spring</text>
  `);
}

export interface BeamLoad {
  d: number; // distance from the pivot in m (negative = left)
  label: string;
}

// A beam on a pivot, with downward forces at given distances.
export function beamSvg(loads: BeamLoad[], halfLength = 1, distLabels = true): string {
  const cx = 230;
  const y = 110;
  const px = 180 / halfLength; // pixels per metre
  const parts: string[] = [
    `<rect class="box" x="${cx - 190}" y="${y - 6}" width="380" height="12" rx="3"/>`,
    `<polygon class="ink-head" points="${cx},${y + 6} ${cx - 16},${y + 34} ${cx + 16},${y + 34}"/>`,
    `<text class="txt" x="${cx}" y="${y + 52}" text-anchor="middle">pivot</text>`,
  ];
  for (const l of loads) {
    const x = cx + l.d * px;
    parts.push(arrow(x, y - 70, x, y - 8, 'arrow2'));
    parts.push(`<text class="txt" x="${x}" y="${y - 78}" text-anchor="middle" style="font-weight:700">${l.label}</text>`);
    if (distLabels) {
      const ly = y + 22 + (l.d < 0 ? 0 : 0);
      parts.push(`<line class="dash" x1="${cx}" y1="${ly + 48}" x2="${x}" y2="${ly + 48}"/>`);
      parts.push(`<line class="soft" x1="${x}" y1="${ly + 42}" x2="${x}" y2="${ly + 54}"/>`);
      parts.push(`<text class="txt" x="${(cx + x) / 2}" y="${ly + 64}" text-anchor="middle">${Math.abs(l.d)} m</text>`);
    }
  }
  return svg('0 0 460 210', 'A beam balanced on a pivot, with forces at different distances', parts.join(''));
}

// An object moving in a circle: velocity along the circle, force towards the centre.
export function circleMotionSvg(): string {
  const cx = 200;
  const cy = 140;
  const r = 100;
  return svg('0 0 420 270', 'An object moving in a circle. The force points to the centre, the velocity along the circle', `
    <circle class="orbit" cx="${cx}" cy="${cy}" r="${r}"/>
    <circle class="soft-fill" cx="${cx}" cy="${cy}" r="3"/>
    <text class="txt" x="${cx + 8}" y="${cy + 16}">centre</text>
    <circle class="earth" cx="${cx}" cy="${cy - r}" r="11"/>
    ${arrow(cx, cy - r, cx + 110, cy - r)}
    <text class="txt" x="${cx + 116}" y="${cy - r + 4}">velocity</text>
    ${arrow(cx, cy - r + 12, cx, cy - 25, 'arrow2')}
    <text class="txt" x="${cx + 8}" y="${cy - 48}">force (towards the centre)</text>
  `);
}

// Finding the centre of gravity of a flat shape with a plumb line.
export function plumbLineSvg(): string {
  // The card hangs from pin 1. The plumb line is vertical, so G is somewhere on it.
  // The dashed line was drawn earlier, when the card hung from pin 2. G is where the lines cross.
  const shape = 'M150,40 L230,48 L300,120 L260,230 L110,240 L70,150 Z';
  return svg('0 0 420 285', 'An irregular card hanging from a pin, with a plumb line. Two lines drawn from two holes cross at the centre of gravity', `
    <path class="box" d="${shape}"/>
    <circle class="ink-head" cx="180" cy="52" r="4"/>
    <text class="txt" x="190" y="30">pin 1 (the card hangs from here)</text>
    <line class="ink" x1="180" y1="52" x2="180" y2="262"/>
    <circle class="ink-head" cx="180" cy="266" r="6"/>
    <text class="txt" x="194" y="270">plumb line (string + weight)</text>
    <circle class="ink-head" cx="290" cy="130" r="4"/>
    <text class="txt" x="306" y="134">pin 2</text>
    <line class="dash" x1="290" y1="130" x2="80" y2="168"/>
    <circle class="arrow2-head" cx="180" cy="150" r="6"/>
    <text class="txt" x="166" y="140" text-anchor="end" style="font-weight:700">G</text>
  `);
}

// Two objects tipped a little: one returns, one falls over.
export function stabilitySvg(): string {
  const tilt = (x: number, y: number, w: number, h: number, deg: number, gx: number, gy: number, label: string, ok: boolean) => {
    const rad = (deg * Math.PI) / 180;
    // Rotate clockwise around the bottom-right corner (x + w, y + h): the left side lifts up.
    // The object falls over if its centre of gravity moves to the right of this corner.
    const ox = x + w;
    const oy = y + h;
    const rot = (px: number, py: number) => {
      const dx = px - ox;
      const dy = py - oy;
      return [ox + dx * Math.cos(rad) - dy * Math.sin(rad), oy + dx * Math.sin(rad) + dy * Math.cos(rad)];
    };
    const corners = [rot(x, y), rot(x + w, y), rot(x + w, y + h), rot(x, y + h)];
    const [gX, gY] = rot(gx, gy);
    return `<polygon class="box" points="${corners.map((c) => c.map((v) => v.toFixed(1)).join(',')).join(' ')}"/>
      <circle class="arrow2-head" cx="${gX.toFixed(1)}" cy="${gY.toFixed(1)}" r="5"/>
      ${arrow(gX, gY, gX, gY + 45, 'arrow2')}
      <line class="dash" x1="${gX.toFixed(1)}" y1="${gY + 45}" x2="${gX.toFixed(1)}" y2="${oy}"/>
      <line class="ink" x1="${x - 30}" y1="${oy}" x2="${x + w + 40}" y2="${oy}"/>
      <text class="txt" x="${x + w / 2}" y="${oy + 55}" text-anchor="middle" style="font-weight:700">${label}</text>
      <text class="txt" x="${x + w / 2}" y="${oy + 71}" text-anchor="middle">${ok ? 'weight acts inside the base' : 'weight acts outside the base'}</text>`;
  };
  return svg('0 0 520 290', 'A wide low object tipped a little falls back. A tall narrow object tipped the same amount falls over', `
    ${tilt(50, 130, 150, 70, 25, 125, 165, 'wide and low: stable', true)}
    ${tilt(340, 30, 50, 170, 25, 365, 115, 'tall and narrow: falls over', false)}
  `);
}
