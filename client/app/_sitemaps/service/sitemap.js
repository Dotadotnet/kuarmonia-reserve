import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/service`);
    const services = await response.json();
    
    services.data.forEach(service => {
        const item = {
            priority: 0.9,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/service/" + service.serviceId + "/" + service.slug,
            lastModified: service.lastUpdated,
            changeFrequency: 'daily',
            images: [service.thumbnail.url]
        };
        sitemap.push(item)
    });
    
    setLangSitemap(sitemap);
    return sitemap;
}