import { expect, test } from "@playwright/test";

test("a student receives an answer grounded in approved course material", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Ask the course bot" })).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Morgan");
  await page
    .getByLabel("Ask a question about course materials")
    .fill("What's the difference between automation and augmentation?");
  await page.getByRole("button", { name: "Ask the bot" }).click();

  await expect(page.getByRole("region", { name: "Answer" })).toHaveText(
    "Automation handles repeatable tasks with little human input. Augmentation uses AI to support human judgment while keeping the person responsible for the final decision.",
  );
});