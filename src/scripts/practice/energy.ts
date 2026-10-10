// Unit 5 practice: Ek and Ep (1.7.1 S4-S5), energy transfers (S6), work (1.7.2), power (1.7.4), efficiency (1.7.3 S7).
import type { Question, Topic } from './types';
import { an, fmt, frac, pick, qty, randInt } from './random';
import { sankeySvg } from '../../lib/energyFigures';

const G = 9.8;
const E_UNITS = ['J', 'W', 'N', 'kg m/s'];

// ---------- Kinetic and gravitational potential energy (Extended) ----------

const EK = 'E_k = \\tfrac{1}{2}mv^2';
const EP = '\\Delta E_p = mg\\Delta h';

function kineticEnergy(): Question {
  const thing = pick([
    { name: 'A ball', m: [0.2, 0.2, 0.5, 0.5], v: [4, 20] },
    { name: 'A runner', m: [50, 80], v: [3, 9] },
    { name: 'A car', m: [800, 1500], v: [10, 30] },
  ]);
  const m = thing.m[0] < 1 ? pick(thing.m) : thing.m[1] > 500 ? randInt(thing.m[0] / 100, thing.m[1] / 100) * 100 : randInt(thing.m[0], thing.m[1]);
  const v = randInt(thing.v[0], thing.v[1]);
  const E = 0.5 * m * v * v;
  return {
    text: `${thing.name} of mass ${fmt(m)} kg moves at ${v} m/s.`,
    given: [`$m = ${qty(m, 'kg')}$`, `$v = ${qty(v, 'm/s')}$`],
    find: 'its kinetic energy',
    answer: E,
    unit: 'J',
    unitOptions: E_UNITS,
    sci: E >= 1e5,
    solution: [`$${EK}$`, `$E_k = \\tfrac{1}{2} \\times ${fmt(m)} \\times ${v}^2 = \\tfrac{1}{2} \\times ${fmt(m)} \\times ${v * v}$`, `$E_k = ${qty(E, 'J')}$`],
    traps: [
      { value: m * v * v, hint: 'Do not forget the $\\tfrac{1}{2}$: $E_k = \\tfrac{1}{2}mv^2$.' },
      { value: 0.5 * m * v, hint: 'Square the speed: $v^2 = v \\times v$.' },
      { value: (0.5 * m * v) ** 2, hint: 'Only the speed is squared: $\\tfrac{1}{2} \\times m \\times v^2$.' },
    ],
  };
}

