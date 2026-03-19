import { NextConfig } from 'next';

const nextConfigBase: NextConfig = {
  transpilePackages: ['@shared'],
  turbopack: {},

  async rewrites() {
    const destinationHost = process.env.INTERNAL_API_SERVER_URL;
    return [
      {
        source: '/api/:path*',
        destination: `${destinationHost}/:path*`,
      },
    ];
  },

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
