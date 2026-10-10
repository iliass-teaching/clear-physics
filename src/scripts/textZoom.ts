// Simulations are drawn in SVG and shrink with the screen, so on a phone their labels
// become very small. This sets --tz on the element around each simulation drawing:
// the text sizes in the CSS are multiplied by it (for example calc(12px * var(--tz, 1))).
// Static figures are not changed: they have an "Enlarge" button instead (scripts/enlarge.ts).

const STATIC = 'figure > svg, [data-practice] .figure > svg, .quiz .q svg, .ws-out svg, .katex svg';
const TARGET_PX = 10; // a 12px label should be at least this size on screen
const MAX_ZOOM = 2;

let seen = new WeakSet<SVGSVGElement>();

function update(force = false): void {
  const all = [...document.querySelectorAll<SVGSVGElement>('main svg[viewBox]')];
  // Animations change the drawing many times a second: measure again only for new drawings.
  if (!force && all.every((svg) => seen.has(svg))) return;
  const zoom = new Map<HTMLElement, number>();
  for (const svg of all) {
    if (svg.matches(STATIC) || !svg.querySelector('text')) {
      seen.add(svg);
      continue;
    }
    const width = svg.getBoundingClientRect().width;
    const vb = svg.viewBox.baseVal;
    if (!width || !vb || !vb.width) continue; // hidden for now: measure it later
    seen.add(svg);
    const z = Math.min(MAX_ZOOM, Math.max(1, TARGET_PX / (12 * (width / vb.width))));
    // Set it on the parent: some simulations draw a new <svg> each time something changes.
    const host = svg.parentElement!;
    zoom.set(host, Math.max(zoom.get(host) ?? 1, z));
  }
  for (const [host, z] of zoom) {
    const value = z > 1.01 ? z.toFixed(2) : '';
    if (host.style.getPropertyValue('--tz') !== value) {
      if (value) host.style.setProperty('--tz', value);
      else host.style.removeProperty('--tz');
    }
  }
}

let pending = 0;
function schedule(force = false): void {
  if (force) seen = new WeakSet();
  if (pending) return;
  pending = window.setTimeout(() => {
    pending = 0;
    update();
  }, 50);
}

update(true);
window.addEventListener('resize', () => schedule(true));
new MutationObserver(() => schedule()).observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
