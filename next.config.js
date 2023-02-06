/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@public-assembly/dao-utils'])

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = withTM(nextConfig);
