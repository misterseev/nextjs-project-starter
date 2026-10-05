"use client";
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  // This document must work even when the root layout and its styles fail.
  return (
    <html lang="en">
      <body>
        <title>Unable to load this page</title>
        <meta name="robots" content="noindex, nofollow" />
        <main
          id="main-content"
          style={{
            maxWidth: "40rem",
            margin: "4rem auto",
            padding: "1.5rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1>Something went wrong</h1>
          <p>We could not load this page. Please try again.</p>
          <button type="button" onClick={retry}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
