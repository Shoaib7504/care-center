"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HeartPulse,
  Menu,
  X,
  User,
  CalendarCheck,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Clock,
  History,
  Heart,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Bell,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/booking", label: "MyBooking" },
];

const megaMenuSections = {
  bookings: {
    title: "Bookings",
    items: [
      { label: "My Bookings", href: "/booking", icon: CalendarCheck },
      { label: "Upcoming", href: "/booking?tab=upcoming", icon: Clock },
      { label: "Past Bookings", href: "/booking?tab=past", icon: History },
      { label: "Favorites", href: "/favorites", icon: Heart },
    ],
  },
  account: {
    title: "Account",
    items: [
      { label: "My Profile", href: "/profile", icon: User },
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Payment Methods", href: "/payment", icon: CreditCard },
    ],
  },
  support: {
    title: "Support",
    items: [
      { label: "Help Center", href: "/help", icon: HelpCircle },
      { label: "Contact Us", href: "/contact", icon: MessageCircle },
      { label: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const path = usePathname();
  const { data: session, status } = useSession();

  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        toggleRef.current &&
        toggleRef.current.contains(e.target)
      ) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [path]);

  const handleNav = (label, href) => (e) => {
    setProfileOpen(false);
    setOpen(false);
    const messages = {
      Home: "🏠 Going to homepage",
      About: "ℹ️ Learn about us",
      Services: "🛠️ Explore our services",
      Testimonials: "⭐ See what clients say",
      MyBooking: "📋 View your bookings",
      "My Bookings": "📋 Opening your bookings",
      Upcoming: "📅 Checking upcoming visits",
      "Past Bookings": "📜 Reviewing past bookings",
      Favorites: "❤️ Viewing your favorites",
      "My Profile": "👤 Opening your profile",
      Dashboard: "📊 Loading dashboard",
      Settings: "⚙️ Opening settings",
      "Payment Methods": "💳 Managing payments",
      "Help Center": "❓ Opening help center",
      "Contact Us": "📬 Opening contact form",
      Notifications: "🔔 Viewing notifications",
    };
    toast.success(messages[label] || `→ Navigating to ${label}`, {
      duration: 2000,
    });
    if (href) {
      // Navigation happens via the Link component naturally
    }
  };

  if (status === "loading") {
    return (
      <header className="sticky top-0 z-50 glass border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="gradient-text">CaringHands</span>
          </div>
          <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 glass border-b  w-11/12 mx-auto rounded-xl mt-1">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
        >
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
                  aria-current={active ? "page" : undefined}
                  onClick={handleNav(l.label, l.to)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-soft text-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          {session?.user?.role === "admin" && (
            <li>
              <Link
                href="/dashboard"
                onClick={handleNav("Dashboard", "/dashboard")}
                className="rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {status === "authenticated" ? (
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              ref={toggleRef}
              onClick={() => setProfileOpen((o) => !o)}
              aria-expanded={profileOpen}
              aria-haspopup="true"
              aria-controls="profile-dropdown"
              className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/20 transition-shadow group-hover:ring-primary/40">
                <img
                  alt={session.user.name || "User"}
                  src={session.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="max-w-[100px] truncate text-foreground">
                {session.user.name}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-all duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div id="profile-dropdown" className="absolute right-0 top-full mt-2 w-[640px] origin-top-right animate-fade-in rounded-2xl border bg-card p-0 shadow-card overflow-hidden">
                <div className="grid grid-cols-[1fr_2fr]">
                  <div className="bg-gradient-to-b from-primary/5 to-transparent p-5 border-r border-border">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-3 h-16 w-16 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-soft">
                        <img
                          alt={session.user.name || "User"}
                          src={session.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 break-all">
                        {session.user.email}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        <Star className="h-2.5 w-2.5" />
                        {session.user.role || "Member"}
                      </span>
                    </div>
                    <div className="mt-4 space-y-1">
                      <Link
                        href="/profile"
                        onClick={handleNav("My Profile", "/profile")}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-foreground"
                      >
                        <span className="flex items-center gap-2.5">
                          <User className="h-4 w-4 text-primary" />
                          View Profile
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                      <Link
                        href="/settings"
                        onClick={handleNav("Settings", "/settings")}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-foreground"
                      >
                        <span className="flex items-center gap-2.5">
                          <Settings className="h-4 w-4 text-primary" />
                          Settings
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {megaMenuSections.bookings.title}
                        </p>
                        <div className="space-y-0.5">
                          {megaMenuSections.bookings.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleNav(item.label, item.href)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {megaMenuSections.account.title}
                        </p>
                        <div className="space-y-0.5">
                          {megaMenuSections.account.items
                            .filter((item) => item.label !== "Dashboard" || session?.user?.role === "admin")
                            .map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleNav(item.label, item.href)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                            >
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 border-t border-border pt-3">
                      <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {megaMenuSections.support.title}
                      </p>
                      <div className="grid grid-cols-2 gap-0.5">
                        {megaMenuSections.support.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNav(item.label, item.href)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {session.user.role === "admin" && (
                      <div className="mt-3 border-t border-border pt-3">
                        <Link
                          href="/admin"
                          onClick={handleNav("Admin Panel", "/admin")}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-accent-foreground/80 transition-colors hover:bg-accent/20 hover:text-accent-foreground"
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Admin Panel
                          <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                        </Link>
                      </div>
                    )}

                    <div className="mt-3 border-t border-border pt-3">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
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
        )}

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1">
            {status === "authenticated" && (
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-2 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
                  <img
                    alt={session.user.name || "User"}
                    src={session.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {session.user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>
            )}

            {links.map((l) => {
              const active =
                path === l.to || (l.to !== "/" && path.startsWith(l.to));
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => { setOpen(false); handleNav(l.label, l.to)(e); }}
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              );
            })}

            {status === "authenticated" ? (
              <>
                <div className="h-px bg-border my-1" />
                <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Bookings
                </p>
                {megaMenuSections.bookings.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { setOpen(false); handleNav(item.label, item.href)(e); }}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    {item.label}
                  </Link>
                ))}
                <p className="px-4 py-1 mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Account
                </p>
                {megaMenuSections.account.items
                  .filter((item) => item.label !== "Dashboard" || session?.user?.role === "admin")
                  .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { setOpen(false); handleNav(item.label, item.href)(e); }}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    {item.label}
                  </Link>
                ))}
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={(e) => { setOpen(false); handleNav("Admin Panel", "/admin")(e); }}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-accent-foreground/80 hover:bg-accent/20"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
