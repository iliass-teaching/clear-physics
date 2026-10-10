// Resultant of two vectors at right angles (syllabus 1.1 S7, Extended).
import type { Question, Topic } from './types';
import { fmt, pick, qty, randInt } from './random';

function arrow(x1: number, y1: number, x2: number, y2: number, cls: string): string {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 11;
  const hx1 = x2 - h * Math.cos(ang - 0.4);
  const hy1 = y2 - h * Math.sin(ang - 0.4);
  const hx2 = x2 - h * Math.cos(ang + 0.4);
  const hy2 = y2 - h * Math.sin(ang + 0.4);
  // stop the line before the head so the tip stays sharp
  const lx = x2 - (h - 2) * Math.cos(ang);
  const ly = y2 - (h - 2) * Math.sin(ang);
  return `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}"/>` +
    `<polygon class="${cls}-head" points="${x2},${y2} ${hx1.toFixed(1)},${hy1.toFixed(1)} ${hx2.toFixed(1)},${hy2.toFixed(1)}"/>`;
}

// Two arrows from one point: a to the right, b upwards, and the resultant.
export function vectorsSvg(a: number, b: number, labelA: string, labelB: string, labelR = '?'): string {
  const scale = Math.min(230 / a, 120 / b);
  const ox = 40;
  const oy = 150;
  const ax = ox + a * scale;
  const by = oy - b * scale;
  return `<svg class="fig" viewBox="0 0 330 175" role="img" aria-label="Two vectors at right angles and their resultant">
    <line class="dash" x1="${ax}" y1="${oy}" x2="${ax}" y2="${by}"/>
    <line class="dash" x1="${ox}" y1="${by}" x2="${ax}" y2="${by}"/>
    ${arrow(ox, oy, ax, oy, 'arrow')}
    ${arrow(ox, oy, ox, by, 'arrow')}
    ${arrow(ox, oy, ax, by, 'arrow2')}
    <circle cx="${ox}" cy="${oy}" r="4" class="arrow-head"/>
    <text class="txt" x="${(ox + ax) / 2}" y="${oy + 18}" text-anchor="middle">${labelA}</text>
    <text class="txt" x="${ox - 6}" y="${(oy + by) / 2}" text-anchor="end">${labelB}</text>
    <text class="txt" x="${(ox + ax) / 2 - 10}" y="${(oy + by) / 2 - 10}" text-anchor="end" style="fill:var(--exit);font-weight:700">${labelR}</text>
  </svg>`;
}

const triples = [
  [3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25],
] as const;

function forces(): Question {
  const [p, q, r] = pick(triples);
  const k = pick([1, 2, 5, 10]);
  const swap = Math.random() < 0.5;
  const a = (swap ? q : p) * k;
  const b = (swap ? p : q) * k;
  const R = r * k;
  return {
    text: `Two forces act on a box: ${a} N to the right and ${b} N up. They are at right angles.`,
    figure: vectorsSvg(a, b, `${a} N`, `${b} N`),
    given: [`force 1 $= ${qty(a, 'N')}$ (to the right)`, `force 2 $= ${qty(b, 'N')}$ (up)`],
    find: 'the size of the resultant force',
    answer: R,
    unit: 'N',
    unitOptions: ['N', 'N²', 'm/s'],
    solution: [
      'The forces are at right angles, so use Pythagoras:',
      `$R^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${R * R}$`,
      `$R = \\sqrt{${R * R}} = ${qty(R, 'N')}$`,
    ],
    traps: [
      { value: a + b, hint: 'You added the two sizes. This works only if the forces point the same way. Here they are at right angles: use Pythagoras.' },
      { value: Math.abs(a - b), hint: 'You subtracted. The forces are at right angles: use Pythagoras.' },
      { value: R * R, hint: 'This is $R^2$. Now take the square root.' },
    ],
  };
}

function velocities(): Question {
  const boat = randInt(20, 60) / 10;
  const river = randInt(5, 25) / 10;
  const R = Math.sqrt(boat * boat + river * river);
  return {
    text: `A boat moves across a river at ${fmt(boat)} m/s. The river pushes it downstream at ${fmt(river)} m/s, at right angles.`,
    figure: vectorsSvg(river, boat, `river ${fmt(river)} m/s`, `boat ${fmt(boat)} m/s`),
    given: [`velocity of the boat $= ${qty(boat, 'm/s')}$ (across)`, `velocity of the river $= ${qty(river, 'm/s')}$ (downstream)`],
    find: 'the size of the resultant velocity',
    answer: R,
    unit: 'm/s',
    unitOptions: ['m/s', 'm', 'N'],
    solution: [
      'The velocities are at right angles, so use Pythagoras:',
      `$v^2 = ${fmt(boat)}^2 + ${fmt(river)}^2 = ${fmt(boat * boat)} + ${fmt(river * river)} = ${fmt(boat * boat + river * river)}$`,
      `$v = \\sqrt{${fmt(boat * boat + river * river)}} = ${qty(R, 'm/s')}$`,
    ],
    traps: [
      { value: boat + river, hint: 'You added the two speeds. They are at right angles: use Pythagoras.' },
      { value: boat * boat + river * river, hint: 'This is $v^2$. Now take the square root.' },
    ],
  };
}

function angle(): Question {
  const [p, q, r] = pick(triples);
  const k = pick([1, 2, 10]);
  const a = p * k;
  const b = q * k;
  const theta = (Math.atan(b / a) * 180) / Math.PI;
  return {
    text: `Two forces act at right angles: ${a} N to the right and ${b} N up. The resultant is ${r * k} N.`,
    figure: vectorsSvg(a, b, `${a} N`, `${b} N`, `${r * k} N`),
    given: [`force to the right $= ${qty(a, 'N')}$`, `force up $= ${qty(b, 'N')}$`],
    find: `the angle between the resultant and the ${a} N force`,
    answer: theta,
    unit: '°',
    unitOptions: ['°', 'N', 'm'],
    absTolerance: 1,
    solution: [
      `$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{${b}}{${a}}$`,
      `$\\theta = \\tan^{-1}(${fmt(b / a)})$`,
      `$\\theta = ${theta.toFixed(1)}^\\circ$`,
    ],
    traps: [
      { value: 90 - theta, hint: `This is the angle with the ${b} N force. The question asks for the angle with the ${a} N force.` },
      { value: b / a, hint: 'This is $\\tan\\theta$. Now use $\\tan^{-1}$ to find the angle.' },
    ],
  };
}

export const vectorsTopic: Topic = {
  id: 'vectors',
  title: 'Adding vectors at right angles',
  levels: [
    { name: 'Level 1', description: 'Resultant of two forces' },
    { name: 'Level 2', description: 'Resultant of two velocities' },
    { name: 'Level 3', description: 'Angle of the resultant' },
  ],
  generate: (level) => (level === 1 ? forces() : level === 2 ? velocities() : angle()),
};
