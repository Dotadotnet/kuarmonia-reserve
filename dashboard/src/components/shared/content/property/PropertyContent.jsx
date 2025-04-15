import Left from "./details/Left";
import Right from "./details/Right";

const PropertyDetail = ({ property ,isMobile }) => {

  return (
    
    <div
      className={`relative bg-white h-[650px] scrollbar-hide overflow-y-auto dark:bg-gray-900   dark:text-gray-100 rounded-lg shadow-lg p-4  grid 
    
       gap-8 ${isMobile ? "!grid-cols-1" : ""}  grid-cols-1 md:grid-cols-2   `}
    >
      <Left property={property} />
      <Right property={property} />
    </div>
  );
};

export default PropertyDetail;
