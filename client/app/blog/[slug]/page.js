import Main from "@/layouts/Main";
import Content from "@/components/shared/content/Content";
import LeftSidebar from "./leftSidebar";  
import RightSidebar from "./rightSidebar";

export async function generateMetadata(
  { params, searchParams },
  parent
) {
    const { slug } = await params ;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/dynamic/get/blog/slug/' +slug);
  const res_decoded = await res.json();
  const data = res_decoded.data;  
  return {
    title: data.title,
    openGraph: {
      images: [data.thumbnail.url],
    },
  }
}

const BlogContent = async ({ params }) => {
  const { slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/dynamic/get/blog/slug/' + slug);
  const fetchData = await res.json();


  return (
    <main>
      <Main>
        <div className="grid grid-cols-1 md:grid-cols-20 gap-4 dark:bg-gray-900 p-4 relative mt-2">
          <LeftSidebar />
          <Content 
            title={fetchData?.data?.title}
            content={fetchData?.data?.content}
            featureImage={fetchData?.data?.featuredImage?.url}
            publishDate={fetchData?.data?.publishDate}
            author={fetchData?.data?.creator?.name}
            avatar={fetchData?.data?.creator?.avatar?.url}
            selectedTags={fetchData?.data?.tags}
          />

          <RightSidebar />
        </div>
      </Main>
    </main>
  );
};

export default BlogContent;
