export function canonicalUrl(path: string, origin: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /[\\?#\s]/.test(path)) {
    throw new Error(
      "Canonical paths must be local paths without queries or fragments.",
    );
  }
  const url = new URL(path, origin);
  if (url.origin !== new URL(origin).origin)
    throw new Error("Invalid canonical origin.");
  url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  // Match Next.js metadata normalization, including the origin-only homepage.
  return url.pathname === "/" ? url.origin : url.href;
}
