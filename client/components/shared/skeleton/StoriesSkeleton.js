function StoriesSkeleton({ count = 6 }) {
  return (
    <div className="flex py-2 gap-6 overflow-x-auto scrollbar-hide flex-nowrap px-2 sm:justify-center no-scrollbar">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-16 h-4 bg-gray-300 mt-2 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default StoriesSkeleton;
