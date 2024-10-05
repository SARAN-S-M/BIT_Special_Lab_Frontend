import React, { useState, useEffect } from 'react';
import NavigationBar from '../staff_menu/index';
import { Request } from '../../../networking';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentInterview() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const [availableSlots, setAvailableSlots] = useState([]);

    const fetchAvailableSlots = async () => {
        try {
            const response = await Request(
                'GET',
                '/speciallabs/student-interview',
                null
            );
            if (response.status === 200) {
                const slots = response.data.slots.map(slot => ({
                    Slotid: slot.hashedId,
                    date: new Date(slot.date).toLocaleDateString(),
                    fromTime: new Date(slot.fromTime).toLocaleTimeString(),
                    toTime: new Date(slot.toTime).toLocaleTimeString(),
                    totalStudents: slot.totalStudents,
                    students: slot.students.map(student => ({
                        name: student.studentName,
                        rollNumber: student.rollNumber,
                        email: student.studentEmail,
                        Studentid: student.hashedId,
                    })),
                }));
                setAvailableSlots(slots);
                toast.success('Available slots fetched successfully!');
            } else {
                toast.error('Failed to fetch available slots!');
            }
        } catch (error) {
            toast.error('An error occurred while fetching available slots!');
        }
    }

    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const openModal = (slot) => {
        setSelectedSlot(slot);
        setIsModalOpen(true);
        setSelectedStudent(null);  // Reset the student selection when opening a new slot modal
        setSelectedSlotId(slot.Slotid);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSlot(null);
        setSelectedStudent(null);
    };

    const selectStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleResult = async (studentId, status) => {
        try {
            const response = await Request(
                'POST',
                '/speciallabs/student-interview/result',
                { hashedStudentId: studentId, hashedSlotId: selectedSlotId, result: status }
            );
            if (response.status === 200) {
                toast.success('Student approved successfully!');
                closeModal();
                fetchAvailableSlots();
            } else {
                toast.error('Failed to approve student!');
            }
        } catch (error) {
            toast.error('An error occurred while approving student!');
        }
    }

    return (
        <div className="h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            <NavigationBar active="StudentInterview" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            <div className="p-6">
                {availableSlots.map((slot) => (
                    <div
                        key={slot.Slotid}
                        className="mb-4 cursor-pointer dark:text-white bg-gray-200 dark:bg-gray-800 p-4 rounded-md"
                        onClick={() => openModal(slot)}
                    >
                        <div className="flex justify-between items-center">
                            <div>{slot.date} - {slot.fromTime} to {slot.toTime} (Total Students: {slot.totalStudents})</div>
                            <div className="transform transition-transform duration-300">▼</div>
                        </div>
                    </div>
                ))}

                {/* Custom Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-3/4">
                            <h2 className="text-xl dark:text-white mb-4">
                                Slot: {selectedSlot?.date} ({selectedSlot?.fromTime} - {selectedSlot?.toTime})
                            </h2>
                            
                            {selectedStudent ? (
                                <div>
                                    <div className="dark:text-white mb-4" title={selectedStudent.email}>{selectedStudent.name} - {selectedStudent.rollNumber} </div>
                                    <div className="flex gap-2 mb-4">
                                        <button 
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                            onClick={() => {handleResult(selectedStudent.Studentid, 'Selected')}}
                                        >
                                            Selected
                                        </button>
                                        <button 
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                            onClick={() => {handleResult(selectedStudent.Studentid, 'Rejected')}}
                                        >
                                            Rejected
                                        </button>
                                        <button 
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                            onClick={() => {handleResult(selectedStudent.Studentid, 'Absent')}}
                                        >
                                            Absent
                                        </button>
                                    </div>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        onClick={() => setSelectedStudent(null)}
                                    >
                                        Back to Students
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="dark:text-white mb-4">Registered Students:</div>
                                    {selectedSlot?.students.map((student, index) => (
                                        <div
                                            key={student.Studentid}
                                            className="flex justify-between items-center dark:text-white bg-gray-300 dark:bg-gray-700 p-4 rounded-md mb-2 cursor-pointer"
                                            onClick={() => {
                                                selectStudent(student)
                                                setSelectedStudent(student);
                                            }}
                                        >
                                            <div title={student.email}>{index + 1}. {student.name} - {student.rollNumber}</div>
                                            <div className="transform transition-transform duration-300">▼</div>
                                        </div>
                                    ))}
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default StudentInterview;
