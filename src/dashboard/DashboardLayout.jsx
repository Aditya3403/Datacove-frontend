import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-full bg-[#0A0B1C]">
      <NavBar />
      {/* Main Content Area */}
      <div className="flex flex-row h-full">
        {/* Sidebar with fixed width */}
        <div className="w-64 flex-shrink-0">
          <SideBar/>
        </div>
        {/* Main Content with proper spacing */}
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
