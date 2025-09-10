
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

export default function VenueAwards({ venue }) {
  const selectedAwards = venue?.awards || [];
  const selectedStandards = venue?.standards || [];





  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-2">
        <span className="text-sm">جوایز و استانداردها</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-1">
            {selectedAwards.length > 0 ? (
              selectedAwards.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <img src={item.thumbnail.url} alt={item.title} className="w-20 h-20 rounded-full" />
                  <span className=" text-xs px-2 py-1 text-center rounded-lg">{item.title}</span>
                </div>
              ))
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-1">
            {selectedStandards.length > 0 ? (
              selectedStandards.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <img src={item.thumbnail.url} alt={item.title} className="w-20 h-20 rounded-full" />
                  <span className=" text-xs text-center px-2 py-1 rounded-lg">{item.title}</span>
                </div>
              ))
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
