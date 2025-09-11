import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorId?: string;
}

export function FormInput({ label, id, errorId, ...props }: FormInputProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={errorId}
        {...props}
        className={props.className || 'border border-indigo-900 rounded p-2 w-full'}
      />
    </>
  );
}
