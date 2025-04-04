import ReactPlayer from 'react-player';
import Image from 'next/image';
import Head from 'next/head';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import CommentsSection from "@/components/shared/comment/CommentsSection"
import Main from "@/layouts/Main";

const MediaDetailPage = ({ media, comments }) => {
  console.log(media)
  return (
    <>
      <main>
        <Head>
          <title>{media?.title}</title>
        </Head>

        <Main>
          <div className="flex w-full justify-center pt-28 flex-row h-[calc(100%-56px)] bg-white dark:bg-gray-900">
            <div className="w-full mx-auto px-4 gap-2 flex flex-col lg:flex-row-reverse ">
              <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] lg:py-6 overflow-y-auto">
                <div className="rounded-lg w-full h-full lg:overflow-hidden">
                  <ReactPlayer
                    url={media?.media?.url}
                    controls
                    width="100%"
                    height="100%"
                    style={{ backgroundColor: "#000" }}
                    playing={true}
                  />
                </div>
                <div className="text-black dark:text-white text-sm md:text-xl m-4 ">
                  {media?.title}
                </div>

                <div className="flex justify-between m-2 flex-row mt-4">
                  <div className="flex ">
                    <div className="flex items-start ">
                      <div className="flex h-11 w-11 rounded-full overflow-hidden">
                        <Image
                          src={media?.creator?.avatar?.url}
                          alt="avatar"
                          width={50}
                          height={50}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mr-3 ">
                      <div className="text-black dark:text-white text-md flex items-center">
                        {media?.creator?.name}
                      </div>
                      <div className="text-black/[0.7] dark:text-white/[0.7] text-sm">
                        {new Date(media?.createdAt).toLocaleDateString("fa-IR", {
                          weekday: "long"
                        })}{" "}
                        - {new Date(media?.createdAt).toLocaleDateString("fa-IR")}
                      </div>
                    </div>
                  </div>
                  <div className="flex dark:text-white mt-4 md:mt-0">
                    <AiOutlineLike className="w-8 h-8 text-blue-600 k ml-2" />
                    <AiOutlineDislike className="w-8 h-8 text-red-600 ml-2" />
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="text-black dark:text-white m-2 bg-gray-100 dark:bg-gray-800 text-sm md:text-base my-4 p-4 rounded-lg ">
                  {media?.description}
                </div>
                <CommentsSection
                  comments={comments}
                  onSubmit={() => { /* handle comment submission */ }}
                />
              </div>
            </div>
          </div>
        </Main>
      </main>
    </>
  );
};
export async function getServerSideProps({ params }) {
  const { id } = params;
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/api/media/${id}`;

  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }

    const res = await response.json();
    const media = res.data;

    // اگر بخواهید کامنت‌ها را هم از API دیگری بارگذاری کنید
    // const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?mediaId=${id}`);
    
    // if (!commentsResponse.ok) {
    //   throw new Error(`Failed to fetch comments: ${commentsResponse.statusText}`);
    // }

    // const commentsData = await commentsResponse.json();
    // const comments = commentsData.data;

    return {
      props: {
        media,
      },
    };
  } catch (error) {
    console.error("Error fetching media data:", error);
    return {
      props: {
        media: null,
      },
    };
  }
}

export default MediaDetailPage;
