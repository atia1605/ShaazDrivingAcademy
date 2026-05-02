/** Strip HTML for FAQ JSON-LD (Answer must be plain text). */
export function plainTextFromFaqAnswer(a?: string, aHtml?: string): string {
  const raw = aHtml ? aHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : (a ?? "").trim();
  return raw;
}
