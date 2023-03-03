/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@public-assembly/dao-utils'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose',

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.zora.co',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
