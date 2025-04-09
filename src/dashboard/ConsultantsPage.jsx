import React, { useState, useEffect } from "react";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import useAppStore from "../store/useAppStore";

const ConsultantsPage = () => {
  const [invitations, setInvitations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc"
  });
  const { user } = useAppStore();

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard/getConsultants",
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data.invitations) {
        setInvitations(response.data.invitations);
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
      toast.error(error.response?.data?.error || "Failed to load invitations");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const sortedInvitations = React.useMemo(() => {
    const sortableInvitations = [...invitations];
    if (sortConfig.key) {
      sortableInvitations.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableInvitations;
  }, [invitations, sortConfig]);

  const filteredInvitations = sortedInvitations.filter(invitation => 
    invitation.inviterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invitation.inviterEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invitation.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return null;
    }
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="w-4 h-4" /> : 
      <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 p-6 bg-[#2E1D6A]">
      <h1 className="text-2xl font-bold text-white mb-6">Your Consultant's</h1>
      

      {/* Consultants table */}
      <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl border border-[#2D2F45] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-700">
            <thead>
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("inviterName")}
                >
                  <div className="flex items-center gap-2">
                    Consultant Name
                    {getSortIcon("inviterName")}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("inviterEmail")}
                >
                  <div className="flex items-center gap-2">
                    Email
                    {getSortIcon("inviterEmail")}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon("status")}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  <div className="flex items-center gap-2">
                    Date Received
                    {getSortIcon("createdAt")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-700">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                    <div className="flex justify-center items-center">
                      <div className="w-6 h-6 border-t-2 border-r-2 border-[#00DFA2] rounded-full animate-spin mr-2"></div>
                      Loading invitations...
                    </div>
                  </td>
                </tr>
              ) : filteredInvitations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                    No invitations found
                  </td>
                </tr>
              ) : (
                filteredInvitations.map((invitation) => (
                  <tr key={invitation._id} className="hover:bg-indigo-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {invitation.inviterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {invitation.inviterEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invitation.status === "accepted" 
                          ? "bg-green-500/20 text-green-400"
                          : invitation.status === "declined"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(invitation.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultantsPage;