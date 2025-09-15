"use client";

import { useState } from "react";

export default function JoinInterviewPage() {
    const [fullName, setFullName] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 🔜 Later: call FastAPI to validate code and fetch Zoom URL
        setTimeout(() => {
            alert(`Joining interview with code ${code} as ${fullName}`);
            setLoading(false);
            // Example: window.location.href = zoomUrl;
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto py-20">
            <h1 className="text-2xl font-bold mb-6">Join an Interview</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Interview Code</label>
                    <input
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-1 w-full rounded-md border px-3 py-2"
                        placeholder="Enter the code from your employer"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Joining..." : "Join Interview"}
                </button>
            </form>
        </div>
    );
}
