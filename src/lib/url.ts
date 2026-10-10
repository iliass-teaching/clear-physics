// Build a link that works with the GitHub Pages base path.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function lessonUrl(unit: number, lesson: number): string {
  return url(`units/${unit}/${lesson}/`);
}

export function unitUrl(unit: number): string {
  return url(`units/${unit}/`);
}
