import { unitTex } from '../../lib/math';

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// "a" or "an" before a number, as it is read aloud: "an 8 Ω resistor", "an 11 kg box", "a 6 V battery".
export function an(x: number | string, capital = false): string {
  const s = String(x);
  const int = s.split(/[.\s]/)[0];
  const vowel = s.startsWith('8') || /^1[18](\d{3}){0,2}$/.test(int);
  const word = vowel ? 'an' : 'a';
  return capital ? word[0].toUpperCase() + word.slice(1) : word;
}

// Format a number the way the exam does: dot for decimals, no trailing zeros,
// 3 significant figures for long decimals.
export function fmt(x: number): string {
  if (Number.isInteger(x)) return String(x);
  const rounded = Number(x.toPrecision(3));
  return String(rounded);
}

// Standard form in LaTeX: sci(1.496e11) -> "1.50 \times 10^{11}" (sf significant figures).
export function sci(x: number, sf = 3): string {
  if (x === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(x)));
  let mant = Number((x / 10 ** exp).toPrecision(sf));
  let e = exp;
  if (Math.abs(mant) >= 10) {
    mant /= 10;
    e += 1;
  }
  return `${mant.toFixed(sf - 1)} \\times 10^{${e}}`;
}

// A number in LaTeX: standard form when it is very big or very small.
export function numTex(x: number, sf = 3): string {
  const a = Math.abs(x);
  return a !== 0 && (a >= 1e5 || a < 1e-3) ? sci(x, sf) : fmt(x);
}

// LaTeX helpers for questions and solutions (without the $ delimiters).
// qty(5, 'm/s') -> "5\,\text{m/s}"
export function qty(x: number | string, unit: string): string {
  const n = typeof x === 'number' ? numTex(x) : x;
  return unit === '°' ? `${n}^\\circ` : `${n}\\,${unitTex(unit)}`;
}

// frac(300, 60) -> "\dfrac{300}{60}"
export function frac(a: number | string, b: number | string): string {
  const s = (x: number | string) => (typeof x === 'number' ? numTex(x) : x);
  return `\\dfrac{${s(a)}}{${s(b)}}`;
}
