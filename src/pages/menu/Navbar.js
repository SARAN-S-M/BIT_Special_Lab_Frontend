import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch, FaUserCircle, FaBell, FaMoon, FaSun } from 'react-icons/fa';

function Navbar({ sidebarToggle, setSidebarToggle }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load theme from local storage on component mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      // Set initial theme based on user's device preference
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.add(isDarkMode ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={`min-w-60 px-4 py-3 flex justify-between w-full bg-white dark:bg-gray-800  border border-gray-500`}>
      <div className='flex items-center text-xl'>
        <FaBars className='text-black me-4 cursor-pointer dark:text-white w-6 h-6 ' onClick={() => setSidebarToggle(!sidebarToggle)} />
        {/* <div className='text-xl text-black text-center dark:text-white font-bold max-w-44'>
          <div className=" text-clip overflow-hidden">BIT SPECIAL LABS</div>
        </div> */}

        <div className=' dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white min-w-10 max-w-48 font-mono font-bold truncate sm:truncate'>
            BIT SPECIAL LABS
        </div>


        {/* <div className='text-xl text-black text-center dark:text-white font-bold truncate'>BIT SPECIAL LABS</div> */}

      </div>
      <div className='flex items-center gap-x-8'>
        {/* <div className='relative md:w-65'>
          <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-black dark:text-black dark:bg-white md:text-black md:bg-white'><FaSearch/></button>
          </span>
          <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block dark:bg-white dark:text-black border border-gray-950' />
        </div> */}

        <div className='text-white'>
          {theme === 'light' ?
            <FaSun className='w-6 h-6 text-black cursor-pointer' onClick={toggleTheme} /> :
            <FaMoon className='w-6 h-6 cursor-pointer' onClick={toggleTheme} />
          }
        </div>

        <div className='text-white cursor-pointer'><FaBell className='w-6 h-6 text-black dark:text-white' /></div>

        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-6 h-6 mt-1 text-black dark:text-white' />
            <div className='z-10 hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0 dark:bg-white'>
              <ul className=' bg-white py-2 text-sm font-semibold rounded-lg text-gray-800 dark:bg-gray-800 hover:text-custom-blue dark:text-white border border-gray-500 hover:border-custom-blue'>
                <li><a href='###'>Logout</a></li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar