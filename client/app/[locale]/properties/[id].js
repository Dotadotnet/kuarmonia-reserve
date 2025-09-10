

// import Left from "@/components/detail/Left";
// import Right from "@/components/detail/Right";
// import Reviews from "@/components/shared/review/Reviews";
// import Container from "@/components/shared/container/Container";
// import Footer from "@/components/shared/footer/Footer";
// import Navbar from "@/components/shared/navbar/Navbar";
// import Head from "next/head";
// import { useRouter } from "next/router";
 import { useEffect, useMemo } from "react";
// import { useGetRentQuery } from "@/services/rent/rentApi";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setRent } from "@/features/rent/rentSlice";
// import BestSelling from "@/components/home/bestSelling/BestSelling";
// import MoreRents from "@/components/detail/MoreRents";
// import AllReviews from "@/components/detail/AllReviews";

 const DetailPage = () => {
//   const router = useRouter();
//   const { data, isLoading, error } = useGetRentQuery(router?.query?.id);
//   const tour = useMemo(() => {
//     return data?.data || {};
//   }, [data]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (data) {
//       toast.success(data?.message, { id: "rent-data" });
//       dispatch(setRent(tour));
//     }

//     if (error?.data) {
//       toast.error(error?.data?.message, { id: "rent-data" });
//     }
//   }, [data, error, dispatch]);

  return (
     <>

    </>
  );
 };

 export default DetailPage;
