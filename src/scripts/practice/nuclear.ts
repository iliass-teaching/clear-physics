// Unit 16 practice: nuclide notation (5.1.2), count rates (5.2.1), decay equations (5.2.3 S5), half-life (5.2.4).
import type { Question, Topic } from './types';
import { fmt, pick, randInt } from './random';

const NO_UNIT = '(no unit)';
const nuc = (A: number, Z: number, X: string) => `{}^{${A}}_{${Z}}\\text{${X}}`;

const NUCLIDES = [
  { X: 'H', name: 'hydrogen', Z: 1, A: [1, 2, 3] },
  { X: 'He', name: 'helium', Z: 2, A: [3, 4] },
  { X: 'C', name: 'carbon', Z: 6, A: [12, 13, 14] },
  { X: 'O', name: 'oxygen', Z: 8, A: [16, 17, 18] },
  { X: 'Na', name: 'sodium', Z: 11, A: [23, 24] },
  { X: 'K', name: 'potassium', Z: 19, A: [39, 40] },
  { X: 'Co', name: 'cobalt', Z: 27, A: [59, 60] },
  { X: 'Sr', name: 'strontium', Z: 38, A: [88, 90] },
  { X: 'I', name: 'iodine', Z: 53, A: [127, 131] },
  { X: 'Cs', name: 'caesium', Z: 55, A: [133, 137] },
  { X: 'U', name: 'uranium', Z: 92, A: [235, 238] },
];

// ---------- Nuclide notation ----------

function neutronNumber(): Question {
  const n = pick(NUCLIDES);
  const A = pick(n.A);
  return {
    text: `A nucleus of ${n.name} is written $${nuc(A, n.Z, n.X)}$.`,
    given: [`nucleon number $A = ${A}$`, `proton number $Z = ${n.Z}$`],
    find: 'the number of neutrons in the nucleus',
    answer: A - n.Z,
    unit: 'neutrons',
    unitOptions: ['neutrons', 'protons', 'electrons'],
    absTolerance: 0.01,
    solution: ['neutrons = nucleon number − proton number = $A - Z$', `$${A} - ${n.Z} = ${A - n.Z}$`],
    traps: [
      { value: A, hint: 'A is the number of protons + neutrons. Subtract Z.' },
      { value: A + n.Z, hint: 'Subtract, do not add: $A - Z$.' },
    ],
  };
}

function particlesInAtom(): Question {
  let n = pick(NUCLIDES);
  let A = pick(n.A);
  // Avoid nuclei where Z = A − Z (or A = Z): a typical mistake would give the right answer.
  while (A - n.Z === n.Z || A === n.Z) {
    n = pick(NUCLIDES);
    A = pick(n.A);
  }
  const ask = pick(['protons', 'electrons', 'nucleons']);
  const answer = ask === 'nucleons' ? A : n.Z;
  return {
    text: `A neutral atom of ${n.name} has the nucleus $${nuc(A, n.Z, n.X)}$.`,
    given: [`$A = ${A}$`, `$Z = ${n.Z}$`],
    find: `the number of ${ask === 'nucleons' ? 'nucleons (protons + neutrons)' : ask} in the atom`,
    answer,
    unit: ask === 'nucleons' ? 'nucleons' : ask,
    unitOptions: ['protons', 'neutrons', 'electrons', 'nucleons'],
    absTolerance: 0.01,
    solution:
      ask === 'protons'
        ? [`The proton number $Z$ is the number of protons: ${n.Z}.`]
        : ask === 'electrons'
          ? ['A neutral atom has the same number of electrons as protons.', `electrons $= Z = ${n.Z}$`]
          : [`The nucleon number $A$ is the number of protons + neutrons: ${A}.`],
    traps: ask === 'nucleons' ? [{ value: n.Z, hint: 'Z is the number of protons only. A is the number of nucleons.' }] : [{ value: A, hint: 'A is the number of nucleons. Use Z.' }, { value: A - n.Z, hint: 'This is the number of neutrons.' }],
  };
}

