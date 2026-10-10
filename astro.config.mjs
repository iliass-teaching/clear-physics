import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Published on GitHub Pages at https://iliass-teaching.github.io/clear-physics/
export default defineConfig({
  site: 'https://iliass-teaching.github.io',
  base: '/clear-physics',
  integrations: [mdx()],
  // LaTeX in lessons: $inline$ and $$display$$, rendered with KaTeX at build time.
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
