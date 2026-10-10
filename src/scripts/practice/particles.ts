// Unit 7 practice: kelvin and Celsius (2.1.3 C2), pV = constant (2.1.3 S3).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';
import { graphSvg } from '../../lib/graph';

const K_EQ = 'T\\,(\\text{in K}) = \\theta\\,(\\text{in }^\\circ\\text{C}) + 273';
const degC = (x: number) => `${x}\\,^\\circ\\text{C}`;
const sign = (x: number) => (x < 0 ? `(${x})` : String(x));

function celsiusToKelvin(): Question {
  const sit = pick([
    { text: 'The temperature in a classroom is {θ} °C.', range: [18, 30] },
    { text: 'The water in a kettle is at {θ} °C.', range: [20, 100] },
    { text: 'The temperature inside a freezer is {θ} °C.', range: [-25, -15] },
    { text: 'On a winter night, the temperature outside is {θ} °C.', range: [-30, -1] },
    { text: 'The gas in a tyre is at {θ} °C.', range: [5, 45] },
  ]);
  const theta = randInt(sit.range[0], sit.range[1]);
  const T = theta + 273;
  return {
    text: sit.text.replace('{θ}', theta < 0 ? `−${-theta}` : String(theta)),
    given: [`$\\theta = ${degC(theta)}$`],
    find: 'the temperature in kelvin',
    answer: T,
    unit: 'K',
    unitOptions: ['K', '°C'],
    absTolerance: 0.5,
    solution: [`$${K_EQ}$`, `$T = ${sign(theta)} + 273$`, `$T = ${qty(T, 'K')}$`],
    traps: [
      { value: theta - 273, hint: 'To go from °C to K, add 273.' },
      { value: theta, hint: 'This is still in °C. Add 273 to get kelvin.' },
    ],
  };
}

function kelvinToCelsius(): Question {
  const sit = pick([
    { text: 'Liquid nitrogen boils at 77 K.', T: 77 },
    { text: 'A gas is cooled to {T} K.', T: randInt(20, 26) * 10 },
    { text: 'The temperature of a gas is {T} K.', T: randInt(250, 450) },
    { text: 'Dry ice (solid carbon dioxide) has a temperature of about 195 K.', T: 195 },
    { text: 'A gas is heated to {T} K.', T: randInt(40, 60) * 10 },
  ]);
  const T = sit.T;
  const theta = T - 273;
  return {
    text: sit.text.replace('{T}', String(T)),
    given: [`$T = ${qty(T, 'K')}$`],
    find: 'the temperature in °C',
    answer: theta,
    unit: '°C',
    unitOptions: ['°C', 'K'],
    absTolerance: 0.5,
    solution: [`$${K_EQ}$, so $\\theta = T - 273$`, `$\\theta = ${T} - 273$`, `$\\theta = ${degC(theta)}$`],
    traps: [
      { value: T + 273, hint: 'To go from K to °C, subtract 273.' },
      { value: T, hint: 'This is still in kelvin. Subtract 273 to get °C.' },
    ],
  };
}

function temperatureChange(): Question {
  const theta1 = randInt(-20, 40);
  const rise = randInt(2, 20) * 5;
  const T2 = theta1 + 273 + rise;
  return {
    text: `A gas is at ${theta1 < 0 ? `−${-theta1}` : theta1} °C. It is heated to ${T2} K.`,
    given: [`start: $\\theta = ${degC(theta1)}$`, `end: $T = ${qty(T2, 'K')}$`],
    find: 'the rise in temperature, in K',
    answer: rise,
    unit: 'K',
    unitOptions: ['K', '°C'],
    absTolerance: 0.5,
    solution: [
      `Change the start temperature to kelvin: $T = ${sign(theta1)} + 273 = ${qty(theta1 + 273, 'K')}$`,
      `rise $= ${T2} - ${theta1 + 273} = ${qty(rise, 'K')}$`,
      'A change of 1 K is the same as a change of 1 °C.',
    ],
    traps: [{ value: T2 - theta1, hint: 'Use the same scale for both temperatures: change the °C to K first.' }],
  };
}

export const kelvinTopic: Topic = {
  id: 'kelvin',
  title: 'Kelvin and Celsius',
  levels: [
    { name: 'Level 1', description: '°C to K' },
    { name: 'Level 2', description: 'K to °C' },
    { name: 'Level 3', description: 'Temperature change' },
  ],
  generate: (level) => (level === 1 ? celsiusToKelvin() : level === 2 ? kelvinToCelsius() : temperatureChange()),
};

// ---------- pV = constant (Extended) ----------

const PV = 'p_1 V_1 = p_2 V_2';

function boylePressure(): Question {
  const V1 = pick([20, 30, 40, 50, 60, 80, 100, 120]);
  const p1 = pick([100, 120, 150, 200]);
  const V2 = V1 * pick([0.5, 0.25, 0.4, 0.8, 1.5, 2]);
  const p2 = (p1 * V1) / V2;
  const squeeze = V2 < V1;
  return {
    text: `A fixed mass of gas has a volume of ${V1} cm³ at a pressure of ${p1} kPa. The gas is ${squeeze ? 'compressed' : 'allowed to expand'} to ${fmt(V2)} cm³. The temperature does not change.`,
    given: [`$p_1 = ${qty(p1, 'kPa')}$`, `$V_1 = ${qty(V1, 'cm³')}$`, `$V_2 = ${qty(V2, 'cm³')}$`],
    find: 'the new pressure $p_2$',
    answer: p2,
    unit: 'kPa',
    unitOptions: ['kPa', 'cm³', 'K', 'N'],
    solution: [
      `$pV = \\text{constant}$, so $${PV}$`,
      `$p_2 = \\dfrac{p_1 V_1}{V_2} = ${frac(`${p1} \\times ${V1}`, fmt(V2))}$`,
      `$p_2 = ${qty(p2, 'kPa')}$`,
    ],
    traps: [{ value: (p1 * V2) / V1, hint: `When the volume gets ${squeeze ? 'smaller' : 'bigger'}, the pressure gets ${squeeze ? 'bigger' : 'smaller'}. Use $p_2 = \\dfrac{p_1 V_1}{V_2}$.` }],
  };
}

