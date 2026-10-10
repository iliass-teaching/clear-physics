// A generated practice question.
export interface Question {
  text: string; // the situation, in one or two short sentences (HTML allowed)
  figure?: string; // optional SVG (graph, ruler, arrows...)
  given: string[]; // e.g. ["distance s = 300 m", "time t = 60 s"]
  find: string; // e.g. "the speed v"
  answer: number;
  unit: string; // correct unit, e.g. "m/s"
  unitOptions: string[]; // units the student can choose from
  solution: string[]; // worked solution, one line per step
  // Answers that come from a typical mistake, with a hint for each one.
  traps: { value: number; hint: string }[];
  tolerance?: number; // relative, default 2 %
  absTolerance?: number; // absolute, used instead of tolerance (e.g. half a scale division)
  sci?: boolean; // the answer is in standard form: show how to type it
}

export type Generator = (level: number) => Question;

export interface Topic {
  id: string;
  title: string;
  levels: { name: string; description: string }[];
  generate: Generator;
}
