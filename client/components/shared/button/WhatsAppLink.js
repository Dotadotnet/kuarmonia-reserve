"use client";
import WhatsApp from "@/app/[locale]/contact/WhatsApp";


export default function WhatsAppLink() {
  const whatsappUrl = "https://wa.me/905433575933";

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="inline-flex items-center cursor-pointer"
    >
<WhatsApp className={"text-green-500 "} fill="dark:black " />
    </div>
  );
}
