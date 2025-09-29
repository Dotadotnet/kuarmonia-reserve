import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";


const RebtLoading = () => {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <VisaCardSkeleton key={index} />
      ))}
    </>
  );
};

export default RebtLoading;
