// Runs every <div data-practice="topicId"> on the page.
import type { Question, Topic } from './types';
import { topics } from './topics';
import { numTex } from './random';
import { renderMath, unitTex } from '../../lib/math';

// Element whose content is a string with LaTeX ($...$).
function mathEl<K extends keyof HTMLElementTagNameMap>(tag: K, text: string, className = ''): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.innerHTML = renderMath(text);
  return node;
}

export const STREAK_GOAL = 3;

// Accepts "1.5", "1,5", "1.5e11" and standard form typed as "1.5x10^11", "1.5×10^11" or "1.5*10^11".
function parseNumber(raw: string): number | null {
  const cleaned = raw
    .trim()
    .replace(/\s/g, '')
    .replace(',', '.')
    .replace(/[−–]/g, '-')
    .replace(/[x×*]10\^?\(?(-?\d+)\)?$/i, 'e$1');
  if (cleaned === '') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function close(a: number, b: number, q: Question): boolean {
  if (q.absTolerance !== undefined) return Math.abs(a - b) <= q.absTolerance + 1e-9;
  if (b === 0) return Math.abs(a) < 1e-9;
  return Math.abs(a - b) / Math.abs(b) <= (q.tolerance ?? 0.02);
}

// Skip questions where a typical mistake gives the right answer by chance
// (for example, the mean of two speeds equal to the average speed):
// they cannot show the student their mistake.
export function generateClear(topic: Topic, level: number): Question {
  let q = topic.generate(level);
  for (let i = 0; i < 30 && q.traps.some((t) => close(t.value, q.answer, q)); i++) {
    q = topic.generate(level);
  }
  return q;
}

function loadStreaks(id: string): Record<number, number> {
  try {
    return JSON.parse(localStorage.getItem(`cp-practice-${id}`) ?? '{}');
  } catch {
    return {};
  }
}

// Best streak for each level (it does not go down after a mistake). Used for progress marks.
export function loadBest(id: string): Record<number, number> {
  try {
    return JSON.parse(localStorage.getItem(`cp-practice-best-${id}`) ?? '{}');
  } catch {
    return {};
  }
}

function saveStreaks(id: string, streaks: Record<number, number>): void {
  try {
    localStorage.setItem(`cp-practice-${id}`, JSON.stringify(streaks));
    const best = loadBest(id);
    for (const [lv, n] of Object.entries(streaks)) best[+lv] = Math.max(best[+lv] ?? 0, n);
    localStorage.setItem(`cp-practice-best-${id}`, JSON.stringify(best));
  } catch {
    // Storage can be blocked; the practice still works without it.
  }
  window.dispatchEvent(new CustomEvent('cp-practice-progress', { detail: id }));
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function mount(root: HTMLElement, topic: Topic): void {
  let level = Number(root.dataset.level ?? 1);
  let question: Question;
  let wrongTries = 0;
  let solved = false;
  const streaks = loadStreaks(topic.id);

  const levelBar = el('div', { className: 'levels', role: 'tablist' });
  const streakInfo = el('p', { className: 'streak small muted' });
  const body = el('div', { className: 'body' });
  root.replaceChildren(levelBar, body, streakInfo);

  function renderLevels(): void {
    levelBar.replaceChildren(
      ...topic.levels.map((lv, i) => {
        const n = i + 1;
        const b = el('button', {
          type: 'button',
          className: n === level ? '' : 'secondary',
          title: lv.description,
        }, [lv.name]);
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', String(n === level));
        b.addEventListener('click', () => {
          level = n;
          renderLevels();
          next();
        });
        return b;
      }),
    );
  }

  function renderStreak(): void {
    const s = streaks[level] ?? 0;
    const desc = topic.levels[level - 1].description;
    streakInfo.textContent =
      s >= STREAK_GOAL && level < topic.levels.length
        ? `${desc}: ${s} correct in a row. Well done! Try the next level.`
        : `${desc}: ${s} correct in a row (goal: ${STREAK_GOAL}).`;
  }

  function next(): void {
    question = generateClear(topic, level);
    wrongTries = 0;
    solved = false;
    render();
    renderStreak();
  }

  function render(): void {
    const q = question;
    const text = mathEl('p', q.text, 'q-text');

    const figure = el('div', { className: 'figure' });
    if (q.figure) figure.innerHTML = q.figure;

    const given = el('ul', {}, q.given.map((g) => mathEl('li', g)));
    const data = el('div', { className: 'data' }, [
      el('strong', {}, ['Given']), given,
      el('strong', {}, ['Find']), mathEl('p', q.find),
    ]);

    const input = el('input', {
      type: 'text',
      inputMode: q.sci ? 'text' : 'decimal',
      autocomplete: 'off',
      placeholder: q.sci ? 'e.g. 1.5x10^11' : 'number',
      size: q.sci ? 14 : 8,
    });
    input.setAttribute('aria-label', 'Your answer (number)');
    const unit = el('select', {}, [
      el('option', { value: '' }, ['unit…']),
      ...q.unitOptions.map((u) => el('option', { value: u }, [u])),
    ]);
    unit.setAttribute('aria-label', 'Unit');
    const check = el('button', { type: 'button' }, ['Check']);
    const feedback = el('div', { className: 'feedback' });
    feedback.setAttribute('aria-live', 'polite');
    const solution = el('ol', { className: 'solution', hidden: true },
      q.solution.map((line) => mathEl('li', line)));
    const showSol = el('button', { type: 'button', className: 'secondary', hidden: true }, ['Show solution']);
    const nextBtn = el('button', { type: 'button', className: 'secondary' }, ['Next question']);

    showSol.addEventListener('click', () => {
      solution.hidden = false;
      showSol.hidden = true;
    });
    nextBtn.addEventListener('click', next);

    function say(kind: 'good' | 'bad' | 'info', message: string): void {
      feedback.className = `feedback ${kind}`;
      feedback.innerHTML = renderMath(message);
    }

    function onCheck(): void {
      if (solved) return;
      const value = parseNumber(input.value);
      if (value === null) {
        say('info', 'Write a number first.');
        return;
      }
      const numberOk = close(value, q.answer, q);
      const unitOk = unit.value === q.unit;

      if (numberOk && unitOk) {
        solved = true;
        if (wrongTries === 0) streaks[level] = (streaks[level] ?? 0) + 1;
        saveStreaks(topic.id, streaks);
        renderStreak();
        say('good', `Correct! $${numTex(q.answer)}\\,${unitTex(q.unit)}$`);
        solution.hidden = false;
        showSol.hidden = true;
        return;
      }

      wrongTries += 1;
      streaks[level] = 0;
      saveStreaks(topic.id, streaks);
      renderStreak();

      if (numberOk && !unitOk) {
        say('bad', unit.value === ''
          ? 'The number is right. Now choose the unit.'
          : 'The number is right, but the unit is wrong. Check the unit.');
      } else {
        const trap = q.traps.find((t) => close(value, t.value, q));
        say('bad', trap ? trap.hint : 'Not yet. Check the equation and the units, then try again.');
      }
      if (wrongTries >= 2) showSol.hidden = false;
    }

    check.addEventListener('click', onCheck);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') onCheck();
    });

    body.replaceChildren(
      text,
      ...(q.figure ? [figure] : []),
      data,
      el('div', { className: 'answer-row' }, [input, unit, check]),
      ...(q.sci ? [el('p', { className: 'small muted' }, ['Standard form: type 1.5x10^11 or 1.5e11 for 1.5 × 10¹¹.'])] : []),
      feedback,
      solution,
      el('div', { className: 'actions' }, [showSol, nextBtn]),
    );
  }

  renderLevels();
  next();
}

// Mount (or re-mount) one practice block, for the topic in root.dataset.practice.
export function mountPractice(root: HTMLElement): void {
  const topic = topics[root.dataset.practice ?? ''];
  if (topic) mount(root, topic);
}

document.querySelectorAll<HTMLElement>('[data-practice]').forEach(mountPractice);
