"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, HeartPulse, Lock, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Submission handler — just logs the form values for now
  const onSubmit = (data) => {
    console.log("Login form submitted:", data);
  };

  const stats = ["5k+ families", "1k+ caregivers", "98% rated"];

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-background font-sans antialiased selection:bg-primary-soft">

      {/* Visual Branding Side Column */}
      <div className="hidden lg:flex relative gradient-hero items-center justify-center p-12 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative max-w-md text-center">
          <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-3xl gradient-primary text-primary-foreground shadow-glow">
            <HeartPulse className="h-10 w-10" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Welcome back</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Your caregivers are ready when you are. Log in to manage bookings
            and reach out to your trusted team.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 text-center">
            {stats.map((t) => (
              <div key={t} className="rounded-2xl glass p-3 text-xs font-semibold text-foreground tracking-wide uppercase">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Form Side Column */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-card"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Log in</h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Continue caring for what matters most.
          </p>

          {/* Federated Google OAuth Login */}
          <button
            type="button"
            className="mt-6 w-full rounded-full border border-border bg-background text-foreground hover:bg-muted py-2.5 flex items-center justify-center gap-2.5 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FaGoogle className="h-4 w-4 text-primary" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="flex-1 h-px bg-border" />
            <span>or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-4">
            {/* Email Address Input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium block text-foreground">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="you@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input with Interactive Visibility Toggle */}
            <div>
              <label htmlFor="pw" className="text-sm font-medium block text-foreground">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="pw"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className="pl-10.5 pr-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Recovery Options */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-foreground text-sm font-medium">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="accent-primary rounded-md h-4 w-4 border-input cursor-pointer"
                />
                Remember me
              </label>
              <Link href="#" className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Form Action Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-11 px-8 mt-6 shadow-soft gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"} <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}