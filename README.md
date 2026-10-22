# Office Hours Bot (70-445 HW3, Starter Spec B)

A demo course chatbot: a student types a name and a question and gets an answer from three sample course notes, with the source document and section shown under the answer (Story 2).

## Non-goals for HW3

- **Real payments.** This app takes no payments. Anywhere a spec asks to charge a card, it would use a "Simulated payment" button.
- **Real authentication.** There is no sign-in provider. The student types a name into a text box, and the name stays in the browser.
- **Persistent storage.** There is no database. Anything the server holds is kept in memory and **resets on every deploy**.
- **Real course materials and AI.** Answers come from three hand-written sample notes, not the actual syllabus or slides, and no AI model is called.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Security spec audit

Scope: the current local demo only. This is not a production security review; absent features are not treated as production controls.

| Requirement | Assessment | Why |
|---|---|---|
| SEC-001 | Not at all | The demo accepts a typed name only; it has no university SSO or password/session authentication. |
| SEC-002 | Not at all | There is no SSO sign-in, email lookup, roster, role assignment, or account creation. |
| SEC-003 | Not at all | The app does not create sessions or configure session cookies or expiry limits. |
| SEC-004 | Not at all | There are no accounts, roster revocation checks, or existing sessions to revoke. |
| SEC-005 | Not at all | The question API has no server-side role checks or denied-access audit logging. |
| SEC-006 | Not at all | No chats or practice sets are stored, and the question API has no identity or ownership check. |
| SEC-007 | Partly | No staff screen or chat export/API exists, but the app has no role or authorization system. |
| SEC-008 | Not at all | There is no database or operator access control and audit process. |
| SEC-009 | Partly | The name stays in browser state and is not sent to the server, but there is no account model or enforced user-record policy. |
| SEC-010 | Not at all | The app has no chat history, deletion workflow, database, or backup-retention controls. |
| SEC-011 | Not at all | There are no semester-retention jobs, account deletion, or professor notifications. |
| SEC-012 | Fully for this demo | No AI vendor is called, and neither the typed name nor question is sent to an external AI provider. |
| SEC-013 | Not at all | Local traffic uses HTTP, and there is no encrypted database, file store, or backup. |
| SEC-014 | Not at all | The app has no upload feature or PDF scanning and review workflow. |
| SEC-015 | Partly | There is no AI model or upload path to follow injected instructions, but there is no injection evaluation set or 95% result. |
| SEC-016 | Partly | The local matcher has no tools or external actions, but the API is public and does not verify the requesting student. |
| SEC-017 | Fully for current answers | Answers are rendered as React text; the app does not interpret answer HTML, scripts, images, or links. |
| SEC-018 | Not at all | Weekly summaries and their anonymization rules are not implemented. |
| SEC-019 | Not at all | Answer reporting and anonymous report storage are not implemented. |
| SEC-020 | Partly | No private graded items or system instructions are loaded, but there is no explicit refusal logic or injection evaluation. |
| SEC-021 | Partly | There is no chat index, stored conversation, or AI request; the route receives only the current question, but it has no student identity or isolation controls. |
| SEC-022 | Partly | The browser limits the text box to 2,000 characters, but the API does not enforce that limit and has no per-student rate limits. |
| SEC-023 | Not at all | There are no AI calls, spending tracking, budget cap, or provider-side limit. |
| SEC-024 | Not at all | Staff uploads and per-staff upload limits are not implemented. |
| SEC-025 | Not at all | There are no staff actions, audit log, or one-year log-retention controls. |
| SEC-026 | Partly | App code does not explicitly log questions or answers, but production diagnostic logging has not been configured or verified. |
| SEC-027 | Partly | The demo has no API keys or credentials, but it does not integrate a secrets manager. |
| SEC-028 | Partly | No PDFs are uploaded or stored, but private file storage controls are not implemented. |
| SEC-029 | Not at all | Incident detection, professor notification, and university incident procedures are not implemented. |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
