import React from 'react';

export interface CaptionProps {
  caption: string;
}

export function Caption({ caption }: CaptionProps) {
  if (!caption) return null;
  return (
    <>
      <h2 className="text-lg font-semibold">Caption</h2>
      <p className="whitespace-pre-wrap">{caption}</p>
    </>
  );
}
