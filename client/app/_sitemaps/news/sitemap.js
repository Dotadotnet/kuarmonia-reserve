import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/news`);
    const news = await response.json();
    
    news.data.forEach(newitem => {
        const item = {
            priority: 0.5,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/news/" + newitem.newsId + "/" + newitem.slug,
            lastModified: newitem.lastUpdated,
            changeFrequency: 'daily',
            images: [newitem.thumbnail.url]
        };
        sitemap.push(item)
    });
    
    setLangSitemap(sitemap);
    return sitemap;
}