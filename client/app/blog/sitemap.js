import Api from "@/utils/api"
export default async function sitemap() {
  const sitemap = [];
  const blogs = await Api('/blog/get-blogs');
  blogs.forEach(blog => {
    sitemap.push({
      priority: 0.5,
      url: blog.canonicalUrl,
      lastModified: blog.updatedDate,
      changeFrequency: 'monthly',
      images: [blog.thumbnail.url],
    })
  });
  return sitemap;
}