
export interface PersonalDetailsData {
    photo: File | null | string;
    signature: File | null | string;
    name: string;
    department: string;
    specialization: string;
    gender: 'Male' | 'Female' | '';
    dob: string;
    birthPlace: string;
    fatherName: string;
    motherName: string;
    nationality: string;
    religion: string;
    caste: 'SC' | 'ST' | 'BC' | 'OC' | 'Minority' | '';
    subCaste: string;
    casteCertificate: File | null | string;
    phCategory: 'None' | 'PH-HH' | 'PH-OH' | 'PH-VH' | '';
    phCertificate: File | null | string;
    presentPost: string;
    address: string;
    mobile: string;
    email: string;
    pan: string;
    aadhar: string;
}

export interface QualificationsData {
    net: boolean;
    netYear: string;
    slet: boolean;
    sletYear: string;
    apset: boolean;
    apsetYear: string;
    other: boolean;
    otherText: string;
    phdAwardDate: string;
    researchArea: string;
    postDocExperience: string;
    mphilDate: string;
}

export interface AcademicRecord {
    id: number;
    course: string;
    subject: string;
    year: string;
    marks: string;
    division: string;
    university: string;
}

export interface Book {
    id: number;
    title: string;
    year: string;
    type: 'Indian' | 'Foreign' | '';
    issn: string;
    impactFactor: string;
}

export interface ConferencePaper {
    id: number;
    title: string;
    conference: string;
    organizer: string;
    year: string;
    type: 'Indian' | 'Foreign' | '';
}

export interface Publication {
    id: number;
    name: string;
    year: string;
    type: 'Indian' | 'Foreign' | '';
    ugcSlNo: string;
    issn: string;
    impactFactor: string;
}

export interface TeachingExperienceRecord {
    id: number;
    university: string;
    designation: string;
    from: string;
    to: string;
}

export interface ResearchPublicationsData {
    refereedJournalCount: string;
    reputedJournalCount: string;
    indianBookCount: string;
    foreignBookCount: string;
    subjectBooksState: string;
    subjectBooksNational: string;
    chaptersInBooksIndian: string;
    chaptersInBooksForeign: string;
    fellowshipInternational: string;
    fellowshipAcademic: string;
    fellowshipAssociations: string;
    awardStateUniversityAcademic: string;
    awardStateUniversityAssociations: string;
    awardsReceived: string;
    books: Book[];
    conferencePapers: ConferencePaper[];
    publications: Publication[];
}

// FIX: Add FileUploadsData interface to resolve import error in components/FileUploads.tsx.
export interface FileUploadsData {
    certificates: File[];
    publications: File[];
}

export interface DeclarationData {
    agreed: boolean;
}

export interface ApplicationData {
    personalDetails: PersonalDetailsData;
    qualifications: QualificationsData;
    academicCareer: AcademicRecord[];
    researchPublications: ResearchPublicationsData;
    teachingExperience: TeachingExperienceRecord[];
    declaration: DeclarationData;
}

export const initialFormData: ApplicationData = {
    personalDetails: {
        photo: null,
        signature: null,
        name: '',
        department: '',
        specialization: '',
        gender: '',
        dob: '',
        birthPlace: '',
        fatherName: '',
        motherName: '',
        nationality: '',
        religion: '',
        caste: '',
        subCaste: '',
        casteCertificate: null,
        phCategory: '',
        phCertificate: null,
        presentPost: '',
        address: '',
        mobile: '',
        email: '',
        pan: '',
        aadhar: '',
    },
    qualifications: {
        net: false,
        netYear: '',
        slet: false,
        sletYear: '',
        apset: false,
        apsetYear: '',
        other: false,
        otherText: '',
        phdAwardDate: '',
        researchArea: '',
        postDocExperience: '',
        mphilDate: '',
    },
    academicCareer: [],
    researchPublications: {
        refereedJournalCount: '',
        reputedJournalCount: '',
        indianBookCount: '',
        foreignBookCount: '',
        subjectBooksState: '',
        subjectBooksNational: '',
        chaptersInBooksIndian: '',
        chaptersInBooksForeign: '',
        fellowshipInternational: '',
        fellowshipAcademic: '',
        fellowshipAssociations: '',
        awardStateUniversityAcademic: '',
        awardStateUniversityAssociations: '',
        awardsReceived: '',
        books: [],
        conferencePapers: [],
        publications: [],
    },
    teachingExperience: [],
    declaration: {
        agreed: false,
    },
};