import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eternalmarketing.co.kr';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    rules: [
      {
        userAgent: '*',
        allow: isProduction ? '/' : undefined,
        disallow: isProduction ? ['/admin', '/admin/*'] : '/',
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}

