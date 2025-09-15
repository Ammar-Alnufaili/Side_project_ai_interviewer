import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { RQProvider } from "@/lib/react-query";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { userId } = await auth();
    if (!userId) redirect("/auth/sign-in");


    return (
        <RQProvider>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                    <Topbar />
                    <main className="mx-auto max-w-6xl p-6">{children}</main>
                </div>
            </div>
        </RQProvider>
    );
}
