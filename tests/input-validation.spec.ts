import { expect, test } from "@playwright/test";

test("a blank form does not submit a question", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ask the bot" }).click();

  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByRole("region", { name: "Answer" })).toHaveCount(0);
});

test("a whitespace-only name gets a clear validation message", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Your name").fill("   ");
  await page
    .getByLabel("Ask a question about course materials")
    .fill("What is automation?");
  await page.getByRole("button", { name: "Ask the bot" }).click();

  await expect(page.getByText("Please type your name.", { exact: true })).toBeVisible();
});

test("the API rejects malformed questions and enforces the 2,000-character cap", async ({ page }) => {
  await page.goto("/");

  for (const data of [null, { question: 42 }, { question: "   " }]) {
    const response = await page.request.post("/api/ask", { data });
    expect(response.status()).toBe(400);
  }

  const atLimit = await page.request.post("/api/ask", {
    data: { question: "x".repeat(2000) },
  });
  expect(atLimit.status()).toBe(200);

  const overLimit = await page.request.post("/api/ask", {
    data: { question: "x".repeat(2001) },
  });
  expect(overLimit.status()).toBe(400);
  await expect(overLimit.json()).resolves.toEqual({
    answer: "Please shorten your question to 2,000 characters or fewer.",
  });
});