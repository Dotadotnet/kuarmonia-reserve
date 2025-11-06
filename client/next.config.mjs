/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'standalone',
  swcMinify: true, // minify با SWC
  experimental: {
    esmExternals: true, // خروجی ES Modules برای مرورگرهای مدرن
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3-console.kuarmonia.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.kuarmonia.com", pathname: "/**" },
      { protocol: "https", hostname: "api.kuarmonia.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**/*" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,PATCH,POST" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
