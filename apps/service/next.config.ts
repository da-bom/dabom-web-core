import nextConfigBase from '../../packages/shared/src/configs/next.config.base';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...nextConfigBase,

  compress: false,

  async rewrites() {
    let baseArray = [];
    if (nextConfigBase.rewrites) {
      const base = await nextConfigBase.rewrites();
      if (Array.isArray(base)) {
        baseArray = base;
      } else if (base && typeof base === 'object') {
        baseArray = [
          ...(base.beforeFiles || []),
          ...(base.afterFiles || []),
          ...(base.fallback || []),
        ];
      }
    }

    return [
      {
        source: '/notification-proxy/:path*',
        destination: 'https://noti.dabom.site/:path*',
      },

      ...baseArray,

      {
        source: '/:path*',
        destination: 'https://api.dabom.site/:path*',
      },
    ];
  },
};

export default nextConfig;
