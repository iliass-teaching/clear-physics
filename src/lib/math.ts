// Render LaTeX inside a string: $$display$$ and $inline$, with KaTeX.
// Used for strings that do not go through Markdown (component props, practice questions).
import katex from 'katex';

export function renderMath(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) =>
      katex.renderToString(tex, { displayMode: true, throwOnError: false }),
    )
    .replace(/\$([^$]+?)\$/g, (_, tex: string) =>
      katex.renderToString(tex, { displayMode: false, throwOnError: false }),
    );
}

// A quantity with its unit, e.g. q(5, 'm/s') -> "5\,\text{m/s}".
// Units with powers: 'm/s²' -> \text{m/s}^2, 'cm³' -> \text{cm}^3.
export function unitTex(unit: string): string {
  if (unit === '(no unit)') return ''; // a ratio, for example a refractive index
  const m = unit.match(/^(.*?)([²³])$/);
  if (m) return `\\text{${m[1]}}^${m[2] === '²' ? 2 : 3}`;
  if (unit === '°') return '^\\circ';
  if (unit === '°C') return '^\\circ\\text{C}';
  if (unit === 'Ω') return '\\Omega';
  if (unit === 'kΩ') return '\\text{k}\\Omega';
  if (unit === 'J/(kg °C)') return '\\text{J/(kg}\\,^\\circ\\text{C)}';
  if (unit === 's⁻¹') return '\\text{s}^{-1}';
  if (unit === '%') return '\\%'; // % starts a comment in LaTeX
  return `\\text{${unit}}`;
}
