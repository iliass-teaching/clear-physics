// The practice topics of the course, grouped by unit, in course order.
// A topic belongs to the unit of the first lesson that uses it (<Practice topic="..." />).
import { getCollection } from 'astro:content';
import { units, type Unit } from '../data/units';
import { topics } from '../scripts/practice/topics';
import type { Topic } from '../scripts/practice/types';
import { practiceLevel } from '../data/practice';

export interface TopicUse {
  unit: number;
  lesson: number;
  title: string;
}

export interface TopicItem {
  id: string;
  use: TopicUse;
  topic: Topic;
  level: 'core' | 'extended' | 'mixed';
}

export interface TopicGroup {
  unit: Unit;
  items: TopicItem[];
}

export const tagText = { core: 'Core', extended: 'Extended', mixed: 'Core + Extended' } as const;

export async function practiceGroups(): Promise<TopicGroup[]> {
  const lessons = (await getCollection('lessons')).sort((a, b) => a.data.unit - b.data.unit || a.data.lesson - b.data.lesson);
  const firstUse = new Map<string, TopicUse>();
  for (const l of lessons) {
    for (const m of (l.body ?? '').matchAll(/<Practice topic="([^"]+)"/g)) {
      if (!firstUse.has(m[1])) firstUse.set(m[1], { unit: l.data.unit, lesson: l.data.lesson, title: l.data.title });
    }
  }
  return units
    .map((u) => ({
      unit: u,
      items: [...firstUse.entries()]
        .filter(([id, use]) => use.unit === u.number && topics[id])
        .sort((a, b) => a[1].lesson - b[1].lesson)
        .map(([id, use]) => ({ id, use, topic: topics[id], level: practiceLevel[id] ?? 'core' })),
    }))
    .filter((g) => g.items.length > 0);
}
