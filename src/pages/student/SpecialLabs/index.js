import React, { useState } from 'react';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { useNavigate } from 'react-router-dom';

function LabBooking() {
    const [labs, setLabs] = useState([
        { id: 1, number: '01', label: "Lab 1", link: "#" },
        { id: 2, number: '02', label: "Lab 2", link: "#" },
        { id: 3, number: '03', label: "Lab 3", link: "#" },
        { id: 4, number: '10', label: "Lab..", link: "#" } // Example showing lab numbers are not sequential
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter labs based on the search input
    const filteredLabs = labs.filter(lab => 
        lab.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lab.number.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    

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
                    {/* Search Container */}
                    <input
                        type="text"
                        placeholder="Search Labs..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />

                    {/* Lab List */}
                    <ul className='flex flex-col gap-4 mt-4'>
                        {filteredLabs.map((lab) => (
                            <li 
                                key={lab.id} 
                                className='bg-white border border-black px-4 py-2 rounded-md dark:text-white dark:border-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white min-w-10 truncate cursor-pointer'
                                onClick={() => navigate(`/student/LabBooking/${lab.id}`)}
                            >
                                {`${lab.number} - ${lab.label}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default LabBooking;
