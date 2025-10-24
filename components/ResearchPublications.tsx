
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
            {/* Section 20: Research Papers */}
            <div className="md:col-span-3 p-6 border rounded-lg bg-gray-50/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">20. Research Papers Published</h3>
                <p className="text-base text-gray-600 mb-6">As notified by the UGC (Copies of the papers should be uploaded with application).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InputField label="No. of Refereed Journal Publications" id="refereedJournalCount" name="refereedJournalCount" type="number" value={data.refereedJournalCount} onChange={handleChange} className="md:col-span-1"/>
                    <InputField label="No. of Reputed Journal Publications" id="reputedJournalCount" name="reputedJournalCount" type="number" value={data.reputedJournalCount} onChange={handleChange} className="md:col-span-1"/>
                </div>
            </div>

            {/* Section 21: Publications, Fellowships & Other Awards - RESTRUCTURED */}
            <div className="md:col-span-3 p-6 border rounded-lg bg-gray-50/50 space-y-8">
                <h3 className="text-xl font-semibold text-gray-800">21. Publications, Fellowships & Other Awards</h3>

                 {/* Sub-section for Total Books */}
                 <div className="p-6 border rounded-lg bg-white">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Total Books Published</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InputField label="Indian" id="indianBookCount" name="indianBookCount" type="number" value={data.indianBookCount} onChange={handleChange} />
                        <InputField label="Foreign" id="foreignBookCount" name="foreignBookCount" type="number" value={data.foreignBookCount} onChange={handleChange} />
                    </div>
                </div>

                {/* Sub-section for Subject Books */}
                <div className="p-6 border rounded-lg bg-white">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">a) Subject Books Published</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InputField label="State Level" id="subjectBooksState" name="subjectBooksState" type="number" value={data.subjectBooksState} onChange={handleChange} />
                        <InputField label="National Level" id="subjectBooksNational" name="subjectBooksNational" type="number" value={data.subjectBooksNational} onChange={handleChange} />
                    </div>
                </div>

                {/* Sub-section for Chapters in Books */}
                <div className="p-6 border rounded-lg bg-white">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">b) Chapters in Books Published</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InputField label="Indian" id="chaptersInBooksIndian" name="chaptersInBooksIndian" type="number" value={data.chaptersInBooksIndian} onChange={handleChange} />
                        <InputField label="Foreign" id="chaptersInBooksForeign" name="chaptersInBooksForeign" type="number" value={data.chaptersInBooksForeign} onChange={handleChange} />
                    </div>
                </div>
                
                <DynamicTable title="Details of Books Published" data={data.books} columns={bookColumns}
                    onAdd={() => handleAdd<Book>('books', { id: Date.now(), title: '', year: '', type: '', issn: '', impactFactor: '' })}
                    onRemove={(index) => handleRemove('books', index)}
                    onChange={(index, field, value) => handleChangeInList('books', index, field, value)} />
                    
                {/* Sub-section for Fellowships and Other Awards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                    {/* Fellowships Card */}
                    <div className="p-6 border rounded-lg bg-white">
                        <h4 className="text-lg font-semibold text-gray-700">c) Fellowships</h4>
                        <p className="text-base text-gray-600 mt-1 mb-4">International award / Fellowship from Academic Bodies / Associations.</p>
                        <div className="space-y-4">
                            <InputField label="International Award" id="fellowshipInternational" name="fellowshipInternational" type="number" value={data.fellowshipInternational} onChange={handleChange} className="md:col-span-1" />
                            <InputField label="From Academic Bodies" id="fellowshipAcademic" name="fellowshipAcademic" type="number" value={data.fellowshipAcademic} onChange={handleChange} className="md:col-span-1"/>
                            <InputField label="From Associations" id="fellowshipAssociations" name="fellowshipAssociations" type="number" value={data.fellowshipAssociations} onChange={handleChange} className="md:col-span-1"/>
                        </div>
                    </div>

                    {/* Other Awards Card */}
                    <div className="p-6 border rounded-lg bg-white">
                        <h4 className="text-lg font-semibold text-gray-700">d) Other Awards</h4>
                        <p className="text-base text-gray-600 mt-1 mb-4">State / University Level award from Academic Bodies / Associations.</p>
                        <div className="space-y-4">
                            <InputField label="From Academic Bodies" id="awardStateUniversityAcademic" name="awardStateUniversityAcademic" type="number" value={data.awardStateUniversityAcademic} onChange={handleChange} className="md:col-span-1"/>
                            <InputField label="From Associations" id="awardStateUniversityAssociations" name="awardStateUniversityAssociations" type="number" value={data.awardStateUniversityAssociations} onChange={handleChange} className="md:col-span-1"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 22: Awards Received */}
            <div className="md:col-span-3 p-6 border rounded-lg bg-gray-50/50">
                 <InputField label="22. Awards Received" id="awardsReceived" name="awardsReceived" type="number" value={data.awardsReceived} onChange={handleChange} className="md:col-span-1" />
            </div>

            <div className="md:col-span-3">
              <DynamicTable title="23. Papers Presented in Conferences" data={data.conferencePapers} columns={conferenceColumns}
                  onAdd={() => handleAdd<ConferencePaper>('conferencePapers', { id: Date.now(), title: '', conference: '', organizer: '', year: '', type: '' })}
                  onRemove={(index) => handleRemove('conferencePapers', index)}
                  onChange={(index, field, value) => handleChangeInList('conferencePapers', index, field, value)} />
            </div>
            
            <div className="md:col-span-3">
              <DynamicTable title="24. Publications (UGC Recognized)" data={data.publications} columns={publicationColumns}
                  onAdd={() => handleAdd<Publication>('publications', { id: Date.now(), name: '', year: '', type: '', ugcSlNo: '', issn: '', impactFactor: '' })}
                  onRemove={(index) => handleRemove('publications', index)}
                  onChange={(index, field, value) => handleChangeInList('publications', index, field, value)} />
            </div>

        </FormSection>
    );
};
