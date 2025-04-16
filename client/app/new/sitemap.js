import Api from "@/utils/api"
export default async function sitemap() {
  const sitemap = [];
  const news = await Api('/new/get-news');
  news.forEach(new_item => {
    sitemap.push({
      priority: 0.5,
      url: new_item.canonicalUrl,
      lastModified: new_item.updatedDate,
      changeFrequency: 'monthly',
      images: [new_item.thumbnail.url],
    })
  });
  return sitemap;
}