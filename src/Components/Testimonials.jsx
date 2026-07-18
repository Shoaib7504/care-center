import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah M.",
        role: "Mother of two",
        quote: "Booking a sitter at 7am for an emergency? Care.xyz had someone amazing at our door by 9. Lifesavers.",
    },
    {
        name: "James K.",
        role: "Caring for dad",
        quote: "David has been with my father for 6 months. He treats him like family — I finally sleep at night.",
    },
    {
        name: "Lina O.",
        role: "Post-op patient",
        quote: "Priya's home nursing made my recovery feel safe and gentle. Hospital-grade care, no hospital.",
    },
];

const Testimonials = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
<span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
    Stories of care
</span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
                    Loved by families everywhere
                </h2>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map((t) => (
                    <div
                        key={t.name}
                        className="group rounded-3xl border border-border bg-card p-7 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Quote icon */}
                        <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/15" />

                        {/* Bottom gradient accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Stars */}
                        <div className="flex items-center gap-1 text-accent mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className="h-4 w-4 fill-current" />
                            ))}
                        </div>

                        {/* Quote text */}
                        <p className="text-foreground/90 leading-relaxed">{t.quote}</p>

                        {/* Author */}
                        <div className="mt-5 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full gradient-primary shrink-0" aria-hidden />
                            <div>
                                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                                <p className="text-xs text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Testimonials;