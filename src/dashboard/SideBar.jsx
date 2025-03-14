import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { Plus, X, Menu } from "lucide-react";
import { Search } from "lucide-react";
import useAppStore from "../store/useAppStore";
import { LogOut } from "lucide-react";
import { ChevronDown } from "lucide-react";
import building from "../assets/Dashboard/building.png";
import research from "../assets/Dashboard/research.png";
import edit from "../assets/Dashboard/edit.png";
import vector from "../assets/Vector.png";
import { motion, AnimatePresence } from "framer-motion";
import { MailPlus } from "lucide-react";
import { FileClock } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import { FolderOpenDot } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router-dom";
const API_PRODUCTION_URL = "http://localhost:5000";

const SideBar = ({ username }) => {
  const [activeIndex, setActiveIndex] = useState("");
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();
  
  // Determine which section is active based on the URL path
  const currentPath = location.pathname;
  const isWorkflows = currentPath.includes('/workflows');
  const isReports = currentPath.includes('/reports');
  const isAnalytics = currentPath.includes('/analytics');
  const isSettings = currentPath.includes('/settings');

  const { user, logout } = useAppStore();
  const nameParts = user?.displayName?.split(" ") || ["User", "Name"];
  const initials = (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : "")).toUpperCase();
  
  // Check if screen is mobile size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email.");
      return;
    }

    if (email === user.email) {
      toast.error("You cannot invite yourself!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_PRODUCTION_URL}/api/v1/dashboard/invite-client`,
        { userId: user._id, email: email },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Handle clicks outside the profile menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          event.target.closest('.mobile-menu-toggle') === null) {
        setIsMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef, isMobile]);

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Main sidebar content
  const sidebarContent = (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col justify-between min-h-full p-2">
        <nav className="space-y-1 px-1 lg:px-2 pt-1 lg:pt-2">
          <NavLink
            to={`/dashboard/${user?.name}`}
            className={({ isActive }) => isActive 
              ? "block p-1.5 lg:p-2 bg-blue-600 rounded text-sm lg:text-base" 
              : "block p-1.5 lg:p-2 rounded hover:bg-blue-500 text-sm lg:text-base"
            }
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={`/dashboard/${user?.name}/workflows`}
            className={({ isActive }) => isActive 
              ? "block p-1.5 lg:p-2 bg-blue-600 rounded text-sm lg:text-base" 
              : "block p-1.5 lg:p-2 hover:bg-blue-500 rounded text-sm lg:text-base"
            }
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            My Workflows
          </NavLink>

          <NavLink
            to={`/dashboard/${user?.name}/reports`}
            className={({ isActive }) => isActive 
              ? "block p-1.5 lg:p-2 bg-blue-600 rounded text-sm lg:text-base" 
              : "block p-1.5 lg:p-2 hover:bg-blue-500 rounded text-sm lg:text-base"
            }
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            Recent Reports
          </NavLink>

          <NavLink
            to={`/dashboard/${user?.name}/analytics`}
            className={({ isActive }) => isActive 
              ? "block p-1.5 lg:p-2 bg-blue-600 rounded text-sm lg:text-base" 
              : "block p-1.5 lg:p-2 hover:bg-blue-500 rounded text-sm lg:text-base"
            }
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            Analytics
          </NavLink>

          <NavLink
            to={`/dashboard/${user?.name}/settings`}
            className={({ isActive }) => isActive 
              ? "block p-1.5 lg:p-2 bg-blue-600 rounded text-sm lg:text-base" 
              : "block p-1.5 lg:p-2 hover:bg-blue-500 rounded text-sm lg:text-base"
            }
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            Settings
          </NavLink>
        </nav>
  
        <div className="flex flex-col">
          {/* invite client */}
          {user && user.userType !== "client" && (
            <div className="mt-4 lg:mt-5 flex items-center gap-1 lg:gap-2 mb-3 lg:mb-3 px-1 lg:px-2">
              <input
                type="email"
                placeholder="Enter client email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full py-1 lg:py-2 px-2 lg:px-3 text-xs lg:text-sm border border-violet-400/20 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
              />
              <button
                onClick={handleInvite}
                className="p-1 lg:p-2 bg-[#251761] hover:bg-[#2f1d7a] rounded-xl transition-colors"
              >
                <MailPlus className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1 lg:gap-2 text-white/80 hover:text-white border border-white/10 p-2 lg:p-3 rounded-lg hover:bg-white/5 transition-colors mb-3 lg:mb-3 mx-1 lg:mx-2">
            <Link to={`/dashboard/${user?.name}/reports/report`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
              <button className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">Reports</button>
            </Link>
          </div>

          {user?.userType !== "client" && (
            <div className="flex items-center gap-1 lg:gap-2 text-white/80 hover:text-white border border-white/10 p-2 lg:p-3 rounded-lg hover:bg-white/5 transition-colors mb-3 lg:mb-3 mx-1 lg:mx-2">
              <Link to={`/dashboard/${user?.name}/project/projects`} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
                <button className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
                  Projects <FolderOpenDot className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
                </button>
              </Link>
            </div>
          )}

          {/* History Section */}
          <div className="flex flex-col gap-1 lg:gap-2 text-white/80 hover:text-white border border-white/10 p-2 lg:p-3 rounded-lg hover:bg-white/5 transition-colors mb-auto mx-1 lg:mx-2 mt-3 lg:mt-4">
            {/* Header with Animated Icon */}
            <div
              className="flex items-center justify-between py-1 cursor-pointer"
              onClick={() => setHistoryOpen(!isHistoryOpen)}
            >
              <h2 className="text-base lg:text-lg">History</h2>
              <motion.span
                animate={{ rotate: isHistoryOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isHistoryOpen ? <X className="w-4 h-4 lg:w-5 lg:h-5" /> : <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />}
              </motion.span>
            </div>

            {/* Dropdown Animation */}
            <motion.div
              initial={false}
              animate={{
                height: isHistoryOpen ? "auto" : 0,
                opacity: isHistoryOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {user?.userType !== "client" && (
                <div className="flex items-center gap-1 lg:gap-2 py-1 lg:py-2 text-xs lg:text-sm">
                  <Link
                    to={`/dashboard/${user?.name}/history/documents`}
                    className="flex items-center gap-1 lg:gap-2"
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    <FileClock className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" /> Docs History
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-1 lg:gap-2 py-1 lg:py-2 text-xs lg:text-sm">
                <Link
                  to={`/dashboard/${user?.name}/history/notes`}
                  className="flex items-center gap-1 lg:gap-2"
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                  <NotebookPen className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" /> Notes History
                </Link>
              </div>
            </motion.div>
          </div>
          {/* User Info (Fixed at Bottom) with Profile Menu */}
            <div className="p-2 lg:p-3 relative mt-auto" ref={profileMenuRef}>
              <div 
                className="flex items-center bg-[#1A114A] cursor-pointer hover:bg-indigo-800/50 p-1.5 lg:p-2 rounded-lg transition-colors"
                onClick={toggleProfileMenu}
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 text-xs lg:text-sm">
                  <span>{initials}</span>
                </div>
                <span className="flex-1 text-sm lg:text-base truncate">{user?.displayName}</span>
                <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 ${isProfileMenuOpen ? '' : 'rotate-180'}`} />
              </div>
              
              {/* Profile Menu Popup */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full p-2 lg:p-3 absolute bottom-18 left-0 right-0 bg-[#251761] rounded-lg shadow-lg z-20 mx-2"
                    style={{ bottom: isMobile ? "auto" : "100%", top: isMobile ? "100%" : "auto" }}
                  >
                    <div className="p-1 border-b border-indigo-700">
                      <div className="text-xs lg:text-sm text-gray-300">Signed in as</div>
                      <div className="text-xs lg:text-sm font-light truncate">{user?.email || "user@example.com"}</div>
                    </div>
                    <Link 
                      to={`/pricing`} 
                      className="block mt-1 lg:mt-2 p-1.5 lg:p-2 hover:bg-indigo-700 rounded-lg transition-colors text-xs lg:text-sm"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        isMobile && setIsMobileMenuOpen(false);
                      }}
                    >
                      Plans
                    </Link>
                    <Link 
                      to={`/dashboard/${user?.name}/settings`} 
                      className="block p-1.5 lg:p-2 rounded-lg hover:bg-indigo-700 transition-colors text-xs lg:text-sm"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        isMobile && setIsMobileMenuOpen(false);
                      }}
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                        isMobile && setIsMobileMenuOpen(false);
                      }} 
                      className="w-full text-left p-1.5 lg:p-2 text-red-400 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 lg:gap-2 text-xs lg:text-sm"
                    >
                      <LogOut className="w-3 h-3 lg:w-4 lg:h-4" /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          </div>
          
        </div>
  );

  // Mobile menu toggle button
  const mobileMenuToggle = (
    <button 
      className="mobile-menu-toggle relative top-3 left-4 z-50 p-2 bg-indigo-800 rounded-full shadow-lg"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? 
        <X className="w-6 h-6 text-white" /> : 
        <Menu className="w-6 h-6 text-white" />
      }
    </button>
  );

  return (
    <>
      {/* Mobile menu toggle */}
      {isMobile && mobileMenuToggle}
      
      {/* Sidebar for desktop */}
      <div 
        className={`h-full w-full bg-[#1A114A] flex flex-col flex-grow transition-all duration-300
          ${isMobile ? 'hidden' : 'flex'}`}
      >
        {sidebarContent}
      </div>
      
      {/* Mobile sidebar overlay */}
      {isMobile && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      )}
      
      {/* Mobile sidebar */}
      {isMobile && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-[#1A114A] flex flex-col border-r border-indigo-800 z-50 pt-14"
            >
              {sidebarContent}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default SideBar;