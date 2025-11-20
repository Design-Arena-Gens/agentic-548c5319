"use client";

import React from "react";
import type { MarketingResults } from "@/lib/agent";

export function OutputViewer({ results }: { results: MarketingResults | null }) {
  if (!results) {
    return (
      <section className="panel">
        <h2>Results</h2>
        <p className="muted">Fill the form and click ?Generate? to produce assets.</p>
      </section>
    );
  }

  const { brand, calendar, social, emails, ads, seo, landing, images, summary } = results;

  return (
    <>
      <section className="panel">
        <h2>Brand Voice</h2>
        <div className="output-columns">
          <div className="output-card">
            <h3>Statement</h3>
            <p>{brand.statement}</p>
          </div>
          <div className="output-card">
            <h3>Pillars</h3>
            <ul>
              {brand.pillars.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="muted">Tagline: {brand.tagline}</div>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Content Calendar (14 days)</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Theme</th>
              <th>Title</th>
              <th>CTA</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((d) => (
              <tr key={d.day}>
                <td>{d.day}</td>
                <td>{d.theme}</td>
                <td>{d.title}</td>
                <td>{d.cta}</td>
                <td className="mono">{d.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Social Posts (7 days each)</h2>
        <div className="output-columns">
          {social.map((s) => (
            <div className="output-card" key={s.platform}>
              <h3>{s.platform}</h3>
              {s.posts.map((p) => (
                <details key={p.day} style={{ borderTop: "1px dashed #233054", paddingTop: 8 }}>
                  <summary>Day {p.day}</summary>
                  <pre className="mono" style={{ whiteSpace: "pre-wrap" }}>
                    {p.body}
                  </pre>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Email Series</h2>
        <div className="output-columns">
          {emails.map((e, idx) => (
            <div className="output-card" key={idx}>
              <h3>{e.subject}</h3>
              <div className="muted">Preheader: {e.preheader}</div>
              <pre className="mono" style={{ whiteSpace: "pre-wrap" }}>
                {e.body}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Ad Variants</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Headline</th>
              <th>Description</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((a, i) => (
              <tr key={i}>
                <td>{a.headline}</td>
                <td>{a.description}</td>
                <td className="mono">{a.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>SEO</h2>
        <div className="output-columns">
          <div className="output-card">
            <h3>Meta</h3>
            <div><b>Title</b>: {seo.title}</div>
            <div><b>Description</b>: {seo.description}</div>
            <div><b>Keywords</b>: {seo.keywords.join(", ")}</div>
          </div>
          <div className="output-card">
            <h3>Landing Copy</h3>
            <ul>
              <li><b>Hero</b>: {landing.hero.heading} ? {landing.hero.subheading}</li>
              {landing.features.map((f, i) => (
                <li key={i}><b>{f.title}</b>: {f.text}</li>
              ))}
              <li><b>Proof</b>: {landing.socialProof}</li>
              <li><b>CTA</b>: {landing.cta.text} ? <span className="mono">{landing.cta.url}</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Creative Prompts</h2>
        <ul>
          {images.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Strategy Summary</h2>
        <pre className="mono" style={{ whiteSpace: "pre-wrap" }}>{summary}</pre>
      </section>
    </>
  );
}

