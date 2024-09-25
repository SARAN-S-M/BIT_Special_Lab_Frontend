import React, { useState } from 'react';
import NavigationBar from '../admin_menu/index';
import { Request } from '../../../networking/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [selectedDropdown, setSelectedDropdown] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [removeUserEmail, setRemoveUserEmail] = useState(''); 
    const [rollNumber, setRollNumber] = useState('');
    const [csvFile, setCsvFile] = useState(null);
    const [blockEmail, setBlockEmail] = useState('');
    const [unblockEmail, setUnblockEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [specialLab, setSpecialLab] = useState(''); 
    const [specialLabCode, setSpecialLabCode] = useState('');
    const [removeLabCode, setRemoveLabCode] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [facultyLabCode, setFacultyLabCode] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Email:', email);
    //     console.log('Roll Number:', rollNumber);
    // };

    const handleAdd = async (e) => {
        e.preventDefault();
    
        try {
            // Assuming "Request" is a custom function you've defined to make HTTP requests
            const response = await Request(
                'POST', // HTTP method
                '/user/addUser', // Endpoint for adding the user
                { name, email, rollNumber, role: selectedDropdown }, // Payload
                null // Additional options (if any)
            );

            console.log(response.data);

            console.log('Response:', response.status);
            const data = await response.data;
    
            if (response.ok || response.status === 201) {
                // Handle success case
                console.log('User added successfully:', response);
                toast.success(data.message);
            } else if (response.status === 400) {
                // Handle the case when user already exists
                console.log('Response:', response.data.error);
                toast.error(data.error || 'An error occurred while blocking the user.');
            } else {
                // Handle other errors
                console.error('Error adding user:', response.error);
                toast.error(data.error || 'An error occurred while blocking the user.');
            }
        } catch (error) {
            // Handle network or other unexpected errors
            console.error('Request failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    
    
    const handleRemove = async (e) => {
        e.preventDefault();
    
        try {
            // Make the DELETE request to remove the user by email
            const response = await Request(
                'DELETE', // HTTP method
                '/user/removeUser', // Backend route for removing the user
                { email: removeUserEmail }, // Payload to identify the user (in this case, email)
                null // Additional options (if any)
            );
    
        // console.log('Response:', response.status);
        console.log(response);


        const data = await response.data;
        
    
            // Handle success and error responses based on status code
        if (response.ok || response.status === 200) {
            // Handle success case
            console.log('User removed successfully:', data.message);
            toast.success(data.message);
        } else if (response.status === 400) {
            // Handle missing email error
            toast.error(data.error || 'Email is required. Please provide a valid email.');
        } else if (response.status === 404) {
            // Handle user not found error
            toast.error(data.error || 'User not found. Please check the email and try again.');
        } else {
            console.log('Response:', response.status);
            // Handle other errors
            console.error('Error removing user:', data.error);
            toast.error(data.error || 'An error occurred while removing the user.');
        }

        } catch (error) {
            // Handle network or other unexpected errors
            console.error('Request failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
        setFileName(file ? file.name : '');
    };

    const handleFileSubmit = () => {
        console.log('CSV File:', csvFile);
    };

    const handleBlock = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const response = await Request(
                'PUT', // HTTP method
                '/user/blockUser', // Endpoint for blocking the user
                { email: blockEmail }, // Payload
                null // Additional options (if any)
            );
    
            const data = await response.data;
    
            if (response.ok || response.status === 200) {
                console.log('User blocked successfully:', data.message);
                toast.success(data.message);
            } else {
                toast.error(data.error || 'An error occurred while blocking the user.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    
    const handleUnblock = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const response = await Request(
                'PUT', // HTTP method
                '/user/unblockUser', // Endpoint for unblocking the user
                { email: unblockEmail }, // Payload
                null // Additional options (if any)
            );
    
            const data = await response.data;
    
            if (response.ok || response.status === 200) {
                console.log('User unblocked successfully:', data.message);
                toast.success(data.message);
            } else {
                toast.error(data.error || 'An error occurred while unblocking the user.');
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast.error('An error occurred. Please try again.');
        }
    };
    

    const handleSpecialLabSubmit = async () => {
        // Check if the special lab name and number are not empty
        if (!specialLab || !specialLabCode) {
            toast.error('Please enter both the Special Lab Name and Special Lab Code.');
            return; // Exit the function if validation fails
        }
    
        try {
            // Make the POST request to send the special lab name and number
            const response = await Request(
                'POST',
                '/speciallabs/addSpecialLab', // Replace with your actual backend endpoint
                {
                    specialLabName: specialLab,
                    specialLabCode: specialLabCode
                },
                null
            );

            const data = await response.data;

            if (response.ok || response.status === 201) {
                toast.success(data.message);
            }
            else {
                toast.error(data.error || 'An error occurred while submitting special lab details.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleRemoveLab = async () => {
        if(!removeLabCode) {
            toast.error('Please enter the Lab Code to remove');
            return;
        }

        try {

            const response = await Request(
                'DELETE',
                '/speciallabs/removeSpecialLab',
                { specialLabCode: removeLabCode },
                null
            );

            const data = await response.data;

            if (response.ok || response.status === 200) {
                toast.success(data.message);
            }
            else if (response.status === 201) {
                toast.error(data.error || 'An error occurred while removing the special lab.');
            }
            else {
                toast.error(data.error || 'An error occurred while removing the special lab.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleAddFaculty = async () => {
        if(!facultyEmail || !facultyLabCode) {
            toast.error('Please enter both the Faculty Roll Number and Lab Code');
            return;
        }

        try {
            const response = await Request(
                'POST',
                '/speciallabs/addFaculty',
                { facultyEmail: facultyEmail, specialLabCode: facultyLabCode },
                null
            );

            const data = await response.data;

            if (response.ok || response.status === 201) {
                toast.success(data.message);
            }
            else {
                toast.error(data.error || 'An error occurred while adding the faculty.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    }

    const handleRemoveFaculty = async () => {
        if(!facultyEmail || !facultyLabCode) {
            toast.error('Please enter both the Faculty Roll Number and Lab Code');
            return;
        }

        try {
            const response = await Request(
                'DELETE',
                '/speciallabs/removeFaculty',
                { facultyEmail: facultyEmail, specialLabCode: facultyLabCode },
                null
            );

            const data = await response.data;

            if (response.ok || response.status === 200) {
                toast.success(data.message);
            }
            else {
                toast.error(data.error || 'An error occurred while removing the faculty.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    }

    return (
        <div className="h-full w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="home" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className="p-6">
                <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md space-y-6">
                    <div className="flex flex-wrap space-x-4 mb-4">
                        <button
                            className={`py-2 px-4 rounded-md border-2 border-gray-400 transition-transform duration-300 transform ${selectedDropdown === 'student' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('student')}
                        >
                            Student
                        </button>
                        <button
                            className={`py-2 px-4 rounded-md border-2 border-gray-400 transition-transform duration-300 transform ${selectedDropdown === 'faculty' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('faculty')}
                        >
                            Faculty
                        </button>
                        <button
                            className={`py-2 px-4 rounded-md border-2 border-gray-400 transition-transform duration-300 transform ${selectedDropdown === 'mentor' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('mentor')}
                        >
                            Mentor
                        </button>
                        <button
                            className={`py-2 px-4 rounded-md border-2 border-gray-400 transition-transform duration-300 transform ${selectedDropdown === 'admin' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
                            onClick={() => setSelectedDropdown('admin')}
                        >
                            Admin
                        </button>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-900 dark:text-white">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                                placeholder="Name"
                            />
                        </div>
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
                        <div className="flex justify-end mt-4 space-x-4">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Add
                            </button>
                        </div>
                    </form>

                    <div className="space-y-4">
                <h2 className="text-lg font-bold dark:text-white">Remove User</h2>
                <div>
                    <label className="block text-gray-900 dark:text-white">Email:</label>
                    <input
                        type="email"
                        value={removeUserEmail}
                        onChange={(e) => setRemoveUserEmail(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0"
                        placeholder="Email"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleRemove}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                    >
                        Remove User
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
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
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
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Unblock
                            </button>
                        </div>
                    </div>
                </div>

                {/* Special Lab Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Special Lab</h2>
                    <input
                        type="text"
                        value={specialLabCode}
                        onChange={(e) => setSpecialLabCode(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0 mb-4"
                        placeholder="Enter Special Lab Code"
                    />
                    <input
                        type="text"
                        value={specialLab}
                        onChange={(e) => setSpecialLab(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0 mb-4"
                        placeholder="Enter Special Lab Name"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSpecialLabSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 mr-2"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Input field for removing a lab */}
                    <input
                        type="text"
                        value={removeLabCode}
                        onChange={(e) => setRemoveLabCode(e.target.value)}
                        className="mt-4 w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0 mb-4"
                        placeholder="Enter Lab Code to Remove"
                    />
                    
                    {/* Remove button */}
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handleRemoveLab}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                {/* Faculty Management Container */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Manage Faculty</h2>
                    
                    {/* Input for Faculty Roll Number */}
                    <input
                        type="text"
                        value={facultyEmail}
                        onChange={(e) => setFacultyEmail(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0 mb-4"
                        placeholder="Enter Faculty Email"
                    />
                    
                    {/* Input for Lab Code to Associate with Faculty */}
                    <input
                        type="text"
                        value={facultyLabCode}
                        onChange={(e) => setFacultyLabCode(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-colors duration-0 mb-4"
                        placeholder="Enter Lab Code to Associate"
                    />

                    {/* Add Faculty Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleAddFaculty}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 mr-2"
                        >
                            Add Faculty
                        </button>
                        
                        {/* Remove Faculty Button */}
                        <button
                            onClick={handleRemoveFaculty}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                        >
                            Remove Faculty
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
