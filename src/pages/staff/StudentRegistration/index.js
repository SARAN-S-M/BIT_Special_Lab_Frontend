import React, { useState, useEffect } from 'react';
import NavigationBar from '../staff_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentRegistration() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulated student data from the backend with date and time included.
    const [students, setStudents] = useState([
        { sNo: 1, name: 'John Doe', rollNumber: '12345', email: 'testing1@gmail.com', reason: 'Late submission', date: '2024-10-01', time: '10:30' },
        { sNo: 2, name: 'Jane Smith', rollNumber: '67890', email: 'testing2@gmail.com', reason: 'Attendance issue', date: '', time: '' }, // No date/time chosen
        { sNo: 3, name: 'Mark Johnson', rollNumber: '54321', email: 'testing3@gmail.com', reason: 'Incomplete project', date: '2024-10-03', time: '11:00' },
    ]);

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchStudents = async () => {
        try {
            const response = await Request(
                'GET', 
                '/speciallabs/student-changeLab-request', 
                null);
            setStudents(response.data.students.map((student, index) => {
                const date = student.date ? new Date(student.date).toISOString().split('T')[0] : '';
                const time = student.time ? new Date(student.time).toISOString().split('T')[1].substring(0, 5) : '';
                return {
                    id: student.HashedId,
                    sNo: index + 1,
                    name: student.name,
                    rollNumber: student.rollNumber,
                    email: student.email,
                    reason: student.reason,
                    date: date,
                    time: time
                };
            }));
        } catch (error) {
            toast.error('Failed to fetch students.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleUpdate = async (student) => {
        if (!student.date || !student.time) {
            toast.error('Date and Time cannot be empty.');
            return;
        }

        try {
            const response = await Request(
                'POST',
                '/speciallabs/changeLab-update-date-time',
                { hashedStudentId : student.id, studentEmail: student.email, newDate: student.date, newTime: student.time }
            );
            if (response.status === 200) {
                toast.success('Date and Time updated successfully.');
                setStudents((prevStudents) =>
                    prevStudents.map((s) =>
                        s.rollNumber === student.rollNumber ? { ...s, date: student.date, time: student.time } : s
                    )
                );
            } else {
                toast.error('Failed to update Date and Time.');
            }
        } catch (error) {
            toast.error('Failed to update Date and Time.');
        }
    };

    const handleSelection = async (student, status) => {
        console.log(student);
        try {
            const response = await Request(
                'POST',
                '/speciallabs/changeLab-result',
                { hashedStudentId: student.id , result: status }
            );
            console.log(response);
            if (response.status === 200) {
                toast.success(`Student ${status} successfully.`);
                setStudents((prevStudents) =>
                    prevStudents.filter((s) => s.rollNumber !== student.rollNumber)
                );
            } else {
                toast.error("Hello..")
                toast.error(`Failed to ${status} student.`);
            }
        } catch (error) {
            toast.error(`Failed to ${status} student.`);
        }
    };

    const handleDateChange = (index, date) => {
        setStudents((prevStudents) =>
            prevStudents.map((student, i) =>
                i === index ? { ...student, date } : student
            )
        );
    };

    const handleTimeChange = (index, time) => {
        setStudents((prevStudents) =>
            prevStudents.map((student, i) =>
                i === index ? { ...student, time } : student
            )
        );
    };

    return (
        <div className="min-h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            <NavigationBar active="StudentRegistration" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            <div className="p-6">
                {/* Search Box */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by Name or Roll Number"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {filteredStudents.map((student, index) => (
                    <div
                        key={index}
                        className="mb-6"  // Add margin below each student entry for proper spacing
                    >
                        <div
                            className={`flex justify-between items-center dark:text-white bg-gray-200 dark:bg-gray-800 p-4 rounded-md cursor-pointer 
                                mb-4 border-2 ${student.date && student.time ? 'border-blue-500' : 'border-transparent'}`}
                            onClick={() => toggleDropdown(index)}
                        >
                            <div title={student.email} value={student.id}>{student.sNo}. {student.name} - {student.rollNumber}</div>
                            <div
                                className={`transform transition-transform duration-300 ${
                                    expandedIndex === index ? 'rotate-180' : ''
                                }`}
                            >
                                ▼
                            </div>
                        </div>
                        <div
                            className={`transition-max-height duration-300 ease-in-out overflow-y-auto ${ 
                                expandedIndex === index ? 'max-h-96 mb-6' : 'max-h-0'
                            }`}
                        >
                            <div className="mt-2 space-y-4">
                                {/* Reason for the student */}
                                <div className="flex flex-col space-y-2 w-full">
                                    <label className="text-gray-700 dark:text-gray-300">Reason:</label>
                                    <p className="p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white w-full">
                                        {student.reason}
                                    </p>
                                </div>

                                {/* Select Date */}
                                <div className="flex flex-col space-y-2 w-full">
                                    <label className="text-gray-700 dark:text-gray-300">Select Date:</label>
                                    <input 
                                        type="date" 
                                        value={student.date}
                                        onChange={(e) => handleDateChange(index, e.target.value)}
                                        className="p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white w-full"
                                    />
                                </div>

                                {/* Select Time */}
                                <div className="flex flex-col space-y-2 w-full">
                                    <label className="text-gray-700 dark:text-gray-300">Select Time:</label>
                                    <input 
                                        type="time" 
                                        value={student.time}
                                        onChange={(e) => handleTimeChange(index, e.target.value)}
                                        className="p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white w-full"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col space-y-2 w-full md:flex-row md:space-y-0 md:space-x-4 md:justify-between">
                                    <button 
                                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition w-full md:w-1/3"
                                        onClick={() => handleUpdate(student)}
                                    >
                                        Update Date and Time
                                    </button>
                                    <button 
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition w-full md:w-1/3"
                                        onClick={() => handleSelection(student, 'Selected')}
                                    >
                                        Selected
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition w-full md:w-1/3"
                                        onClick={() => handleSelection(student, 'Rejected')}
                                    >
                                        Rejected
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default StudentRegistration;
