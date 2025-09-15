// src/app/(public)/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Bot,
    BarChart3,
    FileText,
    Star,
    Code,
    Briefcase,
    BarChart,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

// --- Data Abstraction ---
const LANDING_PAGE_DATA = {
    features: [
        {
            icon: <Bot className="h-8 w-8 text-blue-500" />,
            title: "AI Interviewer",
            description:
                "Intelligent AI conducts interviews with natural conversation and relevant follow-ups.",
            imageSrc: "/robot1.png",
            imageAlt: "An illustration of a friendly robot, representing the AI interviewer.",
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
            title: "Smart Scoring",
            description:
                "Weighted criteria and evidence-backed scores provide objective, data-driven insights.",
            imageSrc: "/scoring1.png",
            imageAlt: "An illustration of charts and graphs, representing smart scoring.",
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-500" />,
            title: "Detailed Reports",
            description:
                "Get comprehensive reports outlining candidate strengths, potential risks, and clear recommendations.",
            imageSrc: "/report1.png",
            imageAlt: "An illustration of a document with analytics, representing detailed reports.",
        },
    ],
    steps: [
        {
            number: "1",
            title: "Create a Job",
            description: "Define the role and set your custom scoring rubric in minutes.",
        },
        {
            number: "2",
            title: "Invite Candidates",
            description: "Share a unique link and let our AI handle screening 24/7.",
        },
        {
            number: "3",
            title: "Review & Hire",
            description:
                "Analyze detailed reports and hire the best talent with confidence.",
        },
    ],
    logos: [
        { name: "TechCorp", icon: <Briefcase className="h-8 w-8" /> },
        { name: "Innovate Inc.", icon: <Code className="h-8 w-8" /> },
        { name: "Quantum Solutions", icon: <BarChart className="h-8 w-8" /> },
        { name: "Future Systems", icon: <Bot className="h-8 w-8" /> },
        { name: "Data Driven Co.", icon: <BarChart3 className="h-8 w-8" /> },
    ],
};

// --- Reusable & Section Components ---
const Section = ({
                     children,
                     className = "",
                     ...props
                 }: React.ComponentProps<"section">) => (
    <section className={`py-20 md:py-28 ${className}`} {...props}>
        {children}
    </section>
);

const SectionHeader = ({
                           title,
                           description,
                       }: {
    title: React.ReactNode;
    description: string;
}) => (
    <div className="text-center mb-12 md:mb-16">
        <h2
            id={
                typeof title === "string"
                    ? title.toLowerCase().replace(/\s+/g, "-")
                    : undefined
            }
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
        >
            {title}
        </h2>
        <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">{description}</p>
    </div>
);

const FeatureCard = ({
                         icon,
                         title,
                         description,
                         imageSrc,
                         imageAlt,
                         animationDelay = 0,
                     }: typeof LANDING_PAGE_DATA.features[0] & { animationDelay?: number }) => (
    <div
        className="relative p-[1px] overflow-hidden rounded-2xl group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up bg-slate-100/50"
        style={{ animationDelay: `${animationDelay}ms` }}
    >
        <div className="rounded-2xl h-full bg-white transition-all duration-300">
            <div className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-slate-200/50 transition-colors duration-300">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />
            </div>
            <div className="p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                <p className="mt-2 text-slate-600">{description}</p>
            </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
);

const StepCard = ({
                      number,
                      title,
                      description,
                      animationDelay = 0,
                  }: typeof LANDING_PAGE_DATA.steps[0] & { animationDelay?: number }) => (
    <div
        className="flex flex-col items-center text-center animate-fade-in-up"
        style={{ animationDelay: `${animationDelay}ms` }}
    >
        <div className="flex items-center justify-center text-blue-600 font-bold h-12 w-12 rounded-full border-2 border-blue-600 bg-white mb-4 text-xl">
            {number}
        </div>
        <h3 className="font-bold text-xl text-slate-900">{title}</h3>
        <p className="text-slate-600 mt-2">{description}</p>
    </div>
);

