"use client";

import { useState } from "react";
import { MOCK_CLINICS } from "@/lib/mockData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ClinicMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

export default function ClinicMatchModal({
  isOpen,
  onClose,
  caseId,
}: ClinicMatchModalProps) {
  const router = useRouter();
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendToClinic = (clinicId: string) => {
    setSelectedClinic(clinicId);
    const clinic = MOCK_CLINICS.find((c) => c.id === clinicId);
    
    toast.success(`Case sent to ${clinic?.name}!`);
    
    // Simulate sending case
    setTimeout(() => {
      onClose();
      router.push("/tenant/cases");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl dark:bg-boxdark">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-black dark:text-white">
            Find Your Legal Clinic
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We've matched you with the best clinics for your case
          </p>
        </div>

        {/* Clinic Cards */}
        <div className="space-y-4">
          {MOCK_CLINICS.map((clinic) => (
            <div
              key={clinic.id}
              className="rounded-2xl border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-lg dark:border-strokedark dark:bg-boxdark"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Clinic Logo */}
                <div className="flex-shrink-0">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                    <Image
                      src={clinic.logo}
                      alt={clinic.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Clinic Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-black dark:text-white">
                        {clinic.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {clinic.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-5 w-5 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-black dark:text-white">
                        {clinic.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({clinic.reviewCount})
                      </span>
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                    {clinic.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {clinic.specialties.map((specialty: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {clinic.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {clinic.email}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleSendToClinic(clinic.id)}
                    disabled={selectedClinic === clinic.id}
                    className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all md:w-auto ${
                      selectedClinic === clinic.id
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-primary hover:bg-opacity-90"
                    }`}
                  >
                    {selectedClinic === clinic.id
                      ? "Sending..."
                      : "Send Case to This Clinic"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            I'll choose later
          </button>
        </div>
      </div>
    </div>
  );
}
