
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

function VenueAbout({ venue }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <h3 className=" text-md text-black dark:text-white ">
            درباره اینجا
          </h3>
        </div>
        <div></div>
      </div>
      <div className="text-gray-600">
        {venue?.about ? (
          <p className="">{venue?.about}</p>
        ) : (
          <SkeletonText lines={8} />
        )}
      </div>
    </div>
  );
}

export default VenueAbout;
