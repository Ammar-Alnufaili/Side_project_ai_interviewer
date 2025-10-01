// src/app/(candidate)/setup/[token]/layout.tsx
import ProgressBar from "./ProgressBar";

export default function SetupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">Interview Setup</h1>
            <ProgressBar />
            {children}
        </div>
    );
}
