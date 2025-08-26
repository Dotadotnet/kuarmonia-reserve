"use client"
import Container from "@/components/shared/container/Container";
import Main from "@/layouts/Main";
import Image from "next/image";
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion"; // اضافه کردن framer-motion
import { useTranslations } from "next-intl";



export default function ContactPage() {
  const t = useTranslations("ContactUs");
  const locations = [
    {
      country: t("7"),
      address: "Gaziosmanpaşa kazım Özalp mahallesi kuleli Sokak no14/15",
      mapUrl:
        "https://maps.google.com/maps?q=Gaziosmanpa%C5%9Fa%20kaz%C4%B1m%20%C3%96zalp%20mahallesi%20kuleli%20Sokak%20no14/15&output=embed",
      image: "https://s3-console.kuarmonia.com/contact/8137993a-8f7f-404b-8d61-2646d9e24578.webp",
    },
    {
      country: t("8"),
      address: "65 Lillian St, ON, Toronto",
      mapUrl:
        "https://maps.google.com/maps?q=65%20Lillian%20st,ON.Toronto&output=embed",
      image: "https://s3-console.kuarmonia.com/contact/9191d5b1-cbed-46de-a2da-fbdfdef68628.webp",
    },
    {
      country: t("9"),
      address: "تهران، خیابان پاستور",
      mapUrl:
        "https://maps.google.com/maps?q=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%BE%D8%A7%D8%B3%D8%AA%D9%88%D8%B1&output=embed",
      image: "https://s3-console.kuarmonia.com/contact/0cc1bebe-827d-4df7-8dd3-50839223975b.webp",
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
      <Container>
        <ContactForm/>
        <section className="py-24 text-right">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  className="h-96 relative flex flex-col items-center border p-4 rounded-lg shadow-md"
                  whileInView={{ opacity: 1, y: 0 }} // وقتی وارد viewport می‌شود
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <motion.img
                    src={location.image}
                    alt={location.country}
                    className="w-full h-48 object-cover rounded-t-lg"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                    {location.country}
                  </h3>
                  <p className="mt-2 text-center">{location.address}</p>
                  <motion.iframe
                    src={location.mapUrl}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    className="mt-4 rounded-lg"
                    allowFullScreen
                    whileInView={{ opacity: 1 }} // وقتی وارد viewport می‌شود
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Container>
  );
}
