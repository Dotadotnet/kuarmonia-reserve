import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

async function DynamicModelBox({ data }) {
    const t = await getTranslations("HomePage");
    return (
        <>
            {data.length ?
                <div className="justify-around flex-wrap flex">
                    {data.map((item) => {
                        return (
                            <Link href={item.link} class="flex h-32 sm:h-40 transition-all group items-center bg-white border my-5 mx-2 border-gray-200 rounded-lg shadow-sm sm:w-116 w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" >
                                <img class="object-cover h-full w-32 sm:w-40 rounded-none rounded-s-lg" src={item.image} alt={item.title} />
                                <div className="py-2 sm:py-4 pr-2 pl-4 rtl:pr-4 rtl:pl-2 size-full">

                                    <div class="flex flex-col h-21 sm:h-25 justify-center  leading-normal">
                                        <h5 class="mb-2 text-md sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white"> {item.title}</h5>
                                    </div>

                                    <div className="flex h-7 sm:h-8 overflow-hidden items-center justify-between">
                                        <div className="bg-gray-100  sm:text-xl text-lg dark:bg-gray-700 flex items-center py-1 sm:py-1.5 px-1.5 sm:px-2 rounded-full">
                                            <span>
                                                {item.icon}
                                            </span>
                                            <b className="font-bold text-nowrap ml-2 rtl:mr-2 text-sm sm:text-md">
                                                {item.nameModel}
                                            </b>
                                        </div>
                                        <div className="ml-2 flex justify-center">
                                            <div className="text-blue-500 flex items-center  border-b-2 border-b-transparent transition-all">
                                                <span
                                                    className=" rtl:ml-0.5 mr-0.5 sm:text-md text-sm group-hover:mr-3 rtl:group-hover:ml-3 transition-all whitespace-nowrap"
                                                >
                                                    {t("19")}
                                                </span>
                                                <BiRightArrowAlt className="rtl:rotate-180 font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                : <p className="text-center my-32 text-3xl sm:text-4xl">{t("search.noResults")}</p>
            }
        </>

    )
}
export default DynamicModelBox;