"use client";

import { Button } from "@/components/UI/Button";
import { Upload, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";
import clsx from "clsx";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Renamed to PascalCase `Complete` and `onNext` accepts the file
export default function Complete({ onNext }: { onNext: (file: File) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setError(null); // Reset error on new file selection

        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Validation
        if (selectedFile.type !== "application/pdf") {
            setError("Invalid file type. Please upload a PDF.");
            return;
        }
        if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
            setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        setFile(selectedFile);
    };

    const dropzoneClasses = clsx(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        { "border-gray-300 hover:border-blue-500": !error },
        { "border-red-500 bg-red-50": error }
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Upload Resume</h2>
            <p className="text-gray-600">
                To complete your setup, please upload your most recent resume.
            </p>

            <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold">Resume Upload</h3>
                <p className="text-sm text-gray-500">
                    Please upload a single PDF file (max {MAX_FILE_SIZE_MB}MB).
                </p>

                <div className={dropzoneClasses} onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    {file ? (
                        <div className="flex items-center justify-center gap-2 font-medium">
                            <FileText className="text-blue-600" />
                            <span className="text-gray-800">{file.name}</span>
                            <CheckCircle className="text-green-600" />
                        </div>
                    ) : (
                        <p className="text-gray-600">Click to upload resume</p>
                    )}
                </div>
                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{error}</span>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="text-right">
                <Button onClick={() => file && onNext(file)} disabled={!file || !!error}>
                    Start Interview
                </Button>
            </div>
        </div>
    );
}