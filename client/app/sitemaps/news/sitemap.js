import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const news = await Api('/dynamic/get-all/news');

    news.forEach(newitem => {
        const item = {
            priority: 0.5,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/news/" + newitem.newsId + "/" + encodeURIComponent(newitem.translations.en.slug),
            lastModified: newitem.lastUpdated,
            changeFrequency: 'daily',
            images: [newitem.thumbnail.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}