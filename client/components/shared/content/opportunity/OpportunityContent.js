import GallerySection from "./details/GallerySection";
import OpportunityHeader from "./details/Header";
import Option from "./details/Option";
import Description from "./details/Description";
import FormRequest from "./details/FormRequest";
import OwnerInfo from "./details/OwnerInfo";
import CapacityProgress from "./details/CapacityProgress";
const OpportunityDetail = ({ opportunity, isMobile }) => {
  const daysLeft = opportunity?.endDate
    ? Math.ceil(
      (new Date(opportunity?.endDate).setHours(0, 0, 0, 0) -
        new Date().setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
    )
    : null;

  return (
    <div className="relative h-full overflow-y-auto scrollbar-hide p-4">
      {/* Left: Main content (2/3 on large screens) */}
      <GallerySection opportunity={opportunity} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OpportunityHeader opportunity={opportunity} />
          <CapacityProgress opportunity={opportunity} />
          <Option opportunity={opportunity} />
          <Description opportunity={opportunity} />
        </div>

        {/* Right: FormRequest (1/3 on large screens) */}
        <div className="lg:col-span-1">
          <FormRequest />
          {/* <OwnerInfo opportunity={opportunity} /> */}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
