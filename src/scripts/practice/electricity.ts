// Unit 13 practice: charge and current (4.2.2 S5), e.m.f. and p.d. (4.2.3 S6, S7), resistance (4.2.4),
// electrical power and energy (4.2.5), kilowatt-hours and cost.
import type { Question, Topic } from './types';
import { an, fmt, frac, pick, qty } from './random';

// ---------- Charge and current: Q = I t (Extended) ----------

function currentFromQ(): Question {
  const t = pick([2, 4, 5, 10, 20, 50]);
  const I = pick([0.2, 0.5, 1.5, 2, 3, 4]);
  const Q = I * t;
  return {
    text: `A charge of ${fmt(Q)} C passes a point in a circuit in ${t} s.`,
    given: [`$Q = ${qty(Q, 'C')}$`, `$t = ${qty(t, 's')}$`],
    find: 'the current $I$',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'C', 's', 'V'],
    solution: ['$I = \\dfrac{Q}{t}$', `$I = ${frac(Q, t)}$`, `$I = ${qty(I, 'A')}$`],
    traps: [
      { value: Q * t, hint: 'Divide: $I = \\dfrac{Q}{t}$.' },
      { value: t / Q, hint: 'Upside down: $I = \\dfrac{Q}{t}$.' },
    ],
  };
}

function chargeFromI(): Question {
  const I = pick([0.2, 0.25, 0.5, 1.5, 2, 3]);
  const minutes = pick([2, 3, 5, 10]);
  const t = minutes * 60;
  const Q = I * t;
  return {
    text: `A lamp has a current of ${I} A. It is switched on for ${minutes} minutes.`,
    given: [`$I = ${qty(I, 'A')}$`, `$t = ${minutes}\\,\\text{min} = ${t}\\,\\text{s}$`],
    find: 'the charge $Q$ that passes through the lamp',
    answer: Q,
    unit: 'C',
    unitOptions: ['C', 'A', 's', 'J'],
    solution: ['$I = \\dfrac{Q}{t}$, so $Q = I t$', `$Q = ${I} \\times ${t}$`, `$Q = ${qty(Q, 'C')}$`],
    traps: [
      { value: I * minutes, hint: 'Change the time to seconds: 1 minute = 60 s.' },
      { value: t / I, hint: 'Multiply: $Q = I t$.' },
    ],
  };
}

function timeFromQ(): Question {
  const I = pick([0.4, 0.5, 2, 2.5, 4]);
  const t = pick([30, 60, 120, 300, 600]);
  const Q = I * t;
  return {
    text: `A current of ${I} A flows in a heater. A total charge of ${fmt(Q)} C passes through it.`,
    given: [`$I = ${qty(I, 'A')}$`, `$Q = ${qty(Q, 'C')}$`],
    find: 'the time, in seconds',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'A', 'C', 'min'],
    solution: ['$I = \\dfrac{Q}{t}$, so $t = \\dfrac{Q}{I}$', `$t = ${frac(Q, I)}$`, `$t = ${qty(t, 's')}$`],
    traps: [{ value: Q * I, hint: 'Divide: $t = \\dfrac{Q}{I}$.' }],
  };
}

export const chargeTopic: Topic = {
  id: 'charge-current',
  title: 'Charge and current',
  levels: [
    { name: 'Level 1', description: 'Current from charge and time' },
    { name: 'Level 2', description: 'Charge (time in minutes)' },
    { name: 'Level 3', description: 'Find the time' },
  ],
  generate: (level) => (level === 1 ? currentFromQ() : level === 2 ? chargeFromI() : timeFromQ()),
};

// ---------- Volts: V = W / Q (Extended) ----------

