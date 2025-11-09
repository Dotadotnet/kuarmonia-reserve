
"use client";
import { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Award,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AllReviews from "@/components/detail/AllReviews";
import {  useTranslations } from "next-intl";
import TagBox from "@/components/shared/utils/TagBox";
import Main from "@/layouts/Main";
const VisaTypeContent = ({ visaType, locale, relatedVisas }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState([]);
  const t = useTranslations("VisaType");
  console.log(visaType)
  const toggleFaq = (index) => {
    if (expandedFaq.includes(index)) {
      setExpandedFaq(expandedFaq.filter(indexSaved => indexSaved !== index));
    } else {
      setExpandedFaq([...expandedFaq, index]);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <Main>

      <div className="relative">
        <div className="h-64 md:h-72 overflow-hidden">
          <div className="h-64 md:h-72 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                width={1400}
                height={600}
                src={visaType.thumbnail?.url || "/placeholder.png"}
                alt={visaType.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_0%_/_0)_0%,hsl(0_0%_0%_/_0.8)_100%]" />
            </div>

            <div className={"absolute rtl:right-4 ltr:left-4 ring-4 dark:ring-gray-900 ring-white -bottom-10 w-20 h-20 bg-gradient-to-br from-primary to-primary rounded-full flex items-center justify-center dark:shadow-gray-500 text-white  shadow-lg"}>
              <Image
                width={300}
                height={300}
                src={visaType.creator?.avatar?.url || "/placeholder.png"}
                alt={visaType.creator?.name || "Creator"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div
            className={"absolute flex flex-col gap-y-2 top-12 right-8 text-white max-w-2xl rtl:right-8 ltr:left-8"}
          >
            <div className="flex items-center gap-3 mb-2">
              {/* <span className="text-4xl">{visaType.icon}</span> */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                {visaType.title}
              </h1>
            </div>
            <p className="text-base px-4 md:text-lg w-fit p-1 leading-relaxed">{visaType.summary}</p>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="md:col-span-9 col-span-12">
          <div className="bg-white dark:bg-gray-900 border-b px-4 md:px-8 flex flex-col gap-y-6 border-gray-200">
            <div className="flex flex-col justify-end items-end gap-4 pt-4">

              <div className="flex justify-between w-full mt-8">
                <div className="flex-1">
                  <h3 className=" dark:text-white text-gray-900">
                    {visaType.creator?.name || "Kuarmonia"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-100 text-sm">{visaType.creator?.bio || ""}</p>
                </div>
                <div className="text-center"></div>
              </div>

              <div className="w-full flex justify-start flex-nowrap  overflow-x-auto sm:px-1 gap-x-2 rtl-scrollbar">

                <button
                  onClick={() => scrollToSection("overview")}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 cursor-pointer font-medium text-sm transition-colors ${activeTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("FullView")}
                </button>
                <button
                  onClick={() => scrollToSection("conditions")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "conditions"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("FullCondition")}
                </button>
                <button
                  onClick={() => scrollToSection("advantages")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "advantages"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("Advantages")}
                </button>
                <button
                  onClick={() => scrollToSection("disadvantages")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "disadvantages"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("Disadvantages")}
                </button>
                <button
                  onClick={() => scrollToSection("costs")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "costs"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("Costs")}
                </button>
                <button
                  onClick={() => scrollToSection("durations")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "durations"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("Durations")}
                </button>
                <button
                  onClick={() => scrollToSection("steps")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "steps"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("StepsRequest")}
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className={`whitespace-nowrap py-3 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "faq"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {t("FrequentlyAskedQuestions")}
                </button>
              </div>


            </div>
          </div>

          <div className="p-4 md:p-6">
            <section id="overview" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                {/* <span className="text-3xl">{visaType.icon}</span> */}
                <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white">
                  {visaType.title}
                </h2>
              </div>
              <div className="prose max-w-none">
                <p
                  className="dark:text-gray-100 text-gray-800 leading-relaxed text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: visaType.content }}
                />
              </div>
            </section>

            <section id="conditions" className="mb-16">
              <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                {t("FullCondition")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visaType.conditions?.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border"
                  >
                    <span className="flex items-center h-full">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    </span>
                    <span className="text-gray-900 flex items-center dark:text-white text-sm md:text-base">{condition}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Advantages Section */}
            {visaType.advantages && visaType.advantages.length > 0 && (
              <section id="advantages" className="mb-16">
                <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                  {t("Advantages")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visaType.advantages.map((advantage, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700  bg-green-50 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="flex items-center h-full">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      </span>
                      <span className="text-gray-900 flex items-center dark:text-white text-sm md:text-base">{advantage}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Disadvantages Section */}
            {visaType.disadvantages && visaType.disadvantages.length > 0 && (
              <section id="disadvantages" className="mb-16">
                <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <X className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  {t("Disadvantages")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visaType.disadvantages.map((disadvantage, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="flex items-center h-full">
                        <X className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      </span>
                      <span className="text-gray-900 flex items-center dark:text-white text-sm md:text-base">{disadvantage}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">


              {/* Costs Section */}
              {processedCosts && processedCosts.length > 0 && (
                <section id="costs" className="mb-12">
                  <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                    {t("Costs")}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                        <tr>
                          <th className="px-4 py-3 text-right  text-gray-900 dark:text-white">
                            {t("Country")}
                          </th>
                          <th className="px-4 py-3 text-right  text-gray-900 dark:text-white">
                            {t("VisaFee")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {processedCosts.map((cost, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                              {cost.country}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                              {cost.fee}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Durations Section */}
              {visaType.durations && visaType.durations.length > 0 && (
                <section id="durations" className="mb-12">
                  <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                    {t("Durations")}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                        <tr>
                          <th className="px-4 py-3 text-right  text-gray-900 dark:text-white">
                            {t("Country")}
                          </th>
                          <th className="px-4 py-3 text-right  text-gray-900 dark:text-white">
                            {t("StayDuration")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {visaType.durations.map((duration, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                              {duration.country}
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                              {duration.validity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

            </div>

            <section id="steps" className="mb-12">
              <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                {t("StepsRequest")}
              </h2>
              <div className="space-y-6">
                {visaType.roadmap?.map((step, index) => (
                  <div key={index} className="relative">
                    {index !== visaType.roadmap.length - 1 && (
                      <div className={"absolute top-14 w-0.5 h-16 bg-gradient-to-b from-purple-300 rtl:right-6 ltr:left-6 to-purple-100 "}></div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center  text-base shadow-lg">
                        {index + 1}
                      </div>

                      <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border rounded-xl p-4 md:p-5 dark:shadow-gray-300 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h3 className=" text-gray-900 dark:text-white text-lg md:text-xl mb-2 md:mb-0">
                            {step.title}
                          </h3>
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium border border-blue-200">
                            <Clock className="w-4 h-4" />
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="mb-12">
              <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6">
                {t("FrequentlyAskedQuestions")}
              </h2>
              <div className="space-y-3">
                {visaType.faqs?.map((faq, index) => (
                  <div
                    key={index}
                    className="dark:bg-gray-800 bg-white rounded-xl overflow-hidden dark:border-gray-700 border-gray-100 border dark:shadow-gray-300 hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => { toggleFaq(index) }}
                      className="w-full text-right p-4 md:p-5 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className=" text-gray-900 dark:text-white text-base md:text-lg">
                        {faq.question}
                      </span>
                      {expandedFaq.includes(index) ? (
                        <ChevronUp className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                      )}
                    </button>
                    {expandedFaq.includes(index) && (
                      <div className="p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-whit border-t">
                        <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <br />
            <TagBox tags={visaType.tags} />
            <br />
            <AllReviews
              className="!px-0"
              targetId={visaType._id}
              targetType="visaType"
              reviews={
                Array.isArray(visaType.reviews) ? visaType.reviews : [visaType.reviews]
              }
            />
            {/* <section className="mb-12">
              <h2 className="text-xl md:text-2xl  text-gray-900 dark:text-white mb-6">
                {t("OtherVisas")}
              </h2>
              <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVisas.map((otherVisa) => {
                  const {
                    title,
                    summary,
                    slug,
                    processingTime,
                    validity,
                    difficultyLevel,
                    country
                  } =
                    otherVisa?.translations?.find(
                      (t) => t.translation?.language === locale
                      )?.translation?.fields || {};
                      return (
                        <Link
                      href={`/${locale}/visas/${otherVisa.visaId}/${otherVisa.slug_en}`}
                      key={otherVisa.id}
                      className="bg-white dark:bg-gray-800 dark:shadow-gray-400 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={otherVisa?.thumbnail.url}
                          alt={title}
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
                            <span>{country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className=" dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 text-sm mb-3 line-clamp-2">
                          {summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-800 dark:text-gray-100">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{processingTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>{otherVisa.rating}</span>
                          </div>
                          </div>
                          </div>
                          </Link>
                      );
                    })}
              </div>
            </section> */}
          </div>
        </div>
        {/* <div className="md:col-span-3 col-span-12 p-6 border-r border-gray-200 hidden lg:block">
          <section className="mb-16">
            <div className="md:grid grid-cols-1 gap-6">
              {relatedVisas.map((otherVisa) => {
                const {
                  title,
                  summary,
                  slug,
                  processingTime,
                  validity,
                  difficultyLevel,
                  country
                } =
                otherVisa?.translations?.find(
                  (t) => t.translation?.language === locale
                  )?.translation?.fields || {};
                return (
                  <Link
                    href={`/${locale}/visas/${otherVisa.visaId}/${otherVisa.slug_en}`}
                    key={otherVisa.id}
                    className="bg-white dark:shadow-gray-400 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                    >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                      priority={false}
                        quality={1}
                        width={400}
                        height={400}
                        alt={title}
                        src={otherVisa?.thumbnail.url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className={"absolute bottom-2 text-white text-sm" + (dir == "rtl" ? " right-2 " : " left-2 ")}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{country}</span>
                          </div>
                </div>
                </div>
                    <div className="p-4">
                      <h3 className=" dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-200 text-sm mb-3 line-clamp-2">
                        {summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-800 dark:text-gray-100">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{processingTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>{otherVisa.rating}</span>
              </div>
              </div>
          </div>
                  </Link>
                );
              })}
            </div>
          </section>
          </div> */}
      </div>
    </Main>
  );
};

export default VisaTypeContent;

