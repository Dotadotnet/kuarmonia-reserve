import React, { useEffect, useMemo } from "react";
import { useGetSosialLinksQuery } from "@/services/socialLink/socialLinkApi";
import toast from "react-hot-toast";
import IconOnlyDropdown from "@/components/shared/dropDown/IconOnlyDropdown";

const SocialLinksInput = ({ socialLinksData, setSocialLinksData }) => {
  const { data, isLoading, error } = useGetSosialLinksQuery();
  const socialLinks = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت دسته‌بندی شبکه اجتماعی...", {
        id: "socialLink-loading",
      });
    } else {
      toast.dismiss("socialLink-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message || "خطا در دریافت اطلاعات", {
        id: "socialLink-loading",
      });
    }
  }, [data, error, isLoading]);

  const handleAddSocialLink = () => {
    setSocialLinksData([...socialLinksData, { network: null, link: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    const updated = [...socialLinksData];
    updated.splice(index, 1);
    setSocialLinksData(updated);
  };

  const handleChangeNetwork = (index, value) => {
    const updated = [...socialLinksData];
    updated[index].network = value;
    setSocialLinksData(updated);
  };

  const handleChangeLink = (index, value) => {
    const updated = [...socialLinksData];
    updated[index].link = value;
    setSocialLinksData(updated);
  };

  return (
    <>
      {socialLinksData.map((item, index) => (
        <div key={index} className="flex gap-x-2 items-center w-full">
          {/* Dropdown شبکه اجتماعی */}
          <label className="flex flex-col gap-y-1 w-fit">
            <IconOnlyDropdown
              options={socialLinks}
              value={item.network}
              onChange={(value) => handleChangeNetwork(index, value)}
            />
          </label>

          {/* Input لینک */}
          <label className="flex flex-col gap-y-1 w-full">
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleChangeLink(index, e.target.value)}
              placeholder="مثلاً https://instagram.com/yourpage"
              className="p-2 rounded border"
            />
          </label>

          {/* دکمه حذف */}
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveSocialLink(index)}
              className="w-8 h-full bg-red-500 text-white rounded-full flex justify-center items-center"
            >
              ×
            </button>
          )}

          {/* دکمه افزودن */}
          {index === socialLinksData.length - 1 && (
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="w-8 h-full bg-green-500 text-white rounded-full flex justify-center items-center"
            >
              +
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default SocialLinksInput;
