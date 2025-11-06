import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/property`);
    const properties = await response.json();
    
    properties.data.forEach(property => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/property/" + property.propertyId + "/" + property.slug,
            lastModified: property.lastUpdated,
            changeFrequency: 'weekly',
            images: [property.thumbnail.url]
        };
        sitemap.push(item)
    });
    
    setLangSitemap(sitemap);
    return sitemap;
}