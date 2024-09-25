import bitlogo from '../../assert/BIT-logo-light-mode.png';
import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Request } from '../../networking/index';
import { useState } from 'react';

function Login() {

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Login Success: ', tokenResponse);
      try {
        const userInfoRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers : {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          });
        
        const { name, email } = userInfoRes.data;

        const tokenRes = await Request(
          'POST',
          '/user/login',
          { name, email },
          null
        );

        const { token, role } = tokenRes.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);

        redirect(role);

      } catch (error) {
        console.log('Error: ', error);
      }
    },
    onError: () => console.log('Login Failed'),
  });

  const redirect = (userRole) => {
    switch (userRole) {
      case "admin":
        window.location.href = "/admin";
        break;
      case "staff":
        window.location.href = "/staff";
        break;
      case "student":
        window.location.href = "/student/LabBooking";
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    document.title = "Login Page";

    if (userRole !== null && authToken !== null){
        redirect(userRole);
    }
  }, []);


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
    <div className="flex items-center justify-center h-screen bg-blue-200 dark:bg-black">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
          <p className='text-2xl font-normal'>BIT Special Lab Portal</p>
          <img src={bitlogo} alt="Logo" className="mt-2" />
        </div>
        <button onClick={login} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
          Sign in with Google 🚀
        </button>
        <button onClick={toggleTheme} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
          change theme
        </button>
        <p className="text-center text-gray-600">Welcome to BIT Special Lab Portal</p>
      </div>
    </div>
  );
}

export default Login;


// import React from 'react';
// import bitlogo from '../../assert/BIT-logo-light-mode.png';
// import { FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';

// function Login({ darkMode, toggleDarkMode, userLoggedIn, handleLogout }) {
//   const handleProfileClick = () => {
//     // Function to handle user profile button click
//   };

//   return (
//     <nav className="flex justify-between items-center bg-blue-400 p-4">
//       {/* Left side - Logo and Title */}
//       <div className="flex items-center">
//         <img src={bitlogo} alt="BIT Logo" className="h-8 mr-2" />
//         <span className="text-white text-lg font-semibold">BIT SPECIAL LAB PORTAL</span>
//       </div>

//       {/* Center - Search Box (To be implemented) */}
//       <div>
//         {/* Search Box will be implemented here */}
//       </div>

//       {/* Right side - Dark Mode and User Profile */}
//       <div className="flex items-center">
//         {/* Dark Mode Button */}
//         <button
//           onClick={toggleDarkMode}
//           className="text-white mr-4 focus:outline-none"
//           title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//         >
//           {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
//         </button>

//         {/* User Profile Button */}
//         <button
//           onClick={handleProfileClick}
//           className="text-white flex items-center focus:outline-none"
//           title="User Profile"
//         >
//           <FiUser size={20} />
//           {userLoggedIn && (
//             <div className="absolute bg-white p-2 rounded shadow-md mt-10 right-0">
//               <button
//                 onClick={handleLogout}
//                 className="text-red-500 hover:text-red-700 text-sm flex items-center"
//               >
//                 <FiLogOut size={18} className="mr-1" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Login;