// --- Page Sections ---
const HeroSection = () => (
    <Section className="text-center pt-16 pb-20 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900">
            Find Your Next Hire with <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        InterviewAI
      </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Revolutionize your hiring with AI-driven interviews. Get objective
            scoring, custom rubrics, and detailed reports to find the perfect
            candidate—faster.
        </p>
        <HeroActions />
        <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="relative mx-auto max-w-5xl rounded-xl border bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-sm overflow-hidden p-2">
                <video
                    className="w-full h-auto rounded-lg object-cover"
                    src="/Lottie_Character_homepage.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="absolute top-2 left-4 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
            </div>
        </div>
    </Section>
);

const FeaturesSection = () => (
    <Section aria-labelledby="features-title" className="bg-slate-50 rounded-2xl">
        <SectionHeader
            title={
                <>
                    A <span className="text-blue-600">Smarter</span> Way to Hire
                </>
            }
            description="Our core features are designed to save you time, eliminate bias, and improve the quality of your hires."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANDING_PAGE_DATA.features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} animationDelay={index * 150} />
            ))}
        </div>
    </Section>
);

const HowItWorksSection = () => (
    <Section aria-labelledby="how-it-works-title">
        <SectionHeader
            title="Get Started in 3 Easy Steps"
            description="Launch your first AI-powered interview campaign in minutes."
        />
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute hidden md:block top-6 left-0 w-full h-0.5 bg-slate-200" />
            <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
                {LANDING_PAGE_DATA.steps.map((step, index) => (
                    <StepCard key={step.title} {...step} animationDelay={index * 150} />
                ))}
            </div>
        </div>
    </Section>
);

export function FinalCtaSection() {
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();

    const goCreateJob = () => {
        if (!isSignedIn) {
            return openSignIn({
                afterSignInUrl: "/dashboard",
                afterSignUpUrl: "/dashboard",
            });
        }
        router.push("/dashboard");
    };

    return (
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-12 md:p-16 text-center overflow-hidden animate-fade-in-up">
            <div className="relative">
                <h2 className="text-4xl font-bold mb-4">
                    Ready to Transform Your Hiring?
                </h2>
                <p className="text-slate-300 max-w-xl mx-auto mb-8">
                    Stop sorting through resumes. Start having meaningful, data-backed
                    conversations that lead to better hires.
                </p>
                <button
                    onClick={goCreateJob}
                    className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-slate-900 hover:bg-slate-200 transition-colors shadow-lg"
                >
                    Create Your First Job Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                </button>
            </div>
        </section>
    );
}

// --- Main Page Component ---
export default function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="absolute -z-20 top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl opacity-50" />
            </div>
            <main className="container mx-auto px-4 py-8 md:py-12">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <FinalCtaSection />
            </main>
        </>
    );
}

// --- Hero Actions with Clerk check ---
export function HeroActions() {
    const router = useRouter();
    const { isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();

    const goEmployer = () => {
        if (!isSignedIn) {
            return openSignIn({
                afterSignInUrl: "/dashboard",
                afterSignUpUrl: "/dashboard",
            });
        }

        // Check role
        const role = user?.publicMetadata?.role;
        if (role !== "employer") {
            return router.push("/interviews/join");
        }

        router.push("/dashboard");
    };

    const goApplicant = () => {
        router.push("/interviews/join");
    };

    const primaryButtonText = isSignedIn ? "Go to Dashboard" : "Start Hiring Free";

    return (
        <div className="flex flex-col sm:flex-row items-start justify-center gap-4 pt-8">
            <div className="flex flex-col items-center w-full sm:w-auto">
                <button
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                    onClick={goEmployer}
                >
                    {primaryButtonText}
                    <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                <p className="text-xs text-slate-500 mt-2">
                    For Employers & Hiring Managers
                </p>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
                <button
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border bg-white px-6 py-3 text-base font-medium hover:bg-slate-100 transition-colors shadow-sm"
                    onClick={goApplicant}
                >
                    Join an Interview
                </button>
                <p className="text-xs text-slate-500 mt-2">For Applicants</p>
            </div>
        </div>
    );
}
