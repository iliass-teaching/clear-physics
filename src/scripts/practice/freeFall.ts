// Free fall without air resistance: a = Δv / Δt with a = g (syllabus 1.2 C8, S9).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty } from './random';

const UNITS = ['m/s', 'm/s²', 's', 'm'];
const DV = '\\Delta v = a \\times \\Delta t';

function speedAfter(): Question {
  const t = pick([0.5, 1, 1.5, 2, 2.5, 3]);
  const v = 9.8 * t;
  return {
    text: 'A stone falls from rest. There is no air resistance.',
    given: [`$g = ${qty(9.8, 'm/s²')}$`, `start speed $= 0\\,\\text{m/s}$`, `time $= ${qty(t, 's')}$`],
    find: `the speed after ${t} s`,
    answer: v,
    unit: 'm/s',
    unitOptions: UNITS,
    solution: [
      `$a = \\dfrac{\\Delta v}{\\Delta t}$, so $${DV}$`,
      `$\\Delta v = 9.8 \\times ${t} = ${qty(v, 'm/s')}$`,
      `It starts from rest, so the speed is $${qty(v, 'm/s')}$.`,
    ],
    traps: [
      { value: 9.8 / t, hint: `You divided. The speed increases by 9.8 m/s every second: $${DV}$.` },
      { value: 9.8, hint: 'This is the acceleration. Each second the speed increases by 9.8 m/s. Multiply by the time.' },
    ],
  };
}

function timeTo(): Question {
  const t = pick([1, 1.5, 2, 2.5, 3, 4]);
  const v = Number((9.8 * t).toFixed(1));
  return {
    text: 'A ball is dropped from rest. There is no air resistance.',
    given: [`$g = ${qty(9.8, 'm/s²')}$`, `final speed $= ${qty(v, 'm/s')}$`],
    find: 'the time to reach this speed',
    answer: v / 9.8,
    unit: 's',
    unitOptions: UNITS,
    solution: [
      '$a = \\dfrac{\\Delta v}{\\Delta t}$, so $\\Delta t = \\dfrac{\\Delta v}{a}$',
      `$\\Delta t = ${frac(v, 9.8)}$`,
      `$\\Delta t = ${qty(v / 9.8, 's')}$`,
    ],
    traps: [
      { value: v * 9.8, hint: 'You multiplied. To find the time: $\\Delta t = \\dfrac{\\Delta v}{a}$.' },
      { value: 9.8 / v, hint: 'You divided the wrong way: $\\Delta t = \\dfrac{\\Delta v}{a}$.' },
    ],
  };
}

function otherWorlds(): Question {
  // Values from the NASA Planetary Fact Sheet.
  const place = pick([
    { name: 'the Moon', g: 1.6 },
    { name: 'Mars', g: 3.7 },
    { name: 'Pluto', g: 0.7 },
  ]);
  const t = pick([2, 3, 4, 5]);
  const v = place.g * t;
  return {
    text: `An astronaut drops a hammer on ${place.name}. Ignore air resistance.`,
    given: [
      `acceleration of free fall on ${place.name} $= ${qty(place.g, 'm/s²')}$`,
      `start speed $= 0\\,\\text{m/s}$`,
      `time $= ${qty(t, 's')}$`,
    ],
    find: `the speed after ${t} s`,
    answer: v,
    unit: 'm/s',
    unitOptions: UNITS,
    solution: [`$${DV}$`, `$\\Delta v = ${place.g} \\times ${t}$`, `$\\text{speed} = ${qty(fmt(v), 'm/s')}$`],
    traps: [
      { value: 9.8 * t, hint: `On ${place.name}, the acceleration of free fall is not 9.8 m/s². Use $${qty(place.g, 'm/s²')}$.` },
      { value: place.g / t, hint: `You divided. Use $${DV}$.` },
    ],
  };
}

export const freeFallTopic: Topic = {
  id: 'free-fall',
  title: 'Free fall',
  levels: [
    { name: 'Level 1', description: 'Speed after a time' },
    { name: 'Level 2', description: 'Time to reach a speed' },
    { name: 'Level 3', description: 'Free fall on other worlds' },
  ],
  generate: (level) => (level === 1 ? speedAfter() : level === 2 ? timeTo() : otherWorlds()),
};
