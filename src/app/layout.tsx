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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
