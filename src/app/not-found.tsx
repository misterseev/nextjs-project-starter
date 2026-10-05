import Link from "next/link";

import { Button } from "@/ui/primitives/button";
export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-xl space-y-5 px-6 py-16"
    >
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you requested does not exist.
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