function boyleVolume(): Question {
  const useSI = Math.random() < 0.4;
  if (useSI) {
    const V1 = pick([0.02, 0.03, 0.04, 0.05, 0.06]);
    const p1 = 1.0e5;
    const p2 = p1 * pick([2, 4, 5, 1.25, 2.5]);
    const V2 = (p1 * V1) / p2;
    return {
      text: `A gas in a cylinder has a volume of ${V1} m³ at a pressure of 1.0 × 10⁵ Pa. A piston pushes in until the pressure is ${fmt(p2 / 1e5)} × 10⁵ Pa. The temperature does not change.`,
      given: [`$p_1 = 1.0 \\times 10^5\\,\\text{Pa}$`, `$V_1 = ${qty(V1, 'm³')}$`, `$p_2 = ${fmt(p2 / 1e5)} \\times 10^5\\,\\text{Pa}$`],
      find: 'the new volume $V_2$',
      answer: V2,
      unit: 'm³',
      unitOptions: ['m³', 'Pa', 'm', 'kg'],
      solution: [
        `$${PV}$, so $V_2 = \\dfrac{p_1 V_1}{p_2}$`,
        `$V_2 = \\dfrac{1.0 \\times 10^5 \\times ${V1}}{${fmt(p2 / 1e5)} \\times 10^5}$`,
        `$V_2 = ${qty(V2, 'm³')}$`,
      ],
      traps: [{ value: (p2 * V1) / p1, hint: 'The pressure goes up, so the volume goes down. Use $V_2 = \\dfrac{p_1 V_1}{p_2}$.' }],
    };
  }
  const V1 = pick([30, 40, 60, 80, 120, 150]);
  const p1 = pick([100, 150, 200]);
  const p2 = p1 * pick([2, 3, 4, 0.5, 1.5]);
  const V2 = (p1 * V1) / p2;
  return {
    text: `A syringe holds ${V1} cm³ of air at ${p1} kPa. The pressure changes to ${fmt(p2)} kPa. The temperature does not change.`,
    given: [`$p_1 = ${qty(p1, 'kPa')}$`, `$V_1 = ${qty(V1, 'cm³')}$`, `$p_2 = ${qty(p2, 'kPa')}$`],
    find: 'the new volume $V_2$',
    answer: V2,
    unit: 'cm³',
    unitOptions: ['cm³', 'kPa', 'cm', 'K'],
    solution: [`$${PV}$, so $V_2 = \\dfrac{p_1 V_1}{p_2}$`, `$V_2 = ${frac(`${p1} \\times ${V1}`, fmt(p2))}$`, `$V_2 = ${qty(V2, 'cm³')}$`],
    traps: [{ value: (p2 * V1) / p1, hint: 'Pressure and volume change in opposite directions. Use $V_2 = \\dfrac{p_1 V_1}{p_2}$.' }],
  };
}

function boyleGraph(): Question {
  const k = pick([1200, 2400, 3600]);
  const step = k / 120;
  const Vs = [10, 20, 30, 40, 50, 60];
  const Vq = pick([5, 8, 80, 100, 120]);
  const ans = k / Vq;
  return {
    text: 'The graph shows how the pressure of a fixed mass of gas changes with its volume. The temperature does not change.',
    figure: graphSvg({
      xLabel: 'volume / cm³',
      yLabel: 'pressure / kPa',
      xMax: 60,
      yMax: k / 10,
      xStep: 10,
      yStep: step,
      points: Vs.map((V) => [V, k / V] as [number, number]),
      curve: true,
      markers: [10, 20, 30, 40, 60].map((V) => [V, k / V] as [number, number]),
      title: 'Pressure against volume: a curve. The pressure goes down when the volume goes up.',
    }),
    given: ['a point on the graph', `new volume $V = ${qty(Vq, 'cm³')}$`],
    find: `the pressure when the volume is ${Vq} cm³`,
    answer: ans,
    unit: 'kPa',
    unitOptions: ['kPa', 'cm³', 'K'],
    tolerance: 0.03,
    solution: [
      `Read one point, for example $V = 20\\,\\text{cm}^3$, $p = ${qty(k / 20, 'kPa')}$`,
      `$pV = ${k / 20} \\times 20 = ${k}$ (the same for every point)`,
      `$p = \\dfrac{${k}}{${Vq}} = ${qty(ans, 'kPa')}$`,
    ],
    traps: [{ value: (k / 20) * (Vq / 20), hint: '$pV$ is constant: when $V$ goes up, $p$ goes down. Use $p = \\dfrac{pV}{V}$.' }],
  };
}

export const boyleTopic: Topic = {
  id: 'boyle',
  title: 'Pressure and volume of a gas',
  levels: [
    { name: 'Level 1', description: 'Find the new pressure' },
    { name: 'Level 2', description: 'Find the new volume' },
    { name: 'Level 3', description: 'Use a p–V graph' },
  ],
  generate: (level) => (level === 1 ? boylePressure() : level === 2 ? boyleVolume() : boyleGraph()),
};
