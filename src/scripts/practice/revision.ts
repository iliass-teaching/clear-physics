// Revision practice: graph skills and data skills for the practical papers (syllabus section 4).
import type { Question, Topic } from './types';
import { fmt, pick, randInt } from './random';
import { graphSvg } from '../../lib/graph';

// ---------- Graph skills ----------

function readGraph(): Question {
  const k = pick([0.4, 0.5, 0.6, 0.8, 1.2, 1.5]); // cm per N
  const xs = [0, 2, 4, 6, 8, 10];
  const xq = pick([3, 5, 7, 9]);
  const yMax = Math.ceil((k * 10) / 2) * 2 + 2;
  const fig = graphSvg({
    xLabel: 'load / N',
    yLabel: 'extension / cm',
    xMax: 10,
    yMax,
    xStep: 1,
    yStep: 1,
    points: xs.map((x) => [x, k * x] as [number, number]),
    markers: xs.slice(1).map((x) => [x, k * x] as [number, number]),
    title: 'Extension of a spring against load: a straight line through the origin.',
  });
  return {
    text: 'The graph shows the extension of a spring for different loads.',
    figure: fig,
    given: ['the graph'],
    find: `the extension when the load is ${xq} N`,
    answer: k * xq,
    unit: 'cm',
    unitOptions: ['cm', 'N', 'N/cm'],
    absTolerance: 0.15,
    solution: [`Go up from ${xq} N on the horizontal axis to the line, then across to the vertical axis.`, `extension $= ${fmt(k * xq)}\\,\\text{cm}$`],
    traps: [{ value: xq / k, hint: 'Read the vertical axis (extension), not the horizontal one.' }].filter((t) => Math.abs(t.value - k * xq) > 0.3),
  };
}

function gradient(): Question {
  const sit = pick([
    { xl: 'time / s', yl: 'distance / m', m: pick([2, 2.5, 4, 5]), xMax: 12, step: 2, find: 'the speed (the gradient)', unit: 'm/s', opts: ['m/s', 'm', 's'] },
    { xl: 'current / A', yl: 'p.d. / V', m: pick([4, 5, 8, 10]), xMax: 1.2, step: 0.2, find: 'the resistance (the gradient)', unit: 'Ω', opts: ['Ω', 'V', 'A'] },
    { xl: 'extension / m', yl: 'force / N', m: pick([20, 40, 50]), xMax: 0.3, step: 0.05, find: 'the spring constant (the gradient)', unit: 'N/m', opts: ['N/m', 'N', 'm'] },
  ]);
  const step = sit.step;
  const xs = Array.from({ length: 7 }, (_, i) => +(i * step).toFixed(4));
  const yMaxRaw = sit.m * sit.xMax;
  const yStep = yMaxRaw <= 12 ? 1 : yMaxRaw <= 30 ? 5 : 10;
  const yMax = Math.ceil(yMaxRaw / yStep) * yStep;
  const x1 = xs[1];
  const x2 = xs[5];
  const fig = graphSvg({
    xLabel: sit.xl,
    yLabel: sit.yl,
    xMax: sit.xMax,
    yMax,
    xStep: step,
    yStep,
    points: [[0, 0], [sit.xMax, sit.m * sit.xMax]],
    markers: xs.slice(1).map((x) => [x, sit.m * x] as [number, number]),
    title: 'A straight line through the origin.',
  });
  return {
    text: 'Use the graph to find the gradient. Use a big triangle (at least half the line).',
    figure: fig,
    given: ['the graph'],
    find: sit.find,
    answer: sit.m,
    unit: sit.unit,
    unitOptions: sit.opts,
    tolerance: 0.04,
    solution: [
      `Choose two points far apart on the line, for example $(${fmt(x1)}, ${fmt(sit.m * x1)})$ and $(${fmt(x2)}, ${fmt(sit.m * x2)})$.`,
      `gradient $= \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{${fmt(sit.m * x2)} - ${fmt(sit.m * x1)}}{${fmt(x2)} - ${fmt(x1)}}$`,
      `gradient $= ${fmt(sit.m)}$ ${sit.unit}`,
    ],
    traps: [{ value: 1 / sit.m, hint: 'Gradient = change on the vertical axis ÷ change on the horizontal axis.' }],
  };
}

