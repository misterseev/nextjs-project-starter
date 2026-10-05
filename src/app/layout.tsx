import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/shared/config/site";
import { rootMetadata } from "@/shared/seo/metadata";

import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.language}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          className="fixed top-4 left-4 z-50 -translate-y-[200%] bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0"
          href="#main-content"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