function ions(): Question {
  // Real, common ions.
  const n = pick([
    { name: 'sodium', X: 'Na', Z: 11, A: 23, c: 1 },
    { name: 'potassium', X: 'K', Z: 19, A: 39, c: 1 },
    { name: 'magnesium', X: 'Mg', Z: 12, A: 24, c: 2 },
    { name: 'calcium', X: 'Ca', Z: 20, A: 40, c: 2 },
    { name: 'oxygen', X: 'O', Z: 8, A: 16, c: -2 },
    { name: 'fluorine', X: 'F', Z: 9, A: 19, c: -1 },
    { name: 'chlorine', X: 'Cl', Z: 17, A: 35, c: -1 },
    { name: 'iodine', X: 'I', Z: 53, A: 127, c: -1 },
  ]);
  const A = n.A;
  const charge = n.c;
  const e = n.Z - charge;
  const sign = charge > 0 ? `${charge === 1 ? '' : charge}+` : `${charge === -1 ? '' : -charge}-`;
  return {
    text: `An ion of ${n.name} is written $${nuc(A, n.Z, n.X)}^{${sign}}$.`,
    given: [`$Z = ${n.Z}$`, `charge of the ion $= ${charge > 0 ? '+' : '−'}${Math.abs(charge)}$`],
    find: 'the number of electrons in the ion',
    answer: e,
    unit: 'electrons',
    unitOptions: ['electrons', 'protons', 'neutrons'],
    absTolerance: 0.01,
    solution: [
      `The ion has ${n.Z} protons.`,
      charge > 0 ? `It is positive: it has lost ${charge} electron${charge > 1 ? 's' : ''}: $${n.Z} - ${charge} = ${e}$` : `It is negative: it has gained ${-charge} electron${charge < -1 ? 's' : ''}: $${n.Z} + ${-charge} = ${e}$`,
    ],
    traps: [
      { value: n.Z, hint: 'This is a neutral atom. An ion has lost or gained electrons.' },
      { value: n.Z + charge, hint: charge > 0 ? 'A positive ion has LOST electrons.' : 'A negative ion has GAINED electrons.' },
    ],
  };
}

export const nuclideTopic: Topic = {
  id: 'nuclide',
  title: 'Protons, neutrons and electrons',
  levels: [
    { name: 'Level 1', description: 'Number of neutrons' },
    { name: 'Level 2', description: 'Particles in an atom' },
    { name: 'Level 3', description: 'Ions' },
  ],
  generate: (level) => (level === 1 ? neutronNumber() : level === 2 ? particlesInAtom() : ions()),
};

// ---------- Count rate ----------

function countRate(): Question {
  const perMin = Math.random() < 0.5;
  const t = perMin ? pick([2, 5, 10]) : pick([10, 20, 50, 100]);
  const rate = perMin ? randInt(20, 400) : randInt(2, 60);
  const counts = rate * t;
  return {
    text: `A detector counts ${counts} counts in ${t} ${perMin ? 'minutes' : 'seconds'}.`,
    given: [`counts $= ${counts}$`, `time $= ${t}$ ${perMin ? 'min' : 's'}`],
    find: `the count rate in counts/${perMin ? 'minute' : 's'}`,
    answer: rate,
    unit: perMin ? 'counts/minute' : 'counts/s',
    unitOptions: ['counts/s', 'counts/minute', 'counts'],
    solution: ['count rate $= \\dfrac{\\text{number of counts}}{\\text{time}}$', `count rate $= \\dfrac{${counts}}{${t}} = ${rate}$ counts/${perMin ? 'minute' : 's'}`],
    traps: [{ value: counts * t, hint: 'Divide the counts by the time.' }],
  };
}

function correctedRate(): Question {
  const bg = randInt(15, 40);
  const src = randInt(60, 500);
  return {
    text: `Background radiation gives ${bg} counts/minute. With a source near the detector, the count rate is ${src + bg} counts/minute.`,
    given: [`background $= ${bg}$ counts/minute`, `measured $= ${src + bg}$ counts/minute`],
    find: 'the corrected count rate (from the source only)',
    answer: src,
    unit: 'counts/minute',
    unitOptions: ['counts/minute', 'counts/s', 'counts'],
    solution: ['corrected count rate = measured − background', `$${src + bg} - ${bg} = ${src}$ counts/minute`],
    traps: [{ value: src + 2 * bg, hint: 'Subtract the background, do not add it.' }, { value: src + bg, hint: 'This includes the background. Subtract it.' }],
  };
}

