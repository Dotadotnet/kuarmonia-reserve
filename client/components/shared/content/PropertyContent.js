'use client'
import Left from "@/components/detail/property/details/Left";
import Right from "@/components/detail/property/details/Right";



const PropertyDetail = ({ property ,isMobile }) => {

  return (
    
    <div
      className={`relative  dark:bg-gray-900 rounded-lg shadow-lg p-4  grid 
    
       gap-8 ${isMobile ? "!grid-cols-1" : ""}  grid-cols-1 md:grid-cols-2   `}
    >
      <Left property={property} />
      <Right property={property} />
    </div>
  );
};

export default PropertyDetail;
