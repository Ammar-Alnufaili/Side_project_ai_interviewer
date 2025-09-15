import "@/styles/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "AI Interviewer",
    description: "Zoom-based AI interviewing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className="min-h-screen bg-neutral-50 text-neutral-900">
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
