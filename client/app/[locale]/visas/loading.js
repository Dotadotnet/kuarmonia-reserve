import GallerySkeleton from "@/components/shared/skeleton/GallerySkeleton";

export default function Loading() {
  return (
    <div className="p-4">
        <GallerySkeleton />
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  );
}
