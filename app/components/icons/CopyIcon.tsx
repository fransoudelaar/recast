import React from 'react';

/**
 * Copy icon SVG for use in buttons and UI.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG props
 */
export function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-4 h-4 mr-1.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}>
      <path d="M16 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-6-4z" />
    </svg>
  );
}
