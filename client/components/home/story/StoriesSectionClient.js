"use client";

import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from "react-icons/fa";
import Image from "next/image";
import { useLocale } from "next-intl";

const gradientClasses = [
  "from-pink-500 to-fuchsia-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-lime-500",
  "from-violet-500 to-pink-500",
  "from-amber-400 to-red-500",
  "from-rose-400 to-indigo-500"
];

export default function StoriesSectionClient({ banners }) {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const lang = useLocale();
  const isRtl = lang === "fa"; // فرض می‌کنیم زبان فارسی RTL است

  const openStories = (banner) => {
    setSelectedBanner(banner);
    setCurrentStoryIndex(0);
    setIsPlaying(true);
    setProgress(0);
  };

  const closeStories = () => {
    setSelectedBanner(null);
    setIsPlaying(false);
    setProgress(0);
  };

  const nextStory = () => {
    if (selectedBanner && currentStoryIndex < selectedBanner.stories.length - 1) {
      setCurrentStoryIndex((i) => i + 1);
      setProgress(0);
    } else {
      closeStories();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const getTranslation = (translations, field, fallback = "") => {
    const translation = translations?.find((t) => t.language === lang)?.translation?.fields?.[field];
    return translation || fallback;
  };

  // مدیریت نوار پیشرفت
  useEffect(() => {
    let timer;
    if (
      selectedBanner &&
      isPlaying &&
      selectedBanner.stories[currentStoryIndex]?.media.type !== "video"
    ) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + (100 / (10 * 60)); // 10 ثانیه برای پر شدن نوار (60 فریم در ثانیه)
        });
      }, 1000 / 60); // به‌روزرسانی هر 16.67 میلی‌ثانیه برای انیمیشن روان
    }
    return () => clearInterval(timer);
  }, [selectedBanner, currentStoryIndex, isPlaying]);

  // مدیریت توقف پخش هنگام بستن یا تغییر استوری
  useEffect(() => {
    if (!selectedBanner) {
      setProgress(0);
    }
  }, [selectedBanner]);

  return (
    <section className="pt-24 overflow-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex py-2 gap-6 overflow-x-auto scrollbar-hide flex-nowrap px-2 justify-center no-scrollbar">
          {banners.map((banner) => {
            const randomGradient =
              gradientClasses[Math.floor(Math.random() * gradientClasses.length)];

            return (
              <div
                key={banner._id}
                onClick={() => openStories(banner)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative w-16 h-16 group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-tr ${randomGradient} transition-transform duration-500 group-hover:scale-[1.04]`}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-[4px]">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
                      <Image
                        width={200}
                        height={200}
                        alt={getTranslation(banner.translations, "title", banner.creator.name)}
                        src={banner.thumbnail.url}
                        priority={false}
                        quality={1}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <span className="text-sm font-medium text-gray-900 font-bold dark:text-white mt-2 max-w-20 truncate text-center">
                  {getTranslation(banner.translations, "title", banner.creator.name)}
                </span>
              </div>
            );
          })}
        </div>

        {selectedBanner && (
          <div className="fixed inset-0 bg-black z-[9999999999999999999999999999] flex items-center justify-center">
            <div className="relative w-full h-full max-w-md mx-auto bg-black">
              {/* نوارهای پیشرفت */}
              <div className="absolute top-2 left-4 right-4 z-20 flex gap-1">
                {selectedBanner.stories.map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1 bg-gray-500/50 rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-white transition-all duration-[10000ms] ease-linear"
                      style={{
                        width: `${
                          index === currentStoryIndex
                            ? progress
                            : index < currentStoryIndex
                            ? 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* هدر */}
              <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    width={150}
                    height={150}
                    src={selectedBanner.stories[currentStoryIndex].creator.avatar.url}
                    alt={"author"}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {getTranslation(
                        selectedBanner.stories[currentStoryIndex].creator.translations,
                        "name",
                        selectedBanner.stories[currentStoryIndex].creator.name
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedBanner.stories[currentStoryIndex].media.type === "video" && (
                    <>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                      >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                      >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                    </>
                  )}
                  <button
                    onClick={closeStories}
                    className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* مدیا */}
              <div className="relative w-full h-full">
                {selectedBanner.stories[currentStoryIndex].media.type === "video" ? (
                  <video
                    src={selectedBanner.stories[currentStoryIndex].media.url}
                    className="w-full h-full object-cover"
                    autoPlay={isPlaying}
                    muted={isMuted}
                    controls={false}
                    onEnded={nextStory}
                  />
                ) : (
                  <Image
                    width={800}
                    height={1280}
                    src={selectedBanner.stories[currentStoryIndex].media.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* ناوبری */}
              <button
                onClick={prevStory}
                className={`absolute rtl:right-4 ltr:left-4 top-0 w-1/3 h-full z-10 flex items-center rtl:justify-start ltr:justify-end opacity-0 hover:opacity-100`}
                disabled={currentStoryIndex === 0}
              >
                <FaChevronRight
                  className={`h-8 w-8 text-white bg-black/50 rounded-full p-1 rtl:rotate-180`}
                />
              </button>

              <button
                onClick={nextStory}
                className={`absolute rtl:right-4 ltr:left-4  top-0 w-1/3 h-full z-10 flex items-center rtl:justify-start ltr:justify-end opacity-0 hover:opacity-100`}
              >
                <FaChevronLeft
                  className={`h-8 w-8 text-white bg-black/50 rounded-full p-1 rtl:rotate-180 `}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}