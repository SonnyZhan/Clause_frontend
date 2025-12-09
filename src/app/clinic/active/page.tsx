"use client";

import React, { useState } from "react";
import { MOCK_ACTIVE_CASES } from "@/lib/mockData";
import Link from "next/link";
import { format } from "date-fns";

export default function ClinicActiveCasesPage() {
  const [filter, setFilter] = useState<
    "document_review" | "demand_letter_sent" | "negotiation" | "all"
  >("all");

  const filteredCases = MOCK_ACTIVE_CASES.filter((c) =>
    filter === "all" ? true : c.stage === filter,
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
      case "low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "document_review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "demand_letter_sent":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "negotiation":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Active Cases
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage and track ongoing cases
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          {filteredCases.length} {filteredCases.length === 1 ? "Case" : "Cases"}
        </div>
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
          All Cases ({MOCK_ACTIVE_CASES.length})
        </button>
        <button
          onClick={() => setFilter("document_review")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "document_review"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Document Review (
          {
            MOCK_ACTIVE_CASES.filter((c) => c.stage === "document_review")
              .length
          }
          )
        </button>
        <button
          onClick={() => setFilter("demand_letter_sent")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "demand_letter_sent"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Demand Letter Sent (
          {
            MOCK_ACTIVE_CASES.filter((c) => c.stage === "demand_letter_sent")
              .length
          }
          )
        </button>
        <button
          onClick={() => setFilter("negotiation")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === "negotiation"
              ? "bg-primary text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Negotiation (
          {MOCK_ACTIVE_CASES.filter((c) => c.stage === "negotiation").length})
        </button>
      </div>

      {/* Cases Grid */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Header with Priority Badge */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {caseItem.tenantName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Case ID: {caseItem.id}
                  </p>
                </div>
                <span
                  className={`flex h-9 items-center rounded-full border px-3 text-xs font-bold uppercase ${getPriorityColor(caseItem.priority)}`}
                >
                  {caseItem.priority}
                </span>
              </div>

              {/* Case Details */}
              <div className="mb-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Case Type:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {caseItem.caseType?.replace(/_/g, " ") ||
                      caseItem.type ||
                      "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Stage:
                  </span>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${getStageColor(caseItem.stage)}`}
                  >
                    {caseItem.stage.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last Updated:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(caseItem.lastUpdated), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                <Link
                  href={`/clinic/cases/${caseItem.id}`}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Manage Case
                </Link>
                <button className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  View Details
                </button>
              </div>
            </div>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No active cases found
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            No cases match the selected filter.
          </p>
        </div>
      )}
    </div>
  );
}
