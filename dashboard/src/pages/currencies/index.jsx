import { useState, useEffect } from "react";
import {
  useGetCurrenciesQuery,
  useDeleteCurrencyMutation
} from "@/services/currency/currencyApi";
import UpdateCurrency from "./UpdateCurrency";
import Pagination from "@/components/shared/pagination/Pagination";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import ControlPanel from "../ControlPanel";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Search from "@/components/shared/search";
import Add from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";

const Currencies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data, isLoading, error } = useGetCurrenciesQuery();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const [searchTerm, setSearchTerm] = useState("");

  const [
    deleteCurrency,
    { isLoading: isRemoving , data: removeData, error: removeError }
  ] = useDeleteCurrencyMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت ...", { id: "currency-loading" });
    }

    if (data) {
      toast.success(data?.description, { id: "currency-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "currency-loading" });
    }
       if (isRemoving) {
          toast.loading("در حال حذف  ..", { id: "venueAmenity-removing" });
        }
    
        if (removeData && !isRemoving) {
          toast.dismiss("venueAmenity-removing");
        }
    
        if (removeError?.data) {
          toast.error(removeError?.data?.message, { id: "venueAmenity-removing" });
        }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} />
      <Add />
      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4">
        <div className="col-span-11 lg:col-span-3 text-sm">نام ارز</div>
        <div className="col-span-2 text-sm">نماد ارز</div>
        <div className="col-span-2 hidden md:flex  text-sm">کد ارز</div>
        <div className="col-span-3 hidden md:flex text-sm">کشور</div>
        <div className="col-span-2 md:col-span-1 text-sm">عملیات</div>
      </div>

      {isLoading || data?.data?.length == 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        data?.data.map((currency) => (
          <div
            key={currency._id}
            className="mt-4 p-2 grid grid-cols-12 rounded-xl border border-gray-200 gap-2  items-center justify-center "
          >
            <div className="col-span-10 lg:col-span-3 text-center flex items-center">
              <StatusIndicator isActive={currency.status === "active"} />
              <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                <img
                  src={currency?.creator?.avatar?.url || "/placeholder.png"}
                  alt={``}
                  height={100}
                  width={100}
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <article className="flex-col flex gap-y-2  ">
                  <span className="line-clamp-1 text-base ">
                    <span className="lg:flex ">{currency?.title}</span>
                  </span>
                  <span className="text-xs hidden lg:flex">
                    {new Date(currency.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className=" lg:hidden text-xs  line-clamp-1">
                    {currency?.description
                      ? currency?.description
                      : new Date(currency.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                  </span>
                </article>
              </div>
            </div>
            <div className="col-span-2 hidden md:flex text-center">
            <div className="  flex justify-center items-center ">
                    <div  dangerouslySetInnerHTML={{ __html: currency?.symbol }} 
                          style={{ width: "44px", height: "44px" }} 

                    />
                  </div>            </div>
            <div className="col-span-2 hidden md:flex text-center">
              {currency.code}
            </div>
            <div className="col-span-3 hidden md:flex text-center">
              {currency?.country?.name || currency?.country}
            </div>
            <div className="col-span-1 gap-2 md:col-span-2 flex md:flex-row flex-col  text-center justify-center items-center ">
              <UpdateCurrency id={currency?._id} />
              <DeleteModal
                message={`آیا از حذف ${currency?.title} اطمینان دارید؟`}
              isLoading={isRemoving}
                onDelete={() => deleteCurrency(currency?._id)}
              />
            </div>
          </div>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </ControlPanel>
  );
};

export default Currencies;