function voltsBasic(): Question {
  const Q = pick([2, 5, 10, 20, 50]);
  const V = pick([1.5, 3, 6, 9, 12]);
  const W = V * Q;
  const emf = Math.random() < 0.5;
  return {
    text: emf
      ? `A battery does ${fmt(W)} J of work to move a charge of ${Q} C around a complete circuit.`
      : `A charge of ${Q} C passes through a lamp. It transfers ${fmt(W)} J of energy to the lamp.`,
    given: [`$W = ${qty(W, 'J')}$`, `$Q = ${qty(Q, 'C')}$`],
    find: emf ? 'the e.m.f. $E$ of the battery' : 'the p.d. $V$ across the lamp',
    answer: V,
    unit: 'V',
    unitOptions: ['V', 'J', 'C', 'A'],
    solution: [`$${emf ? 'E' : 'V'} = \\dfrac{W}{Q}$`, `$${emf ? 'E' : 'V'} = ${frac(W, Q)}$`, `$${emf ? 'E' : 'V'} = ${qty(V, 'V')}$`],
    traps: [
      { value: W * Q, hint: 'Divide: work ÷ charge.' },
      { value: Q / W, hint: 'Upside down: work ÷ charge.' },
    ],
  };
}

function workFromV(): Question {
  const V = pick([1.5, 6, 9, 12, 230]);
  const Q = pick([4, 10, 25, 60, 100]);
  const W = V * Q;
  return {
    text: `A charge of ${Q} C passes through a component. The p.d. across the component is ${V} V.`,
    given: [`$V = ${qty(V, 'V')}$`, `$Q = ${qty(Q, 'C')}$`],
    find: 'the energy (work done) $W$',
    answer: W,
    unit: 'J',
    unitOptions: ['J', 'V', 'C', 'W'],
    solution: ['$V = \\dfrac{W}{Q}$, so $W = V Q$', `$W = ${V} \\times ${Q}$`, `$W = ${qty(W, 'J')}$`],
    traps: [{ value: V / Q, hint: 'Multiply: $W = V Q$.' }],
  };
}

function voltsTwoSteps(): Question {
  const I = pick([0.5, 2, 3, 4]);
  const t = pick([10, 20, 30, 60]);
  const V = pick([3, 6, 12]);
  const Q = I * t;
  const W = V * Q;
  return {
    text: `A current of ${I} A flows through a motor for ${t} s. The motor transfers ${fmt(W)} J of energy.`,
    given: [`$I = ${qty(I, 'A')}$`, `$t = ${qty(t, 's')}$`, `$W = ${qty(W, 'J')}$`],
    find: 'the p.d. across the motor',
    answer: V,
    unit: 'V',
    unitOptions: ['V', 'J', 'C', 'A'],
    solution: [`First the charge: $Q = I t = ${I} \\times ${t} = ${qty(Q, 'C')}$`, `$V = \\dfrac{W}{Q} = ${frac(W, Q)}$`, `$V = ${qty(V, 'V')}$`],
    traps: [
      { value: W / I, hint: 'Find the charge first: $Q = I t$. Then $V = \\dfrac{W}{Q}$.' },
      { value: W / t, hint: 'This is the power. Divide by the charge: $Q = I t$.' },
    ],
  };
}

export const voltsTopic: Topic = {
  id: 'emf-pd',
  title: 'E.m.f. and p.d.',
  levels: [
    { name: 'Level 1', description: 'V = W ÷ Q' },
    { name: 'Level 2', description: 'Energy transferred' },
    { name: 'Level 3', description: 'Two steps: Q = It, then V' },
  ],
  generate: (level) => (level === 1 ? voltsBasic() : level === 2 ? workFromV() : voltsTwoSteps()),
};

// ---------- Resistance: R = V / I ----------

function resistanceBasic(): Question {
  const R = pick([2, 4, 5, 10, 12, 20, 25, 50]);
  const I = pick([0.1, 0.2, 0.25, 0.4, 0.5, 2]);
  const V = R * I;
  return {
    text: `The p.d. across a resistor is ${fmt(V)} V and the current in it is ${I} A.`,
    given: [`$V = ${qty(V, 'V')}$`, `$I = ${qty(I, 'A')}$`],
    find: 'the resistance $R$',
    answer: R,
    unit: 'Ω',
    unitOptions: ['Ω', 'V', 'A', 'W'],
    solution: ['$R = \\dfrac{V}{I}$', `$R = ${frac(V, I)}$`, `$R = ${R}\\,\\Omega$`],
    traps: [
      { value: V * I, hint: 'Divide: $R = \\dfrac{V}{I}$.' },
      { value: I / V, hint: 'Upside down: $R = \\dfrac{V}{I}$.' },
    ],
  };
}

