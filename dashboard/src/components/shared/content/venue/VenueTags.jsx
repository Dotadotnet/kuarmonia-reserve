const VenueTags = ({ venue }) => {
  const tags = venue?.tags || [];

  return (
<section className="flex gap-2 overflow-x-auto scrollbar-hide py-2 items-start min-h-[35px]">
{tags.length > 0
        ? tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 dark:bg-black rounded-md text-sm whitespace-nowrap shadow-sm"
            >
              {tag.value}
            </span>
          ))
        : // نمایش Skeleton در صورت نبود تگ‌ها
          [...Array(3)].map((_, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-700 animate-pulse shadow-lg rounded-md text-sm whitespace-nowrap w-20 h-6"
            ></span>
          ))}
    </section>
  );
};

export default VenueTags;
