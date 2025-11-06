"use client";

import { useTranslations } from "next-intl";
import FloatingRequestButton from "@/components/shared/FloatingRequestButton";

export default function ServiceRequestPage() {
  const t = useTranslations("RequestForm");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          خدمات ما
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          ما خدمات تخصصی در زمینه ویزا، اقامت و خدمات مهاجرتی ارائه می‌دهیم. 
          برای دریافت مشاوره رایگان و ثبت درخواست، از دکمه زیر استفاده کنید.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              مشاوره ویزا
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              دریافت مشاوره تخصصی برای انواع ویزاهای کاری، تحصیلی و توریستی
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              اقامت دائم
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              راهنمایی برای اخذ اقامت دائم در کشورهای مختلف
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              خدمات مهاجرتی
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              خدمات جامع برای مهاجرت قانونی به کشورهای مختلف
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            چرا ما را انتخاب کنید؟
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>تجربه بالا در زمینه ویزا و مهاجرت</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>مشاوران متخصص و متعهد</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>پشتیبانی ۲۴ ساعته</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>نرخ‌های رقابتی و شفاف</span>
            </li>
          </ul>
        </div>
      </div>
      
      <FloatingRequestButton serviceType="service" />
    </div>
  );
}