function voltsOrAmps(): Question {
  const R = pick([4, 6, 10, 15, 20, 30, 100]);
  if (Math.random() < 0.5) {
    const I = pick([0.2, 0.3, 0.5, 1.5, 2]);
    return {
      text: `A current of ${I} A flows through ${an(R)} ${R} Ω resistor.`,
      given: [`$I = ${qty(I, 'A')}$`, `$R = ${R}\\,\\Omega$`],
      find: 'the p.d. across the resistor',
      answer: I * R,
      unit: 'V',
      unitOptions: ['V', 'A', 'Ω', 'W'],
      solution: ['$R = \\dfrac{V}{I}$, so $V = I R$', `$V = ${I} \\times ${R}$`, `$V = ${qty(I * R, 'V')}$`],
      traps: [{ value: R / I, hint: 'Multiply: $V = I R$.' }],
    };
  }
  let V = pick([1.5, 3, 6, 9, 12]);
  if (V === R) V = 9;
  return {
    text: `A p.d. of ${V} V is connected across ${an(R)} ${R} Ω resistor.`,
    given: [`$V = ${qty(V, 'V')}$`, `$R = ${R}\\,\\Omega$`],
    find: 'the current in the resistor',
    answer: V / R,
    unit: 'A',
    unitOptions: ['A', 'V', 'Ω', 'W'],
    solution: ['$R = \\dfrac{V}{I}$, so $I = \\dfrac{V}{R}$', `$I = ${frac(V, R)}$`, `$I = ${qty(V / R, 'A')}$`],
    traps: [
      { value: V * R, hint: 'Divide: $I = \\dfrac{V}{R}$.' },
      { value: R / V, hint: 'Upside down: $I = \\dfrac{V}{R}$.' },
    ],
  };
}

function resistanceUnits(): Question {
  if (Math.random() < 0.5) {
    const mA = pick([20, 40, 50, 120, 250]);
    const V = pick([2, 3, 6, 9, 12]);
    const R = V / (mA / 1000);
    return {
      text: `A voltmeter reads ${V} V across a component. The ammeter reads ${mA} mA.`,
      given: [`$V = ${qty(V, 'V')}$`, `$I = ${mA}\\,\\text{mA} = ${fmt(mA / 1000)}\\,\\text{A}$`],
      find: 'the resistance of the component',
      answer: R,
      unit: 'Ω',
      unitOptions: ['Ω', 'kΩ', 'V', 'A'],
      solution: ['Change mA to A: $1\\,\\text{mA} = 0.001\\,\\text{A}$', `$R = \\dfrac{V}{I} = ${frac(V, fmt(mA / 1000))}$`, `$R = ${fmt(R)}\\,\\Omega$`],
      traps: [{ value: V / mA, hint: 'Change mA to A first: 1000 mA = 1 A.' }],
    };
  }
  const k = pick([1, 2, 4.7, 10]);
  const V = pick([5, 6, 9, 12]);
  const I = V / (k * 1000);
  return {
    text: `${an(k, true)} ${k} kΩ resistor is connected to ${an(V)} ${V} V supply.`,
    given: [`$V = ${qty(V, 'V')}$`, `$R = ${k}\\,\\text{k}\\Omega = ${fmt(k * 1000)}\\,\\Omega$`],
    find: 'the current, in A',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'mA', 'V', 'Ω'],
    sci: I < 0.001,
    solution: ['$1\\,\\text{k}\\Omega = 1000\\,\\Omega$', `$I = \\dfrac{V}{R} = ${frac(V, fmt(k * 1000))}$`, `$I = ${qty(I, 'A')}$ (${fmt(I * 1000)} mA)`],
    traps: [{ value: V / k, hint: 'Change kΩ to Ω first: 1 kΩ = 1000 Ω.' }],
  };
}

export const resistanceTopic: Topic = {
  id: 'resistance',
  title: 'Resistance',
  levels: [
    { name: 'Level 1', description: 'R = V ÷ I' },
    { name: 'Level 2', description: 'Find V or I' },
    { name: 'Level 3', description: 'mA and kΩ' },
  ],
  generate: (level) => (level === 1 ? resistanceBasic() : level === 2 ? voltsOrAmps() : resistanceUnits()),
};

