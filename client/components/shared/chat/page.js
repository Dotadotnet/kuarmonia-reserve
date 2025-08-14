"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useTranslations, useLocale } from "next-intl";

function WhatsAppWidget() {
  const t = useTranslations("whatsapp");
  const lang = useLocale();
  return (
    <div>
      <FloatingWhatsApp
        accountName={t("accountName")}
        phoneNumber="+14376675933"
        chatMessage={t("chatMessage")}
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar="/assets/marjan.jpg"
      />
    </div>
  );
}

export default WhatsAppWidget;
