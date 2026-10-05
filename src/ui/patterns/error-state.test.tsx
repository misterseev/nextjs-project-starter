import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test/test-utils";

import { ErrorState } from "./error-state";

it("offers keyboard-operable recovery with a safe error message", async () => {
  const retry = vi.fn();
  const user = userEvent.setup();
  renderWithProviders(<ErrorState retry={retry} />);
  expect(screen.getByRole("alert")).toHaveTextContent(
    "We could not load this page.",
  );
  await user.tab();
  expect(screen.getByRole("button", { name: "Try again" })).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(retry).toHaveBeenCalledOnce();
});
