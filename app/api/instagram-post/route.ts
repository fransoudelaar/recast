import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { sanitizePostFields } from '../../utils/sanitizePostFields';
import { fetchFromScraper } from './services/fetchFromScraper';
import { generateRigVaultPrompt } from './services/generateRigVaultPrompt';
import { badRequest, internalError } from '../../utils/apiErrors';
import { validateInstagramPostInput } from './services/validateInstagramPostInput';
import { ValidationError, ExternalApiError } from '../../utils/errors';
import { PostRequestBody } from './types';

/**
 * Instagram caption generation API route for The Rig Vault.
 *
 * Handles POST requests to generate a custom Instagram caption using AI.
 * - Validates and sanitizes input
 * - Fetches Instagram media info
 * - Generates a caption using an AI model
 * - Returns the generated caption and media info as JSON
 *
 * @param {Request} req - The incoming HTTP request
 * @returns {Promise<Response>} The API response with generated caption and media info
 */
export async function POST(req: Request): Promise<Response> {
  try {
    // Parse and validate the request body
    let body: PostRequestBody;
    try {
      body = await req.json();
    } catch {
      // Malformed JSON
      throw new ValidationError('Invalid JSON body');
    }

    // Validate required and format-specific fields
    const validationErrors = validateInstagramPostInput(body);
    if (validationErrors.length > 0) {
      // Return all validation errors at once
      throw new ValidationError(validationErrors.join(', '));
    }

    // Sanitize all user input to prevent injection or abuse
    const sanitized = sanitizePostFields(body);

    // Fetch Instagram media (images, video, caption) using a third-party API
    const media = await fetchFromScraper(sanitized.link);
    if (!media) {
      // Could not fetch media (API error, invalid link, etc)
      throw new ExternalApiError('Could not fetch media from Instagram');
    }

    // Build the AI prompt using sanitized and fetched data
    const prompt = generateRigVaultPrompt({
      ...sanitized,
      originalCaption: media.caption || 'No caption provided',
    });

    // Generate the Instagram caption using the AI model
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    // Return the generated caption and media info
    return NextResponse.json({
      caption: text,
      images: media.images,
      video: media.video,
      originalCaption: media.caption,
    });
  } catch (err) {
    // Centralized error handling for known and unknown errors
    if (err instanceof ValidationError) {
      return badRequest(err.message);
    }
    if (err instanceof ExternalApiError) {
      return internalError(err.message);
    }
    // Log unexpected errors for debugging
    console.error('[POST handler]', err);
    return internalError('Unexpected server error');
  }
}
