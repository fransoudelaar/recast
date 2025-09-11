import React, { useState } from 'react';
import { Toast } from './Toast';
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

const downloadMedia = (images?: string[], video?: string | null, onStart?: () => void) => {
  if (onStart) onStart();
  // save all images / video at once
  const allMedia = [...(images || [])];
  if (video) allMedia.push(video);

  // iOS Safari does not support downloading blobs/zips reliably
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isIOS && isSafari) {
    alert('Downloading zip files is not supported on iOS Safari. Please use a desktop browser.');
    return;
  }

  // Fetch all media as blobs first
  Promise.all(allMedia.map(src => fetch(src).then(res => res.blob()))).then(blobs => {
    const zip = new JSZip();
    const knownImageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const knownVideoExts = ['mp4', 'mov', 'webm'];
    blobs.forEach((blob, i) => {
      let ext = allMedia[i].split('.').pop()?.toLowerCase() || '';
      // fallback for images
      if (images && images.includes(allMedia[i])) {
        if (!knownImageExts.includes(ext)) ext = 'jpg';
      } else if (video && allMedia[i] === video) {
        if (!knownVideoExts.includes(ext)) ext = 'mp4';
      }
      zip.file(`${prefix}_${i}.${ext}`, blob);
    });
    zip.generateAsync({ type: 'blob' }).then(content => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prefix}_media.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  });
};

/**
 * Renders images and/or video for an Instagram post.
 * @param {MediaProps} props - The images and video to display
 */
export function Media({ images, video }: MediaProps) {
  const [showToast, setShowToast] = useState(false);
  const handleDownload = () => {
    downloadMedia(images, video, () => {
      setShowToast(true);
    });
  };
  return (
    <>
      <h2 className="text-lg font-semibold">Media</h2>
      {images && images.length > 0 && <Images images={images} />}
      {video && <Video video={video} />}
      {((images && images.length > 1) || video) && (
        <Button className="mt-4 sm:self-start" onClick={handleDownload}>
          <DownloadIcon />
          Download all
        </Button>
      )}
      <Toast text="Download started!" visible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
