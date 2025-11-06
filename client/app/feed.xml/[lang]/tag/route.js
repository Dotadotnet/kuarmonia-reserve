// src/app/feed.xml/route.ts
import language from '@/app/language';
import { getTranslations } from 'next-intl/server';
import RSS from 'rss';

export async function GET(request) {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const current_url = request.url;
    let host_exploded = current_url.split("/");
    const lang_string = host_exploded[host_exploded.length - 2];
    const lang_class = new language(lang_string);
    const lang = lang_class.getInfo()
    const t = await getTranslations({ locale: lang.lang, namespace: 'Rss' });
    const hostLang = process.env.NEXT_PUBLIC_BASE_URL + ( lang.lang !== "fa" ? "/" +  lang.lang : '' ) ;
    const feed = new RSS({
        title: t("tagTitle"),
        description: t("tagDis"),
        feed_url: current_url,
        site_url: hostLang ,
        image_url: host + "/banners/1.jpg",
        language: lang.lang + "-" + lang.loc.trim().toLocaleLowerCase(),
        pubDate: new Date().toUTCString(),
        copyright: `Copyright ${new Date().getFullYear()}, ${"majid pashayi"}`,
    });
    const items = await Api('/dynamic/get-all/tag',lang.lang);
    items.forEach((item) => {
        feed.item({
            title: item.title,
            description: item.description,
            guid: item.tagId,
            url: hostLang + "/tag/" + item.tagId + "/" + item.slug,
            categories: typeof item.category == "object" ? [item.category.title] : [],
            date: item.createdAt,
            author: typeof item.authorId == "object" ? item.authorId.name : "",
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}