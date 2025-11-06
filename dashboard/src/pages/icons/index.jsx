import ControlPanel from "../ControlPanel";
import React, { useState, useEffect, useMemo } from "react";
import {
  useGetIconsQuery,
  useDeleteIconMutation
} from "@/services/icon/iconApi";
import UpdateIcon from "./UpdateIcon";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import Add from "./add";
import Search from "@/components/shared/search";

const Icons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error, refetch } = useGetIconsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });

  const [deleteIcon, { isLoading: isDeleting }] = useDeleteIconMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const icons = useMemo(() => data?.data || [], [data]);


  useEffect(() => {
    if (isLoading)
      toast.loading("در حال دریافت نمادها...", { id: "icons-loading" });
    if (data && !isLoading) toast.dismiss("icons-loading");
    if (data && data.acknowledgement)
      toast.success(data.description, { id: "icons-loading" });
    if (error?.data) toast.error(error.data.message, { id: "icons-loading" });
  }, [data, error, isLoading]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Add />
      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
        <div className="col-span-11 lg:col-span-3  text-sm">
          <span className="hidden lg:flex">نویسنده</span>
          <span className="flex lg:hidden">نویسنده و عنوان</span>
        </div>
        <div className="col-span-8 lg:col-span-2 hidden lg:flex  text-sm">
          عنوان
        </div>

        <div className="lg:col-span-6 lg:flex hidden text-sm md:block">
          نماد
        </div>

        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {/* لیست */}
      {isLoading || icons.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        icons.map((icon) => (
          <div
            key={icon._id}
            className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100"
          >
            <div className="col-span-10 lg:col-span-3 text-center flex items-center">
              <StatusIndicator isActive={icon.status === "active"} />
              <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                <img
                  src={icon?.creator?.avatar?.url || "/placeholder.png"}
                  alt="avatar"
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <article className="flex-col flex gap-y-2">
                  <span className="line-clamp-1 text-base">
                    <span className="hidden lg:flex">
                      {icon?.creator?.name.fa}
                    </span>
                    <span className="lg:hidden">{icon?.title}</span>
                  </span>
                  <span className="text-xs hidden lg:flex">
                    {new Date(icon.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <div
                    className="text-sm lg:text-base lg:hidden   overflow-hidden w-8 h-8 text-green-600 text-ellipsis block line-clamp-1 "
                    dangerouslySetInnerHTML={{ __html: icon?.symbol }}
                  ></div>
                </article>
              </div>
            </div>

            <div className="lg:col-span-2 lg:flex hidden col-span-7 text-right items-center">
              <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                {icon?.title}
              </span>
            </div>
            <div className="lg:col-span-6 lg:flex hidden col-span-7 text-right items-center">
              <div
                className="text-sm lg:text-base overflow-hidden w-12 h-12 text-green-600 text-ellipsis block line-clamp-1 "
                dangerouslySetInnerHTML={{ __html: icon?.symbol }}
              ></div>
            </div>

            <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center md:items-center items-left">
              <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                <UpdateIcon id={icon._id} />
                <DeleteModal
                  message="آیا از حذف این نماد اطمینان دارید؟"
                  isLoading={isDeleting}
                  onDelete={() => deleteIcon(icon._id)}
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
  );
};

export default Icons;
