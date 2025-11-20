"use client";

import React, { useState } from "react";
import JSZip from "jszip";
import type { MarketingResults } from "@/lib/agent";

export function DownloadZipButton({ results }: { results: MarketingResults }) {
  const [downloading, setDownloading] = useState(false);
  const onDownload = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const files = results.files;
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content);
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${results.input.businessName.replace(/\s+/g, "-")}-marketing-assets.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <button className="primary" onClick={onDownload} disabled={downloading}>
      {downloading ? "Preparing ZIP..." : "Download All as ZIP"}
    </button>
  );
}

