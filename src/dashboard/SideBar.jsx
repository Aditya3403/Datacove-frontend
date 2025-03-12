import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Plus, X } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  
  // Determine which section is active based on the URL path
  const currentPath = location.pathname;
  const isWorkflows = currentPath.includes('/workflows');
  const isReports = currentPath.includes('/reports');
  const isAnalytics = currentPath.includes('/analytics');
  const isSettings = currentPath.includes('/settings');

  const { user, logout } = useAppStore();

  const items = [
    {
      title: "AI Assistance",
      icon: vector,
      data: ["Analysis Law", "Legislative", "RAW document upload"],
    },
    { title: "Legal Research", icon: building },
    { title: "Practical Guidance", icon: edit },
    { title: "Brief Analysis", icon: research },
  ];
  
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  // Render middle section based on active link
  const renderMiddleSection = () => {
    if (isSettings) {
      return null;
    } else if (isWorkflows) {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Status</h3>
          <div className="space-y-1">
            <NavLink
              to={`/dashboard/${user.name}/workflows`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              All Workflows
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/workflows/active`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Active
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/workflows/inactive`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Inactive
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/workflows/drafts`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Drafts
            </NavLink>
          </div>
        </div>
      );
    } else if (isReports) {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-1">
            <NavLink
              to={`/dashboard/${user.name}/reports`}
              end
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              All Categories
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/legal`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Legal
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/recruitment`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Recruitment
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/compliance`}
              className={({ isActive }) => isActive ? "block p-2 bgbg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Compliance
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/marketing`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Marketing
            </NavLink>
          </div>
        </div>
      );
    } else if (isAnalytics) {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Workflow Filter</h3>
          <div className="space-y-1">
            <NavLink
              to={`/dashboard/${user.name}/analytics`}
              end
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              All Workflows
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/legalcontracts`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8]rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Legal Contracts
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/resumescreening`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Resume Screening
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/compliancecheck`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Compliance Check
            </NavLink>
            <NavLink
              to={`/dashboard/${user.name}/reports/policyanalysis`}
              className={({ isActive }) => isActive ? "block p-2 bg-[#6c21a8] rounded" : "block p-2 hover:bg-indigo-700 rounded"}
            >
              Policy Analysis
            </NavLink>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="p-3 bg-indigo-900 rounded-md">
              <p className="text-indigo-300 text-sm">Documents Processed</p>
              <p className="text-xl font-bold">1,243</p>
              <p className="text-xs text-green-400">↑ 8.2% from previous period</p>
            </div>
            <div className="p-3 bg-indigo-900 rounded-md">
              <p className="text-indigo-300 text-sm">Active Workflows</p>
              <p className="text-xl font-bold">5</p>
            </div>
            <div className="p-3 bg-indigo-900 rounded-md">
              <p className="text-indigo-300 text-sm">High Risk Documents</p>
              <p className="text-xl font-bold">142</p>
              <p className="text-xs text-red-400">↑ 3.6% from previous period</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full w-full bg-[#1A114A] flex flex-col overflow-hidden border-r border-indigo-800 p-2">
      {/* Scrollable Sidebar Content */}
      <div className="flex flex-col h-full w-full p-2">
        <nav className="space-y-1">
          <NavLink
            to={`/dashboard/${user.name}`}
            className={({ isActive }) => isActive ? "block p-2 bg-blue-600 rounded" : "block p-2 rounded"}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={`/dashboard/${user.name}/workflows`}
            className={({ isActive }) => isActive ? "block p-2 bg-blue-600 rounded" : "block p-2 hover:bg-blue-500 rounded"}
          >
            My Workflows
          </NavLink>

          <NavLink
            to={`/dashboard/${user.name}/reports`}
            className={({ isActive }) => isActive ? "block p-2 bg-blue-600 rounded" : "block p-2 hover:bg-blue-500 rounded"}
          >
            Recent Reports
          </NavLink>

          <NavLink
            to={`/dashboard/${user.name}/analytics`}
            className={({ isActive }) => isActive ? "block p-2 bg-blue-600 rounded" : "block p-2 hover:bg-blue-500 rounded"}
          >
            Analytics
          </NavLink>

          <NavLink
            to={`/dashboard/${user.name}/settings`}
            className={({ isActive }) => isActive ? "block p-2 bg-blue-600 rounded" : "block p-2 hover:bg-blue-500 rounded"}
          >
            Settings
          </NavLink>
        </nav>

        {/* Dynamic Middle Section */}
        {renderMiddleSection()}
      </div>
      {/* invite client */}
      {user && user.userType !== "client" && (
        <div className="mt-6 flex items-center gap-2 mb-4">
          <input
            type="email"
            placeholder="Enter client email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log("Updated email:", e.target.value);
            }}
            className="w-full py-2 px-3 border border-violet-400/20 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
          />
          <button
            onClick={handleInvite}
            className="p-2 bg-[#251761] hover:bg-[#2f1d7a] rounded-xl transition-colors"
          >
            <MailPlus className="w-5 h-5 text-green-500" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 text-white/80 hover:text-white border border-white/10 p-3 rounded-lg hover:bg-white/5 transition-colors mb-4">
        <Link to={`/dashboard/${user?.name}/reports/report`}>
          <button className="flex items-center gap-2 ">Reports</button>
        </Link>
      </div>

      {user.userType !== "client" && (
        <div className="flex items-center gap-2 text-white/80 hover:text-white border border-white/10 p-3 rounded-lg hover:bg-white/5 transition-colors mb-4">
          <Link to={`/dashboard/${user?.name}/project/projects`}>
            <button className="flex items-center gap-2 ">
              Projects <FolderOpenDot className="w-5 h-5 text-yellow-400" />
            </button>
          </Link>
        </div>
      )}

      {/* History Section */}
      <div className="flex flex-col gap-2 text-white/80 hover:text-white border border-white/10 p-3 rounded-lg hover:bg-white/5 transition-colors mb-[1rem]">
        {/* Header with Animated Icon */}
        <div
          className="flex items-center justify-between py-1 cursor-pointer"
          onClick={() => setHistoryOpen(!isHistoryOpen)}
        >
          <h2 className="text-lg">History</h2>
          <motion.span
            animate={{ rotate: isHistoryOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isHistoryOpen ? <X /> : <ChevronDown />}
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
          {user.userType !== "client" && (
            <div className="flex items-center gap-2 py-2 text-sm">
              <Link
                to={`/dashboard/${user?.name}/history/documents`}
                className="flex items-center gap-2 "
              >
                <FileClock className="h-5 w-5 text-blue-600" /> Docs History
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2 py-2 text-sm">
            <Link
              to={`/dashboard/${user?.name}/history/notes`}
              className="flex items-center gap-2 "
            >
              <NotebookPen className="h-5 w-5 text-blue-600" /> Notes History
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Logout Button */}

      <button
        className="flex items-center gap-2 text-white/80 hover:text-white border border-white/10 p-3 rounded-lg hover:bg-white/5 transition-colors"
        onClick={logout}
      >
        <LogOut className="w-5 h-5 text-red-500" /> Log Out
      </button>
      {/* User Info (Fixed at Bottom) */}
      <div className="p-4 flex items-center bg-[#1A114A]">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
          <span>LC</span>
        </div>
        <span>Louis Carter</span>
      </div>
    </div>
  );
};

export default SideBar;