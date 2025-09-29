import { useEffect } from 'react';
import { siteConfig, structuredData, breadcrumbData, faqData } from './Data';



const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage
}) => {
  title = title || siteConfig.siteName;
  description = description || siteConfig.siteDescription;
  keywords = keywords || "کارمونیا, مهاجرت, ویزا, ویزای شنگن, ویزای دانشجویی, ویزای کاری, ازدواج بین‌المللی, رزرو هتل, مشاوره مهاجرتی, ترجمه رسمی";
  canonical = canonical || siteConfig.siteUrl;
  ogImage = ogImage || `${siteConfig.siteUrl}/og-image.jpg`;

  const fullTitle = title === siteConfig.siteName ? title : `${title} | ${siteConfig.siteName}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', siteConfig.siteName);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', siteConfig.siteName, true);
    updateMetaTag('og:locale', 'fa_IR', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Additional SEO tags
    updateMetaTag('theme-color', '#4f46e5');
    updateMetaTag('msapplication-TileColor', '#4f46e5');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // Structured data
    const addStructuredData = (data, id) => {
      let script = document.querySelector(`script[data-schema="${id}"]`);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', id);
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    addStructuredData(structuredData, 'business');
    addStructuredData(breadcrumbData, 'breadcrumb');
    addStructuredData(faqData, 'faq');

    // Language and direction
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';

  }, [fullTitle, description, keywords, canonical, ogImage]);

  return null;
};

export default SEOHead;