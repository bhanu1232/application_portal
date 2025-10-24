
import React from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    error?: string;
    children?: React.ReactNode;
    className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text', value, onChange, required = false, error, children, className = 'md:col-span-1' }) => {
    const baseClasses = "mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900";
    const errorClasses = error ? 'border-red-500' : 'border-gray-300';
    
    const renderInput = () => {
        switch (type) {
            case 'select':
                return <select id={id} name={id} value={value} onChange={onChange} required={required} className={`${baseClasses} ${errorClasses}`}>{children}</select>;
            case 'textarea':
                return <textarea id={id} name={id} value={value} onChange={onChange} required={required} rows={3} className={`${baseClasses} ${errorClasses}`} />;
            default:
                return <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} className={`${baseClasses} ${errorClasses}`} />;
        }
    };

    return (
        <div className={className}>
            <label htmlFor={id} className={`block text-base font-medium text-gray-700`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {renderInput()}
            {error && <p className="mt-2 text-base text-red-600">{error}</p>}
        </div>
    );
};
