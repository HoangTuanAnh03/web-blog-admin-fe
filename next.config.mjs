/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.nuuls.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cmsassets.rgpub.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "am-a.akamaihd.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