function potentialEnergy(): Question {
  const sit = pick([
    { text: 'A student of mass {m} kg climbs stairs {h} m high.', m: [45, 75], h: [3, 12] },
    { text: 'A crane lifts a load of mass {m} kg through a height of {h} m.', m: [200, 900], h: [5, 30] },
    { text: 'A {m} kg bag is lifted onto a shelf {h} m higher.', m: [2, 10], h: [1, 2] },
  ]);
  const m = sit.m[1] > 100 ? randInt(sit.m[0] / 50, sit.m[1] / 50) * 50 : randInt(sit.m[0], sit.m[1]);
  const h = randInt(sit.h[0], sit.h[1]);
  const E = m * G * h;
  return {
    text: sit.text.replace('{m}', String(m)).replace('{h}', String(h)),
    given: [`$m = ${qty(m, 'kg')}$`, `$\\Delta h = ${qty(h, 'm')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the gain in gravitational potential energy',
    answer: E,
    unit: 'J',
    unitOptions: E_UNITS,
    sci: E >= 1e5,
    solution: [`$${EP}$`, `$\\Delta E_p = ${m} \\times 9.8 \\times ${h}$`, `$\\Delta E_p = ${qty(E, 'J')}$`],
    traps: [
      { value: m * h, hint: 'Do not forget $g = 9.8\\,\\text{N/kg}$: $\\Delta E_p = mg\\Delta h$.' },
      { value: (m * h) / G, hint: `Multiply by $g$: $${EP}$.` },
    ],
  };
}

function findVorH(): Question {
  if (Math.random() < 0.5) {
    const m = pick([2, 4, 5, 10, 50]);
    const v = randInt(2, 15);
    const E = 0.5 * m * v * v;
    return {
      text: `An object of mass ${m} kg has ${fmt(E)} J of kinetic energy.`,
      given: [`$E_k = ${qty(E, 'J')}$`, `$m = ${qty(m, 'kg')}$`],
      find: 'its speed $v$',
      answer: v,
      unit: 'm/s',
      unitOptions: ['m/s', 'm', 'J', 'm/s²'],
      solution: [
        `$${EK}$, so $v^2 = \\dfrac{2E_k}{m}$`,
        `$v^2 = \\dfrac{2 \\times ${fmt(E)}}{${m}} = ${v * v}$`,
        `$v = \\sqrt{${v * v}} = ${qty(v, 'm/s')}$`,
      ],
      traps: [
        { value: v * v, hint: 'This is $v^2$. Take the square root.' },
        { value: Math.sqrt(E / m), hint: 'Multiply by 2 first: $v^2 = \\dfrac{2E_k}{m}$.' },
      ],
    };
  }
  const m = randInt(2, 60);
  const h = randInt(2, 40);
  const E = Number((m * G * h).toFixed(1));
  return {
    text: `Lifting ${an(m)} ${m} kg object gives it ${fmt(E)} J of gravitational potential energy.`,
    given: [`$\\Delta E_p = ${qty(E, 'J')}$`, `$m = ${qty(m, 'kg')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the height $\\Delta h$',
    answer: E / (m * G),
    unit: 'm',
    unitOptions: ['m', 'J', 'm/s', 'N'],
    solution: [`$${EP}$, so $\\Delta h = \\dfrac{\\Delta E_p}{mg}$`, `$\\Delta h = \\dfrac{${fmt(E)}}{${m} \\times 9.8}$`, `$\\Delta h = ${qty(E / (m * G), 'm')}$`],
    traps: [{ value: E / m, hint: 'Divide by $m$ and by $g$: $\\Delta h = \\dfrac{\\Delta E_p}{mg}$.' }],
  };
}

export const kePeTopic: Topic = {
  id: 'ke-pe',
  title: 'Kinetic and potential energy',
  levels: [
    { name: 'Level 1', description: 'Kinetic energy' },
    { name: 'Level 2', description: 'Gravitational potential energy' },
    { name: 'Level 3', description: 'Find the speed or the height' },
  ],
  generate: (level) => (level === 1 ? kineticEnergy() : level === 2 ? potentialEnergy() : findVorH()),
};

// ---------- Energy changes in motion (Extended) ----------

function dropSpeed(): Question {
  const h = pick([1.25, 5, 7.2, 11.25, 20, 31.25, 45]);
  const v = Math.sqrt(2 * G * h);
  const m = pick([0.5, 1, 2, 5]);
  return {
    text: `${an(m, true)} ${m} kg ball is dropped from a height of ${h} m. Ignore air resistance.`,
    given: [`$m = ${qty(m, 'kg')}$`, `$\\Delta h = ${qty(h, 'm')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'its speed just before it hits the ground',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'J', 'm', 'm/s²'],
    solution: [
      `GPE lost $= mg\\Delta h = ${m} \\times 9.8 \\times ${h} = ${qty(m * G * h, 'J')}$`,
      `KE gained $= \\tfrac{1}{2}mv^2 = ${qty(m * G * h, 'J')}$ (energy is conserved)`,
      `$v^2 = \\dfrac{2 \\times ${fmt(m * G * h)}}{${m}} = ${fmt(2 * G * h)}$, so $v = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: 2 * G * h, hint: 'This is $v^2$. Take the square root.' },
      { value: Math.sqrt(G * h), hint: 'From $mg\\Delta h = \\tfrac{1}{2}mv^2$: $v^2 = 2g\\Delta h$ (do not forget the 2).' },
      { value: m * G * h, hint: 'This is the energy, in joules. Now use $E_k = \\tfrac{1}{2}mv^2$ to find the speed.' },
    ],
  };
}

function riseHeight(): Question {
  const v = randInt(3, 20);
  const h = (v * v) / (2 * G);
  return {
    text: `A ball is thrown straight up at ${v} m/s. Ignore air resistance.`,
    given: [`$v = ${qty(v, 'm/s')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the maximum height it reaches',
    answer: h,
    unit: 'm',
    unitOptions: ['m', 'm/s', 'J', 'N'],
    solution: [
      'At the top, all the kinetic energy has become gravitational potential energy.',
      `$\\tfrac{1}{2}mv^2 = mg\\Delta h$, so $\\Delta h = \\dfrac{v^2}{2g}$ (the mass cancels)`,
      `$\\Delta h = \\dfrac{${v}^2}{2 \\times 9.8} = ${qty(h, 'm')}$`,
    ],
    traps: [
      { value: (v * v) / G, hint: 'Do not forget the 2: $\\Delta h = \\dfrac{v^2}{2g}$.' },
      { value: v / (2 * G), hint: 'Square the speed: $\\Delta h = \\dfrac{v^2}{2g}$.' },
    ],
  };
}

function rollerCoaster(): Question {
  const hA = pick([20, 25, 30, 35, 40]);
  const hB = randInt(2, Math.floor(hA / 2));
  const m = randInt(4, 10) * 100;
  const drop = hA - hB;
  const v = Math.sqrt(2 * G * drop);
  return {
    text: `A roller coaster car of mass ${m} kg starts at rest at point A, ${hA} m high. It rolls down to point B, ${hB} m high. Ignore friction.`,
    given: [`$m = ${qty(m, 'kg')}$`, `height at A $= ${qty(hA, 'm')}$`, `height at B $= ${qty(hB, 'm')}$`],
    find: 'its speed at B',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'J', 'm', 'm/s²'],
    solution: [
      `height lost $\\Delta h = ${hA} - ${hB} = ${qty(drop, 'm')}$`,
      `GPE lost $= mg\\Delta h = ${m} \\times 9.8 \\times ${drop} = ${qty(m * G * drop, 'J')}$ = KE at B`,
      `$v = \\sqrt{\\dfrac{2 \\times ${fmt(m * G * drop)}}{${m}}} = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: Math.sqrt(2 * G * hA), hint: 'B is not at ground level. Use the height lost: $' + hA + ' - ' + hB + '$.' },
      { value: Math.sqrt(2 * G * hB), hint: 'Use the height lost from A to B, not the height of B.' },
    ],
  };
}

