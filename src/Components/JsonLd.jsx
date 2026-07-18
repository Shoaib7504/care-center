const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Care Center',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    'Care Center is your trusted healthcare platform for finding experienced caregivers, booking appointments, and accessing quality home care services.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-CARE-CENTER',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://facebook.com/carecenter',
    'https://twitter.com/carecenter',
    'https://linkedin.com/company/carecenter',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Care Center',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/services?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Care Center',
  description: 'Home care and healthcare services platform connecting families with vetted caregivers.',
  url: BASE_URL,
  telephone: '+1-555-CARE-CENTER',
  areaServed: 'US',
  priceRange: '$$',
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
