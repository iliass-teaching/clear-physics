// Unit 4 practice: momentum p = mv (1.6 S1), conservation (S3), impulse and force (S2, S4).
// Sign convention: to the right is positive.
import type { Question, Topic } from './types';
import { fmt, frac, pick, qty, randInt } from './random';
import { collisionSvg } from '../../lib/momentumFigures';

const P_UNITS = ['kg m/s', 'N', 'm/s', 'kg'];
const V_UNITS = ['m/s', 'kg m/s', 'm/s²', 'N'];

// ---------- Momentum ----------

function momentumBasic(): Question {
  const thing = pick([
    { name: 'A tennis ball', m: [0.05, 0.06], v: [20, 50] },
    { name: 'A runner', m: [55, 80], v: [4, 9] },
    { name: 'A car', m: [800, 1500], v: [10, 30] },
    { name: 'A truck', m: [8000, 15000], v: [10, 25] },
  ]);
  const m = thing.m[1] < 1 ? pick([0.05, 0.057, 0.06]) : thing.m[1] > 5000 ? randInt(thing.m[0] / 1000, thing.m[1] / 1000) * 1000 : thing.m[1] > 500 ? randInt(thing.m[0] / 100, thing.m[1] / 100) * 100 : randInt(thing.m[0], thing.m[1]);
  const v = randInt(thing.v[0], thing.v[1]);
  return {
    text: `${thing.name} of mass ${fmt(m)} kg moves at ${v} m/s.`,
    given: [`$m = ${qty(m, 'kg')}$`, `$v = ${qty(v, 'm/s')}$`],
    find: 'its momentum $p$',
    answer: m * v,
    unit: 'kg m/s',
    unitOptions: P_UNITS,
    sci: m * v >= 1e5,
    solution: ['$p = m \\times v$', `$p = ${fmt(m)} \\times ${v}$`, `$p = ${qty(m * v, 'kg m/s')}$`],
    traps: [
      { value: m / v, hint: 'Multiply: $p = m \\times v$.' },
      { value: v / m, hint: 'Multiply: $p = m \\times v$.' },
    ],
  };
}

function massOrSpeed(): Question {
  const m = pick([0.5, 2, 4, 5, 20, 60, 1000]);
  const v = pick([2, 3, 4, 5, 8, 10, 15]);
  const p = m * v;
  if (Math.random() < 0.5) {
    return {
      text: `An object of mass ${m} kg has a momentum of ${fmt(p)} kg m/s.`,
      given: [`$p = ${qty(p, 'kg m/s')}$`, `$m = ${qty(m, 'kg')}$`],
      find: 'its speed $v$',
      answer: v,
      unit: 'm/s',
      unitOptions: V_UNITS,
      solution: ['$p = mv$, so $v = \\dfrac{p}{m}$', `$v = ${frac(p, m)}$`, `$v = ${qty(v, 'm/s')}$`],
      traps: [
        { value: p * m, hint: 'You multiplied. $v = \\dfrac{p}{m}$.' },
        { value: m / p, hint: 'You divided the wrong way: $v = \\dfrac{p}{m}$.' },
      ],
    };
  }
  return {
    text: `An object moving at ${v} m/s has a momentum of ${fmt(p)} kg m/s.`,
    given: [`$p = ${qty(p, 'kg m/s')}$`, `$v = ${qty(v, 'm/s')}$`],
    find: 'its mass $m$',
    answer: m,
    unit: 'kg',
    unitOptions: ['kg', 'kg m/s', 'm/s', 'N'],
    solution: ['$p = mv$, so $m = \\dfrac{p}{v}$', `$m = ${frac(p, v)}$`, `$m = ${qty(m, 'kg')}$`],
    traps: [
      { value: p * v, hint: 'You multiplied. $m = \\dfrac{p}{v}$.' },
      { value: v / p, hint: 'You divided the wrong way: $m = \\dfrac{p}{v}$.' },
    ],
  };
}

