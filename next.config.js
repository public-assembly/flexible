/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@public-assembly/dao-utils'])

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

module.exports = withTM(nextConfig);
