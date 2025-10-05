"use client";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useState } from "react";

// Define a type for the form data
type FormData = {
    name: string;
    email: string;
    phone: string;
};

// Reusable form field component
const FormField = ({ id, label, required, ...props }: any) => (
    <div className="space-y-2">
        <label htmlFor={id} className="font-medium text-gray-800">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Input id={id} {...props} />
    </div>
);

// `onNext` now accepts the form data
export default function Step2({ onNext }: { onNext: (data: FormData) => void }) {
    // Use a single state object for the form
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(formData);
    };

    const isFormValid = formData.name && formData.email;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-gray-600">
                Please provide your contact information for our records.
            </p>

            {/* Use a proper form element for better accessibility */}
            <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                <FormField
                    id="name"
                    name="name"
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <FormField
                    id="email"
                    name="email"
                    label="Email Address"
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormField
                    id="phone"
                    name="phone"
                    label="Phone Number (Optional)"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <div className="text-right pt-4">
                    <Button type="submit" disabled={!isFormValid}>
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
}