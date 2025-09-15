// src/app/(public)/page.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Imported here for the client component below
import { ArrowRight, Bot, BarChart3, FileText, Star } from "lucide-react";

// --- Client Component Definition ---
// By placing "use client" here, only this component and its children are client-rendered.
// This allows us to use hooks like useRouter() while the rest of the page remains a Server Component.


function HeroActions() {
    const router = useRouter();

    const goEmployer = () => router.push("/dashboard");
    const goApplicant = () => router.push("/interview/join");

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                onClick={goEmployer}
            >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            <button
                className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-neutral-100 transition-colors"
                onClick={goApplicant}
            >
                Join an Interview
            </button>
        </div>
    );
}

// --- END OF CLIENT COMPONENT ---
// The rest of this file is rendered on the server.

// --- Data Abstraction ---
const LANDING_PAGE_DATA = {
    features: [
        {
            icon: <Bot className="h-8 w-8 text-blue-600" />,
            title: "AI Interviewer",
            description: "Intelligent AI conducts interviews with natural conversation and relevant follow-ups.",
            imageSrc: "/robot1.png",
            imageAlt: "An illustration of a friendly robot, representing the AI interviewer."
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
            title: "Smart Scoring",
            description: "Weighted criteria and evidence-backed scores provide objective, data-driven insights.",
            imageSrc: "/scoring1.png",
            imageAlt: "An illustration of charts and graphs, representing smart scoring."
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            title: "Detailed Reports",
            description: "Get comprehensive reports outlining candidate strengths, potential risks, and clear recommendations.",
            imageSrc: "/report1.png",
            imageAlt: "An illustration of a document with analytics, representing detailed reports."
        },
    ],
    steps: [
        { number: "1", title: "Create a Job", description: "Define the role and set your custom scoring rubric in minutes." },
        { number: "2", title: "Invite Candidates", description: "Share a unique link and let our AI handle screening 24/7." },
        { number: "3", title: "Review & Hire", description: "Analyze detailed reports and hire the best talent with confidence." },
    ],
};

// --- Reusable & Section Components ---

const Section = ({ children, className, ...props }: React.ComponentProps<"section">) => (
    <section className={`py-24 ${className || ""}`} {...props}>
        {children}
    </section>
);

const SectionHeader = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center mb-12 animate-fade-in-up">
        <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className="text-4xl font-bold text-slate-900">
            {title}
        </h2>
        <p className="text-md text-slate-500 mt-2 max-w-2xl mx-auto">{description}</p>
    </div>
);

const FeatureCard = ({ icon, title, description, imageSrc, imageAlt, animationDelay = 0 }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    animationDelay?: number;
}) => (
    <div
        className="text-center overflow-hidden relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up border rounded-xl bg-white"
        style={{ animationDelay: `${animationDelay}ms` }}
    >
        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-slate-200/60 transition-colors duration-300">
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            />
        </div>
        <div className="p-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 mb-4 transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-slate-600">{description}</p>
        </div>
    </div>
);

const StepCard = ({ number, title, description, animationDelay = 0 }: {
    number: string;
    title: string;
    description: string;
    animationDelay?: number;
}) => (
    <div
        className="flex flex-col items-center text-center animate-fade-in-up"
        style={{ animationDelay: `${animationDelay}ms` }}
    >
        <div className="flex items-center justify-center text-blue-600 font-bold h-12 w-12 rounded-full border-2 border-blue-600 mb-4 text-xl">
            {number}
        </div>
        <h3 className="font-bold text-xl text-slate-900">{title}</h3>
        <p className="text-slate-600 mt-2">{description}</p>
    </div>
);

// --- Page Sections ---

const HeroSection = () => (
    <Section className="text-center pt-12 pb-24 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Find Your Next Hire with Interview<span className="text-blue-600">AI</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Revolutionize your hiring with AI-driven interviews. Get objective scoring, custom rubrics, and detailed reports to find the perfect candidate—faster.
        </p>
        <HeroActions /> {/* Using the client component defined at the top of the file */}
        <div className="pt-16 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="mx-auto max-w-5xl rounded-lg border bg-white shadow-lg overflow-hidden">
                <video
                    className="w-full h-auto object-cover"
                    src="/Lottie_Character_homepage.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>
        </div>
    </Section>
);

const FeaturesSection = () => (
    <Section aria-labelledby="a-smarter-way-to-hire">
        <SectionHeader
            title="A Smarter Way to Hire"
            description="Core features designed to save you time and improve quality."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LANDING_PAGE_DATA.features.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} animationDelay={index * 150} />
            ))}
        </div>
    </Section>
);

const HowItWorksSection = () => (
    <Section className="bg-slate-50 rounded-2xl animate-fade-in-up" aria-labelledby="get-started-in-3-easy-steps">
        <SectionHeader title="Get Started in 3 Easy Steps" description="" />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {LANDING_PAGE_DATA.steps.map((step, index) => (
                <StepCard key={step.title} {...step} animationDelay={index * 150} />
            ))}
        </div>
    </Section>
);

const TestimonialSection = () => (
    <Section className="text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
            <div
                className="flex justify-center text-yellow-400 mb-4"
                aria-label="5 out of 5 stars"
            >
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
            </div>
            <blockquote className="text-2xl italic text-slate-800">
                "InterviewAI has been a game-changer. We cut screening time by 70% and the quality of finalists has never been higher."
            </blockquote>
            <p className="mt-6 font-semibold text-slate-600">— Jane Doe, Head of Talent at TechCorp</p>
        </div>
    </Section>
);

const FinalCtaSection = () => (
    <Section className="bg-slate-900 text-white rounded-2xl p-16 text-center animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
        <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Stop sorting through resumes. Start having meaningful, data-backed conversations.
        </p>
        <Link
            href="/interviews/new"
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-200 transition-colors"
        >
            Create Your First Job Free
            <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
    </Section>
);

// --- Main Page Component ---
export default function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <main className="container mx-auto px-4 py-20">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialSection />
                <FinalCtaSection />
            </main>
        </>
    );
}