// Unit 10 practice: reflection (3.2.1 C3, S4), refractive index and critical angle (3.2.2 S6–S8).
import type { Question, Topic } from './types';
import { fmt, pick, qty, randInt } from './random';

const NO_UNIT = '(no unit)';
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const dg = (x: number | string) => `${x}^\\circ`;

// ---------- Reflection (Core) ----------

function reflectionFromIncidence(): Question {
  let i = randInt(10, 80);
  if (i === 45) i = 50;
  return {
    text: `A ray of light hits a plane mirror. The angle of incidence is ${i}°.`,
    given: [`angle of incidence $i = ${dg(i)}$`],
    find: 'the angle of reflection $r$',
    answer: i,
    unit: '°',
    unitOptions: ['°', 'm', NO_UNIT],
    absTolerance: 0.5,
    solution: ['The angle of incidence equals the angle of reflection: $i = r$.', `$r = ${dg(i)}$`],
    traps: [{ value: 90 - i, hint: 'Both angles are measured from the normal, not from the mirror.' }],
  };
}

function reflectionFromMirrorAngle(): Question {
  let a = randInt(10, 80);
  if (a === 45) a = 40;
  const i = 90 - a;
  return {
    text: `A ray of light hits a plane mirror. The angle between the ray and the surface of the mirror is ${a}°.`,
    given: [`angle between the ray and the mirror $= ${dg(a)}$`],
    find: 'the angle of reflection $r$',
    answer: i,
    unit: '°',
    unitOptions: ['°', 'm', NO_UNIT],
    absTolerance: 0.5,
    solution: [
      'Angles are measured from the <strong>normal</strong>, which is at $90^\\circ$ to the mirror.',
      `angle of incidence $i = 90^\\circ - ${dg(a)} = ${dg(i)}$`,
      `$r = i = ${dg(i)}$`,
    ],
    traps: [{ value: a, hint: 'Measure from the normal (at 90° to the mirror), not from the mirror.' }],
  };
}

function reflectionLevel3(): Question {
  if (Math.random() < 0.5) {
    let between = randInt(10, 80) * 2;
    if (between === 90) between = 100;
    return {
      text: `A ray of light reflects from a plane mirror. The angle between the incident ray and the reflected ray is ${between}°.`,
      given: [`angle between the two rays $= ${dg(between)}$`],
      find: 'the angle of incidence $i$',
      answer: between / 2,
      unit: '°',
      unitOptions: ['°', 'm', NO_UNIT],
      absTolerance: 0.5,
      solution: ['The normal is in the middle: $i = r$.', `$i + r = ${dg(between)}$, so $i = \\dfrac{${between}}{2} = ${dg(between / 2)}$`],
      traps: [
        { value: between, hint: 'This angle is $i + r$. The normal cuts it into two equal angles.' },
        { value: 90 - between / 2, hint: 'This is the angle with the mirror. Measure from the normal.' },
      ],
    };
  }
  const d = pick([0.5, 0.8, 1.2, 1.5, 2.0, 2.5]);
  return {
    text: `A student stands ${d} m in front of a plane mirror.`,
    given: [`distance from the student to the mirror $= ${qty(d, 'm')}$`],
    find: 'the distance between the student and their image',
    answer: 2 * d,
    unit: 'm',
    unitOptions: ['m', '°', NO_UNIT],
    solution: [
      'The image is the same distance behind the mirror as the object is in front of it.',
      `distance $= ${d} + ${d} = ${qty(2 * d, 'm')}$`,
    ],
    traps: [{ value: d, hint: 'This is the distance to the mirror. The image is behind the mirror, at the same distance again.' }],
  };
}

export const reflectionTopic: Topic = {
  id: 'reflection',
  title: 'Reflection',
  levels: [
    { name: 'Level 1', description: 'Angle of reflection' },
    { name: 'Level 2', description: 'Angles with the mirror' },
    { name: 'Level 3', description: 'Two rays; images in a mirror' },
  ],
  generate: (level) => (level === 1 ? reflectionFromIncidence() : level === 2 ? reflectionFromMirrorAngle() : reflectionLevel3()),
};

// ---------- Refractive index (Extended) ----------

const materials = [
  { name: 'glass', n: 1.5 },
  { name: 'water', n: 1.33 },
  { name: 'Perspex', n: 1.49 },
  { name: 'diamond', n: 2.42 },
];

function findN(): Question {
  const mat = pick(materials);
  const i = randInt(8, 15) * 5;
  const r = Math.round(deg(Math.asin(Math.sin(rad(i)) / mat.n)));
  const n = Math.sin(rad(i)) / Math.sin(rad(r));
  return {
    text: `A ray of light goes from air into a block of ${mat.name}. The angle of incidence is ${i}° and the angle of refraction is ${r}°.`,
    given: [`$i = ${dg(i)}$`, `$r = ${dg(r)}$`],
    find: 'the refractive index $n$',
    answer: n,
    unit: NO_UNIT,
    unitOptions: [NO_UNIT, '°', 'm/s'],
    solution: [
      '$n = \\dfrac{\\sin i}{\\sin r}$ (calculator in degrees)',
      `$n = \\dfrac{\\sin ${dg(i)}}{\\sin ${dg(r)}} = \\dfrac{${Math.sin(rad(i)).toFixed(3)}}{${Math.sin(rad(r)).toFixed(3)}}$`,
      `$n = ${fmt(n)}$ (no unit: it is a ratio)`,
    ],
    traps: [
      { value: i / r, hint: 'Use the sines of the angles: $n = \\dfrac{\\sin i}{\\sin r}$.' },
      { value: 1 / n, hint: 'Upside down: $n = \\dfrac{\\sin i}{\\sin r}$, with $i$ in air.' },
    ],
  };
}

