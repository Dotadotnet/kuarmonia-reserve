// SEO Check Script for Kuarmonia
// Run this to verify your SEO improvements

const https = require('https');
const http = require('http');

const checkSEO = async (url) => {
  console.log(`🔍 Checking SEO for: ${url}`);
  
  try {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        console.log('\n📊 SEO Analysis Results:');
        console.log('========================');
        
        // Check title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        console.log(`✅ Title: ${titleMatch ? titleMatch[1] : '❌ NOT FOUND'}`);
        
        // Check meta description
        const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
        console.log(`✅ Description: ${descMatch ? descMatch[1] : '❌ NOT FOUND'}`);
        
        // Check meta keywords
        const keywordsMatch = html.match(/<meta[^>]*name="keywords"[^>]*content="([^"]+)"/i);
        console.log(`✅ Keywords: ${keywordsMatch ? keywordsMatch[1].substring(0, 50) + '...' : '❌ NOT FOUND'}`);
        
        // Check Open Graph
        const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
        console.log(`✅ OG Title: ${ogTitleMatch ? ogTitleMatch[1] : '❌ NOT FOUND'}`);
        
        // Check canonical
        const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i);
        console.log(`✅ Canonical: ${canonicalMatch ? canonicalMatch[1] : '❌ NOT FOUND'}`);
        
        // Check robots
        const robotsMatch = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i);
        console.log(`✅ Robots: ${robotsMatch ? robotsMatch[1] : '❌ NOT FOUND'}`);
        
        console.log('\n🎯 Recommendations:');
        if (!titleMatch) console.log('- Add proper title tag');
        if (!descMatch) console.log('- Add meta description');
        if (!canonicalMatch) console.log('- Add canonical URL');
        if (!ogTitleMatch) console.log('- Add Open Graph tags');
        
        console.log('\n✨ SEO Check Complete!\n');
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Error checking SEO:', err.message);
    });
    
    req.setTimeout(10000, () => {
      console.error('❌ Request timeout');
      req.destroy();
    });
    
  } catch (error) {
    console.error('❌ SEO Check failed:', error.message);
  }
};

// Usage
const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kuarmonia.com';
console.log('🚀 Starting SEO Check for Kuarmonia Website...\n');
checkSEO(siteUrl);
checkSEO(siteUrl + '/fa');
checkSEO(siteUrl + '/en');

module.exports = { checkSEO };