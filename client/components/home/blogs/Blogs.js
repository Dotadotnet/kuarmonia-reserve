import BlogsClient from "./BlogsClient";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
const BlogsServer = async () => {
  const api = `${process.env.API}/blog/get-blogs`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["blogs"] }
  });
  const res = await response.json();
  const blogs = res.data;

  return (
    <section
      id="blogs"
      className="bg-clip-border h-full py-4 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-4">
          
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4 items-start">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"مجلات و مقالات"} />
              </h2>
              <p className="text-base"> نگاهی کوتاه به موضوعات مهاجرت، ازدواج  </p>
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
          <BlogsClient blogs={blogs} />
        </div>
      </Container>
    </section>
  );
};

export default BlogsServer;