function findAngle(): Question {
  const mat = pick(materials);
  const i = randInt(8, 16) * 5;
  const r = deg(Math.asin(Math.sin(rad(i)) / mat.n));
  return {
    text: `A ray of light goes from air into ${mat.name} (refractive index ${mat.n}). The angle of incidence is ${i}°.`,
    given: [`$i = ${dg(i)}$`, `$n = ${mat.n}$`],
    find: 'the angle of refraction $r$',
    answer: r,
    unit: '°',
    unitOptions: ['°', NO_UNIT, 'm/s'],
    absTolerance: 0.6,
    solution: [
      '$n = \\dfrac{\\sin i}{\\sin r}$, so $\\sin r = \\dfrac{\\sin i}{n}$',
      `$\\sin r = \\dfrac{\\sin ${dg(i)}}{${mat.n}} = ${(Math.sin(rad(i)) / mat.n).toFixed(3)}$`,
      `$r = \\sin^{-1}(${(Math.sin(rad(i)) / mat.n).toFixed(3)}) = ${dg(r.toFixed(1))}$`,
    ],
    traps: [
      { value: i / mat.n, hint: 'Do not divide the angle. Divide $\\sin i$ by $n$, then use $\\sin^{-1}$.' },
      { value: Math.sin(rad(i)) / mat.n, hint: 'This is $\\sin r$. Now use $\\sin^{-1}$ to find the angle.' },
    ],
  };
}

function criticalOrSpeed(): Question {
  const kind = pick(['critical', 'n-from-c', 'speed']);
  if (kind === 'critical') {
    const mat = pick(materials);
    const c = deg(Math.asin(1 / mat.n));
    return {
      text: `The refractive index of ${mat.name} is ${mat.n}.`,
      given: [`$n = ${mat.n}$`],
      find: 'the critical angle $c$',
      answer: c,
      unit: '°',
      unitOptions: ['°', NO_UNIT, 'm/s'],
      absTolerance: 0.6,
      solution: [
        '$n = \\dfrac{1}{\\sin c}$, so $\\sin c = \\dfrac{1}{n}$',
        `$\\sin c = \\dfrac{1}{${mat.n}} = ${(1 / mat.n).toFixed(3)}$`,
        `$c = \\sin^{-1}(${(1 / mat.n).toFixed(3)}) = ${dg(c.toFixed(1))}$`,
      ],
      traps: [
        { value: 1 / mat.n, hint: 'This is $\\sin c$. Now use $\\sin^{-1}$ to find the angle.' },
        { value: Math.asin(1 / mat.n), hint: 'Your calculator is in radians. Change it to degrees.' },
      ],
    };
  }
  if (kind === 'n-from-c') {
    const c = randInt(24, 50);
    const n = 1 / Math.sin(rad(c));
    return {
      text: `The critical angle of a transparent plastic is ${c}°.`,
      given: [`$c = ${dg(c)}$`],
      find: 'the refractive index $n$',
      answer: n,
      unit: NO_UNIT,
      unitOptions: [NO_UNIT, '°', 'm/s'],
      solution: ['$n = \\dfrac{1}{\\sin c}$', `$n = \\dfrac{1}{\\sin ${dg(c)}} = \\dfrac{1}{${Math.sin(rad(c)).toFixed(3)}}$`, `$n = ${fmt(n)}$`],
      traps: [{ value: Math.sin(rad(c)), hint: 'This is $\\sin c$. Now calculate $n = \\dfrac{1}{\\sin c}$.' }],
    };
  }
  const mat = pick(materials);
  const v = 3e8 / mat.n;
  return {
    text: `Light travels at $3.0 \\times 10^8$ m/s in air. The refractive index of ${mat.name} is ${mat.n}.`,
    given: [`speed in air $= 3.0 \\times 10^8\\,\\text{m/s}$`, `$n = ${mat.n}$`],
    find: `the speed of light in ${mat.name}`,
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', NO_UNIT, '°'],
    sci: true,
    solution: [
      '$n = \\dfrac{\\text{speed in air}}{\\text{speed in the material}}$',
      `speed in ${mat.name} $= \\dfrac{3.0 \\times 10^8}{${mat.n}}$`,
      `$= ${qty(v, 'm/s')}$`,
    ],
    traps: [{ value: 3e8 * mat.n, hint: 'Light is slower in the material: divide by $n$.' }],
  };
}

export const refractiveIndexTopic: Topic = {
  id: 'refractive-index',
  title: 'Refractive index',
  levels: [
    { name: 'Level 1', description: 'Find n from two angles' },
    { name: 'Level 2', description: 'Find the angle of refraction' },
    { name: 'Level 3', description: 'Critical angle and speed' },
  ],
  generate: (level) => (level === 1 ? findN() : level === 2 ? findAngle() : criticalOrSpeed()),
};
