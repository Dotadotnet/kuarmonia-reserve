import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const medias = await Api('/dynamic/get-all/media');
    medias.forEach(media => {
        const item = {
            priority: 0.3,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/media/" + media.mediaId + "/" + encodeURIComponent(media.slug) ,
            lastModified: media.lastUpdated,
            changeFrequency: 'monthly',
            videos : [ {
                    title: media.title,
                    thumbnail_loc: media.thumbnail.url,
                    description: media.description,
                    content_loc: media.media.url,
                }],
                images : [media.thumbnail.url]
        };
        sitemap.push(item)
    });    
    return sitemap;
}