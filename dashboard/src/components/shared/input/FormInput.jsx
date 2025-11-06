import React from "react";

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  minLength,
  maxLength,
  pattern,
  className = "",
  rows = 4,
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
  
  if (pattern) {
    validationRules.pattern = pattern;
  }

  // Render textarea for textarea type, otherwise render input
  const inputElement = type === "textarea" ? (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      {...(register && register(id, validationRules))}
      className={`p-2 rounded border ${className}`}
      {...rest}
    />
  ) : (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...(register && register(id, validationRules))}
      className={`p-2 rounded border ${className}`}
      {...rest}
    />
  );

  return (
    <label htmlFor={id} className="flex w-full flex-col gap-y-1">
      {label && <span className="text-sm">{label}{required && " *"}</span>}
      {inputElement}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </label>
  );
};

export default FormInput;