// Measuring many and dividing: period of a pendulum, thickness of a sheet (syllabus 1.1 C3).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';

const T_EQ = '\\text{period} = \\dfrac{\\text{total time}}{\\text{number of oscillations}}';

function period(): Question {
  const n = pick([10, 20, 25, 50]);
  const T = randInt(80, 250) / 100; // 0.80 to 2.50 s
  const total = Number((T * n).toFixed(1));
  const answer = total / n;
  return {
    text: `A pendulum makes ${n} oscillations in ${total.toFixed(1)} s.`,
    given: [`number of oscillations $= ${n}$`, `total time $= ${qty(total.toFixed(1), 's')}$`],
    find: 'the time for one oscillation (the period)',
    answer,
    unit: 's',
    unitOptions: ['s', 'm', 'm/s'],
    solution: [`$${T_EQ}$`, `$\\text{period} = ${frac(total.toFixed(1), n)}$`, `$\\text{period} = ${qty(answer, 's')}$`],
    traps: [
      { value: total * n, hint: `You multiplied. For one oscillation, divide: $${T_EQ}$.` },
      { value: n / total, hint: `You divided the wrong way: $${T_EQ}$.` },
    ],
  };
}

function sheet(): Question {
  const item = pick([
    { name: 'sheets of paper', n: [100, 200, 250, 500], mm: [0.08, 0.12] },
    { name: 'cards', n: [20, 50, 100], mm: [0.25, 0.4] },
    { name: 'coins', n: [10, 20], mm: [1.5, 2.3] },
  ]);
  const n = pick(item.n);
  const each = randInt(Math.round(item.mm[0] * 100), Math.round(item.mm[1] * 100)) / 100;
  const totalCm = Number(((each * n) / 10).toFixed(2));
  const answer = (totalCm * 10) / n;
  return {
    text: `A stack of ${n} ${item.name} is ${fmt(totalCm)} cm high.`,
    given: [`number in the stack $= ${n}$`, `height of the stack $= ${qty(totalCm, 'cm')}$`],
    find: 'the thickness of one, in mm',
    answer,
    unit: 'mm',
    unitOptions: ['mm', 'cm', 'm'],
    solution: [
      `Change cm to mm: $${qty(totalCm, 'cm')} = ${qty(totalCm * 10, 'mm')}$`,
      `$\\text{thickness of one} = ${frac(totalCm * 10, n)}$`,
      `$\\text{thickness of one} = ${qty(answer, 'mm')}$`,
    ],
    traps: [
      { value: totalCm / n, hint: 'This is the thickness in cm. The question asks for mm: $1\\,\\text{cm} = 10\\,\\text{mm}$.' },
      { value: totalCm * 10 * n, hint: 'You multiplied. Divide the height of the stack by the number in the stack.' },
    ],
  };
}

function meanPeriod(): Question {
  const n = pick([10, 20]);
  const T = randInt(90, 220) / 100;
  const base = T * n;
  const times = [base - 0.1, base + 0.1, base].map((x) => Number(x.toFixed(1)));
  const mean = (times[0] + times[1] + times[2]) / 3;
  const answer = mean / n;
  return {
    text: `A student times ${n} oscillations of a pendulum, three times.`,
    given: [`times for ${n} oscillations: $${times.map((t) => qty(t.toFixed(1), 's')).join(',\\ ')}$`],
    find: 'the mean period (time for one oscillation)',
    answer,
    unit: 's',
    unitOptions: ['s', 'm', 'm/s'],
    solution: [
      `$\\text{mean time for ${n}} = \\dfrac{${times.map((t) => t.toFixed(1)).join(' + ')}}{3} = ${qty(mean, 's')}$`,
      `$\\text{period} = ${frac(mean, n)}$`,
      `$\\text{period} = ${qty(answer, 's')}$`,
    ],
    traps: [
      { value: mean, hint: `This is the mean time for ${n} oscillations. Now divide by ${n}.` },
      { value: (times[0] + times[1] + times[2]) / n, hint: 'First find the mean of the three times ($\\div 3$), then divide by the number of oscillations.' },
    ],
  };
}

export const multiplesTopic: Topic = {
  id: 'multiples',
  title: 'Measure many, then divide',
  levels: [
    { name: 'Level 1', description: 'Period of a pendulum' },
    { name: 'Level 2', description: 'Thickness of one thin object' },
    { name: 'Level 3', description: 'Mean of repeated readings' },
  ],
  generate: (level) => (level === 1 ? period() : level === 2 ? sheet() : meanPeriod()),
};
