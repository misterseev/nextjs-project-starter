import type { Thing, WithContext } from "schema-dts";

export function serializeJsonLd(data: WithContext<Thing>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
