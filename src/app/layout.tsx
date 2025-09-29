import "@/styles/globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "AI Interviewer",
    description: "Zoom-based AI interviewing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
            {/* Navbar at the top */}
            <Navbar />

            {/* Main content grows to fill space */}
            <main className="flex-grow">{children}</main>

            {/* Footer pushed to the bottom */}
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
