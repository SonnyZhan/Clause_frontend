"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to their dashboard
    if (user) {
      if (user.role === "tenant") {
        router.push("/tenant/dashboard");
      } else if (user.role === "clinic") {
        router.push("/clinic/dashboard");
      }
    } else {
      // Otherwise redirect to login
      router.push("/auth/sign-in");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );
}
