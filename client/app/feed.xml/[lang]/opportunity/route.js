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
    const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (lang.lang !== "fa" ? "/" + lang.lang : '');
    const feed = new RSS({
        title: t("opportunityTitle"),
        description: t("opportunityDis"),
        feed_url: current_url,
        site_url: hostLang + "/all/" + "opportunity" ,
        image_url: host + "/banners/1.jpg",
        language: lang.lang + "-" + lang.loc.trim().toLocaleLowerCase(),
        pubDate: new Date().toUTCString(),
        copyright: `Copyright ${new Date().getFullYear()}, ${"majid pashayi"}`,
    });
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/opportunity`);
    const items = await response.json();

    items.data.forEach((item) => {
        feed.item({
            title: item.title,
            description: item.description,
            guid: item.opportunityId,
            url: hostLang + "/opportunity/" + item.opportunityId + "/" + item.slug ,
            categories: typeof item.refId.jobType == "object" ? [item.refId.jobType.title] : [],
            date: item.createdAt,
            author: typeof item.creator == "object" ? item.creator.name : "",
            enclosure: { url: item.thumbnail.url },

        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
        },
    });
}