import React, { useState } from 'react';

const RecentReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Sample report data
  const reportsData = [
    {
      id: 'REP-20250310-001',
      title: 'SaaS Contract Analysis Bundle',
      date: 'March 10, 2025',
      category: 'legal',
      documents: 5,
      riskScore: 68,
      status: 'complete'
    },
    // {
    //   id: 'REP-20250309-004', 
    //   title: 'Q1 Vendor Agreement Review',
    //   date: 'March 9, 2025',
    //   category: 'legal',
    //   documents: 8,
    //   riskScore: 42,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250308-003',
    //   title: 'Developer Candidate Screening - Senior',
    //   date: 'March 8, 2025',
    //   category: 'recruitment',
    //   documents: 12,
    //   riskScore: 35,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250307-002',
    //   title: 'GDPR Policy Compliance Audit',
    //   date: 'March 7, 2025',
    //   category: 'compliance',
    //   documents: 3,
    //   riskScore: 78,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250305-001',
    //   title: 'Marketing Content Analysis',
    //   date: 'March 5, 2025',
    //   category: 'marketing',
    //   documents: 15,
    //   riskScore: 22,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250301-005',
    //   title: 'Supply Chain Contract Review',
    //   date: 'March 1, 2025',
    //   category: 'legal',
    //   documents: 6,
    //   riskScore: 53,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250228-002',
    //   title: 'Customer Support Policy Analysis',
    //   date: 'February 28, 2025',
    //   category: 'compliance',
    //   documents: 4,
    //   riskScore: 31,
    //   status: 'complete'
    // },
    // {
    //   id: 'REP-20250227-001',
    //   title: 'Executive Assistant Candidates',
    //   date: 'February 27, 2025',
    //   category: 'recruitment',
    //   documents: 8,
    //   riskScore: 28,
    //   status: 'complete'
    // }
  ];

  // Filter and sort reports
  const filteredReports = reportsData
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           report.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Helper function for risk badge color
  const getRiskBadgeColor = (score) => {
    if (score >= 70) return 'bg-red-800 text-red-200';
    if (score >= 40) return 'bg-yellow-800 text-yellow-200';
    return 'bg-green-800 text-green-200';
  };

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
      default:
        return { color: 'bg-gray-800 text-gray-200', label: 'Other' };
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#2E1D6A] text-white p-8">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Reports Content */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">Recent Reports</h2>
            <button className="bg-[#6c21a8] hover:bg-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center text-xs sm:text-sm whitespace-nowrap">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </button>
          </div>
          
          {/* Search and Sort Controls */}
          <div className="flex flex-row sm:flex-row justify-between gap-2 mb-4 sm:mb-6">
            <div className="relative w-auto sm:w-auto">
              <input
                type="text"
                placeholder="Search reports..."
                className="sm:w-64 md:w-64 pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-indigo-900 border border-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-3 h-3 sm:w-5 sm:h-5 text-indigo-300 absolute left-2 sm:left-3 top-2 sm:top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-indigo-300 text-xs sm:text-sm">Sort by:</span>
              <select 
                className="bg-indigo-900 border border-indigo-700 rounded-md px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
          
          {/* Reports Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredReports.map(report => (
              <div key={report.id} className="bg-indigo-900 rounded-lg shadow-lg hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer">
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex flex-wrap justify-between items-start mb-2 sm:mb-3 gap-2">
                    <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full ${getCategoryInfo(report.category).color}`}>
                      {getCategoryInfo(report.category).label}
                    </div>
                    <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs rounded-full ${getRiskBadgeColor(report.riskScore)}`}>
                      Risk: {report.riskScore}/100
                    </div>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 line-clamp-2">{report.title}</h3>
                  
                  <div className="flex justify-between text-xs sm:text-sm text-indigo-300 mb-2 sm:mb-4">
                    <span>{report.date}</span>
                    <span>{report.documents} document{report.documents !== 1 ? 's' : ''}</span>
                  </div>
                  
                  <div className="text-xs text-indigo-400 mb-2 sm:mb-4">
                    Report ID: {report.id}
                  </div>
                  
                  <div className="flex justify-between mt-3 sm:mt-6">
                    <button className="text-indigo-300 hover:text-white flex items-center text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="hidden xs:inline">View</span>
                    </button>
                    
                    <button className="text-indigo-300 hover:text-white flex items-center text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span className="hidden xs:inline">Share</span>
                    </button>
                    
                    <button className="text-indigo-300 hover:text-white flex items-center text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="hidden xs:inline">Export</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="bg-indigo-900 rounded-lg p-4 sm:p-6 md:p-8 text-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-700 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">No reports found</h3>
              <p className="text-indigo-300 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm sm:text-base">
                Start New Analysis
              </button>
            </div>
          )}
          
          {/* Pagination - Only shown if there are more reports */}
          {/* {filteredReports.length > 0 && (
            <div className="flex justify-center mt-6 sm:mt-8">
              <nav className="flex items-center space-x-1 sm:space-x-2">
                <button className="p-1 sm:p-2 rounded-md bg-indigo-800 hover:bg-indigo-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-purple-800 text-white text-sm sm:text-base">1</button>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-indigo-800 hover:bg-indigo-700 text-sm sm:text-base">2</button>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-indigo-800 hover:bg-indigo-700 text-sm sm:text-base">3</button>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-sm sm:text-base">...</span>
                <button className="p-1 sm:p-2 rounded-md bg-indigo-800 hover:bg-indigo-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default RecentReportsPage;