function correctedRateUnits(): Question {
  const bgPerS = pick([0.3, 0.4, 0.5]);
  const minutes = pick([2, 5]);
  const srcPerMin = randInt(10, 60) * 10;
  const measured = (srcPerMin + bgPerS * 60) * minutes;
  return {
    text: `The background count rate is ${bgPerS} counts/s. A source gives ${fmt(measured)} counts in ${minutes} minutes (including the background).`,
    given: [`background $= ${bgPerS}$ counts/s`, `${fmt(measured)} counts in ${minutes} min`],
    find: 'the corrected count rate in counts/minute',
    answer: srcPerMin,
    unit: 'counts/minute',
    unitOptions: ['counts/minute', 'counts/s', 'counts'],
    solution: [
      `measured rate $= \\dfrac{${fmt(measured)}}{${minutes}} = ${fmt(measured / minutes)}$ counts/minute`,
      `background $= ${bgPerS} \\times 60 = ${fmt(bgPerS * 60)}$ counts/minute`,
      `corrected $= ${fmt(measured / minutes)} - ${fmt(bgPerS * 60)} = ${srcPerMin}$ counts/minute`,
    ],
    traps: [
      { value: measured / minutes - bgPerS, hint: 'Change the background to counts/minute first (× 60).' },
      { value: measured / minutes, hint: 'Subtract the background.' },
    ],
  };
}

export const countRateTopic: Topic = {
  id: 'count-rate',
  title: 'Count rate and background',
  levels: [
    { name: 'Level 1', description: 'Count rate' },
    { name: 'Level 2', description: 'Corrected count rate (Extended)' },
    { name: 'Level 3', description: 'Mixed units (Extended)' },
  ],
  generate: (level) => (level === 1 ? countRate() : level === 2 ? correctedRate() : correctedRateUnits()),
};

// ---------- Half-life ----------

function halvings(): Question {
  const T = pick([2, 5, 6, 8, 10, 30]);
  const n = randInt(2, 4);
  const sit = pick([
    { what: 'a sample contains', unit: 'g', q: pick([16, 32, 40, 80, 64]), name: 'the mass of the radioactive isotope left' },
    { what: 'the count rate from a sample is', unit: 'counts/minute', q: pick([800, 1600, 960, 2400]), name: 'the count rate' },
  ]);
  const ans = sit.q / 2 ** n;
  const tu = pick(['days', 'hours', 'years']);
  return {
    text: `The half-life of a radioactive isotope is ${T} ${tu}. At the start, ${sit.what} ${sit.q} ${sit.unit}.`,
    given: [`half-life $= ${T}$ ${tu}`, `time $= ${T * n}$ ${tu}`],
    find: `${sit.name} after ${T * n} ${tu}`,
    answer: ans,
    unit: sit.unit,
    unitOptions: [sit.unit, tu, sit.unit === 'g' ? 'counts/minute' : 'g'],
    solution: [
      `number of half-lives $= \\dfrac{${T * n}}{${T}} = ${n}$`,
      `${sit.q} → ${Array.from({ length: n }, (_, k) => fmt(sit.q / 2 ** (k + 1))).join(' → ')}`,
      `answer $= ${fmt(ans)}$ ${sit.unit}`,
    ],
    traps: [
      { value: sit.q / (2 * n), hint: 'Halve again and again: do not divide by 2 × the number of half-lives.' },
      { value: sit.q - sit.q / 2 ** n, hint: 'This is the amount that has decayed. The question asks what is left.' },
    ].filter((t) => Math.abs(t.value - ans) > 1e-9),
  };
}