function totalMomentum(): Question {
  const m1 = randInt(1, 6);
  const m2 = randInt(1, 6);
  const v1 = randInt(2, 8);
  const v2 = randInt(1, 8);
  const p = m1 * v1 - m2 * v2;
  if (p === 0) return totalMomentum();
  return {
    text: `Trolley A (${m1} kg) moves to the right at ${v1} m/s. Trolley B (${m2} kg) moves to the left at ${v2} m/s.`,
    figure: collisionSvg([{ m: m1, v: v1, label: 'A' }, { m: m2, v: -v2, label: 'B' }]),
    given: [`A: $${qty(m1, 'kg')}$, $${qty(v1, 'm/s')}$ to the right`, `B: $${qty(m2, 'kg')}$, $${qty(v2, 'm/s')}$ to the left`, 'take "to the right" as positive'],
    find: 'the size of the total momentum',
    answer: Math.abs(p),
    unit: 'kg m/s',
    unitOptions: P_UNITS,
    solution: [
      'Momentum is a vector. To the right is $+$, to the left is $-$.',
      `$p = ${m1} \\times ${v1} + ${m2} \\times (-${v2}) = ${m1 * v1} - ${m2 * v2} = ${p}\\,\\text{kg m/s}$`,
      `The total momentum is $${qty(Math.abs(p), 'kg m/s')}$ to the ${p > 0 ? 'right' : 'left'}.`,
    ],
    traps: [{ value: m1 * v1 + m2 * v2, hint: 'The trolleys move in opposite directions. Use a minus sign for the one moving left.' }],
  };
}

export const momentumTopic: Topic = {
  id: 'momentum',
  title: 'Momentum',
  levels: [
    { name: 'Level 1', description: 'Momentum from mass and velocity' },
    { name: 'Level 2', description: 'Find the mass or the speed' },
    { name: 'Level 3', description: 'Total momentum, two directions' },
  ],
  generate: (level) => (level === 1 ? momentumBasic() : level === 2 ? massOrSpeed() : totalMomentum()),
};

// ---------- Conservation of momentum ----------

function stickTogether(): Question {
  const m1 = randInt(1, 6);
  const m2 = randInt(1, 6);
  const v1 = randInt(2, 10);
  const vf = (m1 * v1) / (m1 + m2);
  return {
    text: `Trolley A (${m1} kg) moves at ${v1} m/s. It hits trolley B (${m2} kg), which is at rest. They stick together.`,
    figure: collisionSvg([{ m: m1, v: v1, label: 'A' }, { m: m2, v: 0, label: 'B' }]),
    given: [`A: $${qty(m1, 'kg')}$ at $${qty(v1, 'm/s')}$`, `B: $${qty(m2, 'kg')}$ at rest`, 'they move together after the collision'],
    find: 'the speed of the two trolleys after the collision',
    answer: vf,
    unit: 'm/s',
    unitOptions: V_UNITS,
    solution: [
      `momentum before $= ${m1} \\times ${v1} + ${m2} \\times 0 = ${qty(m1 * v1, 'kg m/s')}$`,
      `momentum after $= (${m1} + ${m2}) \\times v = ${m1 + m2}v$`,
      `momentum is conserved: $${m1 + m2}v = ${m1 * v1}$, so $v = ${frac(m1 * v1, m1 + m2)} = ${qty(vf, 'm/s')}$`,
    ],
    traps: [
      { value: v1, hint: 'After the collision there is more mass moving, so the speed is smaller. Use momentum before = momentum after.' },
      { value: (m1 * v1) / m2, hint: 'After the collision, both trolleys move together: use the total mass $m_A + m_B$.' },
    ],
  };
}

