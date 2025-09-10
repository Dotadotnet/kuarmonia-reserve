import { useState, useEffect, useMemo } from "react";

import {
  useGetVenueVendorsQuery,
  useRemoveVenueVendorMutation
} from "@/services/venueVendor/venueVendorApi";
import Add from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Edit from "@/components/icons/Edit";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import AddButton from "@/components/shared/button/AddButton";
import ControlPanel from "../ControlPanel";

const ListVenueVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetVenueVendorsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const [
    removeVenueVendor,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useRemoveVenueVendorMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const vendors = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ..", { id: "venueVendor-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "venueVendor-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "venueVendor-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ..", { id: "venueVendor-removing" });
    }
    if (removeData) {
      toast.success(removeData?.description, { id: "venueVendor-removing" });
    }
    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "venueVendor-removing" });
    }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} />
        <AddButton link={"./add"} />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-5  text-sm">
            <span className="flex">عنوان و نماد</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex  text-sm">
            نویسنده
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (vendors && vendors.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          vendors.map((venueVendor) => (
            <div
              key={venueVendor._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                <StatusIndicator isActive={venueVendor.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  {venueVendor?.thumbnail ? (
                    <img
                      src={venueVendor?.thumbnail?.url || "/placeholder.png"}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover "
                    />
                  ) : (
                    <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader
                  )}
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className=" ">{venueVendor?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(venueVendor.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                    <span className=" lg:hidden text-xs  line-clamp-1">
                      {venueVendor?.description
                        ? venueVendor?.description
                        : new Date(venueVendor.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-3 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-xs lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{venueVendor?.email}</span>
                  </span>
                  <span className="text-xs lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{venueVendor?.phone}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {venueVendor.description}
                  </span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="edit-button "
                    onClick={() => openEditModal(venueVendor)}
                  >
                    <Edit className="w-5 h-5" />
                  </span>
                  <DeleteModal
                    message="آیا از حذف نوع ملک اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeVenueVendor(venueVendor?._id)}
                  />
                </article>
              </div>
            </div>
          ))
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

export default ListVenueVendor;
