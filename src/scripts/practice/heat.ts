// Unit 8 practice: specific heat capacity c = ΔE / (m Δθ) (2.2.2 S3, S4).
import type { Question, Topic } from './types';
import { an, fmt, pick, qty, randInt } from './random';

const C_EQ = 'c = \\dfrac{\\Delta E}{m \\Delta\\theta}';
const UNIT_C = 'J/(kg °C)';
const cTex = (x: number | string) => `${x}\\,\\text{J/(kg}\\,^\\circ\\text{C)}`;
const degC = (x: number | string) => `${x}\\,^\\circ\\text{C}`;

const materials = [
  { name: 'aluminium', c: 900 },
  { name: 'copper', c: 385 },
  { name: 'iron', c: 450 },
  { name: 'lead', c: 130 },
];

function energyNeeded(): Question {
  const sit = pick([
    { text: (m: number, a: number, b: number) => `A kettle heats ${m} kg of water from ${a} °C to ${b} °C.`, c: 4200, m: [0.5, 1.0, 1.5, 2.0], to: 100 },
    { text: (m: number, a: number, b: number) => `An aluminium pan of mass ${m} kg is heated from ${a} °C to ${b} °C.`, c: 900, m: [0.4, 0.6, 0.8, 1.2], to: randInt(6, 18) * 10 },
    { text: (m: number, a: number, b: number) => `A copper block of mass ${m} kg is heated from ${a} °C to ${b} °C.`, c: 385, m: [0.5, 1.0, 2.0, 2.5], to: randInt(5, 15) * 10 },
  ]);
  const m = pick(sit.m);
  const a = randInt(15, 25);
  const b = sit.to;
  const dT = b - a;
  const E = m * sit.c * dT;
  return {
    text: sit.text(m, a, b),
    given: [`$m = ${qty(m, 'kg')}$`, `$c = ${cTex(sit.c)}$`, `$\\Delta\\theta = ${b} - ${a} = ${degC(dT)}$`],
    find: 'the energy needed, $\\Delta E$',
    answer: E,
    unit: 'J',
    unitOptions: ['J', 'W', '°C', 'kg'],
    sci: E >= 1e5,
    solution: [`$${C_EQ}$, so $\\Delta E = m c \\Delta\\theta$`, `$\\Delta E = ${m} \\times ${sit.c} \\times ${dT}$`, `$\\Delta E = ${qty(E, 'J')}$`],
    traps: [
      { value: m * sit.c * b, hint: 'Use the change in temperature: $\\Delta\\theta = \\theta_{\\text{end}} - \\theta_{\\text{start}}$.' },
      { value: m * sit.c, hint: 'Multiply by the change in temperature too: $\\Delta E = m c \\Delta\\theta$.' },
    ],
  };
}

function findCOrTemperature(): Question {
  if (Math.random() < 0.5) {
    const mat = pick(materials);
    const m = pick([0.25, 0.5, 2.0, 4.0]);
    const dT = pick([10, 15, 20, 25, 40]);
    const E = m * mat.c * dT;
    return {
      text: `A block of ${mat.name} has a mass of ${m} kg. It gets ${fmt(E)} J of energy, and its temperature rises by ${dT} °C.`,
      given: [`$\\Delta E = ${qty(E, 'J')}$`, `$m = ${qty(m, 'kg')}$`, `$\\Delta\\theta = ${degC(dT)}$`],
      find: 'the specific heat capacity $c$',
      answer: mat.c,
      unit: UNIT_C,
      unitOptions: [UNIT_C, 'J/kg', 'J', '°C'],
      solution: [`$${C_EQ}$`, `$c = \\dfrac{${fmt(E)}}{${m} \\times ${dT}}$`, `$c = ${cTex(mat.c)}$`],
      traps: [
        { value: E / m, hint: 'Divide by the change in temperature too: $c = \\dfrac{\\Delta E}{m \\Delta\\theta}$.' },
        { value: E / dT, hint: 'Divide by the mass too: $c = \\dfrac{\\Delta E}{m \\Delta\\theta}$.' },
      ],
    };
  }
  const m = pick([0.5, 1.0, 2.0]);
  const start = randInt(15, 25);
  const dT = randInt(2, 12) * 5;
  const E = m * 4200 * dT;
  return {
    text: `${m} kg of water at ${start} °C gets ${fmt(E)} J of energy from a heater.`,
    given: [`$\\Delta E = ${qty(E, 'J')}$`, `$m = ${qty(m, 'kg')}$`, `$c = ${cTex(4200)}$`, `start: $${degC(start)}$`],
    find: 'the final temperature of the water',
    answer: start + dT,
    unit: '°C',
    unitOptions: ['°C', 'J', 'K', 'kg'],
    absTolerance: 0.5,
    solution: [
      `$\\Delta\\theta = \\dfrac{\\Delta E}{m c} = \\dfrac{${fmt(E)}}{${m} \\times 4200} = ${degC(dT)}$`,
      `final temperature $= ${start} + ${dT} = ${degC(start + dT)}$`,
    ],
    traps: [{ value: dT, hint: 'This is the rise in temperature. Add it to the start temperature.' }],
  };
}

