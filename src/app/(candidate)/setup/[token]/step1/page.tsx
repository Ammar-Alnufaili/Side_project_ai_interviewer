"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

// Mock job data (later fetch this with token)
const mockJob = {
    id: "1",
    title: "Senior Frontend Developer",
    description: "Looking for an experienced React developer to join our team",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    company: "TechCorp Inc.",
};

export default function CandidateStep1() {
    const router = useRouter();
    const params = useParams();
    const token = params?.token as string;

    const [consentGiven, setConsentGiven] = useState(false);
    const [dataProcessingConsent, setDataProcessingConsent] = useState(false);

    const handleNext = () => {
        if (consentGiven && dataProcessingConsent) {
            router.push(`/setup/${token}/step2`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome to your interview</h1>
                    <p className="text-gray-600">
                        You’ve been invited to interview for{" "}
                        <span className="font-semibold">{mockJob.title}</span> at{" "}
                        {mockJob.company}.
                    </p>
                </div>

                {/* Job details */}
                <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
                    <h2 className="font-semibold">{mockJob.title}</h2>
                    <p className="text-sm text-gray-600">{mockJob.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {mockJob.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                {/* Consents */}
                <div className="space-y-4">
                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-1"
                        />
                        <span>
              I consent to this interview being recorded and transcribed for
              evaluation purposes.
            </span>
                    </label>

                    <label className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            checked={dataProcessingConsent}
                            onChange={(e) => setDataProcessingConsent(e.target.checked)}
                            className="mt-1"
                        />
                        <span>
              I agree to the processing of my personal data (resume, responses,
              assessment).
            </span>
                    </label>
                </div>

                {/* Next button */}
                <button
                    onClick={handleNext}
                    disabled={!consentGiven || !dataProcessingConsent}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                        consentGiven && dataProcessingConsent
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
