import Link from "next/link";
import React from "react";

const FooterItems = () => {
  const items = [
    {
      id: 1,
      name: "لینک‌های سریع",
      href: [
        {
          id: 11,
          name: "چگونه رزرو کنیم",
          href: "/how-to-book",
        },
        {
          id: 12,
          name: "نقشه سایت",
          href: "/site-map",
        },
        {
          id: 13,
          name: "فرصت‌های شغلی",
          href: "/careers",
        },
        {
          id: 14,
          name: "درباره ما",
          href: "/about-us",
        },
        {
          id: 15,
          name: "بلاگ‌ها",
          href: "/blogs",
        },
      ],
    },
    {
      id: 2,
      name: "خدمات",
      href: [
        {
          id: 21,
          name: "مهاجرت و ازدواج",
          href: "/marriage-immigration",
        },
        {
          id: 22,
          name: "مهاجرت و تحصیل",
          href: "/study-immigration",
        },
        {
          id: 23,
          name: "مهاجرت و مهارت",
          href: "/work-immigration",
        },
        {
          id: 24,
          name: "اخذ ویزا",
          href: "/visa",
        },
        
      ],
    },
    {
      id: 3,
      name: "پشتیبانی",
      href: [
        {
          id: 31,
          name: "تماس با ما",
          href: "/contact-us",
        },
        {
          id: 32,
          name: "اعلان قانونی",
          href: "/legal-notice",
        },
        {
          id: 33,
          name: "سوالات متداول",
          href: "/faqs",
        },
      ],
    },
  ];

  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 dark:text-gray-100 grid-cols-1 gap-4">
        {items.map(({ id, name, href }) => (
          <div key={id} className="flex flex-col gap-y-2">
            <h2 className="text-lg">{name}</h2>
            <ul className="text-sm flex flex-col gap-y-1">
              {href.map(({ id, name, href }) => (
                <li key={id} className="font-light">
                  <Link href={href}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterItems;
