
import React from 'react';

interface FormSectionProps {
    title: string;
    children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-6">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </div>
    );
};
