import Link from "next/link";
import Image from "next/image";

const TagItemCard = ({ item }) => {
  const {
    title,
    summary,
    slug,
    thumbnail,
    createdAt,
    canonicalUrl
  } = item;

  return (
    <Link
      href={canonicalUrl || `/item/${slug}`}
      className="flex flex-col justify-center rtl dark:text-white w-full cursor-pointer"
    >
      <div className="relative transition-color ease-linear delay-100 hover:border-primary flex sm:flex-row  rounded-primary shadow-lg w-full mx-auto p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800/70 bg-white/80">
        <div className="w-1/3 flex items-center justify-start">
          {thumbnail?.url ? (
            <div className="relative w-28 h-28">
              <Image
                src={thumbnail.url}
                alt={title || "Item Preview"}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
          )}
        </div>
        <div className="w-2/3 space-y-2 px-2 flex flex-col">
          <h3 className="text-gray-800 line-clamp-1 dark:text-gray-100 m-0 text-sm md:text-lg text-right">
            {title}
          </h3>

          <p className="text-xs line-clamp-3 lg:line-clamp-4 lg:text-sm text-gray-500 text-right">
            {summary}
          </p>

          <div className="absolute bottom-1 w-2/3 text-xs lg:text-sm flex justify-between items-end">
            <div>
              {createdAt
                ? `${new Date(createdAt).toLocaleDateString("fa-IR", {
                    weekday: "long"
                  })} - ${new Date(createdAt).toLocaleDateString("fa-IR")}`
                : ""}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TagItemCard;