"use client";

import React from "react";
import {
  MOCK_CLINIC_STATS,
  MOCK_ACTIVE_CASES,
  MOCK_INCOMING_CASES,
} from "@/lib/mockData";
import Link from "next/link";
import { format } from "date-fns";

export default function ClinicDashboard() {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Clinic Dashboard
          </h1>
          <p className="mt-1 text-sm text-dark-5 dark:text-gray-400">
            Overview of your caseload and incoming requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-dark-5 dark:text-gray-400">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </span>
          <Link
            href="/clinic/incoming"
            className="btn-gradient flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold shadow-glow-coral transition-transform hover:scale-105 active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Review Requests
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* Active Cases Card */}
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-peach-200/30 to-coral-200/30 blur-2xl dark:from-coral-500/10 dark:to-orchid-500/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-5 dark:text-gray-400">
                Active Cases
              </p>
              <h3 className="mt-2 text-3xl font-bold text-dark dark:text-white">
                {MOCK_CLINIC_STATS.activeCases}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach-50 text-coral-500 dark:bg-coral-500/10 dark:text-coral-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-medium text-green">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +5
            </span>
            <span className="text-xs text-dark-5 dark:text-gray-400">this month</span>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-gold-200/30 to-orange-200/30 blur-2xl dark:from-gold-500/10 dark:to-orange-500/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-5 dark:text-gray-400">
                Pending Requests
              </p>
              <h3 className="mt-2 text-3xl font-bold text-dark dark:text-white">
                {MOCK_CLINIC_STATS.pendingRequests}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
              Needs Review
            </span>
            <span className="text-xs text-dark-5 dark:text-gray-400">from tenants</span>
          </div>
        </div>

        {/* Total Recovered Card */}
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-mint-200/30 to-green-200/30 blur-2xl dark:from-mint-500/10 dark:to-green-500/10" />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-5 dark:text-gray-400">
                Total Recovered
              </p>
              <h3 className="mt-2 text-3xl font-bold text-dark dark:text-white">
                ${MOCK_CLINIC_STATS.totalRecovered.toLocaleString()}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-50 text-mint-600 dark:bg-mint-500/10 dark:text-mint-400">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-medium text-green">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              +12%
            </span>
            <span className="text-xs text-dark-5 dark:text-gray-400">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        {/* Incoming Requests */}
        <div className="glass-card rounded-3xl p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Incoming Requests
            </h2>
            <Link
              href="/clinic/incoming"
              className="flex items-center gap-1 text-sm font-medium text-coral-500 hover:text-coral-600 dark:text-coral-400"
            >
              View All
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_INCOMING_CASES.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="group relative flex flex-col gap-3 rounded-2xl border border-stroke bg-gray-50/50 p-4 transition-all hover:bg-white hover:shadow-card-2 dark:border-strokedark dark:bg-meta-4/30 dark:hover:bg-meta-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {req.tenantName}
                    </h3>
                    <p className="text-xs text-dark-5 dark:text-gray-400">
                      {req.title}
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    req.urgency === "high" || req.urgency === "critical"
                      ? "bg-red-light-6 text-red dark:bg-red-dark/20 dark:text-red-light"
                      : "bg-orange-light/20 text-orange-light dark:bg-orange-light/10"
                  }`}>
                    {req.urgency.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {req.matchScore}% Match
                  </span>
                  <Link
                    href={`/clinic/incoming/${req.id}`}
                    className="text-sm font-medium text-dark-5 hover:text-primary dark:text-gray-400"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Cases */}
        <div className="glass-card rounded-3xl p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Active Cases
            </h2>
            <Link
              href="/clinic/active"
              className="flex items-center gap-1 text-sm font-medium text-coral-500 hover:text-coral-600 dark:text-coral-400"
            >
              View All
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_ACTIVE_CASES.slice(0, 3).map((caseItem) => (
              <div
                key={caseItem.id}
                className="group relative flex items-center justify-between rounded-2xl border border-stroke bg-gray-50/50 p-4 transition-all hover:bg-white hover:shadow-card-2 dark:border-strokedark dark:bg-meta-4/30 dark:hover:bg-meta-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-boxdark">
                    <span className="text-lg">
                      {caseItem.tenantName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {caseItem.tenantName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-dark-5 dark:text-gray-400">
                      <span>{caseItem.stage.replace(/_/g, " ")}</span>
                      <span className="h-1 w-1 rounded-full bg-dark-5/30 dark:bg-gray-400/30" />
                      <span>{format(new Date(caseItem.lastUpdated || new Date()), "MMM d")}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/clinic/cases/${caseItem.id}`}
                  className="rounded-lg bg-white p-2 text-dark-5 shadow-sm transition-colors hover:text-primary dark:bg-boxdark dark:text-gray-400"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
