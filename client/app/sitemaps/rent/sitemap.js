import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const rents = await Api('/dynamic/get-all/rent');
    rents.forEach(rent => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/rent/" + rent.rentId + "/" + rent.slug,
            lastModified: rent.lastUpdated,
            changeFrequency: 'weekly',
            images : rent.thumbnail ? [rent.thumbnail.url] : [rent.gallery[0].url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}