import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, ArrowUpDown, FileText, Trash2, Share2, Info } from "lucide-react";
import useAppStore from "../../store/useAppStore";
import axios from "axios";

const DocsForUser = ({ folderId, onFileUpload }) => {
  const { user, setUser } = useAppStore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [folderFiles, setFolderFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeShareDropdown, setActiveShareDropdown] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (folderId) {
      fetchFolderFiles();
    }
  }, [folderId, user, onFileUpload]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveShareDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchFolderFiles = async () => {
    setLoading(true);
    try {
      // Find the selected folder in user's folders array
      const foundFolder = user.folders?.find(folder => folder._id === folderId);
      
      if (foundFolder && foundFolder.files) {
        setFolderFiles(foundFolder.files);
      } else {
        setFolderFiles([]);
      }
    } catch (error) {
      console.error("Error fetching folder files:", error);
      setFolderFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete file from database and S3
  const deleteFile = async (fileId, s3Path) => {
    setDeleteLoading(true);
    try {
      // Extract the key from the S3 path
      const s3Key = s3Path.split('.com/')[1];
      
      const response = await axios.post('http://localhost:3000/api/v1/upload/deleteFile', {
        userId: user._id,
        folderId: folderId,
        fileId: fileId,
        s3Key: s3Key
      });

      if (response.data.success) {
        // Update the local state
        setUser(response.data.user);
        // Refresh the folder files
        fetchFolderFiles();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Function to toggle share dropdown
  const toggleShareDropdown = (fileId, s3Path) => {
    if (activeShareDropdown === fileId) {
      setActiveShareDropdown(null);
    } else {
      setActiveShareDropdown(fileId);
      setShareUrl(s3Path);
      setShareEmail("");
    }
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setShareEmail(e.target.value);
  };

  // Function to share file with email
  const shareFileWithEmail = async () => {
    if (!shareEmail || !shareUrl) {
      alert("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload/shareFile",
        {
          docId: activeShareDropdown, // The file ID
          clientEmail: shareEmail, // The email of the client to share with
          fileName: folderFiles.find((file) => file._id === activeShareDropdown)?.title, // The file name
          fileUrl: shareUrl, // The S3 URL of the file
        },
        { withCredentials: true }
      );
      console.log(response)
      if (response.data.message === 'Document shared successfully') {
        alert("Document shared successfully!");
        setActiveShareDropdown(null);
      } else {
        alert("Failed to share document. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing file:", error);
      alert("An error occurred while sharing the document.");
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "Sr No",
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
        size: 70,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Document Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4 text-[#00DFA2]" />
            <span className="font-medium">{row.original.title}</span>
            {row.original.description && (
              <button 
                className="ml-2 text-gray-400 hover:text-[#00DFA2]"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(row.original);
                }}
              >
                <Info className="h-4 w-4" />
              </button>
            )}
          </div>
        ),
      },
      {
        accessorKey: "uploadedAt",
        header: ({ column }) => (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => formatDate(row.original.uploadedAt),
        sortingFn: "datetime",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-4 relative">
            <button
              onClick={() => deleteFile(row.original._id, row.original.s3_path)}
              className="flex items-center text-red-500 hover:text-red-400 transition-colors"
              disabled={deleteLoading}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </button>
            <div className="relative">
              <button
                onClick={() => toggleShareDropdown(row.original._id, row.original.s3_path)}
                className="flex items-center text-[#00DFA2] hover:text-[#00c78f] transition-colors"
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </button>
              
              {activeShareDropdown === row.original._id && (
                <div 
                  ref={dropdownRef}
                  className="fixed bg-indigo-900 rounded-lg shadow-xl border border-[#3D2C7D]"
                  style={{
                    zIndex: 9999,
                    minWidth: '280px',
                    left: `${window.innerWidth < 768 ? '50%' : 'auto'}`,
                    transform: `${window.innerWidth < 768 ? 'translateX(-50%)' : 'none'}`,
                    top: window.innerWidth < 768 ? '50%' : 'auto',
                    right: window.innerWidth < 768 ? 'auto' : '20px'
                  }}
                >
                  <div className="p-4">
                    <h4 className="text-white font-medium mb-2">Share Document</h4>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={shareEmail}
                        onChange={handleEmailChange}
                        placeholder="Enter recipient's email"
                        className="w-full p-2 border border-[#3D2C7D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DFA2] bg-indigo-800 text-white mb-2"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={shareFileWithEmail}
                        className="bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-3 py-1 rounded-lg transition-colors text-sm"
                      >
                        Share
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          alert("Link copied to clipboard!");
                        }}
                        className="bg-[#3D2C7D] hover:bg-[#342368] text-white px-3 py-1 rounded-lg transition-colors text-sm"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ),
      },
    ],
    [deleteLoading, folderId, user._id, activeShareDropdown, shareEmail]
  );

  const table = useReactTable({
    data: folderFiles,
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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00DFA2]"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* File description modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-indigo-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-2">{selectedFile.title}</h3>
            <div className="bg-[#241956] p-4 rounded-lg mb-4">
              <p className="text-white">{selectedFile.description}</p>
            </div>
            <div className="text-sm text-gray-400 mb-4">
              Uploaded on {formatDate(selectedFile.uploadedAt)}
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

      {/* Share modal - keeping this for backwards compatibility */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-indigo-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Share Document</h3>
            <div className="bg-[#241956] p-4 rounded-lg mb-4">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="w-full p-2 border border-[#3D2C7D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DFA2] bg-indigo-800 text-white"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Link copied to clipboard!");
                }}
                className="bg-[#3D2C7D] hover:bg-[#342368] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
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
        {folderFiles.length > 0 ? (
          <>Showing {table.getRowModel().rows.length} of {folderFiles.length} documents</>
        ) : (
          <>No documents in this project</>
        )}
      </div>
    </div>
  );
};

export default DocsForUser;