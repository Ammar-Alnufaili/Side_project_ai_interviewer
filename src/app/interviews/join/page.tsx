// src/app/interviews/join/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    FaUser,
    FaHashtag,
    FaBrain,
    FaClock,
    FaRobot,
    FaUserFriends,
    FaCheckCircle,
} from "react-icons/fa";

export default function JoinInterviewPage() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleJoin = () => {
        if (!name || !code) return;
        // CORRECTED LINE: Changed '/step1?name=' to '?step=1&name='
        router.push(`/setup/${code}?step=1&name=${encodeURIComponent(name)}`);
    };

    const handlePass = () => {
        // CORRECTED LINE: Changed '/step1' to '?step=1'
        router.push("/setup/test123?step=1");
    };


    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 font-[Poppins]">
            <div className="flex w-[95%] max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Left info panel */}
                <section className="hidden w-2/5 flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white md:flex">
                    <div className="mb-8 flex items-center text-2xl font-bold">
                        <FaBrain className="mr-3" /> AI Interviewer
                    </div>
                    <h1 className="mb-4 text-3xl font-bold">Welcome Back!</h1>
                    <p className="text-sm opacity-90">
                        Ready to showcase your skills? Enter your details to join the AI-powered
                        interview and begin the assessment.
                    </p>
                </section>

                {/* Right form + info panel */}
                <section className="flex w-full flex-col justify-center p-8 md:w-3/5 md:p-10">
                    <h2 className="text-2xl font-semibold">Join an Interview</h2>
                    <p className="mb-6 text-gray-600">Please enter your name and the provided code.</p>

                    {/* Form */}
                    <div className="space-y-5">
                        {/* Full Name */}
                        <div className="relative">
                            <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Interview Code */}
                        <div className="relative">
                            <FaHashtag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Interview Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full rounded-lg border py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons row */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleJoin}
                                className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Join Interview
                            </button>

                            {/* New Pass button */}
                            <button
                                onClick={handlePass}
                                className="flex-1 rounded-lg bg-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-400"
                            >
                                Pass
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-8 h-px w-full bg-gray-200" />

                    {/* Stats row */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
                            <div className="mb-2 flex justify-center">
                                <FaClock className="h-7 w-7 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-500">15–20 min</div>
                            <div className="text-lg font-semibold">Duration</div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
                            <div className="mb-2 flex justify-center">
                                <FaRobot className="h-7 w-7 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-500">AI Powered</div>
                            <div className="text-lg font-semibold">Interview</div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
                            <div className="mb-2 flex justify-center">
                                <FaUserFriends className="h-7 w-7 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-500">1-on-1</div>
                            <div className="text-lg font-semibold">Format</div>
                        </div>
                    </div>

                    {/* Tips panel */}
                    <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                        <div className="mb-3 flex items-center gap-2 text-xl font-semibold text-blue-700">
                            <FaCheckCircle className="h-5 w-5" />
                            Interview Tips
                        </div>
                        <ul className="list-disc space-y-2 pl-6 text-blue-700">
                            <li>Find a quiet, well-lit space</li>
                            <li>Test your camera and microphone</li>
                            <li>Have your resume and notes ready</li>
                            <li>Speak clearly and naturally</li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}