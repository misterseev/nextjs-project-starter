import { Button } from "@/ui/primitives/button";
export function ErrorState({ retry }: { retry: () => void }) {
  return (
    <section role="alert" className="mx-auto max-w-xl space-y-5 px-6 py-16">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        We could not load this page. Please try again.
      </p>
      <Button onClick={retry}>Try again</Button>
    </section>
  );
}
