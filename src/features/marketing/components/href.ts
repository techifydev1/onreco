/** Keeps in-page anchors working when the same chrome renders on a subpage. */
export function resolveHref(href: string, hrefPrefix = ""): string {
  return href.startsWith("#") ? `${hrefPrefix}${href}` : href;
}
