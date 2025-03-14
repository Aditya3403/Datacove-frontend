import React, { useState } from 'react';

const MyWorkflowsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Sample workflow data
  const workflowsData = [
    {
      id: 'WF-20250310-001',
      name: 'Recruitment',
      description: 'Standard contract review with risk assessment and compliance check',
      category: 'legal',
      status: 'active',
      lastRun: 'March 10, 2025',
      runCount: 156,
      components: ['Document extraction', 'PII Redaction', 'Risk analysis', 'Compliance check'],
      favorite: true
    },
    // {
    //   id: 'WF-20250305-002',
    //   name: 'Resume Screening - Technical',
    //   description: 'Technical candidate resume screening for engineering roles',
    //   category: 'recruitment',
    //   status: 'active',
    //   lastRun: 'March 9, 2025',
    //   runCount: 87,
    //   components: ['Skills extraction', 'Experience verification', 'Technology matching', 'Culture fit analysis'],
    //   favorite: true
    // },
    // {
    //   id: 'WF-20250228-003',
    //   name: 'Compliance Audit - GDPR',
    //   description: 'Regulatory compliance check for GDPR requirements',
    //   category: 'compliance',
    //   status: 'active',
    //   lastRun: 'March 8, 2025',
    //   runCount: 42,
    //   components: ['PII Detection', 'Consent verification', 'Policy compliance', 'Risk assessment'],
    //   favorite: true
    // },
    // {
    //   id: 'WF-20250220-004',
    //   name: 'Vendor Agreement Review',
    //   description: 'Specialized workflow for vendor and supplier agreements',
    //   category: 'legal',
    //   status: 'active',
    //   lastRun: 'March 7, 2025',
    //   runCount: 28,
    //   components: ['Terms extraction', 'SLA verification', 'Cost analysis', 'Risk assessment'],
    //   favorite: false
    // },
    // {
    //   id: 'WF-20250210-005',
    //   name: 'Policy Analysis - Internal',
    //   description: 'Analysis of internal policies against regulatory requirements',
    //   category: 'compliance',
    //   status: 'active',
    //   lastRun: 'March 5, 2025',
    //   runCount: 16,
    //   components: ['Policy extraction', 'Benchmark comparison', 'Gap analysis', 'Implementation review'],
    //   favorite: false
    // },
    // {
    //   id: 'WF-20250201-006',
    //   name: 'Invoice Verification',
    //   description: 'Financial document validation and data extraction',
    //   category: 'finance',
    //   status: 'inactive',
    //   lastRun: 'February 15, 2025',
    //   runCount: 203,
    //   components: ['Data extraction', 'Amount verification', 'Duplicate detection', 'Fraud analysis'],
    //   favorite: false
    // },
    // {
    //   id: 'WF-20250120-007',
    //   name: 'Marketing Material Analysis',
    //   description: 'Brand consistency and compliance check for marketing materials',
    //   category: 'marketing',
    //   status: 'inactive',
    //   lastRun: 'February 10, 2025',
    //   runCount: 35,
    //   components: ['Brand validation', 'Legal compliance', 'Messaging analysis', 'Image recognition'],
    //   favorite: false
    // },
    // {
    //   id: 'WF-20250115-008',
    //   name: 'Patent Document Analysis',
    //   description: 'Specialized workflow for patent documents and intellectual property',
    //   category: 'legal',
    //   status: 'draft',
    //   lastRun: 'Never',
    //   runCount: 0,
    //   components: ['Claims extraction', 'Prior art comparison', 'Innovation assessment', 'Risk analysis'],
    //   favorite: false
    // }
  ];

  // Filter workflows based on search and status
  const filteredWorkflows = workflowsData
    .filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || workflow.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

  // Sort workflows: favorites first, then alphabetically
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return a.name.localeCompare(b.name);
  });

  // Helper function for category badge color and label
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'legal':
        return { color: 'bg-blue-800 text-blue-200', label: 'Legal' };
      case 'recruitment':
        return { color: 'bg-purple-800 text-purple-200', label: 'Recruitment' };
      case 'compliance':
        return { color: 'bg-indigo-800 text-indigo-200', label: 'Compliance' };
      case 'marketing':
        return { color: 'bg-pink-800 text-pink-200', label: 'Marketing' };
      case 'finance':
        return { color: 'bg-green-800 text-green-200', label: 'Finance' };
      default:
        return { color: 'bg-gray-800 text-gray-200', label: 'Other' };
    }
  };

  // Helper function for status badge color and label
  const getStatusInfo = (status) => {
    switch(status) {
      case 'active':
        return { color: 'bg-green-800 text-green-200', label: 'Active' };
      case 'inactive':
        return { color: 'bg-yellow-800 text-yellow-200', label: 'Inactive' };
      case 'draft':
        return { color: 'bg-gray-800 text-gray-200', label: 'Draft' };
      default:
        return { color: 'bg-gray-800 text-gray-200', label: 'Unknown' };
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#2E1D6A] text-white p-8">
      {/* Header */}
      {/* <header className="border-b border-indigo-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">DATACOVE AI</h1>
          <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
            Back to Dashboard
          </button>
        </div>
      </header> */}

      {/* Main Content */}
      {/* <div className="flex flex-1 overflow-hidden"> */}
        {/* Left Sidebar
        <div className="w-64 border-r border-indigo-800 p-4">
          <nav className="space-y-2">
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              Dashboard
            </div>
            <div className="p-3 rounded-md bg-indigo-700 text-white cursor-pointer">
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
          
          Status Filter
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Status</h3>
            <div className="space-y-2">
              <div 
                className={`p-2 rounded-md cursor-pointer ${selectedStatus === 'all' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setSelectedStatus('all')}
              >
                All Workflows
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${selectedStatus === 'active' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setSelectedStatus('active')}
              >
                Active
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${selectedStatus === 'inactive' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setSelectedStatus('inactive')}
              >
                Inactive
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${selectedStatus === 'draft' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setSelectedStatus('draft')}
              >
                Drafts
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

        {/* Workflows Content */}
        <div className="flex-1 overflow-auto h-full w-full p-4 md:p-6">
          <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-3xl font-bold">My Workflows</h2>
            <button 
              className="bg-[#6c21a8] hover:bg-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center text-xs sm:text-base w-auto sm:w-auto justify-center"
              onClick={() => setShowCreateModal(true)}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Workflow
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search workflows..."
              className="w-full text-xs md:text-lg lg:text-lg xl:text-lg pl-10 pr-4 py-2 bg-indigo-900 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="xl:w-5 xl:h-5 lg:w-5 lg:h-5 md:w-5 md:h-5 sm:w-4 sm:h-4 w-4 h-4 text-indigo-300 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Status Filter - Mobile Only */}
          {/* <div className="md:hidden mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button 
                className={`p-2 rounded-md text-center text-sm ${selectedStatus === 'all' ? 'bg-purple-800 text-white' : 'bg-indigo-900 text-indigo-300'}`}
                onClick={() => setSelectedStatus('all')}
              >
                All
              </button>
              <button 
                className={`p-2 rounded-md text-center text-sm ${selectedStatus === 'active' ? 'bg-purple-800 text-white' : 'bg-indigo-900 text-indigo-300'}`}
                onClick={() => setSelectedStatus('active')}
              >
                Active
              </button>
              <button 
                className={`p-2 rounded-md text-center text-sm ${selectedStatus === 'inactive' ? 'bg-purple-800 text-white' : 'bg-indigo-900 text-indigo-300'}`}
                onClick={() => setSelectedStatus('inactive')}
              >
                Inactive
              </button>
              <button 
                className={`p-2 rounded-md text-center text-sm ${selectedStatus === 'draft' ? 'bg-purple-800 text-white' : 'bg-indigo-900 text-indigo-300'}`}
                onClick={() => setSelectedStatus('draft')}
              >
                Drafts
              </button>
            </div>
          </div> */}
          
          {/* Workflows List */}
          <div className="space-y-4">
            {sortedWorkflows.map(workflow => (
              <div key={workflow.id} className="bg-indigo-900 rounded-lg shadow-lg hover:ring-1 hover:ring-purple-500 transition-all">
                <div className="p-4 sm:p-5">
                  <div className="flex flex-row sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="flex items-center">
                      {workflow.favorite && (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      <h3 className="text-sm sm:text-lg font-semibold">{workflow.name}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className={`px-1 py-0.3 sm:px-2 sm:py-1 text-xs rounded-full ${getCategoryInfo(workflow.category).color}`}>
                        {getCategoryInfo(workflow.category).label}
                      </span>
                      <span className={`px-1 py-0.3 sm:px-2 sm:py-1 text-xs rounded-full ${getStatusInfo(workflow.status).color}`}>
                        {getStatusInfo(workflow.status).label}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-indigo-300 mb-3 sm:mb-4">{workflow.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {workflow.components.map((component, index) => (
                      <span key={index} className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs bg-indigo-800 rounded-md truncate max-w-full">
                        {component}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-row xs:flex-row justify-between text-xs sm:text-sm text-indigo-300 mb-3 sm:mb-4 gap-1">
                    <span>Last run: {workflow.lastRun}</span>
                    <span>Total runs: {workflow.runCount}</span>
                  </div>
                  
                  <div className="flex flex-row xs:flex-row justify-between gap-3 mt-3 sm:mt-4">
                    <button className="bg-indigo-800 hover:bg-indigo-700 px-3 py-1 rounded-md text-xs sm:text-sm">
                      Run Workflow
                    </button>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="text-indigo-300 hover:text-white">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-indigo-300 hover:text-white">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button className="text-indigo-300 hover:text-red-400">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {!workflow.favorite ? (
                        <button className="text-indigo-300 hover:text-yellow-400">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      ) : (
                        <button className="text-yellow-400 hover:text-indigo-300">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredWorkflows.length === 0 && (
            <div className="bg-indigo-900 rounded-lg p-4 sm:p-8 text-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-700 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg sm:text-xl font-medium mb-2">No workflows found</h3>
              <p className="text-indigo-300 mb-4 sm:mb-6 text-sm sm:text-base">Create a new workflow or adjust your search criteria.</p>
              <button 
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base"
                onClick={() => setShowCreateModal(true)}
              >
                Create New Workflow
              </button>
            </div>
          )}
        </div>
      {/* </div> */}
      
      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-indigo-900 rounded-lg w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold">Create New Workflow</h3>
                <button 
                  className="text-indigo-300 hover:text-white"
                  onClick={() => setShowCreateModal(false)}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Workflow Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter workflow name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe the purpose of this workflow..."
                    rows="3"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="" disabled selected>Select a category</option>
                    <option value="legal">Legal</option>
                    <option value="recruitment">Recruitment</option>
                    <option value="compliance">Compliance</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Workflow Components</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">Document Extraction</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">PII Redaction</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">Risk Analysis</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">Compliance Check</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">Summarization</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 pt-4">
                  <button 
                    className="px-4 py-2 border border-indigo-700 rounded-md hover:bg-indigo-800 text-sm sm:text-base"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md mb-2 sm:mb-0 text-sm sm:text-base">
                    Create Workflow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default MyWorkflowsPage;