// ---------- Resistance of a wire (Extended) ----------

function wireLength(): Question {
  const R = pick([2, 3, 4, 5, 6, 8]);
  const L1 = pick([0.5, 1, 2]);
  const k = pick([2, 3, 4, 0.5]);
  const L2 = L1 * k;
  return {
    text: `A metal wire ${L1} m long has a resistance of ${R} Ω. Another wire of the same metal and the same thickness is ${fmt(L2)} m long.`,
    given: [`$R_1 = ${R}\\,\\Omega$`, `$L_1 = ${qty(L1, 'm')}$`, `$L_2 = ${qty(L2, 'm')}$`],
    find: 'the resistance of the second wire',
    answer: R * k,
    unit: 'Ω',
    unitOptions: ['Ω', 'm', 'V', 'A'],
    solution: ['Resistance is directly proportional to length.', `The length is multiplied by ${fmt(k)}, so $R_2 = ${R} \\times ${fmt(k)}$`, `$R_2 = ${fmt(R * k)}\\,\\Omega$`],
    traps: [{ value: R / k, hint: 'A longer wire has a bigger resistance: R is proportional to length.' }],
  };
}

function wireArea(): Question {
  const R = pick([4, 6, 8, 12, 20]);
  const k = pick([2, 3, 4]);
  const thicker = Math.random() < 0.5;
  const R2 = thicker ? R / k : R * k;
  return {
    text: `A wire has a resistance of ${R} Ω. A second wire of the same metal and the same length has ${thicker ? `${k} times the cross-sectional area` : `1/${k} of the cross-sectional area`}.`,
    given: [`$R_1 = ${R}\\,\\Omega$`, thicker ? `$A_2 = ${k} A_1$` : `$A_2 = \\dfrac{A_1}{${k}}$`],
    find: 'the resistance of the second wire',
    answer: R2,
    unit: 'Ω',
    unitOptions: ['Ω', 'm²', 'V', 'A'],
    solution: ['Resistance is inversely proportional to the cross-sectional area.', thicker ? `Area × ${k}, so resistance ÷ ${k}: $R_2 = \\dfrac{${R}}{${k}}$` : `Area ÷ ${k}, so resistance × ${k}: $R_2 = ${R} \\times ${k}$`, `$R_2 = ${fmt(R2)}\\,\\Omega$`],
    traps: [{ value: thicker ? R * k : R / k, hint: 'A thicker wire has a smaller resistance (inversely proportional to area).' }],
  };
}

function wireDiameter(): Question {
  const R = pick([4, 8, 9, 12, 16]);
  if (Math.random() < 0.5) {
    const k = 2;
    return {
      text: `A wire has a resistance of ${R} Ω. A second wire of the same metal and the same length has twice the diameter.`,
      given: [`$R_1 = ${R}\\,\\Omega$`, '$d_2 = 2 d_1$'],
      find: 'the resistance of the second wire',
      answer: R / 4,
      unit: 'Ω',
      unitOptions: ['Ω', 'm', 'V', 'A'],
      solution: ['Area of a circle $= \\pi r^2$: twice the diameter gives $2^2 = 4$ times the area.', `Resistance is inversely proportional to area: $R_2 = \\dfrac{${R}}{4}$`, `$R_2 = ${fmt(R / 4)}\\,\\Omega$`],
      traps: [{ value: R / k, hint: 'Twice the diameter gives 4 times the area (area ∝ diameter²).' }],
    };
  }
  const L = pick([2, 3]);
  const A = L === 2 ? 3 : 2;
  return {
    text: `A wire has a resistance of ${R} Ω. A second wire of the same metal is ${L} times as long and has ${A} times the cross-sectional area.`,
    given: [`$R_1 = ${R}\\,\\Omega$`, `$L_2 = ${L} L_1$`, `$A_2 = ${A} A_1$`],
    find: 'the resistance of the second wire',
    answer: (R * L) / A,
    unit: 'Ω',
    unitOptions: ['Ω', 'm', 'V', 'A'],
    solution: [`Length × ${L}: resistance × ${L}. Area × ${A}: resistance ÷ ${A}.`, `$R_2 = ${R} \\times \\dfrac{${L}}{${A}}$`, `$R_2 = ${fmt((R * L) / A)}\\,\\Omega$`],
    traps: [{ value: (R * A) / L, hint: 'Length: multiply. Area: divide.' }],
  };
}

