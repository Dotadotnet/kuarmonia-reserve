import ControlPanel from "../ControlPanel";
import React, { useState, useEffect, useMemo } from "react";
import AddButton from "@/components/shared/button/AddButton";
import { useGetBlogsQuery, useDeleteBlogMutation } from "@/services/blog/blogApi";
import { toast } from "react-hot-toast";
import Metrics from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state?.auth);
  const { data, isLoading, error, refetch } = useGetBlogsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
    userId: user?._id
  });
  const navigate = useNavigate();
  const [
    removeBlog,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useDeleteBlogMutation();
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت پست ها...", { id: "fetch-blog" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-blog" });
    }
 
    if (isRemoving) {
      toast.loading("در حال حذف  ..", { id: "news-removing" });
    }

    if (removeData && !isRemoving) {
      toast.dismiss("news-removing");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-blog" });
    }
    
    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "news-removing" });
    }
  }, [data, error, isLoading, isRemoving, removeData]);

  return (
    <>
      <ControlPanel>
        {/* نمایش داده‌های بلاگ‌ها */}
        <AddButton link="./add" />

        {!data?.data || data?.data.length === 0 || isLoading ? (
          <>
            {[1].map((i) => (
              <SkeletonItem key={i} repeat={5} />
            ))}
          </>
        ) : (
          data?.data?.length > 0 &&
          data?.data?.map((blog) => (
            <div
              key={blog._id}
              className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 dark:text-white"
            >
              <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={blog.status === "active"} />
                <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer  items-center">
                  <img
                    src={blog?.thumbnail?.url || "/placeholder.png"}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />

                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex">
                        {blog?.creator?.name}
                      </span>
                      <span className="flex lg:hidden text-right text-sm">
                        {blog.title}
                      </span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="text-xs flex lg:hidden">
                      <div className="flex justify-center  items-center ">
                        <Metrics
                          likeCount={blog.likeCount}
                          dislikeCount={blog.dislikeCount}
                          views={blog.views}
                          rating={blog.rating}
                          iconSize={18}
                          delete={'asdfas'}
                        />
                        <div className=" pr-5">
                          <DeleteModal
                            message="آیا از حذف این بلاگ‌ اطمینان دارید؟"
                            isLoading={isRemoving}
                            onDelete={() => removeBlog(blog._id)}
                          />
                        </div>
                      </div>
                    </span>
                  </article>
                </div>
              </div>
              <div className=" hidden lg:col-span-6 lg:flex text-center lg:first-letter:flex items-center">
                <p className="text-gray-500 dark:text-gray-300">{blog.title}</p>
              </div>
              <div className="hidden lg:flex justify-center  items-center ">
                <Metrics
                  likeCount={blog.likeCount}
                  dislikeCount={blog.dislikeCount}
                  views={blog.views}
                  rating={blog.rating}
                  iconSize={18}
                  delete={'asdfas'}
                />
                <div className="w-24 pr-5">
                  <DeleteModal
                    message="آیا از حذف این بلاگ اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeBlog(blog._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </ControlPanel>
    </>
  );
};

export default Blogs;
