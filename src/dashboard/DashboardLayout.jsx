import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  // Track mobile state to adjust layout
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1280;
      setIsMobile(newIsMobile);
      
      // Auto-close sidebar when switching to desktop
      if (!newIsMobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row min-h-screen bg-[#ebeff9]">
      
      {/* Sidebar */}
      <div className={`${isMobile ? 'absolute z-40' : 'w-65'} min-h-screen flex-shrink-0`}>
          <SideBar 
            isMobile={isMobile} 
            isMobileMenuOpen={isSidebarOpen} 
            setIsMobileMenuOpen={setIsSidebarOpen} 
          />
        </div>
        
        {/* Dark overlay when sidebar is open on mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen w-full relative">
        <div className="p-4 rounded-md">
          <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        {/* Main Content */}
        <div className={`h-full p-4 rounded-md ${isMobile ? 'w-full' : 'w-full flex-1'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;