import React, { useState } from 'react';
import NavigationBar from '../staff_menu/index';

function StudentInterview() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const students = [
        { sNo: 1, name: 'John Doe', rollNumber: '12345' },
        { sNo: 2, name: 'Jane Smith', rollNumber: '67890' },
        { sNo: 3, name: 'Mark Johnson', rollNumber: '54321' },
    ];

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            <NavigationBar active="StudentInterview" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            <div className="p-6">
                {students.map((student, index) => (
                    <div key={index} className="mb-4">
                        <div
                            className="flex justify-between items-center dark:text-white bg-gray-200 dark:bg-gray-800 p-4 rounded-md cursor-pointer"
                            onClick={() => toggleDropdown(index)}
                        >
                            <div>{student.sNo}. {student.name} - {student.rollNumber}</div>
                            <div
                                className={`transform transition-transform duration-300 ${
                                    expandedIndex === index ? 'rotate-180' : ''
                                }`}
                            >
                                ▼
                            </div>
                        </div>
                        <div
                            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                expandedIndex === index ? 'max-h-40' : 'max-h-0'
                            }`}
                        >
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-evenly gap-2">
                                <button className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600">
                                    Approved
                                </button>
                                <button className="bg-red-500 text-white px-10 py-2 rounded-md hover:bg-red-600">
                                    Rejected
                                </button>
                                <button className="bg-yellow-500 text-white px-10 py-2 rounded-md hover:bg-yellow-600">
                                    Absent
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentInterview;
