/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  assetPrefix: isProd ? "/mymi/" : "",
  basePath: isProd ? "/mymi" : "",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: true, // GitHub Pages does not support Next.js image optimization
  },
};

export default nextConfig;
