import NewsClient from "./NewsClient";
import { getTranslations } from "next-intl/server";

export default async function NewsSection({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/news/get-news/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const news = res.data;
console.log(news)
  return 
  <>
   <NewsClient news={news} />; 
  </>
}