import Link from 'next/link';
import { Button}  from '@/components/UI/Button';

export default function Complete({ token }: { token: string }) {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-semibold text-green-600">Setup Complete!</h2>
            <p className="text-gray-600">
                You are all set. You can now proceed to your interview. Good luck!
            </p>

            <div className="mt-6">
                <Link href={`/interview/${token}`}>
                    <Button size="lg">Go to Interview</Button>
                </Link>
            </div>
        </div>
    );
}