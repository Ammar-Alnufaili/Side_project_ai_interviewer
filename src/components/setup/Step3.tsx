"use client";

import { Button } from "@/components/UI/Button";
import { Mic, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx"; // A utility for constructing className strings conditionally. `npm install clsx`

type InterviewMode = "voice" | "text";

const MODES = [
    { id: "voice", label: "Voice Interview", icon: Mic },
    { id: "text", label: "Text Interview", icon: FileText },
];

export default function Step3({ onNext }: { onNext: (data: { mode: InterviewMode }) => void }) {
    const [mode, setMode] = useState<InterviewMode>("voice");
    const [micStatus, setMicStatus] = useState<"idle" | "success" | "error">("idle");

    const requestMic = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicStatus("success");
        } catch (error) {
            console.error("Microphone access denied:", error);
            setMicStatus("error");
        }
    };

    const micButtonContent = useMemo(() => {
        switch (micStatus) {
            case "success": return <><CheckCircle className="mr-2" /> Mic Allowed</>;
            case "error": return <><AlertTriangle className="mr-2" /> Mic Denied</>;
            default: return <><Mic className="mr-2" /> Allow Microphone</>;
        }
    }, [micStatus]);

    const isNextDisabled = mode === "voice" && micStatus !== "success";

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Interview Mode</h2>
            <p className="text-gray-600">
                Choose how you'd like to conduct your interview and test your setup.
            </p>

            <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold">Select Interview Mode</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MODES.map((m) => (
                        <div
                            key={m.id}
                            onClick={() => setMode(m.id as InterviewMode)}
                            className={clsx(
                                "p-4 border rounded-lg cursor-pointer text-center transition-all duration-200",
                                { "border-blue-600 ring-2 ring-blue-300 bg-blue-50": mode === m.id },
                                { "hover:border-gray-400": mode !== m.id }
                            )}
                        >
                            <m.icon className="mx-auto mb-2 h-6 w-6" />
                            <span className="font-medium">{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {mode === "voice" && (
                <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold">Microphone Test</h3>
                    <p className="text-sm text-gray-600">
                        We need access to your microphone for the voice interview.
                    </p>
                    <Button onClick={requestMic} disabled={micStatus === 'success'} className="flex items-center justify-center">
                        {micButtonContent}
                    </Button>
                    {micStatus === 'error' && <p className="text-sm text-red-600">Please enable microphone permissions in your browser settings to continue.</p>}
                </div>
            )}
            <div className="text-right">
                <Button onClick={() => onNext({ mode })} disabled={isNextDisabled}>
                    Next
                </Button>
            </div>
        </div>
    );
}