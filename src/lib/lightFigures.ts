// SVG figures for Unit 10 (light): reflection, refraction, lenses, dispersion. Simple diagrams, not to scale.

function svg(viewBox: string, label: string, body: string): string {
  return `<svg class="fig" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;

function head(x2: number, y2: number, a: number, cls: string, size: number): string {
  const p = (ang: number) => `${r1(x2 - size * Math.cos(a + ang))},${r1(y2 - size * Math.sin(a + ang))}`;
  return `<polygon class="${cls}-head" points="${r1(x2)},${r1(y2)} ${p(0.45)} ${p(-0.45)}"/>`;
}

// A light ray from (x1, y1) to (x2, y2), with an arrow head in the middle (the usual way to draw rays).
export function ray(x1: number, y1: number, x2: number, y2: number, cls = 'ray', width = 2.2, dashed = false): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const mx = (x1 + x2) / 2 + 4 * Math.cos(a);
  const my = (y1 + y2) / 2 + 4 * Math.sin(a);
  return (
    `<line class="${cls}" style="stroke-width:${width}${dashed ? ';stroke-dasharray:5 4' : ''}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}"/>` +
    (dashed ? '' : head(mx, my, a, cls, 8))
  );
}

// An angle arc at (cx, cy) between two directions (angles in degrees, SVG convention: 0 = right, 90 = down).
function angleArc(cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string {
  const x1 = cx + r * Math.cos(rad(fromDeg));
  const y1 = cy + r * Math.sin(rad(fromDeg));
  const x2 = cx + r * Math.cos(rad(toDeg));
  const y2 = cy + r * Math.sin(rad(toDeg));
  const sweep = toDeg > fromDeg ? 1 : 0;
  return `<path class="ink" style="stroke-width:1.2" fill="none" d="M${r1(x1)},${r1(y1)} A${r},${r} 0 0 ${sweep} ${r1(x2)},${r1(y2)}"/>`;
}

// Reflection at a plane mirror: normal, angle of incidence, angle of reflection.
export function reflectionSvg(): string {
  const P = [230, 180];
  const i = 40;
  const L = 160;
  const sx = P[0] - L * Math.sin(rad(i));
  const sy = P[1] - L * Math.cos(rad(i));
  const ex = P[0] + L * Math.sin(rad(i));
  const ey = P[1] - L * Math.cos(rad(i));
  return svg('0 0 460 222', 'A ray of light reflects from a plane mirror. The angle of incidence equals the angle of reflection', `
    <line class="ink" style="stroke-width:3" x1="60" y1="180" x2="400" y2="180"/>
    ${[70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390].map((x) => `<line class="soft" x1="${x}" y1="181" x2="${x - 8}" y2="190"/>`).join('')}
    <line class="dash" x1="230" y1="30" x2="230" y2="180"/>
    ${ray(sx, sy, P[0], P[1])}
    ${ray(P[0], P[1], ex, ey)}
    ${angleArc(230, 180, 44, -90 - i, -90)}
    ${angleArc(230, 180, 50, -90, -90 + i)}
    <text class="txt" x="212" y="122" text-anchor="middle" style="font-weight:700">i</text>
    <text class="txt" x="250" y="118" text-anchor="middle" style="font-weight:700">r</text>
    <text class="txt" x="236" y="26">normal</text>
    <text class="txt" x="${r1(sx)}" y="${r1(sy) - 8}" text-anchor="middle">incident ray</text>
    <text class="txt" x="${r1(ex)}" y="${r1(ey) - 8}" text-anchor="middle">reflected ray</text>
    <text class="txt" x="230" y="212" text-anchor="middle">plane mirror</text>
  `);
}

// The image in a plane mirror: same size, same distance behind the mirror, virtual.
export function planeMirrorSvg(): string {
  const M = 230; // mirror x
  const ox = 130; // object x
  const ix = 2 * M - ox; // image x
  const base = 170;
  const top = 100;
  const eye = [70, 60];
  // A ray from the top of the object, reflected to the eye; it seems to come from the top of the image.
  const t = (M - ix) / (eye[0] - ix);
  const hitY = top + t * (eye[1] - top);
  return svg('0 0 460 222', 'An object in front of a plane mirror and its image behind the mirror, at the same distance', `
    <line class="ink" style="stroke-width:3" x1="${M}" y1="40" x2="${M}" y2="190"/>
    ${[50, 70, 90, 110, 130, 150, 170, 190].map((y) => `<line class="soft" x1="${M + 1}" y1="${y}" x2="${M + 9}" y2="${y - 8}"/>`).join('')}
    <line class="arrow" style="stroke-width:4" x1="${ox}" y1="${base}" x2="${ox}" y2="${top + 8}"/>
    ${head(ox, top, -Math.PI / 2, 'arrow', 12)}
    <line class="arrow" style="stroke-width:4;opacity:0.45;stroke-dasharray:6 4" x1="${ix}" y1="${base}" x2="${ix}" y2="${top + 8}"/>
    ${head(ix, top, -Math.PI / 2, 'arrow', 12)}
    ${ray(ox, top, M, hitY)}
    ${ray(M, hitY, eye[0], eye[1])}
    <line class="dash" x1="${M}" y1="${r1(hitY)}" x2="${ix}" y2="${top}"/>
    <circle cx="${eye[0] - 6}" cy="${eye[1] - 3}" r="7" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.5"/>
    <text class="txt" x="${eye[0] - 6}" y="${eye[1] - 16}" text-anchor="middle">eye</text>
    <text class="txt" x="${ox}" y="${base + 18}" text-anchor="middle">object</text>
    <text class="txt" x="${ix}" y="${base + 18}" text-anchor="middle">image (virtual)</text>
    ${`<line class="soft" x1="${ox}" y1="200" x2="${M}" y2="200"/><line class="soft" x1="${M}" y1="200" x2="${ix}" y2="200"/>`}
    <text class="txt" x="${(ox + M) / 2}" y="214" text-anchor="middle">d</text>
    <text class="txt" x="${(M + ix) / 2}" y="214" text-anchor="middle">d</text>
    <text class="txt" x="${M}" y="30" text-anchor="middle">mirror</text>
  `);
}

// Refraction through a rectangular glass block.
export function glassBlockSvg(): string {
  const n = 1.5;
  const i = 45;
  const r = (Math.asin(Math.sin(rad(i)) / n) * 180) / Math.PI;
  const top = 86;
  const bottom = 176;
  const P = [180, top];
  const Q = [P[0] + (bottom - top) * Math.tan(rad(r)), bottom];
  const L = 75;
  const s = [P[0] - L * Math.sin(rad(i)), top - L * Math.cos(rad(i))];
  const e = [Q[0] + L * Math.sin(rad(i)), bottom + L * Math.cos(rad(i))];
  return svg('0 0 420 262', 'A ray enters a glass block and bends towards the normal, then leaves the block and bends away from the normal', `
    <rect x="80" y="${top}" width="260" height="${bottom - top}" style="fill:#4a90d9;opacity:0.18;stroke:var(--ink);stroke-width:1.5"/>
    <line class="dash" x1="${P[0]}" y1="${top - 60}" x2="${P[0]}" y2="${top + 50}"/>
    <line class="dash" x1="${r1(Q[0])}" y1="${bottom - 50}" x2="${r1(Q[0])}" y2="${bottom + 60}"/>
    ${ray(s[0], s[1], P[0], P[1])}
    ${ray(P[0], P[1], Q[0], Q[1])}
    ${ray(Q[0], Q[1], e[0], e[1])}
    ${angleArc(P[0], P[1], 32, -90 - i, -90)}
    ${angleArc(P[0], P[1], 38, 90 - r, 90)}
    <text class="txt" x="${P[0] - 14}" y="${top - 38}" text-anchor="middle" style="font-weight:700">i</text>
    <text class="txt" x="${P[0] + 9}" y="${top + 52}" text-anchor="middle" style="font-weight:700">r</text>
    <text class="txt" x="360" y="${top - 8}" text-anchor="end">air</text>
    <text class="txt" x="330" y="${top + 50}" text-anchor="end" style="font-weight:700">glass</text>
    <text class="txt" x="360" y="${bottom + 20}" text-anchor="end">air</text>
    <text class="txt" x="${P[0] + 6}" y="${top - 64}">normal</text>
  `);
}

// Total internal reflection in a semicircular glass block: i < c, i = c, i > c.
export function tirSvg(): string {
  const n = 1.5;
  const c = (Math.asin(1 / n) * 180) / Math.PI;
  const panel = (ox: number, i: number, title: string) => {
    const C = [ox + 75, 70];
    const R = 62;
    const s = [C[0] - R * Math.sin(rad(i)), C[1] + R * Math.cos(rad(i))];
    const parts = [
      `<path d="M${ox + 13},70 A${R},${R} 0 0 0 ${ox + 137},70 Z" style="fill:#4a90d9;opacity:0.18;stroke:var(--ink);stroke-width:1.5"/>`,
      `<line class="dash" x1="${C[0]}" y1="18" x2="${C[0]}" y2="132"/>`,
      ray(s[0], s[1], C[0], C[1]),
    ];
    const sinR = n * Math.sin(rad(i));
    const refl = [C[0] + R * Math.sin(rad(i)), C[1] + R * Math.cos(rad(i))];
    if (sinR < 0.999) {
      const r = Math.asin(sinR);
      parts.push(ray(C[0], C[1], C[0] + 58 * Math.sin(r), C[1] - 58 * Math.cos(r)));
      parts.push(`<line class="ray" style="stroke-width:1.2;opacity:0.5" x1="${C[0]}" y1="${C[1]}" x2="${r1(refl[0])}" y2="${r1(refl[1])}"/>`);
    } else if (sinR < 1.001) {
      parts.push(ray(C[0], C[1], C[0] + 62, C[1] - 0.5));
      parts.push(`<line class="ray" style="stroke-width:1.2;opacity:0.5" x1="${C[0]}" y1="${C[1]}" x2="${r1(refl[0])}" y2="${r1(refl[1])}"/>`);
    } else {
      parts.push(ray(C[0], C[1], refl[0], refl[1]));
    }
    parts.push(`<text class="txt" x="${ox + 75}" y="160" text-anchor="middle" style="font-weight:700">${title}</text>`);
    return parts.join('');
  };
  return svg('0 0 470 196', 'A ray inside a semicircular glass block hits the flat side. Below the critical angle it refracts out. At the critical angle it goes along the surface. Above it, it is totally internally reflected', `
    ${panel(0, 25, 'i smaller than c')}
    ${panel(160, c, 'i = c (critical angle)')}
    ${panel(320, 60, 'i bigger than c')}
    <text class="txt" x="75" y="180" text-anchor="middle">refraction</text>
    <text class="txt" x="235" y="180" text-anchor="middle">ray along the surface</text>
    <text class="txt" x="395" y="180" text-anchor="middle">total internal reflection</text>
  `);
}

// An optical fibre: light is totally internally reflected again and again.
export function opticalFibreSvg(): string {
  const pts: [number, number][] = [[30, 100]];
  let x = 30;
  let y = 100;
  let down = false;
  while (x < 400) {
    const ny = down ? 122 : 58;
    x += 50;
    y = ny;
    pts.push([Math.min(x, 420), y]);
    down = !down;
  }
  const segs = pts.slice(1).map((p, k) => ray(pts[k][0], pts[k][1], p[0], p[1], 'ray', 2));
  return svg('0 0 440 170', 'An optical fibre. Light reflects again and again from the inside surface by total internal reflection', `
    <rect x="20" y="52" width="410" height="76" rx="38" style="fill:#4a90d9;opacity:0.15;stroke:var(--ink);stroke-width:1.5"/>
    ${segs.join('')}
    <text class="txt" x="225" y="152" text-anchor="middle">glass fibre: the light stays inside by total internal reflection</text>
  `);
}

// Converging and diverging lenses with a parallel beam of light.
export function lensesSvg(): string {
  const f = 70;
  const conv = () => {
    const parts: string[] = [];
    const Lx = 120;
    const F = Lx + f;
    for (const h of [-36, -18, 0, 18, 36]) {
      parts.push(`<line class="ray" style="stroke-width:1.8" x1="20" y1="${100 + h}" x2="${Lx}" y2="${100 + h}"/>`);
      const dx = 200 - Lx;
      parts.push(ray(Lx, 100 + h, Lx + dx, 100 + h - (h * dx) / f, 'ray', 1.8));
    }
    parts.push(`<path d="M${Lx},56 Q${Lx + 14},100 ${Lx},144 Q${Lx - 14},100 ${Lx},56 Z" style="fill:#4a90d9;opacity:0.3;stroke:var(--ink)"/>`);
    parts.push(`<circle cx="${F}" cy="100" r="3.5" class="ink-head"/><text class="txt halo" x="${F}" y="${100 + 20}" text-anchor="middle" style="font-weight:700">F</text>`);
    parts.push(`<line class="soft" x1="${Lx}" y1="160" x2="${F}" y2="160"/><text class="txt" x="${(Lx + F) / 2}" y="174" text-anchor="middle">focal length f</text>`);
    parts.push(`<text class="txt" x="110" y="24" text-anchor="middle" style="font-weight:700">converging lens</text>`);
    return parts.join('');
  };
  const div = () => {
    const parts: string[] = [];
    const Lx = 340;
    const F = Lx - f;
    for (const h of [-36, -18, 0, 18, 36]) {
      parts.push(`<line class="ray" style="stroke-width:1.8" x1="250" y1="${100 + h}" x2="${Lx}" y2="${100 + h}"/>`);
      const dx = 95;
      parts.push(ray(Lx, 100 + h, Lx + dx, 100 + h + (h * dx) / f, 'ray', 1.8));
      if (h !== 0) parts.push(`<line class="dash" x1="${F}" y1="100" x2="${Lx}" y2="${100 + h}"/>`);
    }
    parts.push(`<path d="M${Lx - 9},56 L${Lx + 9},56 Q${Lx + 2},100 ${Lx + 9},144 L${Lx - 9},144 Q${Lx - 2},100 ${Lx - 9},56 Z" style="fill:#4a90d9;opacity:0.3;stroke:var(--ink)"/>`);
    parts.push(`<circle cx="${F}" cy="100" r="3.5" class="ink-head"/><text class="txt halo" x="${F}" y="${100 + 20}" text-anchor="middle" style="font-weight:700">F</text>`);
    parts.push(`<text class="txt" x="340" y="24" text-anchor="middle" style="font-weight:700">diverging lens</text>`);
    return parts.join('');
  };
  return svg('0 0 450 196', 'A converging lens brings parallel rays together at the principal focus F. A diverging lens spreads them out, as if they come from F', `
    <line class="soft" x1="10" y1="100" x2="210" y2="100"/>
    <line class="soft" x1="240" y1="100" x2="440" y2="100"/>
    ${conv()}${div()}
    <text class="txt" x="12" y="94">principal axis</text>
  `);
}

// ---------- Ray diagram for a converging lens (used by figures and by LensSim) ----------

export interface LensResult {
  svg: string;
  v: number; // image distance in units of f (negative: virtual image, on the same side as the object)
  m: number; // magnification (negative: inverted)
}

// u: object distance in units of f (u > 0). The object is an arrow of height 1 (in units of 40 px).
export function lensDiagram(u: number, opts: { width?: number; f?: number; label?: boolean } = {}): LensResult {
  const W = opts.width ?? 640;
  const H = 260;
  const f = opts.f ?? 70;
  const Lx = W / 2;
  const Ay = 140;
  const h = 46;
  const ox = Lx - u * f;
  const v = Math.abs(u - 1) < 1e-6 ? Infinity : u / (u - 1); // in units of f
  const m = -v / u;
  const parts: string[] = [];
  const clipLine = (x1: number, y1: number, x2: number, y2: number, cls: string, dashed = false) => {
    // Extend the line from (x1, y1) through (x2, y2) to the edge of the drawing.
    const dx = x2 - x1;
    const dy = y2 - y1;
    const tx = dx > 0 ? (W - x1) / dx : dx < 0 ? -x1 / dx : Infinity;
    const ty = dy > 0 ? (H - y1) / dy : dy < 0 ? -y1 / dy : Infinity;
    const t = Math.max(1, Math.min(tx, ty, 50));
    const ex = x1 + dx * t;
    const ey = y1 + dy * t;
    return ray(x1, y1, ex, ey, cls, 1.8, dashed);
  };

  // Axis, lens, focal points.
  parts.push(`<line class="soft" x1="0" y1="${Ay}" x2="${W}" y2="${Ay}"/>`);
  parts.push(`<path d="M${Lx},40 Q${Lx + 16},${Ay} ${Lx},${H - 20} Q${Lx - 16},${Ay} ${Lx},40 Z" style="fill:#4a90d9;opacity:0.25;stroke:var(--ink)"/>`);
  const labels: string[] = [];
  for (const [x, t] of [[Lx - f, 'F'], [Lx + f, 'F'], [Lx - 2 * f, '2F'], [Lx + 2 * f, '2F']] as [number, string][]) {
    if (x > 0 && x < W) {
      parts.push(`<circle cx="${x}" cy="${Ay}" r="3" class="ink-head"/>`);
      labels.push(`<text class="txt halo" x="${x}" y="${Ay + 18}" text-anchor="middle">${t}</text>`);
    }
  }

  // Object.
  const topY = Ay - h;
  parts.push(`<line class="arrow" style="stroke-width:4" x1="${r1(ox)}" y1="${Ay}" x2="${r1(ox)}" y2="${topY + 10}"/>` + head(ox, topY, -Math.PI / 2, 'arrow', 12));

  // Ray 1: parallel to the axis, then through the principal focus on the other side.
  parts.push(ray(ox, topY, Lx, topY, 'ray', 1.8));
  parts.push(clipLine(Lx, topY, Lx + f, Ay, 'ray'));
  // Ray 2: through the centre of the lens, straight on.
  parts.push(clipLine(ox, topY, Lx, Ay, 'ray'));
  // Ray 3: through the principal focus on the object side, then parallel.
  if (u > 1.05) {
    const y3 = topY + ((Ay - topY) * (Lx - ox)) / (Lx - f - ox);
    if (Math.abs(y3 - Ay) < 110) {
      parts.push(ray(ox, topY, Lx, y3, 'ray', 1.8));
      parts.push(ray(Lx, y3, W, y3, 'ray', 1.8));
    }
  }

  // Image.
  if (Number.isFinite(v)) {
    const ix = Lx + v * f;
    const iy = Ay - m * h; // m < 0: below the axis (inverted)
    const visible = ix > 4 && ix < W - 4 && iy > 4 && iy < H - 4;
    if (v < 0) {
      // Virtual image: draw the backward extensions of the rays as dashed lines.
      parts.push(`<line class="ray" style="stroke-width:1.4;stroke-dasharray:5 4" x1="${Lx}" y1="${topY}" x2="${r1(ix)}" y2="${r1(iy)}"/>`);
      parts.push(`<line class="ray" style="stroke-width:1.4;stroke-dasharray:5 4" x1="${Lx}" y1="${Ay}" x2="${r1(ix)}" y2="${r1(iy)}"/>`);
    }
    if (visible) {
      const dash = v < 0 ? ';stroke-dasharray:6 4;opacity:0.6' : '';
      const dir = iy < Ay ? -Math.PI / 2 : Math.PI / 2;
      parts.push(`<line class="arrow2" style="stroke-width:4${dash}" x1="${r1(ix)}" y1="${Ay}" x2="${r1(ix)}" y2="${r1(iy - 10 * Math.sign(iy - Ay))}"/>` + head(ix, iy, dir, 'arrow2', 12));
      if (opts.label !== false) labels.push(`<text class="txt halo" x="${r1(ix)}" y="${r1(iy < Ay ? iy - 8 : iy + 18)}" text-anchor="middle" style="font-weight:700">image</text>`);
    }
  }
  if (opts.label !== false) labels.push(`<text class="txt halo" x="${r1(ox)}" y="${topY - 8}" text-anchor="middle" style="font-weight:700">object</text>`);

  return {
    svg: `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ray diagram for a converging lens" style="overflow:hidden">${parts.join('')}${labels.join('')}</svg>`,
    v,
    m,
  };
}

