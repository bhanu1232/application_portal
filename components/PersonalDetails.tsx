import React, { useState } from 'react';
import { PersonalDetailsData } from '../types';
import { FormSection } from './FormSection';
import { InputField } from './InputField';

interface PersonalDetailsProps {
    data: PersonalDetailsData;
    onChange: (section: 'personalDetails', field: string, value: any) => void;
    errors: Record<string, string>;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, onChange, errors }) => {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange('personalDetails', name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            onChange('personalDetails', name, file);
            if (name === 'photo') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };
    
    return (
        <FormSection title="Personal Details">
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Upload Photo <span className="text-red-500">*</span></label>
                <div className="mt-1 flex items-center">
                    <span className="inline-block h-24 w-24 rounded-md overflow-hidden bg-gray-100">
                        {photoPreview ? <img src={photoPreview} alt="Photo preview" className="h-full w-full object-cover" /> : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                    </span>
                    <input type="file" name="photo" onChange={handleFileChange} accept="image/*" className="ml-5 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
                 {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
            </div>
            <InputField label="1. Name in Full" id="name" value={data.name} onChange={handleChange} required error={errors.name} className="md:col-span-2" />
            <InputField label="2. Department Applied For" id="department" value={data.department} onChange={handleChange} required error={errors.department} />
            <InputField label="3. Specify Specialization" id="specialization" value={data.specialization} onChange={handleChange} />
            <InputField label="4. Gender" id="gender" type="select" value={data.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </InputField>
            <InputField label="5. Date of Birth" id="dob" type="date" value={data.dob} onChange={handleChange} required error={errors.dob} />
            <InputField label="6. Place of Birth & District" id="birthPlace" value={data.birthPlace} onChange={handleChange} />
            <InputField label="7. Father's Name" id="fatherName" value={data.fatherName} onChange={handleChange} required error={errors.fatherName}/>
            <InputField label="8. Mother's Name" id="motherName" value={data.motherName} onChange={handleChange} />
            <InputField label="9. Nationality" id="nationality" value={data.nationality} onChange={handleChange} />
            <InputField label="10. Religion" id="religion" value={data.religion} onChange={handleChange} />
            <InputField label="11. Caste" id="caste" type="select" value={data.caste} onChange={handleChange}>
                <option value="">Select Caste</option>
                <option value="OC">OC</option>
                <option value="BC">BC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Minority">Minority</option>
            </InputField>
            {data.caste === 'BC' && (
                <InputField label="11a. Specify Sub-Caste" id="subCaste" value={data.subCaste} onChange={handleChange} />
            )}
            {['SC', 'ST', 'BC'].includes(data.caste) && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Caste Certificate</label>
                    <input type="file" name="casteCertificate" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-900" />
                </div>
            )}
             <InputField label="12. PH Category" id="phCategory" type="select" value={data.phCategory} onChange={handleChange}>
                <option value="None">None</option>
                <option value="PH-HH">PH-HH</option>
                <option value="PH-OH">PH-OH</option>
                <option value="PH-VH">PH-VH</option>
            </InputField>
            {data.phCategory !== 'None' && data.phCategory !== '' && (
                 <div>
                    <label className="block text-sm font-medium text-gray-700">PH Medical Certificate</label>
                    <input type="file" name="phCertificate" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-900" />
                </div>
            )}
            <InputField label="13. Present Post Held" id="presentPost" value={data.presentPost} onChange={handleChange} />
            <InputField label="14. Communication Address" id="address" type="textarea" value={data.address} onChange={handleChange} className="md:col-span-3"/>
            <InputField label="15. Mobile No." id="mobile" type="tel" value={data.mobile} onChange={handleChange} required error={errors.mobile} />
            <InputField label="16. Email ID" id="email" type="email" value={data.email} onChange={handleChange} required error={errors.email} />
            <InputField label="17. PAN No." id="pan" value={data.pan} onChange={handleChange} />
            <InputField label="18. Aadhar No." id="aadhar" value={data.aadhar} onChange={handleChange} />
        </FormSection>
    );
};