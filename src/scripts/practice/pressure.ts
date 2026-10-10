// Unit 6 practice: pressure p = F/A (1.8 C1), pressure in liquids Δp = ρgΔh (1.8 S4).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';

const P_EQ = 'p = \\dfrac{F}{A}';
const G = 9.8;

function pressureBasic(): Question {
  const sit = pick([
    { text: 'A box with a weight of {F} N stands on the floor. The area in contact with the floor is {A} m².', F: [50, 900], A: [0.05, 0.1, 0.2, 0.25, 0.5] },
    { text: 'A table with a weight of {F} N stands on four legs. The total area of the legs is {A} m².', F: [100, 400], A: [0.002, 0.004, 0.005, 0.01] },
  ]);
  const F = randInt(sit.F[0] / 10, sit.F[1] / 10) * 10;
  const A = pick(sit.A);
  const p = F / A;
  return {
    text: sit.text.replace('{F}', String(F)).replace('{A}', String(A)),
    given: [`$F = ${qty(F, 'N')}$`, `$A = ${qty(A, 'm²')}$`],
    find: 'the pressure on the floor',
    answer: p,
    unit: 'N/m²',
    unitOptions: ['N/m²', 'N', 'm²', 'N m'],
    solution: [`$${P_EQ}$`, `$p = ${frac(F, A)}$`, `$p = ${qty(p, 'N/m²')}$ (or Pa)`],
    traps: [
      { value: F * A, hint: `Divide: $${P_EQ}$.` },
      { value: A / F, hint: `You divided the wrong way: $${P_EQ}$.` },
    ],
  };
}

function forceOrArea(): Question {
  const p = pick([200, 500, 1000, 2000, 5000, 10000]);
  const A = pick([0.02, 0.05, 0.1, 0.2, 0.5, 2]);
  const F = p * A;
  if (Math.random() < 0.5) {
    return {
      text: `A pressure of ${p} N/m² acts on an area of ${A} m².`,
      given: [`$p = ${qty(p, 'N/m²')}$`, `$A = ${qty(A, 'm²')}$`],
      find: 'the force $F$',
      answer: F,
      unit: 'N',
      unitOptions: ['N', 'N/m²', 'm²', 'Pa'],
      solution: [`$${P_EQ}$, so $F = p \\times A$`, `$F = ${p} \\times ${A}$`, `$F = ${qty(F, 'N')}$`],
      traps: [{ value: p / A, hint: 'Multiply: $F = p \\times A$.' }],
    };
  }
  return {
    text: `A force of ${fmt(F)} N gives a pressure of ${p} N/m².`,
    given: [`$F = ${qty(F, 'N')}$`, `$p = ${qty(p, 'N/m²')}$`],
    find: 'the area $A$',
    answer: A,
    unit: 'm²',
    unitOptions: ['m²', 'N', 'N/m²', 'm'],
    solution: [`$${P_EQ}$, so $A = \\dfrac{F}{p}$`, `$A = ${frac(F, p)}$`, `$A = ${qty(A, 'm²')}$`],
    traps: [{ value: F * p, hint: 'Divide: $A = \\dfrac{F}{p}$.' }],
  };
}

