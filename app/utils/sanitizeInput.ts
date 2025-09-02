/**
 * Sanitizes a string by trimming, limiting length, and escaping dangerous characters.
 * Used to prevent prompt injection and ensure clean input for the AI model.
 */
export function sanitizeInput(str: unknown, maxLen = 300): string {
  if (typeof str !== 'string') return '';
  let s = str.trim().slice(0, maxLen);
  // Escape backticks and dollar signs to prevent template injection
  s = s.replace(/[`$]/g, '_');
  // Optionally, escape newlines or other special chars if needed
  return s;
}
