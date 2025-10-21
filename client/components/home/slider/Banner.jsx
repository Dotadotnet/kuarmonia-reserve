import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function VisaBanner() {
  const t = useTranslations("HomePage");

  return (
 <div className="w-full px-4 mt-6 md:hidden overflow-visible">
  <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-4 flex items-center relative z-30">
    {/* 3D effect for the banner */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-800/20 rounded-xl"></div>

    <div className="w-2/3 pr-4 text-white relative z-10">
      <h3 className="text-lg mb-2">{t("visaBanner.title")}</h3>
      <p className="text-sm">{t("visaBanner.description")}</p>
    </div>

    {/* تصویر بیرون از بنر */}
    <div className="w-1/3 absolute -top- left-8 z-50 overflow-visible">
      <Image
        src="/assets/home-page/banner/visa.png"
        alt="Visa and Residency Services"
        width={130}
        height={130}
        className="rounded-lg scale-150 object-contain"
      />
    </div>
  </div>
</div>

  );
}