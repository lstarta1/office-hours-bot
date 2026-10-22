type CourseNote = {
  keywords: readonly string[];
  answer: string;
};

const courseNotes: readonly CourseNote[] = [
  {
    keywords: ["automation", "augmentation", "repeatable", "human"],
    answer:
      "Automation handles repeatable tasks with little human input. Augmentation uses AI to support human judgment while keeping the person responsible for the final decision.",
  },
  {
    keywords: ["choose", "selection", "use", "case", "value", "data"],
    answer:
      "Start with a specific business problem, then check whether the expected value, available data, and human oversight make the use case practical.",
  },
  {
    keywords: ["review", "oversight", "decision", "person", "high", "impact"],
    answer:
      "Keep a person responsible for reviewing high-impact decisions; AI should support the decision rather than make it alone.",
  },
];

export function answerCourseQuestion(question: string): string {
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
    return "I couldn't find an answer to that question in the demo course materials.";
  }

  return bestMatch.note.answer;
}