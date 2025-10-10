
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth/*', 
          '/assets/*', 
          '/countries/*', 
          '/image/*', 
          '/avatar/*', 
          '/api/*',
          '/_next/*',
          '/admin/*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/auth/*',
          '/api/*',
          '/admin/*'
        ]
      }
    ],
    sitemap: 'https://kuarmonia.com/sitemap.xml',
    host: 'https://kuarmonia.com'
  }
}
