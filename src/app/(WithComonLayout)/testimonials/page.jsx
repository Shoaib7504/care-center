import { Quote, Star } from 'lucide-react';
import React from 'react';

const Testimonials = () => {
    const items = [
        { name: "Sarah M.", role: "Mother of two", quote: "Booking a sitter at 7am for an emergency? Care.xyz had someone amazing at our door by 9. Lifesavers.", rating: 5 },
        { name: "James K.", role: "Caring for dad", quote: "David has been with my father for 6 months. He treats him like family — I finally sleep at night.", rating: 5 },
        { name: "Lina O.", role: "Post-op patient", quote: "Priya's home nursing made my recovery feel safe and gentle. Hospital-grade care, no hospital.", rating: 5 },
        { name: "Marcus T.", role: "Working dad", quote: "Reliable, warm, and easy to book. Our weekday sitter has become part of the family.", rating: 5 },
        { name: "Aisha R.", role: "Daughter", quote: "Mom looks forward to her caregiver visits. That alone is worth everything.", rating: 5 },
        { name: "Eli S.", role: "Recovering patient", quote: "Professional, kind, and on time every single day. I can't recommend enough.", rating: 5 },
    ];
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">Voices of care</span>
                <h1 className="mt-2 text-4xl sm:text-5xl font-bold">Stories from our families</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((t, i) => (
                    <div key={i} className="rounded-3xl border bg-card p-7 shadow-card relative">
                        <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/15" />
                        <div className="flex items-center gap-1 text-accent mb-3">
                            {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                        </div>
                        <p className="text-foreground/90 leading-relaxed">{t.quote}</p>
                        <div className="mt-5 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full gradient-primary" />
                            <div>
                                <p className="font-semibold text-sm">{t.name}</p>
                                <p className="text-xs text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;