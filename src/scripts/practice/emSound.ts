// Unit 11 practice: electromagnetic waves (v = fλ with c = 3.0 × 10⁸ m/s) and sound (speed, echoes, ultrasound).
import type { Question, Topic } from './types';
import { fmt, pick, qty, randInt, sci } from './random';

const C = 3e8;
const C_TEX = '3.0 \\times 10^8\\,\\text{m/s}';

// ---------- Electromagnetic waves ----------

function wavelengthFromF(): Question {
  const sit = pick([
    { text: (f: string) => `An FM radio station broadcasts at ${f}.`, f: pick([90, 96, 100, 105]), unit: 'MHz', k: 1e6 },
    { text: (f: string) => `A mobile phone uses microwaves with a frequency of ${f}.`, f: pick([900, 1800]), unit: 'MHz', k: 1e6 },
    { text: (f: string) => `A wireless internet router uses microwaves with a frequency of ${f}.`, f: pick([2.4, 5]), unit: 'GHz', k: 1e9 },
    { text: (f: string) => `A microwave oven uses microwaves with a frequency of ${f}.`, f: 2.45, unit: 'GHz', k: 1e9 },
  ]);
  const fHz = sit.f * sit.k;
  const l = C / fHz;
  const fText = `${sit.f} ${sit.unit}`;
  return {
    text: sit.text(fText) + ' Electromagnetic waves travel at $3.0 \\times 10^8$ m/s.',
    given: [`$f = ${sit.f}\\,\\text{${sit.unit}} = ${sci(fHz, 3)}\\,\\text{Hz}$`, `$v = ${C_TEX}$`],
    find: 'the wavelength $\\lambda$',
    answer: l,
    unit: 'm',
    unitOptions: ['m', 'Hz', 'm/s', 'km'],
    solution: [
      `1 ${sit.unit} = $10^{${sit.k === 1e6 ? 6 : 9}}$ Hz, so $f = ${sci(fHz, 3)}\\,\\text{Hz}$`,
      '$v = f\\lambda$, so $\\lambda = \\dfrac{v}{f}$',
      `$\\lambda = \\dfrac{3.0 \\times 10^8}{${sci(fHz, 3)}} = ${qty(l, 'm')}$`,
    ],
    traps: [
      { value: C / sit.f, hint: `Change ${sit.unit} to Hz first: 1 ${sit.unit} = $10^{${sit.k === 1e6 ? 6 : 9}}$ Hz.` },
      { value: fHz / C, hint: 'Upside down: $\\lambda = \\dfrac{v}{f}$.' },
    ],
  };
}

function frequencyFromL(): Question {
  const sit = pick([
    { name: 'green light', l: 500, unit: 'nm', k: 1e-9 },
    { name: 'red light', l: 700, unit: 'nm', k: 1e-9 },
    { name: 'ultraviolet radiation', l: 300, unit: 'nm', k: 1e-9 },
    { name: 'an X-ray', l: 0.1, unit: 'nm', k: 1e-9 },
    { name: 'infrared radiation', l: 10, unit: 'µm', k: 1e-6 },
    { name: 'a long-wave radio signal', l: 1.5, unit: 'km', k: 1e3 },
  ]);
  const lm = sit.l * sit.k;
  const f = C / lm;
  const unitTexL = sit.unit === 'µm' ? '\\mu\\text{m}' : `\\text{${sit.unit}}`;
  const conv =
    sit.unit === 'nm'
      ? '1\\,\\text{nm} = 10^{-9}\\,\\text{m}'
      : sit.unit === 'µm'
        ? '1\\,\\mu\\text{m} = 10^{-6}\\,\\text{m}'
        : '1\\,\\text{km} = 1000\\,\\text{m}';
  return {
    text: `The wavelength of ${sit.name} is ${sit.l} ${sit.unit}. It travels at $3.0 \\times 10^8$ m/s.`,
    given: [`$\\lambda = ${sit.l}\\,${unitTexL} = ${sci(lm, 2)}\\,\\text{m}$`, `$v = ${C_TEX}$`],
    find: 'the frequency $f$',
    answer: f,
    unit: 'Hz',
    unitOptions: ['Hz', 'm', 'm/s', 's'],
    sci: true,
    solution: [
      `Change the wavelength to metres: $${conv}$`,
      '$v = f\\lambda$, so $f = \\dfrac{v}{\\lambda}$',
      `$f = \\dfrac{3.0 \\times 10^8}{${sci(lm, 2)}} = ${sci(f, 2)}\\,\\text{Hz}$`,
    ],
    traps: [
      { value: C / sit.l, hint: `Change ${sit.unit} to metres first.` },
      { value: lm / C, hint: 'Upside down: $f = \\dfrac{v}{\\lambda}$.' },
    ],
  };
}

