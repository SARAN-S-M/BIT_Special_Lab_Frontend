import React, { useState } from 'react';
import NavigationBar from '../staff_menu/index';

function SpecialLab() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "Data Science Expert Systems | SLB070 | Sangavi N",
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

            <div className="p-6 bg-gray-100 dark:bg-gray-700 relative">
                <button 
                    className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit
                </button>
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {formData.name}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {formData.description}
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Faculty Members</h2>
                        <p className="text-gray-700 dark:text-gray-300">Faculty 1: {formData.faculty1}</p>
                        <p className="text-gray-700 dark:text-gray-300">Faculty 2: {formData.faculty2}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Promo Video</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.youtube.com/embed/your-video-id"
                                title="Promo Video"
                                className="w-full h-full rounded-lg shadow-lg"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Student Achievements</h2>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                            <li>{formData.achievements1}</li>
                            <li>{formData.achievements2}</li>
                            <li>{formData.achievements3}</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Slot Booking</h2>
                        <div className="text-gray-700 dark:text-gray-300">
                            <p>Total Students: {formData.totalStudents}</p>
                            <ul className="list-disc pl-5">
                                <li>Slot 1: {formData.slot1}</li>
                                <li>Slot 2: {formData.slot2}</li>
                                <li>Slot 3: {formData.slot3}</li>
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
                                <label className="block text-gray-900 dark:text-white">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Name"
                                />
                            </div>
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
                                <label className="block text-gray-900 dark:text-white">Faculty 1:</label>
                                <input
                                    type="text"
                                    name="faculty1"
                                    value={formData.faculty1}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Faculty 1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Faculty 2:</label>
                                <input
                                    type="text"
                                    name="faculty2"
                                    value={formData.faculty2}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Faculty 2"
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
                                <label className="block text-gray-900 dark:text-white">Student Achievements 1:</label>
                                <input
                                    type="text"
                                    name="achievements1"
                                    value={formData.achievements1}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Achievement 1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Student Achievements 2:</label>
                                <input
                                    type="text"
                                    name="achievements2"
                                    value={formData.achievements2}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Achievement 2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Student Achievements 3:</label>
                                <input
                                    type="text"
                                    name="achievements3"
                                    value={formData.achievements3}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Achievement 3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Total Students:</label>
                                <input
                                    type="number"
                                    name="totalStudents"
                                    value={formData.totalStudents}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Total Students"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Slot 1:</label>
                                <input
                                    type="text"
                                    name="slot1"
                                    value={formData.slot1}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Slot 1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Slot 2:</label>
                                <input
                                    type="text"
                                    name="slot2"
                                    value={formData.slot2}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Slot 2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-900 dark:text-white">Slot 3:</label>
                                <input
                                    type="text"
                                    name="slot3"
                                    value={formData.slot3}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white"
                                    placeholder="Slot 3"
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
