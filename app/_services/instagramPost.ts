// API client for Instagram post generation
// Types are duplicated here for simplicity, but can be imported from a shared types file if needed.

export type PostParams = {
  link: string;
  rigName?: string;
  creator?: string;
  creatorHandle?: string;
  info?: string;
};

export type DataReturnType = {
  caption: string;
  images: string[];
  video: string | null;
  originalCaption: string;
} | null;

/**
 * Calls the /api/instagram-post endpoint to generate a post.
 * @param {PostParams} props - The post parameters
 * @returns {Promise<DataReturnType>} The generated post data
 */
export async function generatePost(props: PostParams): Promise<DataReturnType> {
  const res = await fetch('/api/instagram-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
  });
  const data = await res.json();
  return data;
}
