import { Link } from "@/i18n/navigation";
import { FaTag } from "react-icons/fa";

async function TagBox({ tags }) {
    console.log(tags);
    
    return (
        <div className="mt-6 px-8 w-full overflow-x-auto scrollbar-hide flex flex-wrap justify-center gap-2">
            {tags?.length > 0 &&
                tags.map((tag) => (
                    <Link
                        key={tag.tagId}
                        rel="nofollow"
                        title={tag.description} 
                        href={"/tag/" + tag.tagId + "/" + encodeURIComponent(tag.translations.en.title.replaceAll(" ","-")) }
                        className="rounded-lg px-3 transition-all cursor-pointer  flex justify-center items-center gap-x-2 bg-gray-200  py-2 text-xs text-gray-700 dark:text-gray-100 dark:hover:bg-gray-600  hover:bg-gray-300  dark:bg-gray-800"
                    >
                        <FaTag className="w-4 h-4 text-gray-500" />
                        {tag.title}
                    </Link>
                ))}
        </div>
    );
}

export default TagBox;
