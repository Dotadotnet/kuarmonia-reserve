import { getTranslations } from "next-intl/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const locales = ['fa', 'en', 'tr', 'ar'];
  
  try {
    const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": "fa"
      }
    });
    
    const res = await response.json();
    const visaTypes = res.data || [];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locales.map(locale => {
    const localePrefix = locale === 'fa' ? '' : `/${locale}`;
    
    return `
  <!-- Visa Types List Page -->
  <url>
    <loc>${baseUrl}${localePrefix}/visa-types</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  ${visaTypes.map(visaType => `
  <!-- Visa Type Detail Page -->
  <url>
    <loc>${baseUrl}${localePrefix}/visa-types/${visaType._id}/${visaType.slug_en}</loc>
    <lastmod>${new Date(visaType.updatedAt || visaType.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}`;
  }).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating visa types sitemap:', error);
    
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    
    return new Response(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
