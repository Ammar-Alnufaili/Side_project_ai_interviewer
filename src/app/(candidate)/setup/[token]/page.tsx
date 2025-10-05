'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect

// Make sure your path is correct
import Step1 from '@/components/setup/Step1';
import Step2 from '@/components/setup/Step2';
import Step3 from '@/components/setup/Step3';
import Complete from '@/components/setup/complete';

// Define the type for Job Details, you can move this to a types file
type JobDetails = {
    title: string;
    description: string;
    skills: string[];
    company: string;
};

// The 'params' prop is now a Promise
export default function SetupPage({ params }: { params: Promise<{ token: string }> }) {
    // Unwrap the promise using React.use()
    const resolvedParams = React.use(params);

    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    // --- START: NEW CODE TO FETCH JOB DATA ---
    const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This function simulates fetching job data from an API using the token.
        // Replace this with your actual API call.
        const fetchJobDetails = async (token: string) => {
            console.log("Fetching job details for token:", token);
            // Mock API call
            const mockData: JobDetails = {
                title: "Senior Frontend Developer",
                description: "Looking for an experienced React developer to join our team.",
                skills: ["React", "TypeScript", "Node.js", "AWS"],
                company: "TechCorp Inc."
            };
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setJobDetails(mockData);
            setLoading(false);
        };

        fetchJobDetails(resolvedParams.token);
    }, [resolvedParams.token]); // Re-run if the token changes

    // Show a loading message while fetching data
    if (loading) {
        return <div>Loading interview details...</div>;
    }
    // --- END: NEW CODE ---


    const renderStep = () => {
        switch (step) {
            case '2':
                return <Step2 onNext={(data) => console.log(data)} />;
            case '3':
                return <Step3 onNext={(data) => console.log(data)} />;
            case 'complete':
                // Assuming `Complete` is the new name for the component
                return <Complete onNext={(file) => console.log(file)} />;
            case '1':
            default:
                // Pass the fetched jobDetails to the Step1 component
                return <Step1 job={jobDetails!} onNext={() => console.log("Next from Step 1")} />;
        }
    };

    return <div>{renderStep()}</div>;
}