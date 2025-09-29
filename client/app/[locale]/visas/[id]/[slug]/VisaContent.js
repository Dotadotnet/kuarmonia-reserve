"use client";

import { useState } from "react";
import {
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Star,
  MapPin,
  Plane,
  Shield,
  BarChart3,
  ArrowRight,
  User,
  Mail,
  Phone,
  Award,
  Menu,
  X,
  Send,
  Share
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AllReviews from "@/components/detail/AllReviews";
import ScrollInfinity from "@/components/shared/utils/ScrollInfinity";
import { useLocale, useTranslations } from "next-intl";
import language from "@/app/language";
import TagBox from "@/components/shared/utils/TagBox";

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
  console.log(visa);
  return (
    <>
      <div className="relative">
        <div className="h-[400px]  overflow-hidden">
          <div className="h-[400px] overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                width={900}
                height={800}
                src={visa.thumbnail.url}
                alt={visa.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(0_0%_0%_/_0)_0%,hsl(0_0%_0%_/_0.8)_100%)]" />
            </div>

            <div className={(dir == "rtl" ? " right-4 " : " left-4 ") + "absolute  ring-4  dark:ring-gray-900 ring-white -bottom-12 w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center dark:shadow-gray-500 text-white font-bold shadow-lg"} >
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
            className={"absolute flex flex-col gap-y-2 top-28 right-8 text-white max-w-2xl" + (dir == "rtl" ? " right-8 " : " left-8 ")}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              {" "}
              {visa.title}
            </h1>
            <p className="text-xl w-fit p-2  leading-relaxed">{visa.summary}</p>
            <div className="flex items-center space-x-2 text-white/90 mb-6">
              <MapPin size={20} />
              <span className="text-lg  font-medium">{visa.country.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className=" md:col-span-9 col-span-12 ">
          <div
            className=" bg-white dark:bg-gray-900 border-b  px-4 md:px-8 flex flex-col gap-y-6 border-gray-200 "
          >
            <div className="flex flex-col justify-end items-end gap-4 pt-4 ">
              <div className="flex justify-center items-center gap-4"  >
                <button
                  type="button"
                   className="bg-secondary hover:bg-secondary cursor-pointer hover:text-primary hover:border-primary border border-primary text-primary p-1.5 rounded-primary flex justify-center items-center transition-all delay-100 text-sm"
                >
                  <Share className="w-4 h-4 " />
                </button>
                <div className="flex items-center  gap-1 text-gray-600">
                  <Eye className="w-5 h-5" />
                  <span className=" ">
                    {visa?.views.toLocaleString("fa-IR")}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <Heart className="w-5 h-5" />
                  <span className=" ">
                    {visa?.likes.toLocaleString("fa-IR")}
                  </span>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      fill={i < 4 ? "currentColor" : "none"} // 👈 این مهمه
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex-1">
                  <h3 className="font-bold dark:text-white text-gray-900">
                    {visa.creator.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-100 text-sm">{visa.creator.bio}</p>
                </div>
                <div className="text-center"></div>
              </div>
              <div className=" w-full  flex justify-between">
                <div className="w-full flex justify-center sm:px-1">
                  <ScrollInfinity className={"before:to-white  dark:before:to-gray-900 after:to-white dark:after:to-gray-900"}>
                    <button
                      onClick={() => scrollToSection("overview")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 cursor-pointer font-medium text-sm  transition-colors ${activeTab === "overview"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FullView")}
                    </button>
                    <button
                      onClick={() => scrollToSection("conditions")}
                      className={`whitespace-nowrap py-4 px-1 cursor-pointer  border-b-2 font-medium text-sm transition-colors ${activeTab === "conditions"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FullCondition")}
                    </button>
                    <button
                      onClick={() => scrollToSection("documents")}
                      className={`whitespace-nowrap py-4 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "documents"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("RequireDocument")}
                    </button>
                    <button
                      onClick={() => scrollToSection("roadmap")}
                      className={`whitespace-nowrap py-4 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "roadmap"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("StepsRequest")}
                    </button>
                    <button
                      onClick={() => scrollToSection("faqs")}
                      className={`whitespace-nowrap py-4 px-1 cursor-pointer border-b-2 font-medium text-sm transition-colors ${activeTab === "faqs"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-700 hover:border-gray-300"
                        }`}
                       
                    >
                      {visaTranslations("FrequentlyAskedQuestions")}
                    </button>
                  </ScrollInfinity>
                </div>
                <div  className="md:flex hidden flex-row gap-x-2 items-center ">
                  <button
                    type="submit"
                     className="bg-secondary hover:bg-secondary cursor-pointer hover:text-primary hover:border-primary border border-primary text-primary p-1.5 rounded-primary flex justify-center items-center transition-all delay-100 text-sm w-full"
                  >
                    <Send className="w-4 h-4 mr-1 rtl:ml-1" />
                    {visaTranslations("Request")}
                  </button>
                  <button
                    type="button"
                     className="bg-secondary hover:bg-secondary cursor-pointer hover:text-primary hover:border-primary border border-primary text-primary p-1.5 rounded-primary flex justify-center items-center transition-all delay-100 text-sm"
                  >
                    <Share className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <section id="overview" className="mb-16">
              <ScrollInfinity className={"before:to-white  dark:before:to-gray-900 after:to-white dark:after:to-gray-900"} >
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full border border-red-200">
                  <span
                    className="w-4 h-4 text-red-500"
                    dangerouslySetInnerHTML={{ __html: visa.type?.icon }}
                  ></span>
                  <span className="font-medium">{visa.type.title}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{visa.processingTime}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{visa.validity}</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-yellow-50 text-yellow-700 border-yellow-200 `}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">{visa.difficultyLevel}</span>
                </div>
              </ScrollInfinity>
              <br />
              <div className="prose prose-lg max-w-none"  >
                <p
                  className="dark:text-gray-100 text-gray-800 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: visa.content }}
                ></p>
              </div>
            </section>
            <section id="conditions" className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                 
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
                {visaTranslations("FullCondition")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visa.conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-start   gap-4 p-6 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border "
                     
                  >
                    <span className="flex items-center h-full">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    </span>
                    <span className="text-gray-900 flex items-center dark:text-white text-lg">{condition}</span>
                  </div>
                ))}
              </div>
            </section>
            <section id="documents" className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                 
              >
                <FileText className="w-8 h-8 text-blue-600" />
                {visaTranslations("RequireDocument")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visa.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border  rounded-xl p-6 dark:shadow-gray-300 hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="flex items-start justify-between mb-4"
                       
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {doc.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${doc.type
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                      >
                        {doc.type}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-100 leading-relaxed"  >
                      {doc.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section id="roadmap" className="mb-16">
              <h2
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                 
              >
                <Calendar className="w-8 h-8 text-purple-600" />
                {visaTranslations("StepsRequest")}
              </h2>
              <div className="space-y-8">
                {visa.roadmap.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index !== visa.roadmap.length - 1 && (
                      <div className={"absolute top-16 w-0.5 h-20 bg-gradient-to-b from-purple-300 to-purple-100 " + (dir == "rtl" ? " right-6" : " left-6 ")}></div>
                    )}

                    <div className="flex items-start gap-6"  >
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>

                      <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border  rounded-xl p-6 dark:shadow-gray-300 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-xl mb-2 md:mb-0">
                            {step.title}
                          </h3>
                          <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                            <Clock className="w-4 h-4" />
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id="faqs" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8"  >
                {visaTranslations("FrequentlyAskedQuestions")}
              </h2>
              <div className="space-y-4">
                {visa.faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white shadow-gray-400 border rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => { toggleFaq(index) }}
                      className="w-full text-right p-6  dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                       
                    >
                      <span className="font-semibold text-gray-900 dark:text-white text-lg">
                        {faq.question}
                      </span>
                      {expandedFaq.includes(index) ? (
                        <ChevronUp className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                      )}
                    </button>
                    {expandedFaq.includes(index) && (
                      <div className="p-6 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-whit border-t ">
                        <p
                          className="text-gray-700 dark:text-gray-100 leading-relaxed text-lg"
                           
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <br />
            <TagBox tags={visa.tags} />
            <br />
            <AllReviews
              className="!px-0"
              targetId={visa._id}
              targetType="visa"
              reviews={
                Array.isArray(visa.reviews) ? visa.reviews : [visa.reviews]
              }
            />{" "}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8"  >
                {visaTranslations("OtherVisas")}
              </h2>
              <div className="md:grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((otherVisa) => {
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
                        <h3 className="font-bold dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
          </div>
        </div>
        <div
          className="md:col-span-3 col-span-12  p-6 border-r border-gray-200 hidden lg:block"
           
        >
          <section className="mb-16">
            <div className="md:grid  grid-cols-1  gap-6">
              {related.map((otherVisa) => {
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
                      <div className={"absolute bottom-2  text-white text-sm" + (dir == "rtl" ? " right-2 " : " left-2 ")}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold dark:text-white text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
        </div>
      </div>
    </>
  );
};

export default VisaContent;
