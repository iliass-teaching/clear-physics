// Unit 14 practice: series circuits, parallel circuits, potential dividers (4.3), fuses (4.4).
import type { Question, Topic } from './types';
import { an, fmt, frac, pick, qty } from './random';

const Ω = '\\,\\Omega';

// ---------- Series circuits ----------

function seriesTotal(): Question {
  const rs = Math.random() < 0.5 ? [pick([2, 4, 5, 10]), pick([3, 6, 8, 12])] : [pick([2, 3, 5]), pick([4, 6, 10]), pick([8, 12, 20])];
  const R = rs.reduce((a, b) => a + b, 0);
  return {
    text: `Resistors of ${rs.map((r) => `${r} Ω`).join(', ').replace(/, ([^,]*)$/, ' and $1')} are connected in series.`,
    given: rs.map((r, k) => `$R_${k + 1} = ${r}${Ω}$`),
    find: 'the combined resistance',
    answer: R,
    unit: 'Ω',
    unitOptions: ['Ω', 'V', 'A'],
    solution: ['In series, the resistances add up: $R = R_1 + R_2 + \\dots$', `$R = ${rs.join(' + ')} = ${R}${Ω}$`],
    traps: [{ value: rs.reduce((a, b) => a * b, 1) / R, hint: 'This is for resistors in parallel. In series, just add the resistances.' }],
  };
}

function seriesCurrent(): Question {
  if (Math.random() < 0.4) {
    const n = pick([2, 3, 4]);
    const e = pick([1.5, 2]);
    return {
      text: `${n} cells, each with an e.m.f. of ${e} V, are connected in series, all the same way round.`,
      given: [`${n} cells`, `e.m.f. of each cell $= ${qty(e, 'V')}$`],
      find: 'the combined e.m.f.',
      answer: n * e,
      unit: 'V',
      unitOptions: ['V', 'A', 'Ω'],
      solution: ['The e.m.f.s of cells in series add up.', `$E = ${Array(n).fill(e).join(' + ')} = ${qty(n * e, 'V')}$`],
      traps: [{ value: e, hint: 'Cells in series add their e.m.f.s.' }],
    };
  }
  const R1 = pick([2, 4, 5, 6, 10]);
  const R2 = pick([3, 4, 8, 10, 14]);
  const E = pick([6, 9, 12]);
  const I = E / (R1 + R2);
  return {
    text: `${an(R1, true)} ${R1} Ω resistor and ${an(R2)} ${R2} Ω resistor are connected in series to ${an(E)} ${E} V battery.`,
    given: [`$R_1 = ${R1}${Ω}$`, `$R_2 = ${R2}${Ω}$`, `$E = ${qty(E, 'V')}$`],
    find: 'the current in the circuit',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'V', 'Ω'],
    solution: [`Combined resistance: $R = ${R1} + ${R2} = ${R1 + R2}${Ω}$`, `$I = \\dfrac{V}{R} = ${frac(E, R1 + R2)}$`, `$I = ${qty(I, 'A')}$ (the same everywhere in the series circuit)`],
    traps: [
      { value: E / R1, hint: 'Use the combined resistance of the whole circuit: add the resistances.' },
      { value: E / R1 + E / R2, hint: 'This would be a parallel circuit. In series, add the resistances first.' },
    ],
  };
}

