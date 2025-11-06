"use client";

import { useState } from "react";
import {
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  MapPin,
  Award,
  X,
  BarChart3,
  Send,
  Share
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AllReviews from "@/components/detail/AllReviews";
import { useLocale, useTranslations } from "next-intl";
import language from "@/app/language";
import TagBox from "@/components/shared/utils/TagBox";
import FloatingRequestButton from "@/components/shared/FloatingRequestButton";
import "./Style.css"
const VisaContent = ({ visa, locale, related }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState([]);
  const toggleFaq = (index) => {
    if (expandedFaq.includes(index)) {
      setExpandedFaq(expandedFaq.filter(indexSaved => indexSaved !== index))
    } else {
      setExpandedFaq([...expandedFaq, index]);
    }
  };
  console.log(visa)
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visaTranslations = useTranslations("Visa")

  const lang = useLocale();
  const class_lang = new language(lang);
  const dir = class_lang.getInfo().dir;

  console.log("visa",visa)
  return (
    <>
      <div className="relative">
        <div className="h-56 md:h-96 overflow-hidden">
          <div className="h-56 md:h-96 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                width={1400}
                height={600}
                src={visa.thumbnail.url}
                alt={visa.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 " />
            </div>

            <div className={(dir == "rtl" ? " right-4 " : " left-4 ") + "absolute rtl:right-4 ltr:left-4 ring-4 dark:ring-gray-900 ring-white -bottom-8 w-16 h-16 bg-gradient-to-br from-primary to-primary rounded-full flex items-center justify-center dark:shadow-gray-500 text-white  shadow-lg"}
            >
              <Image
                width={300}
                height={300}
                src={visa.creator?.avatar?.url}
                alt={visa.creator.name}
                className="w-full h-full rounded-full object-cover"
              />{" "}
              </div>
          </div>

          <div
            className={"absolute flex flex-col gap-y-1 top-24 right-6 text-white max-w-2xl" + (dir == "rtl" ? " right-6 " : " left-6 ")}
          >
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                {visa.title}
              </h1>
            </div>
            <p className="text-base md:text-lg w-fit p-1 leading-relaxed">{visa.summary}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className=" md:col-span-9 col-span-12 ">
          <div
            className=" bg-white dark:bg-gray-900 border-b  px-4 md:px-6 flex flex-col gap-y-4 border-gray-200 "
          >
            <div className="flex flex-col justify-end items-end gap-3 pt-3 ">
              <div className="flex justify-center items-center gap-3"  >
                <button
                  type="button"
                   className="bg-secondary hover:bg-secondary cursor-pointer hover:text-primary hover:border-primary border border-primary text-primary p-1 rounded-primary flex justify-center items-center transition-all delay-100 text-sm"
                >
                  <Share className="w-4 h-4 " />
                </button>
               
                  <FloatingRequestButton serviceType="visa" specificTypeId={visa._id} />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      fill={i < 4 ? "currentColor" : "none"} // 👈 این مهمه
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between w-full mt-6">
                <div className="flex-1">
                  <h3 className=" dark:text-white text-gray-900 text-sm md:text-base">
                    {visa.creator.name || "Kuarmonia"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-100 text-xs md:text-sm">{visa.creator.bio || ""}</p>
                </div>
                <div className="text-center"></div>
              </div>
              <div className=" w-full  flex justify-between">
                <div className="w-full flex justify-start flex-nowrap  overflow-x-auto sm:px-1 gap-x-1 rtl-scrollbar">
                  <div className="flex gap-1 overflow-auto">
                    <button
                      onClick={() => scrollToSection("overview")}
                      className={`whitespace-nowrap py-2 px-1 border-b-2 cursor-pointer font-medium text-sm transition-colors ${activeTab === "overview"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FullView")}
                    </button>
                    <button
                      onClick={() => scrollToSection("conditions")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "conditions"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FullCondition")}
                    </button>
                    <button
                      onClick={() => scrollToSection("advantages")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "advantages"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("Advantages")}
                    </button>
                    <button
                      onClick={() => scrollToSection("disadvantages")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "disadvantages"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("Disadvantages")}
                    </button>
                    <button
                      onClick={() => scrollToSection("costs")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "costs"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("Costs")}
                    </button>
                    <button
                      onClick={() => scrollToSection("documents")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "documents"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("RequireDocument")}
                    </button>
                    <button
                      onClick={() => scrollToSection("roadmap")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "roadmap"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("StepsRequest")}
                    </button>
                    <button
                      onClick={() => scrollToSection("faqs")}
                      className={`whitespace-nowrap py-2 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "faqs"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FrequentlyAskedQuestions")}
                    </button>
                  </div>
                </div>
                <div  className="md:flex hidden flex-row gap-x-2 items-center ">
                  <button
                    type="button"
                     className="bg-secondary hover:bg-secondary cursor-pointer hover:text-primary hover:border-primary border border-primary text-primary p-1 rounded-primary flex justify-center items-center transition-all delay-100 text-sm"
                  >
                    <Share className="w-4 h-4 " />
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div className="p-3 md:p-5">
            <section id="overview" className="mb-8">
              <div className={"flex items-center justify-start gap-2 flex-wrap"} >
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs">
                  <span
                    className="w-3 h-3 text-primary"
                    dangerouslySetInnerHTML={{ __html: visa.type?.icon }}
                  ></span>
                  <span className="font-medium">{visa.type.title}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{visa.processingTime}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">{visa.validity}</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border bg-primary/10 text-primary border-primary/20 text-xs`}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span className="font-medium">{visa.difficultyLevel}</span>
                </div>
              </div>
              <br />
              <div className="prose prose-base max-w-none"  >
                <p
                  className="dark:text-gray-100 text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: visa.content }}
                ></p>
              </div>
            </section>
            <section id="conditions" className="mb-8">
              <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                {visaTranslations("FullCondition")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visa.conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex w-fit items-start gap-2 p-3 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white rounded-lg shadow-sm hover:shadow transition-shadow border"
                     
                  >
                    <span className="flex items-center h-full">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    </span>
                    <span className="text-gray-900 flex items-center dark:text-white text-sm">{condition}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rejection Reasons Section - Updated to use primary color only */}
            {visa.rejectionReasons && visa.rejectionReasons.length > 0 && (
              <section id="rejection-reasons" className="mb-8 md:hidden">
                <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  {visaTranslations("RejectionReasons")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                      <tr>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("Reason")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {visa.rejectionReasons.map((reason, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <X className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{reason}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Success Tips Section - Updated to use primary color only */}
            {visa.successTips && visa.successTips.length > 0 && (
              <section id="success-tips" className="mb-8 md:hidden">
                <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  {visaTranslations("SuccessTips")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                      <tr>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("Tip")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {visa.successTips.map((tip, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{tip}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Combined Rejection Reasons and Success Tips Section for Desktop - Using only primary color */}
            {(visa.rejectionReasons && visa.rejectionReasons.length > 0) || 
             (visa.successTips && visa.successTips.length > 0) ? (
              <section className="mb-8 hidden md:grid md:grid-cols-2 gap-6">
                {/* Rejection Reasons Card - Using only primary color */}
                {visa.rejectionReasons && visa.rejectionReasons.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <X className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("RejectionReasons")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.rejectionReasons.map((reason, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-2 p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <X className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-900 dark:text-white text-sm">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Tips Card - Using only primary color */}
                {visa.successTips && visa.successTips.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("SuccessTips")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.successTips.map((tip, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-2 p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-900 dark:text-white text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ) : null}

            {/* Advantages Section - Updated to table layout with primary color */}
            {visa.advantages && visa.advantages.length > 0 && (
              <section id="advantages" className="mb-8 md:hidden">
                <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  {visaTranslations("Advantages")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                      <tr>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("Advantage")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {visa.advantages.map((advantage, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{advantage}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Disadvantages Section - Updated to table layout with primary color */}
            {visa.disadvantages && visa.disadvantages.length > 0 && (
              <section id="disadvantages" className="mb-8 md:hidden">
                <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  {visaTranslations("Disadvantages")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                      <tr>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("Disadvantage")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {visa.disadvantages.map((disadvantage, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <X className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{disadvantage}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Combined Advantages and Disadvantages Section for Desktop - Using only primary color */}
            {(visa.advantages && visa.advantages.length > 0) || 
             (visa.disadvantages && visa.disadvantages.length > 0) ? (
              <section className="mb-8 hidden md:grid md:grid-cols-2 gap-6">
                {/* Advantages Card - Using only primary color */}
                {visa.advantages && visa.advantages.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("Advantages")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.advantages.map((advantage, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-2 p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-900 dark:text-white text-sm">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Disadvantages Card - Using only primary color */}
                {visa.disadvantages && visa.disadvantages.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <X className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("Disadvantages")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.disadvantages.map((disadvantage, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-2 p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <X className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-900 dark:text-white text-sm">{disadvantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ) : null}

            {/* Costs Section - Updated to use primary color */}
            {visa.costs && visa.costs.length > 0 && (
              <section id="costs" className="mb-8 md:hidden">
                <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  {visaTranslations("Costs")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                      <tr>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("Title")}
                        </th>
                        <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                          {visaTranslations("VisaFee")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {visa.costs.map((cost, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-3 py-2 text-gray-900 dark:text-white">
                            {cost.title}
                          </td>
                          <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                            {cost.fee}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section id="documents" className="mb-8 md:hidden">
              <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                {visaTranslations("RequireDocument")}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-xs md:text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                    <tr>
                      <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                        {visaTranslations("Title")}
                      </th>
                      <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                        {visaTranslations("Description")}
                      </th>
                      <th className="px-3 py-2 text-right text-gray-900 dark:text-white font-medium">
                        {visaTranslations("Type")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {visa.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-3 py-2 text-gray-900 dark:text-white font-medium">
                          {doc.title}
                        </td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                          {doc.description}
                        </td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${doc.type
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                              }`}
                          >
                            {doc.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Combined Costs and Documents Section for Desktop - Updated to use primary color */}
            {(visa.costs && visa.costs.length > 0) || 
             (visa.documents && visa.documents.length > 0) ? (
              <section className="mb-8 hidden md:grid md:grid-cols-2 gap-6">
                {/* Costs Card - Updated to use primary color */}
                {visa.costs && visa.costs.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("Costs")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.costs.map((cost, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-center p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-primary/5 border border-primary/20 rounded-lg"
                          >
                            <span className="text-gray-900 dark:text-white text-sm font-medium">{cost.title}</span>
                            <span className="text-gray-900 dark:text-white text-sm">{cost.fee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Card - Updated to use primary color */}
                {visa.documents && visa.documents.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                      <h3 className="text-lg md:text-xl text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        {visaTranslations("RequireDocument")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {visa.documents.map((doc, index) => (
                          <div 
                            key={index} 
                            className="p-3 dark:bg-gray-700/50 dark:border-gray-600 border-gray-100 bg-white border border-gray-200 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-gray-900 dark:text-white text-sm font-medium">{doc.title}</h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${doc.type
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-gray-100 text-gray-600 border border-gray-200"
                                  }`}
                              >
                                {doc.type}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-xs">{doc.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ) : null}

            <section id="roadmap" className="mb-8">
              <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                {visaTranslations("StepsRequest")}
              </h2>
              <div className="space-y-4">
                {visa.roadmap.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index !== visa.roadmap.length - 1 && (
                      <div className={"absolute top-10 w-0.5 h-12 bg-gradient-to-b from-primary/30 to-primary/10 " + (dir == "rtl" ? " right-5" : " left-5 ")}></div>
                    )}

                    <div className="flex items-start gap-3"  >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm shadow">
                        {index + 1}
                      </div>

                      <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border rounded-lg p-3 md:p-4 dark:shadow-gray-300 hover:shadow transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="text-gray-900 dark:text-white text-base md:text-lg mb-1 md:mb-0">
                            {step.title}
                          </h3>
                          <span className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                            <Clock className="w-3 h-3" />
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id="faqs" className="mb-8">
              <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4">
                {visaTranslations("FrequentlyAskedQuestions")}
              </h2>
              <div className="space-y-2">
                {visa.faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="dark:bg-gray-800 bg-white rounded-lg overflow-hidden dark:border-gray-700 border-gray-100 border dark:shadow-gray-300 hover:shadow transition-shadow"
                  >
                    <button
                      onClick={() => { toggleFaq(index) }}
                      className="w-full text-right p-3 md:p-4 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                       
                    >
                      <span className="text-gray-900 dark:text-white text-sm md:text-base">
                        {faq.question}
                      </span>
                      {expandedFaq.includes(index) ? (
                        <ChevronUp className="w-4 h-4 dark:text-gray-300 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 dark:text-gray-300 text-gray-600" />
                      )}
                    </button>
                    {expandedFaq.includes(index) && (
                      <div className="p-3 md:p-4 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border-t">
                        <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <div className="my-6">
              <TagBox tags={visa.tags} />
            </div>
            <AllReviews
              className="!px-0"
              targetId={visa._id}
              targetType="visa"
              reviews={
                Array.isArray(visa.reviews) ? visa.reviews : [visa.reviews]
              }
            />{" "}
            <section className="mb-6">
              <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-4">
                {visaTranslations("OtherVisas")}
              </h2>
              <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((otherVisa) => {
                  return (
                    <Link
                      href={`/${locale}/visas/${otherVisa.visaId}/${otherVisa.slug_en}`}
                      key={otherVisa._id}
                      className="bg-white dark:bg-gray-800 dark:shadow-gray-400 rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 overflow-hidden group"
                       
                    >
                      <div className="relative h-28 overflow-hidden">
                        <Image
                          src={otherVisa?.thumbnail?.url || "/placeholder.png"}
                          alt={otherVisa.title}
                          priority={false}
                          quality={1}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className={"absolute bottom-2 text-white text-sm" + (dir == "rtl" ? " right-2" : " left-2 ")}>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{otherVisa.country?.title}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className=" dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm">
                          {otherVisa.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 text-xs mb-2 line-clamp-2">
                          {otherVisa.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-800 dark:text-gray-100">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{otherVisa.processingTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>{otherVisa.rating || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        <div
          className="md:col-span-3 col-span-12  p-4 border-r border-gray-200 hidden lg:block"
           
        >
          <section className="mb-6">
            <div className="md:grid grid-cols-1 gap-3">
              {related.map((otherVisa) => {
                return (
                  <Link
                    href={`/${locale}/visas/${otherVisa.visaId}/${otherVisa.slug_en}`}
                    key={otherVisa._id}
                    className="bg-white dark:shadow-gray-400 dark:bg-gray-800 rounded-md shadow-sm hover:shadow transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 overflow-hidden group"
                     
                  >
                    <div className="relative h-24 overflow-hidden">
                      <Image
                        priority={false}
                        quality={1}
                        width={400}
                        height={400}
                        alt={otherVisa.title}
                        src={otherVisa?.thumbnail?.url || "/placeholder.png"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className={"absolute bottom-2 text-white text-xs" + (dir == "rtl" ? " right-2 " : " left-2 ")}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{otherVisa.country?.title}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <h3 className=" dark:text-white text-gray-900 mb-1 group-hover:text-blue-600 transition-colors text-xs">
                        {otherVisa.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-200 text-xs mb-1.5 line-clamp-2">
                        {otherVisa.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-800 dark:text-gray-100">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{otherVisa.processingTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>{otherVisa.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VisaContent;
