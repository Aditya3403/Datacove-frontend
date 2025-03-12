import React from "react";
import left from "../assets/Dashboard/board-1.png";
import right from "../assets/Dashboard/board-2.png";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import DashboardContent from "./DashboardContent";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#060b27]">
      {/* <div className="flex-1 ml-[23rem] mr-[2rem] gap-8 flex flex-col my-[1rem]  bg-[#060b27]">
        <NavBar />
        <Outlet />
      </div> */}
      {/* Fixed Sidebar */}
      {/* <SideBar /> */}

      {/* Main Content Area */}
      
    </div>
  );
};

export default Dashboard;