function seriesPd(): Question {
  if (Math.random() < 0.5) {
    const E = pick([6, 9, 12]);
    const V1 = pick([1.5, 2, 2.5, 4]);
    return {
      text: `Two lamps are in series with ${an(E)} ${E} V battery. The p.d. across lamp 1 is ${V1} V.`,
      given: [`$E = ${qty(E, 'V')}$`, `$V_1 = ${qty(V1, 'V')}$`],
      find: 'the p.d. across lamp 2',
      answer: E - V1,
      unit: 'V',
      unitOptions: ['V', 'A', 'Ω'],
      solution: ['In series, the p.d.s across the components add up to the total p.d.', `$V_2 = ${E} - ${V1} = ${qty(E - V1, 'V')}$`],
      traps: [{ value: E + V1, hint: 'The p.d.s add up to the supply p.d. Subtract.' }],
    };
  }
  const R1 = pick([2, 4, 5, 10]);
  let R2 = pick([3, 6, 10, 20]);
  if (R2 === R1) R2 = 20;
  const I = pick([0.2, 0.5, 1]);
  const E = I * (R1 + R2);
  return {
    text: `${an(R1, true)} ${R1} Ω resistor and ${an(R2)} ${R2} Ω resistor are in series. The current is ${I} A.`,
    given: [`$R_1 = ${R1}${Ω}$`, `$R_2 = ${R2}${Ω}$`, `$I = ${qty(I, 'A')}$`],
    find: `the p.d. across the ${R2} Ω resistor`,
    answer: I * R2,
    unit: 'V',
    unitOptions: ['V', 'A', 'Ω'],
    solution: ['The current is the same in both resistors.', `$V_2 = I R_2 = ${I} \\times ${R2} = ${qty(I * R2, 'V')}$`],
    traps: [
      { value: E, hint: 'This is the total p.d. Use only the resistance of this resistor.' },
      { value: I * R1, hint: 'This is the p.d. across the other resistor.' },
    ],
  };
}

export const seriesTopic: Topic = {
  id: 'series',
  title: 'Series circuits',
  levels: [
    { name: 'Level 1', description: 'Combined resistance' },
    { name: 'Level 2', description: 'Current; cells in series' },
    { name: 'Level 3', description: 'P.d.s in series' },
  ],
  generate: (level) => (level === 1 ? seriesTotal() : level === 2 ? seriesCurrent() : seriesPd()),
};

// ---------- Parallel circuits ----------

function junctionCurrents(): Question {
  const I1 = pick([0.2, 0.3, 0.5, 1.2, 1.5]);
  const I2 = pick([0.4, 0.6, 0.8, 2]);
  const askTotal = Math.random() < 0.5;
  return {
    text: askTotal
      ? `Two lamps are in parallel. The current in lamp 1 is ${I1} A and the current in lamp 2 is ${I2} A.`
      : `The current from the battery is ${fmt(I1 + I2)} A. It splits into two branches. The current in branch 1 is ${I1} A.`,
    given: askTotal ? [`$I_1 = ${qty(I1, 'A')}$`, `$I_2 = ${qty(I2, 'A')}$`] : [`total $= ${qty(I1 + I2, 'A')}$`, `$I_1 = ${qty(I1, 'A')}$`],
    find: askTotal ? 'the current from the battery' : 'the current in branch 2',
    answer: askTotal ? I1 + I2 : I2,
    unit: 'A',
    unitOptions: ['A', 'V', 'Ω'],
    solution: askTotal
      ? ['The currents in the branches add up to the current from the source.', `$I = ${I1} + ${I2} = ${qty(I1 + I2, 'A')}$`]
      : ['Current into a junction = current out of the junction.', `$I_2 = ${fmt(I1 + I2)} - ${I1} = ${qty(I2, 'A')}$`],
    traps: askTotal ? [{ value: Math.abs(I1 - I2), hint: 'In parallel, add the branch currents.' }] : [{ value: I1 + I2, hint: 'This is the total current. Subtract the current in branch 1.' }],
  };
}

function branchCurrents(): Question {
  const V = pick([6, 12]);
  const R1 = pick([3, 4, 6, 12]);
  let R2 = pick([2, 4, 6, 12]);
  if (R2 === R1) R2 = R1 === 12 ? 6 : 12;
  const I = V / R1 + V / R2;
  return {
    text: `${an(R1, true)} ${R1} Ω resistor and ${an(R2)} ${R2} Ω resistor are connected in parallel to ${an(V)} ${V} V supply.`,
    given: [`$V = ${qty(V, 'V')}$`, `$R_1 = ${R1}${Ω}$`, `$R_2 = ${R2}${Ω}$`],
    find: 'the current from the supply',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'V', 'Ω'],
    solution: [
      'In parallel, the p.d. across each branch is the same as the supply p.d.',
      `$I_1 = \\dfrac{${V}}{${R1}} = ${qty(V / R1, 'A')}$ and $I_2 = \\dfrac{${V}}{${R2}} = ${qty(V / R2, 'A')}$`,
      `$I = I_1 + I_2 = ${qty(I, 'A')}$`,
    ],
    traps: [
      { value: V / (R1 + R2), hint: 'This would be a series circuit. In parallel, find the current in each branch and add them.' },
      { value: V / R1, hint: 'This is only the current in one branch. Add the other branch.' },
    ],
  };
}

