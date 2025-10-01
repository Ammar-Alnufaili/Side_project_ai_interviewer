'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react'; // <--- 1. Make sure React is imported

// Make sure your path is correct after renaming the folder
import Step1 from '@/components/setup/Step1';
import Step2 from '@/components/setup/Step2';
import Step3 from '@/components/setup/Step3';
import Complete from '@/components/setup/complete';

// The 'params' prop is now a Promise
export default function SetupPage({ params }: { params: Promise<{ token: string }> }) {
    // 2. Unwrap the promise using React.use()
    const resolvedParams = React.use(params);

    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    const renderStep = () => {
        switch (step) {
            case '2':
                // 3. Use the unwrapped 'resolvedParams' object
                return <Step2 token={resolvedParams.token} />;
            case '3':
                return <Step3 token={resolvedParams.token} />;
            case 'complete':
                return <Complete token={resolvedParams.token} />;
            case '1':
            default:
                // Default to step 1 if the param is missing or invalid
                return <Step1 token={resolvedParams.token} />;
        }
    };

    return <div>{renderStep()}</div>;
}