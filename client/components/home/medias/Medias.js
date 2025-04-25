import MediasClient from "./MediasClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
const MediasServer = async () => {
  const api = `${process.env.NEXT_PUBLIC_API}/media/get-medias`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["medias"] }
  });
  const res = await response.json();
  const medias = res.data;

  return (
    <section
      id="medias"
      className="bg-clip-border h-full pt-12 dark:bg-gray-900"
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-4">
          <div className="flex flex-row justify-between items-center">
            <article className="flex items-start flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"نمایشگاه رسانه "} />
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
          <p className="text-base">رسانه های اختصاصی ضبط شده در استودیو شرکت</p>

          <MediasClient medias={medias} />
        </section>
      </Container>
    </section>
  );
};

export default MediasServer;