function signalTime(): Question {
  const sit = pick([
    { text: 'A TV signal goes from the ground up to a geostationary satellite, 36 000 km above the Earth.', d: 36000 },
    { text: 'A phone signal goes up to a geostationary satellite and back down to the ground. The satellite is 36 000 km above the Earth.', d: 72000 },
    { text: 'A signal goes from a low-orbit satellite to the ground, a distance of 600 km.', d: 600 },
    { text: 'A radio signal goes from the Earth to the Moon, a distance of 384 000 km.', d: 384000 },
  ]);
  const t = (sit.d * 1000) / C;
  return {
    text: `${sit.text} Microwaves and radio waves travel at $3.0 \\times 10^8$ m/s.`,
    given: [`distance $= ${fmt(sit.d)}\\,\\text{km} = ${sci(sit.d * 1000, 2)}\\,\\text{m}$`, `$v = ${C_TEX}$`],
    find: 'the time the signal takes',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'm/s', 'm', 'Hz'],
    sci: t < 0.01,
    solution: [
      'time $= \\dfrac{\\text{distance}}{\\text{speed}}$ (distance in metres)',
      `$t = \\dfrac{${sci(sit.d * 1000, 2)}}{3.0 \\times 10^8}$`,
      `$t = ${qty(t, 's')}$`,
    ],
    traps: [
      { value: sit.d / C, hint: 'Change km to m first: 1 km = 1000 m.' },
      ...(sit.d === 72000 ? [{ value: (36000 * 1000) / C, hint: 'The signal goes up and back down: the distance is 2 × 36 000 km.' }] : []),
    ],
  };
}

export const emWavesTopic: Topic = {
  id: 'em-waves',
  title: 'Electromagnetic waves',
  levels: [
    { name: 'Level 1', description: 'Wavelength from frequency (MHz, GHz)' },
    { name: 'Level 2', description: 'Frequency from wavelength (nm, µm, km)' },
    { name: 'Level 3', description: 'Time for a signal' },
  ],
  generate: (level) => (level === 1 ? wavelengthFromF() : level === 2 ? frequencyFromL() : signalTime()),
};

// ---------- Sound ----------

function speedOfSound(): Question {
  const d = pick([100, 150, 200, 250, 300, 400]);
  const v = randInt(325, 350);
  const t = Math.round((d / v) * 100) / 100;
  const vAns = d / t;
  return {
    text: `Student A bangs two blocks together. Student B is ${d} m away. B starts a stopwatch when she sees the blocks hit, and stops it when she hears the sound. The time is ${t} s.`,
    given: [`distance $= ${qty(d, 'm')}$`, `time $= ${qty(t, 's')}$`],
    find: 'the speed of sound in air',
    answer: vAns,
    unit: 'm/s',
    unitOptions: ['m/s', 'm', 's', 'Hz'],
    solution: ['speed $= \\dfrac{\\text{distance}}{\\text{time}}$', `speed $= \\dfrac{${d}}{${t}}$`, `speed $= ${qty(vAns, 'm/s')}$`],
    traps: [{ value: t / d, hint: 'Divide the distance by the time.' }],
  };
}

function echo(): Question {
  if (Math.random() < 0.5) {
    const t = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.2]);
    const d = (340 * t) / 2;
    return {
      text: `A student claps in front of a tall wall. She hears the echo ${t} s later. The speed of sound in air is 340 m/s.`,
      given: [`time for the echo $= ${qty(t, 's')}$`, `$v = ${qty(340, 'm/s')}$`],
      find: 'the distance from the student to the wall',
      answer: d,
      unit: 'm',
      unitOptions: ['m', 'm/s', 's', 'Hz'],
      solution: [
        `In ${t} s the sound goes to the wall <strong>and back</strong>: distance travelled $= 340 \\times ${t} = ${qty(340 * t, 'm')}$`,
        `distance to the wall $= \\dfrac{${fmt(340 * t)}}{2} = ${qty(d, 'm')}$`,
      ],
      traps: [{ value: 340 * t, hint: 'The sound goes to the wall and back. Divide by 2.' }],
    };
  }
  const d = pick([34, 51, 68, 85, 102, 170]);
  const t = (2 * d) / 340;
  return {
    text: `A student stands ${d} m from a cliff and shouts. The speed of sound in air is 340 m/s.`,
    given: [`distance to the cliff $= ${qty(d, 'm')}$`, `$v = ${qty(340, 'm/s')}$`],
    find: 'the time until she hears the echo',
    answer: t,
    unit: 's',
    unitOptions: ['s', 'm', 'm/s', 'Hz'],
    solution: [`The sound travels to the cliff and back: $2 \\times ${d} = ${qty(2 * d, 'm')}$`, `time $= \\dfrac{${2 * d}}{340} = ${qty(t, 's')}$`],
    traps: [{ value: d / 340, hint: 'The sound must travel to the cliff and back: use $2d$.' }],
  };
}

