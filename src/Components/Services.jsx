import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getProducts } from '@/action/server/products';

// Server Component — async, fetches directly, no local re-declaration
const Services = async () => {
  let products = [];
  let error = null;

  try {
    const data = await getProducts();
    products = Array.isArray(data) ? data : data?.products || [];
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = 'Unable to load services right now. Please try again later.';
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Section header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
<span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
    Our Services
</span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
          Care that fits every chapter of life
        </h2>
        <p className="mt-4 text-muted-foreground">
          From newborn cuddles to clinical home nursing — book the right caregiver in minutes.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center text-destructive bg-destructive/10 rounded-2xl py-6 px-4 max-w-xl mx-auto mb-10">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!error && products.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
          No services available right now. Check back soon.
        </div>
      )}

      {/* Cards grid */}
      {products.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((s) => (
            <div
              key={s.id || s._id}
              className="group rounded-3xl bg-card shadow-card overflow-hidden border border-border hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image with glass overlay on hover */}
              <div className="relative aspect-video overflow-hidden">
                {s.image && (
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Glass badge */}
                <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  From ${s.pricePerHour}/hr
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-xl text-foreground">{s.title}</h3>
                    <div className="mt-1 h-0.5 w-8 gradient-primary rounded-full group-hover:w-full transition-all duration-500" />
                  </div>
                </div>

                <p className="text-sm text-foreground/80 font-medium mt-3">{s.tagline}</p>
                <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                  {s.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold gradient-text">
                      ${s.pricePerHour}
                    </span>
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </div>

                  <Link
                    href={`/services/${s.id || s._id}`}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground bg-primary-soft hover:bg-primary hover:text-primary-foreground hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5"
                  >
                    View details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Services;