"use client";

// components/BookingPage.tsx
// Pure client component — no async, no await params

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Clock,
  MapPin,
  ClipboardList,
  CreditCard,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";


const STEPS = [
  { id: 1, label: "Duration", Icon: Clock },
  { id: 2, label: "Location", Icon: MapPin },
  { id: 3, label: "Review",   Icon: ClipboardList },
  { id: 4, label: "Payment",  Icon: CreditCard },
];

// Shared input class

const inputCls =
  "w-full rounded-xl border border-(--color-input) bg-background px-4 py-2.5 text-sm " +
  "text-foreground placeholder:text-muted-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-(--color-ring) focus:ring-offset-1 transition-shadow";

// Component 

export default function BookingPage({ service }) {
  //  Step state
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  //  Duration state 
  const [unit, setUnit] = useState<"hours" | "days">("hours");
  const [qty,  setQty]  = useState(2);

  //  Location state 
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city,     setCity]     = useState("");
  const [area,     setArea]     = useState("");
  const [address,  setAddress]  = useState("");

  // Payment state 
  const [cardName,   setCardName]   = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp,    setCardExp]    = useState("");
  const [cardCvc,    setCardCvc]    = useState("");

  //  Derived pricing
  const hours    = unit === "hours" ? qty : qty * 8;
  const subtotal = hours * service.hourlyRate;
  const vat      = subtotal * 0.05;
  const total    = subtotal + vat;

  // Per-step validation
  const canNext =
    step === 1 ? qty > 0 :
    step === 2 ? city.trim() !== "" && address.trim() !== "" :
    step === 3 ? true :
    cardName.trim() !== "" &&
    cardNumber.replace(/\s/g, "").length >= 16 &&
    cardExp.trim() !== "" &&
    cardCvc.trim().length >= 3;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">

      {/*  Progress stepper  */}
      {!done && (
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((st, i) => {
              const active = step >= st.id;
              return (
                <div key={st.id} className="flex-1 flex items-center gap-2">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full shrink-0 transition-all duration-300
                      ${active
                        ? "gradient-primary text-(--color-primary-foreground) shadow-soft"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {step > st.id
                      ? <Check className="h-5 w-5" />
                      : <st.Icon className="h-5 w-5" />
                    }
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-muted-foreground">Step {st.id}</p>
                    <p className={`text-sm font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                      {st.label}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 rounded-full transition-all duration-500
                        ${step > st.id ? "bg-(--color-primary)" : "bg-muted"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/*  Main layout*/}
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">

        {/*  Step card */}
        <div className="rounded-3xl border border-(--color-border) bg-card shadow-card p-6 sm:p-8 min-h-120 flex flex-col">

          {done ? (
            /*  Confirmation screen*/
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 animate-scale-in">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-primary text-(--color-primary-foreground) shadow-glow">
                <Check className="h-10 w-10" />
              </div>
              <h2 className="mt-6 text-3xl font-bold animate-fade-up delay-100">
                Booking confirmed!
              </h2>
              <p className="mt-2 text-muted-foreground animate-fade-up delay-200">
                An invoice was emailed to you. Your caregiver will reach out shortly.
              </p>
              <div className="mt-8 flex gap-3 justify-center animate-fade-up delay-300">
                <Link
                  href="/my-bookings"
                  className="inline-flex items-center gap-2 rounded-full gradient-primary text-(--color-primary-foreground) px-6 py-2.5 text-sm font-semibold shadow-soft cta-btn"
                >
                  View my bookings
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Book another
                </Link>
              </div>
            </div>

          ) : (
            <div className="flex-1 flex flex-col">
              {/* key re-mounts on step change → CSS animate-fade-up re-fires */}
              <div key={step} className="flex-1 animate-fade-up">

                {/* ── Step 1 · Duration*/}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold">How long do you need care?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Adjust anytime before payment.</p>

                    <div className="mt-6 flex gap-2">
                      {(["hours", "days"] ).map((u) => (
                        <button
                          key={u}
                          onClick={() => setUnit(u)}
                          className={`flex-1 rounded-2xl border px-4 py-3 font-semibold capitalize transition-all
                            ${unit === u
                              ? "border-(--color-primary) bg-(--color-primary-soft) text-(--color-primary)"
                              : "border-(--color-border) hover:bg-muted"
                            }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-(--color-border) p-6 text-center">
                      <p className="text-sm text-muted-foreground">Number of {unit}</p>
                      <div className="mt-3 flex items-center justify-center gap-4">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          aria-label="Decrease"
                          className="h-12 w-12 rounded-full border border-(--color-border) text-xl font-bold hover:bg-muted transition-colors"
                        >
                          −
                        </button>
                        <span className="text-5xl font-extrabold gradient-text w-24 text-center tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(qty + 1)}
                          aria-label="Increase"
                          className="h-12 w-12 rounded-full border border-(--color-border) text-xl font-bold hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl gradient-hero p-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Live estimate</p>
                        <p className="text-2xl font-bold">${subtotal.toFixed(2)}</p>
                      </div>
                      <Sparkles className="h-8 w-8 text-(--color-primary)" />
                    </div>
                  </div>
                )}

                {/* ── Step 2 · Location  */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold">Where should we send care?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Your caregiver will arrive at this address.</p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Division</label>
                        <input className={inputCls} value={division} onChange={(e) => setDivision(e.target.value)} placeholder="e.g. Dhaka" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">District</label>
                        <input className={inputCls} value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Dhaka" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">City</label>
                        <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Dhaka" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Area</label>
                        <input className={inputCls} value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Gulshan" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1.5">Full address</label>
                      <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House, road, apartment, landmarks…"
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                )}

                {/*  Step 3 · Review  */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold">Review your booking</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Everything in one place.</p>

                    <dl className="mt-6 divide-y divide-(--color-border) rounded-2xl border border-(--color-border) bg-background overflow-hidden">
                      {[
                        { label: "Service",        value: service.title },
                        { label: "Duration",       value: `${qty} ${unit} (${hours} hrs)` },
                        { label: "Location",       value: `${area || "—"}, ${city || "—"}` },
                        { label: "Address",        value: address || "—" },
                        { label: "Service charge", value: `$${subtotal.toFixed(2)}` },
                        { label: "VAT (5%)",       value: `$${vat.toFixed(2)}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 text-sm">
                          <span className="text-muted-foreground shrink-0">{label}</span>
                          <span className="font-medium text-right">{value}</span>
                        </div>
                      ))}
                      <div className="flex items-start justify-between gap-4 px-4 py-3 text-sm">
                        <span className="text-muted-foreground shrink-0">Total</span>
                        <span className="font-bold text-base text-right">${total.toFixed(2)}</span>
                      </div>
                    </dl>
                  </div>
                )}

                {/* ── Step 4 · Payment */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold">Secure payment</h2>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-(--color-success)" />
                      256-bit encrypted · Powered by Stripe
                    </p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Cardholder name</label>
                        <input className={inputCls} value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Card number</label>
                        <input
                          className={inputCls}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Expiry (MM/YY)</label>
                          <input className={inputCls} value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="12/27" maxLength={5} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">CVC</label>
                          <input className={inputCls} value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder="123" inputMode="numeric" maxLength={4} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Navigation  */}
              <div className="mt-10 flex justify-between gap-3">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-(--color-border) bg-card
                    px-5 py-2.5 text-sm font-semibold transition-colors
                    ${step === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-muted"}`}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {step < 4 ? (
                  <button
                    disabled={!canNext}
                    onClick={() => setStep(step + 1)}
                    className={`inline-flex items-center gap-1.5 rounded-full gradient-primary
                      text-(--color-primary-foreground) px-6 py-2.5 text-sm font-semibold shadow-soft cta-btn
                      ${!canNext ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    disabled={!canNext}
                    onClick={() => setDone(true)}
                    className={`inline-flex items-center gap-1.5 rounded-full gradient-primary
                      text-(--color-primary-foreground) px-6 py-2.5 text-sm font-semibold shadow-glow cta-btn
                      ${!canNext ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    Confirm &amp; pay ${total.toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky summary sidebar  */}
        <aside className="rounded-3xl border border-(--color-border) bg-card shadow-card p-6 h-fit lg:sticky lg:top-24 animate-fade-up delay-200">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your booking</p>
          <h3 className="mt-1 font-bold text-lg">{service.title}</h3>

          <div className="mt-3 rounded-2xl overflow-hidden aspect-video w-full relative">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover"
            />
          </div>

          <dl className="mt-4 space-y-2 text-sm">
            {[
              { label: "Duration", value: `${qty} ${unit}` },
              { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
              { label: "VAT (5%)", value: `$${vat.toFixed(2)}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </dl>

          <div className="border-t border-(--color-border) pt-3 mt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="gradient-text">${total.toFixed(2)}</span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-(--color-success)" />
            Secure checkout · Cancel anytime
          </div>
        </aside>
      </div>
    </div>
  );
}