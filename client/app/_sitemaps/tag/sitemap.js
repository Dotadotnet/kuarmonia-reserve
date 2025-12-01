import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    
    // Use fetch instead of Api utility
    const tagsResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/tag`);
    const tags = await tagsResponse.json();
    
    for (let i = 0; i < tags.data.length; i++) {
        const tag = tags.data[i];
        const tagItemsResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/tag/get-items/1/${tag._id}?scope=1`);
        const tagItems = await tagItemsResponse.json();
        const lastItem = tagItems.data[0];
        const image = lastItem?.thumbnail ? lastItem.thumbnail.url : lastItem?.gallery ? lastItem.gallery[0].url : (host + "/banners/1.jpg")
        // Generate URLs for each locale
        const locales = ['fa', 'en', 'tr'];
        for (const locale of locales) {
            const item = {
                priority: 0.5,
                url: host + "/" + locale + "/tag/" + tag.tagId + "/" + tag.slug,
                lastModified: tag.lastUpdated,
                changeFrequency: 'daily',
                images: [image]
            };
            sitemap.push(item);
        }
    }

    setLangSitemap(sitemap);
    return sitemap;
}