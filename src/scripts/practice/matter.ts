// Unit 2 practice: weight W = mg (1.3), density ρ = m/V (1.4).
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';
import { cylinderSvg } from './measure';
import { planets } from '../../data/planets';
import { materials } from '../../data/materials';

// ---------- Weight: W = m g ----------

const W_EQ = 'W = m \\times g';
const G_EARTH = `$g = ${qty(9.8, 'N/kg')}$ on the Earth`;
const W_UNITS = ['N', 'kg', 'N/kg', 'g'];

const objects = [
  { name: 'A bag of rice', m: [1, 10] },
  { name: 'A student', m: [40, 75] },
  { name: 'A suitcase', m: [8, 25] },
  { name: 'A bicycle', m: [9, 16] },
  { name: 'A motorbike', m: [100, 200] },
];

function weightFromMass(): Question {
  const o = pick(objects);
  const m = randInt(o.m[0], o.m[1]);
  const W = m * 9.8;
  return {
    text: `${o.name} has a mass of ${m} kg.`,
    given: [`mass $m = ${qty(m, 'kg')}$`, G_EARTH],
    find: 'its weight $W$ on the Earth',
    answer: W,
    unit: 'N',
    unitOptions: W_UNITS,
    solution: [`$g = \\dfrac{W}{m}$, so $${W_EQ}$`, `$W = ${m} \\times 9.8$`, `$W = ${qty(W, 'N')}$`],
    traps: [
      { value: m, hint: 'This is the mass, in kg. Weight is a force: multiply by $g$ to get newtons.' },
      { value: m / 9.8, hint: `You divided. Use $${W_EQ}$.` },
    ],
  };
}

function massOrG(): Question {
  if (Math.random() < 0.5) {
    const m = randInt(2, 60);
    const W = Number((m * 9.8).toFixed(1));
    return {
      text: `A box has a weight of ${fmt(W)} N on the Earth.`,
      given: [`weight $W = ${qty(W, 'N')}$`, G_EARTH],
      find: 'the mass $m$ of the box',
      answer: W / 9.8,
      unit: 'kg',
      unitOptions: W_UNITS,
      solution: [`$g = \\dfrac{W}{m}$, so $m = \\dfrac{W}{g}$`, `$m = ${frac(W, 9.8)}$`, `$m = ${qty(W / 9.8, 'kg')}$`],
      traps: [
        { value: W * 9.8, hint: 'You multiplied. To find the mass, divide: $m = \\dfrac{W}{g}$.' },
        { value: 9.8 / W, hint: 'You divided the wrong way: $m = \\dfrac{W}{g}$.' },
      ],
    };
  }
  const p = pick(planets.filter((x) => x.type === 'rocky' && x.name !== 'Earth'));
  const m = pick([2, 4, 5, 10, 20]);
  const W = Number((m * p.g).toFixed(1));
  return {
    text: `A space probe on ${p.name} has a test mass of ${m} kg. Its weight there is ${fmt(W)} N.`,
    given: [`mass $m = ${qty(m, 'kg')}$`, `weight $W = ${qty(W, 'N')}$`],
    find: `the gravitational field strength $g$ on ${p.name}`,
    answer: W / m,
    unit: 'N/kg',
    unitOptions: ['N/kg', 'N', 'kg', 'm/s'],
    solution: ['$g = \\dfrac{W}{m}$', `$g = ${frac(W, m)}$`, `$g = ${qty(W / m, 'N/kg')}$`],
    traps: [
      { value: W * m, hint: 'You multiplied. $g = \\dfrac{W}{m}$ (force per unit mass).' },
      { value: m / W, hint: 'You divided the wrong way: $g = \\dfrac{W}{m}$.' },
    ],
  };
}

function gramsAndPlanets(): Question {
  if (Math.random() < 0.5) {
    const item = pick([
      { name: 'An apple', g: [100, 250] },
      { name: 'A mobile phone', g: [150, 240] },
      { name: 'A book', g: [300, 900] },
    ]);
    const mg = randInt(item.g[0] / 10, item.g[1] / 10) * 10;
    const W = (mg / 1000) * 9.8;
    return {
      text: `${item.name} has a mass of ${mg} g.`,
      given: [`mass $= ${qty(mg, 'g')}$`, G_EARTH],
      find: 'its weight on the Earth',
      answer: W,
      unit: 'N',
      unitOptions: W_UNITS,
      solution: [
        `Change g to kg: $${qty(mg, 'g')} = ${qty(mg / 1000, 'kg')}$`,
        `$${W_EQ} = ${fmt(mg / 1000)} \\times 9.8$`,
        `$W = ${qty(W, 'N')}$`,
      ],
      traps: [{ value: mg * 9.8, hint: 'Change grams to kilograms first: $1000\\,\\text{g} = 1\\,\\text{kg}$.' }],
    };
  }
  const p = pick(planets.filter((x) => x.type === 'rocky' && x.name !== 'Earth'));
  const m = randInt(55, 90);
  const W = m * p.g;
  return {
    text: `An astronaut has a mass of ${m} kg. What is her weight on ${p.name}?`,
    given: [`mass $m = ${qty(m, 'kg')}$`, `$g = ${qty(p.g, 'N/kg')}$ on ${p.name}`],
    find: `her weight on ${p.name}`,
    answer: W,
    unit: 'N',
    unitOptions: W_UNITS,
    solution: [`$${W_EQ}$`, `$W = ${m} \\times ${p.g}$`, `$W = ${qty(W, 'N')}$`],
    traps: [
      { value: m * 9.8, hint: `This is her weight on the Earth. On ${p.name}, $g = ${qty(p.g, 'N/kg')}$.` },
      { value: m, hint: 'Her mass does not change. Her weight is a force: $W = m \\times g$.' },
    ],
  };
}

export const weightTopic: Topic = {
  id: 'weight',
  title: 'Weight',
  levels: [
    { name: 'Level 1', description: 'Weight from mass' },
    { name: 'Level 2', description: 'Find the mass or g' },
    { name: 'Level 3', description: 'Grams, and other planets' },
  ],
  generate: (level) => (level === 1 ? weightFromMass() : level === 2 ? massOrG() : gramsAndPlanets()),
};

// ---------- Density: ρ = m / V ----------

const RHO = '\\rho = \\dfrac{m}{V}';
const D_UNITS = ['g/cm³', 'kg/m³', 'g', 'cm³'];
const solids = materials.filter((m) => m.state === 'solid' && m.density > 0.3);

function densityFromMV(): Question {
  const mat = pick(solids);
  const V = randInt(2, 40) * 5;
  const m = Number((mat.density * V).toPrecision(3));
  return {
    text: `A block has a mass of ${fmt(m)} g and a volume of ${V} cm³.`,
    given: [`mass $m = ${qty(m, 'g')}$`, `volume $V = ${qty(V, 'cm³')}$`],
    find: 'the density $\\rho$ of the block',
    answer: m / V,
    unit: 'g/cm³',
    unitOptions: D_UNITS,
    solution: [`$${RHO}$`, `$\\rho = ${frac(m, V)}$`, `$\\rho = ${qty(m / V, 'g/cm³')}$`],
    traps: [
      { value: V / m, hint: `You divided the wrong way. Mass goes on top: $${RHO}$.` },
      { value: m * V, hint: `You multiplied. $${RHO}$.` },
    ],
  };
}

function massOrVolume(): Question {
  const mat = pick(solids);
  const V = randInt(2, 30) * 10;
  const m = mat.density * V;
  if (Math.random() < 0.5) {
    return {
      text: `A piece of ${mat.name} has a volume of ${V} cm³. The density of ${mat.name} is ${mat.density} g/cm³.`,
      given: [`$V = ${qty(V, 'cm³')}$`, `$\\rho = ${qty(mat.density, 'g/cm³')}$`],
      find: 'its mass $m$',
      answer: m,
      unit: 'g',
      unitOptions: ['g', 'cm³', 'g/cm³', 'N'],
      solution: [`$${RHO}$, so $m = \\rho \\times V$`, `$m = ${mat.density} \\times ${V}$`, `$m = ${qty(m, 'g')}$`],
      traps: [{ value: V / mat.density, hint: 'For the mass, multiply: $m = \\rho \\times V$.' }],
    };
  }
  const mR = Number(m.toPrecision(3));
  return {
    text: `A piece of ${mat.name} has a mass of ${fmt(mR)} g. The density of ${mat.name} is ${mat.density} g/cm³.`,
    given: [`$m = ${qty(mR, 'g')}$`, `$\\rho = ${qty(mat.density, 'g/cm³')}$`],
    find: 'its volume $V$',
    answer: mR / mat.density,
    unit: 'cm³',
    unitOptions: ['cm³', 'g', 'g/cm³', 'cm²'],
    solution: [`$${RHO}$, so $V = \\dfrac{m}{\\rho}$`, `$V = ${frac(mR, mat.density)}$`, `$V = ${qty(mR / mat.density, 'cm³')}$`],
    traps: [
      { value: mR * mat.density, hint: 'For the volume, divide: $V = \\dfrac{m}{\\rho}$.' },
      { value: mat.density / mR, hint: 'You divided the wrong way: $V = \\dfrac{m}{\\rho}$.' },
    ],
  };
}

function regularBlock(): Question {
  const mat = pick(solids);
  const [l, w, h] = [randInt(2, 10), randInt(2, 8), randInt(1, 5)];
  const V = l * w * h;
  const m = Number((mat.density * V).toPrecision(3));
  const rho = m / V;
  const inSI = Math.random() < 0.5;
  return {
    text: `A rectangular block is ${l} cm long, ${w} cm wide and ${h} cm high. Its mass is ${fmt(m)} g.`,
    given: [`dimensions: $${l}\\,\\text{cm} \\times ${w}\\,\\text{cm} \\times ${h}\\,\\text{cm}$`, `mass $m = ${qty(m, 'g')}$`],
    find: `the density of the block in ${inSI ? 'kg/m³' : 'g/cm³'}`,
    answer: inSI ? rho * 1000 : rho,
    unit: inSI ? 'kg/m³' : 'g/cm³',
    unitOptions: D_UNITS,
    solution: [
      `$V = ${l} \\times ${w} \\times ${h} = ${qty(V, 'cm³')}$`,
      `$\\rho = ${frac(m, V)} = ${qty(rho, 'g/cm³')}$`,
      ...(inSI ? [`$1\\,\\text{g/cm}^3 = 1000\\,\\text{kg/m}^3$, so $\\rho = ${qty(rho * 1000, 'kg/m³')}$`] : []),
    ],
    traps: [
      ...(inSI ? [{ value: rho, hint: 'This is in g/cm³. Change to kg/m³: $1\\,\\text{g/cm}^3 = 1000\\,\\text{kg/m}^3$.' }] : []),
      { value: (m / (l * w)) * (inSI ? 1000 : 1), hint: 'The volume of a block is length × width × height.' },
      { value: (m / (l + w + h)) * (inSI ? 1000 : 1), hint: 'Multiply the three sides to get the volume, do not add them.' },
    ],
  };
}

export const densityTopic: Topic = {
  id: 'density',
  title: 'Density',
  levels: [
    { name: 'Level 1', description: 'Density from mass and volume' },
    { name: 'Level 2', description: 'Find the mass or the volume' },
    { name: 'Level 3', description: 'Regular blocks and kg/m³' },
  ],
  generate: (level) => (level === 1 ? densityFromMV() : level === 2 ? massOrVolume() : regularBlock()),
};

// ---------- Measuring density: displacement and liquids ----------

function twoCylinders(v1: number, v2: number): string {
  const label = (t: string) => `<p style="text-align:center;margin:0;font-size:0.85rem">${t}</p>`;
  return `<div style="display:flex;gap:1rem;justify-content:center">
    <div style="flex:1;max-width:200px">${cylinderSvg(v1)}${label('before')}</div>
    <div style="flex:1;max-width:200px">${cylinderSvg(v2, { stone: true })}${label('after: stone added')}</div>
  </div>`;
}

