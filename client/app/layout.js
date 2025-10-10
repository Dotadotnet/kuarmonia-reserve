import "./globals.css";

export const metadata = {
  title: {
    template: '%s | کارمونیا',
    default: 'کارمونیا - مهاجرت و گردشگری راهی به سوی آینده بهتر'
  },
  description: 'کارمونیا ارائه دهنده خدمات مهاجرت، ویزا، ازدواج بین‌المللی و رزرو هتل',
  keywords: 'کارمونیا, مهاجرت, ویزا, ازدواج بین‌المللی, رزرو هتل, مشاوره مهاجرتی',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
