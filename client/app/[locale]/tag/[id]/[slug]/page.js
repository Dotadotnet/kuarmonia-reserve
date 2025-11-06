// import NotFound from "@/app/404";
import language from "@/app/language";
import DynamicModelBox from "@/components/shared/dynamic/dynamicModelBox";
import DynamicModelData from "@/components/shared/dynamic/dynamicModelData";
import Pagination from "@/components/shared/pagination/ServerSide";
import canonicalUrl from "@/components/shared/seo/canonical";
import Main from "@/layouts/Main";
import { getTranslations } from "next-intl/server";
import { FaTags } from "react-icons/fa";

export async function generateMetadata({ params }) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const { id, locale, slug } = params;
    const tag = await Api(`/dynamic/get-one/tag/tagId/${id}`);
    const canonical = await canonicalUrl()
    const seoTranslations = await getTranslations('Seo');
    const class_language = new language(locale);
    const lang = class_language.getInfo()
    const metadata = {
        title: seoTranslations("TagName") + " | " + tag.title,
        description: seoTranslations("TagName") + " | " + tag.description,
        keywords: tag.keynotes ? tag.keynotes.map(tag => { return tag }).join(" , ") : null,
        creator: tag.creator.name,
        openGraph: {
            title: tag.title,
            description: tag.description,
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
    const { id, slug, locale } = params;
    const paramsGet = await searchParams;
    const page = paramsGet.page;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const tagTarget = await Api("/dynamic/get-one/tag/tagId/" + id);
    const transitionSeo = await getTranslations("Seo")
    const tagsRes = await Api("/tag/get-items/" + (page ? page : 1) + "/" + tagTarget._id);
    const totalTag = tagsRes.total;
    const url = hostLang + "/tag/" + id + "/" + tagTarget.slug
    const data = await DynamicModelData(tagsRes.data)
    const canonical = await canonicalUrl()

    if (!tagTarget || tagTarget.slug !== slug) {
        return <RedirectTag params={params} />;
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "keywords": tagTarget.keynotes ? tagTarget.keynotes.map(tag => { return tag }).join(" , ") : null,
        "name": tagTarget.title,
        "description": tagTarget.description,
        "url": canonical.canonical,
        "image": {
            "@type": "ImageObject",
            "url": data[0] ? data[0].image : host + "/banners/1.jpg",
        },
        "publisher": {
            "@type": "Organization",
            "@id": hostLang + "/#organization"
        },
        "hasPart": data.map((tag) => {
            return (
                {
                    "@type": tag.schema,
                    "@id": tag.link + "/#main"
                }
            )
        })
    }

    return (
        <>
            <Main schema={schema}>
                <div className="pt-28 sm:pt-34">
                    <div className="flex items-center mx-5 sm:mx-14 ">
                        <FaTags className="text-3xl sm:text-4xl" /> <p className="ml-2 font-vazir text-gray-900 dark:text-white font-bold text-2xl sm:text-3xl rtl:mr-2"> {transitionSeo("TagName") + " :   "}   </p>
                        <h1 className=" text-gray-900 dark:text-white text-2xl sm:text-3xl  shadow-title font-bold ml-2 rtl:mr-2"> {tagTarget.title} </h1>
                    </div>
                    <h2 className="mx-8 mt-6 sm:mx-16 lg:mx-26">
                        {tagTarget.description}
                    </h2>
                    <div className="mt-6">
                        <DynamicModelBox data={data} />
                    </div>
                    <br />
                    <Pagination url={url + "?page={page}"} currentPage={page ? parseInt(page) : 1} totalPages={totalTag} />
                </div>
                <br />
            </Main>
        </>
    );
}    