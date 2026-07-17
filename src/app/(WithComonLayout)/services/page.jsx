import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/action/server/products';

export const metadata = {
  title: "Services | Care Center",
  description:
    "Browse babysitting, elderly care, and home nursing services from vetted, experienced caregivers at Care Center.",

  openGraph: {
    title: "Services | Care Center",
    description:
      "Browse babysitting, elderly care, and home nursing services from vetted, experienced caregivers.",
    images: [
      {
        url: "/images/services-og.jpg",
        width: 1200,
        height: 630,
        alt: "Care Center Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Services | Care Center",
    description:
      "Browse babysitting, elderly care, and home nursing services from vetted caregivers.",
    images: ["/images/services-og.jpg"],
  },
};

// Server Component — fetch directly, no useEffect/useState needed
const ServicesPage = async () => {
  let services = [];
  let error = null;

  try {
    const res = await getProducts();
    services = res;
  } catch (err) {
    console.error("Failed to fetch services:", err);
    error = "We couldn't load services right now. Please try again shortly.";
  }
  // console.log(services);



  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 bg-background font-sans antialiased selection:bg-primary-soft">
      {/* Header Info Layer */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="animate-fade-in text-sm font-semibold uppercase tracking-wider text-primary">
          All services
        </span>
        <h1 className="animate-fade-up delay-100 mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Find the right care
        </h1>
        <p className="animate-fade-up delay-200 mt-4 text-muted-foreground leading-relaxed">
          Hand-picked, vetted professionals — ready when you are.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center text-destructive bg-destructive/10 rounded-2xl py-6 px-4 max-w-xl mx-auto mb-10">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!error && services.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          No services available right now. Check back soon.
        </div>
      )}

      {/* Grid Layout Container */}
      {services.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.id || s._id}
              className="animate-fade-up group rounded-3xl bg-card shadow-card border border-border overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              {/* Visual Header Image Frame */}
              <div className="aspect-4/3 overflow-hidden bg-muted">
                {s.image && (
                  <Image
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Core Card Content Body */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-xl text-foreground tracking-tight">
                    {s.title}
                  </h2>
                  {s.caregiver?.rating != null && (
                    <div className="flex items-center gap-1 text-sm bg-accent/10 px-2.5 py-0.5 rounded-full text-accent-foreground">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="font-semibold">{s.caregiver.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {s.tagline}
                </p>

                {/* Feature Checklist */}
                {Array.isArray(s.features) && (
                  <ul className="mt-5 space-y-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm text-foreground/80 flex items-start gap-2.5 leading-tight"
                      >
                        <span className="text-primary font-semibold select-none">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price and Action Footer */}
                <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground tracking-tight">
                      ${s.pricePerHour}
                    </span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>

                  <Link
                    href={`/services/${String(s._id)}`}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary bg-primary-soft hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5"
                  >
                    View details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;