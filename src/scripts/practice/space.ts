// Unit 17 practice: orbital speed, light travel time, light-years, Hubble constant.
import type { Question, Topic } from './types';
import { fmt, frac, numTex, pick, qty, sci } from './random';
import { planets, SPEED_OF_LIGHT, LIGHT_YEAR, HUBBLE, SECONDS_PER_YEAR } from '../../data/planets';

const V_ORB = 'v = \\dfrac{2\\pi r}{T}';

// ---------- Orbital speed: v = 2πr / T (syllabus 6.1.1 S4, Extended) ----------

// Satellites with realistic orbits.
const satellites = [
  { name: 'The International Space Station', r: 6.78e6, T: 5.55e3 },
  { name: 'A weather satellite', r: 7.2e6, T: 6.08e3 },
  { name: 'A GPS satellite', r: 2.66e7, T: 4.31e4 },
  { name: 'A geostationary satellite', r: 4.22e7, T: 8.62e4 },
];

function orbitSeconds(): Question {
  const s = pick(satellites);
  const v = (2 * Math.PI * s.r) / s.T;
  return {
    text: `${s.name} moves in a circular orbit around the Earth.`,
    given: [`radius of the orbit $r = ${qty(s.r, 'm')}$`, `orbital period $T = ${qty(s.T, 's')}$`],
    find: 'the average orbital speed $v$',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'm', 's', 'm/s²'],
    sci: true,
    solution: [`$${V_ORB}$`, `$v = \\dfrac{2\\pi \\times ${sci(s.r)}}{${sci(s.T)}}$`, `$v = ${qty(v, 'm/s')}$`],
    traps: [
      { value: s.r / s.T, hint: `Do not forget $2\\pi$: the distance for one orbit is the circumference, $2\\pi r$.` },
      { value: (Math.PI * s.r) / s.T, hint: 'The circumference is $2\\pi r$, not $\\pi r$.' },
      { value: (2 * Math.PI * s.T) / s.r, hint: `You divided the wrong way: $${V_ORB}$.` },
    ],
  };
}