function parallelResistance(): Question {
  const pairs: [number, number][] = [[3, 6], [4, 4], [6, 12], [10, 10], [4, 12], [12, 6], [20, 5], [10, 40]];
  const [R1, R2] = pick(pairs);
  const R = (R1 * R2) / (R1 + R2);
  return {
    text: `${an(R1, true)} ${R1} Ω resistor and ${an(R2)} ${R2} Ω resistor are connected in parallel.`,
    given: [`$R_1 = ${R1}${Ω}$`, `$R_2 = ${R2}${Ω}$`],
    find: 'the combined resistance',
    answer: R,
    unit: 'Ω',
    unitOptions: ['Ω', 'V', 'A'],
    solution: [
      '$\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$',
      `$\\dfrac{1}{R} = \\dfrac{1}{${R1}} + \\dfrac{1}{${R2}} = ${fmt(1 / R1 + 1 / R2)}$`,
      `$R = \\dfrac{1}{${fmt(1 / R1 + 1 / R2)}} = ${fmt(R)}${Ω}$ (smaller than each resistor)`,
    ],
    traps: [
      { value: R1 + R2, hint: 'This is for series. In parallel, the combined resistance is smaller than each resistor.' },
      { value: 1 / R1 + 1 / R2, hint: 'This is $\\dfrac{1}{R}$. Now take 1 divided by it.' },
    ],
  };
}

export const parallelTopic: Topic = {
  id: 'parallel',
  title: 'Parallel circuits',
  levels: [
    { name: 'Level 1', description: 'Currents at a junction' },
    { name: 'Level 2', description: 'Branch currents (Extended)' },
    { name: 'Level 3', description: 'Resistors in parallel (Extended)' },
  ],
  generate: (level) => (level === 1 ? junctionCurrents() : level === 2 ? branchCurrents() : parallelResistance()),
};

// ---------- Potential divider (Extended) ----------

function dividerV(): Question {
  const R1 = pick([1, 2, 3, 4, 5, 10]);
  let R2 = pick([1, 2, 3, 5, 6, 10]);
  if (R2 === R1) R2 = R1 + 1;
  const V = pick([6, 9, 12]);
  const V2 = (V * R2) / (R1 + R2);
  return {
    text: `${an(V, true)} ${V} V supply is connected across two resistors in series: R₁ = ${R1} kΩ and R₂ = ${R2} kΩ.`,
    given: [`$V = ${qty(V, 'V')}$`, `$R_1 = ${R1}\\,\\text{k}\\Omega$`, `$R_2 = ${R2}\\,\\text{k}\\Omega$`],
    find: 'the p.d. across R₂',
    answer: V2,
    unit: 'V',
    unitOptions: ['V', 'A', 'Ω'],
    solution: [
      `$\\dfrac{V_1}{V_2} = \\dfrac{R_1}{R_2}$: the p.d. is shared in the ratio ${R1} : ${R2}`,
      `$V_2 = ${V} \\times \\dfrac{${R2}}{${R1} + ${R2}}$`,
      `$V_2 = ${qty(V2, 'V')}$`,
    ],
    traps: [
      { value: (V * R1) / (R1 + R2), hint: 'This is the p.d. across R₁. The bigger resistor gets the bigger p.d.' },
      { value: V / 2, hint: 'The p.d. is shared in the ratio of the resistances, not equally.' },
    ],
  };
}

