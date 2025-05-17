import NewsContent from "@/components/shared/content/NewsContent";
import Main from "@/layouts/Main";
import Sidebar from "./Sidebar"; 
import './Style.css';

const NewsPost = async ({ params }) => {
  // Ensure params is awaited
  const { id, locale } = await params;  // Await the params

  const api = `${process.env.NEXT_PUBLIC_API}/news/get-news/${id}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news", `news/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const news = res.data;

  const directionClass = locale === "fa" ? "rtl" : "ltr";

  return (
    <Main>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${directionClass} px-4 py-12`}>
        <div className="lg:col-span-2">
          <NewsContent news={news} />
        </div>
        <div className="lg:col-span-1">
          <Sidebar locale={locale} />
        </div>
      </div>
    </Main>
  );
};

export default NewsPost;
