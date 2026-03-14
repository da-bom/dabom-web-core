import { NextConfig } from 'next';

const nextConfigBase: NextConfig = {
  transpilePackages: ['@shared'],
  turbopack: {},

  webpack(config) {
    config.module.rules.push({
      transpilePackages: ['@tanstack/react-query', '@tanstack/react-query-devtools'],
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfigBase;
