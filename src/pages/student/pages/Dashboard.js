import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { Request } from '../../../networking/index';
import { toast } from 'react-toastify';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Kumar',
        rollNumber: '7376222AL000',
        email: 'kumar@example.com',
        specialLab: 'Data Science Expert Systems',
        specialLabCode: 'SLB070',
        interviewProgress: 'In Progress'
      });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Request('GET', '/user/student/getStudentDetails', null);
                const data = response.data.studentDetails;
                console.log(data);
                setUserData({
                    name: data.name,
                    rollNumber: data.rollNumber,
                    email: data.email,
                    specialLab: data.specialLab,
                    specialLabCode: data.specialLabCode,
                    interviewProgress: data.interviewProgress
                });
            } catch (error) {
                toast.error('Failed to fetch user data.');
            } finally {
                // setIsLoading(false);
            }
    };
        fetchUserData();
    }, []);

    return (
        <div className="h-screen bg-white dark:bg-gray-900 min-w-60 relative overflow-auto">
            {isLoading &&
                <div className='absolute z-30 w-full h-full bg-black bg-opacity-20'>
                    <Loading />
                </div>
            }

            <nav className="sticky top-0 z-10">
                <NavigationBar active="home" />
            </nav>
            <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(userData).map(([key, value]) => (
                <div
                    key={key}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform hover:border-blue-500 hover:dark:border-blue-400"
                >
                    <h2 className="text-lg font-semibold text-black dark:text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1')} {/* Formats the key for display */}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">{value}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Dashboard;
