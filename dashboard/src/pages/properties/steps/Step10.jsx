import React from "react";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput"; // ایمپورت کامپوننت جدید

const Step10 = ({ register, errors, control, setSocialLinksData, socialLinksData }) => {

  return (
    <>
      <label htmlFor="socialLinks" className="flex w-full flex-col gap-y-2">
        افزودن لینک‌های شبکه‌های اجتماعی
        <div className="flex flex-col gap-y-4 w-full">
          
          {/* کامپوننت ورودی لینک شبکه‌های اجتماعی */}
          <SocialLinksInput
            socialLinksData={socialLinksData}
            setSocialLinksData={setSocialLinksData}
          />
          
        </div>
      </label>
    </>
  );
};

export default Step10;
