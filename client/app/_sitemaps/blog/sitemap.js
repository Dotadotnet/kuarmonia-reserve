import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
    const sitemap = [];
    
    // Use fetch instead of Api utility
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-all/blog`);
    const blogs = await response.json();
    
    blogs.data.forEach(blog => {
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