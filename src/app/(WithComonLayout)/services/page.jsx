import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import baby from '@/assets/service-baby.jpg';
import elderly from '@/assets/service-elderly.jpg';
import nursing from '@/assets/service-nursing.jpg';

const services = [
  {
    id: 'babysitting',
    title: 'Babysitting',
    tagline: 'Safe, nurturing care for your little ones',
    description:
      'Experienced babysitters who create a warm, stimulating environment for children of all ages — from newborns to school-age kids.',
    pricePerHour: 18,
    image: baby,
    rating: '4.9',
    features: ['Newborn care certified', 'Early childhood activities', 'CPR & First Aid trained']
  },
  {
    id: 'elderly-care',
    title: 'Elderly Care',
    tagline: 'Compassionate support for seniors',
    description:
      'Dedicated caretakers who assist with daily activities, companionship, mobility support, and medication reminders.',
    pricePerHour: 22,
    image: elderly,
    rating: '4.8',
    features: ['Mobility assistance', 'Medication reminders', 'Companionship & errands']
  },
  {
    id: 'home-nursing',
    title: 'Home Nursing',
    tagline: 'Clinical care in the comfort of home',
    description:
      'Certified nurses providing post-operative care, wound management, IV therapy, and chronic disease monitoring at home.',
    pricePerHour: 35,
    image: nursing,
    rating: '5.0',
    features: ['Post-operative rehab', 'Wound management', 'Chronic condition tracking']
  },
];

const ServicesPage = () => {
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

      {/* Grid Layout Container */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={s.id}
            className="animate-fade-up group rounded-3xl bg-card shadow-card border border-border overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            {/* Visual Header Image Frame */}
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={s.image}
                alt={s.title}
                loading="lazy"
                width={1024}
                height={768}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Core Card Content Body */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-foreground tracking-tight">{s.title}</h2>
                <div className="flex items-center gap-1 text-sm bg-accent/10 px-2.5 py-0.5 rounded-full text-accent-foreground">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="font-semibold">{s.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.tagline}</p>
              
              {/* Feature Checklist */}
              <ul className="mt-5 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="text-sm text-foreground/80 flex items-start gap-2.5 leading-tight">
                    <span className="text-primary font-semibold select-none">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Price and Action Footer */}
              <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground tracking-tight">${s.pricePerHour}</span>
                  <span className="text-sm text-muted-foreground">/hr</span>
                </div>
                
                <Link 
                  href={`/service/${s.id}`}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-soft transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring gap-1 cursor-pointer"
                >
                  View details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ServicesPage;