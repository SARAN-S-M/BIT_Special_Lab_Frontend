import React from 'react';
import { FaHome, FaFlask, FaExchangeAlt, FaCalendarAlt, FaQuestionCircle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ active, sidebarToggle, setSidebarToggle }) {
    const navigate = useNavigate();

    return (
        <div className={` ${sidebarToggle ? "hidden" : "block"} z-20 w-3/4 sm:w-64 bg-white dark:bg-gray-800 light fixed h-full px-4 py-2 border border-gray-500`}>
            <div className='my-2 mb-4 flex justify-between gap-5 w-full'>
                <div className='flex items-center justify-center w-4/5'>
                    <h1 className='text-xl text-black text-center dark:text-white font-bold truncate'>BIT SPECIAL LABS</h1>
                </div>
                <FaTimes className='dark:text-white border border-black dark:border-white w-6 h-6 p-0.5 rounded-lg cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)} />
            </div>
            <hr className='border-t border-black dark:border-white' />
            <ul className='mt-3 text-black dark:text-white font-bold'>
                <li
                    className={` ${active === "home" ? "border-2 border-blue-700" : ""} mb-2 rounded hover:shadow hover:bg-blue-500 py-2 hover:text-white`}
                    onClick={() => navigate('/student/DashBoard')}
                >
                    <div className='px-3 flex items-center cursor-pointer'>
                        <FaHome className='inline-block w-6 h-6 mr-2' />
                        Home
                    </div>
                </li>
                <li
                    className={` ${active === "Special_Labs" ? "border-2 border-blue-700" : ""} mb-2 rounded hover:shadow hover:bg-blue-500 py-2 hover:text-white`}
                    onClick={() => navigate('/student/LabBooking')}
                >
                    <div className='px-3 flex items-center cursor-pointer'>
                        <FaFlask className='inline-block w-6 h-6 mr-2' />
                        Special Labs
                    </div>
                </li>
                <li
                    className={` ${active === "Lab_Change" ? "border-2 border-blue-700" : ""} mb-2 rounded hover:shadow hover:bg-blue-500 py-2 hover:text-white`}
                    onClick={() => navigate('/student/LabChange')}
                >
                    <div className='px-3 flex items-center cursor-pointer'>
                        <FaExchangeAlt className='inline-block w-6 h-6 mr-2' />
                        Lab Change
                    </div>
                </li>
                <li
                    className={` ${active === "Special_Slot_Booking" ? "border-2 border-blue-700" : ""} mb-2 rounded hover:shadow hover:bg-blue-500 py-2 hover:text-white`}
                    onClick={() => navigate('/student/SpecialSlot')}
                >
                    <div className='px-3 flex items-center cursor-pointer'>
                        <FaCalendarAlt className='inline-block w-6 h-6 mr-2' />
                        Special Slot Booking
                    </div>
                </li>
                <li
                    className={` ${active === "Help" ? "border-2 border-blue-700" : ""} mb-2 rounded hover:shadow hover:bg-blue-500 py-2 hover:text-white`}
                    onClick={() => navigate('/student/help')}
                >
                    <div className='px-3 flex items-center cursor-pointer'>
                        <FaQuestionCircle className='inline-block w-6 h-6 mr-2' />
                        Help
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
