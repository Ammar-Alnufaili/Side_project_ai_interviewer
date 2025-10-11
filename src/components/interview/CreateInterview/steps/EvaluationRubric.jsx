// 🧾 Step 2 — steps/EvaluationRubric.jsx

"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useInterviewContext } from '../InterviewContext';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Textarea } from '@/components/UI/Textarea'; // Assuming a simple textarea component exists
import { X as XIcon, Plus as PlusIcon } from 'lucide-react';

const DEFAULT_CRITERIA = [
    { label: 'Technical Skills', weight: 40, description: 'Depth of technical knowledge and problem-solving ability.' },
    { label: 'Communication', weight: 25, description: 'Clarity of expression, articulation, and listening skills.' },
    { label: 'Relevant Experience', weight: 25, description: 'Past experience directly relevant to the role.' },
    { label: 'Cultural Fit', weight: 10, description: 'Alignment with company values and team dynamics.' },
];

export default function EvaluationRubric({ next, back }) {
    const { state, dispatch } = useInterviewContext();
    const [rubricName, setRubricName] = useState(state.rubricName || '');
    const [criteria, setCriteria] = useState(state.criteria || DEFAULT_CRITERIA);

    const totalWeight = useMemo(() => criteria.reduce((sum, item) => sum + Number(item.weight || 0), 0), [criteria]);
    const isWeightValid = totalWeight === 100;

    useEffect(() => {
        // Sync with context on initial load
        if (!state.criteria) {
            dispatch({ type: 'UPDATE_FIELD', payload: { criteria: DEFAULT_CRITERIA } });
        }
    }, [dispatch, state.criteria]);

    const updateCriterion = (index, field, value) => {
        const updatedCriteria = [...criteria];
        // Ensure weight is treated as a number
        const finalValue = field === 'weight' ? parseInt(value, 10) || 0 : value;
        updatedCriteria[index] = { ...updatedCriteria[index], [field]: finalValue };
        setCriteria(updatedCriteria);
    };

    const addCriterion = () => {
        setCriteria([...criteria, { label: '', weight: 0, description: '' }]);
    };

    const removeCriterion = (index) => {
        setCriteria(criteria.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        // On 'Next', save the entire rubric state to the global context
        dispatch({ type: 'UPDATE_FIELD', payload: { rubricName, criteria } });
        next();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Evaluation Rubric</h2>
                <p className="text-sm text-gray-500">Define how candidates will be evaluated and scored.</p>
            </div>

            <div>
                <label htmlFor="rubric-name" className="block text-sm font-medium mb-1">Rubric Name</label>
                <Input
                    id="rubric-name"
                    value={rubricName}
                    onChange={(e) => setRubricName(e.target.value)}
                    placeholder="e.g. Frontend Developer Assessment"
                />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Evaluation Criteria</h3>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${isWeightValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Total Weight: {totalWeight}%
                    </div>
                </div>
                {criteria.map((item, index) => (
                    <div key={index} className="border p-4 rounded-lg bg-gray-50 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-4">
                                <label className="text-xs font-medium">Label</label>
                                <Input value={item.label} onChange={(e) => updateCriterion(index, 'label', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-medium">Weight (%)</label>
                                <Input type="number" value={item.weight} onChange={(e) => updateCriterion(index, 'weight', e.target.value)} />
                            </div>
                            <div className="md:col-span-5">
                                <label className="text-xs font-medium">Description</label>
                                <Textarea value={item.description} onChange={(e) => updateCriterion(index, 'description', e.target.value)} rows={1} />
                            </div>
                            <div className="md:col-span-1 flex items-end h-full">
                                <Button variant="ghost" size="icon" onClick={() => removeCriterion(index)} aria-label="Remove criterion">
                                    <XIcon className="h-5 w-5 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                <Button onClick={addCriterion} variant="outline" className="flex items-center gap-2">
                    <PlusIcon size={16} /> Add Criterion
                </Button>
            </div>

            <div className="flex justify-between mt-6">
                <Button onClick={back} variant="outline">Back</Button>
                <Button onClick={handleNext} disabled={!isWeightValid || criteria.some(c => !c.label.trim())} className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300">
                    Next
                </Button>
            </div>
        </div>
    );
}