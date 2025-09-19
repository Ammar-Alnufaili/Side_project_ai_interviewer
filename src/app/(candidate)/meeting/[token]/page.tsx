// src/app/(candidate)/meeting/[token]/page.tsx
"use client";

export default function MeetingPage({ params }: { params: { token: string } }) {
    return (
        <div className="p-6 max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Your Interview is Ready 🎉</h1>
            <p>Click the button below to join your interview session.</p>

            <a
                href={`/video/${params.token}`}
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded text-lg"
            >
                Join Meeting
            </a>
        </div>
    );
}
