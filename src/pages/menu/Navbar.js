import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaUserCircle, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Logout } from '../../AppRoutes';

function Navbar({ sidebarToggle, setSidebarToggle }) {
  const [theme, setTheme] = useState('light');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = () => {
    navigate('/');
    Logout();
  };

  return (
    <nav className='flex justify-between items-center w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-500'>
      <div className='flex items-center'>
        <FaBars
          className='text-black me-4 cursor-pointer dark:text-white w-6 h-6'
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <div className='font-mono font-bold truncate hidden md:block dark:text-white'>
          BIT SPECIAL LABS
        </div>
      </div>

      <div className='flex items-center gap-x-4'>
        <div>
          {theme === 'light' ? (
            <FaSun className='w-6 h-6 text-black cursor-pointer' onClick={toggleTheme} />
          ) : (
            <FaMoon className='w-6 text-white h-6 cursor-pointer' onClick={toggleTheme} />
          )}
        </div>

        <FaBell className='w-6 h-6 text-black dark:text-white cursor-pointer' />

        <div className='relative' ref={dropdownRef}>
          <button
            className='text-white'
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <FaUserCircle className='w-6 h-6 text-black dark:text-white' />
          </button>
          {dropdownVisible && (
            <div className='z-10 absolute rounded-lg shadow w-32 top-full right-0 dark:bg-white' onClick={handleLogout}>
              <ul className='bg-white py-2 text-sm font-semibold rounded-lg text-gray-800 dark:bg-gray-800 hover:text-custom-blue dark:text-white border border-gray-500 hover:border-custom-blue'>
                <li className="text-center cursor-pointer">
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
