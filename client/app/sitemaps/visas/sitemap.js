import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const visas = await Api('/dynamic/get-all/visa');
    visas.forEach(visa => {
        const item = {
            priority: 0.5,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/visas/" + visa.visasId + "/" + visa.slug,
            lastModified: visa.lastUpdated,
            changeFrequency: 'daily',
            images: [visa.thumbnail.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}