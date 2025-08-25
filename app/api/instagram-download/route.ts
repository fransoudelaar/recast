import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // voor fallback scraper

async function fetchFromScraper(url: string) {
  const res = await fetch(
    `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${url}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY!,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com',
      },
    },
  );
  if (!res.ok) return null;
  const data = await res.json();

  let video: string | null = null;
  const images: string[] = [];
  if (data.type === 'video') {
    video = data.download_url;
  } else {
    if (data.medias && Array.isArray(data.medias)) {
      data.medias.forEach((m: any) => images.push(m.download_url));
    } else if (data.download_url) {
      images.push(data.download_url);
    }
  }

  return { images, video, caption: data.caption || '' };
}

export async function POST(req: Request) {
  const { link, rigName, creator, creatorHandle, info } = await req.json();

  // Rapid scraper API
  let media = null;

  if (link) {
    media = await fetchFromScraper(link);
  }

  if (!media) {
    return NextResponse.json({ error: 'Could not fetch media from Instagram' }, { status: 500 });
  }

  return NextResponse.json({
    images: media?.images,
    video: media?.video,
    originalCaption: media?.caption,
  });
}
