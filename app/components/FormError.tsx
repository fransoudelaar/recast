import React from 'react';

interface FormErrorProps {
  error?: string | null;
  id?: string;
}

export function FormError({ error, id }: FormErrorProps) {
  if (!error) return null;
  return (
    <p className="text-red-500 text-sm" id={id} role="alert">
      {error}
    </p>
  );
}
