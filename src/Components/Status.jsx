import React from 'react';

const stats = [
    { n: "5,000+", l: "Families served" },
    { n: "1,000+", l: "Verified caregivers" },
    { n: "98%",    l: "Satisfaction rate" },
];

const Status = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="rounded-4xl gradient-primary text-primary-foreground p-10 lg:p-14 shadow-glow relative overflow-hidden">

                {/* Decorative blob */}
                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

                <div className="relative grid sm:grid-cols-3 gap-10 text-center">
                    {stats.map((s) => (
                        <div key={s.l} className="group">
                            <div className="text-5xl lg:text-6xl font-extrabold group-hover:scale-105 transition-transform duration-300">
                                {s.n}
                            </div>
                            <p className="mt-2 text-primary-foreground/80">{s.l}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Status;