// src/app/interviews/join/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaHashtag, FaBrain } from "react-icons/fa";

export default function JoinInterviewPage() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleJoin = () => {
        if (!name || !code) return;
        router.push(`/setup/${code}/step1?name=${encodeURIComponent(name)}`);
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-[Poppins]">
            <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-[95%]">
                {/* Left info panel */}
                <section className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 w-2/5">
                    <div className="flex items-center text-2xl font-bold mb-8">
                        <FaBrain className="mr-3" /> AI Interviewer
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-sm opacity-90">
                        Ready to showcase your skills? Enter your details to join the
                        AI-powered interview and begin the assessment.
                    </p>
                </section>

                {/* Right form panel */}
                <section className="flex flex-col justify-center p-10 w-full md:w-3/5">
                    <h2 className="text-2xl font-semibold mb-2">Join an Interview</h2>
                    <p className="text-gray-600 mb-6">
                        Please enter your name and the provided code.
                    </p>

                    <div className="space-y-5">
                        {/* Full Name */}
                        <div className="relative">
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Interview Code */}
                        <div className="relative">
                            <FaHashtag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Interview Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleJoin}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Join Interview
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
