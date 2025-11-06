import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Simple fetch implementation instead of Api utility
    const api = `${process.env.NEXT_PUBLIC_API}/dynamic/get-all/visaType`;
    let visaTypes = [];
    
    try {
        const response = await fetch(api, {
            cache: "no-store"
        });
        const data = await response.json();
        visaTypes = data.data || [];
    } catch (error) {
        console.error("Error fetching visa types:", error);
        visaTypes = [];
    }

    visaTypes.forEach(visaType => {
        const item = {
            priority: 0.9,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/visa-types/" + visaType.visaTypeId + "/" + visaType.slug_en,
            lastModified: visaType.lastUpdated,
            changeFrequency: 'daily',
            images: [visaType.thumbnail?.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}