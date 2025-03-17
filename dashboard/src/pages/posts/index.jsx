import ControlPanel from "../ControlPanel";
import React, { useState, useEffect, useMemo } from "react";
import AddButton from "@/components/shared/button/AddButton";
import {
  useGetPostsQuery
} from "@/services/post/postApi";
import { toast } from "react-hot-toast";
import Metrics from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state?.auth);
  const { data, isLoading, error, refetch } = useGetPostsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
    userId: user?._id,
  });


  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت پست ها...", { id: "fetch-post" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-post" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "fetch-post" });
    }
  }, [data, error, isLoading]);


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
          data?.data?.map((post) => (
            <div
              key={post._id}
              className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 dark:text-white"
              onClick={() => navigate(`/dashboard/posts/info/${post._id}`)}
              >
              <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={post.status === "active"} />
                <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer  items-center">
                   <img
                   src={post?.thumbnail?.url || "/placeholder.png"}
                   height={100}
                   width={100}
                   className="h-[60px] w-[60px] rounded-full object-cover"
                 />
                 

                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex">
                        {post?.authorId?.name}
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
       
      </ControlPanel>
    </>
  );
};

export default Posts;
