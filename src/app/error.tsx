"use client";
import { ErrorState } from "@/ui/patterns/error-state";
export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main id="main-content" tabIndex={-1}>
      <ErrorState retry={retry} />
    </main>
  );
}
