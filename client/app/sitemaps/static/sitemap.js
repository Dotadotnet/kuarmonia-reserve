import { modelsInfo } from "@/components/shared/dynamic/modelInfo";
import Api from "@/utils/api";
import setLangSitemap from "@/utils/setLangSitemap";

export default async function sitemap() {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const AllPages = []
  
  for (let index = 0; index < Object.keys(modelsInfo).length; index++) {
    const model = Object.keys(modelsInfo)[index];
    const lastFields = await Api(`/dynamic/get-all/${model}?page=1`)
    const image = lastFields.length ? lastFields[0].thumbnail ? lastFields[0].thumbnail.url : lastFields[0].gallery && lastFields[0].gallery.length ? lastFields[0].gallery[0].url : host + '/banners/1.jpg' : host + '/banners/1.jpg'
    AllPages.push(
      {
        url: host + "/all/" + model,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        images: [image],
      }
    )
  }

  const sitemap = [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [host + '/banners/1.jpg'],
    },
    {
      url: host + "/properties",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
      images: [host + '/assets/slide/property/1.webp'],
    },
    {
      url: host + "/tours",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
      images: [host + '/assets/slide/1.jpg'],
    },
    {
      url: host + '/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [host + '/banners/1.jpg'],
    },
    {
      url: host + '/contact',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      images: [host + '/banners/1.jpg'],
      priority: 0.8,
    },
    ...AllPages
  ];
  setLangSitemap(sitemap);
  return sitemap;
}