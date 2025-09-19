// src/app/(candidate)/setup/[token]/layout.tsx
"use client";


import { usePathname } from "next/navigation";


const steps = [
    { step: 1, label: "Position Details & Consent" },
    { step: 2, label: "Interview Mode" },
    { step: 3, label: "Resume Upload" },
];

export default function SetupLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const currentStep = steps.findIndex((s) => pathname.includes(`step${s.step}`)) + 1;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">Interview Setup</h1>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
            </div>

            {children}
        </div>
    );
}
