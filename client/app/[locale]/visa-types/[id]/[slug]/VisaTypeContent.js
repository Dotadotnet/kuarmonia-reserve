
"use client"
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
  Share,
  Globe,
  BookOpen,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import language from "@/app/language";
import TagBox from "@/components/shared/utils/TagBox";
import VisaCard from "@/components/shared/card/VisaCard";

const VisaTypeContent = ({ visaType, locale, relatedVisas }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState([]);
  const t = useTranslations("VisaType");

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

  const lang = useLocale();
  const class_lang = new language(lang);
  const dir = class_lang.getInfo().dir;

  const { title, summary, content } = visaType?.translations?.find(
    (t) => t.language === locale
  )?.translation?.fields || {};

  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          {visaType.thumbnail?.url && (
            <Image
              src={visaType.thumbnail.url}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0  bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
              <p className="text-xl max-w-3xl mx-auto">{summary}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: "overview", label: t("FullView"), icon: Globe },
                { id: "conditions", label: t("FullCondition"), icon: CheckCircle },
                { id: "documents", label: t("RequireDocument"), icon: FileText },
                { id: "steps", label: t("StepsRequest"), icon: ArrowRight },
                { id: "faq", label: t("FrequentlyAskedQuestions"), icon: BookOpen }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Section */}
              <section id="overview" className="mb-12">
                <h2 className="text-3xl font-bold mb-6">{t("FullView")}</h2>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </section>

              {/* Conditions Section */}
              {visaType.conditions && visaType.conditions.length > 0 && (
                <section id="conditions" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{t("FullCondition")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visaType.conditions.map((condition, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Documents Section */}
              {visaType.documents && visaType.documents.length > 0 && (
                <section id="documents" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{t("RequireDocument")}</h2>
                  <div className="space-y-4">
                    {visaType.documents.map((doc, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{doc.description}</p>
                        {doc.type && (
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {doc.type}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Steps Section */}
              {visaType.roadmap && visaType.roadmap.length > 0 && (
                <section id="steps" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{t("StepsRequest")}</h2>
                  <div className="space-y-6">
                    {visaType.roadmap.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{step.description}</p>
                          {step.duration && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              {visaType.faqs && visaType.faqs.length > 0 && (
                <section id="faq" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{t("FrequentlyAskedQuestions")}</h2>
                  <div className="space-y-4">
                    {visaType.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className="font-semibold">{faq.question}</span>
                          {expandedFaq.includes(index) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        {expandedFaq.includes(index) && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Visas */}
              {relatedVisas.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">{t("OtherVisas")}</h3>
                  <div className="space-y-4">
                    {relatedVisas.slice(0, 3).map((visa) => {
                      const visaTitle = visa?.translations?.find(
                        (t) => t.language === locale
                      )?.translation?.fields?.title;
                      
                      return (
                        <Link
                          key={visa._id}
                          href={`/${locale}/visas/${visa.visaId}/${visa.slug_en}`}
                          className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold mb-2">{visaTitle}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {visa.country} • {visa.processingTime}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              {visaType.tags && visaType.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">تگ‌ها</h3>
                  <TagBox tags={visaType.tags} />
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{t("Request")}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  برای دریافت مشاوره رایگان در مورد این نوع ویزا با ما تماس بگیرید.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  درخواست مشاوره
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaTypeContent;
