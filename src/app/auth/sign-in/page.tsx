"use client";

import { useState } from "react";
import { SparklesIcon } from "@/components/Layouts/sidebar/icons";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleDemoLogin = async (role: "tenant" | "clinic") => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await login(role);
    } catch (error) {
      console.error("Login failed", error);
      setIsLoggingIn(false);
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For MVP, we'll just default to tenant login for manual entry if credentials match demo
    if (email === "clinic@demo.com") {
      handleDemoLogin("clinic");
    } else {
      handleDemoLogin("tenant");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Side - Visual & Branding */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-black-900 via-black-800 to-orange-600 p-8 text-white md:w-1/2 lg:p-16">
        {/* Texture Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30">
            <span className="text-4xl font-bold text-white">C</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 my-auto max-w-lg">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Secure Your <br />
            <span className="bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent">
              Legal Rights
            </span>
          </h1>
          <p className="mb-8 text-lg text-white/70">
            AI-powered lease analysis and legal clinic matching. Protect
            yourself from illegal clauses and get the justice you deserve.
          </p>

          {/* Testimonial Card */}
          <div className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-4 flex gap-1 text-orange-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-4 text-sm italic text-white/90">
              "Clause helped me identify 3 illegal provisions in my lease and
              recover $2,400 in security deposit violations. It's a game
              changer."
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 font-bold text-orange-300">
                JD
              </div>
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-white/50">Tenant in Boston, MA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8 flex items-center gap-6 text-sm text-white/50">
          <span>© 2024 Clause Inc.</span>
          <Link href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white p-8 dark:bg-black-800 md:w-1/2 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-800 dark:text-gray-300">
              Please sign in to your account
            </p>
          </div>

          {/* Quick Login Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleDemoLogin("tenant")}
              disabled={isLoggingIn}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/30 disabled:opacity-70 disabled:hover:scale-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">Demo Tenant Account</p>
                <p className="text-xs text-white/80">
                  View dashboard, upload leases
                </p>
              </div>
              {isLoggingIn && (
                <div className="absolute right-4 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              )}
            </button>

            <button
              onClick={() => handleDemoLogin("clinic")}
              disabled={isLoggingIn}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100 dark:bg-gray-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">Demo Clinic Account</p>
                <p className="text-xs text-gray-400">
                  Manage cases, review documents
                </p>
              </div>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 font-medium text-gray-700 dark:bg-black-800 dark:text-gray-300">
                or sign in manually
              </span>
            </div>
          </div>

          <form onSubmit={handleManualLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-orange-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={!email || !password || isLoggingIn}
              className="flex w-full justify-center rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center text-sm">
              <span className="font-medium text-gray-800 dark:text-gray-300">
                Don't have an account?{" "}
              </span>
              <Link
                href="/auth/sign-up"
                className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
