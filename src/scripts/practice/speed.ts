// Practice questions for speed: v = s / t (syllabus 1.2 C1).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';

interface Mover {
  name: string; // "A cyclist"
  verb: string; // "rides"
  speeds: [number, number]; // whole-number range in m/s
}

const movers: Mover[] = [
  { name: 'A runner', verb: 'runs', speeds: [3, 8] },
  { name: 'A cyclist', verb: 'rides', speeds: [4, 12] },
  { name: 'A bus', verb: 'travels', speeds: [8, 20] },
  { name: 'A train', verb: 'travels', speeds: [20, 60] },
  { name: 'A horse', verb: 'runs', speeds: [5, 15] },
  { name: 'A boat', verb: 'moves', speeds: [2, 10] },
];

const SPEED_UNITS = ['m/s', 'km/h', 'm', 's', 'm·s'];
const DIST_UNITS = ['m', 'km', 's', 'm/s'];
const TIME_UNITS = ['s', 'min', 'm', 'm/s'];

const V = 'v = \\dfrac{s}{t}';

// Level 1: find the speed.
function findSpeed(): Question {
  const m = pick(movers);
  const v = randInt(...m.speeds);
  const t = randInt(2, 30) * 5;
  const s = v * t;
  return {
    text: `${m.name} ${m.verb} ${s} m in ${t} s.`,
    given: [`distance $s = ${qty(s, 'm')}$`, `time $t = ${qty(t, 's')}$`],
    find: 'the speed $v$',
    answer: v,
    unit: 'm/s',
    unitOptions: SPEED_UNITS,
    solution: [`$${V}$`, `$v = ${frac(s, t)}$`, `$v = ${qty(v, 'm/s')}$`],
    traps: [
      { value: s * t, hint: `You multiplied. For speed, divide: $${V}$.` },
      { value: t / s, hint: `You divided the wrong way. Distance goes on top: $${V}$.` },
    ],
  };
}

// Level 2: find the distance or the time.
function findDistanceOrTime(): Question {
  const m = pick(movers);
  const v = randInt(...m.speeds);
  const t = randInt(2, 20) * 5;
  const s = v * t;
  if (Math.random() < 0.5) {
    return {
      text: `${m.name} ${m.verb} at ${v} m/s for ${t} s.`,
      given: [`speed $v = ${qty(v, 'm/s')}$`, `time $t = ${qty(t, 's')}$`],
      find: 'the distance $s$',
      answer: s,
      unit: 'm',
      unitOptions: DIST_UNITS,
      solution: [
        `$${V}$, so $s = v \\times t$`,
        `$s = ${v} \\times ${t}$`,
        `$s = ${qty(s, 'm')}$`,
      ],
      traps: [
        { value: v / t, hint: 'You divided. For distance, multiply: $s = v \\times t$.' },
        { value: t / v, hint: 'For distance, multiply speed by time: $s = v \\times t$.' },
      ],
    };
  }
  return {
    text: `${m.name} ${m.verb} ${s} m at ${v} m/s.`,
    given: [`distance $s = ${qty(s, 'm')}$`, `speed $v = ${qty(v, 'm/s')}$`],
    find: 'the time $t$',
    answer: t,
    unit: 's',
    unitOptions: TIME_UNITS,
    solution: [
      `$${V}$, so $t = \\dfrac{s}{v}$`,
      `$t = ${frac(s, v)}$`,
      `$t = ${qty(t, 's')}$`,
    ],
    traps: [
      { value: s * v, hint: 'You multiplied. For time, divide: $t = \\dfrac{s}{v}$.' },
      { value: v / s, hint: 'You divided the wrong way. Distance goes on top: $t = \\dfrac{s}{v}$.' },
    ],
  };
}

