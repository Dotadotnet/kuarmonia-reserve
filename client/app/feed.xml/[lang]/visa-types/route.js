import { getTranslations } from "next-intl/server";

export async function GET(request, { params }) {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  try {
    const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": lang
      }
    });
    
    const res = await response.json();
    const visaTypes = res.data || [];
    
    const t = await getTranslations("VisaType", lang);
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${t("Title")} - Kuarmonia</title>
    <description>${t("Description")}</description>
    <link>${baseUrl}/${lang === 'fa' ? '' : lang + '/'}visa-types</link>
    <language>${lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml/${lang}/visa-types" rel="self" type="application/rss+xml"/>
    
    ${visaTypes.map(visaType => {
      const { title, summary } = visaType?.translations?.find(
        (t) => t.language === lang
      )?.translation?.fields || {};
      
      return `
    <item>
      <title>${title || 'نوع ویزا'}</title>
      <description>${summary || 'توضیحات این نوع ویزا'}</description>
      <link>${baseUrl}/${lang === 'fa' ? '' : lang + '/'}visa-types/${visaType._id}/${visaType.slug_en}</link>
      <guid>${baseUrl}/${lang === 'fa' ? '' : lang + '/'}visa-types/${visaType._id}/${visaType.slug_en}</guid>
      <pubDate>${new Date(visaType.createdAt).toUTCString()}</pubDate>
      ${visaType.thumbnail?.url ? `<enclosure url="${visaType.thumbnail.url}" type="image/jpeg"/>` : ''}
    </item>`;
    }).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    });
  } catch (error) {
    console.error('Error generating visa types RSS feed:', error);
    
    // Return empty RSS feed on error
    const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${t("Title")} - Kuarmonia</title>
    <description>${t("Description")}</description>
    <link>${baseUrl}/${lang === 'fa' ? '' : lang + '/'}visa-types</link>
    <language>${lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;
    
    return new Response(emptyRss, {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    });
  }
}
