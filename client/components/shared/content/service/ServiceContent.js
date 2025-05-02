import React from "react";

import { FaTag } from "react-icons/fa";
import Timeline from "./growth-timeline";
import ServiceFaqs from "./ServiceFaqs";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function ServiceContent({ service }) {
  console.log(service);
  const locale = useLocale();
  const {title,content,summary,roadmap,faqs} = service.translations.find((t) => t.language === locale)?.translation.fields || {};
console.log(title,content,summary,roadmap,faqs);
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mt-4 z-40 relative scrollbar-hide h-screen overflow-y-auto">
      <main>
        <article>
          <header className="mx-auto mt-80 max-w-screen-lg rounded-t-primary bg-gray-100 dark:bg-gray-900 pt-16 text-center shadow-lg ">
          <div className="flex items-center mt-14 justify-center text-center">
              <div className="text-gray-700 mt-6 md:mt-0">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600  font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl"> {service?.creator?.name}</span>
                  </a>
                </p>
                <p className="text-center text-sm mt-1">
                  <span className="font-medium">
                    {new Date(service?.createdAt).toLocaleDateString("fa-IR", {
                      weekday: "long"
                    })}{" "}
                    - {new Date(service?.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="mt-2 text-4xl text-center font-bold text-gray-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text- text-center text-gray-700">{summary}</p>
            <div className="mt-6 px-8 w-full overflow-x-auto scrollbar-hide flex justify-center gap-2">
              {service?.tags?.length > 0 && (
                service?.tags.map((item) => (
                  <button
                    key={item.id}
                    className="rounded-lg px-1 flex justify-center items-center gap-x-2 bg-gray-100  py-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:bg-black"
                  >
                    <FaTag className="w-4 h-4 text-gray-500" />
                    {item.value}
                  </button>
                ))
              )}
            </div>
            {service?.thumbnail && (
              <Image
                width={600}
                height={144}
                className="-z-10 absolute top-0 left-0 mt-10 h-96 w-full object-cover"
                src={service?.thumbnail.url}
                alt=""
              />
            )}
          </header>
          <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
            {!service.creator?.avatar && (
              <div className="profile-container dark:!border-gray-600 text-center shine-effect rounded-full flex justify-center mb-4">
                <SkeletonImage
                  height={100}
                  width={100}
                  showSize={false}
                  borderRadius="rounded-full"
                />
              </div>
            )}

            {service.creator?.avatar && (
              <div className="profile-container text-center shine-effect rounded-full flex justify-center mb-4">
                <Image
                  width={300}
                  height={300}
                  src={service.creator?.avatar?.url}
                  alt="avatar"
                  className="h-[100px] w-[100px] profile-pic rounded-full text-center"
                />
              </div>
            )}
          </div>
          <div className="mx-auto max-w-screen-lg space-y-12 rounded-b-lg bg-gray-100 dark:bg-gray-900 px-8 pt-10 pb-20 font-serif text-lg tracking-wide text-gray-700 sm:shadow-lg ">
            {content && (
              <div className="text-justify" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </article>
        <Timeline items={roadmap} />
        <ServiceFaqs items={faqs} />
      </main>

      <div className="w-fit mx-auto mt-10 flex space-x-2">
        <div className="h-0.5 w-2 bg-gray-600"></div>
        <div className="h-0.5 w-32 bg-gray-600"></div>
        <div className="h-0.5 w-2 bg-gray-600"></div>
      </div>

      <aside
        aria-label="Recent Posts"
        className="mx-auto mt-10 max-w-screen-xl py-20"
      >
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              جدیدترین مطالب مهاجرت
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              جدیدترین نکات و راهنمایی‌ها درباره مهاجرت، زندگی در کشورهای مختلف
              و فرصت‌های بین‌المللی را اینجا دنبال کنید.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="#"
                className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  loading="lazy"
                  alt="مهاجرت به طبیعت"
                  className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                />
              </a>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="#"
                    className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                  >
                    راهنمای کامل مهاجرت به کشورهای اروپایی
                  </a>
                </h2>

                <p className="text-gray-500">
                  مراحل و نکات کلیدی برای موفقیت در فرآیند مهاجرت به اروپا و
                  چگونگی اخذ ویزای کار و تحصیل.
                </p>

                <div>
                  <a
                    href="#"
                    className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                  >
                    مطالعه بیشتر
                  </a>
                </div>
              </div>
            </article>

            <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="#"
                className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  loading="lazy"
                  alt="زندگی در کشورهای خارجی"
                  className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                />
              </a>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="#"
                    className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                  >
                    چالش‌ها و فرصت‌های زندگی در کانادا
                  </a>
                </h2>

                <p className="text-gray-500">
                  بررسی شرایط زندگی، کار و تحصیل در کانادا و راهکارهای موفقیت
                  مهاجران تازه‌وارد.
                </p>

                <div>
                  <a
                    href="#"
                    className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                  >
                    مطالعه بیشتر
                  </a>
                </div>
              </div>
            </article>

            <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="#"
                className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1496395031280-4201b0e022ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  loading="lazy"
                  alt="مهاجرت تحصیلی"
                  className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                />
              </a>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="#"
                    className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                  >
                    راهنمای مهاجرت تحصیلی و بورس‌های بین‌المللی
                  </a>
                </h2>

                <p className="text-gray-500">
                  همه چیز درباره نحوه اخذ پذیرش دانشگاه‌های معتبر و دریافت
                  بورسیه‌های تحصیلی خارجی.
                </p>

                <div>
                  <a
                    href="#"
                    className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                  >
                    مطالعه بیشتر
                  </a>
                </div>
              </div>
            </article>

            <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="#"
                className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1510081887155-56fe96846e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                  loading="lazy"
                  alt="مهاجرت کاری"
                  className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                />
              </a>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="#"
                    className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                  >
                    فرصت‌های مهاجرت کاری در کشورهای مختلف
                  </a>
                </h2>

                <p className="text-gray-500">
                  معرفی بازار کار و مشاغل پرتقاضا برای مهاجران در سال ۲۰۲۲.
                </p>

                <div>
                  <a
                    href="#"
                    className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                  >
                    مطالعه بیشتر
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </aside>
    </div>
  );
}
