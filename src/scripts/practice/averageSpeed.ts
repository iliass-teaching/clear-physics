// Average speed = total distance ÷ total time (syllabus 1.2 C3).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';

const SPEED_UNITS = ['m/s', 'km/h', 'm', 's'];
const AVG = '\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}';
const MEAN_HINT = `Do not take the mean of the two speeds. Use $${AVG}$.`;

function twoStages(): Question {
  const who = pick([
    { first: 'A cyclist rides', then: 'Then she rides' },
    { first: 'A runner runs', then: 'Then he runs' },
    { first: 'A bus travels', then: 'Then it travels' },
  ]);
  const v1 = randInt(3, 12);
  let v2 = randInt(3, 12);
  if (v1 === v2) v2 += 2;
  const t1 = randInt(2, 12) * 10;
  let t2 = randInt(2, 12) * 10;
  if (t2 === t1) t2 += 20;
  const s1 = v1 * t1;
  const s2 = v2 * t2;
  const avg = (s1 + s2) / (t1 + t2);
  return {
    text: `${who.first} ${s1} m in ${t1} s. ${who.then} ${s2} m in ${t2} s.`,
    given: [`part 1: $${qty(s1, 'm')}$ in $${qty(t1, 's')}$`, `part 2: $${qty(s2, 'm')}$ in $${qty(t2, 's')}$`],
    find: 'the average speed for the whole journey',
    answer: avg,
    unit: 'm/s',
    unitOptions: SPEED_UNITS,
    solution: [
      `$\\text{total distance} = ${s1} + ${s2} = ${qty(s1 + s2, 'm')}$`,
      `$\\text{total time} = ${t1} + ${t2} = ${qty(t1 + t2, 's')}$`,
      `$\\text{average speed} = ${frac(s1 + s2, t1 + t2)} = ${qty(avg, 'm/s')}$`,
    ],
    traps: [{ value: (v1 + v2) / 2, hint: MEAN_HINT }],
  };
}

function withStop(): Question {
  const v1 = randInt(4, 12);
  const v2 = randInt(4, 12);
  const t1 = randInt(3, 10) * 20;
  const tStop = randInt(1, 6) * 20;
  const t2 = randInt(3, 10) * 20;
  const s1 = v1 * t1;
  const s2 = v2 * t2;
  const total = t1 + tStop + t2;
  const avg = (s1 + s2) / total;
  return {
    text: `A car travels ${s1} m in ${t1} s. It stops at traffic lights for ${tStop} s. Then it travels ${s2} m in ${t2} s.`,
    given: [
      `part 1: $${qty(s1, 'm')}$ in $${qty(t1, 's')}$`,
      `stop: $${qty(tStop, 's')}$`,
      `part 2: $${qty(s2, 'm')}$ in $${qty(t2, 's')}$`,
    ],
    find: 'the average speed for the whole journey',
    answer: avg,
    unit: 'm/s',
    unitOptions: SPEED_UNITS,
    solution: [
      `$\\text{total distance} = ${s1} + ${s2} = ${qty(s1 + s2, 'm')}$`,
      `$\\text{total time} = ${t1} + ${tStop} + ${t2} = ${qty(total, 's')}$ (the stop counts!)`,
      `$\\text{average speed} = ${frac(s1 + s2, total)} = ${qty(avg, 'm/s')}$`,
    ],
    traps: [
      { value: (s1 + s2) / (t1 + t2), hint: 'The stop is part of the journey. Add the stopping time to the total time.' },
      { value: (v1 + v2) / 2, hint: MEAN_HINT },
    ],
  };
}

function kmAndMinutes(): Question {
  // Distances in km and times in minutes; answer in km/h.
  const d1 = randInt(2, 12) * 2;
  const d2 = randInt(2, 12) * 2;
  const m1 = pick([10, 15, 20, 30]);
  // Different times, otherwise the mean of the two speeds would also be correct.
  const m2 = pick([10, 15, 20, 30, 45].filter((m) => m !== m1));
  const hours = (m1 + m2) / 60;
  const avg = (d1 + d2) / hours;
  return {
    text: `A bus travels ${d1} km in ${m1} minutes. Then it travels ${d2} km in ${m2} minutes.`,
    given: [`part 1: $${qty(d1, 'km')}$ in $${qty(m1, 'min')}$`, `part 2: $${qty(d2, 'km')}$ in $${qty(m2, 'min')}$`],
    find: 'the average speed in km/h',
    answer: avg,
    unit: 'km/h',
    unitOptions: SPEED_UNITS,
    solution: [
      `$\\text{total distance} = ${d1} + ${d2} = ${qty(d1 + d2, 'km')}$`,
      `$\\text{total time} = ${m1} + ${m2} = ${qty(m1 + m2, 'min')} = ${frac(m1 + m2, 60)}\\,\\text{h} = ${qty(hours, 'h')}$`,
      `$\\text{average speed} = ${frac(d1 + d2, fmt(hours))} = ${qty(avg, 'km/h')}$`,
    ],
    traps: [
      { value: (d1 + d2) / (m1 + m2), hint: 'This is in km per minute. Change the time to hours: $60\\,\\text{min} = 1\\,\\text{h}$.' },
      { value: (d1 / (m1 / 60) + d2 / (m2 / 60)) / 2, hint: MEAN_HINT },
    ],
  };
}

export const averageSpeedTopic: Topic = {
  id: 'average-speed',
  title: 'Average speed',
  levels: [
    { name: 'Level 1', description: 'Two parts of a journey' },
    { name: 'Level 2', description: 'A journey with a stop' },
    { name: 'Level 3', description: 'km and minutes' },
  ],
  generate: (level) => (level === 1 ? twoStages() : level === 2 ? withStop() : kmAndMinutes()),
};
