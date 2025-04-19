import "./globals.css";
import Auth from "./auth";
import Session from "./session";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Screen from "@/components/shared/loading/Screen";
import ThemeProvider from "@/utils/ThemeContext";

export const metadata = {
  metadataBase: new URL("https://kuarmonia.com"), // لینک سایت
  title: "مهاجرت و گردشگری با کارمونیا – راهی به سوی آینده بهتر",
  description:
    "با اطلاعات کامل در مورد مهاجرت، ازدواج، و زندگی در ترکیه و کانادا. نکات کلیدی، شرایط قانونی، و خدمات مشاوره برای زوج‌ها و خانواده‌ها.",
  openGraph: {
    title: "مهاجرت و ازدواج در ترکیه و کانادا",
    description:
      "راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره.",
    url: "https://kuarmonia.com",
    siteName: "مهاجرت و ازدواج در ترکیه و کانادا",
    images:
      "https://s3-console.kuarmonia.com/main/e58b2333-8860-4f68-a9a2-522004e2cfe8.webp", // لینک تصویر
    locale: "fa_IR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@kuarmonia",
    title: "مهاجرت و ازدواج در ترکیه و کانادا",
    description:
      "راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره.",
    image:
      "https://s3-console.kuarmonia.com/main/84a10727-61b7-4199-91bf-12989c4e575a.webp" // لینک تصویر
  },
  pinterest: {
    richPin: true,
    title: "مهاجرت و ازدواج در ترکیه و کانادا",
    description:
      "راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره.",
    image:
      "https://s3-console.kuarmonia.com/main/84a10727-61b7-4199-91bf-12989c4e575a.webp" // لینک تصویر
  },
  links: [
    {
      rel: "alternate",
      href: "https://kuarmonia.com",
      hreflang: "fa"
    },
    {
      rel: "preload",
      href: "/fonts/vazir/Vazir.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous"
    },
    {
      rel: "preload",
      href: "/fonts/DigiNozha/DigiNozha2Bold.woff2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous"
    },
    {
      rel: "canonical",
      href: "https://kuarmonia.com"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body dir="rtl" >
        <Screen />
        <Providers>
          <ThemeProvider>
            <Session>
              <Auth>
                {children}
              </Auth>
            </Session>
          </ThemeProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
