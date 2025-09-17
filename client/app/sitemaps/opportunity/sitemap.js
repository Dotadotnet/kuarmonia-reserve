import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const opportunities = await Api('/dynamic/get-all/opportunity');

    opportunities.forEach(opportunity => {
        const item = {
            priority: 0.7,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/opportunity/" + opportunity.opportunityId + "/" +  opportunity.slug ,
            lastModified: opportunity.lastUpdated,
            changeFrequency: 'weekly',
            images : [opportunity.thumbnail.url]
        };
        sitemap.push(item)
    });    
    setLangSitemap(sitemap);    
    return sitemap;
}