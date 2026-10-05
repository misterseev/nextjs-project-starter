import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = (
  error,
  request,
  context,
) => {
  const digest =
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string"
      ? error.digest
      : undefined;
  // Route templates and generated IDs avoid logging URL params, headers,
  // bodies, or potentially sensitive error messages.
  console.error(
    JSON.stringify({
      event: "request_error",
      correlationId: crypto.randomUUID(),
      digest,
      route: context.routePath,
      routeType: context.routeType,
      method: request.method,
    }),
  );
};
