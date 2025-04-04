import React from 'react';

const SkeletonAvatar = ({ repeat }) => {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="g-avatar ml-2 mb-4"
          >
            <div className="w-full">
              <div className="bg-sub-black rounded-md shadow-xl duration-300 animate-pulse">
                <div className="w-full sm:mb-3 mb-2">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonAvatar;
