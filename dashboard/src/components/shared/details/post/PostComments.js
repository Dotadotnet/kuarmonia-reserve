
const PostComments = ({ comments }) => (
    <section className="bg-gray-100 py-8 rtl dark:bg-gray-800 dark:text-gray-100 overflow-y-auto">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          {!comments ? (
            <div className="flex flex-col space-y-4">
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
          ) : (
            comments.map((comment, index) => (
              <div
                className="bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
                key={index}
              >
                <div className="flex items-center mb-2">
                  <Image
                    src={comment.userAvatar || "https://via.placeholder.com/40"}
                    alt="تصویر کاربر"
                    width={40} // عرض تصویر
                    height={40} // ارتفاع تصویر
                    className="rounded-full ml-3"
                  />
                  <div>
                    <h3 className="font-semibold">{comment.userName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      ارسال شده در{" "}
                      {new Date(comment.date).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>
              </div>
            ))
          )}
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
      </div>
    </section>
  );

  export default PostComments;