"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { createBooking } from "@/action/server/bookingDetails";
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

// Fields that must be valid before moving on from each step
const STEP_FIELDS = {
  1: ["qty"],
  2: ["city", "address"],
  3: [],
  4: ["cardName", "cardNumber", "cardExp", "cardCvc"],
};

// Shared input class
const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm " +
  "text-foreground placeholder:text-muted-foreground " +
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow";

export default function BookingForm({ service }) {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  // react-hook-form setup — replaces all the individual useState fields
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      unit: "hours",
      qty: 2,
      division: "",
      district: "",
      city: "",
      area: "",
      address: "",
      cardName: "",
      cardNumber: "",
      cardExp: "",
      cardCvc: "",
    },
  });

  // Watch the fields we need live for pricing + review + summary
  const unit = watch("unit");
  const qty = watch("qty");
  const division = watch("division");
  const district = watch("district");
  const city = watch("city");
  const area = watch("area");
  const address = watch("address");

  //  Derived pricing — field is pricePerHour in the DB
  const rate     = service?.pricePerHour ?? 0;
  const hours    = unit === "hours" ? qty : qty * 8;
  const subtotal = hours * rate;
  const vat      = subtotal * 0.05;
  const total    = subtotal + vat;

  // Validate only the current step's fields, then advance
  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data) => {
    await createBooking({
      userId: session?.user?.id,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      serviceId: service?._id ?? service?.id,
      serviceTitle: service?.title ?? null,
      serviceImage: service?.image ?? null,
      unit: data.unit,
      qty: data.qty,
      hours,
      division: data.division,
      district: data.district,
      city: data.city,
      area: data.area,
      address: data.address,
      subtotal,
      vat,
      total,
    });
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">

      {/* Progress stepper */}
      {!done && (
        <div className="mb-10 animate-fade-in" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={STEPS.length} aria-label="Booking progress">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((st, i) => {
              const active = step >= st.id;
              return (
                <div key={st.id} className="flex-1 flex items-center gap-2">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full shrink-0 transition-all duration-300
                      ${active
                        ? "gradient-primary text-primary-foreground shadow-soft"
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
                        ${step > st.id ? "bg-primary" : "bg-muted"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main layout */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1fr_360px] gap-8">

        {/* Step card */}
        <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8 min-h-[480px] flex flex-col">

          {done ? (
            /* Confirmation screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 animate-scale-in">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
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
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full gradient-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-soft cta-btn"
                >
                  View my bookings
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Book another
                </Link>
              </div>
            </div>

          ) : (
            <div className="flex-1 flex flex-col">
              {/* key re-mounts on step change → CSS animate-fade-up re-fires */}
              <div key={step} className="flex-1 animate-fade-up" aria-live="polite" aria-atomic="true">

                {/* Step 1 · Duration */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold">How long do you need care?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Adjust anytime before payment.</p>

                    <div className="mt-6 flex gap-2">
                      {["hours", "days"].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setValue("unit", u)}
                          className={`flex-1 rounded-2xl border px-4 py-3 font-semibold capitalize transition-all cursor-pointer
                            ${unit === u
                              ? "border-primary bg-primary-soft text-primary"
                              : "border-border hover:bg-muted"
                            }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>

                    {/* Hidden registered field so react-hook-form validates qty > 0 */}
                    <input
                      type="hidden"
                      {...register("qty", {
                        required: true,
                        min: { value: 1, message: "At least 1" },
                        valueAsNumber: true,
                      })}
                    />

                    <div className="mt-8 rounded-2xl border border-border p-6 text-center">
                      <p className="text-sm text-muted-foreground">Number of {unit}</p>
                      <div className="mt-3 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => setValue("qty", Math.max(1, qty - 1), { shouldValidate: true })}
                          aria-label="Decrease"
                          className="h-12 w-12 rounded-full border border-border text-xl font-bold hover:bg-muted transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-5xl font-extrabold gradient-text w-24 text-center tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setValue("qty", qty + 1, { shouldValidate: true })}
                          aria-label="Increase"
                          className="h-12 w-12 rounded-full border border-border text-xl font-bold hover:bg-muted transition-colors cursor-pointer"
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
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                )}

                {/* Step 2 · Location */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold">Where should we send care?</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Your caregiver will arrive at this address.</p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Division</label>
                        <input className={inputCls} {...register("division")} placeholder="e.g. Dhaka" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">District</label>
                        <input className={inputCls} {...register("district")} placeholder="e.g. Dhaka" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">City <span className="text-destructive">*</span></label>
                        <input
                          className={inputCls}
                          {...register("city", { required: "City is required" })}
                          aria-invalid={errors.city ? "true" : "false"}
                          aria-describedby={errors.city ? "city-error" : undefined}
                          placeholder="e.g. Dhaka"
                        />
                        {errors.city && (
                          <p id="city-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Area</label>
                        <input className={inputCls} {...register("area")} placeholder="e.g. Gulshan" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1.5">Full address <span className="text-destructive">*</span></label>
                      <textarea
                        rows={3}
                        {...register("address", { required: "Full address is required" })}
                        aria-invalid={errors.address ? "true" : "false"}
                        aria-describedby={errors.address ? "address-error" : undefined}
                        placeholder="House, road, apartment, landmarks…"
                        className={`${inputCls} resize-none`}
                      />
                      {errors.address && (
                        <p id="address-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.address.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3 · Review */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold">Review your booking</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Everything in one place.</p>

                    <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background overflow-hidden">
                      {[
                        { label: "Service",        value: service?.title ?? "—" },
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

                {/* Step 4 · Payment */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold">Secure payment</h2>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-success" />
                      256-bit encrypted · Powered by Stripe
                    </p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Cardholder name</label>
                        <input
                          className={inputCls}
                          {...register("cardName", { required: "Cardholder name is required" })}
                          aria-invalid={errors.cardName ? "true" : "false"}
                          aria-describedby={errors.cardName ? "cardName-error" : undefined}
                          placeholder="Jane Doe"
                        />
                        {errors.cardName && (
                          <p id="cardName-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.cardName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Card number</label>
                        <input
                          className={inputCls}
                          {...register("cardNumber", {
                            required: "Card number is required",
                            validate: (v) =>
                              v.replace(/\s/g, "").length >= 16 || "Enter a valid card number",
                          })}
                          aria-invalid={errors.cardNumber ? "true" : "false"}
                          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
                          placeholder="1234 5678 9012 3456"
                          inputMode="numeric"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p id="cardNumber-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.cardNumber.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Expiry (MM/YY)</label>
                          <input
                            className={inputCls}
                            {...register("cardExp", { required: "Required" })}
                            aria-invalid={errors.cardExp ? "true" : "false"}
                            aria-describedby={errors.cardExp ? "cardExp-error" : undefined}
                            placeholder="12/27"
                            maxLength={5}
                          />
                          {errors.cardExp && (
                            <p id="cardExp-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.cardExp.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">CVC</label>
                          <input
                            className={inputCls}
                            {...register("cardCvc", {
                              required: "Required",
                              minLength: { value: 3, message: "Too short" },
                            })}
                            aria-invalid={errors.cardCvc ? "true" : "false"}
                            aria-describedby={errors.cardCvc ? "cardCvc-error" : undefined}
                            placeholder="123"
                            inputMode="numeric"
                            maxLength={4}
                          />
                          {errors.cardCvc && (
                            <p id="cardCvc-error" className="mt-1 text-xs font-medium text-destructive" role="alert">{errors.cardCvc.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-10 flex justify-between gap-3">
                <button
                  type="button"
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card
                    px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer
                    ${step === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-muted"}`}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-1.5 rounded-full gradient-primary
                      text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-soft cta-btn cursor-pointer"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full gradient-primary
                      text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-glow cta-btn cursor-pointer"
                  >
                    Confirm & pay ${total.toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sticky summary sidebar */}
        <aside className="rounded-3xl border border-border bg-card shadow-card p-6 h-fit lg:sticky lg:top-24 animate-fade-up delay-200">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your booking</p>
          <h3 className="mt-1 font-bold text-lg">{service?.title ?? "Service"}</h3>

          {service?.image && (
            <div className="mt-3 rounded-2xl overflow-hidden aspect-video w-full relative">
              <Image
                src={service.image}
                alt={service.title ?? "Service image"}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
            </div>
          )}

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

          <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="gradient-text">${total.toFixed(2)}</span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Secure checkout · Cancel anytime
          </div>
        </aside>
      </form>
    </div>
  );
}