/** Prefix an internal path with the configured base ("/website" on GitHub Pages). */
export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  return clean ? `${base}/${clean}` : `${base}/`;
}
