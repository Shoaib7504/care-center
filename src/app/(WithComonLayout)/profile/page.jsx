"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  ShieldCheck,
  IdCard,
  Phone,
  Save,
  Loader2,
  HeartPulse,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile } from "@/action/server/user";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    document.title = "My Profile | Care Center";
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        reset({
          nid: data.nid || "",
          phone: data.phone || "",
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [status, reset]);

  const onSubmit = async (data) => {
    try {
      const result = await updateUserProfile(data);
      if (result.success) {
        toast.success(result.message);
        const fresh = await getUserProfile();
        setProfile(fresh);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center animate-fade-in">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 sm:px-8 py-8 text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-soft">
              <img
                alt={session.user.name || "User"}
                src={session.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {session.user.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {session.user.email}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3 w-3" />
              {session.user.role || "Member"}
            </span>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                <User className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.name || session.user.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Contact & Identity
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Update your NID number and contact details below.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <label htmlFor="nid" className="text-sm font-medium block text-foreground">
                    NID Number
                  </label>
                  <div className="relative mt-1.5">
                    <IdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="nid"
                      type="text"
                      {...register("nid", {
                        validate: (value) =>
                          !value || value.trim() !== "" || "NID cannot be empty",
                      })}
                      aria-invalid={errors.nid ? "true" : "false"}
                      placeholder={profile?.nid ? "Update your NID" : "Add your NID number"}
                      className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2.5 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  {errors.nid && (
                    <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
                      {errors.nid.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium block text-foreground">
                    Contact Number
                  </label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone", {
                        validate: (value) =>
                          !value || value.trim() !== "" || "Phone cannot be empty",
                      })}
                      aria-invalid={errors.phone ? "true" : "false"}
                      placeholder={profile?.phone ? "Update your contact number" : "Add your contact number"}
                      className="pl-10.5 w-full rounded-xl border border-input bg-background text-foreground px-3.5 py-2.5 text-sm placeholder:text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-destructive" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-11 px-8 shadow-soft gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
