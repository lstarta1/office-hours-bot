import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Office Hours Bot | AI for Business Leaders",
  description: "A course-materials Q&A demo for AI for Business Leaders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
