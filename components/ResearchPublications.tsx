
import React from 'react';
import { ResearchPublicationsData, Book, ConferencePaper, Publication } from '../types';
import { FormSection } from './FormSection';
import { InputField } from './InputField';
// FIX: Import the Column type for explicit type annotation.
import { DynamicTable, Column } from './DynamicTable';

interface ResearchPublicationsProps {
    data: ResearchPublicationsData;
    onChange: (data: ResearchPublicationsData) => void;
}

export const ResearchPublications: React.FC<ResearchPublicationsProps> = ({ data, onChange }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleFellowshipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentFellowships = data.fellowships;
        const newFellowships = checked
            ? [...currentFellowships, value as 'International' | 'State/University']
            : currentFellowships.filter(f => f !== value);
        onChange({ ...data, fellowships: newFellowships });
    };

    // Generic Add/Remove/Change handlers for dynamic tables
    const handleAdd = <T,>(listName: keyof ResearchPublicationsData, newItem: T) => {
        const list = data[listName] as any[];
        onChange({ ...data, [listName]: [...list, newItem] });
    };

    const handleRemove = (listName: keyof ResearchPublicationsData, index: number) => {
        const list = data[listName] as any[];
        onChange({ ...data, [listName]: list.filter((_, i) => i !== index) });
    };

    const handleChangeInList = (listName: keyof ResearchPublicationsData, index: number, field: string, value: string) => {
        const list = data[listName] as any[];
        onChange({
            ...data,
            [listName]: list.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        });
    };

    // FIX: Add explicit Column[] type to fix type inference issue.
    const bookColumns: Column[] = [
        { header: 'Title of the Book', accessor: 'title'},
        { header: 'Year of Publish', accessor: 'year'},
        { header: 'Indian / Foreign', accessor: 'type', type: 'select', options: ['Indian', 'Foreign']},
        { header: 'ISSN / ISBN', accessor: 'issn'},
        { header: 'Impact Factor', accessor: 'impactFactor'},
    ];
    
    // FIX: Add explicit Column[] type to fix type inference issue.
    const conferenceColumns: Column[] = [
        { header: 'Title of the Paper', accessor: 'title'},
        { header: 'Title of Conference / Seminar', accessor: 'conference'},
        { header: 'Organized by', accessor: 'organizer'},
        { header: 'Year', accessor: 'year'},
        { header: 'Indian / Foreign', accessor: 'type', type: 'select', options: ['Indian', 'Foreign']},
    ];

    // FIX: Add explicit Column[] type to fix type inference issue.
    const publicationColumns: Column[] = [
        { header: 'Name of the Publication', accessor: 'name'},
        { header: 'Year of Published', accessor: 'year'},
        { header: 'Indian / Foreign', accessor: 'type', type: 'select', options: ['Indian', 'Foreign']},
        { header: 'UGC approved with Sl.No.', accessor: 'ugcSlNo'},
        { header: 'ISSN / ISBN', accessor: 'issn'},
        { header: 'Impact Factor', accessor: 'impactFactor'},
    ];

    return (
        <FormSection title="Research, Publications & Awards">
            <InputField label="20a. Research Papers Published" id="researchPapers" type="select" value={data.researchPapers} onChange={handleChange}>
                <option value="">Select Journal Type</option>
                <option value="Refereed Journal">Refereed Journal</option>
                <option value="Reputed Journal">Reputed Journal</option>
            </InputField>
            <InputField label="20b. Awards Received" id="awardsReceived" type="textarea" value={data.awardsReceived} onChange={handleChange} className="md:col-span-2" />
            
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">20c. Fellowships/Awards</label>
                <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center">
                            <input id="international" value="International" type="checkbox" checked={data.fellowships.includes('International')} onChange={handleFellowshipChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="international" className="ml-3 block text-sm font-medium text-gray-700">International</label>
                        </div>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-center">
                            <input id="state_university" value="State/University" type="checkbox" checked={data.fellowships.includes('State/University')} onChange={handleFellowshipChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="state_university" className="ml-3 block text-sm font-medium text-gray-700">State/University</label>
                        </div>
                    </div>
                </div>
            </div>

            <InputField label="20d. Subject Books" id="subjectBooks" type="select" value={data.subjectBooks} onChange={handleChange}>
                <option value="">Select Level</option>
                <option value="State">State</option>
                <option value="National">National</option>
            </InputField>

            <InputField label="20e. Chapters in Books" id="chaptersInBooks" type="select" value={data.chaptersInBooks} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Indian">Indian</option>
                <option value="Foreign">Foreign</option>
            </InputField>

            <DynamicTable title="20f. Books Published" data={data.books} columns={bookColumns}
                onAdd={() => handleAdd<Book>('books', { id: Date.now(), title: '', year: '', type: '', issn: '', impactFactor: '' })}
                onRemove={(index) => handleRemove('books', index)}
                onChange={(index, field, value) => handleChangeInList('books', index, field, value)} />
            
            <DynamicTable title="20g. Papers Presented in Conferences" data={data.conferencePapers} columns={conferenceColumns}
                onAdd={() => handleAdd<ConferencePaper>('conferencePapers', { id: Date.now(), title: '', conference: '', organizer: '', year: '', type: '' })}
                onRemove={(index) => handleRemove('conferencePapers', index)}
                onChange={(index, field, value) => handleChangeInList('conferencePapers', index, field, value)} />
            
             <DynamicTable title="20h. Publications (UGC Recognized)" data={data.publications} columns={publicationColumns}
                onAdd={() => handleAdd<Publication>('publications', { id: Date.now(), name: '', year: '', type: '', ugcSlNo: '', issn: '', impactFactor: '' })}
                onRemove={(index) => handleRemove('publications', index)}
                onChange={(index, field, value) => handleChangeInList('publications', index, field, value)} />

        </FormSection>
    );
};
