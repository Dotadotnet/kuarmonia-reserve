import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const tags = await Api('/dynamic/get-all/tag');
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const tagItems = await Api("/tag/get-items/" + 1 + "/" + tag._id + "?scope=" + 1 );
        const lastItem = tagItems.data[0];
        const image = lastItem?.thumbnail ? lastItem.thumbnail.url : lastItem?.gallery ? lastItem.gallery[0].url : (host + "/banners/1.jpg")
        const item = {
            priority: 0.5,
            url: host + "/tag/" + tag.tagId + "/" + tag.slug ,
            lastModified: tag.lastUpdated,
            changeFrequency: 'daily',
            images: [image]
        };
        sitemap.push(item)
    }

    setLangSitemap(sitemap);
    return sitemap;
}