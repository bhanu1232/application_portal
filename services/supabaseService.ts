import { createClient } from '@supabase/supabase-js';
import { ApplicationData } from '../types';

const supabaseUrl = 'https://fyoojfycidncowagdkbp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5b29qZnljaWRuY293YWdka2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNjM0OTMsImV4cCI6MjA3NjgzOTQ5M30.WQoaX2zeTSza1Yx_Wzf7XOyUJsG-9NhmfHo80XLj0jQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'application-files';

export const saveApplication = async (data: ApplicationData) => {
    const { data: responseData, error } = await supabase
        .from('applications')
        .insert([data])
        .select();

    if (error) {
        console.error("Error saving application:", error);
        throw error;
    }
    
    console.log("Application saved:", responseData);
    return responseData;
};

export const uploadFile = async (file: File, filePath: string): Promise<string> => {
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error("Error uploading file:", error);
        throw error;
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
    
    console.log('File available at', publicUrl);
    return publicUrl;
};
