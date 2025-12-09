"use client";

import React, { useState } from "react";
import { MOCK_TENANT_CASES } from "@/lib/mockData";
import Link from "next/link";
import { format } from "date-fns";
import { Case } from "@/types/types";

export default function TenantCasesPage() {
  const [filter, setFilter] = useState<Case["status"] | "all">("all");

  const filteredCases = MOCK_TENANT_CASES.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
      case "settled":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "analyzing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "awaiting_clinic_response":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
      case "settled":
        return "✓";
      case "analyzing":
        return "⟳";
      case "awaiting_clinic_response":
        return "📧";
      default:
        return "•";
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Cases
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track and manage your legal cases
          </p>
        </div>
        <Link
          href="/tenant/upload"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Start New Case
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All Cases ({MOCK_TENANT_CASES.length})
        </button>
        <button
          onClick={() => setFilter("analyzing")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "analyzing"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Analyzing ({MOCK_TENANT_CASES.filter((c) => c.status === "analyzing").length})
        </button>
        <button
          onClick={() => setFilter("awaiting_clinic_response")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "awaiting_clinic_response"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Awaiting Response ({MOCK_TENANT_CASES.filter((c) => c.status === "awaiting_clinic_response").length})
        </button>
        <button
          onClick={() => setFilter("complete")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "complete"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Complete ({MOCK_TENANT_CASES.filter((c) => c.status === "complete" || c.status === "settled").length})
        </button>
      </div>

      {/* Cases Grid */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/tenant/cases/${caseItem.id}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary/50"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    {caseItem.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {caseItem.type}
                  </p>
                </div>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-lg ${getStatusColor(caseItem.status)}`}>
                  {getStatusIcon(caseItem.status)}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Created</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(caseItem.createdAt), "MMM d, yyyy")}
                  </span>
                </div>

                {caseItem.estimatedDamages && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Est. Recovery</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ${caseItem.estimatedDamages.toLocaleString()}
                    </span>
                  </div>
                )}

                {caseItem.violationCount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Violations</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {caseItem.violationCount}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status.replace(/_/g, " ").toUpperCase()}
                </span>
              </div>

              {/* View Arrow */}
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                View Details
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No cases found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No cases match the selected filter.
          </p>
        </div>
      )}
    </div>
  );
}
