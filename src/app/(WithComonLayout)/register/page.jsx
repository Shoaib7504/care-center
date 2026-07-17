"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  HeartPulse,
  User,
  IdCard,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { PostUser } from "@/action/server/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GooleSingInButton from "@/Components/GooleSingInButton";

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const router = useRouter()
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      nid: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password live for the requirement checklist
  const pw = watch("password");
  const pw2 = watch("confirmPassword");

  // Submission handler — just logs the form values for now
  const onSubmit = async (data) => {
    try {
      const response = await PostUser(data);
      if (response.success) {
        toast.success("Account created successfully")
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 1500)
      }
      else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-background font-sans antialiased selection:bg-primary-soft">

      {/* Interactive Form Side Column */}
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1 bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-card"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create your account</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Care for your family in under a minute.
          </p>

          <div className="mt-6 space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="name" className="text-sm font-medium block text-foreground">
                Full name
              </label>
              <div className="relative mt-1.5">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Full name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder="Jane Doe"
                  className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* NID Number Input */}
            <div>
              <label htmlFor="nid" className="text-sm font-medium block text-foreground">
                NID number
              </label>
              <div className="relative mt-1.5">
                <IdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="nid"
                  type="text"
                  {...register("nid", { required: "NID number is required" })}
                  aria-invalid={errors.nid ? "true" : "false"}
                  placeholder="1234567890"
                  className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              {errors.nid && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.nid.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium block text-foreground">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  suppressHydrationWarning
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="you@email.com"
                  className="pl-10.5 w-full rounded-xl border border-input text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Contact Number Input */}
            <div>
              <label htmlFor="phone" className="text-sm font-medium block text-foreground">
                Contact number
              </label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", { required: "Contact number is required" })}
                  aria-invalid={errors.phone ? "true" : "false"}
                  placeholder="+1 555 000 0000"
                  className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="pw" className="text-sm font-medium block text-foreground">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="pw"
                  type={showPw ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Must be at least 6 characters" },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="At least 6 chars"
                  className="pl-10.5 pr-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="pw2" className="text-sm font-medium block text-foreground">
                Confirm password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="pw2"
                  type={showPw2 ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === pw || "Passwords do not match",
                  })}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  placeholder="Repeat password"
                  className="pl-10.5 pr-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPw2 ? "Hide confirm password" : "Show confirm password"}
                >
                  {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Requirement Checklist — still live via watch() */}
            <ul className="text-xs space-y-1.5 grid grid-cols-2 gap-x-2 pt-1 select-none text-muted-foreground font-medium">
              <li className="flex items-center gap-1.5">
                <Check className={`h-3 w-3 ${pw?.length >= 6 ? "text-success" : "text-muted-foreground/40"}`} />
                6+ characters
              </li>
              <li className="flex items-center gap-1.5">
                <Check className={`h-3 w-3 ${/[A-Z]/.test(pw || "") ? "text-success" : "text-muted-foreground/40"}`} />
                One uppercase
              </li>
              <li className="flex items-center gap-1.5">
                <Check className={`h-3 w-3 ${/[a-z]/.test(pw || "") ? "text-success" : "text-muted-foreground/40"}`} />
                One lowercase
              </li>
              <li className="flex items-center gap-1.5">
                <Check className={`h-3 w-3 ${pw && pw === pw2 ? "text-success" : "text-muted-foreground/40"}`} />
                Passwords match
              </li>
            </ul>
          </div>

          {/* Form Action Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-11 px-8 mt-6 shadow-soft gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create account"} <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              Log in
            </Link>
          </p>

          <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex-1 h-px bg-border" />
            <span>or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <GooleSingInButton />

        </form>
      </div>

      {/* Visual Branding Side Column */}
      <div className="hidden lg:flex relative gradient-hero items-center justify-center p-12 overflow-hidden order-1 lg:order-2">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative max-w-md text-center">
          <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-3xl gradient-primary text-primary-foreground shadow-glow">
            <HeartPulse className="h-10 w-10" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Care, the way it should be</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Join 5,000+ families who trust Care.xyz with the people who matter most.
          </p>
        </div>
      </div>

    </div>
  );
}