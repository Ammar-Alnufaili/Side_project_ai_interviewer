import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AfterAuth() {
    const user = await currentUser();
    if (!user) redirect("/auth/sign-in");

    const role = (user.publicMetadata?.role as "employer" | "applicant" | undefined) || undefined;

    if (!role) {
        // User has not chosen a role yet → onboarding
        redirect("/onboarding");
    }

    if (role === "employer") redirect("/dashboard");
    redirect("/interview/join");
}
