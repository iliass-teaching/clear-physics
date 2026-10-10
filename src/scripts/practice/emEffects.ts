// Unit 15 practice: transformers (4.5.6 C3, S7) and power losses in cables (4.5.6 S8).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, sci } from './random';

const T_EQ = '\\dfrac{V_p}{V_s} = \\dfrac{N_p}{N_s}';

// ---------- Transformers ----------

function secondaryVoltage(): Question {
  const sit = pick([
    { text: 'A phone charger has a transformer', Vp: 230, Np: [2300, 4600], Ns: [50, 100, 120] },
    { text: 'A transformer for a model railway', Vp: 230, Np: [1000, 2000], Ns: [50, 80, 100] },
    { text: 'A step-up transformer', Vp: 12, Np: [50, 100, 200], Ns: [1000, 2000, 4000] },
  ]);
  const Np = pick(sit.Np);
  const Ns = pick(sit.Ns);
  const Vs = (sit.Vp * Ns) / Np;
  return {
    text: `${sit.text}: the primary coil has ${Np} turns and the secondary coil has ${Ns} turns. The primary p.d. is ${sit.Vp} V.`,
    given: [`$V_p = ${qty(sit.Vp, 'V')}$`, `$N_p = ${Np}$`, `$N_s = ${Ns}$`],
    find: 'the secondary p.d. $V_s$',
    answer: Vs,
    unit: 'V',
    unitOptions: ['V', 'A', 'W'],
    solution: [`$${T_EQ}$, so $V_s = V_p \\times \\dfrac{N_s}{N_p}$`, `$V_s = ${sit.Vp} \\times ${frac(Ns, Np)}$`, `$V_s = ${qty(Vs, 'V')}$`],
    traps: [{ value: (sit.Vp * Np) / Ns, hint: 'Upside down. More turns on the secondary means a bigger secondary p.d.' }],
  };
}

function turns(): Question {
  if (Math.random() < 0.5) {
    const Vp = 230;
    const Vs = pick([6, 9, 11.5, 23, 46]);
    const Np = pick([1000, 2000, 4600]);
    const Ns = (Np * Vs) / Vp;
    return {
      text: `A transformer changes 230 V to ${Vs} V. The primary coil has ${Np} turns.`,
      given: [`$V_p = ${qty(Vp, 'V')}$`, `$V_s = ${qty(Vs, 'V')}$`, `$N_p = ${Np}$`],
      find: 'the number of turns on the secondary coil',
      answer: Ns,
      unit: 'turns',
      unitOptions: ['turns', 'V', 'A'],
      tolerance: 0.01,
      solution: [`$${T_EQ}$, so $N_s = N_p \\times \\dfrac{V_s}{V_p}$`, `$N_s = ${Np} \\times ${frac(Vs, Vp)}$`, `$N_s = ${fmt(Ns)}$ turns`],
      traps: [{ value: (Np * Vp) / Vs, hint: 'Upside down. A step-down transformer has fewer turns on the secondary.' }],
    };
  }
  const Vp = pick([11000, 25000]);
  const Vs = 400000;
  const Ns = pick([16000, 32000, 40000]);
  const Np = (Ns * Vp) / Vs;
  return {
    text: `A step-up transformer at a power station changes ${fmt(Vp)} V to 400 000 V. The secondary coil has ${fmt(Ns)} turns.`,
    given: [`$V_p = ${fmt(Vp)}\\,\\text{V}$`, `$V_s = 400\\,000\\,\\text{V}$`, `$N_s = ${fmt(Ns)}$`],
    find: 'the number of turns on the primary coil',
    answer: Np,
    unit: 'turns',
    unitOptions: ['turns', 'V', 'A'],
    tolerance: 0.01,
    solution: [`$${T_EQ}$, so $N_p = N_s \\times \\dfrac{V_p}{V_s}$`, `$N_p = ${fmt(Ns)} \\times \\dfrac{${fmt(Vp)}}{400\\,000}$`, `$N_p = ${fmt(Np)}$ turns`],
    traps: [{ value: (Ns * Vs) / Vp, hint: 'Upside down. A step-up transformer has fewer turns on the primary.' }],
  };
}

