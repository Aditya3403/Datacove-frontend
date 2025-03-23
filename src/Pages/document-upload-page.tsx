// import React, { useState } from 'react';

// const DocumentUploadPage = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [problemStatement, setProblemStatement] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState({
//     riskAssessment: true,
//     complianceCheck: true,
//     clauseExtraction: false,
//     summarization: true
//   });
//   const [currentStep, setCurrentStep] = useState(1);
//   const [workflowType, setWorkflowType] = useState('legal');
  
//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const newFiles = files.map(file => ({
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       description: '',
//       lastModified: file.lastModified
//     }));
    
//     setUploadedFiles([...uploadedFiles, ...newFiles]);
//   };
  
//   const removeFile = (index) => {
//     const newFiles = [...uploadedFiles];
//     newFiles.splice(index, 1);
//     setUploadedFiles(newFiles);
//   };
  
//   const updateFileDescription = (index, description) => {
//     const newFiles = [...uploadedFiles];
//     newFiles[index].description = description;
//     setUploadedFiles(newFiles);
//   };
  
//   const toggleOption = (option) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [option]: !selectedOptions[option]
//     });
//   };
  
//   const startAnalysis = () => {
//     // Validate that required fields are filled
//     if (problemStatement.trim() === '') {
//       alert('Please define your problem statement');
//       return;
//     }
    
//     if (uploadedFiles.length === 0) {
//       alert('Please upload at least one document');
//       return;
//     }
    
//     // Check if all files have descriptions
//     const missingDescriptions = uploadedFiles.some(file => !file.description.trim());
//     if (missingDescriptions) {
//       alert('Please provide a description for all uploaded documents');
//       return;
//     }
    
//     // Proceed with analysis (would navigate to results page in real implementation)
//     console.log('Starting analysis with:', {
//       workflowType,
//       problemStatement,
//       files: uploadedFiles,
//       options: selectedOptions
//     });
    
//     // Mock progression to next step
//     setCurrentStep(currentStep + 1);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-indigo-950 text-white">
//       {/* Header */}
//       <header className="border-b border-indigo-800 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">DATACOVE AI</h1>
//           <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
//             Back to Dashboard
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Sidebar */}
//         <div className="w-64 border-r border-indigo-800 p-4">
//           <nav className="space-y-2">
//             <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
//               Dashboard
//             </div>
//             <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
//               My Workflows
//             </div>
//             <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
//               Recent Reports
//             </div>
//             <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
//               Analytics
//             </div>
//             <div className="p-3 rounded-md text-indigo-300 hover:bg-indigo-900 cursor-pointer">
//               Settings
//             </div>
//           </nav>
          
//           {/* User Label */}
//           <div className="absolute bottom-4 left-4 right-4 p-3 flex items-center">
//             <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2">
//               <span>LC</span>
//             </div>
//             <span>Louis Carter</span>
//           </div>
//         </div>

//         {/* Upload Content */}
//         <div className="flex-1 overflow-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             {/* Workflow Title */}
//             <div className="mb-6">
//               <h2 className="text-3xl font-bold">Legal Contract Analysis</h2>
//               <div className="text-indigo-300 mt-2">
//                 <div className="flex items-center">
//                   <div className="flex space-x-1">
//                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-purple-600' : 'bg-indigo-800'}`}>
//                       <span>1</span>
//                     </div>
//                     <div className="w-12 h-1 bg-indigo-800">
//                       <div className={`h-full ${currentStep >= 2 ? 'bg-purple-600' : 'bg-indigo-800'}`}></div>
//                     </div>
//                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-purple-600' : 'bg-indigo-800'}`}>
//                       <span>2</span>
//                     </div>
//                     <div className="w-12 h-1 bg-indigo-800">
//                       <div className={`h-full ${currentStep >= 3 ? 'bg-purple-600' : 'bg-indigo-800'}`}></div>
//                     </div>
//                     <div className={`w-6 h-6 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-purple-600' : 'bg-indigo-800'}`}>
//                       <span>3</span>
//                     </div>
//                   </div>
//                   <div className="ml-4">
//                     Select Workflow → Upload Documents → View Analysis
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Problem Statement */}
//             <div className="bg-indigo-900 rounded-lg p-6 mb-6">
//               <h3 className="text-xl font-medium mb-4">Define Your Problem Statement</h3>
//               <div className="mb-4">
//                 <textarea
//                   className="w-full px-4 py-3 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
//                   placeholder='For example: "Analyze the attached contracts for termination clauses, payment terms, liability limitations, and compliance with GDPR. Highlight any potential risks or unusual terms."'
//                   rows="3"
//                   value={problemStatement}
//                   onChange={(e) => setProblemStatement(e.target.value)}
//                 ></textarea>
//                 <p className="text-xs text-indigo-400 mt-1">
//                   Be specific about what you're looking for. This helps our AI focus on relevant information.
//                 </p>
//               </div>
//             </div>
            
//             {/* Document Upload */}
//             <div className="bg-indigo-900 rounded-lg p-6 mb-6">
//               <h3 className="text-xl font-medium mb-4">Upload Documents</h3>
              
//               {/* Upload Area */}
//               <div className="border border-dashed border-indigo-700 rounded-lg p-8 text-center mb-4 hover:border-purple-500 transition-colors">
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleFileUpload}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
//                   <div className="w-16 h-16 bg-indigo-800 rounded-full flex items-center justify-center mb-4">
//                     <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                   </div>
//                   <p className="text-indigo-300 mb-2">Drag and drop files here</p>
//                   <p className="text-indigo-300">or click to browse</p>
//                 </label>
//               </div>
              
//               {/* Uploaded Files List */}
//               {uploadedFiles.length > 0 && (
//                 <div className="space-y-4">
//                   {uploadedFiles.map((file, index) => (
//                     <div key={index} className="bg-indigo-800 rounded-lg p-4">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center mr-3">
//                             <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <h4 className="font-medium">{file.name}</h4>
//                             <p className="text-xs text-indigo-400">
//                               {(file.size / 1024).toFixed(2)} KB • {new Date(file.lastModified).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                         <button 
//                           className="text-indigo-400 hover:text-red-400"
//                           onClick={() => removeFile(index)}
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
                      
//                       {/* Document Description - Required */}
//                       <div>
//                         <label className="block text-sm text-indigo-300 mb-1">
//                           Document Description <span className="text-red-400">*</span>
//                         </label>
//                         <textarea
//                           className="w-full px-3 py-2 bg-indigo-700 rounded-md border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
//                           placeholder="Briefly describe what this document contains..."
//                           rows="2"
//                           value={file.description}
//                           onChange={(e) => updateFileDescription(index, e.target.value)}
//                         ></textarea>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             {/* Analysis Options */}
//             <div className="bg-indigo-900 rounded-lg p-6 mb-6">
//               <h3 className="text-xl font-medium mb-4">Analysis Options</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div 
//                   className={`p-4 rounded-md border cursor-pointer ${selectedOptions.riskAssessment ? 'border-purple-500 bg-indigo-800' : 'border-indigo-700 bg-indigo-900'}`}
//                   onClick={() => toggleOption('riskAssessment')}
//                 >
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 mr-3"
//                       checked={selectedOptions.riskAssessment}
//                       onChange={() => toggleOption('riskAssessment')}
//                     />
//                     <span>Risk Assessment</span>
//                   </div>
//                 </div>
                
//                 <div 
//                   className={`p-4 rounded-md border cursor-pointer ${selectedOptions.complianceCheck ? 'border-purple-500 bg-indigo-800' : 'border-indigo-700 bg-indigo-900'}`}
//                   onClick={() => toggleOption('complianceCheck')}
//                 >
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 mr-3"
//                       checked={selectedOptions.complianceCheck}
//                       onChange={() => toggleOption('complianceCheck')}
//                     />
//                     <span>Compliance Check</span>
//                   </div>
//                 </div>
                
//                 <div 
//                   className={`p-4 rounded-md border cursor-pointer ${selectedOptions.clauseExtraction ? 'border-purple-500 bg-indigo-800' : 'border-indigo-700 bg-indigo-900'}`}
//                   onClick={() => toggleOption('clauseExtraction')}
//                 >
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 mr-3"
//                       checked={selectedOptions.clauseExtraction}
//                       onChange={() => toggleOption('clauseExtraction')}
//                     />
//                     <span>Clause Extraction</span>
//                   </div>
//                 </div>
                
//                 <div 
//                   className={`p-4 rounded-md border cursor-pointer ${selectedOptions.summarization ? 'border-purple-500 bg-indigo-800' : 'border-indigo-700 bg-indigo-900'}`}
//                   onClick={() => toggleOption('summarization')}
//                 >
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 mr-3"
//                       checked={selectedOptions.summarization}
//                       onChange={() => toggleOption('summarization')}
//                     />
//                     <span>Summarization</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4">
//               <button className="px-6 py-3 border border-indigo-700 rounded-md hover:bg-indigo-800">
//                 Cancel
//               </button>
//               <button 
//                 className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md flex items-center"
//                 onClick={startAnalysis}
//               >
//                 Start Analysis
//                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadPage;