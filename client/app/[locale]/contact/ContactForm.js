"use client"
import Image from "next/image";
import Phone from "@/components/icons/Phone";
import Email from "@/components/icons/Email";
import Whatsapp from "@/components/icons/Whatsapp";
import Telegram from "@/components/icons/Telegram";
import Instagram from "@/components/icons/Instagram";
import LTRText from "@/components/shared/LTRText";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "@/services/contact/contactApi";

const ContactForm = () => {
  const t = useTranslations("ContactUs");
  const [createContact, { isLoading, data, error }] = useCreateContactMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (isLoading) {
      toast.loading(t("submitting"), { id: "contact-submit" });
    }

    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "contact-submit" });
      // Reset form
      reset();
    }

    if (data && !data.acknowledgement) {
      toast.error(data.description, { id: "contact-submit" });
    }

    if (error?.data) {
      toast.error(error?.data?.description || t("errorMessage"), { id: "contact-submit" });
    }
  }, [isLoading, data, error]);

  const onSubmit = async (formData) => {
    await createContact(formData).unwrap();
  };

  return (
    <div dir="ltr" className="container mx-auto px-4 py-24 !ltr">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image and Contact Info */}
        <div className="lg:w-1/2">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/assets/about/aboutus.jpg"
              alt="Contact Us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="text-primary w-8 h-8 text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t("phone")}</h3>
                <a href="tel:+14376675933" className="text-gray-600 dark:text-gray-300 block">
                  <LTRText>+1(437)667-5933</LTRText>
                </a>
                <a href="tel:+905433575933" className="text-gray-600 dark:text-gray-300 block">
                  <LTRText>+90 543 357 5933</LTRText>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Whatsapp className="text-primary w-8 h-8 text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
                <a href="https://wa.me/14376675933" className="text-gray-600 dark:text-gray-300 block">
                  <LTRText>+1(437)667-5933</LTRText>
                </a>
                <a href="https://wa.me/905433575933" className="text-gray-600 dark:text-gray-300 block">
                  <LTRText>+90 543 357 5933</LTRText>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Email className="text-primary w-8 h-8 text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t("email")}</h3>
                <a href="mailto:info@kuarmonia.com" className="text-gray-600 dark:text-gray-300 block">info@kuarmonia.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Telegram className="text-primary w-8 h-8 text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">Telegram</h3>
                <a href="https://t.me/kuarmonia" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 block">@kuarmonia</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:col-span-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Instagram className="text-primary w-8 h-8 text-xl" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white">Instagram</h3>
                <a href="https://instagram.com/kuarmonia" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 block">@kuarmonia</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="lg:w-1/2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("title")}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t("description")}</p>
            
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder={t("enterName")}
                  />
                  {errors.name && <span className="text-red-500 text-sm mt-1">{t("nameRequired")}</span>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder={t("enterEmail")}
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">{t("emailRequired")}</span>}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  placeholder={t("enterSubject")}
                />
                {errors.subject && <span className="text-red-500 text-sm mt-1">{t("subjectRequired")}</span>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: true })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                  placeholder={t("enterMessage")}
                ></textarea>
                {errors.message && <span className="text-red-500 text-sm mt-1">{t("messageRequired")}</span>}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50"
              >
                {t("send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;