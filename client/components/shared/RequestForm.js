import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useCreateRequestMutation } from "@/services/request/requestApi";

const RequestForm = ({ isOpen, onClose, serviceType = "other", specificTypeId = null }) => {
  const t = useTranslations("RequestForm");
  const [file, setFile] = useState(null);
  const [createRequest, { isLoading, data, error }] = useCreateRequestMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isLoading) {
      toast.loading(t("submitting"), { id: "request-submit" });
    }

    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "request-submit" });
      // Reset form
      reset();
      setFile(null);
      onClose();
    }

    if (data && !data.acknowledgement) {
      toast.error(data.description, { id: "request-submit" });
    }

    if (error?.data) {
      toast.error(error?.data?.description || t("errorMessage"), { id: "request-submit" });
    }
  }, [isLoading, data, error]);

  const onSubmit = async (formData) => {

    const data = new FormData();
    // Main fields
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("description", formData.description);
    data.append("serviceType", serviceType);
    data.append("specificTypeId", specificTypeId);


    // File
    if (file) {
      data.append("file", file);
    }


    await createRequest(data).unwrap();

  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-6 pt-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-4">
        <form id="request-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("firstName")}
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: t("firstNameRequired"),
                  minLength: {
                    value: 2,
                    message: t("firstNameMinLength")
                  },
                  maxLength: {
                    value: 50,
                    message: t("firstNameMaxLength")
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("lastName")}
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: t("lastNameRequired"),
                  minLength: {
                    value: 2,
                    message: t("lastNameMinLength")
                  },
                  maxLength: {
                    value: 50,
                    message: t("lastNameMaxLength")
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("phone")}
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: t("phoneRequired"),
                pattern: {
                  value: /^[0-9+\-\s()]+$/,
                  message: t("phoneInvalid")
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("email")}
            </label>
            <input
              type="email"
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("emailInvalid")
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("description")}
            </label>
            <textarea
              {...register("description", {
                minLength: {
                  value: 10,
                  message: t("descriptionMinLength")
                },
                maxLength: {
                  value: 1000,
                  message: t("descriptionMaxLength")
                }
              })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("file")} <span className="text-gray-500 dark:text-gray-400">({t("optional")})</span>
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">{t("clickToUpload")}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("fileTypes")}
                  </p>
                </div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            {file && (
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {file.name}
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  {t("removeFile")}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Fixed action buttons at the bottom */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-b border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            form="request-form"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? t("submitting") : t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;