function heaterExperiment(): Question {
  for (;;) {
    const q = heaterTry();
    if (q) return q;
  }
}

function heaterTry(): Question | null {
  const mat = pick(materials.slice(0, 3));
  const gram = Math.random() < 0.4;
  const m = gram ? pick([0.5, 0.8]) : pick([1.0, 1.5, 2.0]);
  const P = pick([24, 50, 60, 100]);
  const minutes = pick([5, 8, 10, 12, 15]);
  const t = minutes * 60;
  const E = P * t;
  // Some energy is lost: the measured rise is a little smaller than with no losses.
  const dT = Math.max(2, Math.round(((E / (m * mat.c)) * (0.88 + Math.random() * 0.08)) * 2) / 2);
  if (dT < 5 || dT > 60) return null; // keep realistic temperatures
  const start = randInt(18, 22);
  const end = start + dT;
  const c = E / (m * dT);
  const mText = gram ? `${m * 1000} g` : `${m} kg`;
  return {
    text: `${an(P, true)} ${P} W heater warms ${an(mText)} ${mText} block of ${mat.name} for ${minutes} minutes. The temperature of the block goes from ${start} °C to ${fmt(end)} °C.`,
    given: [`$P = ${qty(P, 'W')}$`, `$t = ${minutes}\\,\\text{min}$`, `$m = ${gram ? `${m * 1000}\\,\\text{g}` : qty(m, 'kg')}$`, `$\\theta$: from $${degC(start)}$ to $${degC(fmt(end))}$`],
    find: 'the specific heat capacity of the metal',
    answer: c,
    unit: UNIT_C,
    unitOptions: [UNIT_C, 'J/kg', 'W', 'J'],
    tolerance: 0.02,
    solution: [
      `Energy from the heater: $\\Delta E = P t = ${P} \\times ${t} = ${qty(E, 'J')}$ (time in seconds: $${minutes} \\times 60 = ${t}\\,\\text{s}$)`,
      ...(gram ? [`Mass in kg: $m = ${m * 1000}\\,\\text{g} = ${qty(m, 'kg')}$`] : []),
      `$\\Delta\\theta = ${fmt(end)} - ${start} = ${degC(fmt(dT))}$`,
      `$c = \\dfrac{\\Delta E}{m \\Delta\\theta} = \\dfrac{${E}}{${m} \\times ${fmt(dT)}} = ${cTex(fmt(c))}$`,
      `The value in data books is about ${mat.c}. Our value is a little higher, because some energy is lost to the surroundings.`,
    ],
    traps: [
      { value: (P * minutes) / (m * dT), hint: 'Change the time to seconds: 1 minute = 60 s.' },
      { value: E / (m * end), hint: 'Use the change in temperature, not the final temperature.' },
      ...(gram ? [{ value: E / (m * 1000 * dT), hint: 'Change the mass to kg: 1000 g = 1 kg.' }] : []),
    ],
  };
}

export const shcTopic: Topic = {
  id: 'shc',
  title: 'Specific heat capacity',
  levels: [
    { name: 'Level 1', description: 'Energy to heat something' },
    { name: 'Level 2', description: 'Find c, or the final temperature' },
    { name: 'Level 3', description: 'A heater experiment' },
  ],
  generate: (level) => (level === 1 ? energyNeeded() : level === 2 ? findCOrTemperature() : heaterExperiment()),
};