export const energyTransferTopic: Topic = {
  id: 'energy-transfer',
  title: 'Energy changes in motion',
  levels: [
    { name: 'Level 1', description: 'Speed after a fall' },
    { name: 'Level 2', description: 'Height of a throw' },
    { name: 'Level 3', description: 'Roller coaster' },
  ],
  generate: (level) => (level === 1 ? dropSpeed() : level === 2 ? riseHeight() : rollerCoaster()),
};

// ---------- Work done: W = Fd ----------

const W_EQ = 'W = F \\times d';

function workQ(): Question {
  const F = randInt(2, 60) * 5;
  const d = randInt(1, 30);
  const sit = pick(['A student pushes a box', 'A horse pulls a cart', 'A worker drags a sack']);
  return {
    text: `${sit} with a force of ${F} N for a distance of ${d} m.`,
    given: [`$F = ${qty(F, 'N')}$`, `$d = ${qty(d, 'm')}$`],
    find: 'the work done',
    answer: F * d,
    unit: 'J',
    unitOptions: E_UNITS,
    solution: [`$${W_EQ}$`, `$W = ${F} \\times ${d}$`, `$W = ${qty(F * d, 'J')}$`],
    traps: [{ value: F / d, hint: `Multiply: $${W_EQ}$.` }],
  };
}

function forceOrDistance(): Question {
  const F = randInt(2, 40) * 10;
  const d = randInt(2, 25);
  const W = F * d;
  if (Math.random() < 0.5) {
    return {
      text: `A force does ${W} J of work while it moves an object ${d} m.`,
      given: [`$W = ${qty(W, 'J')}$`, `$d = ${qty(d, 'm')}$`],
      find: 'the force $F$',
      answer: F,
      unit: 'N',
      unitOptions: ['N', 'J', 'm', 'W'],
      solution: [`$${W_EQ}$, so $F = \\dfrac{W}{d}$`, `$F = ${frac(W, d)}$`, `$F = ${qty(F, 'N')}$`],
      traps: [{ value: W * d, hint: 'Divide: $F = \\dfrac{W}{d}$.' }],
    };
  }
  return {
    text: `A force of ${F} N does ${W} J of work.`,
    given: [`$W = ${qty(W, 'J')}$`, `$F = ${qty(F, 'N')}$`],
    find: 'the distance moved $d$',
    answer: d,
    unit: 'm',
    unitOptions: ['m', 'J', 'N', 'W'],
    solution: [`$${W_EQ}$, so $d = \\dfrac{W}{F}$`, `$d = ${frac(W, F)}$`, `$d = ${qty(d, 'm')}$`],
    traps: [{ value: W * F, hint: 'Divide: $d = \\dfrac{W}{F}$.' }],
  };
}

