import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#293040] text-white shadow-2xl border border-slate-700/60 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md">
      <CheckCircle className="w-5 h-5 text-[#63b0fe] shrink-0" />
      <span className="text-sm font-medium leading-snug flex-1">{message}</span>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
