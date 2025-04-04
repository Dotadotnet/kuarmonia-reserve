import React from 'react';
const BlogMetrics = ({ likeCount = 0, dislikeCount = 0, views = 0, rating = 0, iconSize = 22 ,gap=2}) => {
  return (
    <div className={`flex gap-${gap} justify-center`}>
      {/* آیکون لایک */}
      <div className="flex flex-row lg:flex-col gap-1 justify-center items-center text-green-500">
      <span
            data-tooltip-target="fire"
            className=" flex flex-row lg:flex-col justify-center items-center gap-2 cursor-pointer rounded-lg border border-green-500/5 bg-green-500/5 p-1 lg:p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="currentColor"
            fillOpacity="0.15"
            d="M273 495.9v428l.3-428zm538.2-88.3H496.8l9.6-198.4c.6-11.9-4.7-23.1-14.6-30.5c-6.1-4.5-13.6-6.8-21.1-6.7c-19.6.1-36.9 13.4-42.2 32.3c-37.1 134.4-64.9 235.2-83.5 302.5V852h399.4a56.85 56.85 0 0 0 33.6-51.8c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-13.9-25.4l21.9-19a56.76 56.76 0 0 0 19.6-43c0-9.7-2.3-18.9-6.9-27.3l-14-25.5l21.9-19a56.76 56.76 0 0 0 19.6-43c0-19.1-11-37.5-28.8-48.4"
          />
          <path
            fill="currentColor"
            d="M112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32m773.9 5.7c16.8-22.2 26.1-49.4 26.1-77.7c0-44.9-25.1-87.5-65.5-111a67.67 67.67 0 0 0-34.3-9.3H572.3l6-122.9c1.5-29.7-9-57.9-29.5-79.4a106.4 106.4 0 0 0-77.9-33.4c-52 0-98 35-111.8 85.1l-85.8 310.8l-.3 428h472.1c9.3 0 18.2-1.8 26.5-5.4c47.6-20.3 78.3-66.8 78.3-118.4c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37c16.8-22.2 26.1-49.4 26.1-77.7c0-12.6-1.8-25-5.4-37M820.4 499l-21.9 19l14 25.5a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.1 32.2-19.6 43l-21.9 19l13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H345V506.8c18.6-67.2 46.4-168 83.5-302.5a44.28 44.28 0 0 1 42.2-32.3c7.5-.1 15 2.2 21.1 6.7c9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.1 32.2-19.6 43"
          />
        </svg>
       
        <span className="text-green-500 text-sm ">{likeCount}</span>
        </span>
      </div>

      {/* آیکون دیسلایک */}
      <div className="flex flex-row lg:flex-col gap-1 justify-center items-center text-red-500">
      <span
            data-tooltip-target="fire"
            className=" flex flex-row lg:flex-col justify-center items-center gap-2 cursor-pointer rounded-lg border border-red-500/5 bg-red-500/5 p-1 lg:p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      fillOpacity="0.15"
                      d="M273 100.1v428h.3zM820.4 525l-21.9-19l14-25.5a56.2 56.2 0 0 0 6.9-27.3c0-16.5-7.1-32.2-19.6-43l-21.9-19l13.9-25.4a56.2 56.2 0 0 0 6.9-27.3c0-16.5-7.1-32.2-19.6-43l-21.9-19l13.9-25.4a56.2 56.2 0 0 0 6.9-27.3c0-22.4-13.2-42.6-33.6-51.8H345v345.2c18.6 67.2 46.4 168 83.5 302.5a44.28 44.28 0 0 0 42.2 32.3c7.5.1 15-2.2 21.1-6.7c9.9-7.4 15.2-18.6 14.6-30.5l-9.6-198.4h314.4C829 605.5 840 587.1 840 568c0-16.5-7.1-32.2-19.6-43"
                    />
                    <path
                      fill="currentColor"
                      d="M112 132v364c0 17.7 14.3 32 32 32h65V100h-65c-17.7 0-32 14.3-32 32m773.9 358.3c3.6-12 5.4-24.4 5.4-37c0-28.3-9.3-55.5-26.1-77.7c3.6-12 5.4-24.4 5.4-37c0-28.3-9.3-55.5-26.1-77.7c3.6-12 5.4-24.4 5.4-37c0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H273l.3 428l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4c20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3c40.4-23.5 65.5-66.1 65.5-111c0-28.3-9.3-55.5-26.1-77.7m-74.7 126.1H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5c-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3c-37.1-134.4-64.9-235.2-83.5-302.5V172h399.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4l21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4l21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5l21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4"
                    />
                  </svg>
              
        <span className="text-red-500 text-sm ">{dislikeCount}</span>
        </span>
      </div>

      {/* آیکون بازدید */}
      <div className="flex flex-row lg:flex-col gap-1 items-center text-gray-500">
      <span
            data-tooltip-target="fire"
            className=" flex flex-row lg:flex-col justify-center items-center gap-2 cursor-pointer rounded-lg border border-gray-500/5 bg-gray-500/5 p-1 lg:p-2 text-gray-500 transition-colors hover:border-gray-500/10 hover:bg-gray-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      
        <span className="text-gray-500 text-sm ">{views}</span>
        </span>
      </div>

      {/* آیکون نرخ */}
      <div className="flex flex-row lg:flex-col gap-1 justify-center items-center text-gray-500">
      <span
            data-tooltip-target="fire"
            className=" flex flex-row lg:flex-col justify-center items-center gap-2 cursor-pointer rounded-lg border border-gray-500/5 bg-gray-500/5 p-1 lg:p-2 text-gray-500 transition-colors hover:border-gray-500/10 hover:bg-gray-500/10 hover:!opacity-100 group-hover:opacity-70"
          >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
     
        <span className="text-gray-500 text-sm flex  justify-center text-center">
          {rating}</span>
          </span>
      </div>
    </div>
  );
};

export default BlogMetrics;
