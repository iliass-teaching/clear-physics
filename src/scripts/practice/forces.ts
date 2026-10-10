// Unit 3 practice: springs (1.5.1 C2, S9), resultant force (1.5.1 C3), F = ma (1.5.1 S11), moments (1.5.2).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';
import { graphSvg } from '../../lib/graph';
import { forceDiagramSvg, beamSvg, type ForceArrow } from '../../lib/forceFigures';

// ---------- Springs ----------

const K_EQ = 'k = \\dfrac{F}{x}';

function extensionQ(): Question {
  const L0 = randInt(30, 80) / 10; // cm
  const x = randInt(5, 60) / 10;
  const L = Number((L0 + x).toFixed(1));
  return {
    text: `A spring is ${fmt(L0)} cm long. With a load on it, it is ${fmt(L)} cm long.`,
    given: [`original length $= ${qty(L0, 'cm')}$`, `new length $= ${qty(L, 'cm')}$`],
    find: 'the extension of the spring',
    answer: L - L0,
    unit: 'cm',
    unitOptions: ['cm', 'N', 'N/cm', 'cm²'],
    absTolerance: 0.05,
    solution: [
      '$\\text{extension} = \\text{new length} - \\text{original length}$',
      `$\\text{extension} = ${fmt(L)} - ${fmt(L0)} = ${qty(L - L0, 'cm')}$`,
    ],
    traps: [
      { value: L, hint: 'This is the new length. The extension is how much longer the spring is: subtract the original length.' },
      { value: L + L0, hint: 'Subtract, do not add: new length − original length.' },
    ],
  };
}

function springConstant(): Question {
  const k = pick([10, 20, 25, 40, 50, 80, 100, 200]);
  const xcm = randInt(1, 12);
  const F = (k * xcm) / 100;
  return {
    text: `A load of ${fmt(F)} N stretches a spring by ${xcm} cm.`,
    given: [`force $F = ${qty(F, 'N')}$`, `extension $x = ${qty(xcm, 'cm')}$`],
    find: 'the spring constant $k$ in N/m',
    answer: k,
    unit: 'N/m',
    unitOptions: ['N/m', 'N/cm', 'N', 'm'],
    solution: [
      `Change cm to m: $x = ${qty(xcm, 'cm')} = ${qty(xcm / 100, 'm')}$`,
      `$${K_EQ} = ${frac(F, xcm / 100)}$`,
      `$k = ${qty(k, 'N/m')}$`,
    ],
    traps: [
      { value: F / xcm, hint: 'This is in N/cm. The question asks for N/m: change the extension to metres first.' },
      { value: (xcm / 100) / F, hint: `You divided the wrong way: $${K_EQ}$.` },
    ],
  };
}

function springGraph(): Question {
  const k = pick([20, 25, 40, 50]); // N/m
  // Straight line up to the limit of proportionality, then a curve.
  const xs = [0, 2, 4, 6, 8, 10];
  const pts: [number, number][] = xs.map((xcm) => [xcm, (k * xcm) / 100]);
  const limitF = (k * 10) / 100;
  pts.push([12.5, limitF * 1.12], [15, limitF * 1.18]);
  const top = limitF * 1.25;
  const yStep = top > 3 ? 1 : 0.5;
  const yMax = Math.ceil(top / yStep) * yStep;
  const figure = graphSvg({
    xLabel: 'extension / cm', yLabel: 'load / N',
    xMax: 16, yMax, xStep: 2, yStep,
    points: pts, curve: true,
    labels: [{ x: 10, y: limitF + yMax * 0.06, text: 'P' }],
  });
  const xRead = pick([4, 6, 8]);
  const FRead = (k * xRead) / 100;
  return {
    text: 'The graph shows the load against the extension for a spring. P is the limit of proportionality.',
    figure,
    given: ['the graph'],
    find: 'the spring constant $k$ in N/m (use the straight part)',
    answer: k,
    unit: 'N/m',
    unitOptions: ['N/m', 'N/cm', 'N', 'cm'],
    tolerance: 0.05,
    solution: [
      `Read a point on the straight part, for example $x = ${xRead}\\,\\text{cm} = ${fmt(xRead / 100)}\\,\\text{m}$, $F = ${qty(FRead, 'N')}$`,
      `$${K_EQ} = ${frac(FRead, xRead / 100)}$`,
      `$k = ${qty(k, 'N/m')}$`,
    ],
    traps: [{ value: k / 100, hint: 'This is in N/cm. Change the extension to metres: $1\\,\\text{cm} = 0.01\\,\\text{m}$.' }],
  };
}