function orbitHoursDays(): Question {
  const body = pick([
    { name: 'The Moon', around: 'the Earth', r: 3.84e8, T: 27.3, unit: 'days', toS: 86400 },
    { name: 'A geostationary satellite', around: 'the Earth', r: 4.22e7, T: 24, unit: 'hours', toS: 3600 },
    { name: 'A GPS satellite', around: 'the Earth', r: 2.66e7, T: 12, unit: 'hours', toS: 3600 },
  ]);
  const Ts = body.T * body.toS;
  const v = (2 * Math.PI * body.r) / Ts;
  return {
    text: `${body.name} orbits ${body.around} in ${body.T} ${body.unit}.`,
    given: [`radius of the orbit $r = ${qty(body.r, 'm')}$`, `orbital period $T = ${body.T}$ ${body.unit}`],
    find: 'the average orbital speed $v$ in m/s',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'km/h', 'm', 's'],
    sci: true,
    solution: [
      `Change the period to seconds: $T = ${body.T} \\times ${body.toS} = ${qty(Ts, 's')}$`,
      `$${V_ORB} = \\dfrac{2\\pi \\times ${sci(body.r)}}{${sci(Ts)}}$`,
      `$v = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: (2 * Math.PI * body.r) / body.T, hint: `Change the period to seconds first: 1 ${body.unit === 'days' ? 'day = 86 400 s' : 'hour = 3600 s'}.` },
      { value: body.r / Ts, hint: 'Do not forget $2\\pi$: one orbit is a distance of $2\\pi r$.' },
    ],
  };
}

function orbitPlanet(): Question {
  const p = pick(planets);
  const r = p.distance * 1e9; // 10⁶ km -> m
  const Ts = p.period * 86400;
  const v = (2 * Math.PI * r) / Ts;
  return {
    text: `${p.name} orbits the Sun. Assume the orbit is a circle.`,
    given: [`average distance from the Sun $= ${fmt(p.distance)} \\times 10^{6}\\,\\text{km}$`, `orbital period $= ${fmt(p.period)}$ days`],
    find: 'the average orbital speed in m/s',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'km/h', 'm', 's'],
    sci: true,
    tolerance: 0.03,
    solution: [
      `$r = ${fmt(p.distance)} \\times 10^{6}\\,\\text{km} = ${qty(r, 'm')}$ (1 km = 1000 m)`,
      `$T = ${fmt(p.period)} \\times 86\\,400 = ${qty(Ts, 's')}$`,
      `$${V_ORB} = \\dfrac{2\\pi \\times ${sci(r)}}{${sci(Ts)}} = ${qty(v, 'm/s')}$`,
    ],
    traps: [
      { value: v / 1000, hint: 'This is in km/s. Change the distance to metres: 1 km = 1000 m.' },
      { value: (2 * Math.PI * r) / p.period, hint: 'Change the period to seconds: 1 day = 86 400 s.' },
      { value: r / Ts, hint: 'Do not forget $2\\pi$: one orbit is a distance of $2\\pi r$.' },
    ],
  };
}

export const orbitalSpeedTopic: Topic = {
  id: 'orbital-speed',
  title: 'Orbital speed',
  levels: [
    { name: 'Level 1', description: 'Satellites (period in seconds)' },
    { name: 'Level 2', description: 'Period in hours or days' },
    { name: 'Level 3', description: 'Planets around the Sun' },
  ],
  generate: (level) => (level === 1 ? orbitSeconds() : level === 2 ? orbitHoursDays() : orbitPlanet()),
};

// ---------- Light travel time: t = d / c (syllabus 6.1.2 C4) ----------

const C_GIVEN = `speed of light $c = ${qty(SPEED_OF_LIGHT, 'm/s')}$`;

function lightSeconds(): Question {
  const p = pick(planets);
  const d = p.distance * 1e9;
  const t = d / SPEED_OF_LIGHT;
  return {
    text: `Light leaves the Sun and travels to ${p.name}.`,
    given: [`distance $d = ${qty(d, 'm')}$`, C_GIVEN],
    find: 'the time for the light to arrive, in seconds',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'min', 'm', 'm/s'],
    solution: ['$t = \\dfrac{d}{c}$', `$t = ${frac(d, SPEED_OF_LIGHT)}$`, `$t = ${qty(t, 's')}$`],
    traps: [
      { value: d * SPEED_OF_LIGHT, hint: 'You multiplied. Time = distance ÷ speed: $t = \\dfrac{d}{c}$.' },
      { value: SPEED_OF_LIGHT / d, hint: 'You divided the wrong way: $t = \\dfrac{d}{c}$.' },
    ],
  };
}

function lightMinutes(): Question {
  const p = pick(planets.filter((x) => x.name !== 'Mercury'));
  const dKm = p.distance * 1e6;
  const t = (dKm * 1000) / SPEED_OF_LIGHT;
  return {
    text: `How long does sunlight take to reach ${p.name}? Give your answer in minutes.`,
    given: [`distance $= ${qty(dKm, 'km')}$`, C_GIVEN],
    find: 'the time in minutes',
    answer: t / 60,
    unit: 'min',
    unitOptions: ['min', 's', 'h', 'm'],
    solution: [
      `Change km to m: $d = ${sci(dKm)} \\times 1000 = ${qty(dKm * 1000, 'm')}$`,
      `$t = \\dfrac{d}{c} = ${frac(dKm * 1000, SPEED_OF_LIGHT)} = ${qty(t, 's')}$`,
      `In minutes: $\\dfrac{${numTex(t)}}{60} = ${qty(t / 60, 'min')}$`,
    ],
    traps: [
      { value: t, hint: 'This is the time in seconds. Divide by 60 to get minutes.' },
      { value: t / 60 / 1000, hint: 'Change km to m first: 1 km = 1000 m.' },
      { value: t / 1000, hint: 'Change km to m first (× 1000), then seconds to minutes (÷ 60).' },
    ],
  };
}

function laserEcho(): Question {
  const target = pick([
    { name: 'the Moon', d: 3.84e8, how: 'A laser pulse is sent from the Earth to a mirror on the Moon. It reflects and comes back.' },
    { name: 'Mars', d: 7.8e10, how: 'A radio signal is sent from the Earth to a spacecraft near Mars. The spacecraft answers at once.' },
  ]);
  const t = (2 * target.d) / SPEED_OF_LIGHT;
  return {
    text: target.how,
    given: [`distance from the Earth to ${target.name} $= ${qty(target.d, 'm')}$`, C_GIVEN],
    find: 'the total time, there and back',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'min', 'm', 'm/s'],
    solution: [
      `The signal travels there and back: $d = 2 \\times ${sci(target.d)} = ${qty(2 * target.d, 'm')}$`,
      `$t = \\dfrac{d}{c} = ${frac(2 * target.d, SPEED_OF_LIGHT)}$`,
      `$t = ${qty(t, 's')}$`,
    ],
    traps: [
      { value: t / 2, hint: 'This is the time for one way only. The signal goes there and comes back.' },
      { value: 2 * target.d * SPEED_OF_LIGHT, hint: 'You multiplied. $t = \\dfrac{d}{c}$.' },
    ],
  };
}

export const lightTimeTopic: Topic = {
  id: 'light-time',
  title: 'Light travel time',
  levels: [
    { name: 'Level 1', description: 'Time in seconds' },
    { name: 'Level 2', description: 'km and minutes' },
    { name: 'Level 3', description: 'There and back' },
  ],
  generate: (level) => (level === 1 ? lightSeconds() : level === 2 ? lightMinutes() : laserEcho()),
};

// ---------- Light-years (syllabus 6.2.2 C1, S2) ----------

const LY_GIVEN = `$1\\ \\text{light-year} = ${qty(LIGHT_YEAR, 'm')}$`;

const stars = [
  { name: 'Proxima Centauri', ly: 4.2 },
  { name: 'Sirius', ly: 8.6 },
  { name: 'Vega', ly: 25 },
  { name: 'Arcturus', ly: 37 },
  { name: 'Aldebaran', ly: 65 },
];

function lyToMetres(): Question {
  const s = pick(stars);
  const d = s.ly * LIGHT_YEAR;
  return {
    text: `The star ${s.name} is ${s.ly} light-years from the Earth.`,
    given: [`distance $= ${s.ly}$ light-years`, LY_GIVEN],
    find: 'the distance in metres',
    answer: d,
    unit: 'm',
    unitOptions: ['m', 'km', 's'],
    sci: true,
    solution: [`$d = ${s.ly} \\times ${sci(LIGHT_YEAR, 2)}$`, `$d = ${qty(d, 'm')}$`],
    traps: [{ value: LIGHT_YEAR / s.ly, hint: 'Multiply the number of light-years by the size of one light-year.' }],
  };
}

function metresToLy(): Question {
  const s = pick(stars);
  const d = Number((s.ly * LIGHT_YEAR).toPrecision(2));
  const ly = d / LIGHT_YEAR;
  return {
    text: 'An astronomer measures the distance to a star.',
    given: [`distance $= ${qty(d, 'm')}$`, LY_GIVEN],
    find: 'the distance in light-years',
    answer: ly,
    unit: 'light-years',
    unitOptions: ['light-years', 'm', 'years', 's'],
    tolerance: 0.03,
    solution: [`$\\text{number of light-years} = ${frac(d, LIGHT_YEAR)}$`, `$= ${fmt(ly)}$ light-years`],
    traps: [{ value: d * LIGHT_YEAR, hint: 'You multiplied. To change metres to light-years, divide by $9.5 \\times 10^{15}$.' }],
  };
}

function lightYearsBig(): Question {
  const thing = pick([
    { text: 'The Milky Way galaxy is about 100 000 light-years across.', ly: 1e5, find: 'its diameter in metres' },
    { text: 'The Andromeda galaxy is about 2.5 million light-years from the Earth.', ly: 2.5e6, find: 'the distance in metres' },
  ]);
  const d = thing.ly * LIGHT_YEAR;
  return {
    text: thing.text,
    given: [`distance $= ${sci(thing.ly, 2)}$ light-years`, LY_GIVEN],
    find: thing.find,
    answer: d,
    unit: 'm',
    unitOptions: ['m', 'km', 's'],
    sci: true,
    solution: [`$d = ${sci(thing.ly, 2)} \\times ${sci(LIGHT_YEAR, 2)}$`, `$d = ${qty(d, 'm')}$`],
    traps: [{ value: LIGHT_YEAR / thing.ly, hint: 'Multiply the number of light-years by the size of one light-year.' }],
  };
}

export const lightYearTopic: Topic = {
  id: 'light-year',
  title: 'Light-years',
  levels: [
    { name: 'Level 1', description: 'Light-years to metres' },
    { name: 'Level 2', description: 'Metres to light-years' },
    { name: 'Level 3', description: 'Galaxies' },
  ],
  generate: (level) => (level === 1 ? lyToMetres() : level === 2 ? metresToLy() : lightYearsBig()),
};

// ---------- Hubble constant (syllabus 6.2.3 S9-S11, Extended) ----------

const H_EQ = 'H_0 = \\dfrac{v}{d}';

function hubbleFromData(): Question {
  const d = Number((Math.random() * 9 + 1).toFixed(1)) * 1e24;
  const H = (2.0 + Math.random() * 0.4) * 1e-18;
  const v = Number((H * d).toPrecision(2));
  return {
    text: 'A galaxy moves away from the Earth. Astronomers find its speed from the redshift, and its distance from a supernova.',
    given: [`speed $v = ${qty(v, 'm/s')}$`, `distance $d = ${qty(d, 'm')}$`],
    find: 'the Hubble constant $H_0$',
    answer: v / d,
    unit: 's⁻¹',
    unitOptions: ['s⁻¹', 's', 'm/s', 'm'],
    sci: true,
    solution: [`$${H_EQ}$`, `$H_0 = ${frac(v, d)}$`, `$H_0 = ${qty(v / d, 's⁻¹')}$`],
    traps: [{ value: d / v, hint: `You divided the wrong way: $${H_EQ}$.` }],
  };
}

function speedFromDistance(): Question {
  const d = Number((Math.random() * 9 + 1).toFixed(1)) * 1e24;
  const v = HUBBLE * d;
  return {
    text: 'A distant galaxy moves away from the Earth.',
    given: [`distance $d = ${qty(d, 'm')}$`, `$H_0 = ${qty(HUBBLE, 's⁻¹')}$`],
    find: 'the speed $v$ of the galaxy',
    answer: v,
    unit: 'm/s',
    unitOptions: ['m/s', 'm', 's', 's⁻¹'],
    sci: true,
    solution: [`$${H_EQ}$, so $v = H_0 \\times d$`, `$v = ${sci(HUBBLE, 2)} \\times ${sci(d, 2)}$`, `$v = ${qty(v, 'm/s')}$`],
    traps: [{ value: d / HUBBLE, hint: 'Multiply: $v = H_0 \\times d$.' }],
  };
}

function ageOfUniverse(): Question {
  const H = Number(((2.0 + Math.random() * 0.4)).toFixed(2)) * 1e-18;
  const ageS = 1 / H;
  const ageY = ageS / SECONDS_PER_YEAR;
  return {
    text: 'A student measures the Hubble constant. Use the result to estimate the age of the Universe.',
    given: [`$H_0 = ${qty(H, 's⁻¹')}$`, `$1\\ \\text{year} = ${qty(SECONDS_PER_YEAR, 's')}$`],
    find: 'the age of the Universe, in years',
    answer: ageY,
    unit: 'years',
    unitOptions: ['years', 's', 'light-years', 's⁻¹'],
    sci: true,
    tolerance: 0.03,
    solution: [
      '$\\text{age} = \\dfrac{d}{v} = \\dfrac{1}{H_0}$',
      `$\\text{age} = \\dfrac{1}{${sci(H, 3)}} = ${qty(ageS, 's')}$`,
      `In years: $${frac(ageS, SECONDS_PER_YEAR)} = ${sci(ageY, 2)}$ years (about ${fmt(Number((ageY / 1e9).toPrecision(2)))} billion years)`,
    ],
    traps: [
      { value: ageS, hint: 'This is the age in seconds. Divide by the number of seconds in one year.' },
      { value: H * SECONDS_PER_YEAR, hint: 'The age is $\\dfrac{1}{H_0}$, not $H_0$.' },
    ],
  };
}

export const hubbleTopic: Topic = {
  id: 'hubble',
  title: 'The Hubble constant',
  levels: [
    { name: 'Level 1', description: 'Find H₀ from data' },
    { name: 'Level 2', description: 'Find the speed of a galaxy' },
    { name: 'Level 3', description: 'Age of the Universe' },
  ],
  generate: (level) => (level === 1 ? hubbleFromData() : level === 2 ? speedFromDistance() : ageOfUniverse()),
};
