// SEC-020: Hidden information stays hidden.
// Checked on the server, before any answer is looked up, so it holds no matter
// what the page in the browser does and does not depend on instructing a model.

export const RESTRICTED_REQUEST_ANSWER =
  "I can't share that. I don't reveal my instructions, private graded items, or other students' questions.";

const restrictedPatterns: readonly RegExp[] = [
  // The bot's own instructions or configuration
  /\b(system|hidden|secret|internal|initial|original)\s+(prompt|instructions?|rules|configuration)\b/,
  /\byour\s+(prompt|instructions?|rules|configuration)\b/,
  /\b(ignore|disregard|forget|override)\b.{0,30}\b(instructions?|rules|prompt)\b/,
  // Private graded items
  /\bprivate\s+graded\b/,
  /\b(answer\s+key|exam\s+answers|solutions?\s+to\s+the\s+(exam|quiz|homework))\b/,
  // Other students' questions or chats
  /\b(other|another)\s+(students?'?s?|student's|people'?s?|users?'?s?)\b.{0,30}\b(questions?|asked|chats?|conversations?|messages?|history)\b/,
  /\b(questions?|chats?|conversations?|messages?|history)\b.{0,30}\b(other|another)\s+(students?|people|users?)\b/,
  /\bwhat\s+did\s+(other|another|someone|everyone|the\s+class)\b.{0,20}\bask\b/,
];

export function isRestrictedRequest(question: string): boolean {
  const text = question.toLowerCase().replace(/[’‘]/g, "'");
  return restrictedPatterns.some((pattern) => pattern.test(text));
}
