export const metadata = {
  title: "Marketing Agent",
  description: "Autonomous marketing content generator",
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="brand">
              <span className="logo">MA</span>
              <div className="brand-text">
                <h1>Marketing Agent</h1>
                <p>Generate campaigns, posts, emails, SEO, and more.</p>
              </div>
            </div>
            <a
              className="github"
              href="https://agentic-548c5319.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">
            <span>? {new Date().getFullYear()} Marketing Agent</span>
          </footer>
        </div>
      </body>
    </html>
  );
}

