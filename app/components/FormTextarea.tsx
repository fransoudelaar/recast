import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FormTextarea({ label, id, ...props }: FormTextareaProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={props.className || 'border border-indigo-900 rounded p-2 w-full'}
      />
    </>
  );
}
