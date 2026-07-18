"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function AdminRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center animate-fade-in">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (session?.user?.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-full bg-destructive/10 text-5xl shadow-soft">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You do not have permission to access this area. Admin privileges required.
        </p>
      </div>
    );
  }

  return children;
}
