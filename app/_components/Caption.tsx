import React from 'react';
import { Button } from './Button';
import { CopyIcon } from './icons/CopyIcon';

import { useState } from 'react';
import { Toast } from './Toast';

export interface CaptionProps {
  caption: string;
}

export function Caption({ caption }: CaptionProps) {
  const [copied, setCopied] = useState(false);
  if (!caption) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Optionally handle error
    }
  };
  return (
    <>
      <h2 className="text-lg font-semibold">Caption</h2>
      <p className="whitespace-pre-wrap">{caption}</p>
      <Button className="sm:self-start" ariaLabel="Copy to clipboard" onClick={handleCopy}>
        <CopyIcon />
        Copy caption
      </Button>
      <Toast text="Copied!" visible={copied} onClose={() => setCopied(false)} />
    </>
  );
}
