import { Check, ShieldCheck, Star, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getSingleProduct, getProducts } from '@/action/server/products';

export const metadata = {
  title: "Service Details | Care Center",
  description: "Learn more about this service and book a vetted caregiver.",
};

const ServiceDetails = async ({ params }) => {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    return notFound();
  }

  // Other services, excluding the current one (matched by the readable "id" slug)
  const allProducts = await getProducts();
  const services = (allProducts || []).filter((p) => String(p._id) !== String(product._id));

  return (

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Hero image */}
          {product.image ? (
            <div className="animate-fade-up rounded-3xl overflow-hidden shadow-card">
              <Image
                src={product.image}
                alt={product.title}
                width={1024}
                height={768}
                preload={true}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <div className="animate-fade-up rounded-3xl overflow-hidden shadow-card bg-muted aspect-[4/3] flex items-center justify-center text-sm text-muted-foreground">
              No image available
            </div>
          )}

          {/* Title block */}
          <div className="animate-fade-up delay-100">
            <div className="flex items-center gap-2 text-sm text-secondary font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Verified service
            </div>
            <h1 className="mt-2 text-4xl font-bold">{product.title}</h1>
            {product.tagline && <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>}
            {product.description && (
              <p className="mt-6 leading-relaxed text-foreground/85">{product.description}</p>
            )}
          </div>

          {/* What's included */}
          {Array.isArray(product.features) && product.features.length > 0 && (
            <div className="animate-fade-up delay-200">
              <h2 className="text-2xl font-bold mb-4">What&apos;s included</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-soft">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-primary shrink-0">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Caregiver — rendered only if the document has caregiver data */}
          {product.caregiver && (
            <div className="animate-fade-up delay-300 rounded-3xl border bg-card p-6 shadow-card flex flex-col sm:flex-row sm:items-center gap-5">
              {product.caregiver.picture && (
                <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={product.caregiver.picture}
                    width={80}
                    height={80}
                    alt={product.caregiver.name ?? "Caregiver"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Featured caregiver
                </p>
                <h3 className="font-bold text-lg">{product.caregiver.name}</h3>
                {product.caregiver.role && (
                  <p className="text-sm text-muted-foreground">{product.caregiver.role}</p>
                )}
                {product.caregiver.rating != null && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold">{product.caregiver.rating}</span>
                    {product.caregiver.reviews != null && (
                      <span className="text-muted-foreground">({product.caregiver.reviews} reviews)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAQ */}
          {Array.isArray(product.faqs) && product.faqs.length > 0 && (
            <div className="animate-fade-up delay-400">
              <h2 className="text-2xl font-bold mb-4">Frequently asked</h2>
              <div className="rounded-2xl border bg-card divide-y overflow-hidden">
                {product.faqs.map((f, i) => (
                  <details key={i} className="group px-2">
                    <summary className="flex items-center justify-between gap-4 px-4 py-4 cursor-pointer list-none font-medium hover:text-primary transition-colors">
                      {f.q}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky booking sidebar ── */}
        <aside className="lg:sticky lg:top-24 h-fit animate-fade-up delay-200">
          <div className="rounded-3xl border bg-card shadow-glow p-6">
            <p className="text-sm text-muted-foreground">Starting at</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold gradient-text">${product.pricePerHour}</span>
              <span className="text-muted-foreground">/hour</span>
            </div>

            <div className="mt-5 text-sm divide-y">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{product.title}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Min booking</span>
                <span className="font-medium">2 hours</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Cancellation</span>
                <span className="font-medium">Free · 24h</span>
              </div>
            </div>

            {/* Passes the MongoDB _id string as the booking slug */}
            <Link
              href={`/booking/${product.id}`}
              className="cta-btn flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold text-sm shadow-soft"
            >
              Book now <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure payment · Insured care
            </p>
          </div>
        </aside>
      </div>

      {/* ── Similar services ── */}
      {services.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-6">Similar services</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.slice(0, 3).map((s2) => {
              const s2Key = s2._id ? String(s2._id) : s2.id;
              return (
                <Link
                  key={s2Key}
                  href={`/services/${s2.id}`}
                  className="group rounded-3xl border bg-card overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all flex"
                >
                  {s2.image && (
                    <div className="relative w-40 shrink-0">
                      <Image
                        src={s2.image}
                        alt={s2.title}
                        fill
                        sizes="160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1">
                    <h3 className="font-bold">{s2.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s2.tagline}</p>
                    <p className="mt-3 font-semibold gradient-text">${s2.pricePerHour}/hr</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetails;