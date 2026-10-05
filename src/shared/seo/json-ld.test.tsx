import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { JsonLd } from "./json-ld";

it("keeps hostile text inside a single JSON-LD script without changing its meaning", () => {
  const name = '</script><script>alert("unsafe")</script>';
  const { container } = render(
    <JsonLd
      data={{ "@context": "https://schema.org", "@type": "WebSite", name }}
    />,
  );
  expect(container.querySelectorAll("script")).toHaveLength(1);
  const script = container.querySelector("script");
  expect(script?.innerHTML).not.toContain("<");
  expect(JSON.parse(script?.textContent ?? "{}").name).toBe(name);
});
