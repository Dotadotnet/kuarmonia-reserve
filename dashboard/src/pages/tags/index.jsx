import ControlPanel from "../ControlPanel";
import React, { useState, useEffect, useMemo } from "react";
import { useGetTagsQuery, useDeleteTagMutation } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import UpdateTag from "./UpdateTag";
import Add from "./add";
import Search from "@/components/shared/search";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Pagination from "@/components/shared/pagination/Pagination";

const Tags = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading, error, refetch } = useGetTagsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const tags = useMemo(() => data?.data || [], [data]);

  const [
    deleteTag,
    { isLoading: deleting, data: deleteData, error: deleteError }
  ] = useDeleteTagMutation();
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "tag-loading" });
    }
    if (data && !isLoading) {
      toast.dismiss("tag-loading");
    }
    if (data) {
      toast.success(data?.description, { id: "tag-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "tag-loading" });
    }
    if (deleting) {
      toast.loading("در حال حذف برچسب...", { id: "deleteTag" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteTag" });
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteTag" });
    }
  }, [data, error, isLoading, deleting, deleteData, deleteError]);
  console.log(data);
  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Add />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-3  text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-3 hidden lg:flex  text-sm">
            عنوان
          </div>
          <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
            توضیحات
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>
        {isLoading || tags?.length == 0 ? (
          <SkeletonItem repeat={5} />
        ) : (
          tags.map((tag) => {
            const translationItem = tag.translations.find(
              (t) => t.translation && t.language === "fa"
            ); // یا زبان موردنظر
            const fields = translationItem?.translation?.fields ||{};
            return (
              <div
                key={tag._id}
                className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100 "
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={tag.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={tag?.creator?.avatar?.url || "/placeholder.png"}
                      alt="Description of the image"
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className="hidden lg:flex ">
                          {tag?.creator?.name}
                        </span>
                        <span className=" lg:hidden ">{fields?.title}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span className=" lg:hidden text-xs line-clamp-1 ">
                        {fields?.description
                          ? fields?.description
                          : new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </article>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:flex  hidden  text-center  items-center">
                  <span className="break-words text-sm lg:text-sm text-right">
                    {fields.title}
                  </span>
                </div>
                <div className="lg:col-span-5 lg:flex hidden col-span-5 text-right  items-center">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {fields?.description ? fields.description : "ندارد"}
                  </span>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2  text-center flex justify-center md:items-center items-left">
                  <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                    <span>
                      <UpdateTag id={tag?._id} />
                    </span>
                    <DeleteModal
                      message="آیا از حذف این تگ  اطمینان دارید؟"
                      isLoading={deleting}
                      onDelete={() => deleteTag(tag?._id)}
                    />
                  </article>
                </div>
              </div>
            );
          })
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ControlPanel>
    </>
  );
};

export default Tags;