function findHalfLife(): Question {
  const T = pick([3, 4, 5, 8, 12, 20]);
  const n = randInt(2, 4);
  const start = pick([1200, 1600, 3200, 4000]);
  const end = start / 2 ** n;
  return {
    text: `The count rate from a source falls from ${start} counts/minute to ${end} counts/minute in ${T * n} hours (background is not included).`,
    given: [`start: ${start} counts/minute`, `end: ${end} counts/minute`, `time $= ${T * n}$ hours`],
    find: 'the half-life',
    answer: T,
    unit: 'hours',
    unitOptions: ['hours', 'counts/minute', 'days'],
    absTolerance: 0.01,
    solution: [
      `${start} → ${Array.from({ length: n }, (_, k) => start / 2 ** (k + 1)).join(' → ')}: ${n} half-lives`,
      `half-life $= \\dfrac{${T * n}}{${n}} = ${T}$ hours`,
    ],
    traps: [{ value: T * n, hint: 'This is the total time. Count how many halvings there are, and divide.' }, { value: (T * n) / 2, hint: 'Count the halvings: the count rate halved more than twice.' }].filter((t) => t.value !== T),
  };
}

function halfLifeWithBackground(): Question {
  const bg = pick([20, 30, 40]);
  const T = pick([2, 4, 6, 10]);
  const start = pick([400, 640, 800]);
  const n = 2;
  return {
    text: `The background count rate is ${bg} counts/minute. A source gives ${start + bg} counts/minute at the start, and ${start / 4 + bg} counts/minute after ${T * n} minutes. Both readings include the background.`,
    given: [`background $= ${bg}$ counts/minute`, `readings: ${start + bg} and ${start / 4 + bg} counts/minute`, `time $= ${T * n}$ minutes`],
    find: 'the half-life of the source',
    answer: T,
    unit: 'minutes',
    unitOptions: ['minutes', 'counts/minute', 'hours'],
    absTolerance: 0.01,
    solution: [
      `Subtract the background: ${start} counts/minute and ${start / 4} counts/minute`,
      `${start} → ${start / 2} → ${start / 4}: 2 half-lives`,
      `half-life $= \\dfrac{${T * n}}{2} = ${T}$ minutes`,
    ],
    traps: [{ value: T * n, hint: 'Subtract the background first. Then the count rate falls to a quarter: 2 half-lives.' }],
  };
}

export const halfLifeTopic: Topic = {
  id: 'half-life',
  title: 'Half-life',
  levels: [
    { name: 'Level 1', description: 'What is left after some half-lives' },
    { name: 'Level 2', description: 'Find the half-life' },
    { name: 'Level 3', description: 'With background (Extended)' },
  ],
  generate: (level) => (level === 1 ? halvings() : level === 2 ? findHalfLife() : halfLifeWithBackground()),
};

// ---------- Decay equations (Extended) ----------

const ALPHA = [
  { p: ['U', 238, 92], d: ['Th', 234, 90] },
  { p: ['Ra', 226, 88], d: ['Rn', 222, 86] },
  { p: ['Po', 210, 84], d: ['Pb', 206, 82] },
  { p: ['Am', 241, 95], d: ['Np', 237, 93] },
  { p: ['Rn', 222, 86], d: ['Po', 218, 84] },
] as const;
const BETA = [
  { p: ['C', 14, 6], d: ['N', 14, 7] },
  { p: ['Sr', 90, 38], d: ['Y', 90, 39] },
  { p: ['I', 131, 53], d: ['Xe', 131, 54] },
  { p: ['Co', 60, 27], d: ['Ni', 60, 28] },
  { p: ['Cs', 137, 55], d: ['Ba', 137, 56] },
] as const;

