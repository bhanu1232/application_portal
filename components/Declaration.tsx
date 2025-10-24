import React from 'react';
import { DeclarationData } from '../types';
import { FormSection } from './FormSection';

interface DeclarationProps {
    data: DeclarationData;
    onChange: (section: 'declaration', field: string, value: boolean) => void;
    errors: Record<string, string>;
}

export const Declaration: React.FC<DeclarationProps> = ({ data, onChange, errors }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange('declaration', 'agreed', e.target.checked);
    };

    return (
        <FormSection title="Declaration">
            <div className="md:col-span-3 space-y-4 text-sm text-gray-600">
                <p>
                    I hereby declare that all the entries in this application form are true to the best of my knowledge and belief.
                    If anything is found false at any stage, my application may be cancelled without assigning any reason thereof. I have
                    not suppressed any information. I shall abide by the rules and regulations of the University.
                </p>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="agreed"
                            name="agreed"
                            type="checkbox"
                            checked={data.agreed}
                            onChange={handleChange}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="agreed" className="font-medium text-gray-700">
                            I Agree <span className="text-red-500">*</span>
                        </label>
                         {errors.agreed && <p className="mt-1 text-sm text-red-600">{errors.agreed}</p>}
                    </div>
                </div>
            </div>
        </FormSection>
    );
};