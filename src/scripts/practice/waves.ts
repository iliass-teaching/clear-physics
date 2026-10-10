// Unit 9 practice: wave speed v = f λ (3.1 C4), and reading a wave diagram (3.1 C3).
import type { Question, Topic } from './types';
import { fmt, pick, qty, randInt } from './random';
import { graphSvg } from '../../lib/graph';

const V_EQ = 'v = f\\lambda';

function speedFromFL(): Question {
  const sit = pick([
    { text: (f: number, l: number) => `Waves travel along a rope. Their frequency is ${f} Hz and their wavelength is ${l} m.`, f: [2, 3, 4, 5], l: [0.4, 0.5, 0.8, 1.2, 1.5] },
    { text: (f: number, l: number) => `Waves on the sea have a frequency of ${f} Hz and a wavelength of ${l} m.`, f: [0.1, 0.2, 0.25, 0.5], l: [6, 8, 10, 20, 40] },
    { text: (f: number, l: number) => `Water waves in a ripple tank have a frequency of ${f} Hz and a wavelength of ${l} m.`, f: [5, 8, 10, 12, 20], l: [0.01, 0.015, 0.02, 0.025] },
  ]);
  const f = pick(sit.f);
  const l = pick(sit.l);
  const v = f * l;
  return {
    text: sit.text(f, l),
    given: [`$f = ${qty(f, 'Hz')}$`, `$\\lambda = ${qty(l, 'm')}$`],
    find: 'the wave speed $v$',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'Hz', 'm', 's'],
    solution: [`$${V_EQ}$`, `$v = ${f} \\times ${l}$`, `$v = ${qty(v, 'm/s')}$`],
    traps: [
      { value: f / l, hint: `Multiply: $${V_EQ}$.` },
      { value: l / f, hint: `Multiply: $${V_EQ}$.` },
    ],
  };
}

function frequencyOrWavelength(): Question {
  const kind = pick(['sound-l', 'sound-f', 'radio']);
  if (kind === 'sound-l') {
    const f = pick([170, 425, 680, 850, 1360, 3400]);
    const l = 340 / f;
    return {
      text: `A loudspeaker makes a sound with a frequency of ${f} Hz. The speed of sound in air is 340 m/s.`,
      given: [`$f = ${qty(f, 'Hz')}$`, `$v = ${qty(340, 'm/s')}$`],
      find: 'the wavelength $\\lambda$',
      answer: l,
      unit: 'm',
      unitOptions: ['m', 'Hz', 'm/s', 's'],
      solution: [`$${V_EQ}$, so $\\lambda = \\dfrac{v}{f}$`, `$\\lambda = \\dfrac{340}{${f}}$`, `$\\lambda = ${qty(l, 'm')}$`],
      traps: [
        { value: 340 * f, hint: 'Divide: $\\lambda = \\dfrac{v}{f}$.' },
        { value: f / 340, hint: 'Divide the speed by the frequency: $\\lambda = \\dfrac{v}{f}$.' },
      ],
    };
  }
  if (kind === 'sound-f') {
    const l = pick([0.17, 0.34, 0.5, 0.68, 1.7, 3.4]);
    const f = 340 / l;
    return {
      text: `A sound wave in air has a wavelength of ${l} m. The speed of sound in air is 340 m/s.`,
      given: [`$\\lambda = ${qty(l, 'm')}$`, `$v = ${qty(340, 'm/s')}$`],
      find: 'the frequency $f$',
      answer: f,
      unit: 'Hz',
      unitOptions: ['Hz', 'm', 'm/s', 's'],
      solution: [`$${V_EQ}$, so $f = \\dfrac{v}{\\lambda}$`, `$f = \\dfrac{340}{${l}}$`, `$f = ${qty(f, 'Hz')}$`],
      traps: [
        { value: 340 * l, hint: 'Divide: $f = \\dfrac{v}{\\lambda}$.' },
        { value: l / 340, hint: 'Divide the speed by the wavelength: $f = \\dfrac{v}{\\lambda}$.' },
      ],
    };
  }
  const fMHz = pick([75, 88, 96, 100, 150, 200]);
  const l = 3e8 / (fMHz * 1e6);
  return {
    text: `A radio station sends radio waves with a frequency of ${fMHz} MHz. Radio waves travel at $3.0 \\times 10^8$ m/s.`,
    given: [`$f = ${fMHz}\\,\\text{MHz} = ${fMHz} \\times 10^6\\,\\text{Hz}$`, `$v = 3.0 \\times 10^8\\,\\text{m/s}$`],
    find: 'the wavelength $\\lambda$',
    answer: l,
    unit: 'm',
    unitOptions: ['m', 'Hz', 'm/s', 'km'],
    solution: [
      `$${V_EQ}$, so $\\lambda = \\dfrac{v}{f}$`,
      `$\\lambda = \\dfrac{3.0 \\times 10^8}{${fMHz} \\times 10^6}$`,
      `$\\lambda = ${qty(l, 'm')}$`,
    ],
    traps: [{ value: 3e8 / fMHz, hint: 'Change MHz to Hz first: 1 MHz = $10^6$ Hz.' }],
  };
}

