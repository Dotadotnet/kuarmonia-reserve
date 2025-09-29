"use client"
import React, { useState, useRef, useEffect } from "react";
import {
  FiChevronDown as ChevronDown,
  FiChevronUp as ChevronUp,
  FiTruck as Truck,
  FiGift as Gift,
  FiShield as Shield,
  FiStar as Star,
  FiHeart as Heart
} from "react-icons/fi";
import SEOHead from "./SEOHead";
import {
  siteConfig,
  conclusion,
  getLocalizedIntroData
} from "./Data";

export default function HomeIntroSection({ params }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const contentRef = useRef(null);
  const [contentMaxHeight, setContentMaxHeight] = useState("0px");
  const locale = params?.locale || 'fa';
  const { hero, about, seo, keyFeatures, productCategories, additionalCategories } = getLocalizedIntroData(locale);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setContentMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentMaxHeight("0px");
    }
  }, [isExpanded]);
  return (
    <>
      <SEOHead
        title={`${hero.title} | مهاجرت، ویزا، ازدواج بین‌المللی و رزرو هتل`}
        description={`${hero.subtitle} — ${hero.description}`}
        keywords="کارمونیا, مهاجرت, ویزا, ویزای شنگن, ویزای دانشجویی, ویزای کاری, ازدواج بین‌المللی, رزرو هتل, مشاوره مهاجرتی, ترجمه رسمی"
        canonical={siteConfig.siteUrl}
      />
      <div
        className=" p-4 md:p-8"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
           
            {/* Subtitle and description merged into about preview below */}
          </div>

          {/* About Section */}
          <div className="overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-800">درباره کارمونیا</h2>
              {isExpanded && (
                <button
                  onClick={toggleExpand}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  بستن
                </button>
              )}
            </div>

            {/* Preview (collapsed state) */}
            {!isExpanded && (
              <div className="relative p-6 pt-4">
                <div className="text-gray-700 leading-relaxed max-h-72 overflow-hidden">
                  {`${hero.subtitle} ${hero.description} ${about.introduction.content} ${conclusion.content}`}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                <button
                  onClick={toggleExpand}
                  className="absolute -bottom-1  z-10 text-indigo-600 hover:text-indigo-800 text-sm  p-2 rounded-md  "
                >
                  مشاهده بیشتر
                </button>
              </div>
            )}

            {/* Collapsible Content */}
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
              style={{ maxHeight: contentMaxHeight }}
            >
              <div ref={contentRef} className="p-0 space-y-8">
                {/* Main Content */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                  {/* Introduction */}
                  <div className="p-0">
                    <p className="text-base">
                      {`${hero.subtitle} ${hero.description} ${about.introduction.content} ${conclusion.content}`}
                    </p>
                  </div>

                  {/* Key Features (moved below intro) */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6"
                    role="region"
                    aria-label="ویژگی‌های کلیدی"
                  >
                    {keyFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl text-center border border-gray-200 bg-white"
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <h3 className="font-semibold text-gray-800">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Section */}
                  <div className="p-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {about.features.title}
                    </h3>
                    <p className="text-base">{about.features.content}</p>
                  </div>

                  {/* Fast Delivery Section */}
                  <div className="p-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {about.delivery.title}
                    </h3>
                    <p className="text-base">{about.delivery.content}</p>
                  </div>

                  {/* Special Offers Section */}
                  <div className="p-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {about.offers.title}
                    </h3>
                    <p className="text-base">{about.offers.content}</p>
                  </div>

                  {/* Product Categories */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    role="region"
                    aria-label="دسته‌بندی محصولات"
                  >
                    {productCategories.map((category, index) => (
                      <div
                        key={category.id}
                        className="p-6 rounded-xl border border-gray-200 bg-white"
                      >
                        <h4
                          className="text-xl font-bold text-gray-800 mb-3"
                        >
                          {category.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Additional Categories */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      سایر محصولات و خدمات
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {additionalCategories.map((category, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <span className="font-semibold">
                            {category.title}:
                          </span>{" "}
                          {category.description}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Long SEO description */}
                  <div className="text-gray-600 text-sm leading-7">
                    {seo}
                  </div>
                </div>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </>
  );
}
