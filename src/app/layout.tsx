import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiKal.ai — Control Tower",
  description:
    "Real-time visibility, intelligent workflows, and actionable insights for chemical supply chains.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="m-0 min-h-dvh bg-[#0a0f1e] antialiased">{children}</body>
    </html>
  );
}
