// import NotFound from "@/app/404";
import language from "@/app/language";
import DynamicModelBox from "@/components/shared/dynamic/dynamicModelBox";
import DynamicModelData from "@/components/shared/dynamic/dynamicModelData";
import Pagination from "@/components/shared/pagination/ServerSide";
import SearchInput from "@/components/shared/search/input";
import canonicalUrl from "@/components/shared/seo/canonical";
import { Link } from "@/i18n/navigation";
import Main from "@/layouts/Main";
import { getTranslations } from "next-intl/server";
import { FaSearch } from "react-icons/fa";

export async function generateMetadata({ params }) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const { id, locale, text } = params;
    const canonical = await canonicalUrl()
    const seoTranslations = await getTranslations('Seo');
    const SearchPageTranslations = await getTranslations('SearchPage');

    const class_language = new language(locale);

    const lang = class_language.getInfo()
    const title = decodeURIComponent(text).replaceAll("-", " ");
    const metadata = {
        title: SearchPageTranslations("Search") + " | " + title,
        description: seoTranslations("defaultDis"),
        keywords: seoTranslations("defaultKeywords"),
        openGraph: {
            title: SearchPageTranslations("Search") + " | " + title,
            description: seoTranslations("defaultDis"),
            keywords: seoTranslations("defaultKeywords"),
            url: canonical.canonical,
            siteName: seoTranslations("siteName"),
            images: host + "/banners/1.jpg",
            locale: lang.lang + "-" + lang.loc,
            type: "website"
        },
        alternates: canonical
    };
    return metadata
}


export default async function Page({ params, searchParams }) {
    const { locale, text } = params;
    const input = decodeURIComponent(text).replaceAll("-", " ");
    const paramsGet = await searchParams;
    const page = paramsGet.page;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const transitionSeo = await getTranslations("Seo")
    const dataRes = await Api(`/search/text/${input}?page=${(page ? page : 1)}`);
    const total = dataRes.total;
    const url = hostLang + "/search/" + text;
    const data = await DynamicModelData(Array.isArray(dataRes.data) ? dataRes.data : [])
    const canonical = await canonicalUrl()
    const SearchPageTranslations = await getTranslations('SearchPage');

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "keywords": transitionSeo("defaultKeywords") + "," + transitionSeo("Search"),
        "name": input,
        "description": transitionSeo("defaultDis"),
        "url": canonical.canonical,
        "image": data[0] ? data[0].image : host + "/banners/1.jpg",
        "publisher": {
            "@type": "Organization",
            "@id": hostLang + "/#organization"
        },
        "hasPart": data.map((item) => {
            return (
                {
                    "@type": item.schema,
                    "@id": item.link + "/#main"
                }
            )
        })
    }


    return (
        <>
            <Main schema={schema}>
                <div className="pt-28 sm:pt-34">
                    <div className="flex flex-col md:flex-row mx-5 sm:mx-14 justify-between">
                        <div className="flex items-center  ">
                            <FaSearch className="text-3xl sm:text-4xl" /> <p className="ml-2 text-black dark:text-white font-bold text-2xl sm:text-3xl rtl:mr-2">  {SearchPageTranslations("ResultSearch") + " : "}  <h1 className="inline shadow-title font-bold "> {input} </h1> </p>
                        </div>
                        <SearchInput defaultText={input} url={hostLang + "/search/{text}"} />
                    </div>
                    {parseInt(total) ?
                        <>
                            <div className="mt-6">
                                <DynamicModelBox data={data} />
                            </div>
                            <br />
                            <Pagination url={url + "?page={page}"} currentPage={page ? parseInt(page) : 1} totalPages={total} />
                        </>
                        :
                        <>
                            <div className="mx-5 sm:mx-14">
                                <p className=" mr-8 text-lg sm:text-xl mt-6">{SearchPageTranslations("Similer") + " : "}
                                    <Link href={hostLang + "/search/" + dataRes.data.trim().replaceAll(" ", "-")} 
                                    className="cursor-pointer relative text-blue-600 font-bold
                                     before:content-[''] before:absolute before:w-full before:bg-blue-600 before:hidden hover:before:inline before:right-0 before:bottom-0 before:h-0.5 before:rounded-4xl "
                                    >{dataRes.data}</Link>
                                </p>
                                <div className="my-32 ">
                                    <p className="text-2xl text-center sm:text-4xl"> {SearchPageTranslations("NotFound")} </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <br />
            </Main>
        </>
    );
}    