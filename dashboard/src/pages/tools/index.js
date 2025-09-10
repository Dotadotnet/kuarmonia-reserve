
import { useState, useEffect, useMemo } from "react";
import AddButton from "@/components/shared/button/AddButton";
import {
  useGetPostsQuery,
  useUpdatePostMutation,
} from "@/services/post/postApi";
import { toast } from "react-hot-toast";
import Metrics from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import { useRouter } from "next/router";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useSelector } from "react-redux";

const Listpost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const admin = useSelector((state) => state?.auth);
  const { data, isLoading, error, refetch } = useGetPostsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
    adminId: admin?._id,
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const router = useRouter();

  const handlePageChange = (newPage) => {
    console.log("Current Page:", newPage);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت بلاگ...", { id: "fetch-post" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-post" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-post" });
    }
  }, [data, error, isLoading]);
  const handleAddItem = () => {
    router.push("/dashboard/posts/add");
  };

  const onStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // بازنشانی صفحه به صفحه اول بعد از تغییر فیلتر
    refetch();
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <Panel>
        {/* نمایش داده‌های بلاگ‌ها */}
        <AddButton onClick={handleAddItem} />

        <div className="mt-6 md:flex md:flex-row-reverse md:items-center md:justify-between ">
          <div className="inline-flex overflow-hidden bg-white border rounded-lg   dark:!bg-[#0a2d4d]    dark:border-blue-500 rtl:flex-row">
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:hover:bg-gray-700 focus:bg-gray-300 dark:focus:bg-gray-700"
              onClick={() => onStatusFilterChange("all")}
            >
              همه
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("active")}
            >
              فعال
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100  dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("inactive")}
            >
              غیر فعال
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="جستجو"
              className="block w-full py-1.5 pr-5 text-gray-700  md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  dark:text-gray-300 "
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {!data?.data || data?.data.length === 0 || isLoading ? (
          <>
            {[1].map((i) => (
              <SkeletonItem key={i} repeat={5} />
            ))}
          </>
        ) : (
          data?.data?.length > 0 &&
          data?.data?.map((post) => (
            <div
              key={post.id}
              className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 dark:text-white"
              onClick={() => router.push(`/dashboard/posts/info/${post.id}`)}
            >
              <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={post.status === "active"} />
                <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer  items-center">
                  {post?.featuredImage.type === "image" ? (
                   <Image
                   src={post?.featuredImage?.url || "/placeholder.png"}
                   height={100}
                   width={100}
                   className="h-[60px] w-[60px] rounded-full object-cover"
                 />
                  ) : (
                    <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader

                  )}

                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex">
                        {post?.creator?.name}
                      </span>
                      <span className="flex lg:hidden text-right text-sm">
                        {post.title}
                      </span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="text-xs flex lg:hidden">
                      <Metrics
                        gap={3}
                        likeCount={30}
                        dislikeCount={20}
                        views={50}
                        rating={4.5}
                        iconSize={15}
                      />{" "}
                    </span>
                  </article>
                </div>
              </div>

              <div className=" hidden lg:col-span-6 lg:flex text-center lg:first-letter:flex items-center">
                <p className="text-gray-500 dark:text-gray-300">{post.title}</p>
              </div>

              <div className="hidden lg:col-span-2 gap-2 text-center lg:flex justify-center  items-center ">
                <Metrics
                  likeCount={post.likeCount}
                  dislikeCount={post.dislikeCount}
                  views={post.views}
                  rating={post.rating}
                  iconSize={18}
                />
              </div>
            </div>
          ))
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Panel>
    </>
  );
};

export default Listpost;
