"use client"
import language from "@/app/language";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { PulseLoader } from "react-spinners";

function SearchInput({ defaultText, url = null }) {
    const SearchPageTranslations = useTranslations("SearchPage")
    const router = useRouter();
    const [searching, setSearching] = useState(false);
    const [text, setText] = useState(defaultText);
    const locale = useLocale();
    const class_language = new language(locale);
    const lang = class_language.getInfo()
    const handleSearch = () => {
        if (text !== defaultText && text) {
            setSearching(true)
            if (url) {
                let slug = encodeURIComponent(text.trim().replaceAll(" ", "-"));
                let resultUrl = url.replace("{text}", slug)
                router.push(resultUrl)
            }
        }
    }
    return (
        
        <label htmlFor="search" className="items-center mt-5 md:mt-0 flex-wrap-reverse gap-3 flex-row-reverse md:justify-center justify-center flex">
            <button onClick={() => { handleSearch() }} type="button" class="text-white text-nowrap rtl:mr-3 ml-3 cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 flex justify-center items-center h-9 text-center ">
                {
                    searching ?
                        <PulseLoader color="#ffffff"  />
                        :
                        SearchPageTranslations("Search")
                }
            </button>
            <div className="relative flex items-center">
                <span className={"absolute w-11 h-full top-0 flex justify-center items-center " + (lang.dir == "rtl" ? "left-0" : "right-0")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </span>
                <input
                    type="search"
                    id="search"
                    autocomplete="off" 
                    onKeyUp={(event) => {
                        if (event.keyCode === 13) {
                            handleSearch()
                        }
                    }}
                    placeholder={SearchPageTranslations("SearchAction")}
                    className="block w-full py-1.5 pl-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pr-11 rtl:pl-11 rtl:pr-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    defaultValue={text}
                    onChange={(event) => { setText(event.target.value) }}
                />
            </div>
        </label>
    );
}

export default SearchInput;

