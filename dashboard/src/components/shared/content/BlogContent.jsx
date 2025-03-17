import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import X from "@/components/icons/X";
import Instagram from "@/components/icons/Instagram";
import Telegram from "@/components/icons/Telegram";
import Whatsapp from "@/components/icons/Whatsapp";
import Tag from "@/components/icons/Tag";

const BlogsContent = ({
  title = "",
  content = "",
  thumbnailPreview,
  publishDate = null,
  selectedTags = [],
  author = "",
  avatar,
  comments
}) => {
  const colors = [
    { bg: "bg-orange-200", text: "text-orange-700" },
    { bg: "bg-green-200", text: "text-green-700" },
    { bg: "bg-blue-200", text: "text-blue-700" },
    { bg: "bg-red-200", text: "text-red-700" },
    { bg: "bg-purple-200", text: "text-purple-700" },
    { bg: "bg-yellow-200", text: "text-yellow-700" },
    { bg: "bg-pink-200", text: "text-pink-700" }
  ];
  return (
    <div className="col-span-1  md:col-span-10 shadow  mt-96 order-1 md:order-2">
      <div className="absolute inset-0 h-[400px]   z-20">
        {!thumbnailPreview && (
          <SkeletonImage
            width={1150}
            height={500}
            showSize={true}
            borderRadius=""
            className=" h-[500px] "
          />
        )}
        {thumbnailPreview && (
          <img
            src={thumbnailPreview}
            alt="Feature Image"
            width={1200}
            height={500}
            className="w-full object-cover  h-[500px]"
          />
        )}
      </div>
      <div className="max-w-3xl mx-auto ">
        <div className="relative rounded-full">
          <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40">
            {!avatar && (
              <div className="profile-container dark:!border-gray-600 text-center shine-effect rounded-full flex justify-center mb-4">
                <SkeletonImage
                  height={100}
                  width={100}
                  showSize={false}
                  borderRadius="rounded-full"
                />
              </div>
            )}

            {avatar && (
              <div className="profile-container text-center shine-effect rounded-full flex justify-center mb-4">
                <img
                  src={avatar}
                  alt="avatar"
                  height={300}
                  width={300}
                  className="h-[100px] w-[100px] profile-pic rounded-full text-center"
                />
              </div>
            )}
          </div>

          <div className="relative bg-gray-50 z-30 dark:bg-gray-800 dark:text-gray-100 shadow-lg top-0 -mt-20 p-5 sm:p-10 ">
            <div className="flex items-center mt-14 justify-center text-center">
              <div className="text-gray-700 mt-6 md:mt-0">
                <p>
                  <a
                    href="#"
                    className="text-indigo-600  font-medium hover:text-gray-900 transition text-center duration-500 ease-in-out dark:text-gray-300"
                  >
                    <span className="text-2xl"> {author}</span>
                  </a>
                </p>
                <p className="text-center text-sm mt-1">
                  <span className="font-medium">
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long"
                    })}{" "}
                    - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="font-bold text-3xl mb-2 mt-12 text-center">
              {title ? `${title}` : <SkeletonText lines={1} />}
            </h1>
            <div className="text-base leading-8 my-5 text-justify">
              {content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content
                  }}
                ></div>
              ) : (
                <SkeletonText lines={22} />
              )}
            </div>

            {selectedTags.length ? (
              selectedTags.map((tag, index) => {
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div
                    key={index}
                    className={`ml-2 text-xs inline-flex items-center  leading-sm uppercase px-3 py-1 rounded-full ${randomColor.bg}  ${randomColor.text} mb-2`}
                  >
                    <Tag className="ml-1" />
                    {tag.title}
                  </div>
                );
              })
            ) : (
              <SkeletonText lines={1} />
            )}

            <section className="bg-gray-100 py-8 rtl dark:bg-gray-800 dark:text-gray-100">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl  mb-4">نظرات کاربران</h2>

                <div className="space-y-4">
                  {!comments ? (
                    <div className="flex flex-col space-y-4">
                      {/* Skeleton Loader */}
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="bg-gray-300 p-4 rounded-lg shadow dark:bg-gray-600 animate-pulse"
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                            <div className="ml-3">
                              <div className="h-4 bg-gray-400 rounded w-24 mb-2"></div>
                              <div className="h-3 bg-gray-400 rounded w-32"></div>
                            </div>
                          </div>
                          <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div
                        className="bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
                        key={index}
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={comment.userAvatar}
                            alt="تصویر کاربر"
                            width={40}
                            height={40}
                            className="rounded-full ml-3"
                          />
                          <div>
                            <h3 className="font-semibold">
                              {comment.userName}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              ارسال شده در{" "}
                              {new Date(comment.date).toLocaleDateString(
                                "fa-IR"
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200">
                          {comment.text}
                        </p>
                        <div className="flex items-center mt-2">
                          <button className="text-blue-500 hover:text-blue-600 ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 inline"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            پسندیدن
                          </button>
                          <button className="text-gray-500 hover:text-gray-600 dark:text-gray-300">
                            پاسخ
                          </button>
                        </div>

                        {/* نمایش پاسخ‌ها */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-6">
                            {comment.replies.map((reply, replyIndex) => (
                              <div
                                className="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-800"
                                key={replyIndex}
                              >
                                <div className="flex items-center mb-2">
                                  <img
                                    src={reply.userAvatar}
                                    alt="تصویر کاربر"
                                    width={32}
                                    height={32}
                                    className="rounded-full ml-3"
                                  />
                                  <div>
                                    <h3 className="font-semibold">
                                      {reply.userName}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                      ارسال شده در{" "}
                                      {new Date(reply.date).toLocaleDateString(
                                        "fa-IR"
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-200">
                                  {reply.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : null}
                </div>

                {/* Form to add comment */}
                <form
                  className="mt-8 bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    console.log({
                      name: formData.get("name"),
                      comment: formData.get("comment")
                    });
                    // ارسال داده‌ها به API یا پردازش بیشتر
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2">افزودن نظر</h3>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2 dark:text-gray-300"
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-gray-700 font-medium mb-2 dark:text-gray-300"
                    >
                      نظر
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    ارسال نظر
                  </button>
                </form>
              </div>
            </section>

            <div className="absolute top-1/2 right-0 transform translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-900 py-3 px-2 md:px-2 lg:px-3 rounded-full border border-gray-300 dark:border-gray-700">
              <a
                href="https://instagram.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="text-pink-500 w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X className="text-blue-500 w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Telegram className="text-blue-600 w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Whatsapp className="text-blue-600 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogsContent;