export const wireTopic: Topic = {
  id: 'wire-resistance',
  title: 'Resistance of a wire',
  levels: [
    { name: 'Level 1', description: 'Length' },
    { name: 'Level 2', description: 'Cross-sectional area' },
    { name: 'Level 3', description: 'Diameter, or length and area' },
  ],
  generate: (level) => (level === 1 ? wireLength() : level === 2 ? wireArea() : wireDiameter()),
};

// ---------- Electrical power and energy: P = IV, E = IVt ----------

function powerBasic(): Question {
  const sit = pick([
    { text: 'A lamp is connected to a 12 V supply. The current is {I} A.', V: 12, I: [0.5, 1.5, 2, 3] },
    { text: 'A kettle is connected to the 230 V mains. The current is {I} A.', V: 230, I: [8, 10, 12] },
    { text: 'A phone charger works at 5 V with a current of {I} A.', V: 5, I: [0.5, 2, 3] },
  ]);
  const I = pick(sit.I);
  const P = I * sit.V;
  return {
    text: sit.text.replace('{I}', String(I)),
    given: [`$V = ${qty(sit.V, 'V')}$`, `$I = ${qty(I, 'A')}$`],
    find: 'the power $P$',
    answer: P,
    unit: 'W',
    unitOptions: ['W', 'J', 'V', 'A'],
    solution: ['$P = I V$', `$P = ${I} \\times ${sit.V}$`, `$P = ${qty(P, 'W')}$`],
    traps: [{ value: sit.V / I, hint: 'Multiply: $P = I V$. ($\\dfrac{V}{I}$ is the resistance.)' }],
  };
}

function currentFromP(): Question {
  const sit = pick([
    { name: 'an electric heater', P: [1000, 2000, 2300, 3000] },
    { name: 'a hair dryer', P: [920, 1150, 1840] },
    { name: 'a television', P: [69, 115, 230] },
  ]);
  const P = pick(sit.P);
  const I = P / 230;
  return {
    text: `The power of ${sit.name} is ${P} W. It is connected to the 230 V mains.`,
    given: [`$P = ${qty(P, 'W')}$`, `$V = ${qty(230, 'V')}$`],
    find: 'the current',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'W', 'V', 'Ω'],
    solution: ['$P = I V$, so $I = \\dfrac{P}{V}$', `$I = ${frac(P, 230)}$`, `$I = ${qty(I, 'A')}$`],
    traps: [{ value: P * 230, hint: 'Divide: $I = \\dfrac{P}{V}$.' }],
  };
}

function energyIVt(): Question {
  const V = pick([6, 12, 230]);
  const I = V === 230 ? pick([2, 4, 5]) : pick([0.5, 1.5, 2]);
  const minutes = pick([2, 5, 10, 15]);
  const t = minutes * 60;
  const E = I * V * t;
  return {
    text: `A heater works at ${V} V with a current of ${I} A. It is switched on for ${minutes} minutes.`,
    given: [`$V = ${qty(V, 'V')}$`, `$I = ${qty(I, 'A')}$`, `$t = ${minutes}\\,\\text{min} = ${t}\\,\\text{s}$`],
    find: 'the energy transferred $E$',
    answer: E,
    unit: 'J',
    unitOptions: ['J', 'W', 'kW h', 'C'],
    sci: E >= 1e5,
    solution: ['$E = I V t$ (time in seconds)', `$E = ${I} \\times ${V} \\times ${t}$`, `$E = ${qty(E, 'J')}$`],
    traps: [
      { value: I * V * minutes, hint: 'Change the time to seconds: 1 minute = 60 s.' },
      { value: I * V, hint: 'This is the power. Multiply by the time too: $E = IVt$.' },
    ],
  };
}

