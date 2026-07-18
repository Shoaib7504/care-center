import React from 'react';
import { BadgeCheck, Clock, Lock, Shield } from 'lucide-react';

const features = [
    {
        icon: BadgeCheck,
        title: "Verified professionals",
        desc: "Every caregiver passes ID, background, and skill checks.",
    },
    {
        icon: Clock,
        title: "24/7 support",
        desc: "Real humans on standby, day or night.",
    },
    {
        icon: Lock,
        title: "Secure payments",
        desc: "Stripe-powered checkout with full encryption.",
    },
    {
        icon: Shield,
        title: "Insurance covered",
        desc: "Every booking is protected end-to-end.",
    },
];

const WhyUs = () => {
    return (
        <section className="bg-muted/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
<span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
    Why Care.xyz
</span>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
                        Peace of mind, built in
                    </h2>
                </div>

                {/* Feature cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group rounded-3xl bg-card border border-border p-6 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform duration-300">
                                <f.icon className="h-6 w-6" />
                            </div>

                            {/* Title + underline */}
                            <h3 className="font-semibold text-foreground">{f.title}</h3>
                            <div className="mt-1 h-0.5 w-6 gradient-primary rounded-full group-hover:w-full transition-all duration-500" />

                            <p className="text-sm text-muted-foreground mt-3">{f.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyUs;