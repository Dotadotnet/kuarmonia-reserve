import React from "react";

const FormTextArea = ({
  label,
  id,
  placeholder,
  register,
  error,
  required = false,
  minLength,
  maxLength,
  className = "",
  rows = 4,
  children,
  ...rest
}) => {
  // Set up validation rules
  const validationRules = {};
  
  if (required) {
    validationRules.required = typeof required === 'string' ? required : "This field is required";
  }
  
  if (minLength) {
    validationRules.minLength = {
      value: minLength.value || minLength,
      message: minLength.message || `Minimum length is ${minLength.value || minLength} characters`
    };
  }
  
  if (maxLength) {
    validationRules.maxLength = {
      value: maxLength.value || maxLength,
      message: maxLength.message || `Maximum length is ${maxLength.value || maxLength} characters`
    };
  }

  return (
    <label htmlFor={id} className="flex w-full flex-col gap-y-1">
      {label && <span className="text-sm">{label}{required && " *"}</span>}
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        {...(register && register(id, validationRules))}
        className={`p-2 rounded border ${className}`}
        {...rest}
      />
      {children}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </label>
  );
};

export default FormTextArea;