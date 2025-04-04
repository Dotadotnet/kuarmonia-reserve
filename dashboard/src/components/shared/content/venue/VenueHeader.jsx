import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const VenueHeader = ({ venue }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between gap-x-2 items-center">
        <div className="w-full">
          {venue?.title ? (
            <h1 className="text-lg dark:text-gray-300">{venue?.title}</h1>
          ) : (
            <SkeletonText lines={1} />
          )}
        </div>
        <div className="flex gap-x-2">
          <button className="vendor-favorite p-2 cursor-pointer rounded-full border  border-green-500 dark:border-blue-500  text-green-500 dark:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L9.707 6.707a1 1 0 0 1-1.414-1.414zM4 11a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v9h12v-9h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
              />
            </svg>
          </button>
          <button className="vendor-share p-2 rounded-full border border-green-500 dark:border-blue-500 cursor-pointer text-green-500 dark:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"
              />
            </svg>
          </button>
        </div>
      </div>
      {venue?.summary ? (
        <h2 className="flex  text-md  text-gray-500 dark:text-blue-500 font-medium">
          {venue?.summary}
        </h2>
      ) : (
        <SkeletonText lines={1} />
      )}{" "}
      <div className="flex  text-lg">
        <div className="flex  flex-wrap gap-x-8 gap-y-2">
          <div className="rating flex gap-x-1 items-center justify-center">
            <div className="flex space-x-1 text-orange-500 text-sm mt-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < venue?.rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="comment flex items-center justify-center">
            <button className="cursor-pointer flex justify-center gap-x-1 items-center">
              <span className=" text-green-600 dark:text-blue-500 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7.09 2.75a4 4 0 0 0-4 4v6.208a4 4 0 0 0 4 4h.093v3.792a.5.5 0 0 0 .839.368l4.52-4.16h4.369a4 4 0 0 0 4-4V6.75a4 4 0 0 0-4-4z"
                  />
                </svg>
              </span>
              <span className="text-sm">نظر</span>
            </button>
          </div>
          {venue?.address?.length  > 7 ? (
            <div className="location flex items-center justify-center">
              <button className="cursor-pointer flex items-center gap-x-1 ">
                <span className=" text-green-600 dark:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="m12.065 21.243l-.006-.005zm.182-.274a29 29 0 0 0 3.183-3.392c2.04-2.563 3.281-5.09 3.365-7.337a6.8 6.8 0 1 0-13.591 0c.085 2.247 1.327 4.774 3.366 7.337a29 29 0 0 0 3.183 3.392q.166.15.247.218zm-.985 1.165S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 12.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                    />
                  </svg>
                </span>
                <span className=" text-black dark:text-white font-light"> {venue?.address} </span>
              </button>
            </div>
          ):(
            <SkeletonText lines={1} />

          )}
        </div>
      </div>
    </div>
  );
};
export default VenueHeader;
