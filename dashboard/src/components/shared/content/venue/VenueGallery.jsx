const VenueGallery = ({ venue }) => {
  const images = venue?.gallery || [];
  const displayImages = images.slice(0, 5);

  return (
    <section className="grid grid-cols-12 grid-rows-2 w-full gap-2">
      {displayImages.length > 0
        ? displayImages.map((image, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "col-span-6 row-span-2" : "col-span-3"
              } aspect-square overflow-hidden`}
            >
              <img
                src={image?.url}
                alt={image?.alt || `Venue Image ${index + 1}`}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))
        : // نمایش Skeleton در صورت نبود تصاویر
          [...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "col-span-6 row-span-2" : "col-span-3"
              } aspect-square bg-gray-300 animate-pulse rounded-lg`}
            ></div>
          ))}
    </section>
  );
};

export default VenueGallery;
