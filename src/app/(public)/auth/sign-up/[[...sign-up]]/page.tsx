import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="mx-auto max-w-md p-6 py-16">
            <SignUp />
        </div>
    );
}
