import PostsClient from "./PostsClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
const PostsServer = async () => {
  const api = `${process.env.API}/post/get-posts`;
  console.log("API URL:", process.env.API); // Log the API URL for debugging
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["posts"] }
  });
  const res = await response.json();
  const posts = res.data;
  return (
    <section
      id="posts"
      className="bg-clip-border h-full py-4 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/posts-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-4">
          <div className="flex flex-row justify-between items-center">
            <article className="flex items-start flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"از ما بخوانید"} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/medias"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                بیشتر ببینید <BiRightArrowAlt />
              </Link>
            </div>
          </div>
          <p className="text-base">
            جدیدترین تغییرات قوانین مهاجرت در کشورهای مختلف
          </p>
          <PostsClient posts={posts} />
        </section>
      </Container>
    </section>
  );
};

export default PostsServer;
