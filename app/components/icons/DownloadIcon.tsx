import React from 'react';

/**
 * Download icon SVG for use in buttons and UI.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG props
 */
export function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 inline-block mr-1.5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}>
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H4a1 1 0 110-2h6V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
