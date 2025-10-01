// src/app/(candidate)/setup/[token]/ProgressBar.tsx
"use client";

import { usePathname } from "next/navigation";

const steps = [
    { step: 1, label: "Position Details & Consent" },
    { step: 2, label: "Interview Mode" },
    { step: 3, label: "Resume Upload" },
];

export default function ProgressBar() {
    const pathname = usePathname();
    const currentStep = steps.findIndex((s) => pathname.includes(`step${s.step}`)) + 1;

    return (
        <>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
            </div>
        </>
    );
}
