import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React, { useState } from "react";
import Image from "next/image";
import VideoCard from "@/components/shared/card/VideoCard"; 
import Pagination from "@/components/shared/pagination/Pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";

const Video = ({medias}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = medias.data ? Math.ceil(medias.data / itemsPerPage) : 1;

  return (
    <section
      className="bg-no-repeat bg-contain bg-center h-full  dark:bg-gray-900 "
      style={{
        backgroundImage:
          "url(/assets/home-page/offer/tree1.svg), url(/assets/home-page/offer/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText> نمایشگاه </HighlightText> رسانه
              <Image
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
              />
            </p>
            <p className="text-base">
              در این ویدئوها، با خدمات تخصصی شرکت ما در زمینه مهاجرت آشنا
              می‌شوید. ما شما را در انتخاب مسیر مناسب برای مهاجرت، آشنایی با
              قوانین جدید و ارائه مشاوره‌های تخصصی همراهی می‌کنیم. این ویدئوها
              می‌توانند به شما در فرآیند تصمیم‌گیری و مهاجرت کمک کنند.
            </p>
          </article>
          <div>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {medias.data.length === 0
                ? Array.from({ length: 4 }, (_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : medias.data.map((media) => (
                    <VideoCard
                    key={media._id}
                    media={media}
                    />
                  ))}
            </section>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />{" "}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Video;
