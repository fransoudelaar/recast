import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { sanitizeInput } from './util/sanitizeInput';
import { isValidInstagramUrl } from './util/isValidInstagramUrl';

type PostRequestBody = {
  link: string;
  rigName?: string;
  creator?: string;
  creatorHandle?: string;
  info?: string;
};

type PromptProps = PostRequestBody & {
  originalCaption?: string;
};

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
if (!RAPIDAPI_KEY) {
  throw new Error('Missing RAPIDAPI_KEY environment variable');
}

/**
 * Fetches media info from a third-party Instagram scraper API.
 */
async function fetchFromScraper(
  url: string,
): Promise<{ images: string[]; video: string | null; caption: string } | null> {
  try {
    const res = await fetch(
      `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY!,
          'X-RapidAPI-Host':
            'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
        },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();

    let video: string | null = null;
    const images: string[] = [];
    if (data.type === 'video') {
      video = data.download_url;
    } else if (Array.isArray(data.medias)) {
      data.medias.forEach((m: { download_url: string }) => images.push(m.download_url));
    } else if (data.download_url) {
      images.push(data.download_url);
    }

    return { images, video, caption: data.caption || '' };
  } catch (e) {
    console.error('[fetchFromScraper]', e);
    return null;
  }
}

/**
 * Generates a prompt for the AI model based on provided Instagram post details.
 */
function generateRigVaultPrompt({
  link,
  rigName,
  creator,
  creatorHandle,
  info,
  originalCaption,
}: PromptProps): string {
  return `
    You are writing an Instagram caption for "The Rig Vault", a carp fishing brand.
    Tone:
    - Engaging, short punchy sentences.
    - Mix of education and inspiration.
    - Use rig-specific jargon (stiff section, hinge point, bait floss, hook choice, etc) but don't come up with components yourself. Use the inputs.
    - Slightly informal, as if talking to fellow carp anglers.
    - Call to action at the end.
    Structure:
    1. Hook sentence (make it engaging).
    2. Short educational bit (explain the rig, bait, or setup).
    3. Tip or personal insight (optional).
    4. Strong call to action ("What’s your go-to setup? Drop it below 👇").
    5. Effective hashtags (#carpfishing #carprigs #therigvault + rig-specific hashtags).
    Inputs:
    - Instagram link: ${link}
    - Rig Name: ${rigName}
    - Creator: ${creator}
    - Creator's Instagram handle to be tagged: ${creatorHandle}
    - Extra info: ${info}
    - Original Instagram caption: ${originalCaption}
    Task:
    Based on these inputs, write one unique, improved caption for Instagram in The Rig Vault style.
  `;
}

/**
 * Handles POST requests for generating Instagram captions in The Rig Vault style.
 */
export async function POST(req: Request): Promise<Response> {
  let body: PostRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { link, rigName, creator, creatorHandle, info } = body;

  const sanitizedLink = sanitizeInput(link, 500);
  const sanitizedRigName = sanitizeInput(rigName);
  const sanitizedCreator = sanitizeInput(creator);
  const sanitizedCreatorHandle = sanitizeInput(creatorHandle);
  const sanitizedInfo = sanitizeInput(info, 1000);

  if (!sanitizedLink || !isValidInstagramUrl(sanitizedLink)) {
    return NextResponse.json({ error: 'Invalid or missing Instagram link' }, { status: 400 });
  }

  const media = await fetchFromScraper(sanitizedLink);
  if (!media) {
    return NextResponse.json({ error: 'Could not fetch media from Instagram' }, { status: 500 });
  }

  const prompt = generateRigVaultPrompt({
    link: sanitizedLink,
    rigName: sanitizedRigName,
    creator: sanitizedCreator,
    creatorHandle: sanitizedCreatorHandle,
    info: sanitizedInfo,
    originalCaption: media.caption || 'No caption provided',
  });

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });
    return NextResponse.json({
      caption: text,
      images: media.images,
      video: media.video,
      originalCaption: media.caption,
    });
  } catch (err) {
    console.error('[generateText]', err);
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
  }
}
