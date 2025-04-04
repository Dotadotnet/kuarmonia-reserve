import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoHomeOutline,
  IoNewspaperOutline,
  IoReceiptOutline,
  IoInformationCircleOutline,
  IoCallOutline, // اضافه کردن آیکون تماس
} from "react-icons/io5";

const LargeMenu = () => {
  const menuItems = [
    { id: 1, label: "خانه", icon: <IoHomeOutline size={24} />, href: "/" },
    { id: 2, label: "وبلاگ", icon: <IoReceiptOutline size={24} />, href: "/blog" },
    { id: 3, label: "تماس با ما", icon: <IoCallOutline size={24} />, href: "/contact" }, // استفاده از آیکون تماس
    { id: 4, label: "درباره ما", icon: <IoInformationCircleOutline size={24} />, href: "/about" },
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
      <div className="bg-neutral rounded-primary hidden md:flex">
        <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
          <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white dark:bg-gray-800 overflow-x-auto scrollbar-hide">
            {menuItems.map((menuItem) => (
              <Link key={menuItem.id} href={menuItem.href}>
                <button
                  className={
                    "text-sm text-black dark:text-gray-100 w-44 text-center h-10 flex flex-row items-center gap-x-1 px-8 py-2 justify-center rounded-secondary border border-transparent" +
                    (selectMenu === menuItem.label ? " bg-black text-white" : "")
                  }
                  onClick={() => setSelectMenu(menuItem.label)}
                >
                  {menuItem.icon}
                  {menuItem.label}
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
