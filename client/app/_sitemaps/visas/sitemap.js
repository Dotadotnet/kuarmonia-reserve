import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Simple fetch implementation instead of Api utility
    const api = `${process.env.NEXT_PUBLIC_API}/dynamic/get-all/visa`;
    let visas = [];
    
    try {
        const response = await fetch(api, {
            cache: "no-store"
        });
        const data = await response.json();
        visas = data.data || [];
    } catch (error) {
        console.error("Error fetching visas:", error);
        visas = [];
    }

    visas.forEach(visa => {
        const item = {
            priority: 0.9,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/visas/" + visa.visaId + "/" + visa.slug_en,
            lastModified: visa.lastUpdated,
            changeFrequency: 'daily',
            images: [visa.thumbnail?.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}