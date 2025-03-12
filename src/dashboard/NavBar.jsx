import React, { useState } from 'react';
import dp from "../assets/Dashboard/dp.png";
import useAppStore from "../store/useAppStore";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { user } = useAppStore();
  const [dateRange, setDateRange] = useState('30d');
  const location = useLocation();

  const isDashboardHomePage = location.pathname === `/dashboard/${user.name}` || location.pathname === '/dashboard/';
  return (
    <>
      <header className="sticky top-0 left-0 w-full h-16 bg-[#1A114A] border-b border-indigo-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">DATACOVE AI</h1>
          {isDashboardHomePage ? (
            <div className="flex space-x-2">
            <select 
              className="bg-indigo-800 border border-indigo-700 rounded-md px-3 py-2 text-sm"
              onChange={(e) => setDateRange(e.target.value)}
              value={dateRange}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-[#6c21a8] hover:bg-purple-700 px-4 py-2 rounded-md text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              New Analysis
            </button>
          </div>
          ) : (
            // Only show Back to Dashboard button on other pages
            <Link to="/dashboard" className="bg-[#382fa3] text-white px-4 py-2 rounded">
              Back to Dashboard
            </Link>
          )}
        </div>
      </header>
      {/* <div className="flex justify-end gap-6 p-2 items-center">
        <Link to={"/privacypolicy"}>
          <p className="text-[#8F9BB7] text-sm">Privacy Policies</p>
        </Link>
        <Link to={"/termsandcondtion"}>
          <p className="text-[#8F9BB7] text-sm">Terms and conditions</p>
        </Link>

        <div className="flex gap-2">
          <img src={dp} alt="" />
          <p className="font-beVietnam">{user.displayName}</p>
        </div>
      </div> */}
    </>
  );
};

export default NavBar;
