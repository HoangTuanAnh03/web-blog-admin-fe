/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.nuuls.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
