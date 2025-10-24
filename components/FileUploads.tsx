import React from 'react';
import { FileUploadsData } from '../types';
import { FormSection } from './FormSection';

interface FileUploadsProps {
    data: FileUploadsData;
    onChange: (section: 'fileUploads', field: string, value: File[]) => void;
}

const FileInput: React.FC<{ label: string; name: string; files: File[]; onFileChange: (name: string, files: File[]) => void }> = ({ label, name, files, onFileChange }) => {
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFileChange(name, Array.from(e.target.files));
        }
    };

    return (
        <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input 
                type="file" 
                multiple 
                onChange={handleFileChange} 
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {files.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                    {files.map((file, index) => <li key={index}>{file.name}</li>)}
                </ul>
            )}
        </div>
    );
};

export const FileUploads: React.FC<FileUploadsProps> = ({ data, onChange }) => {
    
    const handleFileChange = (name: string, files: File[]) => {
        onChange('fileUploads', name, files);
    };

    return (
        <FormSection title="File Uploads">
            <FileInput 
                label="Attested Copies of Certificates" 
                name="certificates"
                files={data.certificates}
                onFileChange={handleFileChange}
            />
            <FileInput 
                label="Reprints of Research Publications" 
                name="publications"
                files={data.publications}
                onFileChange={handleFileChange}
            />
        </FormSection>
    );
};