function alphaDecay(): Question {
  const e = pick(ALPHA);
  const askA = Math.random() < 0.5;
  const [X, A, Z] = e.p;
  const [Y, A2, Z2] = e.d;
  return {
    text: `$${nuc(A, Z, X)}$ decays by emitting an α-particle ($${nuc(4, 2, 'He')}$). The new nucleus is ${Y}.`,
    given: [`$${nuc(A, Z, X)} \\rightarrow {}^{?}_{?}\\text{${Y}} + ${nuc(4, 2, 'He')}$`],
    find: askA ? `the nucleon number of the ${Y} nucleus` : `the proton number of the ${Y} nucleus`,
    answer: askA ? A2 : Z2,
    unit: NO_UNIT,
    unitOptions: [NO_UNIT, 'protons'],
    absTolerance: 0.01,
    solution: [
      'In α-decay, the nucleus loses 2 protons and 2 neutrons: $A$ goes down by 4, $Z$ goes down by 2.',
      `$${nuc(A, Z, X)} \\rightarrow ${nuc(A2, Z2, Y)} + ${nuc(4, 2, 'He')}$`,
      'Check: the top numbers and the bottom numbers balance on both sides.',
    ],
    traps: askA ? [{ value: A - 2, hint: 'An α-particle has 4 nucleons: $A$ goes down by 4.' }] : [{ value: Z - 4, hint: 'An α-particle has 2 protons: $Z$ goes down by 2.' }],
  };
}

function betaDecay(): Question {
  const e = pick(BETA);
  const askA = Math.random() < 0.4;
  const [X, A, Z] = e.p;
  const [Y, A2, Z2] = e.d;
  return {
    text: `$${nuc(A, Z, X)}$ decays by emitting a β-particle ($${nuc(0, -1, 'e')}$). The new nucleus is ${Y}.`,
    given: [`$${nuc(A, Z, X)} \\rightarrow {}^{?}_{?}\\text{${Y}} + ${nuc(0, -1, 'e')}$`],
    find: askA ? `the nucleon number of the ${Y} nucleus` : `the proton number of the ${Y} nucleus`,
    answer: askA ? A2 : Z2,
    unit: NO_UNIT,
    unitOptions: [NO_UNIT, 'protons'],
    absTolerance: 0.01,
    solution: [
      'In β-decay, a neutron changes into a proton and an electron: $A$ stays the same, $Z$ goes up by 1.',
      `$${nuc(A, Z, X)} \\rightarrow ${nuc(A2, Z2, Y)} + ${nuc(0, -1, 'e')}$`,
    ],
    traps: askA ? [{ value: A - 1, hint: 'The β-particle has a nucleon number of 0: $A$ does not change.' }] : [{ value: Z - 1, hint: 'A neutron becomes a proton: $Z$ goes UP by 1.' }],
  };
}

function decaySeries(): Question {
  const A = 238;
  const Z = 92;
  const na = randInt(1, 4);
  const nb = randInt(1, 3);
  const askA = Math.random() < 0.5;
  const A2 = A - 4 * na;
  const Z2 = Z - 2 * na + nb;
  return {
    text: `A nucleus of uranium-238 ($${nuc(A, Z, 'U')}$) emits ${na} α-particle${na > 1 ? 's' : ''} and ${nb} β-particle${nb > 1 ? 's' : ''}.`,
    given: [`$A = ${A}$, $Z = ${Z}$`, `${na} α, ${nb} β`],
    find: askA ? 'the nucleon number of the final nucleus' : 'the proton number of the final nucleus',
    answer: askA ? A2 : Z2,
    unit: NO_UNIT,
    unitOptions: [NO_UNIT, 'protons'],
    absTolerance: 0.01,
    solution: askA
      ? [`Each α: $A - 4$. Each β: no change in $A$.`, `$A = ${A} - 4 \\times ${na} = ${A2}$`]
      : [`Each α: $Z - 2$. Each β: $Z + 1$.`, `$Z = ${Z} - 2 \\times ${na} + ${nb} = ${Z2}$`],
    traps: askA ? [{ value: A - 4 * na - nb, hint: 'β-decay does not change $A$.' }] : [{ value: Z - 2 * na - nb, hint: 'β-decay increases $Z$ by 1.' }],
  };
}

export const decayTopic: Topic = {
  id: 'decay-equation',
  title: 'Decay equations',
  levels: [
    { name: 'Level 1', description: 'α-decay' },
    { name: 'Level 2', description: 'β-decay' },
    { name: 'Level 3', description: 'Several decays' },
  ],
  generate: (level) => (level === 1 ? alphaDecay() : level === 2 ? betaDecay() : decaySeries()),
};
