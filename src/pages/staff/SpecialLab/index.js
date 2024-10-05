import React, { useState, useEffect } from 'react';
import NavigationBar from '../staff_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SpecialLab() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewSlotModalOpen, setIsNewSlotModalOpen] = useState(false);
    const [isAvailableSlotModalOpen, setIsAvailableSlotModalOpen] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [newPromoVideo, setNewPromoVideo] = useState('');
    const [date, setDate] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [totalStudents, setTotalStudents] = useState('');

    const [availableSlots, setAvailableSlots] = useState([
        {
            id: 1,
            date: '2024-10-05',
            fromTime: '09:00 AM',
            toTime: '11:00 AM',
            totalStudents: 25,
        },
        {
            id: 2,
            date: '2024-10-06',
            fromTime: '10:00 AM',
            toTime: '12:00 PM',
            totalStudents: 30,
        },
    ]);
    
    
    const [specialLabDetails, setSpecialLabDetails] = useState({
        SpecialLabName: "Special Lab Name",
        SpecialLabCode: "SL01",
        SpecialLabDescription: "This is a description of the special lab.",
        faculties: [
            {
                facultyName: 'Faculty 1',
                facultyEmail: 'faculty@bitsathy.ac.in',
            },
            {
                facultyName: 'Faculty 2',
                facultyEmail: 'faculty2@bitsathy.ac.in',
            },
        ],
        promoVideoUrl: "https://www.youtube.com/embed/ddTV12hErTc?si=x27iEC-yzd-poB2k",
    });

    useEffect(() => {
        const fetchSpecialLabDetails = async () => {
            console.log('Fetching special lab details...');
            try {
                const response = await Request(
                    'GET',
                    `/speciallabs/faculty/getLabDetails`,
                    null
                );
                const fetchedDetails = response.data.labDetails;
                setSpecialLabDetails({
                    SpecialLabName: fetchedDetails.specialLabName,
                    SpecialLabCode: fetchedDetails.specialLabCode,
                    SpecialLabDescription: fetchedDetails.specialLabDescription,
                    faculties: fetchedDetails.faculties.map(faculty => ({
                        facultyName: faculty.facultyName,
                        facultyEmail: faculty.facultyEmail
                    })),
                    promoVideoUrl: fetchedDetails.promoVideoUrl,
                });
            } catch (error) {
                toast.error('Failed to fetch special lab details.');
            }
        };
        fetchSpecialLabDetails();
    }, []);

    const handleDescriptionInputChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handlePromoVideoInputChange = (e) => {
        setNewPromoVideo(e.target.value);
    };

    const handleSave = async() => {
        const response = await Request(
            'POST',
            '/speciallabs/faculty/updateLabDetails',
            {
                newDescription: newDescription,
                newPromoVideo: newPromoVideo,
            }
        );
        toast.success('Special lab details updated successfully.');
        setIsModalOpen(false);
    };

    const handleDeleteSlot = (id) => {
        const deleteSlot = async () => {
            try {
                const response = await Request(
                    'DELETE',
                    '/speciallabs/deleteSlot',
                    { hashedId: id }
                );
                toast.success('Slot deleted successfully.');
                setIsAvailableSlotModalOpen(false);
            } catch (error) {
                toast.error('Failed to delete the slot.');
                console.error(error);
            }
        };
        deleteSlot();
    };
    
    const handleDateChange = (e) => setDate(e.target.value);
    const handleFromTimeChange = (e) => setFromTime(e.target.value);
    const handleToTimeChange = (e) => setToTime(e.target.value);
    const handleTotalSlotsChange = (e) => setTotalStudents(e.target.value);
    
    const handleSaveNewSlot = async () => {
        const newSlot = {
            date,
            fromTime,
            toTime,
            totalStudents,
        };
        try {
            const response = await Request(
            'POST',
            '/speciallabs/addSlot',
            newSlot
            );
            toast.success('New slot saved successfully.');
            setIsNewSlotModalOpen(false);
        } catch (error) {
            toast.error('Failed to save the new slot.');
            console.error(error);
        }
    };

    const handleAvailableSlot = async() => {
        try {
            const response = await Request(
                'GET',
                '/speciallabs/getSlots',
                null
            );
            const slots = response.data.slots.map(slot => ({
                id: slot.hashedId,
                date: new Date(slot.date).toLocaleDateString(),
                fromTime: new Date(slot.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                toTime: new Date(slot.toTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                totalStudents: slot.totalStudents,
            }));
            setAvailableSlots(slots);
            setIsAvailableSlotModalOpen(true);
            console.log(response.data.slots);
            // setIsAvailableSlotModalOpen(true);
        } catch (error) {
            toast.error('Failed to fetch available slots.');
            console.error(error);
        }
    }
    
    return (
        <div className="h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            <NavigationBar active="SpecialLab" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className={`fixed inset-y-0 left-0 ${sidebarToggle ? 'block' : 'hidden'} md:block`}></div>

            <div className="h-auto p-6 bg-gray-100 dark:bg-gray-700 relative">
                <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-x-4 md:space-y-0 mb-4">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Edit
                    </button>

                    {/* New Slot Button */}
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => setIsNewSlotModalOpen(true)}
                    >
                        New Slot
                    </button>

                    {/* Available Slot Button */}
                    <button 
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                        onClick={() => handleAvailableSlot()}
                    >
                        Available Slots
                    </button>
                </div>

                <div className="h-auto max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {specialLabDetails.SpecialLabName}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {specialLabDetails.SpecialLabDescription}
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Faculty Members</h2>
                        {specialLabDetails.faculties.map((faculty, index) => (
                            <p key={index} className="text-gray-700 dark:text-gray-300" title={faculty.facultyEmail}>
                                {index + 1}. {faculty.facultyName}
                            </p>
                        ))}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Promo Video</h2>
                        <div className="aspect-w-16 h-80 mt-8">
                            <iframe
                                src={specialLabDetails.promoVideoUrl}
                                title="Promo Video"
                                className="w-full h-full rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>



            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 w-11/12 md:w-2/3 h-4/5 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Special Lab</h2>
                        <div className="space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Description:</label>
                                <textarea
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={newDescription}
                                    onChange={handleDescriptionInputChange}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Promo Video URL:</label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={newPromoVideo}
                                    onChange={handlePromoVideoInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* New Slot Modal */}
            {isNewSlotModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 w-11/12 md:w-2/3 h-4/5 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">New Slot</h2>
                        <div className="space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Date:</label>
                                <input type="date" className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={date} onChange={handleDateChange} />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Open Time:</label>
                                <input type="time" className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={fromTime} onChange={handleFromTimeChange} />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Close Time:</label>
                                <input type="time" className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={toTime} onChange={handleToTimeChange} />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Total Students:</label>
                                <input type="number" className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    value={totalStudents} onChange={handleTotalSlotsChange} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    onClick={handleSaveNewSlot}>
                                Save
                            </button>
                            <button className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    onClick={() => setIsNewSlotModalOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Available Slot Modal */}
            {isAvailableSlotModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-2/3 h-4/5 p-6 rounded-lg shadow-lg relative">
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Available Slots</h2>
                            <div className="space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                                {availableSlots.map((slot, index) => (
                                    <div key={slot.id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-900 dark:text-white">Date: {slot.date}</p>
                                            <p className="text-gray-900 dark:text-white">From: {slot.fromTime}</p>
                                            <p className="text-gray-900 dark:text-white">To: {slot.toTime}</p>
                                            <p className="text-gray-900 dark:text-white">Total Students: {slot.totalStudents}</p>
                                        </div>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                            onClick={() => handleDeleteSlot(slot.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    onClick={() => setIsAvailableSlotModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            <ToastContainer />
        </div>
    );
}

export default SpecialLab;
