// src/app/(candidate)/setup/[token]/step2/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Step2() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Interview Mode</h2>
            <p>Choose how you’d like to conduct your interview and test your setup.</p>

            <div className="grid grid-cols-2 gap-4">
                <button className="border rounded p-6 hover:bg-gray-100">🎤 Voice Interview</button>
                <button className="border rounded p-6 hover:bg-gray-100">💬 Text Interview</button>
            </div>

            <div className="border rounded p-4">
                <h3 className="font-semibold">Microphone Test</h3>
                <button className="mt-2 px-4 py-2 border rounded">Allow Microphone</button>
            </div>

            <div className="flex justify-between">
                <button onClick={() => router.back()} className="px-4 py-2 border rounded">
                    Previous
                </button>
                <button onClick={() => router.push("step3")} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
        </div>
    );
}
