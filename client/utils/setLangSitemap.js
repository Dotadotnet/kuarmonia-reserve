import { routing } from '@/i18n/routing';

export default function setLangSitemap(data) {
    const defaultLang = routing.defaultLocale;
    const langs = routing.locales;
    let sitemap = data;
    sitemap.forEach((item, index) => {
        const object_url_lang = {}
        langs.forEach((lang) => {
            let uri = item.url.replace(process.env.NEXT_PUBLIC_BASE_URL, "");
            const pathname = uri.split("/");
            let newPath = [...pathname];
            newPath.unshift(lang);
            newPath.unshift("");
            if (!newPath[newPath.length - 1]) {
                newPath.pop()
            }
            var url = process.env.NEXT_PUBLIC_BASE_URL + newPath.join("/").replace("//", "/");
            object_url_lang[lang] = url;
        });
        object_url_lang["x-default"] = item.url
        object_url_lang["fa"] = item.url
        sitemap[index]["alternates"] = { languages: object_url_lang }
    });
    return sitemap;
}