function dividerR(): Question {
  const V = pick([6, 9, 12]);
  const R1 = pick([2, 4, 6, 10]);
  let V1 = pick([2, 3, 4]);
  if (2 * V1 === V) V1 = 2;
  const V2 = V - V1;
  const R2 = (R1 * V2) / V1;
  return {
    text: `Two resistors are in series with ${an(V)} ${V} V supply. R₁ = ${R1} kΩ and the p.d. across R₁ is ${V1} V.`,
    given: [`$V = ${qty(V, 'V')}$`, `$R_1 = ${R1}\\,\\text{k}\\Omega$`, `$V_1 = ${qty(V1, 'V')}$`],
    find: 'the resistance of R₂, in kΩ',
    answer: R2,
    unit: 'kΩ',
    unitOptions: ['kΩ', 'V', 'A'],
    solution: [
      `$V_2 = ${V} - ${V1} = ${qty(V2, 'V')}$`,
      `$\\dfrac{R_1}{R_2} = \\dfrac{V_1}{V_2}$, so $R_2 = R_1 \\times \\dfrac{V_2}{V_1} = ${R1} \\times \\dfrac{${V2}}{${V1}}$`,
      `$R_2 = ${fmt(R2)}\\,\\text{k}\\Omega$`,
    ],
    traps: [{ value: (R1 * V1) / V2, hint: 'Upside down. The resistor with the bigger p.d. has the bigger resistance.' }],
  };
}

function dividerSensor(): Question {
  const sit = pick([
    { s: 'an LDR', cond: 'in the dark', Rs: pick([20, 40, 50, 90]) },
    { s: 'an LDR', cond: 'in bright light', Rs: pick([1, 2, 4]) },
    { s: 'a thermistor', cond: 'at 20 °C', Rs: pick([10, 12, 15]) },
    { s: 'a thermistor', cond: 'at 80 °C', Rs: pick([1, 1.5, 2]) },
  ]);
  const R1 = sit.Rs === 10 ? 5 : pick([5, 10]);
  const V = 6;
  const Vs = (V * sit.Rs) / (R1 + sit.Rs);
  return {
    text: `A potential divider has ${an(R1)} ${R1} kΩ fixed resistor and ${sit.s} in series with a 6.0 V supply. ${sit.cond[0].toUpperCase() + sit.cond.slice(1)}, the resistance of ${sit.s} is ${sit.Rs} kΩ.`,
    given: [`$V = 6.0\\,\\text{V}$`, `fixed $R = ${R1}\\,\\text{k}\\Omega$`, `sensor $R = ${sit.Rs}\\,\\text{k}\\Omega$`],
    find: `the p.d. across ${sit.s}`,
    answer: Vs,
    unit: 'V',
    unitOptions: ['V', 'A', 'Ω'],
    solution: [`$V_{\\text{sensor}} = 6.0 \\times \\dfrac{${sit.Rs}}{${R1} + ${sit.Rs}}$`, `$V_{\\text{sensor}} = ${qty(Vs, 'V')}$`],
    traps: [{ value: V - Vs, hint: 'This is the p.d. across the fixed resistor.' }],
  };
}

export const dividerTopic: Topic = {
  id: 'potential-divider',
  title: 'Potential dividers',
  levels: [
    { name: 'Level 1', description: 'Output p.d.' },
    { name: 'Level 2', description: 'Find a resistance' },
    { name: 'Level 3', description: 'Sensors: LDR and thermistor' },
  ],
  generate: (level) => (level === 1 ? dividerV() : level === 2 ? dividerR() : dividerSensor()),
};

// ---------- Fuses and mains appliances ----------

const FUSES = [3, 5, 13];
const fuseFor = (I: number) => FUSES.find((f) => f > I) ?? 13;

