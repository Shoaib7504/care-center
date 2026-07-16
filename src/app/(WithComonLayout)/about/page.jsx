import { Award, Heart, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

const values = [
  { icon: Heart,    title: "Empathy first", desc: "We design for the moments that matter most." },
  { icon: Users,    title: "Community",     desc: "5,000+ families, 1,000+ caregivers, one network." },
  { icon: Award,    title: "Excellence",    desc: "Background-checked, skill-verified, family-rated." },
  { icon: Sparkles, title: "Innovation",    desc: "Modern tech for an age-old need." },
];

const delays = ['delay-300', 'delay-400', 'delay-500', 'delay-600'];
export const metadata = {
  title: "About Us",
  description: "Compassionate Care, Right at Your Doorstep.",
};
const AboutUs = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">

      <span className="animate-fade-in text-sm font-semibold uppercase tracking-wider text-primary">
        Our story
      </span>

      <h1 className="animate-fade-up delay-100 mt-2 text-4xl sm:text-5xl font-bold max-w-3xl">
        Care that treats your family like ours.
      </h1>

      <p className="animate-fade-up delay-200 mt-6 text-lg text-muted-foreground max-w-2xl">
        Care.xyz was born from a simple question: why is finding a trusted caregiver so hard? We built
        a platform that pairs warmth with rigor — every caregiver vetted, every booking insured, every
        family supported around the clock.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <div key={v.title} className={`value-card animate-fade-up ${delays[i]} rounded-3xl border bg-card p-6 shadow-soft`}>
            <div className="card-icon grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground mb-4">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">{v.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="animate-scale-in delay-700 mt-16 rounded-3xl gradient-hero p-10 text-center">
        <h2 className="text-2xl font-bold">Ready to experience care that cares?</h2>
        <Link
          href="/services"
          className="cta-btn inline-block mt-5 px-6 py-2.5 rounded-full gradient-primary text-primary-foreground font-medium text-sm shadow-soft"
        >
          Browse services
        </Link>
      </div>

    </div>
  );
};

export default AboutUs;