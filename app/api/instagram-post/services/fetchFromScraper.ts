/**
 * Fetches media info (images, video, caption) from a third-party Instagram scraper API.
 *
 * @param {string} url - The Instagram post URL to fetch media for
 * @returns {Promise<{ images: string[]; video: string | null; caption: string } | null>} Media info or null on failure
 * @throws {Error} If the RAPIDAPI_KEY environment variable is missing
 */
export async function fetchFromScraper(
  url: string,
): Promise<{ images: string[]; video: string | null; caption: string } | null> {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  if (!RAPIDAPI_KEY) {
    throw new Error('Missing RAPIDAPI_KEY environment variable');
  }
  try {
    // Call the third-party API with the provided Instagram URL
    const res = await fetch(
      `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host':
            'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
        },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();

    let video: string | null = null;
    const images: string[] = [];
    // If the post is a video, set the video URL
    if (data.type === 'video') {
      video = data.download_url;
    } else if (Array.isArray(data.medias)) {
      // If multiple images, collect all image URLs
      data.medias.forEach((m: { download_url: string }) => images.push(m.download_url));
    } else if (data.download_url) {
      // If a single image, add its URL
      images.push(data.download_url);
    }

    return { images, video, caption: data.caption || '' };
  } catch (e) {
    console.error('[fetchFromScraper]', e);
    return null;
  }
}
