import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, ArrowUpDown, FileText, Trash2, Info } from "lucide-react";
import axios from "axios";
import useAppStore from "../../store/useAppStore";
import { toast } from "react-hot-toast";

const DocsForConsultants = ({ selectedFolder, refreshFolders }) => {
  const { user, setUser } = useAppStore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [sharedDocs, setSharedDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropdownRef = useRef(null);

  const fetchSharedDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/upload/getSharedDocs",
        { 
          withCredentials: true,
          params: { userId: user._id }
        }
      );
      console.log("Raw document data:", response.data.sharedDocs);
      return response.data.sharedDocs || [];
    } catch (error) {
      console.error("Error fetching shared documents:", error);
      toast.error("Failed to fetch shared documents");
      return [];
    }
  };

  const deleteSharedDocument = async (docId, docData) => {
    setDeleteLoading(true);
    setDeletingId(docId);
  
    try {
      if (!docData?.fileUrl) {
        throw new Error("Document URL is missing");
      }
  
      let s3Key;
      try {
        const url = new URL(docData.fileUrl);
        s3Key = url.pathname.substring(1);
      } catch (e) {
        const decodedUrl = decodeURIComponent(docData.fileUrl);
        s3Key = decodedUrl.includes(`${user.s3Bucket}.s3.amazonaws.com/`) ?
          decodedUrl.split(`${user.s3Bucket}.s3.amazonaws.com/`)[1] :
          decodedUrl.split(`${user.s3Bucket}.s3.amazonaws.com%2F`)[1];
      }
  
      setSharedDocs(prevDocs => prevDocs.filter(doc => doc.docId !== docId));
  
      const response = await axios.delete(
        `http://localhost:3000/api/v1/upload/deleteSharedDoc`, 
        {
          data: {
            docId: docId,
            userId: user._id,
            s3Key: s3Key
          },
          withCredentials: true
        }
      );
  
      if (!response.data.success) {
        throw new Error("Delete operation failed on server");
      }
  
      toast.success("Document removed successfully");
      
      const docs = await fetchSharedDocuments();
      setSharedDocs(docs);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "Failed to remove shared document"
      );
      
      const docs = await fetchSharedDocuments();
      setSharedDocs(docs);
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
  }, [selectedFolder]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedFile(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDateWithDay = (dateString) => {
    if (!dateString) return "Unknown date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return `${dayName}, ${formattedDate}`;
  };

  const clientDocs = useMemo(() => {
    return sharedDocs.map((doc, index) => ({
      ...doc,
      SrNo: index + 1,
      Name: doc.name || doc.docName || "Unnamed Document",
      date: formatDateWithDay(doc.date || doc.uploadedAt),
      link: doc.fileUrl || doc.docUrl || "#",
      docId: doc.docId,
      description: doc.description || "No description provided",
      uploadedByName: doc.uploadedByName || "Unknown"
    }));
  }, [sharedDocs]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "SrNo",
        header: "SR NO",
        cell: ({ row }) => (
          <div className="text-center text-gray-300">{row.index + 1}</div>
        ),
        size: 70,
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
            <button 
              className="ml-2 text-gray-400 hover:text-purple-400"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(row.original);
              }}
            >
            </button>
          </div>
        ),
      },
      {
        accessorKey: "uploadedByName",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer text-gray-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UPLOADED BY
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-gray-300">
            {row.original.uploadedByName}
          </div>
        ),
        size: 150,
      },
      {
        accessorKey: "date",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer text-gray-300"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DAY & DATE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-gray-300">
            {row.original.date}
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
              onClick={() => deleteSharedDocument(row.original.docId, row.original)}
              className="text-red-400 hover:text-red-600 transition-colors"
              title="Remove from shared documents"
              disabled={deleteLoading && deletingId === row.original.docId}
            >
              {deleteLoading && deletingId === row.original.docId ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-red-400 rounded-full animate-spin"></div>
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </button>
          </div>
        ),
      }
    ],
    [deleteLoading, deletingId]
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

  if (loading && sharedDocs.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00DFA2]"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-indigo-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-2">{selectedFile.Name}</h3>
            <div className="bg-[#241956] p-4 rounded-lg mb-4">
              <p className="text-white">{selectedFile.description}</p>
            </div>
            <div className="text-sm text-gray-400 mb-4">
              Uploaded on: {selectedFile.date}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedFile(null)}
                className="bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search documents..."
          className="pl-10 p-3 border border-[#3D2C7D] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00DFA2] bg-indigo-900 text-white"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-[#3D2C7D] shadow-xl bg-gradient-to-br from-indigo-800 to-indigo-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#3D2C7D]">
            <thead className="bg-indigo-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-[#00DFA2] uppercase tracking-wider"
                      style={{ width: header.column.columnDef.size }}
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
            <tbody className="divide-y divide-[#3D2C7D]">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#382870] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-white"
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
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FileText className="h-12 w-12 mb-2" />
                      <p className="text-lg">No documents found</p>
                      <p className="text-sm">Upload files to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        {clientDocs.length > 0 ? (
          <>Showing {table.getRowModel().rows.length} of {clientDocs.length} documents</>
        ) : (
          <>No documents in this project</>
        )}
      </div>
    </div>
  );
};

export default DocsForConsultants;