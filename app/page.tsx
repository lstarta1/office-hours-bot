"use client";

import { useState, type FormEvent } from "react";

type CourseSource = { document: string; section: string };

const quickPrompts = [
  "What's the difference between automation and augmentation?",
  "How should a team choose an AI use case?",
  "When should a person review an AI decision?",
];

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState<CourseSource | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentQuestion = question.trim();

    if (!studentName.trim()) {
      setError("Please type your name.");
      return;
    }

    if (!currentQuestion) {
      setError("Please enter a course question.");
      return;
    }

    setError("");
    setAnswer("");
    setSource(null);
    setSubmittedQuestion(currentQuestion);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion }),
      });
      const result = (await response.json()) as {
        answer?: string;
        source?: CourseSource | null;
      };

      if (!response.ok || !result.answer) {
        throw new Error("The course bot could not answer just now.");
      }

      setAnswer(result.answer);
      setSource(result.source ?? null);
    } catch {
      setError("We couldn't reach the course bot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Office Hours Bot home">
          <span className="brand-mark">OH</span>
          <span className="brand-name">Office Hours <strong>Bot</strong></span>
        </a>
        <div className="topbar-meta">
          <span className="course-code">70-445</span>
          <span className="demo-status"><span className="status-dot" /> DEMO SPACE</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="course-sidebar">
          <div className="eyebrow">YOUR COURSE</div>
          <h2>AI for Business Leaders</h2>
          <p className="term-label">Fall 2026 <span>/</span> Section 01</p>

          <div className="knowledge-status">
            <span className="knowledge-icon" aria-hidden="true">03</span>
            <div>
              <strong>Sample course notes</strong>
              <span>Prepared for this demo</span>
            </div>
          </div>

          <div className="prompt-list">
            <div className="eyebrow">QUICK PROMPTS</div>
            {quickPrompts.map((prompt) => (
              <button
                className="prompt-button"
                key={prompt}
                onClick={() => setQuestion(prompt)}
                type="button"
              >
                <span aria-hidden="true">+</span>
                {prompt}
              </button>
            ))}
          </div>

          <div className="sidebar-footnote">DEMO CONTENT ONLY</div>
        </aside>

        <section className="question-workspace" aria-labelledby="page-title">
          <div className="workspace-heading">
            <div>
              <div className="eyebrow">STUDENT WORKSPACE</div>
              <h1 id="page-title">Ask the course bot</h1>
              <p className="intro-copy">What would you like to make clearer today?</p>
            </div>
            <div className="ready-label"><span className="status-dot" /> READY</div>
          </div>

          <form className="question-form" onSubmit={handleSubmit}>
            <div className="field-group name-field">
              <label htmlFor="student-name">Your name</label>
              <input
                autoComplete="name"
                id="student-name"
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Type your name"
                required
                value={studentName}
              />
            </div>

            <div className="field-group question-field">
              <label htmlFor="course-question">Ask a question about course materials</label>
              <textarea
                id="course-question"
                maxLength={2000}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about a concept, framework, or course topic..."
                required
                rows={4}
                value={question}
              />
            </div>

            <div className="form-actions">
              <span className="form-hint">A demo name is enough to get started.</span>
              <button className="submit-button" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Looking through the notes..." : "Ask the bot"}
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </form>

          {error && <p className="error-message" role="alert">{error}</p>}

          {submittedQuestion && (
            <div className="conversation-result" aria-live="polite">
              <div className="student-question">
                <div className="answer-label">YOUR QUESTION</div>
                <p>{submittedQuestion}</p>
              </div>
              {answer && (
                <>
                  <div className="answer-heading">
                    <span className="answer-label">COURSE NOTE MATCH</span>
                    <span className="answer-tag">ANSWER</span>
                  </div>
                  <section className="answer-card" aria-label="Answer" role="region">
                    <p>{answer}</p>
                  </section>
                  {source && (
                    <p className="answer-source" role="note" aria-label="Source">
                      Source: {source.document}, {source.section}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
