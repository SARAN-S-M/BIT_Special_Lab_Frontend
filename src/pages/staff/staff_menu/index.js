import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function NavigationBar({ active }) {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className='flex relative'>
      <Sidebar 
        sidebarToggle={sidebarToggle} 
        setSidebarToggle={setSidebarToggle} 
        active={active} 
      />
      <Navbar 
        sidebarToggle={sidebarToggle} 
        setSidebarToggle={setSidebarToggle} 
      />
    </div>
  );
}

export default NavigationBar;
