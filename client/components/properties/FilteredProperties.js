"use client"
import React, { useEffect, useMemo } from "react";
import SkeletonPropCard from "@/components/shared/card/PropCardSkeleton";
import { useGetFilteredRentsMutation } from "@/services/rent/rentApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import PropertyCard from "../shared/card/PropCard";

const FilteredProperties = () => {
  const filter = useSelector((state) => state.filter);
  const [addFilter, { data, isLoading, error }] = useGetFilteredRentsMutation();
  const properties = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("صبر کنید...", { id: "filteredProperties" });
    }

    if (data) {
      toast.success(data?.message, { id: "filteredProperties" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "filteredProperties" });
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    addFilter(filter);
  }, [addFilter, filter]);

  return (
    <section className="lg:col-span-9 md:col-span-8 col-span-12 flex flex-col gap-y-4">
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {isLoading && properties?.length === 0
          ? Array.from({ length: 9 }, (_, index) => (
              <SkeletonPropCard key={index} />
            ))
          : properties.map((tour) => <PropertyCard key={tour._id} tour={tour} />)}
        {!isLoading && properties?.length === 0 && (
          <span>هیچ ملک مناسبی برای شما یافت نشد</span>
        )}
      </div>
    </section>
  );
};

export default FilteredProperties;
