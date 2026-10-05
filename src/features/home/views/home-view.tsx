export function HomeView({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <article className="max-w-3xl space-y-10">
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {name}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <section
        aria-labelledby="foundation-heading"
        className="rounded-lg border bg-muted p-6 sm:p-8"
      >
        <h2 id="foundation-heading" className="text-2xl font-semibold">
          Built for your next project
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          This starter brings together server-rendered pages, accessible
          interfaces, and a reusable feature structure.
        </p>
        <ul className="mt-5 list-disc space-y-3 pl-5 leading-7">
          <li>Public content available in the initial HTML.</li>
          <li>Page metadata, canonical URLs, and structured data.</li>
          <li>Type checking, automated tests, and consistent formatting.</li>
        </ul>
      </section>
    </article>
  );
}
