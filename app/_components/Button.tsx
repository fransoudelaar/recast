import React, { JSX } from 'react';

/**
 * Props for the general Button component.
 *
 * @property {React.ReactNode} children - The content of the button (text, icon, etc).
 * @property {function} [onClick] - Click handler for the button.
 * @property {'button' | 'submit' | 'reset'} [type] - The button type (default: 'button').
 * @property {string} [className] - Optional CSS classes for styling.
 * @property {string} [ariaLabel] - Optional ARIA label for accessibility.
 * @property {boolean} [disabled] - Whether the button is disabled.
 */
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * General purpose button component.
 * @param {ButtonProps} props - Button props (children, onClick, type, className, ariaLabel, disabled)
 */
/**
 * General purpose button component for UI actions.
 *
 * Usage:
 * <Button onClick={...} className="...">Click me</Button>
 *
 * @param {ButtonProps} props - Button configuration
 * @returns {JSX.Element} The rendered button
 */
export function Button({
  children,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  disabled,
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={`flex text-sm uppercase rounded-full py-2 px-4 justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:from-purple-500 hover:to-purple-600 hover:text-white active:from-purple-700 active:to-purple-800${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}
