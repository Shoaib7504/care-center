const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/booking'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
