import React from 'react';

export interface VideoProps {
  video: string | null;
}

export function Video({ video }: VideoProps) {
  if (!video) return null;
  return (
    <div className="grid grid-cols-2 gap-4">
      <video controls className="rounded">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
