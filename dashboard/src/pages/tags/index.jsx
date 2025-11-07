import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import ControlPanel from "../ControlPanel";
import { useGetTagsQuery, useDeleteTagMutation } from "@/services/tag/tagApi";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Search from "@/components/shared/search";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Pagination from "@/components/shared/pagination/Pagination";
import AddButton from "@/components/shared/button/AddButton";
import Edit from "@/components/icons/Edit";

const Tags = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error } = useGetTagsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const tags = useMemo(() => data?.data || [], [data]);

  // ✅ اصلاح نام متغیرها در useDeleteTagMutation
  const [
    deleteTag,
    { isLoading: isRemoving, data: deleteResult, error: removeError },
  ] = useDeleteTagMutation();



  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ...", { id: "tags-loading" });
    }
    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "tags-loading" });
    }
console.log("data",data)
    if (data && !data.acknowledgement) {
      toast.dismiss(data.description, { id: "tags-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "tags-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف...", { id: "tags-remove" });
    }

    if (deleteResult && deleteResult.acknowledgement) {
      toast.success(deleteResult.description, { id: "tags-remove" });
    }
    if (deleteResult && !deleteResult.acknowledgement) {
      toast.dismiss(deleteResult.description, { id: "tags-remove" });
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "tags-remove" });
    }
  }, [data, error, isLoading, isRemoving, removeError, deleteResult]);

  return (
    <ControlPanel>
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex-1">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <AddButton link="./add" />
      </div>

      {/* Header */}
      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4">
        <div className="col-span-11 lg:col-span-3 text-sm">
          <span className="hidden lg:flex">نویسنده</span>
          <span className="flex lg:hidden">نویسنده و عنوان</span>
        </div>
        <div className="col-span-8 lg:col-span-3 hidden lg:flex text-sm">
          عنوان
        </div>
        <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
          توضیحات
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {/* List */}
      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : tags.length === 0 ? (
        <div className="text-center mt-6 text-slate-400">هیچ تگی یافت نشد.</div>
      ) : (
        tags.map((tag) => (
          <div
            key={tag._id}
            className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
          >
            <div className="col-span-10 lg:col-span-3 text-center flex items-center">
              <StatusIndicator isActive={tag.status === "active"} />
              <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                {tag?.thumbnail?.url ? (
                  <img
                    src={tag?.thumbnail?.url}
                    alt={tag?.title}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                ):(
                  <img
                    src={tag?.creator?.avatar?.url}
                    alt={tag?.creator.name.fa}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                )}
                <article className="flex-col flex gap-y-2">
                  <span className="line-clamp-1 text-base">
                    <span className="hidden lg:flex">
                      {tag?.creator?.name?.fa}
                    </span>
                    <span className="lg:hidden">{tag?.title}</span>
                  </span>
                  <span className="text-xs hidden lg:flex">
                    {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className="lg:hidden text-xs line-clamp-1">
                    {tag?.description
                      ? tag?.description
                      : new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </article>
              </div>
            </div>

            <div className="lg:col-span-3 hidden gap-2 lg:flex justify-left items-center text-right">
              <article className="flex-col flex gap-y-2">
                <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                  {tag?.title}
                </span>
              </article>
            </div>

            <div className="lg:col-span-5 hidden gap-2 lg:flex justify-left items-center text-right">
              <article className="flex-col flex gap-y-2">
                <span
                  className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]"
                  title={tag?.description}
                >
                  {tag.description}
                </span>
              </article>
            </div>

            <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
              <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                <Link
                  to={`./edit/${tag._id}`}
                  className="edit-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <DeleteModal
                  message="آیا از حذف این تگ اطمینان دارید؟"
                  isLoading={isRemoving}
                  onDelete={() => deleteTag(tag._id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </article>
            </div>
          </div>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </ControlPanel>
  );
};

export default Tags;