function waveGraph(): Question {
  const l = pick([0.4, 0.5, 0.8, 1.0, 2.0]);
  const A = pick([2, 3, 4, 5]);
  const n = 3;
  const pts: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    const x = (n * l * i) / 120;
    pts.push([x, A * Math.sin((2 * Math.PI * x) / l)]);
  }
  const figure = graphSvg({
    xLabel: 'distance / m',
    yLabel: 'displacement / cm',
    xMax: n * l,
    yMin: -6,
    yMax: 6,
    xStep: l / 2,
    yStep: 2,
    points: pts,
    title: `A wave: ${n} full waves. Displacement against distance.`,
  });
  if (Math.random() < 0.3) {
    return {
      text: 'The graph shows a wave on a rope at one moment.',
      figure,
      given: ['the graph'],
      find: 'the amplitude of the wave',
      answer: A,
      unit: 'cm',
      unitOptions: ['cm', 'm', 'Hz', 'm/s'],
      absTolerance: 0.25,
      solution: ['The amplitude is the distance from the middle line (displacement 0) to a crest.', `amplitude $= ${qty(A, 'cm')}$`],
      traps: [{ value: 2 * A, hint: 'This is from a trough to a crest. Measure from the middle line to a crest.' }],
    };
  }
  const f = pick([2, 4, 5, 10]);
  const v = f * l;
  return {
    text: `The graph shows a wave on a rope at one moment. The frequency of the wave is ${f} Hz.`,
    figure,
    given: [`$f = ${qty(f, 'Hz')}$`, 'the wavelength: read it on the graph'],
    find: 'the wave speed $v$',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'Hz', 'm', 'cm'],
    solution: [
      `One full wave (crest to next crest) is ${fmt(l)} m long: $\\lambda = ${qty(l, 'm')}$`,
      `$${V_EQ} = ${f} \\times ${l}$`,
      `$v = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: (f * l) / 2, hint: 'One wavelength is a full wave: from a crest to the next crest, not half a wave.' },
      { value: f * n * l, hint: 'The graph shows several waves. Use the length of one full wave.' },
    ],
  };
}

function countingWaves(): Question {
  const T = pick([2, 4, 5, 8]);
  const count = randInt(5, 15);
  const time = T * count;
  const l = pick([4, 6, 8, 10, 12]);
  const f = count / time;
  const v = f * l;
  return {
    text: `A girl on a boat counts ${count} crests passing the boat in ${time} s. The distance between two crests is ${l} m.`,
    given: [`${count} waves in $${time}\\,\\text{s}$`, `$\\lambda = ${qty(l, 'm')}$`],
    find: 'the speed of the waves',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'Hz', 'm', 's'],
    solution: [
      `Frequency = number of waves each second: $f = \\dfrac{${count}}{${time}} = ${qty(f, 'Hz')}$`,
      `$${V_EQ} = ${fmt(f)} \\times ${l}$`,
      `$v = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: count * l, hint: 'First find the frequency: the number of waves in one second.' },
      { value: (time / count) * l, hint: 'The frequency is waves ÷ time, not time ÷ waves.' },
    ],
  };
}

export const waveSpeedTopic: Topic = {
  id: 'wave-speed',
  title: 'Wave speed',
  levels: [
    { name: 'Level 1', description: 'Speed from frequency and wavelength' },
    { name: 'Level 2', description: 'Find the frequency or the wavelength' },
    { name: 'Level 3', description: 'Read a wave graph, count waves' },
  ],
  generate: (level) =>
    level === 1 ? speedFromFL() : level === 2 ? frequencyOrWavelength() : Math.random() < 0.6 ? waveGraph() : countingWaves(),
};
