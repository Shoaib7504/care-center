import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
            <div className="rounded-4xl border border-border bg-card p-10 lg:p-14 text-center shadow-card relative overflow-hidden">

                {/* Hero gradient wash */}
                <div className="absolute inset-0 gradient-hero opacity-50 pointer-events-none" aria-hidden />

                {/* Decorative blobs */}
                <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                <div className="relative">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Need trusted care today?
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                        The right caregiver is just a few taps away. Book in under 2 minutes.
                    </p>

                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 mt-7 rounded-full px-7 py-3 text-sm font-semibold gradient-primary text-primary-foreground shadow-glow hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Book a caregiver now <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default CTA;