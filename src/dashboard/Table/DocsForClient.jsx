import React, { useState, useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, ArrowUpDown, FileText, Trash2 } from "lucide-react";
import useAppStore from "../../store/useAppStore";
import axios from "axios";
import { toast } from "react-hot-toast";

const DocsForClient = () => {
  const { user } = useAppStore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [sharedDocs, setSharedDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false); // Add this line
  const [deletingId, setDeletingId] = useState(null); // Add this line
  
  // Function to fetch shared documents
  const fetchSharedDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/upload/sharedDocs",
        { withCredentials: true }
      );
      console.log(response)
      return response.data.sharedDocs;
    } catch (error) {
      console.error("Error fetching shared documents:", error);
      toast.error("Failed to fetch shared documents");
      return [];
    }
  };
  const deleteSharedDocument = async (docId) => {
    setDeleteLoading(true);
    setDeletingId(docId);
    
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/upload/deleteSharedDoc/${docId}`,
        {
          withCredentials: true,
          data: { userId: user._id } // Send userId in request body
        }
      );
  
      if (response.data.success) {
        // Update local state
        setSharedDocs(prev => prev.filter(doc => doc.docId !== docId));
        toast.success(response.data.message);
        
        // Optional: Refresh data if needed
        fetchSharedDocuments();
        
        return true;
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to remove shared document"
      );
      return false;
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const loadSharedDocuments = async () => {
      setLoading(true);
      const docs = await fetchSharedDocuments();
      setSharedDocs(docs);
      setLoading(false);
    };
    
    loadSharedDocuments();
  }, []);

  // Filter docs for client only and add SrNo
  const clientDocs = useMemo(() => {
    // Use either fetched sharedDocs or fallback to empty array
    const docsToUse = sharedDocs.length > 0 ? sharedDocs : [];
    
    return docsToUse.map((doc, index) => ({
      ...doc,
      SrNo: index + 1,
      Name: doc.docName || "Unnamed Document",
      date: doc.date || new Date().toISOString().split('T')[0],
      email: doc.clientId || "N/A",
      link: doc.docUrl || "#"
    }));
  }, [sharedDocs]); 

  const columns = useMemo(
    () => [
      {
        accessorKey: "SrNo",
        header: "SR NO",
        cell: ({ row }) => (
          <div className="text-gray-300">{row.index + 1}</div>
        ),
      },
      {
        accessorKey: "Name",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer text-gray-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DOCUMENT NAME
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center text-white">
            <FileText className="mr-2 h-4 w-4 text-purple-400" />
            {row.original.Name}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer text-gray-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CLIENT EMAIL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-gray-300">
            {row.original.email}
          </div>
        ),
      },
      {
        accessorKey: "link",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer text-gray-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DOCUMENT LINK
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-gray-300">
            <a 
              href={row.original.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              View Document
            </a>
          </div>
        ),
      },
      {
        accessorKey: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              onClick={() => deleteSharedDocument(row.original.docId)}
              className="text-red-400 hover:text-red-600 transition-colors"
              title="Remove from shared documents"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: clientDocs,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <div className="mt-[2rem] w-full mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Shared Documents</h1>
        <div className="text-gray-400">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="mt-[2rem] w-full mx-auto ">
      <h1 className="text-2xl font-bold text-white mb-6">Shared Documents</h1>

      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search documents..."
          className="pl-10 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gradient-to-br from-indigo-800 to-indigo-900 text-white"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md bg-gradient-to-br from-indigo-800 to-indigo-900">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-indigo-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gradient-to-br from-indigo-800 to-indigo-900 divide-y divide-gray-700">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  No shared documents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Showing {table.getRowModel().rows.length} of {clientDocs.length}{" "}
        documents
      </div>
    </div>
  );
};

export default DocsForClient;