export const powerTopicE: Topic = {
  id: 'electrical-power',
  title: 'Electrical power and energy',
  levels: [
    { name: 'Level 1', description: 'P = IV' },
    { name: 'Level 2', description: 'Current from power' },
    { name: 'Level 3', description: 'E = IVt' },
  ],
  generate: (level) => (level === 1 ? powerBasic() : level === 2 ? currentFromP() : energyIVt()),
};

// ---------- Kilowatt-hours and cost ----------

function kwhEnergy(): Question {
  const P = pick([0.5, 1, 1.5, 2, 3]);
  const h = pick([2, 3, 4, 5, 8]);
  return {
    text: `${an(P, true)} ${P} kW heater is switched on for ${h} hours.`,
    given: [`$P = ${qty(P, 'kW')}$`, `$t = ${qty(h, 'h')}$`],
    find: 'the energy transferred, in kW h',
    answer: P * h,
    unit: 'kW h',
    unitOptions: ['kW h', 'J', 'kW', 'W'],
    solution: ['energy (kW h) = power (kW) × time (h)', `energy $= ${P} \\times ${h}$`, `energy $= ${fmt(P * h)}\\,\\text{kW h}$`],
    traps: [{ value: P / h, hint: 'Multiply the power by the time.' }],
  };
}

function kwhCost(): Question {
  const P = pick([1, 2, 2.5, 3]);
  const h = pick([2, 3, 4, 6]);
  const price = pick([15, 20, 25, 30]);
  const E = P * h;
  return {
    text: `An oven of power ${P} kW is used for ${h} hours. One kW h costs ${price} cents.`,
    given: [`$P = ${qty(P, 'kW')}$`, `$t = ${qty(h, 'h')}$`, `price $= ${price}$ cents per kW h`],
    find: 'the cost, in cents',
    answer: E * price,
    unit: 'cents',
    unitOptions: ['cents', 'kW h', 'kW', 'J'],
    solution: [`energy $= ${P} \\times ${h} = ${fmt(E)}\\,\\text{kW h}$`, `cost $= ${fmt(E)} \\times ${price}$`, `cost $= ${fmt(E * price)}$ cents`],
    traps: [{ value: E, hint: 'This is the energy in kW h. Multiply by the price of one kW h.' }],
  };
}

function kwhConversions(): Question {
  const W = pick([60, 100, 500, 750, 1500, 2000]);
  const minutes = pick([30, 45, 90, 120, 15]);
  const price = pick([20, 25, 30]);
  const E = (W / 1000) * (minutes / 60);
  return {
    text: `${an(W, true)} ${W} W appliance is used for ${minutes} minutes. One kW h costs ${price} cents.`,
    given: [`$P = ${W}\\,\\text{W} = ${fmt(W / 1000)}\\,\\text{kW}$`, `$t = ${minutes}\\,\\text{min} = ${fmt(minutes / 60)}\\,\\text{h}$`, `price $= ${price}$ cents per kW h`],
    find: 'the cost, in cents',
    answer: E * price,
    unit: 'cents',
    unitOptions: ['cents', 'kW h', 'kW', 'J'],
    tolerance: 0.03,
    solution: [
      `Change to kW and hours: $${fmt(W / 1000)}\\,\\text{kW}$ and $${fmt(minutes / 60)}\\,\\text{h}$`,
      `energy $= ${fmt(W / 1000)} \\times ${fmt(minutes / 60)} = ${fmt(E)}\\,\\text{kW h}$`,
      `cost $= ${fmt(E)} \\times ${price} = ${fmt(E * price)}$ cents`,
    ],
    traps: [
      { value: W * minutes * price, hint: 'Change W to kW (÷ 1000) and minutes to hours (÷ 60).' },
      { value: (W / 1000) * minutes * price, hint: 'Change minutes to hours: 60 min = 1 h.' },
    ],
  };
}

export const kwhTopic: Topic = {
  id: 'kwh-cost',
  title: 'Kilowatt-hours and cost',
  levels: [
    { name: 'Level 1', description: 'Energy in kW h' },
    { name: 'Level 2', description: 'Cost' },
    { name: 'Level 3', description: 'W and minutes' },
  ],
  generate: (level) => (level === 1 ? kwhEnergy() : level === 2 ? kwhCost() : kwhConversions()),
};

