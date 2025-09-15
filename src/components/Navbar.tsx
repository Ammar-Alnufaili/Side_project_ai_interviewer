"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const links = [
        { href: "/", label: "Home" },
        { href: "/auth/login", label: "Login" },
        { href: "/auth/register", label: "Sign Up" },
    ];

    return (
        <header className="border-b bg-white">
            <nav className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold text-blue-600">AI Interviewer</Link>
                <div className="flex gap-6">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`${pathname === l.href ? "text-blue-600 font-medium" : "text-gray-700"} text-sm hover:text-blue-600`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
