
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { ApplicationData, initialFormData, AcademicRecord, ResearchPublicationsData, TeachingExperienceRecord } from './types';
import { saveApplication, uploadFile } from './services/supabaseService';
import { PersonalDetails } from './components/PersonalDetails';
import { QualificationsDetails } from './components/QualificationsDetails';
import { ResearchPublications } from './components/ResearchPublications';
import { TeachingExperience } from './components/TeachingExperience';
import { Declaration } from './components/Declaration';
import { Header } from './components/Header';

const App: React.FC = () => {
    const [formData, setFormData] = useState<ApplicationData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleFormChange = useCallback((section: keyof ApplicationData, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as object),
                [field]: value,
            },
        }));
    }, []);

    const handleAcademicCareerChange = useCallback((data: AcademicRecord[]) => {
        setFormData(prev => ({ ...prev, academicCareer: data }));
    }, []);
    
    const handleResearchPublicationsChange = useCallback((data: ResearchPublicationsData) => {
        setFormData(prev => ({ ...prev, researchPublications: data }));
    }, []);

    const handleTeachingExperienceChange = useCallback((data: TeachingExperienceRecord[]) => {
        setFormData(prev => ({ ...prev, teachingExperience: data }));
    }, []);
    
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.personalDetails.photo) newErrors.photo = 'Photo is required.';
        if (!formData.personalDetails.signature) newErrors.signature = 'Signature is required.';
        if (!formData.personalDetails.name) newErrors.name = 'Full name is required.';
        if (!formData.personalDetails.department) newErrors.department = 'Department is required.';
        if (!formData.personalDetails.dob) newErrors.dob = 'Date of birth is required.';
        if (!formData.personalDetails.fatherName) newErrors.fatherName = 'Father\'s name is required.';
        if (!formData.personalDetails.mobile) newErrors.mobile = 'Mobile number is required.';
        if (!formData.personalDetails.email) newErrors.email = 'Email ID is required.';
        if (!formData.declaration.agreed) newErrors.agreed = 'You must agree to the declaration.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        
        if (!validateForm()) {
            window.scrollTo(0,0);
            return;
        }

        setIsLoading(true);

        try {
            const submissionId = uuidv4();
            const dataToSave = JSON.parse(JSON.stringify(formData));

            const uploadTasks: Promise<void>[] = [];

            // Helper to upload a file and update dataToSave
            const processFileUpload = (file: File | null | string, path: string[], fieldName: string) => {
                if (file instanceof File) {
                    const filePath = `${submissionId}/${fieldName}-${file.name}`;
                    uploadTasks.push(
                        uploadFile(file, filePath).then(url => {
                             let current = dataToSave;
                             for(let i=0; i < path.length -1; i++){
                                 current = current[path[i]];
                             }
                             current[path[path.length-1]] = url;
                        })
                    );
                }
            };
            
            processFileUpload(formData.personalDetails.photo, ['personalDetails', 'photo'], 'photo');
            processFileUpload(formData.personalDetails.signature, ['personalDetails', 'signature'], 'signature');
            processFileUpload(formData.personalDetails.casteCertificate, ['personalDetails', 'casteCertificate'], 'casteCertificate');
            processFileUpload(formData.personalDetails.phCertificate, ['personalDetails', 'phCertificate'], 'phCertificate');

            await Promise.all(uploadTasks);
            
            await saveApplication(dataToSave);

            setSuccessMessage('Application submitted successfully!');
            setFormData(initialFormData);
            window.scrollTo(0,0);
        } catch (error) {
            console.error("Submission error:", error);
            setErrors({ submit: 'Failed to submit application. Please try again.' });
            window.scrollTo(0,0);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="container mx-auto p-4 md:p-8 max-w-screen-2xl">
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md relative mb-8" role="alert">
                        <strong className="font-bold text-lg">Error!</strong>
                        <ul className="mt-2 list-disc list-inside text-base">
                            {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-md relative mb-8" role="alert">
                        <strong className="font-bold text-lg">Success!</strong>
                        <p className="mt-2 text-base">{successMessage}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-8">
                    <PersonalDetails data={formData.personalDetails} onChange={handleFormChange} errors={errors} />
                    <QualificationsDetails 
                        qualificationsData={formData.qualifications} 
                        academicCareerData={formData.academicCareer}
                        onQualificationsChange={handleFormChange} 
                        onAcademicCareerChange={handleAcademicCareerChange} 
                    />
                    <ResearchPublications data={formData.researchPublications} onChange={handleResearchPublicationsChange} />
                    <TeachingExperience data={formData.teachingExperience} onChange={handleTeachingExperienceChange} />
                    <Declaration data={formData.declaration} onChange={handleFormChange} errors={errors} />

                    <div className="flex justify-center">
                        <button type="submit" disabled={isLoading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg border border-blue-700 transform transition-transform duration-150 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default App;
