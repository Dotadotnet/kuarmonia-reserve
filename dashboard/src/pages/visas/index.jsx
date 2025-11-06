import { useState, useEffect, useMemo } from "react";

import {
  useGetVisasQuery,
  useRemoveVisaMutation
} from "@/services/visa/visaApi";
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

const ListVisa = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetVisasQuery();
  const [
    removeVisa,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useRemoveVisaMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const visas = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ..", { id: "visa-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "visa-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "visa-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ..", { id: "visa-removing" });
    }

    if (removeData && removeData?.acknowledgement) {
      toast.success(removeData?.description, { id: "visa-removing" });
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "visa-removing" });
    }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

console.log(visas)
  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} />
        <AddButton link={"./add"} />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-5  text-sm">
            <span className="flex"> عنوان </span>
          </div>
          <div className="col-span-8 lg:col-span-6 hidden lg:flex  text-sm">
            خلاصه{" "}
          </div>
  
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (visas && visas.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          visas.map((visa) => {
            // Updated to use direct model fields instead of translation documents
            const title = visa?.title || "";
            const summary = visa?.summary || "";
          
            return(
            <div
              key={visa._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-5 text-center flex items-center">
                <StatusIndicator isActive={visa.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  {visa?.thumbnail ? (
                    <img
                      src={visa?.thumbnail?.url || "/placeholder.png"}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover "
                    />
                  ) : (
                    <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader
                  )}
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className=" ">{title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(visa.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs  line-clamp-1">
                      {summary}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-6 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{summary}</span>
                  </span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="edit-button "
                  >
                    <Edit className="w-5 h-5" />
                  </span>
                  <DeleteModal
                    message="آیا از حذف ویزا اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeVisa(visa?._id)}
                  />
                </article>
              </div>
            </div>
          )})
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

export default ListVisa;