function unitsAndWeight(): Question {
  if (Math.random() < 0.5) {
    // A person standing: weight from mass, area in cm²
    const m = randInt(40, 90);
    const Acm = randInt(20, 40) * 10; // both feet, cm²
    const F = m * G;
    const pcm = F / Acm;
    return {
      text: `A person of mass ${m} kg stands on both feet. The total area of the feet in contact with the floor is ${Acm} cm².`,
      given: [`$m = ${qty(m, 'kg')}$`, `$A = ${qty(Acm, 'cm²')}$`, `$g = ${qty(G, 'N/kg')}$`],
      find: 'the pressure on the floor, in N/cm²',
      answer: pcm,
      unit: 'N/cm²',
      unitOptions: ['N/cm²', 'N/m²', 'N', 'kg/cm²'],
      solution: [
        `The force is the weight: $F = mg = ${m} \\times 9.8 = ${qty(F, 'N')}$`,
        `$p = \\dfrac{F}{A} = ${frac(fmt(F), Acm)}$`,
        `$p = ${qty(pcm, 'N/cm²')}$`,
      ],
      traps: [{ value: m / Acm, hint: 'The force is the weight in newtons: $F = mg$. Do not use the mass in kg.' }],
    };
  }
  // N/cm² to N/m²
  const F = randInt(5, 60) * 10;
  const Acm = pick([10, 20, 25, 50, 100]);
  const Am2 = Acm / 10000;
  const p = F / Am2;
  return {
    text: `A force of ${F} N acts on an area of ${Acm} cm².`,
    given: [`$F = ${qty(F, 'N')}$`, `$A = ${qty(Acm, 'cm²')}$`],
    find: 'the pressure in N/m² (Pa)',
    answer: p,
    unit: 'N/m²',
    unitOptions: ['N/m²', 'N/cm²', 'N', 'm²'],
    sci: p >= 1e5,
    solution: [
      `Change cm² to m²: $1\\,\\text{m}^2 = 100 \\times 100 = 10\\,000\\,\\text{cm}^2$, so $A = \\dfrac{${Acm}}{10\\,000} = ${qty(Am2, 'm²')}$`,
      `$p = ${frac(F, Am2)}$`,
      `$p = ${qty(p, 'N/m²')}$`,
    ],
    traps: [
      { value: F / Acm, hint: 'This is in N/cm². Change the area to m² first: $1\\,\\text{m}^2 = 10\\,000\\,\\text{cm}^2$.' },
      { value: F / (Acm / 100), hint: '$1\\,\\text{m}^2 = 10\\,000\\,\\text{cm}^2$, not 100 cm².' },
    ],
  };
}

export const pressureTopic: Topic = {
  id: 'pressure',
  title: 'Pressure',
  levels: [
    { name: 'Level 1', description: 'Pressure from force and area' },
    { name: 'Level 2', description: 'Find the force or the area' },
    { name: 'Level 3', description: 'Weight, cm² and N/m²' },
  ],
  generate: (level) => (level === 1 ? pressureBasic() : level === 2 ? forceOrArea() : unitsAndWeight()),
};

// ---------- Pressure in liquids (Extended) ----------

const DP = '\\Delta p = \\rho g \\Delta h';
const liquids = [
  { name: 'water', rho: 1000 },
  { name: 'sea water', rho: 1030 },
  { name: 'cooking oil', rho: 920 },
];

