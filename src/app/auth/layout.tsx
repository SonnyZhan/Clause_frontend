"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  // Force dark mode on auth pages - prevent theme switching
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className="dark" data-theme="dark" suppressHydrationWarning>
      {children}
    </div>
  );
}
