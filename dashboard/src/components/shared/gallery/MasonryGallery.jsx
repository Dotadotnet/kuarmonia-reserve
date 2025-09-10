

const Skeleton = () => (
  <div className="animate-pulse bg-gray-300 h-32 w-full rounded-lg"></div>
);

const DynamicGallery = ({ gallery }) => {
  const isLoading = !gallery || gallery.length === 0;

  const leftImages = isLoading
    ? Array(3).fill(null)
    : gallery.filter((_, i) => i % 2 === 0);
  const rightImages = isLoading
    ? Array(3).fill(null)
    : gallery.filter((_, i) => i % 2 !== 0);

  return (
    <div className="container mx-auto px-5 py-2">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {/* Left column */}
        <div className="flex w-1/2 flex-wrap">
          {leftImages.map((img, index) => (
            <div
              key={index}
              className={`${index % 3 === 2 ? "w-full" : "w-1/2"} p-1 md:p-2`}
            >
              {isLoading ? (
                <Skeleton />
              ) : (
                <img
                  alt={img.public_id}
                  src={img.url}
                  className="block h-full w-full rounded-lg object-cover object-center"
                />
              )}
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="flex w-1/2 flex-wrap">
          {rightImages.map((img, index) => (
            <div
              key={index}
              className={`${index % 3 === 0 ? "w-full" : "w-1/2"} p-1 md:p-2`}
            >
              {isLoading ? (
                <Skeleton />
              ) : (
                <img
                  alt={img.public_id}
                  src={img.url}
                  className="block h-full w-full rounded-lg object-cover object-center"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicGallery;
