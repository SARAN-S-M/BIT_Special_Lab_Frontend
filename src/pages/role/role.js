import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Request } from '../../networking';

const Role = () => {
  const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const navigate = useNavigate(); // For redirection after login

  // Function to handle login and backend request
  const handleLogin = async (email) => {
    try {
      const tokenRes = await Request(
        'POST',
        '/user/login',
        { name, email: email },
        null
      );

      // Extract token and role from response
      const { token, role } = tokenRes.data;

      // Set token and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      // Redirect based on role (student, faculty, mentor, admin)
      redirectUser(role);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Redirect function based on role
  const redirectUser = (role) => {
    switch (role) {
      case 'student':
        navigate('/student');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      case 'mentor':
        navigate('/mentor');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/login');
    }
  };

  return (
    <div className="h-screen p-6 dark:bg-slate-600">
      <div className="flex justify-center mb-8 ">
        <h1 className="text-3xl font-bold text-black dark:text-white">Select Your Role</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {/* Student Button */}
        <button
          onClick={() => handleLogin('student@bitsathy.ac.in')}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow text-lg font-semibold text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:border-blue-500 hover:dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          Student
        </button>

        {/* Faculty Button */}
        <button
          onClick={() => handleLogin('faculty@bitsathy.ac.in')}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow text-lg font-semibold text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:border-blue-500 hover:dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          Faculty
        </button>

        {/* Mentor Button */}
        <button
          onClick={() => handleLogin('mentor@bitsathy.ac.in')}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow text-lg font-semibold text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:border-blue-500 hover:dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          Mentor
        </button>

        {/* Admin Button */}
        <button
          onClick={() => handleLogin('admin@bitsathy.ac.in')}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow text-lg font-semibold text-black dark:text-white bg-gray-100 dark:bg-gray-800 hover:border-blue-500 hover:dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Role;
