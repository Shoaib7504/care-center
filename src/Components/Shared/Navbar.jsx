"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <div>
      <header className="sticky top-0 z-50 glass border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="gradient-text">CaringHands</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                path === l.to || (l.to !== "/" && path.startsWith(l.to));
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary-soft text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-full shadow-soft h-8 px-3 text-xs bg-primary text-primary-foreground flex items-center"
            >
              Get started
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md py-2 text-sm"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md py-2 text-sm"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;