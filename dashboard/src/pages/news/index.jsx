import { useState, useEffect, useMemo } from "react";
import {
  useGetNewsQuery,
  useRemoveNewsMutation
} from "@/services/news/newsApi";
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

const ListNews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetNewsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const [
    removeNews,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useRemoveNewsMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const news = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ..", { id: "news-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "news-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "news-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ..", { id: "news-removing" });
    }

    if (removeData && !isRemoving) {
      toast.dismiss("news-removing");
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "news-removing" });
    }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

  // Function to open edit modal
  const openEditModal = (newsItem) => {
    // Implementation for opening edit modal
    console.log("Edit news item:", newsItem);
  };

  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddButton link={"./add"} />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-4  text-sm">
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
        {isLoading || (news && news.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          news.map((newsItem) => {
            // Updated to use direct model fields instead of translation documents
            const title = newsItem?.title || "";
            const summary = newsItem?.summary || "";
            
            return (
              <div
                key={newsItem._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                  <StatusIndicator isActive={newsItem.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    {newsItem?.thumbnail ? (
                      <img
                        src={newsItem?.thumbnail?.url || "/placeholder.png"}
                        height={100}
                        width={100}
                        className="h-[60px] w-[60px] rounded-full object-cover "
                      />
                    ) : (
                      <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader
                    )}
                    <article className="flex-col flex gap-y-2">
                      <span className="line-clamp-1 text-base ">
                        {title}
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(newsItem.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className=" lg:hidden text-xs  line-clamp-1">
                        {summary
                          ? summary
                          : new Date(newsItem.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </span>
                    </article>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                      <span className="flex">{newsItem.creator.name}</span>
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-5 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {summary}
                    </span>
                  </article>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                    <span
                      className="edit-button "
                      onClick={() => openEditModal(newsItem)}
                    >
                      <Edit className="w-5 h-5" />
                    </span>
                    <DeleteModal
                      message="آیا از حذف نوع ملک اطمینان دارید؟"
                      isLoading={isRemoving}
                      onDelete={() => removeNews(newsItem?._id)}
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

export default ListNews;