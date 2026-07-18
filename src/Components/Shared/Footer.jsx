"use client"

import { 
  HeartPulse, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import Link from "next/link";

export function Footer() {
 
  const socials = [
    {
      label: "Facebook",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      label: "X (Twitter)",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      svg: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t bg-muted/30 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="gradient-text">CaringHands</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Trusted, on-demand care for the people you love — verified caregivers, secure payments, total peace of mind.
          </p>
          <div className="flex gap-2">
            {socials.map((social, i) => (
              <a 
                key={i} 
                href="#" 
                aria-label={social.label} 
                className="grid h-9 w-9 place-items-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/service/babysitting" className="hover:text-primary">Babysitting</Link></li>
            <li><Link href="/service/elderly-care" className="hover:text-primary">Elderly Care</Link></li>
            <li><Link href="/service/home-nursing" className="hover:text-primary">Home Nursing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/testimonials" className="hover:text-primary">Testimonials</Link></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> 
              <span>hello@caringhands</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> 
              <span>+1 (800) 555-CARE</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> 
              <span>Available nationwide</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()}CaringHands — Caring made simple.</p>
          <p>Built with love for families everywhere.</p>
        </div>
      </div>
    </footer>
  );
}