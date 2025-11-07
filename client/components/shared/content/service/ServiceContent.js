import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import ServiceRoadmap from "./ServiceRoadmap";
import ServiceFaqs from "./ServiceFaqs";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import Main from "@/layouts/Main";
import parse from "html-react-parser";
import FloatingRequestButton from "@/components/shared/FloatingRequestButton";

export default function ServiceContent({ service }) {
  const locale = useLocale();
  const t = useTranslations("Service");

  return (
    <Main>
      <div className="dark:bg-gray-800 z-40 relative scrollbar-hide h-screen overflow-y-auto">
        <main>
          <article>
            {/* Thumbnail at the top, behind the article header */}
            {service?.thumbnail && (
              <div className="absolute top-0 left-0 w-full h-96 z-0">
                <Image
                  fill
                  className="object-cover"
                  src={service?.thumbnail.url}
                  alt={service?.title || "Service thumbnail"}
                />
             
              </div>
            )}
            
            <header className="mx-auto mt-[320px] max-w-screen-lg rounded-t-primary dark:bg-gray-900 bg-white pt-16 text-center relative z-10">

              <div className="absolute right-4 top-4">
                <FloatingRequestButton serviceType="service" specificTypeId={service?._id} />


              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-gray-700 mt-6 md:mt-0 text-center">
                  <a
                    href="#"
                    rel="nofollow"
                    className="text-indigo-600 font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl text-center">
                      {" "}
                      {service?.creator?.name}
                    </span>
                  </a>
                  <p className="text-center text-sm mt-1">
                    <span className="font-medium">
                      {service?.createdAt ? new Date(service?.createdAt).toLocaleDateString(locale, {
                        weekday: "long"
                      }) : ""}{" "}
                      - {service?.createdAt ? new Date(service?.createdAt).toLocaleDateString(locale) : ""}
                    </span>
                  </p>
                </div>
         
              </div>
              <h1 className="mt-2 text-4xl text-center sm:text-5xl font-bold">
               {service?.title}
              </h1>
              <p className="mt-6 md:text-md text-sm  text-center ">{service?.summary}</p>
            </header>
            
            <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
              {!service?.creator?.avatar?.url && (
                <div className="profile-container dark:!border-gray-600 text-center shine-effect rounded-full flex justify-center mb-4">
                  <SkeletonImage
                    height={100}
                    width={100}
                    showSize={false}
                    borderRadius="rounded-full"
                  />
                </div>
              )}

              {service?.creator?.avatar?.url && (
                <div className="profile-container text-center shine-effect rounded-full flex justify-center mb-4">
                  <Image
                    width={300}
                    height={300}
                    src={service.creator.avatar.url}
                    alt="avatar"
                    className="h-[100px] w-[100px] profile-pic rounded-full text-center"
                  />
                </div>
              )}
            </div>
            
            <div className="mx-auto bg-white max-w-screen-lg space-y-12 rounded-b-lg dark:bg-gray-900 md:px-8 px-2 pb-20 text-base md:text-lg tracking-wide text-gray-700 dark:text-white sm:shadow-lg">
              {/* What You Will Read Section - Moved to top */}
              {service?.whatYouWillRead && service.whatYouWillRead.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl  mb-6 text-gray-900 dark:text-white">
                    {t('whatYouWillRead')}
                  </h2>
                  <ul className="space-y-3">
                    {service.whatYouWillRead.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 ltr:mr-2 rtl:ml-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
             {service?.content && (
  <div className="text-justify text-sm md:text-base">
    {parse(service.content)}
  </div>
)}
              
              {/* Roadmap Section */}
              {service?.roadmap && service.roadmap.length > 0 && (
                <ServiceRoadmap roadmap={service.roadmap} />
              )}
              
              {/* FAQ Section */}
              {service?.faqs && service.faqs.length > 0 && (
                <ServiceFaqs items={service.faqs} />
              )}
            </div>
          </article>
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
              <h2 className="mb-4 text-center text-2xl  text-gray-800 md:mb-6 lg:text-3xl">
                {t('latestMigrationArticles')}
              </h2>
              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                {t('latestMigrationArticlesDesc')}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
              <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                <a
                  href="#"
                  rel="nofollow"
                  className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                >
                  <img
                    src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    loading="lazy"
                    alt={t('natureMigration')}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </a>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                  <h2 className="text-xl  text-gray-800">
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                    >
                      {t('europeMigrationGuide')}
                    </a>
                  </h2>

                  <p className="text-gray-500">
                    {t('europeMigrationGuideDesc')}
                  </p>

                  <div>
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                    >
                      {t('readMore')}
                    </a>
                  </div>
                </div>
              </article>

              <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                <a
                  href="#"
                  rel="nofollow"
                  className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                >
                  <img
                    src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    loading="lazy"
                    alt={t('livingAbroad')}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </a>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                  <h2 className="text-xl  text-gray-800">
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                    >
                      {t('canadaChallenges')}
                    </a>
                  </h2>

                  <p className="text-gray-500">
                    {t('canadaChallengesDesc')}
                  </p>

                  <div>
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                    >
                      {t('readMore')}
                    </a>
                  </div>
                </div>
              </article>

              <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                <a
                  href="#"
                  rel="nofollow"
                  className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                >
                  <img
                    src="https://images.unsplash.com/photo-1496395031280-4201b0e022ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    loading="lazy"
                    alt={t('studyMigration')}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </a>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                  <h2 className="text-xl  text-gray-800">
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                    >
                      {t('studyMigrationGuide')}
                    </a>
                  </h2>

                  <p className="text-gray-500">
                    {t('studyMigrationGuideDesc')}
                  </p>

                  <div>
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                    >
                      {t('readMore')}
                    </a>
                  </div>
                </div>
              </article>

              <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                <a
                  href="#"
                  rel="nofollow"
                  className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                >
                  <img
                    src="https://images.unsplash.com/photo-1510081887155-56fe96846e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                    loading="lazy"
                    alt={t('workMigration')}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </a>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">۲ اردیبهشت ۱۴۰۱</span>

                  <h2 className="text-xl  text-gray-800">
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-600 transition duration-100 hover:text-rose-500"
                    >
                      {t('workMigrationOpportunities')}
                    </a>
                  </h2>

                  <p className="text-gray-500">
                    {t('workMigrationOpportunitiesDesc')}
                  </p>

                  <div>
                    <a
                      href="#"
                      rel="nofollow"
                      className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600"
                    >
                      {t('readMore')}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </aside>
      </div>
    </Main>
  );
}