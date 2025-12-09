"use client";

import React from "react";
import { MOCK_TENANT_CASES } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeftIcon } from "@/components/Layouts/sidebar/icons";

export default function TenantCaseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const caseItem = MOCK_TENANT_CASES.find((c) => c.id === params.id);

  if (!caseItem) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6">
        <Link
          href="/tenant/cases"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-primary dark:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Cases
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Case Details
          </h2>
          <div className="flex gap-3">
             {/* Actions based on status */}
             {caseItem.status === 'complete' && (
                 <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90">
                     Download Demand Letter
                 </button>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* Case Info */}
        <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Property Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="block text-sm font-medium text-gray-500">Address</span>
              <span className="text-black dark:text-white">{caseItem.address}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500">Lease Start</span>
              <span className="text-black dark:text-white">
                {format(new Date(caseItem.leaseStartDate), "MMM d, yyyy")}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500">Lease End</span>
              <span className="text-black dark:text-white">
                {format(new Date(caseItem.leaseEndDate), "MMM d, yyyy")}
              </span>
            </div>
             <div>
              <span className="block text-sm font-medium text-gray-500">Rent Amount</span>
              <span className="text-black dark:text-white">${caseItem.rentAmount}/mo</span>
            </div>
          </div>
        </div>

        {/* Status & Damages */}
        <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Status & Damages
          </h3>
           <div className="space-y-3">
            <div>
              <span className="block text-sm font-medium text-gray-500">Current Status</span>
               <span
                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                  caseItem.status === "complete"
                    ? "bg-success text-success"
                    : caseItem.status === "analyzing"
                    ? "bg-warning text-warning"
                    : "bg-primary text-primary"
                }`}
              >
                {caseItem.status.replace("_", " ")}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500">Estimated Damages</span>
              <span className="text-2xl font-bold text-black dark:text-white">
                ${caseItem.estimatedDamages.toLocaleString()}
              </span>
            </div>
             <div>
              <span className="block text-sm font-medium text-gray-500">Clinic Match Score</span>
              <span className="text-black dark:text-white">{caseItem.matchScore}%</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Documents
          </h3>
          <ul className="space-y-2">
            {caseItem.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between rounded-md border border-stroke p-2 dark:border-strokedark">
                    <span className="text-sm text-black dark:text-white truncate max-w-[150px]">{doc.name}</span>
                    <span className="text-xs text-gray-500 uppercase">{doc.type}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Violations */}
      <div className="mt-6 rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Identified Violations
        </h3>
        <div className="flex flex-col gap-4">
            {caseItem.violations.map((violation) => (
                <div key={violation.id} className="rounded-lg border border-stroke p-4 dark:border-strokedark">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-black dark:text-white">{violation.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            violation.severity === 'high' ? 'bg-red-100 text-red-600' :
                            violation.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                            'bg-yellow-100 text-yellow-600'
                        }`}>
                            {violation.severity.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{violation.description}</p>
                    <div className="text-xs text-gray-500">
                        <span className="font-semibold">Law:</span> {violation.lawReference}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
