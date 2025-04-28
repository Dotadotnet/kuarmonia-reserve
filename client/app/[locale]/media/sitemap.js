import Api from "@/utils/api"
export default async function sitemap() {
  const sitemap = [];
  const medias = await Api('/media/get-medias');
  medias.forEach(media => {
    sitemap.push({
      priority: 0.4,
      url: media.canonicalUrl,
      lastModified: media.updatedDate,
      changeFrequency: 'monthly',
      images: [media.thumbnail.url],
      videos: [
        {
          title: media.title,
          thumbnail_loc: media.thumbnail.url,
          description: media.description,
          content_loc: media.media.url,
        },]
    })
  });
  return sitemap;
}