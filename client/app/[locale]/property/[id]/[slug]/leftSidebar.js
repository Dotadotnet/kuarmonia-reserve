import React, { useMemo } from "react";
import { useGetAllPostsQuery } from "@/services/post/postApi";
import Image from 'next/image';
const leftSidebar = () => {


  const { isLoading, data, error } = useGetAllPostsQuery({ page: 1, limit: 10 });
  const posts = useMemo(() => data?.data || [], [data]);
  console.log(posts)
    return (
      <div className={`col-span-1 md:mt-128 md:col-span-5 flex flex-col gap-4 order-2 md:order-1`}>
           
           {posts.map(({ _id, title, description,featuredImage }) => (
          <div
            key={_id}
            className="flex gap-x-2 cursor-pointer items-start bg-white/70 dark:bg-gray-800 shadow p-4 rounded-primary"
          >
            <Image
            src={featuredImage?.url}
            height={300}
            alt={title}
width={300}
className="w-24 h-24 rounded-lg"
/>
            <div className="w-full flex flex-col gap-y-1">
              <h2 className="text-lg line-clamp-1">{title}</h2>
              <p className="text-xs lg:line-clamp-4 md:line-clamp-4 text-justify line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}

      </div>
    );
  };
  export default leftSidebar;

  