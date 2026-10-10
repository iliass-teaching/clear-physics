// Speed–time graphs: distance from the area (1.2 C7), acceleration from the gradient (1.2 S11, S12).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty } from './random';
import { graphSvg } from '../../lib/graph';

const DIST_UNITS = ['m', 'm/s', 'm/s²', 's'];
const ACC_UNITS = ['m/s²', 'm/s', 'm', 's'];
const GRAD = 'a = \\text{gradient} = \\dfrac{\\Delta v}{\\Delta t}';
const TRI = '\\text{area} = \\tfrac{1}{2} \\times \\text{base} \\times \\text{height}';

function areaSimple(): Question {
  const v = pick([4, 6, 8, 10, 12]);
  const T = pick([4, 6, 8, 10]);
  const rect = Math.random() < 0.5;
  const s = rect ? v * T : (v * T) / 2;
  const figure = graphSvg({
    xLabel: 'time / s', yLabel: 'speed / (m/s)',
    xMax: 10, yMax: 12, xStep: 2, yStep: 2,
    points: rect ? [[0, v], [T, v]] : [[0, 0], [T, v]],
    shade: true,
  });
  return {
    text: rect
      ? 'The graph shows a cyclist moving at constant speed.'
      : 'The graph shows a car that starts from rest and speeds up.',
    figure,
    given: ['the graph'],
    find: `the distance travelled in the first ${T} s`,
    answer: s,
    unit: 'm',
    unitOptions: DIST_UNITS,
    solution: rect
      ? [
          'distance = area under the graph',
          'The shape is a rectangle: $\\text{area} = \\text{base} \\times \\text{height}$',
          `$s = ${T} \\times ${v} = ${qty(s, 'm')}$`,
        ]
      : [
          'distance = area under the graph',
          `The shape is a triangle: $${TRI}$`,
          `$s = \\tfrac{1}{2} \\times ${T} \\times ${v} = ${qty(s, 'm')}$`,
        ],
    traps: rect
      ? [{ value: v / T, hint: 'Distance is the area under the graph, not the gradient.' }]
      : [
          { value: v * T, hint: `The shape is a triangle, not a rectangle: $${TRI}$.` },
          { value: v / T, hint: 'This is the gradient (the acceleration). Distance is the area under the graph.' },
        ],
  };
}

interface Trip {
  t: [number, number, number, number];
  v: number;
}

function trip(): Trip {
  const v = pick([4, 6, 8, 10, 12]);
  const t1 = pick([2, 4, 6]);
  const t2 = t1 + pick([4, 6, 8]);
  const t3 = Math.min(t2 + pick([2, 4, 6]), 20);
  return { t: [0, t1, t2, t3], v };
}

function tripGraph(tr: Trip): string {
  return graphSvg({
    xLabel: 'time / s', yLabel: 'speed / (m/s)',
    xMax: 20, yMax: 12, xStep: 2, yStep: 2,
    points: [[0, 0], [tr.t[1], tr.v], [tr.t[2], tr.v], [tr.t[3], 0]],
    labels: [
      { x: tr.t[1] / 2 - 1, y: tr.v / 2 + 1.5, text: 'A' },
      { x: (tr.t[1] + tr.t[2]) / 2, y: tr.v + 0.8, text: 'B' },
      { x: (tr.t[2] + tr.t[3]) / 2 + 1, y: tr.v / 2 + 1.5, text: 'C' },
    ],
  });
}

function acceleration(): Question {
  const tr = trip();
  const partC = Math.random() < 0.5;
  const dt = partC ? tr.t[3] - tr.t[2] : tr.t[1];
  const a = partC ? -tr.v / dt : tr.v / dt;
  return {
    text: 'The graph shows a bus between two stops: A, B and C.',
    figure: tripGraph(tr),
    given: ['the graph'],
    find: `the acceleration in part ${partC ? 'C' : 'A'}`,
    answer: a,
    unit: 'm/s²',
    unitOptions: ACC_UNITS,
    solution: partC
      ? [
          `$${GRAD}$`,
          `$\\Delta v = 0 - ${tr.v} = -${qty(tr.v, 'm/s')}$, $\\Delta t = ${tr.t[3]} - ${tr.t[2]} = ${qty(dt, 's')}$`,
          `$a = ${frac(-tr.v, dt)} = ${qty(a, 'm/s²')}$ (negative: the bus slows down)`,
        ]
      : [
          `$${GRAD}$`,
          `$\\Delta v = ${tr.v} - 0 = ${qty(tr.v, 'm/s')}$, $\\Delta t = ${dt} - 0 = ${qty(dt, 's')}$`,
          `$a = ${frac(tr.v, dt)} = ${qty(a, 'm/s²')}$`,
        ],
    traps: partC
      ? [
          { value: -a, hint: 'The speed goes down, so the acceleration is negative. This is a deceleration.' },
          { value: tr.v / tr.t[3], hint: 'Use only part C: the change in speed and the change in time for this part.' },
        ]
      : [{ value: dt / tr.v, hint: `You divided the wrong way: $${GRAD}$.` }],
  };
}

function totalDistance(): Question {
  const tr = trip();
  const sA = (tr.v * tr.t[1]) / 2;
  const sB = tr.v * (tr.t[2] - tr.t[1]);
  const sC = (tr.v * (tr.t[3] - tr.t[2])) / 2;
  const s = sA + sB + sC;
  return {
    text: 'The graph shows a bus between two stops.',
    figure: tripGraph(tr),
    given: ['the graph'],
    find: 'the total distance between the two stops',
    answer: s,
    unit: 'm',
    unitOptions: DIST_UNITS,
    solution: [
      'distance = area under the whole graph. Split it into A, B and C.',
      `$A = \\tfrac{1}{2} \\times ${tr.t[1]} \\times ${tr.v} = ${qty(sA, 'm')}$, ` +
        `$B = ${tr.t[2] - tr.t[1]} \\times ${tr.v} = ${qty(sB, 'm')}$, ` +
        `$C = \\tfrac{1}{2} \\times ${tr.t[3] - tr.t[2]} \\times ${tr.v} = ${qty(sC, 'm')}$`,
      `$s = ${fmt(sA)} + ${sB} + ${fmt(sC)} = ${qty(s, 'm')}$`,
    ],
    traps: [
      { value: tr.v * tr.t[3], hint: `The graph is not one big rectangle. Parts A and C are triangles: $${TRI}$.` },
      { value: sB, hint: 'This is only part B. Add the areas of the triangles A and C.' },
      { value: tr.v * tr.t[1] + sB + tr.v * (tr.t[3] - tr.t[2]), hint: `A and C are triangles: $${TRI}$.` },
    ],
  };
}

export const stGraphTopic: Topic = {
  id: 'st-graph',
  title: 'Speed–time graphs',
  levels: [
    { name: 'Level 1', description: 'Distance from the area (one shape)' },
    { name: 'Level 2', description: 'Acceleration from the gradient (Extended)' },
    { name: 'Level 3', description: 'Total distance (several shapes)' },
  ],
  generate: (level) => (level === 1 ? areaSimple() : level === 2 ? acceleration() : totalDistance()),
};