function bothMoving(): Question {
  const m1 = randInt(2, 6);
  const m2 = randInt(1, 5);
  const v1 = randInt(3, 9);
  const towards = Math.random() < 0.5;
  // Same direction: B must be slower than A, otherwise A never catches B.
  const v2 = towards ? randInt(1, 6) : randInt(1, v1 - 1);
  const pBefore = m1 * v1 + m2 * (towards ? -v2 : v2);
  const vf = pBefore / (m1 + m2);
  if (Math.abs(vf) < 0.05) return bothMoving();
  return {
    text: towards
      ? `Trolley A (${m1} kg) moves right at ${v1} m/s. Trolley B (${m2} kg) moves left at ${v2} m/s. They collide and stick together.`
      : `Trolley A (${m1} kg) moves right at ${v1} m/s. It hits trolley B (${m2} kg), which moves right at ${v2} m/s. They stick together.`,
    figure: collisionSvg([{ m: m1, v: v1, label: 'A' }, { m: m2, v: towards ? -v2 : v2, label: 'B' }]),
    given: [
      `A: $${qty(m1, 'kg')}$, $+${qty(v1, 'm/s')}$`,
      `B: $${qty(m2, 'kg')}$, $${towards ? '-' : '+'}${qty(v2, 'm/s')}$`,
      'to the right is positive',
    ],
    find: 'the size of the velocity after the collision',
    answer: Math.abs(vf),
    unit: 'm/s',
    unitOptions: V_UNITS,
    solution: [
      `momentum before $= ${m1} \\times ${v1} + ${m2} \\times ${towards ? `(-${v2})` : v2} = ${qty(pBefore, 'kg m/s')}$`,
      `momentum after $= ${m1 + m2}v$`,
      `$v = ${frac(pBefore, m1 + m2)} = ${fmt(vf)}\\,\\text{m/s}$, so $${qty(Math.abs(vf), 'm/s')}$ to the ${vf > 0 ? 'right' : 'left'}`,
    ],
    traps: [
      { value: (m1 * v1 + m2 * (towards ? v2 : -v2)) / (m1 + m2), hint: 'Check the signs: to the right is $+$, to the left is $-$.' },
      { value: pBefore / m1, hint: 'After the collision, both trolleys move together: divide by the total mass.' },
    ],
  };
}

function recoil(): Question {
  const pair = pick([
    { a: 'A cannon', ma: [500, 1500], b: 'a cannonball', mb: [5, 20], vb: [100, 250] },
    { a: 'A skater', ma: [50, 80], b: 'a heavy ball', mb: [3, 8], vb: [3, 8] },
    { a: 'A rifle', ma: [3, 5], b: 'a bullet', mb: [0.01, 0.02], vb: [300, 600] },
  ]);
  const mA = pair.ma[1] > 100 ? randInt(pair.ma[0] / 100, pair.ma[1] / 100) * 100 : randInt(pair.ma[0], pair.ma[1]);
  const mB = pair.mb[1] < 1 ? pick([0.01, 0.015, 0.02]) : randInt(pair.mb[0], pair.mb[1]);
  const vB = pair.vb[1] > 50 ? randInt(pair.vb[0] / 10, pair.vb[1] / 10) * 10 : randInt(pair.vb[0], pair.vb[1]);
  const vA = (mB * vB) / mA;
  return {
    text: `${pair.a} (${fmt(mA)} kg) and ${pair.b} (${fmt(mB)} kg) are at rest. The ${pair.b.slice(2)} is pushed forwards at ${vB} m/s.`,
    given: [`$m_A = ${qty(mA, 'kg')}$`, `$m_B = ${qty(mB, 'kg')}$, $v_B = ${qty(vB, 'm/s')}$`, 'everything is at rest at the start'],
    find: `the recoil speed of ${pair.a.toLowerCase().replace('a ', 'the ')}`,
    answer: vA,
    unit: 'm/s',
    unitOptions: V_UNITS,
    solution: [
      'momentum before $= 0$ (everything at rest)',
      `momentum after $= ${fmt(mB)} \\times ${vB} + ${fmt(mA)} \\times v_A = 0$`,
      `$v_A = -${frac(fmt(mB * vB), mA)} = -${qty(vA, 'm/s')}$: it moves backwards at $${qty(vA, 'm/s')}$`,
    ],
    traps: [{ value: vB, hint: 'The two objects have different masses, so different speeds. Use momentum before = momentum after = 0.' }],
  };
}

export const conservationTopic: Topic = {
  id: 'conservation',
  title: 'Conservation of momentum',
  levels: [
    { name: 'Level 1', description: 'Hit a trolley at rest and stick' },
    { name: 'Level 2', description: 'Both trolleys moving' },
    { name: 'Level 3', description: 'Recoil (explosions)' },
  ],
  generate: (level) => (level === 1 ? stickTogether() : level === 2 ? bothMoving() : recoil()),
};

// ---------- Impulse and force ----------

