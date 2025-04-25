export default async function sitemap() {
 
  return [
    {
      url: process.env.HOST,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [ process.env.HOST + '/banners/1.jpg' ],
    },
    {
      url: process.env.HOST + "/properties",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 8,
      images: [ process.env.HOST + '/assets/slide/property/1.webp' ],
    },
    {
      url: process.env.HOST + "/tours",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 8,
      images: [ process.env.HOST + '/assets/slide/1.jpg' ],
    },
    {
      url: process.env.HOST + '/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [ process.env.HOST + '/banners/1.jpg' ],
    },
    {
      url: process.env.HOST + '/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      images: [ process.env.HOST + '/banners/1.jpg' ],
      priority: 0.8,
    },
  ]
}