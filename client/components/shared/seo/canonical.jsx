import language from "@/app/language";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'
export default async function canonicalUrl(urlDynaimc) {
    const langs_result = [];
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const headersList = await headers()
    var pageUrl = headersList.get("url");
    if (pageUrl[pageUrl.length - 1] == "/") {
        pageUrl.slice(0, -1)
    }
    const url = urlDynaimc ? urlDynaimc.includes(host) ? urlDynaimc : host + urlDynaimc : pageUrl;    
    const lang = await getLocale();
    const class_lang = new language(lang);
    const lang_now = class_lang.getInfo();
    const langs = class_lang.info;
    const pathname = url.replace(host, "").split("/");
    langs.forEach((lang) => {
        let newPath = [...pathname];
        if (lang_now.lang === "fa") {
            if (lang.lang !== "fa") {
                newPath.unshift(lang.lang);
                newPath.unshift("");
            }
        } else {
            if (lang.lang == "fa") {
                newPath[1] = '';
            } else {
                newPath[1] = lang.lang;
            }
        }
        if (!newPath[newPath.length - 1]) {
            newPath.pop()
            newPath.pop()
        }
        const link = host + newPath.join("/").replace("//", "/");
        if (lang.lang == "fa") {
            langs_result.push({
                lang: lang.lang,
                name: lang.name,
                link: link,
                loc: "x-default",
            });
        }
        langs_result.push({
            lang: lang.lang,
            name: lang.name,
            link: link,
            loc: lang.lang + "-" + lang.loc,
        });
    });
    const languages = {};
    langs_result.forEach(lang_result => {
        languages[lang_result.loc] = lang_result.link;
    });
    const result = {
        canonical: languages[lang_now.lang + "-" + lang_now.loc],
        languages: languages,
    }
    return result;
}