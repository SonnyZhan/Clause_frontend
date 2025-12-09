"use client";

import React from "react";
import { CasesOverTimeChart, CaseStatusChart } from "@/components/Charts/ClinicAnalyticsCharts";
import { MOCK_CLINIC_STATS } from "@/lib/mockData";

export default function ClinicAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Analytics
        </h2>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black dark:text-white">Date Range:</span>
            <select className="rounded border border-stroke bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4">
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="this_year">This Year</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-7.5">
         <div className="rounded-2xl border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <h4 className="text-title-md font-bold text-black dark:text-white">
                {MOCK_CLINIC_STATS.totalCases}
            </h4>
            <span className="text-sm font-medium text-gray-500">Total Cases Resolved</span>
         </div>
         <div className="rounded-2xl border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <h4 className="text-title-md font-bold text-black dark:text-white">
                ${(MOCK_CLINIC_STATS.totalRecovered / 1000).toFixed(1)}k
            </h4>
            <span className="text-sm font-medium text-gray-500">Total Damages Recovered</span>
         </div>
         <div className="rounded-2xl border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <h4 className="text-title-md font-bold text-black dark:text-white">
                92%
            </h4>
            <span className="text-sm font-medium text-gray-500">Client Satisfaction</span>
         </div>
         <div className="rounded-2xl border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <h4 className="text-title-md font-bold text-black dark:text-white">
                14 Days
            </h4>
            <span className="text-sm font-medium text-gray-500">Avg. Resolution Time</span>
         </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <CasesOverTimeChart />
        <CaseStatusChart />
      </div>
    </div>
  );
}
