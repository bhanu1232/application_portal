
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
            <div className="md:col-span-3">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/2 pr-4">
                        <p className="text-sm font-medium text-gray-700">
                            20. Research Papers Published as notified by the UGC (Copies of the papers should be uploaded with application)
                        </p>
                    </div>
                    <div className="md:w-1/2 space-y-2 mt-2 md:mt-0">
                        <div className="flex items-center gap-4">
                            <label htmlFor="refereedJournalCount" className="w-32 shrink-0 text-sm font-medium text-gray-700">Refereed Journal</label>
                            <input 
                                type="number" 
                                id="refereedJournalCount"
                                name="refereedJournalCount"
                                value={data.refereedJournalCount}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                            />
                        </div>
                         <div className="flex items-center gap-4">
                            <label htmlFor="reputedJournalCount" className="w-32 shrink-0 text-sm font-medium text-gray-700">Reputed Journal</label>
                             <input 
                                type="number" 
                                id="reputedJournalCount"
                                name="reputedJournalCount"
                                value={data.reputedJournalCount}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center gap-4">
                    <label htmlFor="indianBookCount" className="text-sm font-medium text-gray-700">21. Books:</label>
                    <input type="number" name="indianBookCount" value={data.indianBookCount} onChange={handleChange} className="mt-1 w-20 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900" />
                    <span className="text-sm text-gray-700">Indian</span>
                    <input type="number" name="foreignBookCount" value={data.foreignBookCount} onChange={handleChange} className="mt-1 w-20 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900" />
                    <span className="text-sm text-gray-700">Foreign</span>
                </div>
            </div>

            <div className="md:col-span-3">
                <DynamicTable title="" data={data.books} columns={bookColumns}
                    onAdd={() => handleAdd<Book>('books', { id: Date.now(), title: '', year: '', type: '', issn: '', impactFactor: '' })}
                    onRemove={(index) => handleRemove('books', index)}
                    onChange={(index, field, value) => handleChangeInList('books', index, field, value)} />
            </div>
            
            <div className="md:col-span-3 mt-4 space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">a) Subject Books:</span>
                    <label htmlFor="subjectBooksState" className="text-sm font-medium text-gray-700">State</label>
                    <input 
                        type="number" 
                        name="subjectBooksState" 
                        id="subjectBooksState" 
                        value={data.subjectBooksState} 
                        onChange={handleChange} 
                        className="w-20 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-900" 
                    />
                    <label htmlFor="subjectBooksNational" className="text-sm font-medium text-gray-700">National</label>
                    <input 
                        type="number" 
                        name="subjectBooksNational" 
                        id="subjectBooksNational" 
                        value={data.subjectBooksNational} 
                        onChange={handleChange} 
                        className="w-20 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-900" 
                    />
                </div>
                 <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">b) Chapters in Books:</span>
                    <label htmlFor="chaptersInBooksIndian" className="text-sm font-medium text-gray-700">Indian</label>
                    <input 
                        type="number" 
                        name="chaptersInBooksIndian" 
                        id="chaptersInBooksIndian" 
                        value={data.chaptersInBooksIndian} 
                        onChange={handleChange} 
                        className="w-20 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-900" 
                    />
                    <label htmlFor="chaptersInBooksForeign" className="text-sm font-medium text-gray-700">Foreign</label>
                    <input 
                        type="number" 
                        name="chaptersInBooksForeign" 
                        id="chaptersInBooksForeign" 
                        value={data.chaptersInBooksForeign} 
                        onChange={handleChange} 
                        className="w-20 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-900" 
                    />
                </div>
                
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">c) Fellowships International award / Fellowship from Academic Bodies / Associations</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="fellowshipInternational" className="block text-xs font-medium text-gray-600">International Award</label>
                            <input type="number" name="fellowshipInternational" id="fellowshipInternational" value={data.fellowshipInternational} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm text-gray-900"/>
                        </div>
                        <div>
                            <label htmlFor="fellowshipAcademic" className="block text-xs font-medium text-gray-600">From Academic Bodies</label>
                            <input type="number" name="fellowshipAcademic" id="fellowshipAcademic" value={data.fellowshipAcademic} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm text-gray-900"/>
                        </div>
                        <div>
                            <label htmlFor="fellowshipAssociations" className="block text-xs font-medium text-gray-600">From Associations</label>
                            <input type="number" name="fellowshipAssociations" id="fellowshipAssociations" value={data.fellowshipAssociations} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm text-gray-900"/>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">d) State / University Level award from Academic Bodies / Associations</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="awardStateUniversityAcademic" className="block text-xs font-medium text-gray-600">From Academic Bodies</label>
                            <input type="number" name="awardStateUniversityAcademic" id="awardStateUniversityAcademic" value={data.awardStateUniversityAcademic} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm text-gray-900"/>
                        </div>
                        <div>
                            <label htmlFor="awardStateUniversityAssociations" className="block text-xs font-medium text-gray-600">From Associations</label>
                            <input type="number" name="awardStateUniversityAssociations" id="awardStateUniversityAssociations" value={data.awardStateUniversityAssociations} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm text-gray-900"/>
                        </div>
                    </div>
                </div>
            </div>
            
            <InputField label="22. Awards received" id="awardsReceived" type="number" value={data.awardsReceived} onChange={handleChange} className="md:col-span-3"/>

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