export const springTopic: Topic = {
  id: 'spring',
  title: 'Springs',
  levels: [
    { name: 'Level 1', description: 'Extension' },
    { name: 'Level 2', description: 'Spring constant (Extended)' },
    { name: 'Level 3', description: 'Spring constant from a graph (Extended)' },
  ],
  generate: (level) => (level === 1 ? extensionQ() : level === 2 ? springConstant() : springGraph()),
};

// ---------- Resultant force along a line ----------

function twoForces(): Question {
  const a = randInt(2, 20) * 5;
  let b = randInt(2, 20) * 5;
  if (b === a) b += 5;
  const same = Math.random() < 0.4;
  // Same direction: one person pulls on the right side, the other pushes on the left side.
  const forces: ForceArrow[] = same
    ? [{ dir: 'right', size: a, label: `${a} N` }, { dir: 'pushRight', size: b, label: `${b} N` }]
    : [{ dir: 'right', size: a, label: `${a} N` }, { dir: 'left', size: b, label: `${b} N` }];
  const R = same ? a + b : Math.abs(a - b);
  const fig = forceDiagramSvg(forces, 0.9);
  return {
    text: same
      ? `Two people push a box to the right: one with ${a} N, the other with ${b} N.`
      : `A box is pushed to the right with ${a} N and to the left with ${b} N.`,
    figure: fig,
    given: same ? [`$${a}\\,\\text{N}$ to the right`, `$${b}\\,\\text{N}$ to the right`] : [`$${a}\\,\\text{N}$ to the right`, `$${b}\\,\\text{N}$ to the left`],
    find: 'the size of the resultant force',
    answer: R,
    unit: 'N',
    unitOptions: ['N', 'kg', 'N/kg', 'm/s²'],
    solution: same
      ? ['The forces act in the same direction: add them.', `$R = ${a} + ${b} = ${qty(R, 'N')}$ to the right`]
      : [
          'The forces act in opposite directions: subtract them.',
          `$R = ${Math.max(a, b)} - ${Math.min(a, b)} = ${qty(R, 'N')}$ to the ${a > b ? 'right' : 'left'}`,
        ],
    traps: same
      ? [{ value: Math.abs(a - b), hint: 'The forces act in the same direction, so add them.' }]
      : [{ value: a + b, hint: 'The forces act in opposite directions, so subtract the smaller from the bigger.' }],
  };
}

function manyForces(): Question {
  const drive = randInt(10, 40) * 50;
  const friction = randInt(2, 8) * 50;
  const air = randInt(2, 8) * 50;
  const R = drive - friction - air;
  if (R <= 0) return manyForces();
  return {
    text: `A car has a driving force of ${drive} N. Friction is ${friction} N and air resistance is ${air} N, both backwards.`,
    figure: forceDiagramSvg(
      [
        { dir: 'right', size: drive / 25, label: `${drive} N` },
        { dir: 'left', size: (friction + air) / 25, label: `${friction} N + ${air} N` },
      ],
      1,
    ),
    given: [`driving force $= ${qty(drive, 'N')}$ forwards`, `friction $= ${qty(friction, 'N')}$ backwards`, `air resistance $= ${qty(air, 'N')}$ backwards`],
    find: 'the size of the resultant force',
    answer: R,
    unit: 'N',
    unitOptions: ['N', 'kg', 'N/kg', 'm/s²'],
    solution: [
      `total backwards force $= ${friction} + ${air} = ${qty(friction + air, 'N')}$`,
      `$R = ${drive} - ${friction + air} = ${qty(R, 'N')}$ forwards`,
    ],
    traps: [
      { value: drive + friction + air, hint: 'Friction and air resistance act backwards. Subtract them from the driving force.' },
      { value: drive - friction, hint: 'Do not forget the air resistance.' },
      { value: drive - air, hint: 'Do not forget the friction.' },
    ],
  };
}

