import { NextRequest, NextResponse } from 'next/server';
import { badRequest, internalError, badGateway } from '../../utils/apiErrors';

/**
 * Image proxy API route.
 *
 * Handles GET requests to proxy and cache images from external URLs.
 * - Validates the presence of the 'url' query parameter
 * - Fetches the image from the provided URL
 * - Returns the image with appropriate headers and caching
 *
 * @param {NextRequest} req - The incoming HTTP request
 * @returns {Promise<NextResponse>} The proxied image response or error
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    // Return 400 if the url parameter is missing
    return badRequest('Missing url parameter');
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Return 502 if the fetch fails (upstream error)
      return badGateway('Failed to fetch image');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await response.arrayBuffer();

    // Return the image with correct headers and caching
    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return internalError('Error fetching image: ' + error);
  }
}
