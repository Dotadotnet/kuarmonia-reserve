import React, { useState } from 'react';
import TranslateButton from '@/components/shared/button/TranslateButton';
import { useTranslation } from '@/hooks/useTranslation';

const TranslatableInput = ({ 
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  maxLength,
  error,
  type = 'text',
  textarea = false,
  rows = 3
}) => {
  const { isTranslating, translateText } = useTranslation();
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange && onChange(e);
  };

  const handleTranslate = async () => {
    if (!localValue.trim()) return;
    
    try {
      const translatedText = await translateText(localValue, 'fa'); // Translate to Persian by default
      setLocalValue(translatedText);
      
      // Create a synthetic event to pass to the parent onChange handler
      const syntheticEvent = {
        target: {
          name,
          value: translatedText
        }
      };
      onChange && onChange(syntheticEvent);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const InputComponent = textarea ? 'textarea' : 'input';

  return (
    <label htmlFor={name} className="flex flex-col gap-y-1">
      {label && <span className="text-sm">{label}</span>}
      <div className="relative">
        <InputComponent
          type={type}
          name={name}
          id={name}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          rows={textarea ? rows : undefined}
          className={`p-2 rounded border w-full ${textarea ? 'form-textarea' : ''}`}
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <TranslateButton 
            onClick={handleTranslate} 
            isTranslating={isTranslating}
            size="sm"
          />
        </div>
      </div>
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </label>
  );
};

export default TranslatableInput;