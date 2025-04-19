import dynamic from "next/dynamic";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import NewsSlider from "./NewsSlider";

const News = async () => {
  const api = `${process.env.API}/news/get-news`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news"] },
  });
  const res = await response.json();
  const news = res.data;

  return (
    <section id="flights" className="py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>جدید ترین</HighlightText> اخبار
              </p>
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

          <NewsSlider news={news} />
        </section>
      </Container>
    </section>
  );
};

export default News;
