import React, { useState } from 'react';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  // Helper function for risk badge color
  const getRiskBadgeColor = (score) => {
    if (score >= 70) return 'bg-red-800 text-red-200';
    if (score >= 40) return 'bg-yellow-800 text-yellow-200';
    return 'bg-green-800 text-green-200';
  };

  // Helper functions for category colors
  const getCategoryColor = (category) => {
    switch(category) {
      case 'legal': return 'bg-blue-700';
      case 'recruitment': return 'bg-purple-700';
      case 'compliance': return 'bg-indigo-700';
      case 'finance': return 'bg-green-700';
      case 'marketing': return 'bg-pink-700';
      default: return 'bg-gray-700';
    }
  };

  // Favorite workflows
  const favoriteWorkflows = [
    {
      id: 'WF-001',
      name: 'Contract Review Standard',
      category: 'legal',
      lastRun: 'Today at 10:32 AM'
    },
    {
      id: 'WF-002',
      name: 'Resume Screening - Technical',
      category: 'recruitment',
      lastRun: 'Yesterday at 3:45 PM'
    },
    {
      id: 'WF-003',
      name: 'Compliance Audit - GDPR',
      category: 'compliance',
      lastRun: 'Mar 9, 2025'
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 'ACT-001',
      type: 'document_analyzed',
      document: 'Contract_2024_Q1.pdf',
      workflow: 'Contract Review Standard',
      timestamp: '2 hours ago',
      risk: 68
    },
    {
      id: 'ACT-002',
      type: 'workflow_created',
      workflow: 'Patent Document Analysis',
      timestamp: 'Yesterday at 9:15 AM'
    },
    {
      id: 'ACT-003',
      type: 'document_analyzed',
      document: 'Resume_Developer_Jane.pdf',
      workflow: 'Resume Screening - Technical',
      timestamp: 'Yesterday at 11:30 AM',
      risk: 25
    }
  ];
  const additionalWorkflows = [
    {
      id: 1,
      name: "Contract Analysis",
      description: "Analyze contracts for key terms and clauses",
      category: "legal"
    },
    {
      id: 2,
      name: "Risk Assessment",
      description: "Evaluate potential risks in agreements",
      category: "compliance"
    },
    {
      id: 3,
      name: "GDPR Compliance",
      description: "Check documents for GDPR compliance",
      category: "compliance"
    },
    {
      id: 4,
      name: "Contract Summary",
      description: "Generate summaries of legal documents",
      category: "legal"
    }
  ];

  const handleLaunch = (workflow) => {
    setActiveWorkflow(workflow);
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    setActiveWorkflow(null);
  };
  return (
    <div className="flex flex-col h-full w-full bg-[#1A114A] text-white">
      {/* Header */}
      {/* <header className="border-b border-indigo-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">DATACOVE AI</h1>
          <div className="flex space-x-2">
            <select 
              className="bg-indigo-800 border border-indigo-700 rounded-md px-3 py-2 text-sm"
              onChange={(e) => setDateRange(e.target.value)}
              value={dateRange}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              New Analysis
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      {/* <div className="flex flex-1 overflow-hidden"> */}
        {/* Left Sidebar
        <div className="w-64 border-r border-indigo-800 p-4">
          <nav className="space-y-2">
            <div className="p-3 rounded-md bg-indigo-700 text-white cursor-pointer">
              Dashboard
            </div>
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              My Workflows
            </div>
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              Recent Reports
            </div>
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              Analytics
            </div>
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              Settings
            </div>
          </nav>
          
          Quick Stats
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
          
          User Label
          <div className="absolute bottom-4 left-4 right-4 p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
              <span>LC</span>
            </div>
            <span>Louis Carter</span>
          </div>
        </div> */}

        {/* Dashboard Content */}
        <div className="flex flex-col bg-[#1A114A] h-full w-full p-6">
          <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search workflows..."
                className="w-full pl-10 pr-4 py-2 bg-indigo-900 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-5 h-5 text-indigo-300 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </div>
          <h2 className="text-3xl font-bold mb-8">Welcome back, Louis</h2>
          
          {/* Top Section - Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-lg p-6 shadow-lg cursor-pointer">
              <h3 className="text-indigo-300 text-sm font-medium mb-1">Documents Processed</h3>
              <p className="text-3xl font-bold">1,243</p>
              <p className="text-sm text-green-400 mt-2">↑ 8.2% from last period</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg p-6 shadow-lg cursor-pointer">
              <h3 className="text-purple-300 text-sm font-medium mb-1">Active Workflows</h3>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-green-400 mt-2">↑ 1 new workflow this period</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-lg p-6 shadow-lg cursor-pointer">
              <h3 className="text-red-300 text-sm font-medium mb-1">High Risk Documents</h3>
              <p className="text-3xl font-bold">142</p>
              <p className="text-sm text-red-400 mt-2">↑ 3.6% from last period</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-6 shadow-lg cursor-pointer">
              <h3 className="text-blue-300 text-sm font-medium mb-1">Total Value Analyzed</h3>
              <p className="text-3xl font-bold">$8.2M</p>
              <p className="text-sm text-green-400 mt-2">↑ 14.3% from last period</p>
            </div>
          </div>
          
          {/* Bottom Section - Quick Access and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Favorite Workflows */}
            <div className="bg-indigo-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Favorite Workflows</h3>
                <button className="text-sm text-indigo-300 hover:text-white">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {favoriteWorkflows.map(workflow => (
                  <div key={workflow.id} className="p-3 bg-indigo-800 rounded-lg hover:bg-indigo-700 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg ${getCategoryColor(workflow.category)} flex items-center justify-center mr-3`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">{workflow.name}</h4>
                        <p className="text-xs text-indigo-300">Last run: {workflow.lastRun}</p>
                      </div>
                    </div>
                    <button className="bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded-md text-sm">
                      Run
                    </button>
                  </div>
                ))}
                <button className="w-full p-3 border border-dashed border-indigo-700 rounded-lg hover:border-indigo-500 text-indigo-300 hover:text-white flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Workflow
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-indigo-900 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <button className="text-sm text-indigo-300 hover:text-white">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex">
                    <div className="mr-3">
                      {activity.type === 'document_analyzed' && (
                        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      {activity.type === 'workflow_created' && (
                        <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          {activity.type === 'document_analyzed' && (
                            <p className="font-medium">Analyzed document <span className="text-blue-400">{activity.document}</span></p>
                          )}
                          {activity.type === 'workflow_created' && (
                            <p className="font-medium">Created new workflow <span className="text-purple-400">{activity.workflow}</span></p>
                          )}
                        </div>
                        {activity.risk && (
                          <span className={`px-2 py-1 text-xs rounded-full ${getRiskBadgeColor(activity.risk)}`}>
                            Risk: {activity.risk}
                          </span>
                        )}
                      </div>
                      {activity.type === 'document_analyzed' && (
                        <p className="text-sm text-indigo-300">Using workflow: {activity.workflow}</p>
                      )}
                      <p className="text-xs text-indigo-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
      {/* Workflows grid */}
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-bold mb-6">Favorite Workflows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalWorkflows.map(workflow => (
            <div key={workflow.id} className="bg-indigo-900 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col">
                <div className={`w-12 h-12 rounded-lg ${getCategoryColor(workflow.category)} flex items-center justify-center mb-3`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium text-left">{workflow.name}</h4>
                <p className="text-sm text-indigo-300 text-left mb-4">{workflow.description}</p>
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
            {/* Main content container with proper padding */}
            <div className="p-6 md:p-8">
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{activeWorkflow.name}</h2>
                <button 
                  onClick={closeOverlay}
                  className="bg-indigo-800 rounded-full p-2 hover:bg-indigo-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Workflow steps with improved spacing and alignment */}
              <div className="mb-10 overflow-x-auto py-2">
                <div className="flex items-center min-w-max">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span>1</span>
                    </div>
                    <span className="ml-3 text-base whitespace-nowrap">Select Workflow</span>
                  </div>
                  <div className="w-20 h-1 bg-indigo-700 mx-4 flex-shrink-0"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0">
                      <span>2</span>
                    </div>
                    <span className="ml-3 text-base whitespace-nowrap">Upload Documents</span>
                  </div>
                  <div className="w-20 h-1 bg-indigo-700 mx-4 flex-shrink-0"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center flex-shrink-0">
                      <span>3</span>
                    </div>
                    <span className="ml-3 text-base whitespace-nowrap">View Analysis</span>
                  </div>
                </div>
              </div>

              {/* Problem statement with proper spacing */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">Define Your Problem Statement</h3>
                <div className="bg-indigo-900 p-6 rounded-lg">
                  <p className="text-indigo-300">
                    For example: "Analyze the attached contracts for termination clauses, payment terms, liability limitations, and compliance with GDPR. Highlight any potential issues."
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Upload Documents</h3>
              
              {/* Upload section with improved spacing - using grid with gap */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="border-2 border-dashed border-indigo-700 rounded-lg p-8 flex flex-col items-center justify-center h-64">
                    <div className="bg-indigo-800 rounded-full p-4 mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="mb-2 text-lg">Drag and drop files here</p>
                    <p className="text-indigo-400">or click to browse</p>
                  </div>
                  <div className="mt-4 p-3 bg-indigo-900 rounded-lg flex justify-between items-center">
                    <span>Contract_2024_Q1.pdf</span>
                    <button className="bg-indigo-700 rounded-full p-1 hover:bg-indigo-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Analysis options with proper spacing and layout */}
                <div className="bg-indigo-900 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Analysis Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" defaultChecked />
                      <span className="ml-3">Risk Assessment</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" defaultChecked />
                      <span className="ml-3">Compliance Check</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                      <span className="ml-3">Clause Extraction</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                      <span className="ml-3">Summarization</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons aligned to the right with proper spacing */}
              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-2 border border-indigo-600 rounded-md text-indigo-300 hover:bg-indigo-800">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

          {/* Unleashing AI Potential Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6">Unleashing AI Potential in Your Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Business Growth */}
              <div className="bg-indigo-900 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Business Growth</h4>
                </div>
                <p className="text-indigo-300 mb-3">Transform raw document data into strategic insights that drive business decisions.</p>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Risk Mitigation */}
              <div className="bg-indigo-900 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Risk Mitigation</h4>
                </div>
                <p className="text-indigo-300 mb-3">Identify potential legal and compliance risks before they become costly problems.</p>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Efficiency */}
              <div className="bg-indigo-900 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Efficiency</h4>
                </div>
                <p className="text-indigo-300 mb-3">Automate document processing to save time and reduce manual review by up to 80%.</p>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Compliance */}
              <div className="bg-indigo-900 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold">Compliance</h4>
                </div>
                <p className="text-indigo-300 mb-3">Ensure regulatory compliance with automated checks against the latest requirements.</p>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default DashboardPage;