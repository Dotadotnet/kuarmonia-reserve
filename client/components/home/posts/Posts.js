"use client";
import React, {  useMemo,useState } from "react";
import { useGetAllPostsQuery } from "@/services/post/postApi";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import PostCard from "@/components/shared/card/PostCard"; 
import Pagination from "@/components/shared/pagination/Pagination";

const Posts = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = posts.data ? Math.ceil(posts.data.total / itemsPerPage) : 1;
  const superAdmin = useMemo(() => posts.data.superAdmin || [], [posts]);
  return (
    <>
<section className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-2 ">
{ posts.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
          <div
          key={index}
          className="flex flex-col justify-center rtl min-h-[120px] lg:min-h-[200px]  dark:text-white"
            >
              <div className="relative flex flex-row space-x-3 h-full space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px] max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
                <div className="w-1/3 grid place-items-center ">
                <SkeletonImage borderRadius={"rounded-lg"}  />
                </div>
                <div className="w-2/3 flex flex-col space-y-2  lg:p-3">
                <SkeletonText lines={7} />
               
                </div>
              </div>
            </div>
          ))
          : posts.data.map((post) => (
          <PostCard
          key={post._id}
          id={post.id}
          title={post.title}
          slug={post.slug}
          description={post.description}
          thumbnailPreview={post.featuredImage}
          publishDate={post.publishDate}
          author={post?.creator?.name}
          avatar={post?.creator?.avatar?.url}
          superAdmin={superAdmin}
          category={post?.category?.title}
          />
        ))}
          
    </section>
    <Pagination 
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={(page) => setCurrentPage(page)}
    />
        </>
  );
};

export default Posts;
