import React, { useState, useEffect } from "react";
import dp from "../assets/Dashboard/dp.png";
import useAppStore from "../store/useAppStore";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useAppStore();
  const [dateRange, setDateRange] = useState("30d");
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDashboardHomePage =
    location.pathname === `/dashboard/${user?.name}` ||
    location.pathname === "/dashboard/";

  return (
    <>
      <header className="sticky top-0 left-0 w-full h-16 bg-[#1A114A] p-4 z-30 rounded-lg">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Hamburger menu - only visible on mobile */}
            {isMobile && (
              <button
                className="p-1 text-white"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>
            )}
            <h1 className="text-sm xl:text-2xl lg:text-xl md:text-lg font-bold text-white">
              DATACOVE AI
            </h1>
          </div>

          {isDashboardHomePage ? (
            <div className="flex space-x-2">
              <select
                className="bg-indigo-800 rounded-md px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm"
                onChange={(e) => setDateRange(e.target.value)}
                value={dateRange}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-[#6c21a8] hover:bg-purple-700 px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm flex items-center">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="hidden md:inline">New Analysis</span>
                <span className="inline md:hidden">New</span>
              </button>
            </div>
          ) : (
            // Only show Back to Dashboard button on other pages
            <Link
              to={`/dashboard/${user?.name}`}
              className="bg-[#382fa3] text-white px-2 py-1 md:px-4 md:py-2 rounded text-xs md:text-sm"
            >
              Back to Dashboard
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
