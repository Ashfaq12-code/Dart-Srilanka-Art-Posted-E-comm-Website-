import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/account/', '/checkout/'],
    },
    sitemap: 'https://dartsrilanka.com/sitemap.xml',
  };
}
