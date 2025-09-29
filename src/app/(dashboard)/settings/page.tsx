// src/app/(dashboard)/settings/page.tsx
"use client";

import React from "react";
import Link from "next/link";

const settings = [
    {
        title: "Profile",
        description: "Update your personal info, avatar, and public profile.",
        href: "/settings/profile",
        icon: (
            <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c3.042 0 5.824.948 8.121 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        title: "Security",
        description: "Change password, enable 2FA, and review login history.",
        href: "/settings/security",
        icon: (
            <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.657 1.343-3 3-3h1a2 2 0 012 2v1m-8 8v-4a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6"
                />
            </svg>
        ),
    },
    {
        title: "Notifications",
        description: "Set up email alerts, push notifications and reminders.",
        href: "/settings/notifications",
        icon: (
            <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
            </svg>
        ),
    },
    {
        title: "Accessibility",
        description: "Switch between light/dark mode and adjust theme settings.",
        href: "/settings/accessibility",
        icon: (
            <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-13.66l-.707.707M4.047 19.314l-.707.707M21 12h-1M4 12H3m16.66 5.66l-.707-.707M4.047 4.686l-.707-.707M12 5a7 7 0 000 14"
                />
            </svg>
        ),
    },
    {
        title: "Privacy",
        description: "Control who sees your activity and manage data sharing.",
        href: "/settings/privacy",
        icon: (
            <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c-1.657 0-3 .895-3 2v2h6v-2c0-1.105-1.343-2-3-2zm0-6a9 9 0 00-9 9 9 9 0 0018 0 9 9 0 00-9-9z"
                />
            </svg>
        ),
    },
];

const SettingsPage = () => {
    return (
        <main className="max-w-7xl mx-auto p-6 md:p-8 min-h-screen bg-gray-0 text-gray-800">
            {/* Back link */}
            <div className="mb-6">
                <Link
                    href="/dashboard"
                    className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold mb-8">Settings</h1>

            {/* Settings cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {settings.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 border-t-4 border-blue-500"
                    >
                        <div className="flex items-center mb-4">
                            {item.icon}
                            <h2 className="text-xl font-bold ml-3">{item.title}</h2>
                        </div>
                        <p className="text-gray-600 mb-6">{item.description}</p>
                        <Link
                            href={item.href}
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                        >
                            Manage
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default SettingsPage;
