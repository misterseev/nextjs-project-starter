export default function Loading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <p role="status" aria-live="polite">
        Loading page…
      </p>
    </main>
  );
}
