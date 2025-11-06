import React from "react";
import PageBuilder from "@/components/shared/pageBuilder/PageBuilder";

const FormPageBuilder = ({
  label = "محتوای صفحه",
  id,
  value = "",
  onChange,
  error,
  required = false,
  className = "w-full"
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <PageBuilder 
        initialValue={value} 
        onChange={onChange} 
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormPageBuilder;