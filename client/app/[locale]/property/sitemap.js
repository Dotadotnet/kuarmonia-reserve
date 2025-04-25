import Api from "@/utils/api"
export default async function sitemap() {
  const sitemap = [];
  const properties = await Api('/property/get-properties');
  properties.forEach(property => {
    sitemap.push({
      priority: 0.6,
      url: property.canonicalUrl,
      lastModified: property.updatedDate,
      changeFrequency: 'monthly',
      images: [property.thumbnail.url],
    })
  });
  return sitemap;
}