function intercept(): Question {
  const sit = pick([
    { xl: 'load / N', yl: 'length of spring / cm', L0: pick([4, 5, 6, 8]), k: pick([0.5, 1, 1.5]), xs: [2, 4, 6, 8, 10], what: 'the length of the spring with no load (the intercept)', unit: 'cm' },
    { xl: 'time / min', yl: 'temperature / °C', L0: pick([20, 22, 25]), k: pick([3, 4, 5]), xs: [2, 4, 6, 8, 10], what: 'the temperature at the start, time = 0 (the intercept)', unit: '°C' },
  ]);
  const yTop = sit.L0 + sit.k * 10;
  const yStep = yTop <= 20 ? 2 : 10;
  const yMax = Math.ceil(yTop / yStep) * yStep + yStep;
  const fig = graphSvg({
    xLabel: sit.xl,
    yLabel: sit.yl,
    xMax: 10,
    yMax,
    xStep: 1,
    yStep,
    points: sit.xs.map((x) => [x, sit.L0 + sit.k * x] as [number, number]),
    markers: sit.xs.map((x) => [x, sit.L0 + sit.k * x] as [number, number]),
    title: 'A straight line that does not start at the origin.',
  });
  return {
    text: 'The line starts at the first measurement. Extend it (extrapolate) back to the vertical axis.',
    figure: fig,
    given: ['the graph'],
    find: sit.what,
    answer: sit.L0,
    unit: sit.unit,
    unitOptions: [sit.unit, sit.unit === 'cm' ? 'N' : 'min'],
    absTolerance: yStep / 4,
    solution: [
      'Extend the straight line with a ruler to where the horizontal value is 0.',
      `Each step of ${sit.xs[1] - sit.xs[0]} on the horizontal axis changes the value by ${fmt(sit.k * 2)}. Go back one step from the first point: $${fmt(sit.L0 + sit.k * 2)} - ${fmt(sit.k * 2)} = ${sit.L0}$`,
      `intercept $= ${sit.L0}$ ${sit.unit}`,
    ],
    traps: [{ value: sit.L0 + sit.k * 2, hint: 'This is the first measured point. Extend the line back to 0 on the horizontal axis.' }],
  };
}

export const graphSkillsTopic: Topic = {
  id: 'graph-skills',
  title: 'Graph skills',
  levels: [
    { name: 'Level 1', description: 'Read a value from a graph' },
    { name: 'Level 2', description: 'Gradient of a straight line' },
    { name: 'Level 3', description: 'Extrapolate to find an intercept' },
  ],
  generate: (level) => (level === 1 ? readGraph() : level === 2 ? gradient() : intercept()),
};

// ---------- Data skills ----------

function meanWithAnomaly(): Question {
  // 10 swings of a 0.4–1.0 m pendulum take about 12–20 s
  const base = pick([12.6, 14.2, 16.4, 19.8]);
  const vals = [0, 1, 2].map(() => +(base + (randInt(-12, 12) / 100)).toFixed(2));
  const anomaly = +(base * pick([1.3, 0.7])).toFixed(2);
  const all = [...vals];
  all.splice(randInt(0, 3), 0, anomaly);
  const mean = vals.reduce((a, b) => a + b, 0) / 3;
  return {
    text: `A student times 10 swings of a pendulum four times: ${all.map((v) => `${v.toFixed(2)} s`).join(', ')}.`,
    given: all.map((v, k) => `$t_${k + 1} = ${v.toFixed(2)}\\,\\text{s}$`),
    find: 'the mean time for 10 swings (leave out any anomalous result)',
    answer: mean,
    unit: 's',
    unitOptions: ['s', 'min', 'm'],
    absTolerance: 0.006,
    solution: [
      `${anomaly.toFixed(2)} s is far from the others: it is anomalous. Leave it out.`,
      `mean $= \\dfrac{${vals.map((v) => v.toFixed(2)).join(' + ')}}{3} = ${mean.toFixed(2)}\\,\\text{s}$`,
    ],
    traps: [{ value: (vals.reduce((a, b) => a + b, 0) + anomaly) / 4, hint: 'One result does not fit the pattern (an anomaly). Leave it out.' }],
  };
}

