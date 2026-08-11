export function cleanTemplateLine(line: string) {
  return line
    .replace(/^(?:[\u2022\u25aa\u25e6\u25a1\u2610\u2611\u2713\u2714]\s*)+/u, '')
    .replace(/^(?:â€¢|Ã¢â‚¬Â¢|□|â˜)\s*/, '')
    .trim();
}
