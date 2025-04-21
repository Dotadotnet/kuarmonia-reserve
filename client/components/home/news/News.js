import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import NewsSlider from "./NewsSlider";

const News = async () => {
  const api = `${process.env.API}/news/get-news`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news"] }
  });
  const res = await response.json();
  const news = res.data;

  return (
    <section
      id="flights"
      className="pt-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-6">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"جدیدترین اخبار "} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/news"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                بیشتر ببینید <BiRightArrowAlt />
              </Link>
            </div>
          </div>
          <p className="text-base">اخبار روز و فرصت های مهاجرت</p>

          <NewsSlider news={news} />
        </div>
      </Container>
    </section>
  );
};

export default News;
