import React from "react";
import Instagram from "./Instagram";
import Telegram from "./Telegram";
import WhatsApp from "./WhatsApp";
import Image from "next/image";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("ContactUs");

  return (
    <section className="py-24 mt-12 rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          {/* بخش تصویر و اطلاعات تماس */}
          <div className="h-fit relative">
            <div className="absolute top-1/2 md:right-64 md:translate-x-0 left-24 bg-white shadow-xl lg:p-6 p-4 rounded-2xl w-80 rtl">
              <div className="space-y-4" style={{ direction: 'ltr' }}>
                {/* شماره‌های تماس */}
                <a href="tel:+14376675933" className="flex items-center space-x-3 ltr" dir="ltr">
                  <FaPhone className="text-gray-700" size={20} />
                  <h5 className="text-black text-base font-normal ltr" dir="ltr">+1-437-667-5933</h5>
                </a>
                <a dir="ltr" href="tel:+905433575933" className="flex items-center space-x-3 ltr">
                  <FaPhone className="text-gray-700" size={20} />
                  <h5 className="text-black text-base font-normal">+90-543-357-5933</h5>
                </a>

                {/* آدرس‌ها */}
                <div className="border-t border-gray-100 pt-4 space-y-4" style={{ direction: 'ltr' }}>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-gray-700" size={20} />
                    <h5 className="text-black text-base font-normal">65 Lillian St, ON, Toronto, Canada</h5>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-gray-700" size={20} />
                    <h5 className="text-black text-base font-normal">تهران، خیابان پاستور، ایران</h5>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-gray-700" size={20} />
                    <h5 className="text-black text-base font-normal">Gaziosmanpaşa, Turkey</h5>
                  </div>
                </div>
              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="flex items-center justify-center border-t border-gray-100 pt-6">
                <a href="https://www.instagram.com/kuarmonia" className="mr-6"><Instagram /></a>
                <a href="https://t.me/kuarmonia" className="mr-6"><Telegram /></a>
                <a href="https://wa.me/kuarmonia" className="mr-6"><WhatsApp /></a>
              </div>
            </div>

            <Image
              src="https://s3-console.kuarmonia.com/contact/c5aa2fd0-5ef3-4b96-8133-2576f8ca95d5.webp"
              alt="📞 تماس با ما"
              height={609}
              width={348}
              className="w-full h-full lg:rounded-r-2xl rounded-2xl object-cover"
              priority
            />
          </div>

          {/* بخش فرم */}
          <div className="p-5 lg:p-11 lg:rounded-l-2xl h-fit rounded-2xl">
            <h1 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
              {t("1")}
            </h1>
            <input
              type="text"
              placeholder={t("2")}
              className="w-full h-12 rounded-2xl border p-4 mb-4"
            />
            <input
              type="text"
              placeholder={t("3")}
              className="w-full h-12 border rounded-2xl p-4 mb-4"
            />
            <input
              type="text"
              placeholder={t("4")}
              className="w-full h-12 border rounded-2xl p-4 mb-4"
            />
            <textarea
              placeholder={t("5")}
              className="w-full rounded-2xl h-24 border p-4 mb-4"
            />
            <button className="w-full h-12 rounded-2xl text-center bg-indigo-600 text-white">
              {t("6")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
