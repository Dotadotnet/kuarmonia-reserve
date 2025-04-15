"use client";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useGetTeamMebersQuery } from "@/services/teamMember/teamMemberApi";
function TeamMembers() {
  const [position, setPosition] = useState(0); // موقعیت خط (درصدی)

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex; // اندیس اسلاید فعلی
    const totalSlides = -swiper.slides.length; // تعداد کل اسلایدها
    const newPosition = (currentIndex / totalSlides) * 100; // محاسبه موقعیت جدید
    setPosition(newPosition); // به‌روزرسانی موقعیت
  };
  const { data, isLoading, error } = useGetTeamMebersQuery();

  const members = useMemo(() => data?.data || [], [data]);

  return (
    <section className="py-14 lg:py-24 relative mt-8 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-fit md:min-h-[400px]">
          <div className="absolute  bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
            <button
              id="prev-btn"
              className="p-2.5 group flex justify-center items-center text-gray-900 dark:text-white w-12 h-12 transition-all duration-500 rounded-full hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M11.6158 5L16.6669 10.0511M16.6669 10.0511L11.6158 15.1022M16.6669 10.0511L1.66699 10.0511"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>{" "}
            </button>
            {/* Progress Bar */}
            <div className="w-40 h-1 bg-gray-100 rounded-full relative">
              <div
                className="h-1 bg-indigo-600 rounded-full absolute top-0 right-0"
                style={{
                  width: "60%",
                  transform: `translateX(${position}%)`,
                  transition: "transform 0.5s ease"
                }}
              ></div>
            </div>
            <button
              id="next-btn"
              className="p-2.5 group flex justify-center items-center text-gray-900 w-12 h-12 dark:text-white transition-all duration-500 rounded-full hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.38413 15.1022L3.33301 10.0511M3.33301 10.0511L8.38413 5M3.33301 10.0511L18.3329 10.0511"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokelnejoin="round"
                />
              </svg>{" "}
            </button>
          </div>

          {/* Swiper */}
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            keyboard={{
              enabled: true
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.2, // نصف اسلاید بعدی هم معلوم باشه
                slidesPerGroup: 1
              },
              769: {
                slidesPerView: 2,
                slidesPerGroup: 2
              }
            }}
            scrollbar={true}
            navigation={{
              prevEl: "#prev-btn",
              nextEl: "#next-btn"
            }}
            pagination={false}
            modules={[Navigation, Pagination]}
          >
            {members.map((member, index) => (
              <SwiperSlide
                key={index}
                className="flex gap-2 border mb-16 dark:border-gray-100 border-gray-400 justify-between mr-4 rounded-primary"
              >
                <div className="swiper-slide  ">
                  <div className="group w-full flex-wrap flex items-center gap-8 transition-all duration-500 p-8 lg:flex-nowrap ">
                    <div className="w-full lg:w-48 h-64">
                      <Image
                        src={member.avatar.url}
                        alt={member.fullName}
                        width={600}
                        height={600}
                        className="rounded-2xl h-full object-cover object-top mx-auto lg:mx-0 lg:w-full"
                      />
                    </div>
                    <div className="text-center lg:text-right lg:max-w-xs flex-1">
                      <div className="mb-5 pb-5 border-b border-solid border-gray-300">
                        <h6 className="text-lg text-gray-900 dark:text-gray-100 mb-1">
                          {member.fullName}
                        </h6>
                        <span className="text-sm text-center text-gray-500 group-hover:text-indigo-600">
                          {member.position}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm text-justify leading-6 mb-7">
                        {member.description}
                      </p>
                      <div className="flex items-center gap-4 justify-center lg:justify-start max-sm:bottom-0 relative">
                        {member.socialLinks?.map((sosial, idx) => (
                          <a
                            key={idx}
                            href={sosial.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer text-gray-900 dark:text-gray-400 hover:text-white group w-12 h-12 rounded-full flex justify-center items-center dark:bg-black bg-gray-100 transition-all duration-500 hover:bg-indigo-600"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: sosial?.network?.icon
                              }}
                              className="w-7 h-7"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;