function percentDifference(): Question {
  const sit = pick([
    { what: 'the acceleration of free fall', exp: 9.8, unit: 'm/s²' },
    { what: 'the speed of sound in air', exp: 340, unit: 'm/s' },
    { what: 'the density of aluminium', exp: 2.7, unit: 'g/cm³' },
    { what: 'the specific heat capacity of water', exp: 4200, unit: 'J/(kg °C)' },
  ]);
  const pct = pick([2, 4, 5, 8, 12, 15]) * pick([1, -1]);
  const meas = +(sit.exp * (1 + pct / 100)).toPrecision(3);
  const diff = (Math.abs(meas - sit.exp) / sit.exp) * 100;
  return {
    text: `A student measures ${sit.what}: ${meas} ${sit.unit}. The value in a data book is ${sit.exp} ${sit.unit}.`,
    given: [`measured: ${meas} ${sit.unit}`, `expected: ${sit.exp} ${sit.unit}`],
    find: 'the percentage difference from the expected value',
    answer: diff,
    unit: '%',
    unitOptions: ['%', sit.unit],
    absTolerance: 0.3,
    solution: [
      `percentage difference $= \\dfrac{|\\text{measured} - \\text{expected}|}{\\text{expected}} \\times 100\\%$`,
      `$= \\dfrac{|${meas} - ${sit.exp}|}{${sit.exp}} \\times 100\\% = ${diff.toFixed(1)}\\%$`,
      diff <= 10 ? 'This is within 10%: the results agree within the limits of experimental accuracy.' : 'This is more than 10%: the results do not agree within the limits of experimental accuracy.',
    ],
    traps: [{ value: (Math.abs(meas - sit.exp) / meas) * 100, hint: 'Divide by the expected value, not the measured value.' }].filter((t) => Math.abs(t.value - diff) > 0.3),
  };
}

function zeroError(): Question {
  const sit = pick([
    { inst: 'A force meter', unit: 'N', z: pick([0.2, 0.3, -0.2]), r: pick([3.6, 4.2, 5.8]) },
    { inst: 'An ammeter', unit: 'A', z: pick([0.04, -0.02, 0.06]), r: pick([0.48, 0.72, 0.9]) },
    { inst: 'A balance', unit: 'g', z: pick([1.5, -0.5, 2.0]), r: pick([48.5, 63.0, 120.5]) },
  ]);
  const corr = sit.r - sit.z;
  return {
    text: `${sit.inst} reads ${sit.z > 0 ? '' : '−'}${Math.abs(sit.z)} ${sit.unit} when nothing is being measured. During the experiment, it reads ${sit.r} ${sit.unit}.`,
    given: [`zero error $= ${sit.z > 0 ? '+' : '−'}${Math.abs(sit.z)}$ ${sit.unit}`, `reading $= ${sit.r}$ ${sit.unit}`],
    find: 'the correct value',
    answer: corr,
    unit: sit.unit,
    unitOptions: [sit.unit, '%'],
    absTolerance: Math.abs(sit.z) / 10,
    solution: [
      'correct value = reading − zero error',
      `$= ${sit.r} - (${sit.z > 0 ? '' : '−'}${Math.abs(sit.z)}) = ${fmt(corr)}$ ${sit.unit}`,
    ],
    traps: [{ value: sit.r + sit.z, hint: 'Subtract the zero error (if the zero error is negative, subtracting it adds).' }],
  };
}

export const dataSkillsTopic: Topic = {
  id: 'data-skills',
  title: 'Data skills',
  levels: [
    { name: 'Level 1', description: 'Mean, without the anomaly' },
    { name: 'Level 2', description: 'Percentage difference' },
    { name: 'Level 3', description: 'Zero errors' },
  ],
  generate: (level) => (level === 1 ? meanWithAnomaly() : level === 2 ? percentDifference() : zeroError()),
};
