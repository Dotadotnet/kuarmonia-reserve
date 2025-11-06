import React from 'react';
import { useTranslationContext } from '@/contexts/TranslationContext';

const AutoTranslateToggle = ({ className = '' }) => {
  const { autoTranslate, toggleAutoTranslate } = useTranslationContext();

  return (
    <button
      type="button"
      onClick={toggleAutoTranslate}
      className={`flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors ${
        autoTranslate
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      } ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span>{autoTranslate ? 'ترجمه خودکار روشن' : 'ترجمه خودکار خاموش'}</span>
    </button>
  );
};

export default AutoTranslateToggle;