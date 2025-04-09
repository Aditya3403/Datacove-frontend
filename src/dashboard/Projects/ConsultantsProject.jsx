import React, { useState, useEffect } from "react";
import { Upload, ArrowLeft, X, Search, Folder } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import DocsForConsultants from "../Table/DocsForConsultants.jsx";
import useAppStore from "../../store/useAppStore.js";

const ConsultantsProject = () => {
  const [files, setFiles] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(() => {
    const savedFolder = localStorage.getItem('selectedConsultantFolder');
    return savedFolder ? JSON.parse(savedFolder) : null;
  });
  const fileInputRef = React.useRef(null);
  const { user } = useAppStore();

  useEffect(() => {
    if (selectedFolder) {
      localStorage.setItem('selectedConsultantFolder', JSON.stringify(selectedFolder));
    } else {
      localStorage.removeItem('selectedConsultantFolder');
    }
  }, [selectedFolder]);

  const fetchReceivedInvitations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard/getRecievedInvitations",
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setReceivedInvitations(response.data.invitations);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      toast.error(error.response?.data?.error || "Failed to load shared folders");
    }
  };

  useEffect(() => {
    fetchReceivedInvitations();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = [...e.target.files];
      setFiles(newFiles);
      
      const newDescriptions = { ...fileDescriptions };
      newFiles.forEach((file) => {
        if (!newDescriptions[file.name]) {
          newDescriptions[file.name] = "";
        }
      });
      setFileDescriptions(newDescriptions);
      toast.success(`${e.target.files.length} file(s) selected`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const newFiles = [...e.dataTransfer.files];
      setFiles(newFiles);
      
      const newDescriptions = { ...fileDescriptions };
      newFiles.forEach((file) => {
        if (!newDescriptions[file.name]) {
          newDescriptions[file.name] = "";
        }
      });
      setFileDescriptions(newDescriptions);
      toast.success(`${e.dataTransfer.files.length} file(s) selected`);
    }
  };

  const uploadFiles = async () => {
    if (!selectedFolder) {
      toast.error("No folder selected");
      return;
    }
  
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }
    
    const missingDescriptions = files.filter(file => 
      !fileDescriptions[file.name]?.trim()
    );
    
    if (missingDescriptions.length > 0) {
      toast.error("Please add descriptions for all files");
      return;
    }
  
    const senderId = user.invitationsReceived.length > 0 
      ? user.invitationsReceived[0].inviterId 
      : null;
  
    setIsUploading(true);
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("files", file);
    });
  
    formData.append("descriptions", JSON.stringify(fileDescriptions));
    formData.append("folderId", selectedFolder._id);
    
    if (senderId) {
      formData.append("senderId", senderId);
    }
    
    formData.append("clientId", user._id);
    
    console.log("Client Id", user._id);
    console.log("Sender Id:", senderId);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload/shareWithConsultant",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200) {
        toast.success("Files uploaded successfully");
        setFiles([]);
        setFileDescriptions({});
        fetchReceivedInvitations();
        if (refreshFolders) refreshFolders();
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.error || "Failed to upload files");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  return (
    <div className="space-y-6 p-6 bg-[#2E1D6A]">
      {selectedFolder && (
        <button
          onClick={handleBackToFolders}
          className="flex items-center gap-2 text-white hover:text-[#00DFA2] transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Consultants
        </button>
      )}

      {!selectedFolder && (
        <>
          <div className="relative bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl border border-[#2D2F45] shadow-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Consultants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-indigo-900 text-white placeholder-gray-400 outline-none pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-1 focus:ring-[#00DFA2]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {receivedInvitations.map((invite) => (
              <div
                key={invite._id}
                onClick={() => handleFolderClick(invite)}
                className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl p-6 border border-[#2D2F45] cursor-pointer shadow-lg hover:shadow-xl transition-all hover:border-[#00DFA2]"
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-6 h-6 text-purple-400" />
                  <p className="text-white text-lg font-medium">{invite.senderName}</p>
                </div>
              </div>
            ))}
            {receivedInvitations.length === 0 && (
              <div className="col-span-3 text-center py-10 text-gray-400">
                No Consultants available
              </div>
            )}
          </div>
        </>
      )}

      {selectedFolder && (
        <div className="mt-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">
              Upload to {selectedFolder.senderName}'s Folder
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div 
                className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer ${
                  isDragging ? "border-[#00DFA2] bg-[#00DFA2]/10" : "border-[#3D2C7D]"
                }`}
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              >
                <p className="text-gray-300 text-sm">Drag files or click to select</p>
              </div>
              
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <button
                onClick={uploadFiles}
                disabled={files.length === 0 || isUploading}
                className={`bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-4 py-2 rounded-lg flex items-center gap-2 font-medium ${
                  files.length === 0 || isUploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-[#1E1F2C] rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Files
                  </>
                )}
              </button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="bg-[#2E1D6A] rounded-lg p-4 mb-4 border border-[#3D2C7D]">
              <h3 className="text-white font-medium mb-2">Selected Files:</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 bg-indigo-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-white text-sm font-medium">
                        {file.name} ({(file.size / 1024).toFixed(2)}KB)
                      </div>
                      <button 
                        onClick={() => {
                          const newFiles = [...files];
                          newFiles.splice(index, 1);
                          setFiles(newFiles);
                        }}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Description:</label>
                      <input
                        type="text"
                        placeholder="File description"
                        value={fileDescriptions[file.name] || ""}
                        onChange={(e) => setFileDescriptions(prev => ({
                          ...prev,
                          [file.name]: e.target.value
                        }))}
                        className="w-full p-2 text-sm bg-indigo-800 border border-[#3D2C7D] rounded text-white focus:ring-1 focus:ring-[#00DFA2]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DocsForConsultants
            selectedFolder={selectedFolder} 
            refreshFolders={fetchReceivedInvitations} 
          />
        </div>
      )}
    </div>
  );
};

export default ConsultantsProject;