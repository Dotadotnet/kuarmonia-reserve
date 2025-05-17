
import GallerySection from "./details/GallerySection";
import OpportunityHeader from "./details/Header";
import Option from "./details/Option";
import Description from "./details/Description";
import FormRequest from "./details/FormRequest";
import OwnerInfo from "./details/OwnerInfo";
import CapacityProgress  from "./details/CapacityProgress";
const OpportunityDetail = ({ opportunity, isMobile }) => {
  
  const daysLeft = opportunity?.endDate
    ? Math.ceil(
        (new Date(opportunity?.endDate).setHours(0, 0, 0, 0) -
          new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      )
    : null;
  return (
    <div className="bg-white relative dark:bg-gray-800  h-screen scrollbar-hide overflow-y-auto ">
      <GallerySection opportunity={opportunity} />
      <OpportunityHeader opportunity={opportunity} />
      <CapacityProgress opportunity={opportunity} />
      <Option opportunity={opportunity} />
      <Description opportunity={opportunity} />
      <OwnerInfo opportunity={opportunity} />
      <FormRequest />

    </div>
  );
};

export default OpportunityDetail;
