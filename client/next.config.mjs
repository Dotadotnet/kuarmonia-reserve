/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig = {
  // reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-console.kuarmonia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.kuarmonia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
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
  // async rewrites() {
  //   return [
  //     {
  //       source:  "/:lang/:path*", 
  //       destination: "/:lang/:path*",
  //     },
  //     {
  //       source:  "/:path*",
  //       destination: "/fa/:path*",
  //     }
  //   ];
  // } 


};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);