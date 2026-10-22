import { answerCourseQuestion } from "@/lib/course-knowledge";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ answer: "Please enter a course question." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("question" in body) ||
    typeof body.question !== "string" ||
    !body.question.trim()
  ) {
    return Response.json({ answer: "Please enter a course question." }, { status: 400 });
  }

  if (body.question.length > 2000) {
    return Response.json(
      { answer: "Please shorten your question to 2,000 characters or fewer." },
      { status: 400 },
    );
  }

  return Response.json({ answer: answerCourseQuestion(body.question) });
}