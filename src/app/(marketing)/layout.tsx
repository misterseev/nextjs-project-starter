import type { ReactNode } from "react";

import Link from "next/link";

import { siteConfig } from "@/shared/config/site";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-5">
          <Link href="/" className="font-semibold">
            {siteConfig.name}
          </Link>
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24"
      >
        {children}
      </main>
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        {siteConfig.name}
      </footer>
    </>
  );
}
