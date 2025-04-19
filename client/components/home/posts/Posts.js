import PostsClient from "./PostsClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
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
      className="bg-clip-border h-full py-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/posts-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>پست های </HighlightText> جدید
              </h1>
              <p className="text-base">
                پست های ما شامل جدیدترین اطلاعات و تغییرات در قوانین مهاجرت و
                اخذ ویزا هستند که می‌توانند به شما در تصمیم‌گیری‌های مهم کمک
                کنند.{" "}
              </p>
            </article>
          </div>
          <div className="flex flex-col gap-y-4 ">
            <PostsClient posts={posts} />
          </div>
        </section>
      </Container>
    </section>
  );
};

export default PostsServer;