function liftingWork(): Question {
  const m = randInt(2, 80);
  const h = randInt(1, 15);
  const F = m * G;
  return {
    text: `A crate of mass ${m} kg is lifted at a steady speed through ${h} m.`,
    given: [`$m = ${qty(m, 'kg')}$`, `height $= ${qty(h, 'm')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the work done on the crate',
    answer: F * h,
    unit: 'J',
    unitOptions: E_UNITS,
    solution: [
      `The lifting force equals the weight: $F = mg = ${m} \\times 9.8 = ${F.toFixed(1)}\\,\\text{N}$`,
      `$W = F \\times d = ${F.toFixed(1)} \\times ${h}$`,
      `$W = ${(F * h).toFixed(1)}\\,\\text{J} \\approx ${qty(F * h, 'J')}$`,
    ],
    traps: [{ value: m * h, hint: 'The force is the weight, in newtons: $F = mg$. Do not use the mass in kg as the force.' }],
  };
}

export const workTopic: Topic = {
  id: 'work',
  title: 'Work done',
  levels: [
    { name: 'Level 1', description: 'Work = force × distance' },
    { name: 'Level 2', description: 'Find the force or the distance' },
    { name: 'Level 3', description: 'Lifting (force = weight)' },
  ],
  generate: (level) => (level === 1 ? workQ() : level === 2 ? forceOrDistance() : liftingWork()),
};

// ---------- Power ----------

const P_EQ = 'P = \\dfrac{\\Delta E}{t}';

function powerQ(): Question {
  const sit = pick([
    { name: 'A kettle', E: [100, 300], t: [60, 180], unit: 'kJ' },
    { name: 'A light bulb', E: [1, 9], t: [100, 600], unit: 'kJ' },
    { name: 'A motor', E: [5, 50], t: [10, 60], unit: 'kJ' },
  ]);
  const t = randInt(sit.t[0] / 10, sit.t[1] / 10) * 10;
  const P = randInt(1, 30) * (sit.name === 'A kettle' ? 100 : sit.name === 'A light bulb' ? 2 : 50);
  const E = P * t;
  return {
    text: `${sit.name} transfers ${E} J of energy in ${t} s.`,
    given: [`$\\Delta E = ${qty(E, 'J')}$`, `$t = ${qty(t, 's')}$`],
    find: 'its power',
    answer: P,
    unit: 'W',
    unitOptions: ['W', 'J', 'J s', 's'],
    sci: false,
    solution: [`$${P_EQ}$`, `$P = ${frac(E, t)}$`, `$P = ${qty(P, 'W')}$`],
    traps: [
      { value: E * t, hint: `Divide by the time: $${P_EQ}$.` },
      { value: t / E, hint: `You divided the wrong way: $${P_EQ}$.` },
    ],
  };
}

function energyOrTime(): Question {
  const P = pick([60, 100, 500, 1000, 2000, 2500]);
  const t = randInt(2, 30) * 10;
  const E = P * t;
  if (Math.random() < 0.5) {
    return {
      text: `${an(P, true)} ${P} W heater is switched on for ${t} s.`,
      given: [`$P = ${qty(P, 'W')}$`, `$t = ${qty(t, 's')}$`],
      find: 'the energy transferred',
      answer: E,
      unit: 'J',
      unitOptions: ['J', 'W', 's', 'N'],
      sci: E >= 1e5,
      solution: [`$${P_EQ}$, so $\\Delta E = P \\times t$`, `$\\Delta E = ${P} \\times ${t}$`, `$\\Delta E = ${qty(E, 'J')}$`],
      traps: [{ value: P / t, hint: 'Multiply: $\\Delta E = P \\times t$.' }],
    };
  }
  return {
    text: `${an(P, true)} ${P} W motor transfers ${E} J of energy.`,
    given: [`$P = ${qty(P, 'W')}$`, `$\\Delta E = ${qty(E, 'J')}$`],
    find: 'the time taken',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'J', 'W', 'min'],
    solution: [`$${P_EQ}$, so $t = \\dfrac{\\Delta E}{P}$`, `$t = ${frac(E, P)}$`, `$t = ${qty(t, 's')}$`],
    traps: [{ value: E * P, hint: 'Divide: $t = \\dfrac{\\Delta E}{P}$.' }],
  };
}

function powerUnits(): Question {
  if (Math.random() < 0.5) {
    const P = pick([1.5, 2, 2.5, 3]);
    const min = randInt(2, 10);
    const E = P * 1000 * min * 60;
    return {
      text: `${an(P, true)} ${P} kW kettle is switched on for ${min} minutes.`,
      given: [`$P = ${qty(P, 'kW')}$`, `$t = ${qty(min, 'min')}$`],
      find: 'the energy transferred in joules',
      answer: E,
      unit: 'J',
      unitOptions: ['J', 'kW', 'W', 's'],
      sci: true,
      solution: [
        `Change units: $P = ${P} \\times 1000 = ${qty(P * 1000, 'W')}$, $t = ${min} \\times 60 = ${qty(min * 60, 's')}$`,
        `$\\Delta E = P \\times t = ${P * 1000} \\times ${min * 60}$`,
        `$\\Delta E = ${qty(E, 'J')}$`,
      ],
      traps: [
        { value: P * min, hint: 'Change kW to W (× 1000) and minutes to seconds (× 60).' },
        { value: P * 1000 * min, hint: 'Change the minutes to seconds: × 60.' },
        { value: P * min * 60, hint: 'Change kW to W: × 1000.' },
      ],
    };
  }
  const m = randInt(40, 80);
  const h = randInt(3, 12);
  const t = randInt(4, 20);
  const P = (m * G * h) / t;
  return {
    text: `A student of mass ${m} kg runs up stairs ${h} m high in ${t} s.`,
    given: [`$m = ${qty(m, 'kg')}$`, `height $= ${qty(h, 'm')}$`, `$t = ${qty(t, 's')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the useful power of the student',
    answer: P,
    unit: 'W',
    unitOptions: ['W', 'J', 'N', 's'],
    solution: [
      `Work done (gain in GPE) $= mg\\Delta h = ${m} \\times 9.8 \\times ${h} = ${qty(m * G * h, 'J')}$`,
      `$P = \\dfrac{W}{t} = ${frac(fmt(m * G * h), t)}$`,
      `$P = ${qty(P, 'W')}$`,
    ],
    traps: [
      { value: m * G * h, hint: 'This is the work done. Divide by the time to get the power.' },
      { value: (m * h) / t, hint: 'The force is the weight: $mg$. Do not forget $g$.' },
    ],
  };
}

export const powerTopic: Topic = {
  id: 'power',
  title: 'Power',
  levels: [
    { name: 'Level 1', description: 'Power from energy and time' },
    { name: 'Level 2', description: 'Find the energy or the time' },
    { name: 'Level 3', description: 'kW, minutes and stairs' },
  ],
  generate: (level) => (level === 1 ? powerQ() : level === 2 ? energyOrTime() : powerUnits()),
};

// ---------- Efficiency (Extended equation) ----------

const EFF = '\\text{efficiency} = \\dfrac{\\text{useful energy output}}{\\text{total energy input}} \\times 100\\%';

function efficiencyEnergy(): Question {
  const device = pick([
    { name: 'A filament lamp', useful: 'light', waste: 'heating the surroundings', eff: [5, 10] },
    { name: 'An LED lamp', useful: 'light', waste: 'heating the surroundings', eff: [30, 50] },
    { name: 'An electric motor', useful: 'kinetic energy', waste: 'heating and sound', eff: [60, 90] },
    { name: 'A car engine', useful: 'kinetic energy', waste: 'heating and sound', eff: [20, 35] },
  ]);
  const input = pick([100, 200, 400, 500, 1000, 2000]);
  const effPc = randInt(device.eff[0], device.eff[1]);
  const useful = (input * effPc) / 100;
  return {
    text: `${device.name} uses ${input} J of energy. It gives out ${fmt(useful)} J as ${device.useful}. The rest is wasted by ${device.waste}.`,
    figure: sankeySvg('input', input, [
      { label: `useful (${device.useful})`, value: Number(fmt(useful)), useful: true },
      { label: 'wasted', value: Number(fmt(input - useful)) },
    ]),
    given: [`total energy input $= ${qty(input, 'J')}$`, `useful energy output $= ${qty(useful, 'J')}$`],
    find: 'the efficiency, as a percentage',
    answer: effPc,
    unit: '%',
    unitOptions: ['%', 'J', 'W'],
    absTolerance: 0.6,
    solution: [`$${EFF}$`, `$\\text{efficiency} = ${frac(fmt(useful), input)} \\times 100\\%$`, `$\\text{efficiency} = ${effPc}\\%$`],
    traps: [
      { value: 100 - effPc, hint: 'Use the useful output, not the wasted energy.' },
      { value: effPc / 100, hint: 'Multiply by 100 to get a percentage.' },
      { value: (input / useful) * 100, hint: 'You divided the wrong way: useful output ÷ total input.' },
    ],
  };
}

function efficiencyPower(): Question {
  const input = pick([200, 500, 800, 1000, 1500, 2000]);
  const effPc = pick([20, 25, 40, 50, 60, 75, 80, 90]);
  const useful = (input * effPc) / 100;
  return {
    text: `A motor has an input power of ${input} W. Its useful output power is ${fmt(useful)} W.`,
    given: [`total power input $= ${qty(input, 'W')}$`, `useful power output $= ${qty(useful, 'W')}$`],
    find: 'the efficiency, as a percentage',
    answer: effPc,
    unit: '%',
    unitOptions: ['%', 'W', 'J'],
    absTolerance: 0.6,
    solution: [
      '$\\text{efficiency} = \\dfrac{\\text{useful power output}}{\\text{total power input}} \\times 100\\%$',
      `$\\text{efficiency} = ${frac(fmt(useful), input)} \\times 100\\% = ${effPc}\\%$`,
    ],
    traps: [
      { value: effPc / 100, hint: 'Multiply by 100 to get a percentage.' },
      { value: 100 - effPc, hint: 'Use the useful output power, not the wasted power.' },
    ],
  };
}

function usefulOutput(): Question {
  const effPc = pick([10, 20, 25, 30, 35, 40, 45]);
  const input = pick([500, 1000, 2000, 5000, 8000]);
  const useful = (input * effPc) / 100;
  const askWasted = Math.random() < 0.5;
  return {
    text: `A power station is ${effPc}% efficient. It takes in ${input} MJ of chemical energy from its fuel.`,
    given: [`efficiency $= ${effPc}\\%$`, `total energy input $= ${qty(input, 'MJ')}$`],
    find: askWasted ? 'the energy wasted' : 'the useful electrical energy output',
    answer: askWasted ? input - useful : useful,
    unit: 'MJ',
    unitOptions: ['MJ', '%', 'W', 'J'],
    solution: [
      `useful output $= \\dfrac{${effPc}}{100} \\times ${input} = ${qty(useful, 'MJ')}$`,
      ...(askWasted ? [`wasted $= ${input} - ${fmt(useful)} = ${qty(input - useful, 'MJ')}$`] : []),
    ],
    traps: askWasted
      ? [{ value: useful, hint: 'This is the useful output. The wasted energy is the rest: input − useful.' }]
      : [
          { value: input - useful, hint: 'This is the wasted energy. The useful output is efficiency × input.' },
          { value: input * effPc, hint: 'Divide the percentage by 100 first.' },
        ],
  };
}

export const efficiencyTopic: Topic = {
  id: 'efficiency',
  title: 'Efficiency',
  levels: [
    { name: 'Level 1', description: 'Efficiency from energies' },
    { name: 'Level 2', description: 'Efficiency from powers' },
    { name: 'Level 3', description: 'Find the useful or wasted energy' },
  ],
  generate: (level) => (level === 1 ? efficiencyEnergy() : level === 2 ? efficiencyPower() : usefulOutput()),
};
