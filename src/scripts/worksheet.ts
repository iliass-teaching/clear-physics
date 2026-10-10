// Printable worksheets: the teacher chooses topics and levels; each student gets
// a version with different numbers. The same code always gives the same sheets,
// so the teacher can print the answers later.
import { topics } from './practice/topics';
import { generateClear } from './practice/engine';
import { numTex } from './practice/random';
import type { Question } from './practice/types';
import { renderMath, unitTex } from '../lib/math';

const MAX_QUESTIONS = 40;
const STORE = 'cp-worksheet';

interface Item {
  topicId: string;
  level: number;
}

interface Settings {
  title: string;
  perLevel: number;
  versions: number;
  mix: boolean;
  working: boolean;
  answers: 'answers' | 'solutions' | 'none';
  code: number;
  picks: string[]; // "topicId:level"
}

// Small seeded random generator (mulberry32).
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Run fn with Math.random replaced by a seeded generator, so a code gives the same questions.
function withSeed<T>(seed: number, fn: () => T): T {
  const original = Math.random;
  Math.random = seeded(seed);
  try {
    return fn();
  } finally {
    Math.random = original;
  }
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const h = (tag: string, className = '', html = ''): HTMLElement => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
  return node;
};

const esc = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function answerTex(q: Question): string {
  const u = unitTex(q.unit);
  return `$${numTex(q.answer)}${u ? `\\,${u}` : ''}$`;
}

// One version of the worksheet: the questions, in course order or mixed.
function makeVersion(items: Item[], s: Settings, version: number): { item: Item; q: Question }[] {
  return withSeed(s.code * 1000 + version, () => {
    const list: Item[] = [];
    for (const it of items) for (let k = 0; k < s.perLevel; k++) list.push(it);
    const ordered = s.mix ? shuffle(list) : list;
    return ordered.map((item) => ({ item, q: generateClear(topics[item.topicId], item.level) }));
  });
}

function questionEl(q: Question, working: boolean): HTMLElement {
  const li = h('li', 'ws-q');
  li.append(h('p', 'ws-text', renderMath(q.text)));
  if (q.figure) li.append(h('div', 'ws-figure', q.figure));
  const data = h('div', 'ws-data');
  data.append(h('strong', '', 'Given'));
  const ul = h('ul');
  for (const g of q.given) ul.append(h('li', '', renderMath(g)));
  data.append(ul, h('strong', '', 'Find'), h('p', '', renderMath(q.find)));
  li.append(data);
  if (working) li.append(h('div', 'ws-working', '<span>Working</span>'));
  li.append(h('p', 'ws-answer', `Answer: <span class="ws-line"></span> Unit: <span class="ws-line short"></span>`));
  return li;
}

function render(out: HTMLElement, items: Item[], s: Settings): void {
  out.replaceChildren();
  const versions = Array.from({ length: s.versions }, (_, i) => makeVersion(items, s, i + 1));
  const title = esc(s.title.trim() || 'Physics worksheet');

  versions.forEach((qs, i) => {
    const sheet = h('section', 'ws-sheet');
    sheet.append(
      h('header', 'ws-head', `
        <h2>${title}</h2>
        <p class="ws-ver">Version ${i + 1} · code ${s.code}-${i + 1}</p>
        <p class="ws-who"><span>Name: <span class="ws-line"></span></span><span>Class: <span class="ws-line short"></span></span><span>Date: <span class="ws-line short"></span></span></p>
        <p class="ws-rules">Show your working. Give each answer with its unit.</p>`),
    );
    const ol = h('ol', 'ws-list');
    for (const { q } of qs) ol.append(questionEl(q, s.working));
    sheet.append(ol);
    out.append(sheet);
  });

  if (s.answers === 'none') return;
  const key = h('section', s.answers === 'answers' ? 'ws-key compact' : 'ws-key');
  key.append(h('h2', '', `${title}: answers`));
  versions.forEach((qs, i) => {
    const block = h('div', 'ws-key-version');
    block.append(h('h3', '', `Version ${i + 1} · code ${s.code}-${i + 1}`));
    const ol = h('ol');
    for (const { item, q } of qs) {
      const t = topics[item.topicId];
      const li = h('li', '', `${renderMath(answerTex(q))} <span class="ws-topic">${esc(t.title)}, ${esc(t.levels[item.level - 1].name)}</span>`);
      if (s.answers === 'solutions') {
        const sol = h('ol', 'ws-solution');
        for (const line of q.solution) sol.append(h('li', '', renderMath(line)));
        li.append(sol);
      }
      ol.append(li);
    }
    block.append(ol);
    key.append(block);
  });
  out.append(key);
}

