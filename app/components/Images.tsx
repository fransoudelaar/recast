import React, { Fragment } from 'react';
import Image from 'next/image';

export interface ImagesProps {
  images: string[];
}

export function Images({ images }: ImagesProps) {
  if (!images?.length) return null;
  return (
    <>
      <h2 className="text-lg font-semibold">Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((src, i) => (
          <Fragment key={i}>
            <Image
              src={`/api/image-proxy?url=${encodeURIComponent(src)}`}
              alt={`IG media ${i}`}
              layout="responsive"
              width={500}
              height={500}
              className="rounded"
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
