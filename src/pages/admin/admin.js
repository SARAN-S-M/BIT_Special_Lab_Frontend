import React, { useState } from 'react';
import NavigationBar from '../staff/staff_menu/Navbar';

function Admin() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [selectedDropdown, setSelectedDropdown] = useState('student');
    const [email, setEmail] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [blockEmail, setBlockEmail] = useState('');
    const [unblockEmail, setUnblockEmail] = useState('');
    const [fileName, setFileName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Roll Number:', rollNumber);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
        setFileName(file ? file.name : '');
    };

    const handleFileSubmit = () => {
        console.log('CSV File:', csvFile);
    };

    const handleBlock = () => {
        console.log('Block Email:', blockEmail);
    };

    const handleUnblock = () => {
        console.log('Unblock Email:', unblockEmail);
    };

    return (
        <div className="h-full w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <NavigationBar active="Admin" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className="p-6">
                <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md space-y-6">
                    <div className="flex flex-wrap space-x-4 mb-4">
                        <button
                            className={`py-2 px-4 rounded-md transition-transform duration-300 transform ${selectedDropdown === 'student' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('student')}
                        >
                            Student
                        </button>
                        <button
                            className={`py-2 px-4 rounded-md transition-transform duration-300 transform ${selectedDropdown === 'teacher' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('teacher')}
                        >
                            Teacher
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-900 dark:text-white">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                                placeholder="Email"
                            />
                        </div>
                        {selectedDropdown && (
                            <div>
                                <label className="block text-gray-900 dark:text-white">Roll Number:</label>
                                <input
                                    type="text"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value)}
                                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                                    placeholder="Roll Number"
                                />
                            </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md mt-6 mb-6">
                        <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center">
                            <label className="text-base md:text-lg text-gray-900 dark:text-gray-300 w-full md:w-1/5 mb-2 md:mb-0">Upload CSV:</label>
                            <div className="w-full md:w-5/5 relative">
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-300 flex items-center justify-center cursor-pointer"
                                >
                                    {fileName || "Choose File"}
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleFileSubmit}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Submit File
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Block Email</h2>
                        <input
                            type="email"
                            value={blockEmail}
                            onChange={(e) => setBlockEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                            placeholder="Email to Block"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleBlock}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Block
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Unblock Email</h2>
                        <input
                            type="email"
                            value={unblockEmail}
                            onChange={(e) => setUnblockEmail(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                            placeholder="Email to Unblock"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleUnblock}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Unblock
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
