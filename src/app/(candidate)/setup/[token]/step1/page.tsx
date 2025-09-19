// src/app/(candidate)/setup/[token]/step1/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Step1() {
    const router = useRouter();

    const next = () => {
        router.push("step2");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome to your interview</h2>
            <p>You’ve been invited to interview for <strong>Senior Frontend Developer</strong>.</p>

            <div className="border rounded p-4">
                <h3 className="font-semibold">Position Details</h3>
                <p>Looking for an experienced React developer to join our team.</p>
                <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded">React</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">TypeScript</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">Node.js</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">AWS</span>
                </div>
            </div>

            <div className="border rounded p-4">
                <h3 className="font-semibold mb-2">Consent & Privacy</h3>
                <label className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Recording Consent — I consent to this interview being recorded.</span>
                </label>
                <label className="flex items-start space-x-2 mt-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Data Processing — I agree to the processing of my personal data.</span>
                </label>
            </div>

            <div className="flex justify-end">
                <button onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
        </div>
    );
}
