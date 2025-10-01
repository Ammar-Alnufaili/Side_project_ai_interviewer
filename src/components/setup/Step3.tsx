import Link from 'next/link';
import  {Button}  from '@/components/UI/Button';

export default function Step3({ token }: { token: string }) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Step 3: Final Confirmation</h2>
            <p className="text-gray-600">
                Please review the terms and conditions before proceeding to the interview.
            </p>

            <div className="mt-4 flex items-center">
                <input id="terms" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the terms and conditions.
                </label>
            </div>

            <div className="mt-6 flex justify-between">
                <Link href={`/setup/${token}?step=2`}>
                    <Button variant="outline">Previous Step</Button>
                </Link>
                <Link href={`/setup/${token}?step=complete`}>
                    <Button>Finish Setup</Button>
                </Link>
            </div>
        </div>
    );
}