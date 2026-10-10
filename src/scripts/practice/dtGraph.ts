// Distance–time graphs: speed from the gradient (syllabus 1.2 C4-C6).
import type { Question, Topic } from './types';
import { frac, pick, qty, randInt } from './random';
import { graphSvg } from '../../lib/graph';

const UNITS = ['m/s', 'm', 's', 'm/s²'];
const GRAD = '\\text{speed} = \\text{gradient} = \\dfrac{\\text{change in distance}}{\\text{change in time}}';
const AVG = '\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}';

function oneLine(): Question {
  const T = pick([10, 20, 50]);
  const v = pick([2, 3, 4, 5, 6, 8]);
  const tEnd = (T * pick([3, 4, 5])) / 5; // ends on a grid line
  const dEnd = v * tEnd;
  const yMax = v * T;
  const figure = graphSvg({
    xLabel: 'time / s', yLabel: 'distance / m',
    xMax: T, yMax, xStep: T / 5, yStep: yMax / 5,
    points: [[0, 0], [tEnd, dEnd]],
  });
  return {
    text: 'The graph shows the motion of a toy car.',
    figure,
    given: ['the graph'],
    find: 'the speed of the car',
    answer: v,
    unit: 'm/s',
    unitOptions: UNITS,
    solution: [
      `$${GRAD}$`,
      `Use the start $(0\\,\\text{s},\\ 0\\,\\text{m})$ and the end $(${qty(tEnd, 's')},\\ ${qty(dEnd, 'm')})$.`,
      `$\\text{speed} = \\dfrac{${dEnd} - 0}{${tEnd} - 0} = ${qty(v, 'm/s')}$`,
    ],
    traps: [{ value: tEnd / dEnd, hint: `You divided the wrong way: $${GRAD}$.` }],
  };
}

interface Journey {
  t: [number, number, number, number];
  d: [number, number, number, number];
}

function journey(): Journey {
  const t1 = pick([10, 20]);
  const t2 = t1 + pick([10, 20]);
  const t3 = t2 + pick([10, 20]);
  const d1 = pick([50, 100, 150]);
  const d3 = d1 + pick([50, 100, 150]);
  return { t: [0, t1, t2, t3], d: [0, d1, d1, d3] };
}

function journeyGraph(j: Journey): string {
  const mid = (i: number) => (j.t[i] + j.t[i + 1]) / 2;
  const lift = 20;
  return graphSvg({
    xLabel: 'time / s', yLabel: 'distance / m',
    xMax: 60, yMax: 300, xStep: 10, yStep: 50,
    points: j.t.map((t, i) => [t, j.d[i]] as [number, number]),
    labels: [0, 1, 2].map((i) => ({ x: mid(i) - 2, y: (j.d[i] + j.d[i + 1]) / 2 + lift, text: 'ABC'[i] })),
  });
}

function segmentSpeed(): Question {
  const j = journey();
  const i = randInt(0, 2);
  const part = 'ABC'[i];
  const dt = j.t[i + 1] - j.t[i];
  const dd = j.d[i + 1] - j.d[i];
  const v = dd / dt;
  const traps: Question['traps'] = [];
  if (i > 0 && j.d[i + 1] !== 0) {
    traps.push({
      value: j.d[i + 1] / j.t[i + 1],
      hint: `Use only part ${part}: the change in distance and the change in time for this part.`,
    });
  }
  if (dd !== 0) traps.push({ value: dt / dd, hint: `You divided the wrong way: $${GRAD}$.` });
  return {
    text: 'The graph shows a cycle ride in three parts: A, B and C.',
    figure: journeyGraph(j),
    given: ['the graph'],
    find: `the speed in part ${part}`,
    answer: v,
    unit: 'm/s',
    unitOptions: UNITS,
    solution: [
      `Part ${part} goes from $(${qty(j.t[i], 's')},\\ ${qty(j.d[i], 'm')})$ to $(${qty(j.t[i + 1], 's')},\\ ${qty(j.d[i + 1], 'm')})$.`,
      `$\\text{speed} = \\dfrac{${j.d[i + 1]} - ${j.d[i]}}{${j.t[i + 1]} - ${j.t[i]}} = ${frac(dd, dt)}$`,
      dd === 0
        ? '$\\text{speed} = 0\\,\\text{m/s}$. The line is flat: the cyclist is at rest.'
        : `$\\text{speed} = ${qty(v, 'm/s')}$`,
    ],
    traps,
  };
}

function averageFromGraph(): Question {
  const j = journey();
  const avg = j.d[3] / j.t[3];
  const vA = j.d[1] / j.t[1];
  const vC = (j.d[3] - j.d[2]) / (j.t[3] - j.t[2]);
  return {
    text: 'The graph shows a cycle ride in three parts: A, B and C.',
    figure: journeyGraph(j),
    given: ['the graph'],
    find: 'the average speed for the whole ride',
    answer: avg,
    unit: 'm/s',
    unitOptions: UNITS,
    solution: [
      `$\\text{total distance} = ${qty(j.d[3], 'm')}$ (the end of the line)`,
      `$\\text{total time} = ${qty(j.t[3], 's')}$`,
      `$\\text{average speed} = ${frac(j.d[3], j.t[3])} = ${qty(avg, 'm/s')}$`,
    ],
    traps: [
      { value: (vA + 0 + vC) / 3, hint: `Do not take the mean of the three speeds. Use $${AVG}$.` },
      { value: (vA + vC) / 2, hint: `Do not take the mean of the speeds. Use $${AVG}$.` },
    ],
  };
}

export const dtGraphTopic: Topic = {
  id: 'dt-graph',
  title: 'Distance–time graphs',
  levels: [
    { name: 'Level 1', description: 'Speed from a straight line' },
    { name: 'Level 2', description: 'Speed in one part of a journey' },
    { name: 'Level 3', description: 'Average speed from a graph' },
  ],
  generate: (level) => (level === 1 ? oneLine() : level === 2 ? segmentSpeed() : averageFromGraph()),
};
