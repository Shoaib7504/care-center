import { getProducts } from '@/action/server/products';

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  try {
    const products = await getProducts();
    const serviceRoutes = (products || []).map((product) => ({
      url: `${BASE_URL}/services/${product.id}`,
      lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
    return [...staticRoutes, ...serviceRoutes];
  } catch {
    return staticRoutes;
  }
}
