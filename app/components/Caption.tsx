import React from 'react';
import { Button } from './Button';
import { CopyIcon } from './icons/CopyIcon';

export interface CaptionProps {
  caption: string;
}

export function Caption({ caption }: CaptionProps) {
  if (!caption) return null;
  return (
    <>
      <h2 className="text-lg font-semibold">Caption</h2>
      <p className="whitespace-pre-wrap">{caption}</p>
      <Button ariaLabel="Copy to clipboard" onClick={() => navigator.clipboard.writeText(caption)}>
        <CopyIcon />
        Copy
      </Button>
    </>
  );
}
