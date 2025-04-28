
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const FooterItems = () => {
  const t = useTranslations('ForAll')
  const items = [
    {
      id: 1,
      name: t('11'),
      href: [
        {
          id: 11,
          name: t('12'),
          href: "/how-to-book",
        },
        {
          id: 12,
          name: t('13'),
          href: "/site-map",
        },
        {
          id: 13,
          name: t('14'),
          href: "/careers",
        },
        {
          id: 14,
          name: t('4'),
          href: "/about-us",
        },
        {
          id: 15,
          name: t('2'),
          href: "/blogs",
        },
      ],
    },
    {
      id: 2,
      name: t('15'),
      href: [
        {
          id: 21,
          name: t('16'),
          href: "/marriage-immigration",
        },
        {
          id: 22,
          name: t('17'),
          href: "/study-immigration",
        },
        {
          id: 23,
          name: t('18'),
          href: "/work-immigration",
        },
        {
          id: 24,
          name: t('19'),
          href: "/visa",
        },
        
      ],
    },
    {
      id: 3,
      name: t('20'),
      href: [
        {
          id: 31,
          name: t('3'),
          href: "/contact-us",
        },
        {
          id: 32,
          name: t('21'),
          href: "/legal-notice",
        },
        {
          id: 33,
          name: t('22'),
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
