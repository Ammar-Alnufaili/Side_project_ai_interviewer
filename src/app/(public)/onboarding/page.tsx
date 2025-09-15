"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function Onboarding() {
    const { user, isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    const params = useSearchParams();
    const initialIntent = params.get("intent") as "employer" | "applicant" | null;

    async function choose(role: "employer" | "applicant") {
        if (!user) return;
        try {
            await user.update({ publicMetadata: { role } });
            if (role === "employer") router.replace("/dashboard");
            else router.replace("/interview/join");
        } catch (e) {
            console.error(e);
            alert("Could not save role. Please try again.");
        }
    }

    if (!isLoaded) return null;
    if (!isSignedIn) return <div className="p-6">Please sign in.</div>;

    return (
        <section className="mx-auto max-w-lg p-6 py-16 space-y-6">
            <h1 className="text-2xl font-semibold">Tell us who you are</h1>
            <p className="text-sm text-neutral-600">
                Pick a profile so we can route you to the right experience.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
                <button
                    onClick={() => choose("employer")}
                    className={`rounded-xl border p-5 text-left hover:bg-neutral-50 ${
                        initialIntent === "employer" ? "ring-2 ring-blue-600" : ""
                    }`}
                >
                    <div className="font-medium">Employer / Recruiter</div>
                    <div className="text-sm text-neutral-600">Create interviews & view results.</div>
                </button>

                <button
                    onClick={() => choose("applicant")}
                    className={`rounded-xl border p-5 text-left hover:bg-neutral-50 ${
                        initialIntent === "applicant" ? "ring-2 ring-blue-600" : ""
                    }`}
                >
                    <div className="font-medium">Applicant / Candidate</div>
                    <div className="text-sm text-neutral-600">Join your scheduled interview.</div>
                </button>
            </div>
        </section>
    );
}
