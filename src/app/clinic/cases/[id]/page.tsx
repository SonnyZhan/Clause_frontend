"use client";

import React, { useState } from "react";
import { MOCK_ACTIVE_CASES } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeftIcon } from "@/components/Layouts/sidebar/icons";

export default function ClinicCaseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const caseItem = MOCK_ACTIVE_CASES.find((c) => c.id === params.id);
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "analysis"
  >("overview");

  if (!caseItem) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <Link
          href="/clinic/active"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-primary dark:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Active Cases
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              {caseItem.tenantName}
            </h2>
            <p className="text-sm text-gray-500">Case ID: {caseItem.id}</p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-primary px-6 py-3 text-center font-medium text-primary transition-colors hover:bg-primary hover:text-white">
              Message Tenant
            </button>
            <button className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90">
              Update Status
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dark:border-strokedark mb-6 border-b border-stroke">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 text-sm font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`pb-4 text-sm font-medium ${
              activeTab === "documents"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            className={`pb-4 text-sm font-medium ${
              activeTab === "analysis"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            AI Analysis
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <div className="dark:border-strokedark dark:bg-boxdark rounded-2xl border border-stroke bg-white p-6 shadow-default">
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Case Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="block text-sm font-medium text-gray-500">
                  Stage
                </span>
                <span className="capitalize text-black dark:text-white">
                  {caseItem.stage.replace(/_/g, " ")}
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">
                  Priority
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    caseItem.priority === "high"
                      ? "bg-danger/10 text-danger"
                      : caseItem.priority === "medium"
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"
                  }`}
                >
                  {caseItem.priority.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">
                  Last Updated
                </span>
                <span className="text-black dark:text-white">
                  {format(new Date(caseItem.lastUpdated), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="dark:border-strokedark dark:bg-boxdark col-span-1 rounded-2xl border border-stroke bg-white p-6 shadow-default md:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Next Steps
            </h3>
            <div className="dark:border-strokedark dark:bg-meta-4 rounded-lg border border-stroke bg-gray-50 p-4">
              <p className="mb-2 text-black dark:text-white">
                {caseItem.nextSteps}
              </p>
              <button className="text-sm font-medium text-primary hover:underline">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="dark:border-strokedark dark:bg-boxdark rounded-2xl border border-stroke bg-white p-6 shadow-default">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Case Documents
          </h3>
          <p className="text-gray-500">No documents uploaded yet (Mock).</p>
        </div>
      )}

      {activeTab === "analysis" && (
        <div className="dark:border-strokedark dark:bg-boxdark rounded-2xl border border-stroke bg-white p-6 shadow-default">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            AI Analysis
          </h3>
          <p className="text-gray-500">
            AI analysis not available for this mock case.
          </p>
        </div>
      )}
    </div>
  );
}
