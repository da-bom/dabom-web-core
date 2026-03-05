import type { MetadataRoute } from 'next';

import { COLORS } from '@shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '다봄',
    short_name: '다봄',
    description: '우리 가족 데이터를 한눈에, 다봄',
    start_url: '/',
    display: 'standalone',
    background_color: COLORS.BRAND_WHITE,
    theme_color: COLORS.PRIMARY_300,
    icons: [
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    screenshots: [
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        label: 'Mobile App Screenshot',
      },
    ],
  };
}
