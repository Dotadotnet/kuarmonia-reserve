import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const ThumbnailWithInfo = ({ opportunity }) => (
  <div className="relative overflow-hidden rounded-xl group aspect-video w-full">
    {opportunity?.thumbnail?.url ? (
      <img
        fill
        src={opportunity.thumbnail.url}
        alt="thumbnail"
        className="object-cover"
      />
    ) : (
      <SkeletonText lines={5} />
    )}
    {opportunity?.organization && (
      <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-xl rounded-bl-xl py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-md font-semibold">
          {opportunity.organization.name}
        </h3>
        <p className="text-xs text-gray-500">{opportunity.organization.country}</p>
      </div>
    )}
  </div>
);

export default ThumbnailWithInfo;
