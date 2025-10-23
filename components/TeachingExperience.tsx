
import React from 'react';
import { TeachingExperienceRecord } from '../types';
import { FormSection } from './FormSection';
// FIX: Import the Column type for explicit type annotation.
import { DynamicTable, Column } from './DynamicTable';

interface TeachingExperienceProps {
    data: TeachingExperienceRecord[];
    onChange: (data: TeachingExperienceRecord[]) => void;
}

export const TeachingExperience: React.FC<TeachingExperienceProps> = ({ data, onChange }) => {
    
    const handleAdd = () => {
        const newRecord: TeachingExperienceRecord = {
            id: Date.now(),
            university: '',
            designation: '',
            from: '',
            to: '',
        };
        onChange([...data, newRecord]);
    };

    const handleRemove = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: string, value: string) => {
        onChange(data.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    // FIX: Add explicit Column[] type to fix type inference issue.
    const columns: Column[] = [
        { header: 'Name of the University / College', accessor: 'university' },
        { header: 'Designation', accessor: 'designation' },
        { header: 'From', accessor: 'from', type: 'date' },
        { header: 'To', accessor: 'to', type: 'date' },
    ];

    return (
        <FormSection title="Teaching Experience">
            <DynamicTable
                title="21. Experience Details"
                data={data}
                columns={columns}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onChange={handleChange}
            />
        </FormSection>
    );
};