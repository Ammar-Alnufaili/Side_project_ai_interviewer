"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <header className="w-full bg-[#1A2535] text-white px-4 sm:px-8 py-4 shadow-md z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/ai.png" // change this to your logo path
                        alt="AI Interviewer Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-2xl font-bold">AI Interviewer</span>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="flex flex-wrap gap-4 sm:gap-6 text-sm font-medium items-center">
                        <li>
                            <Link href="/" className="hover:text-[#4FC3F7]">
                                🏠 Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className="hover:text-[#4FC3F7]">
                                📊 Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/settings" className="hover:text-[#4FC3F7]">
                                ⚙️ Settings
                            </Link>
                        </li>

                        {/* Auth Buttons */}
                        <SignedIn>
                            <li className="ml-2">
                                <UserButton afterSignOutUrl="/" />
                            </li>
                        </SignedIn>
                        <SignedOut>
                            <li className="ml-2">
                                <SignInButton mode="modal">
                                    <button className="bg-[#4FC3F7] px-4 py-2 rounded-full text-sm hover:bg-[#38bdf8] transition">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </li>
                        </SignedOut>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
