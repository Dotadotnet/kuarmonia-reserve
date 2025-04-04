/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['s3-console.kuarmonia.com','storage.kuarmonia.com','localhost'],
      remotePatterns: [
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
  };
  
  export default nextConfig;  