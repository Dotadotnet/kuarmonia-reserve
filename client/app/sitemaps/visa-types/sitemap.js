import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const visaTypes = await Api('/dynamic/get-all/visaType');
    visaTypes.forEach(visaType => {
        const item = {
            priority: 0.9,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/visa-types/" + visaType.visaTypeId + "/" + visaType.slug_en,
            lastModified: visaType.lastUpdated,
            changeFrequency: 'daily',
            images: [visaType.thumbnail.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}
