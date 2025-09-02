import type { PostRequestBody } from '../api/instagram-post/types';
import { sanitizeInput } from './sanitizeInput';

/**
 * Sanitizes all fields of a PostRequestBody.
 * @param {PostRequestBody} body - The raw request body
 * @returns {PostRequestBody} The sanitized fields
 */
export function sanitizePostFields(body: PostRequestBody): PostRequestBody {
  return {
    link: sanitizeInput(body.link, 500),
    rigName: sanitizeInput(body.rigName),
    creator: sanitizeInput(body.creator),
    creatorHandle: sanitizeInput(body.creatorHandle),
    info: sanitizeInput(body.info, 1000),
  };
}
