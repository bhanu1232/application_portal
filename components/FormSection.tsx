
import React from 'react';

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {children}
            </div>
        </div>
    );
};
