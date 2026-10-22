import { expect, test } from "@playwright/test";

// Story 2: As a student, I want to know where an answer came from so that I
// can verify the information myself.
// EARS: WHEN the system provides an answer using course materials, THE SYSTEM
// SHALL identify the relevant source document and page or section when available.

const SOURCE_DOCUMENT = "Sample course notes (demo)";

test("an answer from the course notes shows its source document and section", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page
    .getByLabel("Ask a question about course materials")
    .fill("What's the difference between automation and augmentation?");
  await page.getByRole("button", { name: "Ask the bot" }).click();

  await expect(page.getByRole("region", { name: "Answer" })).toContainText(
    "Automation handles repeatable tasks",
  );
  await expect(page.getByRole("note", { name: "Source" })).toHaveText(
    `Source: ${SOURCE_DOCUMENT}, Section 1: Automation vs. augmentation`,
  );
});

test("the API returns the correct source document and section for every course-note answer", async ({ page }) => {
  const cases = [
    {
      question: "What's the difference between automation and augmentation?",
      section: "Section 1: Automation vs. augmentation",
    },
    {
      question: "How should a team choose an AI use case?",
      section: "Section 2: Choosing an AI use case",
    },
    {
      question: "When should a person review an AI decision?",
      section: "Section 3: Human review of AI decisions",
    },
  ];

  for (const { question, section } of cases) {
    const response = await page.request.post("/api/ask", { data: { question } });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.source).toEqual({ document: SOURCE_DOCUMENT, section });
  }
});

test("a question the notes cannot answer shows no source citation", async ({ page }) => {
  const response = await page.request.post("/api/ask", {
    data: { question: "What is the capital of France?" },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.answer).toBe(
    "I couldn't find an answer to that question in the demo course materials.",
  );
  expect(body.source).toBeNull();

  await page.goto("/");
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page
    .getByLabel("Ask a question about course materials")
    .fill("What is the capital of France?");
  await page.getByRole("button", { name: "Ask the bot" }).click();

  await expect(page.getByRole("region", { name: "Answer" })).toHaveText(
    "I couldn't find an answer to that question in the demo course materials.",
  );
  await expect(page.getByRole("note", { name: "Source" })).toHaveCount(0);
});
