import React from 'react';
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
                    <div className="flex justify-center mt-4 gap-x-2">
                        {currentPage - 1 !== 0 ?
                            <Link
                                className="custom-button"
                                href={url.replace("{page}", currentPage - 1)}
                                disabled={currentPage - 1 === 0}
                            >
                                <MdNavigateNext className="h-6 rotate-180 rtl:rotate-0 w-6 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
                            </Link>
                            :
                            ""
                        }
                        {pages.map((page) => (
                            <Link
                                key={page}
                                className={`custom-button w-11 h-11 flex items-center justify-center  text-lg ${currentPage == page ? 'shadow-[0px_0px_4px_4px] shadow-green-600/60 dark:shadow-blue-600/60' : 'bg-gray-300 text-black'} `}
                                href={url.replace("{page}", page)}
                            >
                                {page}
                            </Link>
                        ))}
                        {currentPage !== pageCount ?
                            <Link
                                className="custom-button"
                                href={url.replace("{page}", currentPage + 1)}
                            >
                                <GrFormPrevious className="h-6 w-6 rotate-180 rtl:rotate-0 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:-translate-x-1" />
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