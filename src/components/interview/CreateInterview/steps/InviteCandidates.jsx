"use client";
import React, { useState } from "react";
import { useInterviewContext } from "../InterviewContext";
import { Textarea } from "@/components/UI/Textarea";
import { Button } from "@/components/UI/Button";
import { useRouter } from "next/navigation";

export default function InviteCandidates({ back }) {
    const { state } = useInterviewContext();
    const [emails, setEmails] = useState("");
    const router = useRouter();

    const handleFinish = async () => {
        const payload = {
            ...state,
            candidates: emails.split("\n").filter((e) => e.trim()),
        };

        await fetch("/api/interviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        router.push("/dashboard/interviews");
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Invite Candidates</h2>
            <Textarea
                rows={4}
                placeholder="Enter candidate emails (one per line)"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
            />

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p><strong>Title:</strong> {state.title}</p>
                <p><strong>Description:</strong> {state.description}</p>
                <p><strong>Questions:</strong> {state.questions?.length}</p>
            </div>

            <div className="flex justify-between mt-6">
                <Button onClick={back} className="border">Back</Button>
                <Button
                    onClick={handleFinish}
                    className="bg-green-600 text-white hover:bg-green-700"
                >
                    Finish & Create Interview
                </Button>
            </div>
        </div>
    );
}
