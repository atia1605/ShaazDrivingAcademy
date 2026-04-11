import { faqItems } from "../data/content";

function answerPlainText(item: (typeof faqItems)[number]): string {
  if ("aHtml" in item && item.aHtml) {
    return item.aHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  return "a" in item ? item.a : "";
}

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "can",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "what",
  "which",
  "who",
  "this",
  "that",
  "these",
  "those",
  "am",
  "how",
  "when",
  "where",
  "why",
  "my",
  "your",
  "me",
  "us",
  "them",
  "there",
  "here",
  "with",
  "from",
  "as",
  "by",
  "about",
  "into",
  "through",
  "during",
  "before",
  "after",
  "again",
  "further",
  "once",
  "any",
  "some",
  "our",
  "their",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function corpusBlob(item: (typeof faqItems)[number]): string {
  return `${item.q} ${answerPlainText(item)}`.toLowerCase();
}

/**
 * Returns the best-matching FAQ index, or null if nothing is confident enough.
 * Runs entirely in the browser — not an AI; matches your published FAQ text.
 */
export function matchFaqIndex(userInput: string): number | null {
  const raw = userInput.trim();
  if (!raw) return null;

  const norm = raw.toLowerCase().replace(/\s+/g, " ");
  let bestIdx = -1;
  let bestScore = 0;

  faqItems.forEach((item, i) => {
    const blob = corpusBlob(item);
    let score = 0;

    if (blob.includes(norm)) {
      score += 28;
    }

    const words = tokenize(raw);
    const seen = new Set<string>();
    for (const w of words) {
      if (seen.has(w)) continue;
      seen.add(w);
      if (blob.includes(w)) {
        score += w.length >= 5 ? 5 : w.length >= 3 ? 3 : 2;
      }
    }

    if (norm.includes("road") && norm.includes("test") && blob.includes("road test")) {
      score += 18;
    }
    if (/\bg1\b/i.test(raw) && blob.includes("g1")) {
      score += 14;
    }
    if (norm.includes("instructor") && blob.includes("instructor")) {
      score += 12;
    }
    if (norm.includes("lesson") && blob.includes("lesson")) {
      score += 10;
    }
    if (
      (norm.includes("pay") || norm.includes("payment") || norm.includes("balance") || norm.includes("cheque")) &&
      (blob.includes("pay") || blob.includes("balance") || blob.includes("cheque"))
    ) {
      score += 14;
    }
    if (norm.includes("certificate") && blob.includes("certificate")) {
      score += 14;
    }
    if ((norm.includes("book") || norm.includes("schedule")) && (blob.includes("book") || blob.includes("drivetest"))) {
      score += 10;
    }
    if (norm.includes("class") && blob.includes("class")) {
      score += 8;
    }
    if (
      (norm.includes("foreign") ||
        norm.includes("international") ||
        norm.includes("another country") ||
        norm.includes("home country") ||
        norm.includes("my country") ||
        norm.includes("exchange")) &&
      (blob.includes("foreign") || blob.includes("country") || blob.includes("exchange") || blob.includes("drivetest"))
    ) {
      score += 20;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  });

  const MIN_SCORE = 7;
  if (bestIdx >= 0 && bestScore >= MIN_SCORE) {
    return bestIdx;
  }
  return null;
}
