



const SkeletonCard = () => {
  return (
    <section className="flex flex-col gap-y-5 border-gray-100  border-b border-l border-r rounded">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-t"></div>
      </div>
      <article className="px-2 flex flex-col gap-y-4 h-full">
        <div className="flex flex-col gap-y-2 h-full">
          <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
        <div className="flex flex-col gap-y-4 mt-auto pb-4">
          <hr className="border-gray-100" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </article>
    </section>
  );
};

export default SkeletonCard;