function balancingForce(): Question {
  const weight = randInt(5, 60) * 10;
  const one = randInt(1, Math.floor(weight / 20)) * 10;
  return {
    text: `A box with a weight of ${weight} N hangs from two ropes. One rope pulls up with ${one} N. The box does not move.`,
    figure: forceDiagramSvg(
      [
        { dir: 'up', size: weight / 5, label: `${one} N + T` },
        { dir: 'down', size: weight / 5, label: `weight ${weight} N` },
      ],
      1,
    ),
    given: [`weight $= ${qty(weight, 'N')}$ down`, `rope 1 $= ${qty(one, 'N')}$ up`, 'the box is at rest'],
    find: 'the force $T$ in the second rope',
    answer: weight - one,
    unit: 'N',
    unitOptions: ['N', 'kg', 'N/kg', 'm/s²'],
    solution: [
      'The box is at rest, so the resultant force is zero: up forces = down forces.',
      `$${one} + T = ${weight}$`,
      `$T = ${weight} - ${one} = ${qty(weight - one, 'N')}$`,
    ],
    traps: [
      { value: weight + one, hint: 'At rest, the forces up and down are equal. Up: $' + one + ' + T$. Down: the weight.' },
      { value: weight, hint: 'The first rope already holds part of the weight.' },
    ],
  };
}

export const resultantTopic: Topic = {
  id: 'resultant',
  title: 'Resultant force',
  levels: [
    { name: 'Level 1', description: 'Two forces' },
    { name: 'Level 2', description: 'Several forces' },
    { name: 'Level 3', description: 'Balanced forces' },
  ],
  generate: (level) => (level === 1 ? twoForces() : level === 2 ? manyForces() : balancingForce()),
};

// ---------- F = ma (Extended) ----------

const FMA = 'F = m \\times a';

function forceFromMA(): Question {
  const thing = pick([
    { name: 'A trolley', m: [1, 5], a: [1, 4] },
    { name: 'A car', m: [800, 1500], a: [1, 3] },
    { name: 'A cyclist and her bike', m: [60, 90], a: [1, 2] },
  ]);
  const m = thing.m[1] > 100 ? randInt(thing.m[0] / 100, thing.m[1] / 100) * 100 : randInt(thing.m[0], thing.m[1]);
  const a = randInt(thing.a[0] * 2, thing.a[1] * 2) / 2;
  return {
    text: `${thing.name} of mass ${m} kg accelerates at ${a} m/s².`,
    given: [`$m = ${qty(m, 'kg')}$`, `$a = ${qty(a, 'm/s²')}$`],
    find: 'the resultant force $F$',
    answer: m * a,
    unit: 'N',
    unitOptions: ['N', 'kg', 'm/s²', 'N/kg'],
    solution: [`$${FMA}$`, `$F = ${m} \\times ${a}$`, `$F = ${qty(m * a, 'N')}$`],
    traps: [
      { value: m / a, hint: `You divided. $${FMA}$.` },
      { value: a / m, hint: `Multiply: $${FMA}$.` },
    ],
  };
}

function accelerationOrMass(): Question {
  const m = pick([2, 4, 5, 10, 20, 50]);
  const a = pick([0.5, 1.5, 2, 2.5, 3, 4]);
  const F = m * a;
  if (Math.random() < 0.5) {
    return {
      text: `A resultant force of ${fmt(F)} N acts on a mass of ${m} kg.`,
      given: [`$F = ${qty(F, 'N')}$`, `$m = ${qty(m, 'kg')}$`],
      find: 'the acceleration $a$',
      answer: a,
      unit: 'm/s²',
      unitOptions: ['m/s²', 'm/s', 'N', 'kg'],
      solution: [`$${FMA}$, so $a = \\dfrac{F}{m}$`, `$a = ${frac(F, m)}$`, `$a = ${qty(a, 'm/s²')}$`],
      traps: [
        { value: F * m, hint: 'You multiplied. $a = \\dfrac{F}{m}$.' },
        { value: m / F, hint: 'You divided the wrong way: $a = \\dfrac{F}{m}$.' },
      ],
    };
  }
  return {
    text: `A resultant force of ${fmt(F)} N gives an object an acceleration of ${a} m/s².`,
    given: [`$F = ${qty(F, 'N')}$`, `$a = ${qty(a, 'm/s²')}$`],
    find: 'the mass $m$',
    answer: m,
    unit: 'kg',
    unitOptions: ['kg', 'N', 'm/s²', 'g'],
    solution: [`$${FMA}$, so $m = \\dfrac{F}{a}$`, `$m = ${frac(F, a)}$`, `$m = ${qty(m, 'kg')}$`],
    traps: [
      { value: F * a, hint: 'You multiplied. $m = \\dfrac{F}{a}$.' },
      { value: a / F, hint: 'You divided the wrong way: $m = \\dfrac{F}{a}$.' },
    ],
  };
}

