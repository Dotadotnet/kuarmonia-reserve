import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoReceiptOutline,
  IoInformationCircleOutline,
  IoCallOutline, // اضافه کردن آیکون تماس
} from "react-icons/io5";
import { useTranslations } from "next-intl";

const LargeMenu = () => {
  const t = useTranslations("ForAll")
  const menuItems = [
    { id: 1, label: t("1"), icon: <IoHomeOutline size={24} />, href: "/" },
    { id: 2, label: t("2"), icon: <IoReceiptOutline size={24} />, href: "/blog" },
    { id: 3, label: t("3"), icon: <IoCallOutline size={24} />, href: "/contact" }, // استفاده از آیکون تماس
    { id: 4, label: t("4"), icon: <IoInformationCircleOutline size={24} />, href: "/about" },
  ];

  // مقداردهی پیش‌فرض به صفحه‌ی جاری
  const [selectMenu, setSelectMenu] = useState("");

  useEffect(() => {
    // پیدا کردن آیتمی که آدرسش با مسیر فعلی یکی است
    const currentMenu = menuItems.find((item) => item.href === window.location.pathname);
    if (currentMenu) {
      setSelectMenu(currentMenu.label);
    }
  }, []); // فقط یکبار در بارگذاری اولیه انجام می‌شود.

  return (
    <nav className=" col-span-9 justify-center rounded-primary hidden md:flex w-full">
      <div className=" rounded-primary hidden md:flex">
        <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
          <div className="flex flex-row justify-center gap-x-4  p-1 rounded-secondary bg-white border border-gray-200 dark:border-gray-600  dark:bg-gray-800 overflow-x-auto scrollbar-hide">
            {menuItems.map((menuItem) => (
              <Link key={menuItem.id} href={menuItem.href}>
                <button
                  className={
                    "text-sm text-black dark:text-gray-100 w-44 text-center h-10 flex flex-row ltr:flex-row-reverse items-center gap-x-1 px-8 py-2 justify-center rounded-secondary border border-transparent" +
                    (selectMenu === menuItem.label ? " bg-black text-white" : "")
                  }
                  onClick={() => setSelectMenu(menuItem.label)}
                >
                  {menuItem.icon}
                  <span className="flex h-full items-center">
                  {menuItem.label}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LargeMenu;
