
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth' , "/assets/" , "/countries/" , "/image/" , "/avatar/" , '/page-you-dont-want/'],
      },
    ],
    sitemap: 'https://kuarmonia.com/sitemap.xml',
  }
}