function applianceCurrent(): Question {
  const sit = pick([
    { name: 'a kettle', P: [2000, 2300, 3000] },
    { name: 'a lamp', P: [60, 100] },
    { name: 'a hair dryer', P: [1000, 1200, 1800] },
    { name: 'a fan', P: [50, 115] },
  ]);
  const P = pick(sit.P);
  const V = 230;
  return {
    text: `The power of ${sit.name} is ${P} W. It is connected to the ${V} V mains.`,
    given: [`$P = ${qty(P, 'W')}$`, `$V = ${qty(V, 'V')}$`],
    find: 'the normal current in the appliance',
    answer: P / V,
    unit: 'A',
    unitOptions: ['A', 'W', 'V'],
    solution: ['$P = IV$, so $I = \\dfrac{P}{V}$', `$I = ${frac(P, V)} = ${qty(P / V, 'A')}$`],
    traps: [{ value: P * V, hint: 'Divide: $I = \\dfrac{P}{V}$.' }],
  };
}

function chooseFuse(): Question {
  const P = pick([100, 460, 700, 920, 1500, 2000, 2760]);
  const I = P / 230;
  const f = fuseFor(I);
  return {
    text: `An appliance has a power of ${P} W on the 230 V mains. Fuses of 3 A, 5 A and 13 A are available.`,
    given: [`$P = ${qty(P, 'W')}$`, `$V = ${qty(230, 'V')}$`, 'fuses: 3 A, 5 A, 13 A'],
    find: 'the best fuse rating',
    answer: f,
    unit: 'A',
    unitOptions: ['A', 'W', 'V'],
    absTolerance: 0.01,
    solution: [
      `Normal current: $I = \\dfrac{P}{V} = ${frac(P, 230)} = ${qty(I, 'A')}$`,
      `Choose the smallest fuse that is bigger than ${fmt(I)} A: the ${f} A fuse.`,
    ],
    traps: [
      ...(f !== 13 ? [{ value: 13, hint: 'A 13 A fuse would work, but it would not melt quickly enough with a smaller fault current. Choose the smallest fuse that is bigger than the normal current.' }] : []),
      ...FUSES.filter((x) => x < I).map((x) => ({ value: x, hint: `${an(x, true)} ${x} A fuse is smaller than the normal current: it would melt all the time.` })),
    ],
  };
}

function overload(): Question {
  const items = [
    { name: 'a 2.3 kW kettle', I: 10 },
    { name: 'a 1.15 kW toaster', I: 5 },
    { name: 'a 0.69 kW microwave oven', I: 3 },
    { name: 'a 1.84 kW heater', I: 8 },
    { name: 'a 0.46 kW fridge', I: 2 },
  ];
  const a = pick(items);
  let b = pick(items);
  while (b === a) b = pick(items);
  const I = a.I + b.I;
  return {
    text: `${a.name[0].toUpperCase() + a.name.slice(1)} and ${b.name} are plugged into one extension lead on the 230 V mains. The lead has a 13 A fuse.`,
    given: [`current of the first appliance $= ${qty(a.I, 'A')}$`, `current of the second appliance $= ${qty(b.I, 'A')}$`],
    find: 'the total current in the extension lead',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'W', 'V'],
    solution: [
      'The appliances are in parallel: their currents add up in the lead.',
      `$I = ${a.I} + ${b.I} = ${qty(I, 'A')}$`,
      I > 13
        ? 'This is more than 13 A: the lead is overloaded and the fuse melts. Do not do this!'
        : I === 13
          ? 'This is the full 13 A rating: do not plug in anything else.'
          : 'This is less than 13 A: the fuse does not melt.',
    ],
    traps: [{ value: Math.max(a.I, b.I), hint: 'Add the currents of both appliances.' }],
  };
}

export const fuseTopic: Topic = {
  id: 'fuse',
  title: 'Fuses and mains appliances',
  levels: [
    { name: 'Level 1', description: 'Current in an appliance' },
    { name: 'Level 2', description: 'Choose a fuse' },
    { name: 'Level 3', description: 'Overloaded extension lead' },
  ],
  generate: (level) => (level === 1 ? applianceCurrent() : level === 2 ? chooseFuse() : overload()),
};
