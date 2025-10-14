import { useState, useEffect, useMemo } from "react";

import {
  useGetCountriesQuery,
  useRemoveCountryMutation
} from "@/services/Country/CountryApi";
import Add from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import Edit from "./edit";
import ControlPanel from "../ControlPanel";

const ListCountry = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetCountriesQuery();
  const [
    removeCountry,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useRemoveCountryMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const countries = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ..", { id: "Country-loading" });
    }
    if (data) {
      toast.success(data?.code, { id: "Country-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.code, { id: "Country-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ..", { id: "Country-removing" });
    }

    if (removeData && !isRemoving) {
      toast.dismiss("Country-removing");
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "Country-removing" });
    }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} />
        <Add />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-5  text-sm">
            <span className="flex">عنوان و نماد</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex  text-sm">
            نویسنده
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            کد کشور
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (countries && countries.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          countries.map((Country) => {
            return (
              <div
                key={Country._id}
                className="mt-4 p-2 grid grid-cols-12 min-h-16  rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-5 text-center flex items-center">
                  <StatusIndicator isActive={Country.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <div className=" flex justify-center items-center">
                      <div
                        dangerouslySetInnerHTML={{ __html: Country?.icon }}
                      className="w-full h-full"
                      />
                    </div>
                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className=" ">{Country?.translations[0].translation.fields.title}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(Country.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className=" lg:hidden text-xs  line-clamp-1">
                        {Country?.code
                          ? Country?.code
                          : new Date(Country.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </span>
                    </article>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                      <span className="flex">{Country.creator?.name}</span>
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {Country.code}
                    </span>
                  </article>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                    <Edit id={Country._id} />
                    <DeleteModal
                      message="آیا از حذف نوع ملک اطمینان دارید؟"
                      isLoading={isRemoving}
                      onDelete={() => removeCountry(Country?._id)}
                    />
                  </article>
                </div>
              </div>
            );
          })
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ControlPanel>
    </>
  );
};

export default ListCountry;
