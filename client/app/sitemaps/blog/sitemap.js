import Api from "@/utils/api"
import setLangSitemap from "@/utils/setLangSitemap";
export default async function sitemap() {
    const sitemap = [];
    const blogs = await Api('/dynamic/get-all/blog');
    blogs.forEach(blog => {
        const item = {
            priority: 0.6,
            url: process.env.NEXT_PUBLIC_BASE_URL + "/blog/" + blog.blogId + "/" + blog.slug,
            lastModified: blog.lastUpdated,
            changeFrequency: 'monthly',
            images: [blog.thumbnail.url]
        };
        sitemap.push(item)
    });
    setLangSitemap(sitemap);
    return sitemap;
}