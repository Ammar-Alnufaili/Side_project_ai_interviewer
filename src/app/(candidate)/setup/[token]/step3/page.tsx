// src/app/(candidate)/setup/[token]/step3/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Step3() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upload Resume</h2>
            <p>Please upload your most recent resume in PDF format (max 10MB).</p>

            <div className="border-2 border-dashed rounded p-10 text-center">
                <p>📄 Click to upload resume</p>
            </div>

            <div className="flex justify-between">
                <button onClick={() => router.back()} className="px-4 py-2 border rounded">
                    Previous
                </button>
                <button
                    onClick={() => router.push(`/meeting/dummy-link`)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Start Interview
                </button>
            </div>
        </div>
    );
}