function liquidPressure(): Question {
  const h = randInt(1, 40);
  return {
    text: `A diver swims ${h} m below the surface of a lake.`,
    given: [`$\\Delta h = ${qty(h, 'm')}$`, `density of water $\\rho = ${qty(1000, 'kg/m³')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the extra pressure on the diver due to the water',
    answer: 1000 * G * h,
    unit: 'Pa',
    unitOptions: ['Pa', 'N', 'kg/m³', 'm'],
    sci: 1000 * G * h >= 1e5,
    solution: [`$${DP}$`, `$\\Delta p = 1000 \\times 9.8 \\times ${h}$`, `$\\Delta p = ${qty(1000 * G * h, 'Pa')}$`],
    traps: [
      { value: 1000 * h, hint: 'Do not forget $g$: $\\Delta p = \\rho g \\Delta h$.' },
      { value: 9.8 * h, hint: 'Use the density of water: $\\rho = 1000\\,\\text{kg/m}^3$.' },
    ],
  };
}

function depthOrDensity(): Question {
  if (Math.random() < 0.5) {
    const h = randInt(2, 50);
    const dp = Number((1030 * G * h).toPrecision(3));
    return {
      text: `The extra pressure due to sea water on a submarine is ${dp} Pa.`,
      given: [`$\\Delta p = ${qty(dp, 'Pa')}$`, `$\\rho = ${qty(1030, 'kg/m³')}$`, `$g = ${qty(G, 'N/kg')}$`],
      find: 'the depth of the submarine',
      answer: dp / (1030 * G),
      unit: 'm',
      unitOptions: ['m', 'Pa', 'kg/m³', 'N'],
      solution: [`$${DP}$, so $\\Delta h = \\dfrac{\\Delta p}{\\rho g}$`, `$\\Delta h = \\dfrac{${dp}}{1030 \\times 9.8}$`, `$\\Delta h = ${qty(dp / (1030 * G), 'm')}$`],
      traps: [{ value: dp / 1030, hint: 'Divide by $\\rho$ and by $g$: $\\Delta h = \\dfrac{\\Delta p}{\\rho g}$.' }],
    };
  }
  const liq = pick(liquids);
  const h = pick([0.2, 0.5, 1, 2]);
  const dp = Number((liq.rho * G * h).toPrecision(3));
  return {
    text: `At a depth of ${h} m in a liquid, the extra pressure is ${dp} Pa.`,
    given: [`$\\Delta p = ${qty(dp, 'Pa')}$`, `$\\Delta h = ${qty(h, 'm')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the density of the liquid',
    answer: dp / (G * h),
    unit: 'kg/m³',
    unitOptions: ['kg/m³', 'g/cm³', 'Pa', 'm'],
    solution: [`$${DP}$, so $\\rho = \\dfrac{\\Delta p}{g \\Delta h}$`, `$\\rho = \\dfrac{${dp}}{9.8 \\times ${h}}$`, `$\\rho = ${qty(dp / (G * h), 'kg/m³')}$`],
    traps: [{ value: dp / h, hint: 'Divide by $g$ as well: $\\rho = \\dfrac{\\Delta p}{g \\Delta h}$.' }],
  };
}

function twoDepths(): Question {
  const liq = pick(liquids);
  const h1 = randInt(1, 10);
  const h2 = h1 + randInt(2, 20);
  const dp = liq.rho * G * (h2 - h1);
  return {
    text: `Point X is ${h1} m below the surface of ${liq.name}. Point Y is ${h2} m below the surface.`,
    given: [`depth of X $= ${qty(h1, 'm')}$`, `depth of Y $= ${qty(h2, 'm')}$`, `$\\rho = ${qty(liq.rho, 'kg/m³')}$`, `$g = ${qty(G, 'N/kg')}$`],
    find: 'the difference in pressure between Y and X',
    answer: dp,
    unit: 'Pa',
    unitOptions: ['Pa', 'N', 'm', 'kg/m³'],
    sci: dp >= 1e5,
    solution: [
      `$\\Delta h = ${h2} - ${h1} = ${qty(h2 - h1, 'm')}$`,
      `$\\Delta p = \\rho g \\Delta h = ${liq.rho} \\times 9.8 \\times ${h2 - h1}$`,
      `$\\Delta p = ${qty(dp, 'Pa')}$`,
    ],
    traps: [
      { value: liq.rho * G * h2, hint: 'This is the pressure difference between the surface and Y. Use the difference in depth: $' + h2 + ' - ' + h1 + '$.' },
      { value: liq.rho * G * (h1 + h2), hint: 'Subtract the depths, do not add them.' },
    ],
  };
}

export const liquidPressureTopic: Topic = {
  id: 'liquid-pressure',
  title: 'Pressure in liquids',
  levels: [
    { name: 'Level 1', description: 'Pressure at a depth' },
    { name: 'Level 2', description: 'Find the depth or the density' },
    { name: 'Level 3', description: 'Difference between two depths' },
  ],
  generate: (level) => (level === 1 ? liquidPressure() : level === 2 ? depthOrDensity() : twoDepths()),
};
