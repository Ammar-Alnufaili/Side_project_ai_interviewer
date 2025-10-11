// 🧩 Step 3 — steps/QuestionBank.jsx

"use client";
import React, { useState, useEffect } from 'react';
import { useInterviewContext } from '../InterviewContext';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/Select";
import { X as XIcon } from 'lucide-react';

const DEFAULT_QUESTIONS = [
    { text: 'Tell me about yourself and your background.', category: 'Behavioral', difficulty: 1 },
    { text: 'Describe a challenging project you’ve worked on recently.', category: 'Technical', difficulty: 3 },
    { text: 'How do you handle working under pressure?', category: 'Behavioral', difficulty: 3 },
    { text: 'What are your strengths and areas for improvement?', category: 'Behavioral', difficulty: 2 },
];
const CATEGORIES = ['Behavioral', 'Technical', 'Situational', 'Brain Teaser'];

export default function QuestionBank({ next, back }) {
    const { state, dispatch } = useInterviewContext();
    const [questions, setQuestions] = useState(state.questions || DEFAULT_QUESTIONS);

    // Local state for the 'Add Question' form
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionCategory, setNewQuestionCategory] = useState(CATEGORIES[0]);
    const [newQuestionDifficulty, setNewQuestionDifficulty] = useState(3);

    useEffect(() => {
        if (!state.questions) {
            dispatch({ type: 'UPDATE_FIELD', payload: { questions: DEFAULT_QUESTIONS } });
        }
    }, [dispatch, state.questions]);

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (newQuestionText.trim()) {
            const newQuestion = {
                text: newQuestionText.trim(),
                category: newQuestionCategory,
                difficulty: Number(newQuestionDifficulty),
            };
            setQuestions([...questions, newQuestion]);
            // Reset form
            setNewQuestionText('');
            setNewQuestionCategory(CATEGORIES[0]);
            setNewQuestionDifficulty(3);
        }
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        dispatch({ type: 'UPDATE_FIELD', payload: { questions } });
        next();
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-1">Question Bank</h2>
            <p className="text-sm text-gray-500 mb-4">Manage the questions that will be asked during interviews.</p>

            <form onSubmit={handleAddQuestion} className="border p-4 rounded-lg bg-gray-50 mb-6 space-y-3">
                <h3 className="font-semibold">Add Custom Question</h3>
                <Input
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Enter your question..."
                />
                <div className="flex items-center gap-4">
                    <Select value={newQuestionCategory} onValueChange={setNewQuestionCategory}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Difficulty:</label>
                        <Input
                            type="number"
                            value={newQuestionDifficulty}
                            onChange={(e) => setNewQuestionDifficulty(e.target.value)}
                            min="1" max="5" className="w-20"
                        />
                    </div>
                    <Button type="submit" disabled={!newQuestionText.trim()}>Add</Button>
                </div>
            </form>

            <h3 className="font-semibold mb-2">Question Bank ({questions.length} questions)</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {questions.map((q, i) => (
                    <div key={i} className="flex items-start justify-between p-3 border rounded-lg">
                        <div>
                            <p className="mb-2">{q.text}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">{q.category}</span>
                                <span className="text-xs text-gray-500">Difficulty: {q.difficulty}/5</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(i)} aria-label="Remove question">
                            <XIcon className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <Button onClick={back} variant="outline">Back</Button>
                <Button onClick={handleNext} disabled={questions.length === 0} className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300">
                    Next
                </Button>
            </div>
        </div>
    );
}