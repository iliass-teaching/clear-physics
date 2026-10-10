// Acceleration: a = Δv / Δt (syllabus 1.2 S9, S12, Extended).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';

const UNITS = ['m/s²', 'm/s', 'm', 's'];
const A = 'a = \\dfrac{\\Delta v}{\\Delta t}';

function fromRest(): Question {
  const a = pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]);
  const t = randInt(2, 12);
  const v = a * t;
  const who = pick(['A car', 'A train', 'A motorbike', 'A cyclist']);
  return {
    text: `${who} starts from rest. After ${t} s, its speed is ${fmt(v)} m/s.`,
    given: [`start speed $= 0\\,\\text{m/s}$`, `final speed $= ${qty(v, 'm/s')}$`, `time $= ${qty(t, 's')}$`],
    find: 'the acceleration $a$',
    answer: a,
    unit: 'm/s²',
    unitOptions: UNITS,
    solution: [
      `$${A}$`,
      `$\\Delta v = ${fmt(v)} - 0 = ${qty(v, 'm/s')}$`,
      `$a = ${frac(v, t)} = ${qty(a, 'm/s²')}$`,
    ],
    traps: [
      { value: v * t, hint: `You multiplied. Acceleration = change in speed ÷ time: $${A}$.` },
      { value: t / v, hint: `You divided the wrong way: $${A}$.` },
    ],
  };
}

function changeOfSpeed(): Question {
  const t = randInt(2, 10);
  const v1 = randInt(2, 20);
  const a = pick([-3, -2, -1.5, -1, 1, 1.5, 2, 3]);
  let v2 = v1 + a * t;
  if (v2 < 0) return changeOfSpeed();
  v2 = Number(v2.toFixed(1));
  const slows = a < 0;
  return {
    text: `A car ${slows ? 'slows down' : 'speeds up'} from ${v1} m/s to ${fmt(v2)} m/s in ${t} s.`,
    given: [`start speed $= ${qty(v1, 'm/s')}$`, `final speed $= ${qty(v2, 'm/s')}$`, `time $= ${qty(t, 's')}$`],
    find: 'the acceleration $a$',
    answer: a,
    unit: 'm/s²',
    unitOptions: UNITS,
    solution: [
      `$${A}$, with $\\Delta v = \\text{final speed} - \\text{start speed}$`,
      `$\\Delta v = ${fmt(v2)} - ${v1} = ${qty(v2 - v1, 'm/s')}$`,
      `$a = ${frac(v2 - v1, t)} = ${qty(a, 'm/s²')}$${slows ? ' (negative: a deceleration)' : ''}`,
    ],
    traps: [
      ...(slows ? [{ value: -a, hint: 'The car slows down, so $\\Delta v$ is negative: final speed − start speed.' }] : []),
      { value: v2 / t, hint: 'Use the change in speed (final − start), not only the final speed.' },
      { value: (v1 + v2) / t, hint: 'Use the change in speed: final speed − start speed.' },
    ],
  };
}

function findSpeedOrTime(): Question {
  const a = pick([1, 1.5, 2, 2.5, 3, 4]);
  const t = randInt(2, 10);
  const v1 = randInt(1, 10);
  const v2 = v1 + a * t;
  if (Math.random() < 0.5) {
    return {
      text: `A bike moves at ${v1} m/s. It accelerates at ${a} m/s² for ${t} s.`,
      given: [`start speed $= ${qty(v1, 'm/s')}$`, `acceleration $a = ${qty(a, 'm/s²')}$`, `time $= ${qty(t, 's')}$`],
      find: 'the final speed',
      answer: v2,
      unit: 'm/s',
      unitOptions: UNITS,
      solution: [
        `$${A}$, so $\\Delta v = a \\times \\Delta t$`,
        `$\\Delta v = ${a} \\times ${t} = ${qty(a * t, 'm/s')}$`,
        `$\\text{final speed} = ${v1} + ${fmt(a * t)} = ${qty(v2, 'm/s')}$`,
      ],
      traps: [{ value: a * t, hint: 'This is the change in speed. Add it to the start speed.' }],
    };
  }
  return {
    text: `A car accelerates at ${a} m/s² from ${v1} m/s to ${fmt(v2)} m/s.`,
    given: [`start speed $= ${qty(v1, 'm/s')}$`, `final speed $= ${qty(v2, 'm/s')}$`, `acceleration $a = ${qty(a, 'm/s²')}$`],
    find: 'the time taken',
    answer: t,
    unit: 's',
    unitOptions: UNITS,
    solution: [
      `$${A}$, so $\\Delta t = \\dfrac{\\Delta v}{a}$`,
      `$\\Delta v = ${fmt(v2)} - ${v1} = ${qty(v2 - v1, 'm/s')}$`,
      `$\\Delta t = ${frac(v2 - v1, a)} = ${qty(t, 's')}$`,
    ],
    traps: [
      { value: v2 / a, hint: 'Use the change in speed (final − start), not only the final speed.' },
      { value: (v2 - v1) * a, hint: 'You multiplied. $\\Delta t = \\dfrac{\\Delta v}{a}$.' },
    ],
  };
}

export const accelerationTopic: Topic = {
  id: 'acceleration',
  title: 'Acceleration',
  levels: [
    { name: 'Level 1', description: 'Acceleration from rest' },
    { name: 'Level 2', description: 'Speeding up and slowing down' },
    { name: 'Level 3', description: 'Find the speed or the time' },
  ],
  generate: (level) => (level === 1 ? fromRest() : level === 2 ? changeOfSpeed() : findSpeedOrTime()),
};
