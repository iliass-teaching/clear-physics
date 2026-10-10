// SVG figures for Unit 4 (momentum). Trolleys on a track with velocity arrows.

export interface Cart {
  m: number; // kg (shown as a label)
  v: number; // m/s, positive = to the right
  label: string;
}

function head(x: number, y: number, angle: number): string {
  const a1 = angle - 0.45;
  const a2 = angle + 0.45;
  return `<polygon class="arrow-head" points="${x},${y} ${(x - 10 * Math.cos(a1)).toFixed(1)},${(y - 10 * Math.sin(a1)).toFixed(1)} ${(x - 10 * Math.cos(a2)).toFixed(1)},${(y - 10 * Math.sin(a2)).toFixed(1)}"/>`;
}

function cart(x: number, c: Cart): string {
  const y = 70;
  const w = 80;
  const parts = [
    `<rect class="box" x="${x - w / 2}" y="${y - 4}" width="${w}" height="40" rx="5"/>`,
    `<circle class="ink-head" cx="${x - 22}" cy="${y + 42}" r="7"/>`,
    `<circle class="ink-head" cx="${x + 22}" cy="${y + 42}" r="7"/>`,
    `<text class="txt" x="${x}" y="${y + 11}" text-anchor="middle" style="font-weight:700">${c.label}</text>`,
    `<text class="txt" x="${x}" y="${y + 30}" text-anchor="middle">${c.m} kg</text>`,
  ];
  if (c.v === 0) {
    parts.push(`<text class="txt" x="${x}" y="${y - 12}" text-anchor="middle">at rest</text>`);
  } else {
    const len = 30 + Math.min(Math.abs(c.v), 10) * 5;
    const dir = Math.sign(c.v);
    const x1 = x - (dir * len) / 2;
    const x2 = x + (dir * len) / 2;
    parts.push(`<line class="arrow" x1="${x1}" y1="${y - 14}" x2="${x2 - dir * 8}" y2="${y - 14}"/>`);
    parts.push(head(x2, y - 14, dir > 0 ? 0 : Math.PI));
    parts.push(`<text class="txt" x="${x}" y="${y - 24}" text-anchor="middle">${Math.abs(c.v)} m/s</text>`);
  }
  return parts.join('');
}

// Two trolleys on a track, before a collision.
export function collisionSvg(carts: [Cart, Cart] | Cart[]): string {
  return `<svg class="fig" viewBox="0 0 420 130" role="img" aria-label="Two trolleys on a track with arrows for their velocities">
    <line class="ink" x1="10" y1="125" x2="410" y2="125"/>
    ${cart(120, carts[0])}${cart(300, carts[1])}
  </svg>`;
}
