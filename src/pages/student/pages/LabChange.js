import React, { useEffect, useState } from 'react';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LabChange() {
    const [isLoading, setIsLoading] = useState(false);

    const [labs, setLabs] = useState([
        { id: 1, specialLabCode: '01', specialLabName: "Lab 1"},
        { id: 2, specialLabCode: '02', specialLabName: "Lab 2"},
        { id: 3, specialLabCode: '03', specialLabName: "Lab 3"},
        { id: 4, specialLabCode: '10', specialLabName: "Lab.."} // Example showing lab numbers are not sequential
    ]);

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const response = await Request(
                    'GET', 
                    '/speciallabs/getlabsNames', 
                    null
                );
                setLabs(response.data.labs.map((lab) => ({
                    id: lab.hashedId,
                    specialLabCode: lab.specialLabCode,
                    specialLabName: lab.specialLabName
                })));
            } catch (error) {
                toast.error('Failed to fetch labs.');
            }
        };
        fetchLabs();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setIsLoading(true);
        try {
            // Assuming you have the selected lab and reason in state
            const selectedLabCode = event.target.elements.lab.value;
            const reason = event.target.elements.reason.value;

            const response = await Request(
                'POST',
                '/speciallabs/student-changeLab-request',
                { specialLabCode: selectedLabCode, reason: reason }
            );

            if (response.status === 200) {
                toast.success('Lab change request submitted successfully.');
            } else {
                toast.error('Failed to submit lab change request.');
            }
        } catch (error) {
            toast.error('Failed to submit lab change request.');
        } finally {
            // setIsLoading(false);
        }
    };

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

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center'>
                            <label className='text-base md:text-lg text-black dark:text-gray-300 w-full md:w-1/5 mb-2 md:mb-0'>New Special Lab:</label>
                            <select name="lab" className="w-full md:w-4/5 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg text-black dark:text-gray-300 px-2">
                                {labs.map((lab) => (
                                    <option value={lab.specialLabCode} key={lab.id}>{lab.specialLabName} - {lab.specialLabCode}</option>
                                ))}
                            </select>
                        </div>

                        <div className='mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center'>
                            <label className='text-base md:text-lg text-black dark:text-gray-300 w-full md:w-1/5 mb-2 md:mb-0'>Reason for change:</label>
                            <input name="reason" type="text" className="w-full md:w-4/5 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg text-black dark:text-gray-300 px-2" />
                        </div>

                        <div className='flex justify-end'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:px-6 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LabChange;
