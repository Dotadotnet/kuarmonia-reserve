import React from "react";

const FormSelect = ({
  label,
  id,
  options = [],
  placeholder,
  register,
  error,
  required = false,
  className = "",
  ...rest
}) => {
  // Set up validation rules
  const validationRules = {};
  
  if (required) {
    validationRules.required = typeof required === 'string' ? required : "This field is required";
  }

  return (
    <label htmlFor={id} className="flex w-full flex-col gap-y-1">
      {label && <span className="text-sm">{label}{required && " *"}</span>}
      <select
        id={id}
        {...(register && register(id, validationRules))}
        className={`p-2 rounded border ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </label>
  );
};

export default FormSelect;