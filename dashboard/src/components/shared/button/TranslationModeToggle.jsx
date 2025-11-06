import React from 'react';
import { useTranslationContext } from '@/contexts/TranslationContext';
import translationService from '@/services/translation/translationService';

const TranslationModeToggle = ({ className = '' }) => {
  const { offlineMode, setOfflineMode } = useTranslationContext();

  const toggleMode = () => {
    const newMode = !offlineMode;
    setOfflineMode(newMode);
    translationService.setOfflineMode(newMode);
  };

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={`flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors ${
        offlineMode
          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
      <span>{offlineMode ? 'حالت آفلاین' : 'حالت آنلاین'}</span>
    </button>
  );
};

export default TranslationModeToggle;