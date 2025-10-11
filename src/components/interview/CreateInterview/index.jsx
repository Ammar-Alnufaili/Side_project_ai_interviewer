"use client";
import React, { useState } from "react";
import { InterviewProvider } from "./InterviewContext";

import InterviewDetails from "./steps/InterviewDetails";
import EvaluationRubric from "./steps/EvaluationRubric";
import QuestionBank from "./steps/QuestionBank";
import InviteCandidates from "./steps/InviteCandidates";

export default function CreateInterview() {
    const [step, setStep] = useState(1);

    const next = () => setStep((s) => Math.min(s + 1, 4));
    const back = () => setStep((s) => Math.max(s - 1, 1));

    const stepTitles = ["Details", "Rubric", "Questions", "Invite"];

    return (
        <InterviewProvider>
            <div className="min-h-screen bg-[#f7f9fb] p-8 font-[Poppins]">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-2xl font-semibold mb-6">Create New Interview</h1>

                    {/* Progress indicator */}
                    <div className="flex justify-between mb-6">
                        {stepTitles.map((label, i) => (
                            <div
                                key={i}
                                className={`flex-1 text-center text-sm font-medium ${
                                    i + 1 === step
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-400"
                                }`}
                            >
                                {i + 1}. {label}
                            </div>
                        ))}
                    </div>

                    {/* Render current step */}
                    {step === 1 && <InterviewDetails next={next} />}
                    {step === 2 && <EvaluationRubric next={next} back={back} />}
                    {step === 3 && <QuestionBank next={next} back={back} />}
                    {step === 4 && <InviteCandidates back={back} />}
                </div>
            </div>
        </InterviewProvider>
    );
}