export function lensRealImageSvg(): string {
  return lensDiagram(2.6).svg;
}

export function lensVirtualImageSvg(): string {
  return lensDiagram(0.6).svg;
}

// Dispersion of white light by a glass prism.
export function prismSvg(): string {
  const colours = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#3949ab', '#8e24aa'];
  const names = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const exit = [232, 120];
  const fan = colours.map((c, k) => {
    const y = 72 + k * 18;
    return `<line style="stroke:${c};stroke-width:3" x1="${exit[0]}" y1="${exit[1] + k * 1.5}" x2="380" y2="${y}"/>` +
      `<text class="txt" x="388" y="${y + 4}">${names[k]}</text>`;
  });
  return svg('0 0 450 220', 'White light enters a glass prism and splits into the seven colours of the spectrum', `
    <polygon points="170,40 240,170 100,170" style="fill:#4a90d9;opacity:0.2;stroke:var(--ink);stroke-width:1.5"/>
    ${ray(20, 130, 138, 108, 'ink', 3)}
    <line style="stroke:#9aa0a6;stroke-width:3" x1="138" y1="108" x2="${exit[0]}" y2="${exit[1]}"/>
    ${fan.join('')}
    <text class="txt" x="20" y="154">white light</text>
    <text class="txt" x="170" y="192" text-anchor="middle">glass prism</text>
    <text class="txt" x="380" y="212" text-anchor="middle">spectrum</text>
  `);
}

