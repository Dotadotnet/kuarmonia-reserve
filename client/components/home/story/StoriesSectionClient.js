"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const gradientClasses = [
  "from-pink-500 to-fuchsia-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-lime-500",
  "from-violet-500 to-pink-500",
  "from-amber-400 to-red-500",
  "from-rose-400 to-indigo-500"
];

export default function StoriesSectionClient({ stories }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const lang = useLocale();

  const openStory = async (story) => {
    setLoading(true);
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_API}/story/get-story/${story._id}`, {
        headers: {
          "Accept-Language": lang
        }
      });

      const result = await response.json();
      console.log("result", result);

      if (result.acknowledgement) {
        setSelectedStory({
          ...story,
          children: result.data.children || []
        });
        setCurrentStoryIndex(0);
        setProgress(0);
        setIsPlaying(true);
        setIsMuted(false);
      } else {
        console.error("API Error:", result.description);
        setSelectedStory({
          ...story,
          children: []
        });
      }
    } catch (error) {
      console.error("Error fetching story:", error);
      setSelectedStory({
        ...story,
        children: []
      });
    } finally {
      setLoading(false);
    }
  };

  const closeStory = () => {
    setSelectedStory(null);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const nextStory = () => {
    if (selectedStory && selectedStory.children && currentStoryIndex < selectedStory.children.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  // Handle progress bar
  useEffect(() => {
    if (selectedStory && selectedStory.children && selectedStory.children.length > 0 && isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 1;
        });
      }, 100); // Update every 100ms for 10 second duration
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [selectedStory, isPlaying, currentStoryIndex]);

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentStoryIndex]);

  return (
    <section className="pt-20 md:pt-24 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex py-2 gap-6 overflow-x-auto scrollbar-hide flex-nowrap px-2 md:justify-center justify-start no-scrollbar">
          {stories.map((story) => {
            const randomGradient =
              gradientClasses[Math.floor(Math.random() * gradientClasses.length)];
            return (
              <div
                key={story._id}
                onClick={() => openStory(story)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative size-20 sm:size-24 group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-tr ${randomGradient} transition-transform   duration-500 md:scale-[0.97] scale-95 group-hover:scale-100`}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-[4px]">
                    <div className="w-full h-full rounded-full border-4 border-white dark:border-black overflow-hidden bg-white dark:bg-black">
                      <Image
                        width={200}
                        height={200}
                        alt={story.title}
                        src={story.media?.url || "/placeholder.png"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                 
                </div>

                <span className="text-sm font-medium text-gray-900 dark:text-white mt-2 max-w-20 truncate text-center">
                  {story.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Show loading state */}
        {loading && (
          <div className="fixed inset-0 bg-black z-[9999999999999999999999999999] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          
            </div>
          </div>
        )}

        {/* Show selected story with children */}
        {selectedStory && !loading && selectedStory.children && selectedStory.children.length > 0 && (
          <div className="fixed inset-0 bg-black z-[9999999999999999999999999999] flex items-center justify-center">
            <div className="relative w-full h-full max-w-md mx-auto bg-black">
        

              <div className="relative w-full h-full">
                {/* Progress bars */}
                <div className="absolute top-2 left-4 right-4 z-20 flex gap-1">
                  {selectedStory.children.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-1 bg-gray-500/50 rounded-full overflow-hidden"
                    >
                      <div
                        className="h-full bg-white transition-all duration-300 ease-linear"
                        style={{
                          width: `${index === currentStoryIndex
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

                {/* Header */}
                <div className="absolute top-12 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      width={150}
                      height={150}
                      src={selectedStory.children[currentStoryIndex]?.creator?.avatar?.url || "/placeholder.png"}
                      alt={"author"}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {selectedStory.children[currentStoryIndex]?.creator?.name?.[lang] || 
                         selectedStory.children[currentStoryIndex]?.creator?.name || 
                         selectedStory.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedStory.children[currentStoryIndex]?.media?.type === "video" && (
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
                      onClick={closeStory}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                {/* Media */}
                <div className="relative w-full h-full">
                  {selectedStory.children[currentStoryIndex]?.media?.type === "video" ? (
                    <video
                      ref={videoRef}
                      src={selectedStory.children[currentStoryIndex]?.media?.url || "/placeholder.mp4"}
                      className="w-full h-full object-cover"
                      autoPlay={isPlaying}
                      muted={isMuted}
                      controls={false}
                      onEnded={nextStory}
                      playsInline
                    />
                  ) : (
                    <Image
                      width={800}
                      height={1280}
                      src={selectedStory.children[currentStoryIndex]?.media?.url || "/placeholder.png"}
                      alt={selectedStory.children[currentStoryIndex]?.title || "Story image"}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Navigation */}
                <button
                  onClick={prevStory}
                  className={`absolute rtl:right-0 ltr:left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start opacity-0 hover:opacity-100`}
                  disabled={currentStoryIndex === 0}
                >
                  <FaChevronLeft
                    className={`h-8 w-8  rtl:rotate-180  text-white bg-black/50 rounded-full p-1 ml-4`}
                  />
                </button>

                <button
                  onClick={nextStory}
                  className={`absolute ltr:right-0 rtl:left-0 top-0 w-1/3 h-full z-10 flex items-center justify-end opacity-0 hover:opacity-100`}
                >
                  <FaChevronRight
                    className={`h-8 w-8 rtl:rotate-180 text-white bg-black/50 rounded-full p-1 mr-4`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}