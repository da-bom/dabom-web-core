import { NextConfig } from 'next';

const nextConfigBase: NextConfig = {
  transpilePackages: ['@shared'],
  turbopack: {},

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfigBase;
