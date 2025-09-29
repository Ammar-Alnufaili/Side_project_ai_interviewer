import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#1A2535] text-white text-center py-1 px-4 text-sm">
            <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-white-600">© {new Date().getFullYear()} AI Interviewer</p>
                <div className="flex gap-4 text-sm">
                    <Link href="/privacy" className="hover:underline">Privacy</Link>
                    <Link href="/terms" className="hover:underline">Terms</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