function ultrasound(): Question {
  const kind = pick(['sonar', 'medical', 'crack']);
  if (kind === 'sonar') {
    const t = pick([0.08, 0.1, 0.2, 0.4, 0.6, 1.0]);
    const d = (1500 * t) / 2;
    return {
      text: `A ship sends a pulse of ultrasound down to the sea bed. The echo comes back after ${t} s. Ultrasound travels at 1500 m/s in sea water.`,
      given: [`$t = ${qty(t, 's')}$`, `$v = ${qty(1500, 'm/s')}$`],
      find: 'the depth of the sea',
      answer: d,
      unit: 'm',
      unitOptions: ['m', 'm/s', 's', 'Hz'],
      solution: [`distance travelled $= v t = 1500 \\times ${t} = ${qty(1500 * t, 'm')}$`, `depth $= \\dfrac{${fmt(1500 * t)}}{2} = ${qty(d, 'm')}$`],
      traps: [{ value: 1500 * t, hint: 'The pulse goes down and back up. Divide by 2.' }],
    };
  }
  if (kind === 'medical') {
    const tus = pick([26, 39, 52, 65, 78, 104]);
    const d = (1540 * tus * 1e-6) / 2;
    return {
      text: `In a medical scan, a pulse of ultrasound reflects from an organ. The echo arrives ${tus} µs after the pulse is sent. Ultrasound travels at 1540 m/s in soft tissue.`,
      given: [`$t = ${tus}\\,\\mu\\text{s} = ${sci(tus * 1e-6, 2)}\\,\\text{s}$`, `$v = ${qty(1540, 'm/s')}$`],
      find: 'the depth of the organ below the skin, in m',
      answer: d,
      unit: 'm',
      unitOptions: ['m', 'm/s', 's', 'Hz'],
      solution: [
        '1 µs = $10^{-6}$ s',
        `distance travelled $= 1540 \\times ${sci(tus * 1e-6, 2)} = ${qty(1540 * tus * 1e-6, 'm')}$`,
        `depth $= \\dfrac{${fmt(1540 * tus * 1e-6)}}{2} = ${qty(d, 'm')}$ (about ${fmt(d * 100)} cm)`,
      ],
      traps: [
        { value: 1540 * tus * 1e-6, hint: 'The pulse goes to the organ and back. Divide by 2.' },
        { value: (1540 * tus) / 2, hint: 'Change µs to s: 1 µs = $10^{-6}$ s.' },
      ],
    };
  }
  const tus = pick([8, 12, 16, 20, 24]);
  const d = (5000 * tus * 1e-6) / 2;
  return {
    text: `Ultrasound is used to look for a crack inside a steel beam. An echo from the crack arrives ${tus} µs after the pulse. Ultrasound travels at 5000 m/s in this steel.`,
    given: [`$t = ${tus}\\,\\mu\\text{s} = ${sci(tus * 1e-6, 2)}\\,\\text{s}$`, `$v = ${qty(5000, 'm/s')}$`],
    find: 'the depth of the crack, in m',
    answer: d,
    unit: 'm',
    unitOptions: ['m', 'm/s', 's', 'Hz'],
    solution: [
      `distance travelled $= 5000 \\times ${sci(tus * 1e-6, 2)} = ${qty(5000 * tus * 1e-6, 'm')}$`,
      `depth $= \\dfrac{${fmt(5000 * tus * 1e-6)}}{2} = ${qty(d, 'm')}$`,
    ],
    traps: [
      { value: 5000 * tus * 1e-6, hint: 'The pulse goes to the crack and back. Divide by 2.' },
      { value: (5000 * tus) / 2, hint: 'Change µs to s: 1 µs = $10^{-6}$ s.' },
    ],
  };
}

export const soundTopic: Topic = {
  id: 'sound-echo',
  title: 'Speed of sound and echoes',
  levels: [
    { name: 'Level 1', description: 'Measure the speed of sound' },
    { name: 'Level 2', description: 'Echoes' },
    { name: 'Level 3', description: 'Ultrasound: sonar, scans, cracks' },
  ],
  generate: (level) => (level === 1 ? speedOfSound() : level === 2 ? echo() : ultrasound()),
};
