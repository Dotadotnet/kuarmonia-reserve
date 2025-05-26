import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";
import React from "react";

const RebtLoading = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <RentCardSkeleton key={index} />
      ))}
    </>
  );
};

export default RebtLoading;