function impulseQ(): Question {
  const F = randInt(2, 40) * 50;
  const t = pick([0.01, 0.02, 0.05, 0.1, 0.2, 0.5]);
  return {
    text: `A footballer kicks a ball with a force of ${F} N. The foot touches the ball for ${t} s.`,
    given: [`$F = ${qty(F, 'N')}$`, `$\\Delta t = ${qty(t, 's')}$`],
    find: 'the impulse on the ball',
    answer: F * t,
    unit: 'N s',
    unitOptions: ['N s', 'N', 'N/s', 'kg'],
    solution: ['$\\text{impulse} = F\\Delta t$', `$\\text{impulse} = ${F} \\times ${t}$`, `$\\text{impulse} = ${qty(F * t, 'N s')}$`],
    traps: [{ value: F / t, hint: 'Multiply: $\\text{impulse} = F \\times \\Delta t$.' }],
  };
}

function changeOfMomentum(): Question {
  const m = pick([0.05, 0.1, 0.15, 0.2, 0.5]);
  const u = randInt(4, 20);
  const v = randInt(2, 15);
  const dp = m * (u + v); // rebound: from +u to -v
  return {
    text: `A ball of mass ${m} kg hits a wall at ${u} m/s and bounces straight back at ${v} m/s.`,
    given: [`$m = ${qty(m, 'kg')}$`, `before: $+${qty(u, 'm/s')}$`, `after: $-${qty(v, 'm/s')}$ (it moves back)`],
    find: 'the size of the change in momentum (the impulse)',
    answer: dp,
    unit: 'kg m/s',
    unitOptions: ['kg m/s', 'N', 'm/s', 'kg'],
    solution: [
      '$\\Delta p = m v_{\\text{after}} - m v_{\\text{before}}$',
      `$\\Delta p = ${m} \\times (-${v}) - ${m} \\times ${u} = ${fmt(-m * v)} - ${fmt(m * u)} = ${fmt(-dp)}\\,\\text{kg m/s}$`,
      `The size of the change is $${qty(dp, 'kg m/s')}$ (away from the wall).`,
    ],
    traps: [
      { value: m * Math.abs(u - v), hint: 'The ball changes direction. The velocity after is negative: $-' + v + '\\,\\text{m/s}$.' },
      { value: m * u, hint: 'The ball does not stop: it bounces back. Include the velocity after.' },
    ],
  };
}

function forceFromDp(): Question {
  const sit = pick([
    { text: 'A car of mass {m} kg moving at {u} m/s stops in a crash in {t} s.', m: [800, 1400], u: [10, 25], t: [0.05, 0.1, 0.2] },
    { text: 'A car of mass {m} kg moving at {u} m/s stops in a crash. The crumple zone makes the stop last {t} s.', m: [800, 1400], u: [10, 25], t: [0.3, 0.5, 0.8] },
  ]);
  const m = randInt(sit.m[0] / 100, sit.m[1] / 100) * 100;
  const u = randInt(sit.u[0], sit.u[1]);
  const t = pick(sit.t);
  const dp = m * u;
  return {
    text: sit.text.replace('{m}', String(m)).replace('{u}', String(u)).replace('{t}', String(t)),
    given: [`$m = ${qty(m, 'kg')}$`, `$\\Delta v = ${qty(u, 'm/s')}$ (to rest)`, `$\\Delta t = ${qty(t, 's')}$`],
    find: 'the size of the average force on the car',
    answer: dp / t,
    unit: 'N',
    unitOptions: ['N', 'N s', 'kg m/s', 'm/s²'],
    sci: dp / t >= 1e5,
    solution: [
      `$\\Delta p = m\\Delta v = ${m} \\times ${u} = ${qty(dp, 'kg m/s')}$`,
      `$F = \\dfrac{\\Delta p}{\\Delta t} = ${frac(dp, t)}$`,
      `$F = ${qty(dp / t, 'N')}$`,
    ],
    traps: [
      { value: dp * t, hint: 'Divide by the time: $F = \\dfrac{\\Delta p}{\\Delta t}$.' },
      { value: dp, hint: 'This is the change in momentum. Divide it by the time to get the force.' },
    ],
  };
}

export const impulseTopic: Topic = {
  id: 'impulse',
  title: 'Impulse and force',
  levels: [
    { name: 'Level 1', description: 'Impulse = force × time' },
    { name: 'Level 2', description: 'Change in momentum (bouncing)' },
    { name: 'Level 3', description: 'Force from change in momentum' },
  ],
  generate: (level) => (level === 1 ? impulseQ() : level === 2 ? changeOfMomentum() : forceFromDp()),
};
