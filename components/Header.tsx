
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="border-b border-gray-200">
            <div className="bg-white">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-center items-center space-x-6">
                        <img src="https://upload.wikimedia.org/wikipedia/en/f/ff/Sri_Venkateswara_University_logo.png" alt="Sri Venkateswara University Logo" className="h-16 md:h-20" />
                        <div className="text-left">
                            <h1 className="text-2xl md:text-3xl font-bold" style={{color: '#4A5C3A'}}>SRI VENKATESWARA UNIVERSITY</h1>
                            <p className="text-base md:text-lg" style={{color: '#4A5C3A'}}>Application for Academic Consultants/Coordinators</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#4A5C3A' }}>
                <div className="container mx-auto px-4 py-2 flex justify-end">
                    <a href="#" className="text-white text-base font-semibold hover:underline">Application Status</a>
                </div>
            </div>
        </header>
    );
};
