import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/rent`);
    const rents = await response.json();
    
    rents.data.forEach(rent => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/rent/" + rent.rentId + "/" + rent.slug,
            lastModified: rent.lastUpdated,
            changeFrequency: 'weekly',
            images: rent.thumbnail ? [rent.thumbnail.url] : [rent.gallery[0].url]
        };
        sitemap.push(item)
    });
    
    setLangSitemap(sitemap);
    return sitemap;
}