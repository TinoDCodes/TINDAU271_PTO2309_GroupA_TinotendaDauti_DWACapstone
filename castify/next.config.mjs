/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content.production.cdn.art19.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
