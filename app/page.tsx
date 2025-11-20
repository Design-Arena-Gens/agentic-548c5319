"use client";

import React, { useMemo, useState } from "react";
import { MarketingInput, runMarketingAgent } from "@/lib/agent";
import { DownloadZipButton } from "@/components/DownloadZipButton";
import { OutputViewer } from "@/components/OutputViewer";

const defaultInput: MarketingInput = {
  businessName: "Acme Widgets",
  product: "AI-powered widget optimizer",
  audience: "SaaS founders and growth marketers",
  goals: ["increase signups", "boost brand awareness", "drive demo requests"],
  tone: "friendly, expert, concise",
  platforms: ["Twitter/X", "LinkedIn", "Instagram"],
  region: "US",
  website: "https://example.com",
  uniqueValue: "automates tedious optimization to save 10+ hrs/week",
};

export default function Page() {
  const [form, setForm] = useState<MarketingInput>(defaultInput);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof runMarketingAgent> | null>(null);

  const isValid = useMemo(() => {
    return form.businessName.trim().length > 1 && form.product.trim().length > 3;
  }, [form.businessName, form.product]);

  const onGenerate = () => {
    setLoading(true);
    // Simulate async for UX; generation is synchronous
    setTimeout(() => {
      const output = runMarketingAgent(form);
      setResults(output);
      setLoading(false);
    }, 50);
  };

  return (
    <div className="page">
      <section className="panel">
        <h2>Business Profile</h2>
        <div className="grid two">
          <label className="field">
            <span>Business name</span>
            <input
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              placeholder="Your company"
            />
          </label>
          <label className="field">
            <span>Website</span>
            <input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://..."
            />
          </label>
        </div>
        <label className="field">
          <span>Product or service</span>
          <input
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            placeholder="What do you sell?"
          />
        </label>
        <label className="field">
          <span>Unique value proposition</span>
          <input
            value={form.uniqueValue}
            onChange={(e) => setForm({ ...form, uniqueValue: e.target.value })}
            placeholder="Why choose you?"
          />
        </label>
        <div className="grid two">
          <label className="field">
            <span>Target audience</span>
            <input
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              placeholder="Who are you targeting?"
            />
          </label>
          <label className="field">
            <span>Region</span>
            <input
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              placeholder="US, EU, APAC..."
            />
          </label>
        </div>
        <div className="grid two">
          <label className="field">
            <span>Tone of voice</span>
            <input
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              placeholder="friendly, expert, playful..."
            />
          </label>
          <label className="field">
            <span>Platforms (comma-separated)</span>
            <input
              value={form.platforms.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  platforms: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="LinkedIn, Twitter/X, Instagram"
            />
          </label>
        </div>
        <label className="field">
          <span>Goals (comma-separated)</span>
          <input
            value={form.goals.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                goals: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            placeholder="increase signups, brand awareness, demo requests"
          />
        </label>
        <div className="actions">
          <button className="primary" disabled={!isValid || loading} onClick={onGenerate}>
            {loading ? "Generating..." : "Generate All Marketing Assets"}
          </button>
          {results && <DownloadZipButton results={results} />}
        </div>
      </section>
      <OutputViewer results={results} />
    </div>
  );
}

