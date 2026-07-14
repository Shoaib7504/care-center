import { Check, ShieldCheck, Star, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import baby from '@/assets/service-baby.jpg';
import elderly from '@/assets/service-elderly.jpg';
import nursing from '@/assets/service-nursing.jpg';
import doctor1 from '@/assets/doctor1.jpg';
import doctor2 from '@/assets/doctor2.jpg';
import doctor3 from '@/assets/doctor3.jpg';
const services = [
  {
    id: 'babysitting',
    category: 'child',
    title: 'Babysitting',
    tagline: 'Safe, nurturing care for your little ones',
    description:
      'Experienced babysitters who create a warm, stimulating environment for children of all ages — from newborns to school-age kids.',
    pricePerHour: 18,
    image: baby,
    features: [
      'Age-appropriate activities & play',
      'Meal preparation for children',
      'Bedtime routine assistance',
      'Light housekeeping',
      'Emergency first-aid certified',
      'Flexible scheduling',
    ],
    caregiver: {
      name: 'Sarah Mitchell',
      picture: doctor1,
      role: 'Certified Childcare Specialist · 6 yrs exp.',
      rating: 4.9,
      reviews: 142,
    },
    faqs: [
      { q: 'What age groups do you cover?', a: 'We care for children from newborns up to 12 years old.' },
      { q: 'Are babysitters background-checked?', a: 'Yes, every caregiver passes a full criminal background check and reference verification.' },
      { q: 'Can I request the same sitter each time?', a: 'Absolutely — you can mark a caregiver as a favourite and request them for future bookings.' },
    ],
  },
  {
    id: 'elderly-care',
    category: 'senior',
    title: 'Elderly Care',
    tagline: 'Compassionate support for seniors',
    description:
      'Dedicated caretakers who assist with daily activities, companionship, mobility support, and medication reminders.',
    pricePerHour: 22,
    image: elderly,
    features: [
      'Daily activity assistance',
      'Medication reminders',
      'Mobility & transfer support',
      'Companionship & social engagement',
      'Light meal preparation',
      'Transportation to appointments',
    ],
    caregiver: {
      name: 'James Okafor',
      picture: doctor3,
      role: 'Senior Care Specialist · 9 yrs exp.',
      rating: 4.8,
      reviews: 98,
    },
    faqs: [
      { q: 'Can caregivers assist with mobility aids?', a: 'Yes, all our senior carers are trained to assist with walkers, wheelchairs, and transfers.' },
      { q: 'Do you offer overnight care?', a: 'Yes, overnight and live-in packages are available on request.' },
      { q: 'How are caregivers matched to seniors?', a: 'We match based on care needs, personality, language, and availability.' },
    ],
  },
  {
    id: 'home-nursing',
    category: 'medical',
    title: 'Home Nursing',
    tagline: 'Clinical care in the comfort of home',
    description:
      'Certified nurses providing post-operative care, wound management, IV therapy, and chronic disease monitoring at home.',
    pricePerHour: 35,
    image: nursing,
    features: [
      'Post-operative wound care',
      'IV therapy administration',
      'Chronic disease monitoring',
      'Vital signs tracking',
      'Medication management',
      'Coordination with physicians',
    ],
    caregiver: {
      name: 'Dr. Priya Nair',
      picture: doctor2,
      role: 'Registered Nurse · 12 yrs exp.',
      rating: 5.0,
      reviews: 217,
    },
    faqs: [
      { q: 'Are nurses licensed and insured?', a: 'Yes, every nurse is RN-certified, fully insured, and licensed in their state.' },
      { q: 'Can you coordinate with my doctor?', a: 'Yes, our nurses regularly liaise with your existing care team and share progress notes.' },
      { q: 'What equipment do nurses bring?', a: 'Nurses arrive with all necessary clinical supplies — dressings, IV kits, monitoring devices, and more.' },
    ],
  },
];


const ServiceDetails = async ({ params }) => {
  const { slug } = await params;

  const s = services.find((service) => service.id === slug);
  if (!s) notFound();

  const similar = services
    .filter((sv) => sv.category === s.category && sv.id !== s.id)
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid lg:grid-cols-3 gap-10">

        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Hero image */}
          <div className="animate-fade-up rounded-3xl overflow-hidden shadow-card">
            <Image
              src={s.image}
              alt={s.title}
              width={1024}
              height={768}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Title block */}
          <div className="animate-fade-up delay-100">
            <div className="flex items-center gap-2 text-sm text-secondary font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> Verified service
            </div>
            <h1 className="mt-2 text-4xl font-bold">{s.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{s.tagline}</p>
            <p className="mt-6 leading-relaxed text-foreground/85">{s.description}</p>
          </div>

          {/* What's included */}
          <div className="animate-fade-up delay-200">
            <h2 className="text-2xl font-bold mb-4">Whats included</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-soft">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft text-primary shrink-0">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Caregiver */}
          <div className="animate-fade-up delay-300 rounded-3xl border bg-card p-6 shadow-card flex flex-col sm:flex-row sm:items-center gap-5">
            <div className='h-20 w-20 rounded-2xl  shrink-0'>
              <Image
                src={s.caregiver.picture}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Featured caregiver
              </p>
              <h3 className="font-bold text-lg">{s.caregiver.name}</h3>
              <p className="text-sm text-muted-foreground">{s.caregiver.role}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">{s.caregiver.rating}</span>
                <span className="text-muted-foreground">({s.caregiver.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="animate-fade-up delay-400">
            <h2 className="text-2xl font-bold mb-4">Frequently asked</h2>
            <div className="rounded-2xl border bg-card divide-y overflow-hidden">
              {s.faqs.map((f, i) => (
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
        </div>

        {/* ── Sticky booking sidebar ── */}
        <aside className="lg:sticky lg:top-24 h-fit animate-fade-up delay-200">
          <div className="rounded-3xl border bg-card shadow-glow p-6">
            <p className="text-sm text-muted-foreground">Starting at</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold gradient-text">${s.pricePerHour}</span>
              <span className="text-muted-foreground">/hour</span>
            </div>

            <div className="mt-5 text-sm divide-y">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{s.title}</span>
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

            <Link
              href={`/booking/${s.id}`}
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
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Similar services</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {similar.map((s2) => (
              <Link
                key={s2.id}
                href={`/service/${s2.id}`}
                className="group rounded-3xl border bg-card overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all flex"
              >
                <div className="relative w-40 shrink-0">
                  <Image
                    src={s2.image}
                    alt={s2.title}
                    fill
                    sizes="160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="font-bold">{s2.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s2.tagline}</p>
                  <p className="mt-3 font-semibold gradient-text">${s2.pricePerHour}/hr</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetails;