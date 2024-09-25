import React, { useState, useEffect } from 'react';
import NavigationBar from '../admin_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SpecialLabs() {
    const [sidebarToggle, setSidebarToggle] = useState(true);

    return (
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="specialLabs" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        </div>
    );
}

export default SpecialLabs;