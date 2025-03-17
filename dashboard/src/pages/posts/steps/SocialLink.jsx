import React, { useState } from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import Trash from "@/components/icons/Trash";
import Telegram from "@/components/icons/Telegram";
import Instagram from "@/components/icons/Instagram";
import X from "@/components/icons/X";
import Whatsapp from "@/components/icons/Whatsapp";

const SocialLink = ({ control, index, remove, errors }) => {
  const [urlError, setUrlError] = useState("");

  const socials = [
    { id: 1, value: "FaInstagram", label: "", description: "اینستاگرام", icon: <Instagram className="text-pink-500 w-5 h-5" /> },
    { id: 2, value: "FaTwitter", label: "", description: "توییتر", icon: <X className="text-blue-500 w-5 h-5" /> },
    { id: 3, value: "FaTelegramPlane", label: "", description: "تلگرام", icon: <Telegram className="text-blue-600 w-5 h-5" /> },
    { id: 4, value: "FaWhatsapp", label: "", description: "واتساپ", icon: <Whatsapp className="text-green-500 w-5 h-5" /> },
  ];

  const urlPatterns = {
    FaInstagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/,
    FaTwitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
    FaTelegramPlane: /^https?:\/\/(t\.me|telegram\.me)\/[A-Za-z0-9_]+\/?$/,
    FaWhatsapp: /^https?:\/\/(wa\.me|api\.whatsapp\.com)\/[0-9]+\/?$/,
  };

  const validateUrl = (value, socialName) => {
    if (!urlPatterns[socialName]?.test(value)) {
      setUrlError("لینک وارد شده معتبر نیست");
    } else {
      setUrlError("");
    }
  };

  return (
    <div className="flex flex-col gap-y-1 w-full rounded p-1">
      <div className="grid items-center grid-cols-12 gap-x-2">
        {/* انتخاب شبکه اجتماعی */}
        <div className="col-span-2">
           <Controller
            control={control}
            name={`socialLinks.${index}.name`}
            defaultValue="FaInstagram"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={socials}
                placeholder=""
                value={value}
                onChange={onChange}
                sendId={true}
                iconOnly={true}
                className="w-full"
                error={errors?.socialLinks?.[index]?.name}
              />
            )}
          /> 
        </div>

        {/* لینک */}
        <div className="col-span-9">
          <div className="flex flex-row">
            <Controller
              control={control}
              name={`socialLinks.${index}.url`}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <input
                  type="url"
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    const selectedSocial = control._formValues?.socialLinks?.[index]?.name || "FaInstagram";
                    validateUrl(e.target.value, selectedSocial);
                  }}
                  className="flex-1 rounded border px-2 py-1 h-10 w-full text-right"
                  placeholder="وارد کردن لینک..."
                />
              )}
            />
          </div>
        </div>

        {/* دکمه حذف */}
        <div className="col-span-1">
          <button type="button" className="p-1 rounded" onClick={() => remove(index)}>
            <Trash className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* نمایش پیام خطا */}
      {urlError && <span className="text-red-500 text-sm">{urlError}</span>}
      {errors.socialLinks?.[index]?.url && (
        <span className="text-red-500 text-sm">
          {errors.socialLinks[index].url.message}
        </span>
      )}
    </div>
  );
};

export default SocialLink;
