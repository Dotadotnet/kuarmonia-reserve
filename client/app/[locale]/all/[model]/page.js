import language from "@/app/language";
import DynamicModelBox from "@/components/shared/dynamic/dynamicModelBox";
import DynamicModelData from "@/components/shared/dynamic/dynamicModelData";
import Pagination from "@/components/shared/pagination/ServerSide";
import canonicalUrl from "@/components/shared/seo/canonical";
import Main from "@/layouts/Main";
import { modelsInfo } from "@/components/shared/dynamic/modelInfo";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params , searchParams }) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const { id, locale, model } = params;
    const paramsGet = await searchParams;
    const page = paramsGet.page;
    const canonical = await canonicalUrl()
    const seoTranslations = await getTranslations('Seo');
    const class_language = new language(locale);
    const lang = class_language.getInfo()
    const transitionModel = await getTranslations("Model");
    const transitionModelPageAllTitle = await getTranslations("ModelPageAllTitle");
    const transitionModelPageAllDis = await getTranslations("ModelPageAllDis");
    const title = transitionModelPageAllTitle(model);
    const description = transitionModelPageAllDis(model)
    const name = transitionModel(model)
    const metadata = {
        title: name + " | " + title,
        description: name + " | " + description,
        openGraph: {
            title: title,
            description: description,
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
    const { id, model, locale } = params;
    const modelInfo = modelsInfo[model];
    
    if(!modelInfo){
        return notFound()
    }

    const paramsGet = await searchParams;
    const page = paramsGet.page;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const transitionSeo = await getTranslations("Seo")
    const transitionModel = await getTranslations("Model");
    const transitionModelPageAllTitle = await getTranslations("ModelPageAllTitle");
    const transitionModelPageAllDis = await getTranslations("ModelPageAllDis");
    const dataRes = await Api(`/dynamic/get-all/${model}?page=${(page ? page : 1)}`);
    const totalTag = await Api(`/dynamic/count-all/${model}`);
    const data = await DynamicModelData(dataRes)
    const title = transitionModelPageAllTitle(model);
    const description = transitionModelPageAllDis(model)
    const canonical = await canonicalUrl()
    const url = hostLang + "/all/" + model;

    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name":  transitionModelPageAllTitle(model) ,
        "description":  transitionModelPageAllDis(model) ,
        "url": canonical.canonical ,
        "image" : data[0] ? data[0].image : host + "/banners/1.jpg" ,
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
            <Main schema={schema} >
                <div className="pt-28 sm:pt-34">
                    <div className="flex text-2xl sm:text-3xl items-center mx-5 sm:mx-14 ">
                        {modelInfo.icon} <h1 className="inline  text-gray-900 dark:text-white  shadow-title font-bold ml-3 rtl:mr-3"> {title} </h1>
                    </div>
                    <h2 className="mx-8 sm:text-left mt-6 sm:mx-16 lg:mx-26">
                        {description}
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