function resultantThenA(): Question {
  const m = randInt(8, 15) * 100;
  const a = pick([0.5, 1, 1.5, 2, 2.5]);
  const resistive = randInt(2, 8) * 100;
  const drive = m * a + resistive;
  return {
    text: `A car of mass ${m} kg has a driving force of ${drive} N. The total resistive force (friction + air resistance) is ${resistive} N.`,
    given: [`$m = ${qty(m, 'kg')}$`, `driving force $= ${qty(drive, 'N')}$`, `resistive force $= ${qty(resistive, 'N')}$`],
    find: 'the acceleration of the car',
    answer: a,
    unit: 'm/s²',
    unitOptions: ['m/s²', 'm/s', 'N', 'kg'],
    solution: [
      `resultant force $F = ${drive} - ${resistive} = ${qty(drive - resistive, 'N')}$`,
      `$a = \\dfrac{F}{m} = ${frac(drive - resistive, m)}$`,
      `$a = ${qty(a, 'm/s²')}$`,
    ],
    traps: [
      { value: drive / m, hint: 'Use the resultant force: driving force − resistive force.' },
      { value: (drive + resistive) / m, hint: 'The resistive force acts backwards: subtract it.' },
    ],
  };
}

export const fmaTopic: Topic = {
  id: 'fma',
  title: 'F = ma',
  levels: [
    { name: 'Level 1', description: 'Find the force' },
    { name: 'Level 2', description: 'Find the acceleration or the mass' },
    { name: 'Level 3', description: 'Resultant force first' },
  ],
  generate: (level) => (level === 1 ? forceFromMA() : level === 2 ? accelerationOrMass() : resultantThenA()),
};

// ---------- Moments ----------

const M_EQ = '\\text{moment} = F \\times d';

function momentQ(): Question {
  const thing = pick([
    { text: 'You push a door handle', F: [10, 40], dcm: [60, 90] },
    { text: 'A mechanic turns a nut with a spanner', F: [20, 80], dcm: [15, 30] },
    { text: 'A child sits on a see-saw', F: [200, 400], dcm: [100, 200] },
  ]);
  const F = randInt(thing.F[0] / 5, thing.F[1] / 5) * 5;
  const dcm = randInt(thing.dcm[0] / 5, thing.dcm[1] / 5) * 5;
  const d = dcm / 100;
  return {
    text: `${thing.text}. The force is ${F} N, at ${dcm} cm from the pivot (at right angles).`,
    given: [`$F = ${qty(F, 'N')}$`, `perpendicular distance $d = ${qty(dcm, 'cm')}$`],
    find: 'the moment of the force, in N m',
    answer: F * d,
    unit: 'N m',
    unitOptions: ['N m', 'N', 'N/m', 'm'],
    solution: [
      `Change cm to m: $d = ${qty(dcm, 'cm')} = ${qty(d, 'm')}$`,
      `$${M_EQ} = ${F} \\times ${fmt(d)}$`,
      `$\\text{moment} = ${qty(F * d, 'N m')}$`,
    ],
    traps: [
      { value: F * dcm, hint: 'This is in N cm. Change the distance to metres first.' },
      { value: F / d, hint: `Multiply: $${M_EQ}$.` },
    ],
  };
}

