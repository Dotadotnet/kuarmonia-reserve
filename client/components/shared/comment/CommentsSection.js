'use client'

import Image from 'next/image';

const CommentsSection = ({ comments, isLoading, onSubmit }) => {
  return (
    <section className="bg-gray-100 py-8 rtl dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl  mb-4">نظرات کاربران</h2>

        <div className="space-y-4">
          {!comments ? (
            <div className="flex flex-col space-y-4">
              {/* Skeleton Loader */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-300 p-4 rounded-lg shadow dark:bg-gray-600 animate-pulse">
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
          ) : (
            comments && comments?.length > 0 ? (
              comments.map((comment, index) => (
                <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600" key={index}>
                  <div className="flex items-center mb-2">
                    <Image
                      src={comment.adminAvatar}
                      alt="تصویر کاربر"
                      width={40}
                      height={40}
                      className="rounded-full ml-3"
                    />
                    <div>
                      <h3 className="font-semibold">{comment.adminName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        ارسال شده در {new Date(comment.date).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>
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
                        <div className="bg-gray-100 p-4 rounded-lg shadow dark:bg-gray-800" key={replyIndex}>
                          <div className="flex items-center mb-2">
                            <Image
                              src={reply.adminAvatar}
                              alt="تصویر کاربر"
                              width={32}
                              height={32}
                              className="rounded-full ml-3"
                            />
                            <div>
                              <h3 className="font-semibold">{reply.adminName}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-300">
                                ارسال شده در {new Date(reply.date).toLocaleDateString("fa-IR")}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-200">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : null
          )}
        </div>

        {/* Form to add comment */}
        <form
          className="mt-8 bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

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
  );
};

export default CommentsSection;
