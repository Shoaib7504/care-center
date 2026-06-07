import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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
    },
    {
        id: 'elderly-care',
        title: 'Elderly Care',
        tagline: 'Compassionate support for seniors',
        description:
            'Dedicated caretakers who assist with daily activities, companionship, mobility support, and medication reminders.',
        pricePerHour: 22,
        image: elderly,            
    },
    {
        id: 'home-nursing',
        title: 'Home Nursing',
        tagline: 'Clinical care in the comfort of home',
        description:
            'Certified nurses providing post-operative care, wound management, IV therapy, and chronic disease monitoring at home.',
        pricePerHour: 35,
        image: nursing,             
    },
];

const Services = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

            {/* Section header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Our Services
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
                    Care that fits every chapter of life
                </h2>
                <p className="mt-4 text-muted-foreground">
                    From newborn cuddles to clinical home nursing — book the right caregiver in minutes.
                </p>
            </div>

            {/* Cards grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {services.map((s) => (
                    <div
                        key={s.id}
                        className="group rounded-3xl bg-card shadow-card overflow-hidden border border-border hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Image with glass overlay on hover */}
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={s.image}
                                alt={s.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
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

                            <p className="text-sm text-primary font-medium mt-3">{s.tagline}</p>
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
                                    href={`/services/${s.id}`}
                                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-primary bg-primary-soft hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    View details <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;