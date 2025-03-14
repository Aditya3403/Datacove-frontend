import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [activeWorkflow, setActiveWorkflow] = useState('all');
  
  // Sample data for charts
  const documentsProcessedData = [
    { name: 'Jan', legal: 156, recruitment: 87, compliance: 94, total: 337 },
    { name: 'Feb', legal: 172, recruitment: 92, compliance: 110, total: 374 },
    { name: 'Mar', legal: 189, recruitment: 102, compliance: 121, total: 412 },
    { name: 'Apr', legal: 201, recruitment: 111, compliance: 98, total: 410 },
    { name: 'May', legal: 213, recruitment: 107, compliance: 133, total: 453 },
    { name: 'Jun', legal: 192, recruitment: 98, compliance: 126, total: 416 }
  ];
  
  const riskDistributionData = [
    { name: 'High Risk', value: 142, color: '#F87171' },
    { name: 'Medium Risk', value: 294, color: '#FBBF24' },
    { name: 'Low Risk', value: 578, color: '#34D399' }
  ];
  
  const processingTimeData = [
    { name: 'Contracts', value: 12, color: '#818CF8' },
    { name: 'Resumes', value: 5, color: '#F472B6' },
    { name: 'Policies', value: 16, color: '#60A5FA' },
    { name: 'Invoices', value: 7, color: '#A78BFA' }
  ];
  
  const topRiskFactorsData = [
    { name: 'Termination Clauses', count: 87 },
    { name: 'Payment Terms', count: 64 },
    { name: 'Liability Limitations', count: 58 },
    { name: 'IP Rights', count: 42 },
    { name: 'Data Privacy', count: 37 }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#2E1D6A] text-white p-8">
      {/* Header */}
      {/* <header className="border-b border-indigo-800 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold">DATACOVE AI</h1>
          <div className="flex flex-wrap gap-2">
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
            <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm">
              Export Report
            </button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        {/* <div className="w-64 border-r border-indigo-800 p-4 hidden md:block">
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
            <div className="p-3 rounded-md bg-indigo-700 text-white cursor-pointer">
              Analytics
            </div>
            <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
              Settings
            </div>
          </nav>
          
          Workflow Filter
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Workflow Filter</h3>
            <div className="space-y-2">
              <div 
                className={`p-2 rounded-md cursor-pointer ${activeWorkflow === 'all' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setActiveWorkflow('all')}
              >
                All Workflows
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${activeWorkflow === 'legal' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setActiveWorkflow('legal')}
              >
                Legal Contracts
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${activeWorkflow === 'recruitment' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setActiveWorkflow('recruitment')}
              >
                Resume Screening
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${activeWorkflow === 'compliance' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setActiveWorkflow('compliance')}
              >
                Compliance Check
              </div>
              <div 
                className={`p-2 rounded-md cursor-pointer ${activeWorkflow === 'policy' ? 'bg-purple-800 text-white' : 'text-indigo-300 hover:bg-indigo-900'}`}
                onClick={() => setActiveWorkflow('policy')}
              >
                Policy Analysis
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

        {/* Mobile workflow filter */}
        {/* <div className="md:hidden p-4 bg-indigo-900">
          <select 
            className="w-full bg-indigo-800 border border-indigo-700 rounded-md px-3 py-2 text-sm"
            onChange={(e) => setActiveWorkflow(e.target.value)}
            value={activeWorkflow}
          >
            <option value="all">All Workflows</option>
            <option value="legal">Legal Contracts</option>
            <option value="recruitment">Resume Screening</option>
            <option value="compliance">Compliance Check</option>
            <option value="policy">Policy Analysis</option>
          </select>
        </div> */}

        {/* Analytics Content */}
        <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Analytics Dashboard</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-indigo-300 text-xs sm:text-sm font-medium mb-1">Total Documents</h3>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold">1,243</p>
              <p className="text-xs sm:text-sm text-green-400 mt-1 sm:mt-2">↑ 8.2% from last period</p>
            </div>
            
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-indigo-300 text-xs sm:text-sm font-medium mb-1">Avg. Processing Time</h3>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold">8.3s</p>
              <p className="text-xs sm:text-sm text-green-400 mt-1 sm:mt-2">↓ 12.5% from last period</p>
            </div>
            
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-indigo-300 text-xs sm:text-sm font-medium mb-1">High Risk Documents</h3>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold">142</p>
              <p className="text-xs sm:text-sm text-red-400 mt-1 sm:mt-2">↑ 3.6% from last period</p>
            </div>
            
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-indigo-300 text-xs sm:text-sm font-medium mb-1">Total Value Analyzed</h3>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold">$8.2M</p>
              <p className="text-xs sm:text-sm text-green-400 mt-1 sm:mt-2">↑ 14.3% from last period</p>
            </div>
          </div>
          
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
            {/* Documents Processed Over Time */}
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4">Documents Processed Over Time</h3>
              <div className="h-48 sm:h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={documentsProcessedData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                    <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.375rem' }} 
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Legend wrapperStyle={{fontSize: '12px'}} />
                    <Line 
                      type="monotone" 
                      dataKey={activeWorkflow === 'all' ? 'total' : activeWorkflow} 
                      stroke="#818cf8" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Risk Distribution */}
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4">Risk Distribution</h3>
              <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.375rem' }} 
                      labelStyle={{ color: '#f8fafc' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
            {/* Processing Time by Document Type */}
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4">Processing Time by Document Type (sec)</h3>
              <div className="h-48 sm:h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={processingTimeData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                    <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.375rem' }} 
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="value">
                      {processingTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Top Risk Factors */}
            <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
              <h3 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4">Top Risk Factors</h3>
              <div className="h-48 sm:h-56 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topRiskFactorsData.sort((a, b) => b.count - a.count)}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" tick={{fontSize: 12}} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      tick={{fontSize: 12}} 
                      width={80}
                      tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.375rem' }} 
                      labelStyle={{ color: '#f8fafc' }}
                    />
                    <Bar dataKey="count" fill="#a78bfa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Document Activity Table */}
          <div className="bg-indigo-900 rounded-lg p-4 md:p-6">
            <h3 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4">Recent Document Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full table-auto">
                <thead>
                  <tr className="border-b border-indigo-800">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-indigo-300 text-xs sm:text-sm">Document</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-indigo-300 text-xs sm:text-sm">Type</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-indigo-300 text-xs sm:text-sm">Date</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-indigo-300 text-xs sm:text-sm">Status</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-indigo-300 text-xs sm:text-sm">Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-800">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-xs">Contract_2024_Q1.pdf</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Legal Contract</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Mar 10, 2025</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-green-900 text-green-300">Completed</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        68/100
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-xs">Invoice_March_2025.pdf</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Finance</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Mar 9, 2025</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-green-900 text-green-300">Completed</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        32/100
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-xs">Resume_Developer_Jane.pdf</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Recruitment</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Mar 8, 2025</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-green-900 text-green-300">Completed</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                        45/100
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-800">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-xs">Policy_GDPR_2025.pdf</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Compliance</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Mar 7, 2025</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-green-900 text-green-300">Completed</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        78/100
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm truncate max-w-xs">NDA_Supplier_2025.pdf</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Legal Contract</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Mar 5, 2025</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      <span className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-green-900 text-green-300">Completed</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                      <span className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        28/100
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;