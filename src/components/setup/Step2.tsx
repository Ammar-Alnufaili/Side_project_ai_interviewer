import Link from 'next/link';
import  { Button }  from '@/components/UI/Button';

export default function Step2({ token }: { token: string }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Step 2: Technical Setup</h2>
            <p className="text-gray-600">
                Let's test your microphone and camera.
            </p>

            {/* Add your camera/mic check logic here */}
            <div className="my-4 h-32 w-full rounded bg-gray-200 text-center leading-[8rem]">
                [Camera/Mic Component Placeholder]
            </div>

            <div className="mt-6 flex justify-between">
                <Link href={`/setup/${token}?step=1`}>
                    <Button variant="outline">Previous Step</Button>
                </Link>
                <Link href={`/setup/${token}?step=3`}>
                    <Button>Next Step</Button>
                </Link>
            </div>
        </div>
    );
}