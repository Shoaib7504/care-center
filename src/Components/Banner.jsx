'use client';

import { ArrowRight, BadgeCheck, Shield, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import React, { useRef } from 'react';
import heroImg from '@/assets/hero-care.jpg';
import Image from 'next/image';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fadeRight = {
    hidden: { opacity: 0, x: 36, scale: 0.97 },
    show: {
        opacity: 1, x: 0, scale: 1,
        transition: { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] },
    },
};

const Banner = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div>
            <section ref={ref} className="relative rounded-2xl overflow-hidden">

            
                <div className="absolute inset-0 gradient-hero opacity-70" aria-hidden />

        
                <div
                    className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
                    aria-hidden
                />
                <div
                    className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
                    aria-hidden
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── Left column ────────────────────────────────────── */}
                    <div className="flex flex-col">

                        {/* Verified badge — uses .glass from your CSS */}
                        <motion.span
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                            variants={fadeUp}
                            custom={0}
                            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6 w-fit"
                        >
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verified caregivers · Trusted by 5,000+ families
                        </motion.span>

                        {/* Headline */}
                        <motion.h1
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                            variants={fadeUp}
                            custom={1}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground"
                        >
                            Trusted care services for your{' '}
                            {/* gradient-text uses your --gradient-primary CSS var */}
                            <span className="gradient-text">loved ones</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                            variants={fadeUp}
                            custom={2}
                            className="mt-6 text-lg text-muted-foreground max-w-xl"
                        >
                            Book verified babysitters, elderly caretakers, and home nursing
                            services instantly — with the warmth your family deserves.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                            variants={fadeUp}
                            custom={3}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            {/* Primary — uses your .shadow-glow */}
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all px-6 py-3 text-sm font-semibold shadow-glow"
                            >
                                Book service <ArrowRight className="h-4 w-4" />
                            </Link>

                            {/* Ghost — uses your .glass */}
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-full glass text-foreground hover:bg-primary-soft active:scale-95 transition-all px-6 py-3 text-sm font-semibold"
                            >
                                Explore services
                            </Link>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            initial="hidden"
                            animate={inView ? 'show' : 'hidden'}
                            variants={fadeUp}
                            custom={4}
                            className="mt-10 flex items-center gap-6 text-sm text-muted-foreground"
                        >
                            {/* Avatar stack — uses .gradient-primary from your CSS */}
                            <div className="flex -space-x-2" aria-hidden>
                                {[1, 2, 3, 4].map(i => (
                                    <div
                                        key={i}
                                        className="h-9 w-9 rounded-full border-2 border-background gradient-primary"
                                    />
                                ))}
                            </div>
                            <div>
                                {/* Stars — uses --accent token */}
                                <div className="flex items-center gap-1 text-accent">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="mt-0.5">Rated 4.9/5 by 12,000+ families</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                        variants={fadeRight}
                        className="relative"
                    >
                        {/* Glow halo behind image — gradient-primary + blur */}
                        <div
                            className="absolute inset-4 gradient-primary rounded-[2.5rem] blur-2xl opacity-30"
                            aria-hidden
                        />

                        {/* Image card — uses .glass + .shadow-glow */}
                        <div className="relative rounded-4xl overflow-hidden glass shadow-glow">
                            <Image
                                src={heroImg}
                                width={500}
                                height={500}
                                alt="A caregiver smiling with an elderly woman in a bright, cozy living room"
                            />
                        </div>

                        {/* Badge — bottom left | uses .glass + .shadow-card + --success token */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-card flex items-center gap-3"
                        >
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
                                <Shield className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Background checked</p>
                                <p className="font-semibold text-sm text-foreground">100% verified</p>
                            </div>
                        </motion.div>

                        {/* Badge — top right | uses .glass + .shadow-card + --success token */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.8, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-card"
                        >
                            <p className="text-xs text-muted-foreground">Available now</p>
                            <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                1,000+ caregivers
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default Banner;