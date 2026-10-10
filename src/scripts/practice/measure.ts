// Reading instruments: ruler, measuring cylinder, stopwatch (syllabus 1.1 C1-C2).
import type { Question, Topic } from './types';
import { fmt, pick, qty, randInt } from './random';

function rulerSvg(startMm: number, endMm: number): string {
  const x0 = 20;
  const pxPerMm = 3.2; // 10 cm = 320 px
  const parts: string[] = [];
  parts.push(`<rect class="ink" x="${x0 - 8}" y="52" width="${100 * pxPerMm + 16}" height="34" rx="3"/>`);
  for (let mm = 0; mm <= 100; mm++) {
    const x = x0 + mm * pxPerMm;
    const h = mm % 10 === 0 ? 16 : mm % 5 === 0 ? 11 : 6;
    parts.push(`<line class="soft" x1="${x}" y1="52" x2="${x}" y2="${52 + h}"/>`);
    if (mm % 10 === 0) parts.push(`<text class="txt" x="${x}" y="82" text-anchor="middle">${mm / 10}</text>`);
  }
  parts.push(`<text class="txt" x="${x0 + 100 * pxPerMm + 4}" y="82">cm</text>`);
  const xa = x0 + startMm * pxPerMm;
  const xb = x0 + endMm * pxPerMm;
  parts.push(`<rect class="obj" x="${xa}" y="18" width="${xb - xa}" height="22" rx="3"/>`);
  parts.push(`<line class="dash" x1="${xa}" y1="40" x2="${xa}" y2="52"/>`);
  parts.push(`<line class="dash" x1="${xb}" y1="40" x2="${xb}" y2="52"/>`);
  return `<svg class="fig" viewBox="0 0 370 92" role="img" aria-label="A ruler in centimetres with an object above it">${parts.join('')}</svg>`;
}

export function cylinderSvg(volume: number, opts: { stone?: boolean } = {}): string {
  // 0 to 100 cm³, one small line every 2 cm³.
  const top = 30;
  const bottom = 270;
  const y = (v: number) => bottom - (v / 100) * (bottom - top);
  const xl = 70;
  const xr = 140;
  const parts: string[] = [];
  const ly = y(volume);
  // Liquid with a meniscus: the bottom of the curve is at the reading.
  parts.push(
    `<path class="liquid" d="M${xl},${ly - 5} Q${(xl + xr) / 2},${ly + 5} ${xr},${ly - 5} L${xr},${bottom} L${xl},${bottom} Z"/>`,
  );
  parts.push(`<path class="ink" d="M${xl},${ly - 5} Q${(xl + xr) / 2},${ly + 5} ${xr},${ly - 5}"/>`);
  for (let v = 0; v <= 100; v += 2) {
    const long = v % 10 === 0;
    parts.push(`<line class="soft" x1="${xl}" y1="${y(v)}" x2="${xl + (long ? 22 : 12)}" y2="${y(v)}"/>`);
    if (long && v > 0) parts.push(`<text class="txt" x="${xl - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`);
  }
  if (opts.stone) {
    // An irregular stone resting on the bottom.
    parts.push(`<path class="stone" d="M84,${bottom} Q82,${bottom - 20} 96,${bottom - 24} Q110,${bottom - 30} 120,${bottom - 16} Q128,${bottom - 6} 124,${bottom} Z"/>`);
  }
  parts.push(`<path class="ink" d="M${xl},${top - 12} L${xl},${bottom} L${xr},${bottom} L${xr},${top - 12}"/>`);
  parts.push(`<text class="txt" x="${xr + 8}" y="${top}">cm³</text>`);
  return `<svg class="fig" viewBox="0 0 200 285" style="max-width:280px;margin:auto" role="img" aria-label="A measuring cylinder with liquid">${parts.join('')}</svg>`;
}

function stopwatchSvg(display: string): string {
  return `<svg class="fig" viewBox="0 0 220 120" style="max-width:240px;margin:auto" role="img" aria-label="A digital stopwatch showing ${display}">
    <circle class="ink" cx="110" cy="65" r="50"/><rect class="ink" x="100" y="5" width="20" height="10" rx="2"/>
    <rect class="ink" x="62" y="48" width="96" height="34" rx="4"/>
    <text class="txt" x="110" y="72" text-anchor="middle" style="font-size:20px;font-family:ui-monospace,Consolas,monospace">${display}</text>
    <text class="txt" x="110" y="98" text-anchor="middle" style="font-size:10px">min : s</text></svg>`;
}

function rulerQuestion(): Question {
  const start = pick([0, 0, randInt(5, 25)]);
  const end = start + randInt(25, 70);
  const lengthCm = (end - start) / 10;
  return {
    text: 'Find the length of the blue object.',
    figure: rulerSvg(start, end),
    given: ['the ruler is in cm', 'each small line is 1 mm'],
    find: 'the length in cm',
    answer: lengthCm,
    unit: 'cm',
    unitOptions: ['cm', 'm', 'cm²'],
    absTolerance: 0.05,
    solution: [
      `start $= ${qty(start / 10, 'cm')}$, end $= ${qty(end / 10, 'cm')}$`,
      `$\\text{length} = \\text{end} - \\text{start} = ${fmt(end / 10)} - ${fmt(start / 10)}$`,
      `$\\text{length} = ${qty(lengthCm, 'cm')}$`,
    ],
    traps: [
      ...(start > 0
        ? [{ value: end / 10, hint: 'The object does not start at 0. Length = end − start.' }]
        : []),
      { value: end - start, hint: 'This is the length in mm. Change it to cm: $10\\,\\text{mm} = 1\\,\\text{cm}$.' },
    ],
  };
}

function cylinderQuestion(): Question {
  let v = randInt(6, 45) * 2;
  if (v % 10 === 0) v += 2;
  const tens = Math.floor(v / 10) * 10;
  const lines = (v - tens) / 2;
  return {
    text: 'Read the volume of the liquid. Read the bottom of the curved surface.',
    figure: cylinderSvg(v),
    given: ['the scale is in cm³'],
    find: 'the volume of the liquid',
    answer: v,
    unit: 'cm³',
    unitOptions: ['cm³', 'cm', 'cm²'],
    absTolerance: 0.5, // the liquid is exactly on a line
    solution: [
      `Between two numbers there are 5 spaces, so one small line $= \\dfrac{10}{5} = ${qty(2, 'cm³')}$`,
      `The bottom of the curve is ${lines} small line${lines > 1 ? 's' : ''} above ${tens}.`,
      `$\\text{volume} = ${tens} + ${lines} \\times 2 = ${qty(v, 'cm³')}$`,
    ],
    traps: [
      { value: tens + lines, hint: 'Each small line is $2\\,\\text{cm}^3$, not $1\\,\\text{cm}^3$. Count: $10 \\div 5$ spaces.' },
    ],
  };
}

function stopwatchQuestion(): Question {
  const min = randInt(1, 4);
  const sec = randInt(0, 59) + randInt(0, 9) / 10;
  const display = `${String(min).padStart(2, '0')}:${sec.toFixed(1).padStart(4, '0')}`;
  const total = min * 60 + sec;
  return {
    text: 'The stopwatch shows minutes and seconds. Find the time in seconds.',
    figure: stopwatchSvg(display),
    given: [`time $= ${min}\\,\\text{min}\\ ${sec.toFixed(1)}\\,\\text{s}$`],
    find: 'the time in seconds',
    answer: Number(total.toFixed(1)),
    unit: 's',
    unitOptions: ['s', 'min', 'm'],
    absTolerance: 0.05,
    solution: [
      `$1\\,\\text{min} = 60\\,\\text{s}$, so $${qty(min, 'min')} = ${qty(min * 60, 's')}$`,
      `$\\text{time} = ${min * 60} + ${sec.toFixed(1)}$`,
      `$\\text{time} = ${total.toFixed(1)}\\,\\text{s}$`,
    ],
    traps: [
      { value: min * 100 + sec, hint: '1 minute is 60 s, not 100 s.' },
      { value: sec, hint: 'Do not forget the minutes: $1\\,\\text{min} = 60\\,\\text{s}$.' },
    ],
  };
}

export const measureTopic: Topic = {
  id: 'measure',
  title: 'Reading instruments',
  levels: [
    { name: 'Ruler', description: 'Read a length' },
    { name: 'Cylinder', description: 'Read a volume' },
    { name: 'Stopwatch', description: 'Read a time' },
  ],
  generate: (level) => (level === 1 ? rulerQuestion() : level === 2 ? cylinderQuestion() : stopwatchQuestion()),
};
