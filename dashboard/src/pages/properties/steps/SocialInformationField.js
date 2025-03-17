import React from 'react';
import Dropdown from "@/components/shared/dropdownmenu/Dropdown";
import { Controller } from 'react-hook-form';
import { CgTrash } from "react-icons/cg";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const SocialInformationField = ({ control, index, remove, errors, getValues }) => {
  const iconOptions = [
    { _id: 1, value: "Instagram", label: "", description: "لینک به اینستاگرام", icon: <FaInstagram className="text-pink-500 w-5 h-5" /> },
    { _id: 2, value: "Twitter", label: "", description: "لینک به توییتر", icon: <FaTwitter className="text-blue-500 w-5 h-5" /> },
    { _id: 3, value: "TelegramPlane", label: "", description: "لینک به تلگرام", icon: <FaTelegramPlane className="text-blue-600 w-5 h-5" /> },
  ];

  const urlPatterns = {
    FaInstagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+(?:\/p\/[A-Za-z0-9_-]+)?\/?$/,
    FaTwitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
    FaTelegramPlane: /^https?:\/\/(t\.me|telegram\.me)\/[A-Za-z0-9_]+\/?$/,
  };

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-2">
        {/* انتخاب آیکون شبکه اجتماعی با استفاده از Dropdown */}
        <Controller
          control={control}
          name={`socialLinks.${index}.name`} // فقط name را کنترل می‌کنیم
          defaultValue="FaInstagram" // مقدار پیش‌فرض
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={iconOptions} // لیست آیکون‌ها
              placeholder=" "
              value={value?._id}
              onChange={onChange} // تغییر مقدار name
              className="w-16"
              height="py-2"
              error={errors.socialLinks?.[index]?.name}
              renderOption={(option) => (
                <div className="flex items-center gap-x-2">
                  {option.icon} {/* نمایش آیکون */}
                </div>
              )}
              renderValue={(selected) => {
                const selectedOption = iconOptions.find(option => option.value === selected);
                return (
                  <div className="flex items-center gap-x-2">
                    {selectedOption?.icon} {/* فقط نمایش آیکون */}
                    <span>{selectedOption?.label || "انتخاب کنید"}</span>
                  </div>
                );
              }}
            />
          )}
        />

        <Controller
          control={control}
          name={`socialLinks.${index}.url`}
         
          render={({ field }) => (
            <input
              type="url"
              className="flex-1 rounded border px-2 !py-0 h-10"
              placeholder="وارد کردن لینک..."
              maxLength="100"
            />
          )}
        />

        {/* دکمه حذف */}
        <button
          type="button"
          className="p-1 rounded"
          onClick={() => remove(index)}
        >
          <CgTrash className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* نمایش پیام خطا زیر input */}
      {errors.socialLinks?.[index]?.url && (
        <span className="text-red-500 text-sm">
          {errors.socialLinks[index].url.message}
        </span>
      )}
      {errors.socialLinks?.[index]?.name && (
        <span className="text-red-500 text-sm">
          {errors.socialLinks[index].name.message}
        </span>
      )}
    </div>
  );
};

export default SocialInformationField;
