import React, { useState } from 'react';

const ReportResultsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  
  // Sample analysis data - would be passed from previous screen or API
  const analysisData = {
    title: "Contract Analysis Results",
    path: "Legal Documents / Analysis / Risk Assessment",
    step: 3,
    totalSteps: 3,
    analysisDate: "March 11, 2025",
    documentsAnalyzed: 5,
    keyObligations: 28,
    riskFactors: 14,
    deadlines: 9,
    contractValue: "$1.2M",
    avgRiskScore: 68,
    riskDistribution: {
      high: 35,
      medium: 40,
      low: 25
    },
    executiveSummary: "The analyzed contracts represent a total commitment of $1.2M over 24 months with varying levels of risk. Key concerns include:",
    keyFindings: [
      {
        type: "high",
        text: "Non-standard termination clauses in 3 contracts"
      },
      {
        type: "high",
        text: "Unclear deliverable specifications in Contract_2023_Q4.pdf"
      },
      {
        type: "medium",
        text: "9 payment milestones with 2 occurring within the next 30 days"
      }
    ],
    documents: [
      {
        id: "doc-001",
        name: "Contract_2024_Q1.pdf",
        riskScore: 68,
        keyIssues: 4,
        mediumIssues: 7
      },
      {
        id: "doc-002",
        name: "Contract_2023_Q4.pdf",
        riskScore: 82,
        keyIssues: 6,
        mediumIssues: 3
      },
      {
        id: "doc-003",
        name: "Partnership_Agreement_2025.pdf",
        riskScore: 55,
        keyIssues: 2,
        mediumIssues: 5
      },
      {
        id: "doc-004",
        name: "NDA_Client_March2025.pdf",
        riskScore: 28,
        keyIssues: 0,
        mediumIssues: 2
      },
      {
        id: "doc-005",
        name: "SLA_Vendor_2025.pdf",
        riskScore: 75,
        keyIssues: 3,
        mediumIssues: 8
      }
    ],
    riskItems: [
      {
        id: "risk-001",
        title: "Termination Clause (Section 14.2)",
        description: "90-day notice period exceeds industry standard and creates lock-in risk. Recommend negotiating to 30-day standard.",
        level: "high",
        documents: ["Contract_2024_Q1.pdf", "Contract_2023_Q4.pdf"]
      },
      {
        id: "risk-002",
        title: "Payment Terms (Section 7.1)",
        description: "Net-60 payment terms exceed standard practice. Cash flow impact could be significant. Recommend net-30.",
        level: "high",
        documents: ["Contract_2024_Q1.pdf"]
      },
      {
        id: "risk-003",
        title: "Liability Limitation (Section 15.3)",
        description: "Caps our liability but does not cap counterparty liability. Creates asymmetric risk exposure.",
        level: "high",
        documents: ["Contract_2024_Q1.pdf", "Partnership_Agreement_2025.pdf"]
      }
    ]
  };

  // Helper function for risk badge color
  const getRiskBadgeColor = (level) => {
    switch(level) {
      case 'high': return 'bg-red-800 text-red-200';
      case 'medium': return 'bg-yellow-800 text-yellow-200';
      case 'low': return 'bg-green-800 text-green-200';
      default: return 'bg-gray-800 text-gray-200';
    }
  };

  // Format risk score with color
  const formatRiskScore = (score) => {
    let color = '';
    if (score >= 70) color = 'text-red-400';
    else if (score >= 40) color = 'text-yellow-400';
    else color = 'text-green-400';
    
    return <span className={color}>{score}/100</span>;
  };

  return (
    <div className="flex flex-col h-screen bg-indigo-950 text-white">
      {/* Header */}
      <header className="border-b border-indigo-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">DATACOVE AI</h1>
          <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-indigo-800 p-4">
          <nav className="space-y-2">
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
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

          {/* Document List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Analyzed Documents</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {analysisData.documents.map(doc => (
                <div key={doc.id} className="p-3 bg-indigo-900 rounded-md hover:bg-indigo-800 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="truncate mr-2">{doc.name}</div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${doc.riskScore >= 70 ? 'bg-red-500' : doc.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-indigo-300 mt-1">
                    <span>Risk: {doc.riskScore}/100</span>
                    <span>{doc.keyIssues} key issues</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* User Label */}
          <div className="absolute bottom-4 left-4 right-4 p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
              <span>LC</span>
            </div>
            <span>Louis Carter</span>
          </div>
        </div>

        {/* Results Content */}
        <div className="flex-1 overflow-auto">
          {/* Results Header */}
          <div className="bg-indigo-900 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <div className="text-indigo-300 text-sm mb-1">
                  {analysisData.path}
                </div>
                <h2 className="text-2xl font-bold">{analysisData.title}</h2>
                <div className="text-sm text-indigo-300 mt-1">
                  Step {analysisData.step} of {analysisData.totalSteps}: Analysis Complete
                </div>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Export Dashboard
                </button>
                <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export to PDF
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm">
                  Generate Detailed Action Plan
                </button>
              </div>
            </div>

            {/* Analysis Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Documents Analyzed</h4>
                <p className="text-2xl font-bold">{analysisData.documentsAnalyzed}</p>
              </div>
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Key Obligations</h4>
                <p className="text-2xl font-bold">{analysisData.keyObligations}</p>
              </div>
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Risk Factors</h4>
                <p className="text-2xl font-bold">{analysisData.riskFactors}</p>
              </div>
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Deadlines</h4>
                <p className="text-2xl font-bold">{analysisData.deadlines}</p>
              </div>
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Contract Value</h4>
                <p className="text-2xl font-bold">{analysisData.contractValue}</p>
              </div>
              <div className="bg-indigo-800 p-4 rounded-lg">
                <h4 className="text-xs text-indigo-300 uppercase">Avg. Risk Score</h4>
                <p className="text-2xl font-bold">{analysisData.avgRiskScore}/100</p>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="flex p-6">
            <div className="w-1/3 bg-indigo-900 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-3">Risk Distribution</h3>
              
              {/* Donut Chart - Simple CSS Version */}
              <div className="relative w-40 h-40 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-indigo-950 flex items-center justify-center">
                    <span className="text-lg font-semibold">{analysisData.avgRiskScore}/100</span>
                  </div>
                </div>
                
                {/* Donut Segments */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* High Risk Segment - Red */}
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#F87171" 
                    strokeWidth="15" 
                    strokeDasharray={`${analysisData.riskDistribution.high * 2.51} 251`} 
                    strokeDashoffset="0" 
                  />
                  
                  {/* Medium Risk Segment - Yellow */}
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#FBBF24" 
                    strokeWidth="15" 
                    strokeDasharray={`${analysisData.riskDistribution.medium * 2.51} 251`} 
                    strokeDashoffset={`${-analysisData.riskDistribution.high * 2.51}`} 
                  />
                  
                  {/* Low Risk Segment - Green */}
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#34D399" 
                    strokeWidth="15" 
                    strokeDasharray={`${analysisData.riskDistribution.low * 2.51} 251`} 
                    strokeDashoffset={`${-(analysisData.riskDistribution.high + analysisData.riskDistribution.medium) * 2.51}`} 
                  />
                </svg>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-sm">High ({analysisData.riskDistribution.high}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                  <span className="text-sm">Medium ({analysisData.riskDistribution.medium}%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span className="text-sm">Low ({analysisData.riskDistribution.low}%)</span>
                </div>
              </div>
            </div>
            
            <div className="w-2/3 ml-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Key Findings</h3>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-indigo-800 mb-4">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'summary' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
                    onClick={() => setActiveTab('summary')}
                  >
                    Summary
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'obligations' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
                    onClick={() => setActiveTab('obligations')}
                  >
                    Obligations
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'risks' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
                    onClick={() => setActiveTab('risks')}
                  >
                    Risks
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'timeline' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'parties' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
                    onClick={() => setActiveTab('parties')}
                  >
                    Parties
                  </button>
                </div>
                
                {/* Executive Summary Tab */}
                {activeTab === 'summary' && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Executive Summary</h4>
                    <p className="text-indigo-200 mb-4">{analysisData.executiveSummary}</p>
                    <ul className="space-y-2">
                      {analysisData.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`inline-block w-2 h-2 rounded-full ${finding.type === 'high' ? 'bg-red-500' : finding.type === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} mt-2 mr-2`}></span>
                          <span>{finding.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Other tabs would go here */}
                {activeTab !== 'summary' && (
                  <div className="flex items-center justify-center h-40 text-indigo-400">
                    <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} details would appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Critical Risk Items */}
          <div className="p-6">
            <div className="bg-indigo-900 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Critical Risk Items</h3>
              <div className="space-y-4">
                {analysisData.riskItems.map(item => (
                  <div key={item.id} className="border-l-4 border-red-500 pl-4 py-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-indigo-300 text-sm mb-2">{item.description}</p>
                    <div className="flex flex-wrap items-center text-xs text-indigo-400">
                      <span className="mr-2">Documents:</span>
                      {item.documents.map((doc, idx) => (
                        <span key={idx} className="bg-indigo-800 px-2 py-1 rounded-md mr-2 mb-1">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="p-6 flex justify-center space-x-4">
            <button className="bg-indigo-800 hover:bg-indigo-700 px-6 py-3 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Full Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create New Analysis
            </button>
            <button className="bg-indigo-800 hover:bg-indigo-700 px-6 py-3 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportResultsPage;