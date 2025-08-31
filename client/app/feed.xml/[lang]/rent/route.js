// src/app/feed.xml/route.ts
import language from '@/app/language';
import { getTranslations } from 'next-intl/server';
import RSS from 'rss';
import Api from "@/utils/api"

export async function GET(request) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const current_url = request.url;
    let host_exploded = current_url.split("/");
    const lang_string = host_exploded[host_exploded.length - 2];
    const lang_class = new language(lang_string);
    const lang = lang_class.getInfo()
    const t = await getTranslations({ locale: lang.lang, namespace: 'Rss' });
    const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (lang.lang !== "fa" ? "/" + lang.lang : '');
    const feed = new RSS({
        title: t("rentTitle"),
        description: t("rentDis"),
        feed_url: current_url,
        site_url: hostLang + "/all/" + "rent" ,
        image_url: host + "/banners/1.jpg",
        language: lang.lang + "-" + lang.loc.trim().toLocaleLowerCase(),
        pubDate: new Date().toUTCString(),
        copyright: `Copyright ${new Date().getFullYear()}, ${"majid pashayi"}`,
    });
    const items = await Api('/dynamic/get-all/rent');

    items.forEach((item) => {
        feed.item({
            title: item.translations[lang.lang].title,
            description: item.translations[lang.lang].description,
            guid: item.rentId,
            url: hostLang + "/rent/" + item.rentId + "/" + encodeURIComponent(item.translations.en.slug),
            categories: typeof item.category == "object" ? [item.category.translations[lang.lang].title] : [],
            date: item.createdAt,
            author: typeof item.creator == "object" ? item.creator.name : "",
            enclosure: item.thumbnail ? { url: item.thumbnail.url } : { url: item.gallery[0].url },

        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}