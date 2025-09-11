
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from '@/i18n/navigation';

const Pagination = ({ currentPage, totalPages, url }) => {

    const pages = [];
    const pageCount = Math.ceil(totalPages / 10)
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return (
        <>
            {
                pages.includes(currentPage) ?
                    <div className="flex justify-center mt-4 gap-x-1.5 sm:gap-x-2">
                        {currentPage - 1 !== 0 ?
                            <Link
                                className="custom-button sm:size-11 size-10 flex items-center justify-center"
                                href={url.replace("{page}", currentPage - 1)}
                                disabled={currentPage - 1 === 0}
                            >
                                <MdNavigateNext className="size-6 rotate-180 rtl:rotate-0  transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
                            </Link>
                            :
                            ""
                        }
                        {pages.map((page) => {
                            let numberDistance = Math.abs(page - currentPage)
                            if (numberDistance <= 2) {
                                return (
                                    <Link
                                        key={page}
                                        className={`custom-button shrink-0 sm:size-11 size-10 flex items-center justify-center  text-lg ${currentPage == page ? 'shadow-[0px_0px_4px_4px] shadow-green-600/60 dark:shadow-blue-600/60' : 'bg-gray-300 text-black'} `}
                                        href={url.replace("{page}", page)}
                                    >
                                        {page}
                                    </Link>
                                )
                            }
                        })}
                        {currentPage !== pageCount ?
                            <Link
                                className="custom-button sm:size-11 size-10 flex items-center justify-center"
                                href={url.replace("{page}", currentPage + 1)}
                            >
                                <GrFormPrevious className="size-6  rotate-180 rtl:rotate-0 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
                            </Link>
                            :
                            ""
                        }
                    </div>
                    : ""
            }
        </>
    );
};

export default Pagination;