import React, { useState } from 'react';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { useNavigate } from 'react-router-dom';

function LabBooking() {
    const [dropdownItems, setDropdownItems] = useState([
        { id: 1, label: "Lab 1", link: "#" },
        { id: 2, label: "Lab 2", link: "#" },
        { id: 3, label: "Lab 3", link: "#" },
        { id: 4, label: "Lab 4", link: "#" }
    ]);

    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDropdownClick1 = () => {
        setShowDropdown1(!showDropdown1);
    };

    const handleDropdownClick2 = () => {
        setShowDropdown2(!showDropdown2);
    };

    const navigate = useNavigate();

    return (
        <div className="h-screen bg-white min-w-60 dark:bg-gray-900 relative">
            {isLoading && (
                <div className='absolute z-30 w-full h-full bg-black bg-opacity-20'>
                    <Loading />
                </div>
            )}

            <nav>
                <NavigationBar active="Special_Labs" />
            </nav>
            
            <section className='p-5'>
                <div className='w-full flex flex-col gap-4'>
                    <button
                        onClick={handleDropdownClick1}
                        id="dropdownHoverButton"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between border border-blue-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-blue-800 w-full"
                        type="button"
                    >
                        <span className='min-w-10 truncate'>IT Special Labs</span>
                        <svg className={`w-2.5 h-2.5 transform transition-transform duration-300 ${showDropdown1 ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>

                    <div id="dropdownHover" className={`relative w-full z-10 divide-y divide-gray-100 rounded-lg shadow mt-2 transition-opacity duration-300 flex flex-col gap-3 ${showDropdown1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        <ul className='flex flex-col gap-4'>
                            {dropdownItems.map((item, index) => (
                                <div key={index}>
                                    <li className='bg-white border border-black px-4 py-2 rounded-md dark:text-white dark:border-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white min-w-10 truncate' onClick={() => navigate(`/student/LabBooking/${index}`)}>
                                        {index + 1}. {item.label}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className='w-full relative'>
                        <button
                            onClick={handleDropdownClick2}
                            id="dropdownHoverButton"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between border dark:border-blue-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-blue-800 w-full"
                            type="button"
                        >
                            <span className='min-w-10 truncate'>Non - IT Special Labs</span>
                            <svg className={`w-2.5 h-2.5 transform transition-transform duration-300 ${showDropdown2 ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>

                        <div id="dropdownHover" className={`relative w-full z-10 divide-y divide-gray-100 rounded-lg shadow mt-2 transition-opacity duration-300 flex flex-col gap-3 ${showDropdown2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            <ul>
                                {dropdownItems.map((item, index) => (
                                    <div key={item.id}>
                                        <li className='bg-white border border-black dark:border-white hover:border-blue-300 mt-4 px-4 py-2 rounded-md dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white min-w-10 truncate' onClick={() => navigate(`/student/LabBooking/${index}`)}>
                                            {index + 1}. {item.label}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LabBooking;
