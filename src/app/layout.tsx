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
            <html lang="en" className="h-full">
            <body className="flex min-h-screen flex-col bg-[#f5f8fe] text-neutral-900">
            {/* Navbar at the top */}
            <Navbar />

            {/* Main content fills space */}
            <main className="flex-grow">{children}</main>

            {/* Footer stays at bottom */}
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
