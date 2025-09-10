import { useState, useEffect, useMemo } from "react";

import {
  useGetMediasQuery,
  useDeleteMediaMutation
} from "@/services/media/mediaApi";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useSelector } from "react-redux";
import { TfiVideoClapper } from "react-icons/tfi";
import Search from "@/components/shared/search";
import Add from "./add";
import Edit from "./edit";
import DeleteModal from "@/components/shared/modal/DeleteModal";
const ListMedia = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const admin = useSelector((state) => state?.auth?.admin);
  const { data, isLoading, error, refetch } = useGetMediasQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
    adminId: admin?._id
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const medias = useMemo(() => data?.data || [], [data]);

  const [
    deleteMedia,
    { isLoading: isRemoving, data: removeData, error: errorRemove }
  ] = useDeleteMediaMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت رسانه...", { id: "media-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("media-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "media-loading" });
    }
    if (isRemoving) {
      toast.loading("در حال حذف رسانه...", { id: "media-remove" });
    }
    if (removeData?.success) {
      toast.success(removeData?.success, { id: "media-remove" });
    }
    if (removeData && !removeData?.success) {
      toast.error(removeData?.success, { id: "media-remove" });
    }
    if (removeData && !isRemoving) {
      toast.dismiss("media-remove");
    }

    if (errorRemove?.data) {
      toast.error(errorRemove?.data?.message, { id: "media-remove" });
    }
  }, [data, error, isLoading,removeData,isRemoving,errorRemove]);

  return (
    <>
      <Panel>
        <Search searchTerm={searchTerm} />
        {/* نمایش داده‌های تگ‌ها */}
        <Add />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-5  text-sm">
            <span> عنوان</span>
          </div>
          <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="hidden lg:flex lg:col-span-1  text-sm">
            <span> تاریخ ایجاد</span>
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (medias && medias.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          medias.map((media) => (
            <div
              key={media._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                <StatusIndicator isActive={media.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  {media?.thumbnail?.url?.length > 0 ? (
                    <Image
                      src={media?.thumbnail?.url || "/placeholder.png"}
                      height={100}
                      width={100}
                      alt={media?.title}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-secondary dark:text-blue-500">
                      <TfiVideoClapper size={54} />
                    </span>
                  )}

                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 max-h-[1.6em] text-base ">
                      <span className="    text-sm">{media?.title}</span>
                    </span>
                    <span className="   ">{media?.creator?.name}</span>
                  </article>
                </div>
              </div>

              <div className="lg:col-span-6 hidden gap-2 lg:flex justify-left items-center text-right">
                <span className="text-sm mx-4  overflow-hidden text-ellipsis block line-clamp-2 max-h-[5em] ">
                  {media.description}
                </span>
              </div>

              <div className="hidden lg:flex lg:col-span-1 items-center justify-center  text-sm">
                {new Date(media.createdAt).toLocaleDateString("fa-IR")}
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-right items-start gap-x-2  gap-y-2">
                  <Edit id={media?._id} />
                  <DeleteModal
                    l
                    message="آیا از حذف این دسته بندی اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => deleteMedia(media?._id)}
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
      </Panel>
    </>
  );
};

export default ListMedia;
