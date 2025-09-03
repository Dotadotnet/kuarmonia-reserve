import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
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
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

const VisaPost = async ({ params }) => {
  const { id, locale } = await params;
  const visa = await Api(`/dynamic/get-one/visa/visaId/${id}`);
  const otherVisas = await Api(`/dynamic/get-all/visas?excludeId=${id}`); // دریافت سایر ویزاها
  const seoTranslations = await getTranslations("Seo");

  // مدیریت خطا اگر داده‌ها دریافت نشدند
  if (!visa) {
    return <div className="text-center p-8 text-red-600">داده‌ای برای نمایش وجود ندارد.</div>;
  }

  // توابع کمکی
  const getTypeIcon = (type) => (type === "tourist" ? <Plane className="w-4 h-4" /> : null);
  const getTypeLabel = (type) => (type === "tourist" ? "ویزای توریستی" : "نامشخص");
  const getDifficultyColor = (level) =>
    level === "متوسط" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-gray-50 text-gray-700 border-gray-200";

  // State برای مدیریت تب‌ها و FAQ
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showOtherVisas, setShowOtherVisas] = useState(false);
  const sectionRefs = {
    overview: useRef(null),
    requirements: useRef(null),
    documents: useRef(null),
    roadmap: useRef(null),
    faqs: useRef(null),
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <Main>
      <Container className="!px-0">
        <div className="relative">
          <div className="h-96 overflow-hidden">
            <Image
              width={900}
              height={800}
              src={visa.thumbnail.url}
              alt={visa.translations[locale].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute right-4 ring-4 ring-white -bottom-12 w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <Image
                width={300}
                height={300}
                src={visa.creator?.avatar?.url}
                alt={visa.creator.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute top-24 right-8 text-white max-w-2xl" dir="rtl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">{visa.translations[locale].country}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {visa.translations[locale].title}
              </h1>
              <p className="text-xl text-white leading-relaxed">
                {visa.translations[locale].summary}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 ">
            <div className="md:col-span-3 col-span-12 p-6 border-r border-gray-200 hidden lg:block" dir="rtl">
              <div className="md:grid hidden grid-cols-1 gap-6">
                {otherVisas?.filter((v) => v.id !== visa.id).map((otherVisa) => (
                  <div
                    key={otherVisa.id}
                    onClick={() => window.location.reload()}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                    dir="rtl"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={otherVisa.image}
                        alt={otherVisa.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 right-2 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{otherVisa.country}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {otherVisa.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {otherVisa.shortDescription}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{otherVisa.processingTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>{otherVisa.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* نمایش در موبایل */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowOtherVisas(!showOtherVisas)}
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                >
                  {showOtherVisas ? "بستن سایر ویزاها" : "نمایش سایر ویزاها"}
                </button>
                {showOtherVisas && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {otherVisas?.filter((v) => v.id !== visa.id).map((otherVisa) => (
                      <div
                        key={otherVisa.id}
                        onClick={() => window.location.reload()}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                        dir="rtl"
                      >
                        {/* ... (بخش مشابه بالا) */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-9 col-span-12">
              <div className="bg-white border-b px-4 md:px-8 flex flex-col gap-y-6 border-gray-200" dir="rtl">
                <div className="flex flex-col sm:flex-row items-between sm:items-center justify-end">
                  <div className="flex justify-end items-center gap-2" dir="rtl">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Eye className="w-5 h-5" />
                      <span>{visa.views.toLocaleString("fa-IR")} بازدید</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                      <Heart className="w-5 h-5" />
                      <span>{visa.likes.toLocaleString("fa-IR")} پسند</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 hidden md:flex ${
                            i < Math.floor(visa.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {visa.rating} ({visa.totalRatings.toLocaleString("fa-IR")} نظر)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex justify-between w-full">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">محمد احمدی</h3>
                      <p className="text-gray-600 text-sm">مشاور ویزا و مهاجرت • 10 سال تجربه</p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">95%</div>
                      <div className="text-xs text-gray-500">موفقیت</div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 overflow-x-auto" dir="rtl">
                      {["overview", "requirements", "documents", "roadmap", "faqs"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => scrollToSection(tab)}
                          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-5 transition-colors ${
                            activeTab === tab
                              ? "border-red-500 text-red-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                          dir="rtl"
                        >
                          {tab === "overview" && "نمای کلی"}
                          {tab === "requirements" && "شرایط کلی"}
                          {tab === "documents" && "مدارک مورد نیاز"}
                          {tab === "roadmap" && "مراحل درخواست"}
                          {tab === "faqs" && "سؤالات متداول"}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <section id="overview" ref={sectionRefs.overview} className="mb-16">
                  <div className="flex flex-wrap gap-3 mb-8" dir="rtl">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full border border-red-200">
                      {getTypeIcon(visa.type)}
                      <span className="font-medium">{getTypeLabel(visa.type)}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{visa.translations[locale].processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{visa.translations[locale].validity}</span>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getDifficultyColor(visa.translations[locale].difficultyLevel)}`}>
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">سطح دشواری: {visa.translations[locale].difficultyLevel}</span>
                    </div>
                  </div>
                  <div className="prose prose-lg max-w-none" dir="rtl">
                    <p className="text-gray-700 leading-relaxed text-lg">{visa.translations[locale].description}</p>
                  </div>
                </section>

                <section id="requirements" ref={sectionRefs.requirements} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3" dir="rtl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    شرایط کلی
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visa.translations[locale].conditions.map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        dir="rtl"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="documents" ref={sectionRefs.documents} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3" dir="rtl">
                    <FileText className="w-8 h-8 text-blue-600" />
                    مدارک مورد نیاز
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visa.translations[locale].documents.map((doc) => (
                      <div
                        key={doc.title}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4" dir="rtl">
                          <h3 className="font-semibold text-gray-900 text-lg">{doc.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              doc.type === "اجباری" || doc.type === "Mandatory" || doc.type === "Zorunlu"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {doc.type}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed" dir="rtl">{doc.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="roadmap" ref={sectionRefs.roadmap} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3" dir="rtl">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    مراحل درخواست
                  </h2>
                  <div className="space-y-8">
                    {visa.translations[locale].roadmap.map((step, index) => (
                      <div key={step.title} className="relative">
                        {index !== visa.translations[locale].roadmap.length - 1 && (
                          <div className="absolute right-6 top-16 w-0.5 h-20 bg-gradient-to-b from-purple-300 to-purple-100"></div>
                        )}
                        <div className="flex items-start gap-6" dir="rtl">
                          <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                              <h3 className="font-semibold text-gray-900 text-xl mb-2 md:mb-0">{step.title}</h3>
                              <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                                <Clock className="w-4 h-4" />
                                {step.duration}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="faqs" ref={sectionRefs.faqs} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8" dir="rtl">سؤالات متداول</h2>
                  <div className="space-y-4">
                    {visa.translations[locale].faqs.map((faq) => (
                      <div key={faq.question} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => toggleFaq(faq.question)}
                          className="w-full text-right p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                          dir="rtl"
                        >
                          <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                          {expandedFaq === faq.question ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {expandedFaq === faq.question && (
                          <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed text-lg" dir="rtl">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-16">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" dir="rtl">آمار و اطلاعات</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-bold">{visa.views.toLocaleString("fa-IR")}</h3>
                        <p className="text-gray-600">تعداد بازدیدها</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-bold">{visa.likes.toLocaleString("fa-IR")}</h3>
                        <p className="text-gray-600">تعداد پسندها</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-bold">{visa.rating.toFixed(1)}</h3>
                        <p className="text-gray-600">امتیاز میانگین</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8" dir="rtl">سایر ویزاها</h2>
                  <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherVisas?.filter((v) => v.id !== visa.id).map((otherVisa) => (
                      <div
                        key={otherVisa.id}
                        onClick={() => window.location.reload()}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                        dir="rtl"
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={otherVisa.image}
                            alt={otherVisa.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <div className="absolute bottom-2 right-2 text-white text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{otherVisa.country}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {otherVisa.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {otherVisa.shortDescription}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{otherVisa.processingTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span>{otherVisa.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default VisaPost;