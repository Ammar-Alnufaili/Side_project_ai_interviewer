import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600">© {new Date().getFullYear()} AI Interviewer</p>
                <div className="flex gap-4 text-sm">
                    <Link href="/privacy" className="hover:underline">Privacy</Link>
                    <Link href="/terms" className="hover:underline">Terms</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
