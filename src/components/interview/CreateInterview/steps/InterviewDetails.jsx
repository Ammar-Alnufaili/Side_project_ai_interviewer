// 🪜 Step 1 — steps/JobDetails.jsx

"use client";
import React, { useState } from 'react';
import { useInterviewContext } from '../InterviewContext';
import { Input } from '@/components/UI/Input';
import { Textarea } from '@/components/UI/Textarea';
import { Button } from '@/components/UI/Button';
import { X as XIcon } from 'lucide-react';

// Enhanced: A reusable component for creating tag/pill inputs.
// This provides structured data (an array of strings) instead of free text.
const TagInput = ({ value = [], onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map((tag) => (
                    <div key={tag} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-2 text-blue-500 hover:text-blue-800">
                            <XIcon size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
};

export default function JobDetails({ next }) {
    const { state, dispatch } = useInterviewContext();
    const { jobTitle = '', jobDescription = '', skills = [], languages = [] } = state;

    const updateField = (payload) => {
        dispatch({ type: 'UPDATE_FIELD', payload });
    };

    // The 'Next' button is enabled only if the core information is present.
    const isFormValid = jobTitle.trim().length >= 5 && skills.length > 0;

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="job-title" className="block text-sm font-medium mb-1">Job Title *</label>
                <Input
                    id="job-title"
                    value={jobTitle}
                    onChange={(e) => updateField({ jobTitle: e.target.value })}
                    placeholder="e.g. Senior Frontend Developer"
                />
            </div>

            <div>
                <label htmlFor="job-description" className="block text-sm font-medium mb-1">Job Description</label>
                <Textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => updateField({ jobDescription: e.target.value })}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={5}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Required Skills *</label>
                <TagInput
                    value={skills}
                    onChange={(newSkills) => updateField({ skills: newSkills })}
                    placeholder="Add a skill and press Enter..."
                />
                <p className="text-xs text-gray-500 mt-1">AI will use these skills to suggest relevant questions.</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Languages</label>
                <TagInput
                    value={languages}
                    onChange={(newLanguages) => updateField({ languages: newLanguages })}
                    placeholder="Add a language and press Enter..."
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button
                    onClick={next}
                    disabled={!isFormValid}
                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}