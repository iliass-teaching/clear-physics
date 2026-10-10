// On phones, figures become small and their labels hard to read.
// Each figure gets an "Enlarge" button (shown on small screens only, see global.css):
// it opens a copy of the figure in a full-screen panel, big enough to read every label.

const FIGURES = 'main figure > svg, [data-practice] .figure > svg, .quiz .q svg';
const TARGET_PX = 12; // smallest label size in the enlarged figure, in screen pixels
const MAX_ZOOM = 2.2; // never wider than this many screens: too much scrolling

let dialog: HTMLDialogElement | null = null;

function getDialog(): HTMLDialogElement {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'enlarge-dialog';
  dialog.innerHTML = `
    <div class="enlarge-bar">
      <p class="enlarge-cap"></p>
      <button type="button" class="secondary enlarge-close">Close</button>
    </div>
    <div class="enlarge-body"></div>
    <p class="enlarge-hint">Move the figure with your finger to see all of it. You can also turn your phone.</p>`;
  dialog.querySelector('.enlarge-close')!.addEventListener('click', () => dialog!.close());
  // A tap on the dark area around the panel also closes it.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog!.close();
  });
  dialog.addEventListener('close', () => {
    dialog!.querySelector('.enlarge-body')!.replaceChildren();
  });
  document.body.append(dialog);
  return dialog;
}

// Smallest font size used in the figure, in SVG units.
function smallestFont(svg: SVGSVGElement): number {
  let min = Infinity;
  for (const t of svg.querySelectorAll('text')) {
    if (!t.textContent?.trim()) continue;
    const fs = parseFloat(getComputedStyle(t).fontSize);
    if (fs > 0) min = Math.min(min, fs);
  }
  return Number.isFinite(min) ? min : 12;
}

function open(svg: SVGSVGElement): void {
  const d = getDialog();
  const body = d.querySelector<HTMLElement>('.enlarge-body')!;
  const vb = svg.viewBox.baseVal;
  const vbWidth = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
  const copy = svg.cloneNode(true) as SVGSVGElement;
  // Wide enough for the smallest label to be TARGET_PX on screen, but not smaller than the panel
  // and not more than MAX_ZOOM panels wide.
  const panel = body.clientWidth || window.innerWidth - 32;
  const width = Math.max(panel, Math.min(panel * MAX_ZOOM, (vbWidth * TARGET_PX) / smallestFont(svg)));
  copy.style.width = `${Math.round(width)}px`;
  copy.style.maxWidth = 'none';
  copy.style.height = 'auto';
  body.replaceChildren(copy);
  const caption = svg.closest('figure')?.querySelector('figcaption')?.textContent ?? svg.getAttribute('aria-label') ?? '';
  d.querySelector('.enlarge-cap')!.textContent = caption;
  d.showModal();
  body.scrollTo(0, 0);
}

function addButtons(): void {
  for (const svg of document.querySelectorAll<SVGSVGElement>(FIGURES)) {
    if (svg.dataset.enlarge || !svg.querySelector('text')) continue;
    svg.dataset.enlarge = '1';
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'secondary enlarge-btn';
    b.textContent = 'Enlarge';
    b.setAttribute('aria-label', 'Enlarge the figure');
    b.addEventListener('click', () => open(svg));
    svg.after(b);
  }
}

addButtons();
// Practice questions and quizzes can draw new figures later.
let pending = 0;
new MutationObserver(() => {
  if (pending) return;
  pending = window.setTimeout(() => {
    pending = 0;
    addButtons();
  }, 50);
}).observe(document.querySelector('main') ?? document.body, { childList: true, subtree: true });
