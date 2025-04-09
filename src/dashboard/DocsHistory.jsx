import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import useAppStore from "../store/useAppStore";
import DocsForClient from "./Table/DocsForClient";

const DocsHistory = () => {
  const { user } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter documents for client only
  const clientDocs = useMemo(() => {
    return user.docs.filter((doc) => doc.forClient === "true");
  }, [user.docs]);

  return (
    <div className="p-6 w-full mx-auto bg-[#1A114A]">
      <h3 className="font-[700] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-start py-8 bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
        Document History
      </h3>

      <div className="space-y-12">
        {/* Search bar */}
        {/* <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="pl-10 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gradient-to-br from-indigo-800 to-indigo-900 text-white"
          />
        </div> */}

        {/* Documents shared for clients */}
        <DocsForClient 
          documents={clientDocs.filter(doc => 
            doc.docName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.date?.toLowerCase().includes(searchTerm.toLowerCase())
          )} 
        />
      </div>
    </div>
  );
};

export default DocsHistory;