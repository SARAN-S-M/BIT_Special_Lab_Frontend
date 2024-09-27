import React from 'react';
import { FaHome, FaUserGraduate, FaClipboardList, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ sidebarToggle, setSidebarToggle, active }) {
  return (
    <div className={`z-20 w-3/4 sm:w-64 fixed h-full px-4 py-2 border border-gray-500 ${sidebarToggle ? 'block' : 'hidden'} bg-white dark:bg-gray-800`}>
      <div className='my-2 mb-4 flex justify-between gap-5 w-full'>
        <div className="flex items-center justify-center w-4/5">
          <h1 className='text-xl text-black text-center dark:text-white font-bold truncate'>BIT SPECIAL LABS</h1>
        </div>
        <FaTimes
          className='dark:text-white border border-black dark:border-white w-6 h-6 p-0.5 rounded-lg cursor-pointer'
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
      </div>
      <hr className='border-t border-black dark:border-white' />
      <ul className='mt-3 text-black dark:text-white font-bold'>
        <li className='mb-2'>
          <Link to="/faculty/" className={`flex items-center gap-x-3 p-2 rounded-md hover:shadow hover:bg-blue-500 hover:text-white ${active === 'SpecialLab' ? 'border-2 border-blue-700' : ''}`}>
            <FaHome className="w-5 h-5" />
            Special Lab
          </Link>
        </li>
        <li className='mb-2'>
          <Link to="/faculty/StudentInterview" className={`flex items-center gap-x-3 p-2 rounded-md hover:shadow hover:bg-blue-500 hover:text-white ${active === 'StudentInterview' ? 'border-2 border-blue-700' : ''}`}>
            <FaUserGraduate className="w-5 h-5" />
            Student Interview
          </Link>
        </li>
        <li className='mb-2'>
          <Link to="/faculty/StudentRegistration" className={`flex items-center gap-x-3 p-2 rounded-md hover:shadow hover:bg-blue-500 hover:text-white ${active === 'StudentRegistration' ? 'border-2 border-blue-700' : ''}`}>
            <FaClipboardList className="w-5 h-5" />
            Student Registration
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
