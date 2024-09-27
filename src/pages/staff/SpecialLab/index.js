import React, { useState, useEffect } from 'react';
import NavigationBar from '../staff_menu/index';
import { Request } from '../../../networking/index';
import { toast } from 'react-toastify';

function SpecialLab() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "Data Science Expert Systems | SLB070",
        description: "Sample Description",
        faculty1: "Sangavi N",
        faculty2: "",
        achievements1: "International Paper Presentation 24'",
        achievements2: "",
        achievements3: "",
        totalStudents: 30,
        slot1: "1/5/24 09:00 AM 10",
        slot2: "1/5/24 10:00 AM 10",
        slot3: "1/5/24 01:00 PM 10",
    });
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
                // console.log(specialLabDetails);
                console.log(fetchedDetails);
                
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
                console.log(fetchedDetails);
                console.log('Fetched special lab details.');
                console.log(specialLabDetails);
            } catch (error) {
                toast.error('Failed to fetch special lab details.');
            }
        };
        fetchSpecialLabDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Logic to save the updated data goes here
        setIsModalOpen(false);
    };

    return (
        <div className="h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            <NavigationBar active="SpecialLab" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className={`fixed inset-y-0 left-0 ${sidebarToggle ? 'block' : 'hidden'} md:block`}></div>

            <div className="h-lvh p-6 bg-gray-100 dark:bg-gray-700 relative">
                <button 
                    className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit
                </button>
                <div className=" max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
                                {index+1}. {faculty.facultyName}
                            </p>
                        ))}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Promo Video</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={specialLabDetails.promoVideoUrl}
                                title="Promo Video"
                                className="w-full h-full rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Slot Booking</h2>
                        <div className="text-gray-700 dark:text-gray-300">
                            <ul className="list-disc pl-5">
                                <li>Slot: {formData.slot1}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 w-11/12 md:w-2/3 h-4/5 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Details</h2>
                        <div className="space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Description"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Promo Video Embed Code:</label>
                                <input
                                    type="text"
                                    name="promoVideo"
                                    value={formData.promoVideo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Enter YouTube embed code"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Slot:</label>
                                <input
                                    type="text"
                                    name="slot1"
                                    value={formData.slot1}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Slot 1"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
        </div>
    );
}

export default SpecialLab;