function balanceOne(): Question {
  const dL = randInt(2, 9) / 10;
  const dR = randInt(2, 9) / 10;
  const FL = randInt(2, 20) * 5;
  const momentL = FL * dL;
  const findF = Math.random() < 0.5;
  const FR = momentL / dR;
  if (findF) {
    return {
      text: `A beam is balanced on a pivot. A force of ${FL} N acts ${fmt(dL)} m to the left of the pivot. A force F acts ${fmt(dR)} m to the right.`,
      figure: beamSvg([{ d: -dL, label: `${FL} N` }, { d: dR, label: 'F' }]),
      given: [`left: $${qty(FL, 'N')}$ at $${qty(dL, 'm')}$`, `right: $F$ at $${qty(dR, 'm')}$`, 'the beam is balanced'],
      find: 'the force $F$',
      answer: FR,
      unit: 'N',
      unitOptions: ['N', 'N m', 'm', 'kg'],
      solution: [
        'Balanced: anticlockwise moment = clockwise moment',
        `$${FL} \\times ${fmt(dL)} = F \\times ${fmt(dR)}$`,
        `$F = ${frac(fmt(momentL), dR)} = ${qty(FR, 'N')}$`,
      ],
      traps: [
        { value: FL, hint: 'The distances are different, so the forces are different. Use the principle of moments.' },
        { value: (FL * dR) / dL, hint: 'Each force is multiplied by its own distance: $F_1 d_1 = F_2 d_2$.' },
      ],
    };
  }
  const FR2 = randInt(2, 20) * 5;
  const d2 = momentL / FR2;
  if (d2 > 1.2 || d2 < 0.05) return balanceOne();
  return {
    text: `A beam is balanced on a pivot. A force of ${FL} N acts ${fmt(dL)} m to the left of the pivot. Where must a force of ${FR2} N act on the right?`,
    figure: beamSvg([{ d: -dL, label: `${FL} N` }, { d: Math.min(d2, 1), label: `${FR2} N` }], 1, false),
    given: [`left: $${qty(FL, 'N')}$ at $${qty(dL, 'm')}$`, `right: $${qty(FR2, 'N')}$ at distance $d$`],
    find: 'the distance $d$ from the pivot',
    answer: d2,
    unit: 'm',
    unitOptions: ['m', 'N', 'N m', 'cm²'],
    solution: [
      'Balanced: anticlockwise moment = clockwise moment',
      `$${FL} \\times ${fmt(dL)} = ${FR2} \\times d$`,
      `$d = ${frac(fmt(momentL), FR2)} = ${qty(d2, 'm')}$`,
    ],
    traps: [
      { value: (FR2 * dL) / FL, hint: 'Each force is multiplied by its own distance: $F_1 d_1 = F_2 d_2$.' },
      { value: dL, hint: 'The forces are different, so the distances are different.' },
    ],
  };
}

function balanceMany(): Question {
  // Keep the two left forces far apart, so their labels do not overlap in the figure.
  const loads = [
    { F: randInt(2, 10) * 5, d: randInt(2, 4) / 10 },
    { F: randInt(2, 10) * 5, d: randInt(6, 9) / 10 },
  ];
  const dR = randInt(3, 9) / 10;
  const total = loads[0].F * loads[0].d + loads[1].F * loads[1].d;
  const FR = total / dR;
  return {
    text: `A beam is balanced on a pivot. On the left: ${loads[0].F} N at ${fmt(loads[0].d)} m and ${loads[1].F} N at ${fmt(loads[1].d)} m. On the right: a force F at ${fmt(dR)} m.`,
    figure: beamSvg([
      { d: -loads[0].d, label: `${loads[0].F} N` },
      { d: -loads[1].d, label: `${loads[1].F} N` },
      { d: dR, label: 'F' },
    ], 1, false),
    given: [
      `left: $${qty(loads[0].F, 'N')}$ at $${qty(loads[0].d, 'm')}$ and $${qty(loads[1].F, 'N')}$ at $${qty(loads[1].d, 'm')}$`,
      `right: $F$ at $${qty(dR, 'm')}$`,
    ],
    find: 'the force $F$',
    answer: FR,
    unit: 'N',
    unitOptions: ['N', 'N m', 'm', 'kg'],
    solution: [
      `total anticlockwise moment $= ${loads[0].F} \\times ${fmt(loads[0].d)} + ${loads[1].F} \\times ${fmt(loads[1].d)} = ${qty(total, 'N m')}$`,
      `$F \\times ${fmt(dR)} = ${fmt(total)}$`,
      `$F = ${frac(fmt(total), dR)} = ${qty(FR, 'N')}$`,
    ],
    traps: [
      { value: (loads[0].F * loads[0].d) / dR, hint: 'Add the moments of both forces on the left.' },
      { value: ((loads[0].F + loads[1].F) * (loads[0].d + loads[1].d)) / dR, hint: 'Multiply each force by its own distance, then add the moments.' },
    ],
  };
}

export const momentsTopic: Topic = {
  id: 'moments',
  title: 'Moments',
  levels: [
    { name: 'Level 1', description: 'Moment of a force' },
    { name: 'Level 2', description: 'Balance a beam' },
    { name: 'Level 3', description: 'Several forces (Extended)' },
  ],
  generate: (level) => (level === 1 ? momentQ() : level === 2 ? balanceOne() : balanceMany()),
};