function transformerCurrent(): Question {
  const Vp = 230;
  const Vs = pick([6, 12, 23]);
  const Is = pick([0.5, 1, 2, 4]);
  const Ip = (Vs * Is) / Vp;
  return {
    text: `A transformer is 100% efficient. It changes 230 V to ${Vs} V. The current in the secondary coil is ${Is} A.`,
    given: [`$V_p = ${qty(Vp, 'V')}$`, `$V_s = ${qty(Vs, 'V')}$`, `$I_s = ${qty(Is, 'A')}$`],
    find: 'the current in the primary coil',
    answer: Ip,
    unit: 'A',
    unitOptions: ['A', 'V', 'W'],
    solution: [
      '100% efficient: power in = power out, so $I_p V_p = I_s V_s$',
      `$I_p = \\dfrac{I_s V_s}{V_p} = \\dfrac{${Is} \\times ${Vs}}{${Vp}}$`,
      `$I_p = ${qty(Ip, 'A')}$`,
    ],
    traps: [{ value: (Is * Vp) / Vs, hint: 'Upside down. In a step-down transformer, the primary current is smaller than the secondary current.' }],
  };
}

export const transformerTopic: Topic = {
  id: 'transformer',
  title: 'Transformers',
  levels: [
    { name: 'Level 1', description: 'Secondary p.d.' },
    { name: 'Level 2', description: 'Number of turns' },
    { name: 'Level 3', description: 'Currents (Extended)' },
  ],
  generate: (level) => (level === 1 ? secondaryVoltage() : level === 2 ? turns() : transformerCurrent()),
};

// ---------- Power losses in transmission cables (Extended) ----------

function cableCurrent(): Question {
  const P = pick([20, 50, 100, 200]); // MW
  const V = pick([100, 200, 400]); // kV
  const I = (P * 1e6) / (V * 1e3);
  return {
    text: `A power station sends ${P} MW of power along cables at ${V} kV.`,
    given: [`$P = ${P}\\,\\text{MW} = ${sci(P * 1e6, 2)}\\,\\text{W}$`, `$V = ${V}\\,\\text{kV} = ${sci(V * 1e3, 2)}\\,\\text{V}$`],
    find: 'the current in the cables',
    answer: I,
    unit: 'A',
    unitOptions: ['A', 'W', 'V'],
    solution: ['$P = IV$, so $I = \\dfrac{P}{V}$', `$I = \\dfrac{${sci(P * 1e6, 2)}}{${sci(V * 1e3, 2)}}$`, `$I = ${qty(I, 'A')}$`],
    traps: [{ value: P / V, hint: 'Change MW to W (× 1 000 000) and kV to V (× 1000) first.' }],
  };
}

function powerLoss(): Question {
  const I = pick([50, 100, 200, 500]);
  const R = pick([2, 5, 10, 20]);
  const loss = I * I * R;
  return {
    text: `The current in a transmission cable is ${I} A. The resistance of the cable is ${R} Ω.`,
    given: [`$I = ${qty(I, 'A')}$`, `$R = ${R}\\,\\Omega$`],
    find: 'the power lost as heat in the cable',
    answer: loss,
    unit: 'W',
    unitOptions: ['W', 'A', 'V'],
    sci: loss >= 1e5,
    solution: ['$P = I^2 R$', `$P = ${I}^2 \\times ${R}$`, `$P = ${qty(loss, 'W')}$`],
    traps: [
      { value: I * R, hint: 'This is the p.d. across the cable. Power lost: $P = I^2 R$.' },
      { value: 2 * I * R, hint: 'Square the current: $I^2 = I \\times I$.' },
    ],
  };
}

function compareLosses(): Question {
  const pairs: [number, number][] = [[25, 400], [100, 400], [11, 132], [50, 200], [20, 400]];
  const [V1, V2] = pick(pairs);
  const k = V2 / V1;
  return {
    text: `The same power is sent along the same cables, first at ${V1} kV, then at ${V2} kV.`,
    given: [`$V_1 = ${V1}\\,\\text{kV}$`, `$V_2 = ${V2}\\,\\text{kV}$`],
    find: 'how many times smaller the power loss is at the higher p.d.',
    answer: k * k,
    unit: 'times',
    unitOptions: ['times', 'W', 'A'],
    solution: [
      `Same power, $P = IV$: the p.d. is ${fmt(k)} times bigger, so the current is ${fmt(k)} times smaller.`,
      `Power loss $= I^2 R$: the loss is $${fmt(k)}^2 = ${fmt(k * k)}$ times smaller.`,
    ],
    traps: [{ value: k, hint: 'The current is that many times smaller, but the loss depends on $I^2$: square it.' }],
  };
}

export const transmissionTopic: Topic = {
  id: 'transmission',
  title: 'Power losses in cables',
  levels: [
    { name: 'Level 1', description: 'Current in the cables' },
    { name: 'Level 2', description: 'Power loss: I²R' },
    { name: 'Level 3', description: 'Compare two voltages' },
  ],
  generate: (level) => (level === 1 ? cableCurrent() : level === 2 ? powerLoss() : compareLosses()),
};
