"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className="border-b bg-white">
            <nav className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold text-blue-600">AI Interviewer</Link>

                <div className="flex items-center gap-4">
                    <Link
                        href="/features"
                        className={`text-sm hover:text-blue-600 ${pathname === "/features" ? "text-blue-600 font-medium" : "text-gray-700"}`}
                    >
                        Features
                    </Link>

                    <SignedOut>
                        <Link
                            href="/auth/sign-in"
                            className="text-sm hover:text-blue-600 text-gray-700"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/auth/sign-up"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Sign up
                        </Link>
                    </SignedOut>

                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-100"
                        >
                            Dashboard
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
}
