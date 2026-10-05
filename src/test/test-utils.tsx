import type { ReactElement } from "react";

import { render, type RenderOptions } from "@testing-library/react";

// Add product providers here only when a feature actually needs them.
export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, options);
}
