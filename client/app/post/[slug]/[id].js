import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useGetPostQuery } from "@/services/post/postApi";
import Content from "@/components/shared/content/PostContent";
import LeftSidebar from "./leftSidebar";  
import RightSidebar from "./rightSidebar";
const PostContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetPostQuery(id);
  return (
    <main>
      <Head>
        <title>{fetchData?.data?.title}</title>
      </Head>

      <Main>
        <div className="grid grid-cols-1 dark:bg-gray-900 py-20 md:grid-cols-20 gap-4 mt-8 relative ">
        <LeftSidebar />

        <div className="col-span-1 md:col-span-10 shadow  order-1 md:order-2">

          <Content
            title={fetchData?.data?.title}
            content={fetchData?.data?.content}
            thumbnailPreview={fetchData?.data?.featuredImage}
            publishDate={fetchData?.data?.publishDate}
            gallery={fetchData?.data?.gallery}
            like={0}
            view={0}
            disLike={0}
            comment={[]}
            isLoading={fetching}
            selectedTags={fetchData?.data?.tags}
            author={fetchData?.data?.creator?.name}
            avatar={fetchData?.data?.creator?.avatar?.url}
          />

        </div>
        <RightSidebar />

        </div>
      </Main>
    </main>
  );
};

export default PostContent;
