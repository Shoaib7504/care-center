// Server component — fetches service from MongoDB by _id slug
import { getSingleProduct } from "@/action/server/products";
import BookingForm from "./BookingForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getSingleProduct(slug);
  const service = Array.isArray(result) ? result[0] ?? null : result ?? null;

  if (!service) {
    return { title: "Booking Not Found", description: "The service for booking could not be found." };
  }

  return {
    title: `Book ${service.title}`,
    description: `Book ${service.title} — a vetted caregiver starting at $${service.pricePerHour}/hr. Easy online booking, insured care.`,
    alternates: {
      canonical: `/booking/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function BookingPage({ params }) {
  // Next.js 16: params is a Promise — must await it
  const { slug } = await params;

  let service = null;
  let error = null;

  try {
    const result = await getSingleProduct(slug);
    // getSingleProduct returns an array — grab first element
    service = Array.isArray(result) ? result[0] ?? null : result ?? null;

    // Serialize ObjectId so it is a plain string (safe to pass to client component)
    if (service && service._id) {
      service = { ...service, _id: String(service._id) };
    }
  } catch (err) {
    console.error("Failed to fetch service for booking:", err);
    error = "We couldn't load this service. Please go back and try again.";
  }

  if (error || !service) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full gradient-hero text-5xl shadow-soft">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {error ? "Something went wrong" : "Service not found"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {error ?? "This service doesn't exist or may have been removed."}
        </p>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-soft cta-btn"
        >
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>
      </div>
    );
  }

  return <BookingForm service={service} />;
}