export const SOURCE_DOCUMENT = "Sample course notes (demo)";

export type CourseSource = {
  document: string;
  section: string;
};

export type CourseAnswer = {
  answer: string;
  source: CourseSource | null;
};

type CourseNote = {
  section: string;
  keywords: readonly string[];
  answer: string;
};

const courseNotes: readonly CourseNote[] = [
  {
    section: "Section 1: Automation vs. augmentation",
    keywords: ["automation", "augmentation", "repeatable", "human"],
    answer:
      "Automation handles repeatable tasks with little human input. Augmentation uses AI to support human judgment while keeping the person responsible for the final decision.",
  },
  {
    section: "Section 2: Choosing an AI use case",
    keywords: ["choose", "selection", "use", "case", "value", "data"],
    answer:
      "Start with a specific business problem, then check whether the expected value, available data, and human oversight make the use case practical.",
  },
  {
    section: "Section 3: Human review of AI decisions",
    keywords: ["review", "oversight", "decision", "person", "high", "impact"],
    answer:
      "Keep a person responsible for reviewing high-impact decisions; AI should support the decision rather than make it alone.",
  },
];

export function answerCourseQuestion(question: string): CourseAnswer {
  const questionWords = new Set(
    question.toLowerCase().match(/[a-z0-9]+/g) ?? [],
  );
  const bestMatch = courseNotes
    .map((note) => ({
      note,
      score: note.keywords.filter((keyword) => questionWords.has(keyword)).length,
    }))
    .sort((left, right) => right.score - left.score)[0];

  if (!bestMatch || bestMatch.score === 0) {
    return {
      answer: "I couldn't find an answer to that question in the demo course materials.",
      source: null,
    };
  }

  return {
    answer: bestMatch.note.answer,
    source: { document: SOURCE_DOCUMENT, section: bestMatch.note.section },
  };
}