export function mountWorksheet(form: HTMLFormElement, out: HTMLElement): void {
  const levelBoxes = [...form.querySelectorAll<HTMLInputElement>('input[data-level]')];
  const count = form.querySelector<HTMLElement>('[data-count]')!;
  const printBtn = document.querySelector<HTMLButtonElement>('[data-print]')!;
  const field = <T extends HTMLElement>(name: string) => form.querySelector<T>(`[name="${name}"]`)!;
  const titleIn = field<HTMLInputElement>('title');
  const perLevelIn = field<HTMLSelectElement>('perLevel');
  const versionsIn = field<HTMLInputElement>('versions');
  const mixIn = field<HTMLInputElement>('mix');
  const workingIn = field<HTMLInputElement>('working');
  const answersIn = field<HTMLSelectElement>('answers');
  const codeIn = field<HTMLInputElement>('code');

  const newCode = () => String(1000 + Math.floor(Math.random() * 9000));

  function read(): Settings {
    return {
      title: titleIn.value,
      perLevel: Number(perLevelIn.value),
      versions: Math.min(40, Math.max(1, Math.round(Number(versionsIn.value) || 1))),
      mix: mixIn.checked,
      working: workingIn.checked,
      answers: answersIn.value as Settings['answers'],
      code: Math.max(0, Math.round(Number(codeIn.value) || 0)),
      picks: levelBoxes.filter((b) => b.checked).map((b) => `${b.dataset.topic}:${b.dataset.level}`),
    };
  }

  function items(s: Settings): Item[] {
    return s.picks.map((p) => {
      const [topicId, level] = p.split(':');
      return { topicId, level: Number(level) };
    });
  }

  function save(s: Settings): void {
    try {
      localStorage.setItem(STORE, JSON.stringify(s));
    } catch {
      // Storage can be blocked: the page still works without it.
    }
  }

  // The settings are also kept in the address of the page, so a worksheet can be
  // bookmarked or sent to a colleague: ?t=speed:1,density:2&n=1&v=30&c=4821&a=answers&m=1&w=1&title=...
  function toQuery(s: Settings): string {
    const q = new URLSearchParams({
      t: s.picks.join(','), n: String(s.perLevel), v: String(s.versions), c: String(s.code),
      a: s.answers, m: s.mix ? '1' : '0', w: s.working ? '1' : '0', title: s.title,
    });
    return `?${q.toString().replace(/%2C/g, ',').replace(/%3A/g, ':')}`;
  }

  function fromQuery(): Partial<Settings> | null {
    const q = new URLSearchParams(location.search);
    if (!q.has('t')) return null;
    const num = (k: string) => (q.has(k) ? Number(q.get(k)) : undefined);
    const flag = (k: string) => (q.has(k) ? q.get(k) === '1' : undefined);
    const a = q.get('a');
    return {
      picks: (q.get('t') ?? '').split(',').filter(Boolean),
      perLevel: num('n'), versions: num('v'), code: num('c'),
      answers: a === 'solutions' || a === 'none' || a === 'answers' ? a : undefined,
      mix: flag('m'), working: flag('w'), title: q.get('title') ?? undefined,
    };
  }

  function restore(): void {
    let s: Partial<Settings> | null = fromQuery();
    if (!s) {
      try {
        s = JSON.parse(localStorage.getItem(STORE) ?? 'null');
      } catch {
        s = null;
      }
    }
    // Keep the last code, so the teacher can print the same answers again later.
    codeIn.value = s?.code !== undefined ? String(s.code) : newCode();
    if (!s) return;
    if (s.title !== undefined) titleIn.value = s.title;
    if (s.perLevel && [1, 2, 3].includes(s.perLevel)) perLevelIn.value = String(s.perLevel);
    if (s.versions) versionsIn.value = String(s.versions);
    if (s.mix !== undefined) mixIn.checked = s.mix;
    if (s.working !== undefined) workingIn.checked = s.working;
    if (s.answers) answersIn.value = s.answers;
    const picks = new Set(s.picks ?? []);
    for (const b of levelBoxes) b.checked = picks.has(`${b.dataset.topic}:${b.dataset.level}`);
  }

  function update(): void {
    const s = read();
    const n = s.picks.length * s.perLevel;
    const tooMany = n > MAX_QUESTIONS;
    count.textContent =
      n === 0
        ? 'Choose at least one level of one topic.'
        : tooMany
          ? `${n} questions per student: the maximum is ${MAX_QUESTIONS}. Choose fewer levels.`
          : `${n} question${n === 1 ? '' : 's'} per student, ${s.versions} version${s.versions === 1 ? '' : 's'}.`;
    count.classList.toggle('warn', n === 0 || tooMany);
    printBtn.disabled = n === 0 || tooMany;
    save(s);
    history.replaceState(null, '', n === 0 ? location.pathname : toQuery(s));
    if (n === 0 || tooMany) {
      out.replaceChildren();
      return;
    }
    render(out, items(s), s);
  }

  form.addEventListener('change', update);
  // Typing: wait a moment, so the sheets are not made again for every key.
  let timer = 0;
  form.addEventListener('input', (e) => {
    if (!(e.target as HTMLElement).matches('input[type="text"], input[type="number"]')) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(update, 400);
  });
  form.addEventListener('submit', (e) => e.preventDefault());

  // Unit buttons: choose every level of every topic in the unit, or clear them.
  form.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'new-code') codeIn.value = newCode();
    else {
      const scope = act === 'clear-all' ? form : b.closest('[data-unit]')!;
      const on = act === 'unit-all';
      for (const box of scope.querySelectorAll<HTMLInputElement>('input[data-level]')) box.checked = on;
    }
    update();
  });

  printBtn.addEventListener('click', () => window.print());

  restore();
  update();
}
