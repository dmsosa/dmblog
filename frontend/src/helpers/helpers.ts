//createSlug *some may say 'slugify'*
export function slugify(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\W+|_/g, "-");
}

export function dateFormatter(date?: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
