import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [uploadedFile, setUploadedFile] = useState(null); // Track uploaded file
  const [descriptionText, setdescriptionText] = useState(""); // Track uploaded file
  const { user, logout } = useAppStore();
  const navigate = useNavigate();
  // Helper function for risk badge color
  const getRiskBadgeColor = (score) => {
    if (score >= 70) return "bg-red-800 text-red-200";
    if (score >= 40) return "bg-yellow-800 text-yellow-200";
    return "bg-green-800 text-green-200";
  };
  const handleInputChange = (event) => {
    setdescriptionText(event.target.value);
  };
  // Helper functions for category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case "legal":
        return "bg-blue-700";
      case "recruitment":
        return "bg-purple-700";
      case "compliance":
        return "bg-indigo-700";
      case "finance":
        return "bg-green-700";
      case "marketing":
        return "bg-pink-700";
      default:
        return "bg-gray-700";
    }
  };

  const additionalWorkflows = [
    {
      id: 1,
      name: "Contract Analysis",
      description: "Analyze contracts for key terms and clauses",
      category: "legal",
    },
    {
      id: 2,
      name: "Risk Assessment",
      description: "Evaluate potential risks in agreements",
      category: "compliance",
    },
    {
      id: 3,
      name: "GDPR Compliance",
      description: "Check documents for GDPR compliance",
      category: "compliance",
    },
    {
      id: 4,
      name: "Contract Summary",
      description: "Generate summaries of legal documents",
      category: "legal",
    },
  ];

  const handleLaunch = (workflow) => {
    setActiveWorkflow(workflow);
    setIsOverlayVisible(true);
    setCurrentStep(1); // Reset to step 1 when launching a workflow
    setUploadedFile(null); // Reset uploaded file
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setActiveWorkflow(null);
    setCurrentStep(1); // Reset step when closing overlay
    setUploadedFile(null); // Reset uploaded file
  };

  const handleContinue = () => {
    if (currentStep === 1 && uploadedFile) {
      setCurrentStep(2); // Move to step 2 after upload
    } else if (currentStep === 2) {
      console.log("Navigating to analysis page...");
      navigate(`/dashboard/${user?.name}/analytics`);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name); // Set the uploaded file name
      setCurrentStep(2); // Highlight step 2
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#2E1D6A] text-white rounded-lg">
      {/* Dashboard Content */}
      <div className="flex flex-col bg-[#2E1D6A] h-full w-full p-8 rounded-md">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search workflows..."
            className="w-full pl-10 pr-4 py-2 bg-indigo-900 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-5 h-5 text-indigo-300 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl xl:text-3xl lg:text-3xl font-bold mb-8">
          Welcome back, {user.displayName}
        </h2>

        {/* Top Section - Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-lg p-6 shadow-lg cursor-pointer">
            <h3 className="text-indigo-300 text-sm font-medium mb-1">
              Documents Processed
            </h3>
            <p className="text-xl font-bold">1,243</p>
            <p className="text-sm text-green-400 mt-2">
              ↑ 8.2% from last period
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg p-6 shadow-lg cursor-pointer">
            <h3 className="text-purple-300 text-sm font-medium mb-1">
              Active Workflows
            </h3>
            <p className="text-xl font-bold">5</p>
            <p className="text-sm text-green-400 mt-2">
              ↑ 1 new workflow this period
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-6 shadow-lg cursor-pointer">
            <h3 className="text-red-300 text-sm font-medium mb-1">
              High Risk Documents
            </h3>
            <p className="text-xl font-bold">142</p>
            <p className="text-sm text-red-400 mt-2">↑ 3.6% from last period</p>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-6 shadow-lg cursor-pointer">
            <h3 className="text-blue-300 text-sm font-medium mb-1">
              Total Value Analyzed
            </h3>
            <p className="text-xl font-bold">$8.2M</p>
            <p className="text-sm text-green-400 mt-2">
              ↑ 14.3% from last period
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Workflows grid */}
          <div className="mt-8 mb-8">
            <h3 className="text-xl font-bold mb-6">Favorite Workflows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-indigo-900 rounded-lg p-6 shadow-lg"
                >
                  <div className="flex flex-col">
                    <div
                      className={`w-12 h-12 rounded-lg ${getCategoryColor(
                        workflow.category
                      )} flex items-center justify-center mb-3`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-left">
                      {workflow.name}
                    </h4>
                    <p className="text-sm text-indigo-300 text-left mb-4">
                      {workflow.description}
                    </p>
                    <button
                      className="bg-indigo-700 hover:bg-indigo-600 px-4 py-1 rounded-md text-sm w-full"
                      onClick={() => handleLaunch(workflow)}
                    >
                      Launch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay */}
          {isOverlayVisible && activeWorkflow && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
              <div className="bg-indigo-950 rounded-lg w-full max-w-4xl mx-auto overflow-auto max-h-[calc(100vh-48px)] relative">
                <div className="p-6 md:p-8">
                  {/* Header with close button */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                      {activeWorkflow.name}
                    </h2>
                    <button
                      onClick={closeOverlay}
                      className="bg-indigo-800 rounded-full p-2 hover:bg-indigo-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Workflow steps */}
                  <div className="mb-10 overflow-x-auto py-2">
                    <div className="flex items-center min-w-max">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${
                            currentStep >= 1 ? "bg-indigo-600" : "bg-indigo-800"
                          } flex items-center justify-center flex-shrink-0`}
                        >
                          <span>1</span>
                        </div>
                        <span className="ml-3 text-base whitespace-nowrap">
                          Select Workflows
                        </span>
                      </div>
                      <div className="w-20 h-1 bg-indigo-700 mx-4 flex-shrink-0"></div>
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${
                            currentStep >= 2 ? "bg-indigo-600" : "bg-indigo-800"
                          } flex items-center justify-center flex-shrink-0`}
                        >
                          <span>2</span>
                        </div>
                        <span className="ml-3 text-base whitespace-nowrap">
                          Upload Documents
                        </span>
                      </div>
                      <div className="w-20 h-1 bg-indigo-700 mx-4 flex-shrink-0"></div>
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full ${
                            currentStep >= 3 ? "bg-indigo-600" : "bg-indigo-800"
                          } flex items-center justify-center flex-shrink-0`}
                        >
                          <span>3</span>
                        </div>
                        <span className="ml-3 text-base whitespace-nowrap">
                          View Analysis
                        </span>
                      </div>
                    </div>
                  </div>
                  <>
                    <div className="mb-10">
                      <h3 className="text-xl font-bold mb-4">
                        Define Your Problem Statement
                      </h3>
                      <div className="bg-indigo-900 p-6 rounded-lg">
                        <input
                          type="text"
                          value={descriptionText}
                          onChange={handleInputChange}
                          placeholder="For example: Analyze the attached contracts for termination clauses, payment terms, liability......"
                          className="w-full bg-transparent text-indigo-300 placeholder-indigo-500 focus:outline-none border-none p-0"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Upload Documents</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="border-2 border-dashed border-indigo-700 rounded-lg p-8 flex flex-col items-center justify-center h-64">
                          <div className="bg-indigo-800 rounded-full p-4 mb-4">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>
                          <p className="mb-2 text-lg">
                            Drag and drop files here
                          </p>
                          <p className="text-indigo-400">or click to browse</p>
                          <input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            onChange={handleFileUpload}
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            Browse
                          </label>
                        </div>
                        {uploadedFile && (
                          <div className="mt-4 p-3 bg-indigo-900 rounded-lg flex justify-between items-center">
                            <span>{uploadedFile}</span>
                            <button className="bg-indigo-700 rounded-full p-1 hover:bg-indigo-600">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="bg-indigo-900 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4">
                          Analysis Options
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              defaultChecked
                            />
                            <span className="ml-3">Risk Assessment</span>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                              defaultChecked
                            />
                            <span className="ml-3">Compliance Check</span>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-3">Clause Extraction</span>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-3">Summarization</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                  {/* Action buttons */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      className="px-6 py-2 border border-indigo-600 rounded-md text-indigo-300 hover:bg-indigo-800"
                      onClick={closeOverlay}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
                      onClick={handleContinue}
                    >
                      {currentStep === 1 ? "Continue" : "View Analysis"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
