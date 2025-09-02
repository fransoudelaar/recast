import { isValidInstagramUrl } from '../../../utils/isValidInstagramUrl';
import { PostRequestBody } from '../types';

/**
 * Validates the input for an Instagram post request.
 * Checks for required fields and correct formats.
 *
 * @param {PostRequestBody} body - The request body to validate
 * @returns {string[]} Array of error messages, empty if valid
 */
export function validateInstagramPostInput(body: PostRequestBody): string[] {
  const errors: string[] = [];

  // Check for required Instagram link
  if (!body.link) {
    errors.push('Missing Instagram link');
  } else if (!isValidInstagramUrl(body.link)) {
    errors.push('Invalid Instagram link');
  }

  // Add more validation rules here as needed

  return errors;
}
