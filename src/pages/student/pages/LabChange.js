import React, { useState } from 'react';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';

function LabChange() {
    const [isLoading, setIsLoading] = useState(false);

    const labOptions = [
        { value: 'Special Lab 1', label: 'Lab 1' },
        { value: 'Special Lab 2', label: 'Lab 2' },
        { value: 'Special Lab 3', label: 'Lab 3' },
        { value: 'Special Lab 4', label: 'Lab 4' },
        { value: 'Special Lab 5', label: 'Lab 5' },
    ];

    return (
        <div className="h-screen bg-white dark:bg-gray-900 min-w-60 relative">

            {isLoading &&
                <div className='absolute z-30 w-full h-full bg-black bg-opacity-20'>
                    <Loading />
                </div>
            }

            <nav>
                <NavigationBar active="Lab_Change" />
            </nav>

            <div className='p-4 md:p-10 flex flex-col items-center'>
                <div className='w-full bg-gray-100 border border-gray-500 dark:border-none dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg'>
                    <div className='text-2xl md:text-3xl font-bold text-black dark:text-white mb-4 md:mb-6'>Change Lab</div>

                    <div className='mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center'>
                        <label className='text-base md:text-lg text-black dark:text-gray-300 w-full md:w-1/5 mb-2 md:mb-0'>New Special Lab:</label>
                        <select className="w-full md:w-4/5 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg text-black dark:text-gray-300">
                            {labOptions.map((option) => (
                                <option value={option.value} key={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className='mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center'>
                        <label className='text-base md:text-lg text-black dark:text-gray-300 w-full md:w-1/5 mb-2 md:mb-0'>Reason for change:</label>
                        <input type="text" className="w-full md:w-4/5 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg text-black dark:text-gray-300" />
                    </div>

                    <div className='flex justify-end'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LabChange;
