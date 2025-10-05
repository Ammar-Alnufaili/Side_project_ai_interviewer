"use client";

import { Button } from "@/components/UI/Button";
import { useState } from "react";

// Define a type for the job details for reusability
type JobDetails = {
    title: string;
    description: string;
    skills: string[];
    company: string;
};

// A reusable checkbox component to reduce duplication
const ConsentCheckbox = ({ id, checked, onChange, title, children }: any) => (
    <label htmlFor={id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50">
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="mt-1 h-4 w-4"
        />
        <span>
            <strong className="font-semibold">{title}</strong>
            <p className="text-sm text-gray-600">{children}</p>
        </span>
    </label>
);

// Accept job details as a prop
export default function Step1({ onNext, job }: { onNext: () => void; job: JobDetails }) {
    // Combine consent states into a single object
    const [consents, setConsents] = useState({
        recording: false,
        dataProcessing: false,
    });

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setConsents(prev => ({ ...prev, [name]: checked }));
    };

    const allConsentsGiven = Object.values(consents).every(Boolean);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome to your interview</h2>
            <p className="text-gray-600">
                You’ve been invited to interview for <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong>.
            </p>

            <div className="bg-white border rounded-lg p-6 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold">Position Details</h3>
                <p className="text-gray-700">{job.description}</p>
                <div className="flex gap-2 flex-wrap pt-2">
                    {job.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm space-y-2">
                <h3 className="text-lg font-semibold">Consent & Privacy</h3>
                <p className="text-sm text-gray-500 mb-2">
                    Please review and accept the following before proceeding.
                </p>
                <ConsentCheckbox
                    id="recording"
                    name="recording"
                    checked={consents.recording}
                    onChange={handleConsentChange}
                    title="Recording Consent"
                >
                    I consent to this interview being recorded and transcribed for evaluation purposes.
                </ConsentCheckbox>
                <ConsentCheckbox
                    id="dataProcessing"
                    name="dataProcessing"
                    checked={consents.dataProcessing}
                    onChange={handleConsentChange}
                    title="Data Processing"
                >
                    I agree to the processing of my personal data for recruitment purposes.
                </ConsentCheckbox>
            </div>

            <div className="text-right">
                <Button onClick={onNext} disabled={!allConsentsGiven}>
                    Accept & Continue
                </Button>
            </div>
        </div>
    );
}