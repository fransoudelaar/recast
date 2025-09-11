import React, { useEffect } from 'react';

interface ToastProps {
  text: string;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ text, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;
  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-4 py-2 rounded shadow-2xl z-50 animate-fade-in"
      role="status">
      {text}
    </div>
  );
}
