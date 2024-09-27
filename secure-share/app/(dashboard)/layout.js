"use client"
import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import TopHeader from './_components/TopHeader';

function layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false); 

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="relative">
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <SideNav />
      </div>

      {isSideNavOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 md:hidden bg-white shadow-lg">
          <SideNav />
        </div>
      )}

      <div className={`md:ml-64 transition-all duration-300`}>
        <TopHeader toggleSideNav={toggleSideNav} /> 
        {children}
      </div>
    </div>
  );
}

export default layout;