function displacementPair(): [number, number] {
  const v1 = randInt(15, 30) * 2;
  const v2 = v1 + randInt(4, 15) * 2;
  return [v1, v2];
}

function stoneVolume(): Question {
  const [v1, v2] = displacementPair();
  return {
    text: 'A student puts a stone into a measuring cylinder of water. Read both cylinders.',
    figure: twoCylinders(v1, v2),
    given: ['the scale is in cm³', 'the stone sinks'],
    find: 'the volume of the stone',
    answer: v2 - v1,
    unit: 'cm³',
    unitOptions: ['cm³', 'g', 'g/cm³', 'cm'],
    absTolerance: 1,
    solution: [
      `before: $${qty(v1, 'cm³')}$, after: $${qty(v2, 'cm³')}$`,
      `$V_{\\text{stone}} = ${v2} - ${v1} = ${qty(v2 - v1, 'cm³')}$`,
    ],
    traps: [
      { value: v2, hint: 'This is the water and the stone together. Subtract the first reading.' },
      { value: v1, hint: 'This is the water only. The stone’s volume is the increase: after − before.' },
    ],
  };
}

function stoneDensity(): Question {
  const [v1, v2] = displacementPair();
  const V = v2 - v1;
  const rho = pick([2.5, 2.6, 2.7, 3.0]);
  const m = Number((rho * V).toPrecision(3));
  return {
    text: `The stone has a mass of ${fmt(m)} g. Find its density.`,
    figure: twoCylinders(v1, v2),
    given: [`mass $m = ${qty(m, 'g')}$`, 'read the volumes on the two cylinders (cm³)'],
    find: 'the density of the stone',
    answer: m / V,
    unit: 'g/cm³',
    unitOptions: D_UNITS,
    tolerance: 0.04,
    solution: [
      `$V = ${v2} - ${v1} = ${qty(V, 'cm³')}$`,
      `$\\rho = \\dfrac{m}{V} = ${frac(m, V)}$`,
      `$\\rho = ${qty(m / V, 'g/cm³')}$`,
    ],
    traps: [
      { value: m / v2, hint: 'Use the volume of the stone only: after − before.' },
      { value: V / m, hint: `You divided the wrong way: $${RHO}$.` },
    ],
  };
}

function liquidDensity(): Question {
  const liquid = pick(materials.filter((m) => m.state === 'liquid' && m.name !== 'mercury'));
  const empty = randInt(80, 140);
  const V = randInt(5, 20) * 10;
  const mLiquid = Number((liquid.density * V).toFixed(0));
  const full = empty + mLiquid;
  return {
    text: `A student measures the density of ${liquid.name}. She puts ${V} cm³ of it in a measuring cylinder on a balance.`,
    given: [
      `mass of the empty cylinder $= ${qty(empty, 'g')}$`,
      `mass of the cylinder with the liquid $= ${qty(full, 'g')}$`,
      `volume of the liquid $= ${qty(V, 'cm³')}$`,
    ],
    find: 'the density of the liquid',
    answer: mLiquid / V,
    unit: 'g/cm³',
    unitOptions: D_UNITS,
    solution: [
      `mass of the liquid $= ${full} - ${empty} = ${qty(mLiquid, 'g')}$`,
      `$\\rho = \\dfrac{m}{V} = ${frac(mLiquid, V)}$`,
      `$\\rho = ${qty(mLiquid / V, 'g/cm³')}$`,
    ],
    traps: [{ value: full / V, hint: 'Use the mass of the liquid only: subtract the mass of the empty cylinder.' }],
  };
}

export const densityMeasureTopic: Topic = {
  id: 'density-measure',
  title: 'Measuring density',
  levels: [
    { name: 'Level 1', description: 'Volume by displacement' },
    { name: 'Level 2', description: 'Density of a stone' },
    { name: 'Level 3', description: 'Density of a liquid' },
  ],
  generate: (level) => (level === 1 ? stoneVolume() : level === 2 ? stoneDensity() : liquidDensity()),
};
