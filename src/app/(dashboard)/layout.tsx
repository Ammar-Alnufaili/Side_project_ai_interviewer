// src/app/(dashboard)/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/auth/sign-in");
    }

    return (
        <div style={{ minHeight: "100vh", padding: "2rem" }}>
            {children}
        </div>
    );
}
