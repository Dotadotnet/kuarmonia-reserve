import Api from "@/utils/api"
export default async function sitemap() {
    const sitemap = [];
    const posts = await Api('/post/get-posts');
    posts.forEach(post => {
        if (post.featuredImage.type == "video") {
            sitemap.push({
                priority: 0.4,
                url: post.canonicalUrl,
                lastModified: post.updatedDate,
                changeFrequency: 'monthly',
                images: [ process.env.HOST + '/banners/1.jpg' ],
                videos: [
                    {
                        title: post.title,
                        thumbnail_loc: process.env.HOST + '/banners/1.jpg',
                        description: post.description,
                        content_loc: post.featuredImage.url,
                    },]
            })
        } else {
            sitemap.push({
                priority: 0.4,
                url: post.canonicalUrl,
                lastModified: post.updatedDate,
                changeFrequency: 'monthly',
                images: [post.featuredImage.url],
            })
        }
    });
    return sitemap;
}