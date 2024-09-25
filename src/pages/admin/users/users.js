import React, { useState, useEffect } from 'react';
import NavigationBar from '../admin_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [userType, setUserType] = useState('student');
    const [users, setUsers] = useState([]);
    // const [users, setUsers] = useState([
    //     { _id: '1', name: 'John Doe', email: 'john@example.com', rollNumber: 'JD123' },
    //     { _id: '2', name: 'Jane Smith', email: 'jane@example.com', rollNumber: 'JS456' },
    //     { _id: '3', name: 'Alice Johnson', email: 'alice@example.com', rollNumber: 'AJ789' }
    // ]);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGetRoleData = async (role) => {
        setUserType(role);
        console.log(role);
        try {
            const response = await Request(
                'POST',
                '/user/getRoleData',
                { role: role },
                null
            )

            console.log(response.data);
            setUsers(response.data.users);
            console.log(users);

            const data = await response.data;

            if (response.ok || response.status === 200) {
                toast.success(data.message);
            } else if (response.status === 201) {
                toast.error(data.error || 'No users found with this role');
            } else {
                toast.error(data.error || 'An error occurred while blocking the user....');
            }
        }
        catch (error) {
            toast.error('Failed to fetch users');
        }
    };

    useEffect(() => {
        handleGetRoleData('student');
    }, []);

    return (
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="users" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            <div className="p-4">
                
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-4">
                    <button
                        onClick={() => handleGetRoleData('student')}
                        className={`px-4 py-2 ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} rounded-md focus:outline-none w-full sm:w-auto`}
                    >
                        Student
                    </button>
                    <button
                        onClick={() => handleGetRoleData('faculty')}
                        className={`px-4 py-2 ${userType === 'faculty' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} rounded-md focus:outline-none w-full sm:w-auto`}
                    >
                        Faculty
                    </button>
                    <button
                        onClick={() => handleGetRoleData('admin')}
                        className={`px-4 py-2 ${userType === 'admin' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} rounded-md focus:outline-none w-full sm:w-auto`}
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => handleGetRoleData('mentor')}
                        className={`px-4 py-2 ${userType === 'mentor' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} rounded-md focus:outline-none w-full sm:w-auto`}
                    >
                        Mentor
                    </button>
                </div>

                {/* Users Table */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">User Table</h1>
            <input 
                type="text" 
                placeholder="Search users..." 
                className="border rounded-lg px-4 py-2 mb-4 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
                    <table className="min-w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-600 dark:text-white">
                                <th className="px-4 py-2 text-left">S.no.</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Roll Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.rollNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center px-4 py-2 dark: text-white">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
