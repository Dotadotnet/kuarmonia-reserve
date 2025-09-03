'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const locales = [
  { code: 'fa', label: '🇮🇷 فارسی' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'tr', label: '🇹🇷 Türkçe' }
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // مسیر فعلی رو تکه‌تکه می‌کنیم و locale رو حذف می‌کنیم
  const pathParts = pathname.split('/');
  const currentLocale = pathParts[1];
  const restOfPath = pathParts.slice(2).join('/');

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {locales.map(({ code, label }) => (
        <Link
          key={code}
          rel="nofollow"
          href={`/${code}/${restOfPath}`}
          style={{
            fontWeight: code === currentLocale ? 'bold' : 'normal',
            textDecoration: 'none'
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
