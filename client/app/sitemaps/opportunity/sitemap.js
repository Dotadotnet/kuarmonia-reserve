import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Simple fetch implementation instead of Api utility
    const api = `${process.env.NEXT_PUBLIC_API}/dynamic/get-all/opportunity`;
    let opportunities = [];
    
    try {
        const response = await fetch(api, {
            cache: "no-store"
        });
        const data = await response.json();
        opportunities = data.data || [];
    } catch (error) {
        console.error("Error fetching opportunities:", error);
        opportunities = [];
    }

    opportunities.forEach(opportunity => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/opportunity/" + opportunity.opportunityId + "/" +  opportunity.slug,
            lastModified: opportunity.lastUpdated,
            changeFrequency: 'weekly',
            images : [opportunity.thumbnail?.url]
        };
        sitemap.push(item)
    });    
    setLangSitemap(sitemap);    
    return sitemap;
}