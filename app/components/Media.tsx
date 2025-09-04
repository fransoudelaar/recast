import React from 'react';
import { Images } from './Images';
import { Video } from './Video';
import { Button } from './Button';
import JSZip from 'jszip';
import { DownloadIcon } from './icons/DownloadIcon';

interface MediaProps {
  images?: string[];
  video?: string | null;
}

const prefix = 'therigvault';

const downloadMedia = (images?: string[], video?: string | null) => {
  // save all images / video at once
  const allMedia = [...(images || [])];
  if (video) allMedia.push(video);

  // Create a zip file and download it
  const zip = new JSZip();
  allMedia.forEach((src, i) => {
    zip.file(
      `${prefix}_${i}.${src.split('.').pop()}`,
      fetch(src).then(res => res.blob()),
    );
  });
  zip.generateAsync({ type: 'blob' }).then(content => {
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prefix}_media.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

/**
 * Renders images and/or video for an Instagram post.
 * @param {MediaProps} props - The images and video to display
 */
export function Media({ images, video }: MediaProps) {
  return (
    <>
      <h2 className="text-lg font-semibold">Media</h2>
      {images && images.length > 0 && <Images images={images} />}
      {video && <Video video={video} />}
      {((images && images.length > 1) || video) && (
        <Button className="mt-4" onClick={() => downloadMedia(images, video)}>
          {/* download icon */}
          <DownloadIcon />
          Download
        </Button>
      )}
    </>
  );
}
