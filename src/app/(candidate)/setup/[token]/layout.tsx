import React from 'react';

// You could import and use your ProgressBar component here.
// import ProgressBar from './ProgressBar';

export default function SetupTokenLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
                {/* <ProgressBar currentStep={...} totalSteps={3} /> */}
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Candidate Setup
                </h1>
                <main>{children}</main>
            </div>
        </div>
    );
}