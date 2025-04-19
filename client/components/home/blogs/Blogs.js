import BlogsClient from "./BlogsClient";

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
      className="bg-clip-border h-full py-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>بلاگ</HighlightText> & راهنما
         
              </h1>
              <p className="text-base">
                این بلاگ‌ها به موضوعات مهاجرت، اخذ ویزا، ازدواج و سرمایه‌گذاری
                در کشورهای خارجی می‌پردازند و اطلاعات مفیدی برای افرادی که قصد
                تغییر و تحول در زندگی خود دارند، ارائه می‌دهند.
              </p>
            </article>
          </div>
          <BlogsClient blogs={blogs} />
        </section>
      </Container>
    </section>
  );
};

export default BlogsServer;
