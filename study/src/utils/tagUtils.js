export function slugifyTag(tag) {
  const normalized = tag.toLowerCase().trim().replace(/\s+/g, '-');
  return encodeURIComponent(normalized);
}
