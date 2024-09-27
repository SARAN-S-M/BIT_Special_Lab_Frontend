import React, { useState, useEffect } from 'react';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Request } from '../../../networking/index';

function LabBooking() {
    const [labs, setLabs] = useState([
        { id: 1, specialLabCode: '01', specialLabName: "Lab 1"},
        { id: 2, specialLabCode: '02', specialLabName: "Lab 2"},
        { id: 3, specialLabCode: '03', specialLabName: "Lab 3"},
        { id: 4, specialLabCode: '10', specialLabName: "Lab.."} // Example showing lab numbers are not sequential
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter labs based on the search input
    const filteredLabs = labs.filter(lab => 
        lab.specialLabName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lab.specialLabCode.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    useEffect(() => {
        const fetchLabs = async () => {
            // console.log('Fetching labs...');
            try {
                const response = await Request(
                    'GET', 
                    '/speciallabs/getlabsNames', 
                    null
                );
                setLabs(response.data.labs);
            setLabs(response.data.labs.map((lab, index) => ({
                id: lab.hashedId,
                specialLabCode: lab.specialLabCode,
                specialLabName: lab.specialLabName
            })));
            // console.log('Fetched labs.');
            } catch (error) {
                toast.error('Failed to fetch labs.');
            }
        };
        fetchLabs();
    }, []);
    

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
                        {filteredLabs.map((lab, index) => (
                            <li 
                                key={lab.id} 
                                className='bg-white border border-black px-4 py-2 rounded-md dark:text-white dark:border-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white min-w-10 truncate cursor-pointer'
                                onClick={() => navigate(`/student/LabBooking/${lab.id}`)}
                            >
                                {`${index + 1} ${lab.specialLabName} - ${lab.specialLabCode}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default LabBooking;