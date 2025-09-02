import { isValidInstagramUrl } from '../../utils/isValidInstagramUrl';

describe('isValidInstagramUrl', () => {
  it('returns true for valid Instagram URLs', () => {
    expect(isValidInstagramUrl('https://www.instagram.com/p/abc123')).toBe(true);
    expect(isValidInstagramUrl('https://instagram.com/p/abc123')).toBe(true);
    expect(isValidInstagramUrl('https://sub.instagram.com/p/abc123')).toBe(true);
  });

  it('returns false for invalid URLs', () => {
    expect(isValidInstagramUrl('https://notinstagram.com/p/abc123')).toBe(false);
    expect(isValidInstagramUrl('not a url')).toBe(false);
    expect(isValidInstagramUrl('')).toBe(false);
  });
});
