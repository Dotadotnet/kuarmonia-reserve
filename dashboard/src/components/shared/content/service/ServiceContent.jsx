import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import Tag from "@/components/icons/Tag";
import Timeline from "./growth-timeline";
import ServiceFaqs from "./ServiceFaqs";
export default function ServiceContent({ service }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 mt-4 z-40 relative scrollbar-hide h-screen overflow-y-auto">
      <main>
        <article>
          <header className="mx-auto mt-80 max-w-screen-lg rounded-t-primary bg-gray-100 dark:bg-gray-900 pt-16 text-center shadow-lg ">
            <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              {service?.title}
            </h1>
            <p className="mt-6 text-lg text-gray-700">{service?.summary}</p>
            <div className="mt-6 px-8 w-full overflow-x-auto scrollbar-hide flex justify-center gap-2">
              {service?.tags?.length > 0 ? (
                service?.tags.map((item) => (
                  <button
                    key={item.id}
                    className="rounded-lg px-1 flex justify-center items-center gap-x-2 bg-gray-100  py-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:bg-black"
                  >
                    <Tag className="w-4 h-4 text-gray-500" />
                    {item.value}
                  </button>
                ))
              ) : (
                <div className="flex items-center w-full justify-center gap-2 overflow-x-auto  scrollbar-hide">
                  <SkeletonText lines={1} />
                  <SkeletonText lines={1} />
                  <SkeletonText lines={1} />
                  <SkeletonText lines={1} />
                  <SkeletonText lines={1} />
                  <SkeletonText lines={1} />
                </div>
              )}
            </div>
            {service?.thumbnail ? (
              <img
                className="-z-10 absolute top-0 left-0 mt-10 h-96 w-full object-cover"
                src={service?.thumbnail}
                alt=""
              />
            ) : (
              <img
                className="-z-10 absolute top-0 left-0 mt-10 h-96 w-full object-cover"
                src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            )}
          </header>

          <div className="mx-auto max-w-screen-lg space-y-12 rounded-b-lg bg-gray-100 dark:bg-gray-900 px-8 pt-10 pb-20 font-serif text-lg tracking-wide text-gray-700 sm:shadow-lg">
            {service?.content ? (
              <div dangerouslySetInnerHTML={{ __html: service?.content }} />
            ) : (
              <SkeletonText lines={10} />
            )}
          </div>
        </article>
        <Timeline items={service?.roadmap} />
        <ServiceFaqs items={service?.faqs} />
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
