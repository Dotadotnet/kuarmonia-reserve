import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    try {
        // Use fetch instead of Api utility
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/media`);
        const data = await response.json();
        const medias = data.data || [];
        
        medias.forEach(media => {
            const item = {
                priority: 0.3,
                url: process.env.NEXT_PUBLIC_BASE_URL + "/media/" + media.mediaId + "/" + encodeURIComponent(media.slug),
                lastModified: media.lastUpdated,
                changeFrequency: 'monthly',
                videos: [{
                    title: media.title,
                    thumbnail_loc: media.thumbnail?.url,
                    description: media.description,
                    content_loc: media.media?.url,
                }],
                images: [media.thumbnail?.url]
            };
            sitemap.push(item)
        });
    } catch (error) {
        console.error("Error generating media sitemap:", error);
        // Return empty sitemap on error
    }
    
    return sitemap;
}