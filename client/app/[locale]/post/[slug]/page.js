import Main from "@/layouts/Main";
import Content from "@/components/shared/content/PostContent";
import LeftSidebar from "./leftSidebar";  
import RightSidebar from "./rightSidebar";
export async function generateMetadata(
  { params, searchParams },
  parent
) {
  
  // read route params
  const { slug } = await params ;


  const res = await fetch(process.env.NEXT_PUBLIC_API + '/dynamic/get/post/slug/' +slug);
  const res_decoded = await res.json();
  const data = res_decoded.data;  
  return {
    title: data.title,
    openGraph: {
      images: [data.thumbnail.url],
    },
  }
}

const PostContent = async ({params}) => {
  const { id, slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_API + '/dynamic/get/post/slug/' + slug);
  const fetchData = await res.json();

  return (
    <main>
     
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
