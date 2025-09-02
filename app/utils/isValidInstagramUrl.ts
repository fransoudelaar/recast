/**
 * Checks if a URL is a valid Instagram URL.
 * This is a basic check; for production, consider more robust validation.
 */
export function isValidInstagramUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.hostname === 'www.instagram.com' ||
      u.hostname === 'instagram.com' ||
      u.hostname.endsWith('.instagram.com')
    );
  } catch {
    return false;
  }
}
