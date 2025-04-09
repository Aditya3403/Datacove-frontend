import React, { useContext, useState, useEffect } from "react";
import { FolderPlus, Upload, ArrowLeft, X, Trash2, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import useAppStore from "../../store/useAppStore.js";
import DocsForUser from "../Table/DocsForUser.jsx";

const CreateProject = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(() => {
    // Retrieve the selected folder ID from localStorage
    return localStorage.getItem("selectedFolder") || null;
  });
  const [files, setFiles] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { clientDocs } = useContext(AppContext);
  const { user, isCheckingAuth, authCheck } = useAppStore();
  const fileInputRef = React.useRef(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit modal
  const [editingFolderId, setEditingFolderId] = useState(null); // Track folder being edited
  const [newFolderName, setNewFolderName] = useState(""); // New name for the folder

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    // Save the selected folder ID to localStorage whenever it changes
    if (selectedFolder) {
      localStorage.setItem("selectedFolder", selectedFolder);
    } else {
      localStorage.removeItem("selectedFolder");
    }
  }, [selectedFolder]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard/get-folders",
        { withCredentials: true }
      );
      setFolders(response.data.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast.error("Failed to fetch folders");
    }
  };

  const createFolder = async () => {
    if (!folderName) {
      toast.error("Enter folder name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/dashboard/create-folder",
        { folderName },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Folder created successfully");
        setFolderName("");
        fetchFolders(); // Refresh the list of folders
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = [...e.target.files];
      setFiles(newFiles);
      
      // Initialize descriptions for new files
      const newDescriptions = { ...fileDescriptions };
      newFiles.forEach((file) => {
        const fileName = file.name;
        if (!newDescriptions[fileName]) {
          newDescriptions[fileName] = "";
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
      
      // Initialize descriptions for new files
      const newDescriptions = { ...fileDescriptions };
      newFiles.forEach((file) => {
        const fileName = file.name;
        if (!newDescriptions[fileName]) {
          newDescriptions[fileName] = "";
        }
      });
      setFileDescriptions(newDescriptions);
      
      toast.success(`${e.dataTransfer.files.length} file(s) selected`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const handleDescriptionChange = (fileName, description) => {
    setFileDescriptions({
      ...fileDescriptions,
      [fileName]: description
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const removedFile = newFiles[index];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Remove description for this file
    const newDescriptions = { ...fileDescriptions };
    delete newDescriptions[removedFile.name];
    setFileDescriptions(newDescriptions);
    
    toast.success("File removed");
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }
    
    // Check if all files have descriptions
    const missingDescriptions = files.filter(file => !fileDescriptions[file.name] || fileDescriptions[file.name].trim() === "");
    if (missingDescriptions.length > 0) {
      toast.error(`Please add descriptions for all files`);
      return;
    }
  
    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Append each file to the FormData
    });
    
    // Add file descriptions to formData
    formData.append("descriptions", JSON.stringify(fileDescriptions));
    formData.append("userId", user._id); // Add userId to the payload
    formData.append("folderId", selectedFolder); // Add folderId to the payload
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload/uploadFile",
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
        setFiles([]); // Clear the files state after successful upload
        setFileDescriptions({}); // Clear descriptions
        // Refresh the documents in the folder
        fetchFolders();
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to upload files");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/dashboard/delete-folder/${folderId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Folder deleted successfully");
        fetchFolders(); // Refresh the list of folders
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder");
    }
  };
  
  // Open edit modal for a folder
  const openEditModal = (folderId, currentName) => {
    setEditingFolderId(folderId);
    setNewFolderName(currentName);
    setIsEditing(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditing(false);
    setEditingFolderId(null);
    setNewFolderName("");
  };

  // Rename folder
  const renameFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/dashboard/rename-folder/${editingFolderId}`,
        { newFolderName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Folder renamed successfully");
        fetchFolders(); // Refresh the list of folders
        closeEditModal(); // Close the modal
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast.error("Failed to rename folder");
    }
  };

  // Handle folder click
  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId);
  };

  // Render the edit modal
  const renderEditModal = () => {
    if (!isEditing) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl p-6 w-96">
          <h3 className="text-white text-lg font-medium mb-4">Rename Folder</h3>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="w-full p-2 bg-indigo-900 text-white placeholder-gray-400 rounded-lg border border-[#3D2C7D] focus:outline-none focus:ring-1 focus:ring-[#00DFA2]"
            placeholder="Enter new folder name"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={closeEditModal}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={renameFolder}
              className="bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-4 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-[#2E1D6A]">
      {/* Back button when folder is selected */}
      {selectedFolder && (
        <button
          onClick={() => {
            setSelectedFolder(null);
            setFiles([]);
            setFileDescriptions({});
          }}
          className="flex items-center gap-2 text-white hover:text-[#00DFA2] transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
      )}

      {/* Folder Creation Section */}
      {!selectedFolder && (
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl p-4 flex items-center gap-2 border border-[#2D2F45] shadow-lg">
          <input
            type="text"
            placeholder="Create new project"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="flex-1 bg-indigo-900 text-white placeholder-gray-400 outline-none px-4 py-2 rounded-lg border border-[#3D2C7D]"
          />
          <button
            className="bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
            onClick={createFolder}
          >
            <FolderPlus className="w-5 h-5" />
            Create
          </button>
        </div>
      )}

      {/* Project Title */}
      {!selectedFolder && (
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Projects</h2>
      )}

      {/* Display Folders */}
      {!selectedFolder && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="relative bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-xl p-6 border border-[#2D2F45] cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => handleFolderClick(folder._id)}
            >
              {/* Edit Button */}
              <button
                className="absolute top-2 right-10 p-1 text-white hover:text-[#00DFA2] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(folder._id, folder.name);
                }}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                className="absolute top-2 right-2 p-1 text-white hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent folder selection
                  deleteFolder(folder._id);
                }}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <p className="text-white text-lg font-medium">{folder.name}</p>
              <p className="text-gray-400 text-sm mt-2">
                {folder.files?.length || 0} document(s)
              </p>
            </div>
          ))}
          {folders.length === 0 && (
            <div className="col-span-3 text-center py-10 text-gray-400">
              No projects created yet. Create your first project above.
            </div>
          )}
        </div>
      )}

      {/* Display DocsForUser when a folder is selected */}
      {selectedFolder && (
        <div className="mt-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">Documents</h2>
            
            {/* Hidden file input */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Upload UI */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div 
                className={`border-2 border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? "border-[#00DFA2] bg-[#00DFA2]/10" : "border-[#3D2C7D]"
                }`}
                onClick={openFileSelector}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <p className="text-gray-300 text-sm">Drag files or click to select</p>
              </div>
              
              <button
                className={`bg-[#00DFA2] hover:bg-[#00c78f] text-[#1E1F2C] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium ${
                  files.length === 0 || isUploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={uploadFiles}
                disabled={files.length === 0 || isUploading}
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
          
          {/* File list with descriptions */}
          {files.length > 0 && (
            <div className="bg-[#2E1D6A] rounded-lg p-4 mb-4 border border-[#3D2C7D]">
              <h3 className="text-white font-medium mb-2">Selected Files:</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {Array.from(files).map((file, index) => (
                  <div key={index} className="flex flex-col gap-2 p-3 bg-indigo-900 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-white text-sm font-medium">
                        {file.name} ({(file.size / 1024).toFixed(2)}KB)
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Description (required):</label>
                      <input
                        type="text"
                        placeholder="Enter file description"
                        value={fileDescriptions[file.name] || ""}
                        onChange={(e) => handleDescriptionChange(file.name, e.target.value)}
                        className="w-full p-2 text-sm bg-gradient-to-br from-indigo-800 to-indigo-900 border border-[#3D2C7D] rounded text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-[#00DFA2]"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DocsForUser folderId={selectedFolder} onFileUpload={fetchFolders} />
        </div>
      )}

      {/* Render Edit Modal - Moved outside of the conditional rendering */}
      {renderEditModal()}
    </div>
  );
};

export default CreateProject;