// Short sight and long sight, and the lens that corrects each one.
export function eyeSightSvg(): string {
  const eye = (ox: number, oy: number, focusDx: number, rays: 'parallel' | 'near', corr: 'none' | 'diverging' | 'converging') => {
    // Eye: circle of radius 34; lens at the front (left); retina at the back (right).
    const cx = ox + 120;
    const R = 34;
    const lensX = cx - R + 6;
    const retina = cx + R;
    const fx = retina + focusDx;
    const parts: string[] = [
      `<circle cx="${cx}" cy="${oy}" r="${R}" style="fill:var(--surface-2);stroke:var(--ink);stroke-width:1.5"/>`,
      `<path d="M${cx + R - 6},${oy - 24} A${R},${R} 0 0 1 ${cx + R - 6},${oy + 24}" style="fill:none;stroke:var(--exit);stroke-width:3"/>`,
      `<ellipse cx="${lensX}" cy="${oy}" rx="5" ry="16" style="fill:#4a90d9;opacity:0.5;stroke:var(--ink)"/>`,
    ];
    const hs = [-12, 12];
    const startX = ox + 10;
    const corrX = ox + 50;
    for (const hh of hs) {
      const y0 = rays === 'parallel' ? oy + hh : oy;
      const atCorr = rays === 'parallel' ? oy + hh : oy + hh * 0.55;
      parts.push(`<line class="ray" style="stroke-width:1.6" x1="${startX}" y1="${y0}" x2="${corrX}" y2="${r1(atCorr)}"/>`);
      // After the correcting lens (if any), the rays reach the eye lens.
      const atEye = corr === 'none' ? (rays === 'parallel' ? atCorr : oy + hh) : corr === 'diverging' ? oy + hh * 1.4 : oy + hh * 0.8;
      parts.push(`<line class="ray" style="stroke-width:1.6" x1="${corrX}" y1="${r1(atCorr)}" x2="${lensX}" y2="${r1(atEye)}"/>`);
      parts.push(`<line class="ray" style="stroke-width:1.6" x1="${lensX}" y1="${r1(atEye)}" x2="${r1(fx)}" y2="${oy}"/>`);
    }
    parts.push(`<circle cx="${r1(fx)}" cy="${oy}" r="3" style="fill:var(--exit)"/>`);
    if (corr === 'diverging')
      parts.push(`<path d="M${corrX - 6},${oy - 26} L${corrX + 6},${oy - 26} Q${corrX + 1},${oy} ${corrX + 6},${oy + 26} L${corrX - 6},${oy + 26} Q${corrX - 1},${oy} ${corrX - 6},${oy - 26} Z" style="fill:#4a90d9;opacity:0.35;stroke:var(--ink)"/>`);
    if (corr === 'converging')
      parts.push(`<path d="M${corrX},${oy - 26} Q${corrX + 10},${oy} ${corrX},${oy + 26} Q${corrX - 10},${oy} ${corrX},${oy - 26} Z" style="fill:#4a90d9;opacity:0.35;stroke:var(--ink)"/>`);
    return parts.join('');
  };
  return svg('0 0 470 300', 'Short sight: the image forms in front of the retina; a diverging lens corrects it. Long sight: the image forms behind the retina; a converging lens corrects it', `
    <text class="txt" x="10" y="18" style="font-weight:700">short sight (far object)</text>
    ${eye(0, 70, -16, 'parallel', 'none')}
    ${eye(235, 70, 0, 'parallel', 'diverging')}
    <text class="txt" x="120" y="128" text-anchor="middle">focus in front of the retina</text>
    <text class="txt" x="355" y="128" text-anchor="middle">diverging lens: focus on the retina</text>
    <text class="txt" x="10" y="164" style="font-weight:700">long sight (near object)</text>
    ${eye(0, 220, 16, 'near', 'none')}
    ${eye(235, 220, 0, 'near', 'converging')}
    <text class="txt" x="120" y="278" text-anchor="middle">focus behind the retina</text>
    <text class="txt" x="355" y="278" text-anchor="middle">converging lens: focus on the retina</text>
    <text class="txt" x="465" y="296" text-anchor="end" style="font-size:11px">retina: red line at the back of the eye</text>
  `);
}
