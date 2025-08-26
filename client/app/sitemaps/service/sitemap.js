import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const services = await Api('/dynamic/get-all/service');

    services.forEach(service => {
        const item = {
            priority: 0.9,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/service/" + service.serviceId + "/" +  encodeURIComponent(service.translations.en.slug) ,
            lastModified: service.lastUpdated,
            changeFrequency: 'daily',
            images : [service.thumbnail.url]
        };
        sitemap.push(item)
    });         
    setLangSitemap(sitemap);    
    return sitemap;
}