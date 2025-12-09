"use client";

import { ChevronUp } from "@/components/Layouts/sidebar/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3.5"
      >
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-peach-200 shadow-glow-peach dark:border-coral-500/30">
          <Image
            src={user.avatar || "/images/user/owner.jpg"}
            alt={user.name}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-dark-2"></span>
        </div>

        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold text-dark dark:text-white">
            {user.name}
          </p>
          <p className="text-xs font-medium text-dark-5 dark:text-gray-400 capitalize">
            {user.role}
          </p>
        </div>

        <ChevronUp
          className={cn(
            "hidden size-4 text-dark-4 transition-transform duration-200 dark:text-dark-6 lg:block",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 rounded-2xl border border-peach-200/50 bg-white/80 p-2 shadow-xl backdrop-blur-xl dark:border-coral-500/20 dark:bg-black-800/80"
        >
          <div className="px-4 py-3 lg:hidden">
            <p className="text-sm font-semibold text-dark dark:text-white">
              {user.name}
            </p>
            <p className="text-xs font-medium text-dark-5 dark:text-gray-400 capitalize">
              {user.role}
            </p>
          </div>
          
          <div className="h-px bg-peach-200/50 dark:bg-coral-500/20 lg:hidden" />

          <ul className="flex flex-col gap-1">
            <li>
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-dark-4 transition-colors hover:bg-peach-50 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-dark-4 transition-colors hover:bg-peach-50 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Account Settings
              </button>
            </li>
            
            <div className="my-1 h-px bg-peach-200/50 dark:bg-coral-500/20" />
            
            <li>
              <button 
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