// Level 3: change the units first (km, minutes, km/h).
function withUnits(): Question {
  const kind = pick(['km', 'min', 'kmh'] as const);

  if (kind === 'km') {
    const m = pick(movers.filter((x) => x.speeds[1] >= 10));
    const v = randInt(Math.max(m.speeds[0], 5), m.speeds[1]);
    const t = randInt(2, 10) * 100;
    const sKm = (v * t) / 1000;
    return {
      text: `${m.name} ${m.verb} ${fmt(sKm)} km in ${t} s.`,
      given: [`distance $s = ${qty(sKm, 'km')}$`, `time $t = ${qty(t, 's')}$`],
      find: 'the speed $v$ in m/s',
      answer: v,
      unit: 'm/s',
      unitOptions: SPEED_UNITS,
      solution: [
        `Change km to m: $${qty(sKm, 'km')} = ${fmt(sKm)} \\times 1000 = ${qty(v * t, 'm')}$`,
        `$${V}$`,
        `$v = ${frac(v * t, t)} = ${qty(v, 'm/s')}$`,
      ],
      traps: [
        { value: sKm / t, hint: 'Change km to metres first: $1\\,\\text{km} = 1000\\,\\text{m}$.' },
        { value: v * t * t, hint: `You multiplied. For speed, divide: $${V}$.` },
      ],
    };
  }

  if (kind === 'min') {
    const m = pick(movers);
    const v = randInt(...m.speeds);
    const tMin = randInt(2, 10);
    const s = v * tMin * 60;
    return {
      text: `${m.name} ${m.verb} ${s} m in ${tMin} minutes.`,
      given: [`distance $s = ${qty(s, 'm')}$`, `time $t = ${qty(tMin, 'min')}$`],
      find: 'the speed $v$ in m/s',
      answer: v,
      unit: 'm/s',
      unitOptions: SPEED_UNITS,
      solution: [
        `Change minutes to seconds: $${qty(tMin, 'min')} = ${tMin} \\times 60 = ${qty(tMin * 60, 's')}$`,
        `$${V}$`,
        `$v = ${frac(s, tMin * 60)} = ${qty(v, 'm/s')}$`,
      ],
      traps: [
        { value: s / tMin, hint: 'Change minutes to seconds first: $1\\,\\text{min} = 60\\,\\text{s}$.' },
        { value: s * tMin * 60, hint: `You multiplied. For speed, divide: $${V}$.` },
      ],
    };
  }

  // km/h to m/s: speeds in steps of 5 m/s, so the km/h value is a whole number.
  // Ranges in steps of 5 m/s keep the speeds realistic.
  const vehicle = pick([
    { name: 'A car', steps: [2, 7] }, // 36–126 km/h
    { name: 'A train', steps: [4, 16] }, // 72–288 km/h
    { name: 'A bus', steps: [2, 5] }, // 36–90 km/h
  ] as const);
  const vMs = randInt(vehicle.steps[0], vehicle.steps[1]) * 5;
  const vKmh = vMs * 3.6;
  return {
    text: `${vehicle.name} moves at ${fmt(vKmh)} km/h.`,
    given: [`speed $v = ${qty(vKmh, 'km/h')}$`],
    find: 'the speed in m/s',
    answer: vMs,
    unit: 'm/s',
    unitOptions: ['m/s', 'km/h'],
    solution: [
      '$1\\,\\text{km} = 1000\\,\\text{m}$ and $1\\,\\text{h} = 3600\\,\\text{s}$',
      `$${qty(vKmh, 'km/h')} = \\dfrac{${fmt(vKmh)} \\times 1000\\,\\text{m}}{3600\\,\\text{s}} = ${frac(vKmh, 3.6)}\\,\\text{m/s}$`,
      `$v = ${qty(vMs, 'm/s')}$`,
    ],
    traps: [
      { value: vKmh * 3.6, hint: 'From km/h to m/s, the number gets smaller. Divide by 3.6.' },
      { value: vKmh / 1000, hint: 'Change the hours too: $1\\,\\text{h} = 3600\\,\\text{s}$. In total, divide by 3.6.' },
      { value: vKmh / 60, hint: '1 hour is 3600 s, not 60 s. In total, divide by 3.6.' },
    ],
  };
}

export const speedTopic: Topic = {
  id: 'speed',
  title: 'Speed',
  levels: [
    { name: 'Level 1', description: 'Find the speed' },
    { name: 'Level 2', description: 'Find the distance or the time' },
    { name: 'Level 3', description: 'Change the units first' },
  ],
  generate: (level) => {
    if (level === 1) return findSpeed();
    if (level === 2) return findDistanceOrTime();
    return withUnits();
  },
};
