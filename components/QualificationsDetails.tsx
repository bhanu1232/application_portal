
import React from 'react';
import { QualificationsData, AcademicRecord } from '../types';
import { FormSection } from './FormSection';
import { InputField } from './InputField';
import { DynamicTable } from './DynamicTable';

interface QualificationsProps {
    qualificationsData: QualificationsData;
    academicCareerData: AcademicRecord[];
    onQualificationsChange: (section: 'qualifications', field: string, value: any) => void;
    onAcademicCareerChange: (data: AcademicRecord[]) => void;
}

export const QualificationsDetails: React.FC<QualificationsProps> = ({ 
    qualificationsData, 
    academicCareerData, 
    onQualificationsChange, 
    onAcademicCareerChange 
}) => {
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        onQualificationsChange('qualifications', name, checked);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onQualificationsChange('qualifications', name, value);
    };

    // Academic Career Handlers
    const handleAddAcademicRecord = () => {
        const newRecord: AcademicRecord = {
            id: Date.now(),
            course: '',
            subject: '',
            year: '',
            marks: '',
            division: '',
            university: '',
        };
        onAcademicCareerChange([...academicCareerData, newRecord]);
    };

    const handleRemoveAcademicRecord = (index: number) => {
        onAcademicCareerChange(academicCareerData.filter((_, i) => i !== index));
    };

    const handleChangeAcademicRecord = (index: number, field: string, value: string) => {
        onAcademicCareerChange(academicCareerData.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const academicColumns = [
        { header: 'Course Name', accessor: 'course', width: '20%' },
        { header: 'Subject Name', accessor: 'subject', width: '20%' },
        { header: 'Year of Passing', accessor: 'year', width: '10%' },
        { header: '% of Marks', accessor: 'marks', width: '10%' },
        { header: 'Division', accessor: 'division', width: '10%' },
        { header: 'Name of University / Board', accessor: 'university', width: '30%' },
    ];

    return (
        <FormSection title="Qualifications & Academic Career">
            <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">19a. Qualifications</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card for NET */}
                    <div className="p-4 border rounded-lg bg-gray-50 transition-all duration-200">
                        <div className="flex items-center">
                            <input id="net" name="net" type="checkbox" checked={qualificationsData.net} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="net" className="ml-3 block text-sm font-medium text-gray-700">NET</label>
                        </div>
                        {qualificationsData.net && (
                            <div className="mt-2">
                                <input type="text" name="netYear" value={qualificationsData.netYear} onChange={handleInputChange} placeholder="Year" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                            </div>
                        )}
                    </div>
                    {/* Card for SLET */}
                    <div className="p-4 border rounded-lg bg-gray-50 transition-all duration-200">
                        <div className="flex items-center">
                            <input id="slet" name="slet" type="checkbox" checked={qualificationsData.slet} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="slet" className="ml-3 block text-sm font-medium text-gray-700">SLET</label>
                        </div>
                        {qualificationsData.slet && (
                             <div className="mt-2">
                                <input type="text" name="sletYear" value={qualificationsData.sletYear} onChange={handleInputChange} placeholder="Year" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                            </div>
                        )}
                    </div>
                    {/* Card for APSET */}
                    <div className="p-4 border rounded-lg bg-gray-50 transition-all duration-200">
                        <div className="flex items-center">
                            <input id="apset" name="apset" type="checkbox" checked={qualificationsData.apset} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="apset" className="ml-3 block text-sm font-medium text-gray-700">APSET</label>
                        </div>
                        {qualificationsData.apset && (
                            <div className="mt-2">
                                <input type="text" name="apsetYear" value={qualificationsData.apsetYear} onChange={handleInputChange} placeholder="Year" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                            </div>
                        )}
                    </div>
                     {/* Card for Other */}
                    <div className="p-4 border rounded-lg bg-gray-50 transition-all duration-200">
                        <div className="flex items-center">
                            <input id="other" name="other" type="checkbox" checked={qualificationsData.other} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">Other</label>
                        </div>
                        {qualificationsData.other && (
                            <div className="mt-2">
                                <input type="text" name="otherText" value={qualificationsData.otherText} onChange={handleInputChange} placeholder="Specify" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <InputField label="19b. Date of Award of Ph.D." id="phdAwardDate" type="date" value={qualificationsData.phdAwardDate} onChange={handleInputChange} />
            <InputField label="19c. Specify Area of Research" id="researchArea" value={qualificationsData.researchArea} onChange={handleInputChange} />
            <InputField label="19d. Post Doctoral Experience" id="postDocExperience" value={qualificationsData.postDocExperience} onChange={handleInputChange} />
            <InputField label="19e. Date of Passing M.Phil. Degree" id="mphilDate" type="date" value={qualificationsData.mphilDate} onChange={handleInputChange} />
        
            <div className="md:col-span-3 mt-8">
                <DynamicTable
                    title="19f. Academic Records"
                    data={academicCareerData}
                    columns={academicColumns}
                    onAdd={handleAddAcademicRecord}
                    onRemove={handleRemoveAcademicRecord}
                    onChange={handleChangeAcademicRecord}
                />
            </div>
        </FormSection>
    );
};
