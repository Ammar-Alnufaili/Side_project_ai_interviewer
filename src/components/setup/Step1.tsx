import Link from 'next/link';
import  { Button }  from '@/components/UI/Button'; // Assuming you have a Button component
import  { Input }  from '@/components/UI/Input';   // Assuming you have an Input component

export default function Step1({ token }: { token: string }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Step 1: Personal Information</h2>
            <p className="text-gray-600">
                Please confirm your details to begin the setup process.
            </p>

            <form className="mt-4 flex flex-col gap-4">
                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
            </form>

            <div className="mt-6 flex justify-end">
                <Link href={`/setup/${token}?step=2`}>
                    <Button>Next Step</Button>
                </Link>
            </div>
        </div>
    );
}