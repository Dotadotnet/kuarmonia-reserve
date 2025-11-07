import ControlPanel from "../ControlPanel";
import { useState, useEffect, useMemo } from "react";
import { useGetTagsQuery, useDeleteTagMutation } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import UpdateTag from "./UpdateTag";
import Search from "@/components/shared/search";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Pagination from "@/components/shared/pagination/Pagination";
import AddButton from "@/components/shared/button/AddButton";
import Modal from "@/components/shared/modal/Modal";

const Tags = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
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
      toast.loading("در حال دریافت تگ‌ها...", { id: "get-tags" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "get-tags" });
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (deleting) {
      toast.loading("در حال حذف تگ...", { id: "delete-tag" });
    }

    if (deleteData) {
      toast.success(deleteData?.description, { id: "delete-tag" });
      refetch();
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.description, { id: "delete-tag" });
    }
  }, [deleting, deleteData, deleteError, refetch]);

  const handleUpdateClick = (tagId) => {
    setSelectedTagId(tagId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTagId(null);
    refetch();
  };

  return (
    <>
      <ControlPanel
        title="تگ‌ها"
        button={
          <div className="flex gap-2">
            <AddButton to="/tags/add" />
          </div>
        }
        search={
          <Search
            placeholder="جستجوی تگ‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        }
      >
        <div className="grid grid-cols-12 gap-2 p-2 text-xs md:text-sm font-bold border-b border-gray-200 dark:border-white/10">
          <div className="col-span-11 lg:col-span-3 text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-3 hidden lg:flex text-sm">
            عنوان
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های تگ‌ها */}
        {isLoading || (tags && tags.length == 0) ? (
          <SkeletonItem repeat={5} />
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
                  ) : (
                    <div className="h-[60px] w-[60px] rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">بدون تصویر</span>
                    </div>
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
              <div className="lg:col-span-3 lg:flex hidden text-center items-center">
                <span className="break-words text-sm lg:text-sm text-right">
                  {tag?.title}
                </span>
              </div>
              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {tag.description}
                  </span>
                </article>
              </div>
              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                  <button
                    onClick={() => handleUpdateClick(tag._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ویرایش
                  </button>
                  <DeleteModal
                    message="آیا از حذف این تگ اطمینان دارید؟"
                    isLoading={deleting}
                    onDelete={() => deleteTag(tag._id)}
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

      {/* Update Tag Modal */}
      {isUpdateModalOpen && selectedTagId && (
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          className="lg:w-1/3 md:w-1/2 w-full z-50 h-fit"
        >
          <UpdateTag id={selectedTagId} />
        </Modal>
      )}
    </>
  );
};

export default Tags;