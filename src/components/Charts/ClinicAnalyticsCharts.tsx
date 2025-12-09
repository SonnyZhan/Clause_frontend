"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function CasesOverTimeChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      background: "transparent",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    colors: ["#FF5722", "#60a5fa"],
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shade: isDark ? "dark" : "light",
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: isDark ? "#9ca3af" : "#6b7280",
        },
      },
    },
    yaxis: { 
      show: true,
      labels: {
        style: {
          colors: isDark ? "#9ca3af" : "#6b7280",
        },
      },
    },
    grid: { 
      show: true,
      borderColor: isDark ? "#374151" : "#e5e7eb",
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    legend: {
      labels: {
        colors: isDark ? "#f3f4f6" : "#1f2937",
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      x: { format: "dd/MM/yy HH:mm" },
    },
  };

  const series = [
    {
      name: "New Cases",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Resolved Cases",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <div className="col-span-12 rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:px-7.5 xl:col-span-8">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Cases Overview
      </h3>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export function CaseStatusChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options: ApexOptions = {
    chart: { 
      type: "donut",
      background: "transparent",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    colors: ["#FF5722", "#F59E0B", "#10B981", "#60a5fa"],
    labels: ["Active", "Pending", "Resolved", "Closed"],
    legend: { 
      show: true, 
      position: "bottom",
      labels: {
        colors: isDark ? "#f3f4f6" : "#1f2937",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total Cases",
              fontSize: "16px",
              fontWeight: "bold",
              color: isDark ? "#f3f4f6" : "#1f2937",
            },
            value: {
              color: isDark ? "#f3f4f6" : "#1f2937",
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    responsive: [
      {
        breakpoint: 2600,
        options: { chart: { width: 380 } },
      },
      {
        breakpoint: 640,
        options: { chart: { width: 200 } },
      },
    ],
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
  };

  const series = [45, 15, 30, 10];

  return (
    <div className="col-span-12 rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-7.5 shadow-sm dark:border-gray-700 dark:bg-gray-900 xl:col-span-4">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Case Status
      </h3>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}

