import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);

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
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Name</h2>
                        <p className="text-gray-700 dark:text-gray-300">Kumar</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Roll Number</h2>
                        <p className="text-gray-700 dark:text-gray-300">7376222AL000</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Department</h2>
                        <p className="text-gray-700 dark:text-gray-300">Artificial Intelligence and Machine Learning</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Special Lab</h2>
                        <p className="text-gray-700 dark:text-gray-300">Data Science Expert Systems | SLB070 | Sangavi N</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <p className="text-gray-700 dark:text-gray-300">Completed the Machine Learning lab assignment.</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <p className="text-gray-700 dark:text-gray-300">Attended the AI seminar by Dr. John Doe.</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">1 week ago</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <p className="text-gray-700 dark:text-gray-300">AI and Data Science Workshop</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">July 10, 2024</span>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <p className="text-gray-700 dark:text-gray-300">Hackathon: Building Smart Solutions</p>
                            <span className="text-sm text-gray-500 dark:text-gray-400">August 15, 2024</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Profile Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold text-black dark:text-white">Email</h2>
                            <p className="text-gray-700 dark:text-gray-300">kumar@example.com</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold text-black dark:text-white">Contact Number</h2>
                            <p className="text-gray-700 dark:text-gray-300">+1 234 567 890</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold text-black dark:text-white">Address</h2>
                            <p className="text-gray-700 dark:text-gray-300">123 Main St, City, Country</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold text-black dark:text-white">LinkedIn</h2>
                            <a href="https://www.linkedin.com/in/kumar" className="text-blue-500 dark:text-blue-400">linkedin.com/in/kumar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
