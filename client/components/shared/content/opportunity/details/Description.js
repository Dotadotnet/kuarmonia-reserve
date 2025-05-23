import React from "react";
import { useLocale } from "next-intl";
import Check from "@/components/icons/Check";
import ShieldCheck from "@/components/icons/ShieldCheck";

const ListSection = ({ title, items, fallback }) => (
  <section>
    <div
      className="text-white gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500 justify-start text-sm text-nowrap"
    >
      <span className="w-8 h-8 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
        <ShieldCheck className="text-blue-500" aria-hidden="true" />
      </span>
      <h4 className="text-xl flex" aria-labelledby={`${title}-heading`}>
        <span id={`${title}-heading`}>{title}</span>
      </h4>
    </div>
    <ul className="list-disc list-inside">
      {items?.length > 0 ? (
        items.map((item, index) => (
          <li key={index} className="min-w-10 icon-list flex items-center gap-1">
            <Check className="text-green-500 w-6 h-6" aria-hidden="true" /> {item}
          </li>
        ))
      ) : (
        <li>{fallback}</li>
      )}
    </ul>
  </section>
);

const Description = ({ opportunity }) => {
  const locale = useLocale();
  const translation = opportunity?.translations?.find(
    (t) => t.language === locale
  )?.translation;

  return (
    <div className="p-4 flex flex-col gap-y-4" dir="rtl">
      <section>
        <div
          className="text-white gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500 justify-start text-sm text-nowrap"
        >
          <span className="w-8 h-8 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
            <ShieldCheck className="text-blue-500" aria-hidden="true" />
          </span>
          <h4 className="text-xl flex" aria-labelledby="description-heading">
            <span id="description-heading">توضیحات</span>
          </h4>
        </div>
        <div>
          <p className="text-justify leading-8">
            {translation?.fields?.description || "بدون توضیحات"}
          </p>
        </div>
      </section>

      <ListSection
        title="مزایا"
        items={translation?.fields?.benefits}
        fallback="بدون مزایا"
      />
      <ListSection
        title="مسئولیت‌ها"
        items={translation?.fields?.responsibilities}
        fallback="بدون مسئولیت‌ها"
      />
      <ListSection
        title="شرایط"
        items={translation?.fields?.qualifications}
        fallback="بدون شرایط"
      />
      <ListSection
        title="مدارک"
        items={translation?.fields?.documents}
        fallback="بدون مدارک"
      />

      {opportunity?.tags?.length > 0 && translation?.fields?.skills && (
        <section>
          <div
            className="text-white gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500 justify-start text-sm text-nowrap"
          >
            <span className="w-8 h-8 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
              <ShieldCheck className="text-blue-500" aria-hidden="true" />
            </span>
            <h4 className="text-xl flex" aria-labelledby="tags-heading">
              <span id="tags-heading">برچسب‌ها</span>
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {opportunity.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {translation.fields.skills[index] || tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(Description);