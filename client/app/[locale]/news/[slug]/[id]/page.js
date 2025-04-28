import NewsContent from "@/components/shared/content/NewsContent";
import Main from "@/layouts/Main";
import Sidebar from "./Sidebar"; 
import './Style.css'
const NewsPost = async ({ params }) => {
  const { id } = params;
  const api = `${process.env.NEXT_PUBLIC_API}/news/get-news/${id}`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news", `news/${id}`] }
  });
  const res = await response.json();
  const news = res.data;

  return (
    <Main>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6   px-4 py-12">
        {/* محتوای خبر - دو سوم در دسکتاپ */}
        <div className="lg:col-span-2">
          <NewsContent news={news} />
        </div>

        {/* سایدبار - یک سوم در دسکتاپ */}
        <div className="lg:col-span-1 ">
          <Sidebar />
        </div>
      </div>
    </Main>
  );
};

export default NewsPost;
