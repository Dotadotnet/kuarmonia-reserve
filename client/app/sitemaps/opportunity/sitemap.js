import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const properties = await Api('/dynamic/get-all/property');

    properties.forEach(property => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/opportunity/" + property.propertyId + "/" +  property.slug ,
            lastModified: property.lastUpdated,
            changeFrequency: 'weekly',
            images : [property.thumbnail.url]
        };
        sitemap.push(item)
    });    
    setLangSitemap(sitemap);    
    return sitemap;
}