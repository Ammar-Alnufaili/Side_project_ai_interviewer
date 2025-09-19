// src/app/interviews/join/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinInterviewPage() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleJoin = () => {
        if (!name || !code) return;

        // Redirect to Step 1 of setup flow
        router.push(`/setup/${code}/step1?name=${encodeURIComponent(name)}`);
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Join an Interview</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="Interview Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <button
                    onClick={handleJoin}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Join Interview
                </button>
            </div>
        </div>
    );
}
