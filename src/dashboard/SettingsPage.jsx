import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <div className="flex flex-col h-full w-full bg-[#1A114A] text-white">
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
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Left Sidebar */}
        {/* <div className="w-64 border-r border-indigo-800 p-4">
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
            <div className="p-3 rounded-md bg-indigo-700 text-white cursor-pointer">
              Settings
            </div>
          </nav>
        </div> */}

        {/* Settings Content */}
        <div className="flex-1 overflow-auto p-6">
          <h2 className="text-3xl font-bold mb-8">Settings</h2>

          {/* Settings Navigation Tabs */}
          <div className="flex border-b border-indigo-800 mb-6 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('account')} 
              className={`px-4 py-2 font-medium ${activeTab === 'account' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              Account
            </button>
            <button 
              onClick={() => setActiveTab('security')} 
              className={`px-4 py-2 font-medium ${activeTab === 'security' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              Security
            </button>
            <button 
              onClick={() => setActiveTab('notifications')} 
              className={`px-4 py-2 font-medium ${activeTab === 'notifications' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('ai')} 
              className={`px-4 py-2 font-medium ${activeTab === 'ai' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              AI Settings
            </button>
            <button 
              onClick={() => setActiveTab('teams')} 
              className={`px-4 py-2 font-medium ${activeTab === 'teams' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              Teams
            </button>
            <button 
              onClick={() => setActiveTab('integration')} 
              className={`px-4 py-2 font-medium ${activeTab === 'integration' ? 'border-b-2 border-purple-500 text-white' : 'text-indigo-300'}`}
            >
              Integrations
            </button>
          </div>

          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      defaultValue="Louis Carter" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      defaultValue="louis.carter@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      defaultValue="Legal Counsel" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      defaultValue="Acme Corporation" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time Zone</label>
                    <select className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Eastern Time (ET)</option>
                      <option>Pacific Time (PT)</option>
                      <option>Central European Time (CET)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md mt-2">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-300">Add an extra layer of security to your account</p>
                    <p className="text-sm text-indigo-400 mt-1">Currently: <span className="text-red-400">Disabled</span></p>
                  </div>
                  <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">API Keys</h3>
                <p className="text-indigo-300 mb-4">Manage API keys to allow external applications to access DataCove AI</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-indigo-800">
                    <div>
                      <p className="font-medium">Production Key</p>
                      <p className="text-sm text-indigo-400">Created: Feb 12, 2025</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-indigo-300 hover:text-indigo-100">
                        View
                      </button>
                      <button className="text-sm text-red-400 hover:text-red-300">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
                <button className="mt-4 bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
                  Generate New API Key
                </button>
              </div>
            </div>
          )}

          {/* AI Settings Tab */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">AI Processing Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" defaultChecked />
                      <span>Enable automatic document preprocessing</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" defaultChecked />
                      <span>Enable PII redaction before AI processing</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Default AI Processing Depth</label>
                    <select className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Standard (Fastest)</option>
                      <option>Enhanced</option>
                      <option>Deep (Most Thorough)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Default AI Analysis Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center p-3 border border-indigo-700 rounded-md">
                    <input type="checkbox" className="mr-2 rounded" defaultChecked />
                    <span>Risk Assessment</span>
                  </label>
                  <label className="flex items-center p-3 border border-indigo-700 rounded-md">
                    <input type="checkbox" className="mr-2 rounded" defaultChecked />
                    <span>Compliance Check</span>
                  </label>
                  <label className="flex items-center p-3 border border-indigo-700 rounded-md">
                    <input type="checkbox" className="mr-2 rounded" defaultChecked />
                    <span>Clause Extraction</span>
                  </label>
                  <label className="flex items-center p-3 border border-indigo-700 rounded-md">
                    <input type="checkbox" className="mr-2 rounded" defaultChecked />
                    <span>Summarization</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
                  Save AI Settings
                </button>
              </div>
            </div>
          )}

          {/* Teams & Sharing Tab */}
          {activeTab === 'teams' && (
            <div className="space-y-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Team Members</h3>
                  <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-sm">
                    Invite Member
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-indigo-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                        <span>LC</span>
                      </div>
                      <div>
                        <p className="font-medium">Louis Carter (You)</p>
                        <p className="text-sm text-indigo-400">louis.carter@example.com</p>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-300">Admin</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-indigo-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                        <span>JD</span>
                      </div>
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-indigo-400">jane.doe@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select className="bg-indigo-800 border border-indigo-700 rounded-md text-sm px-2 py-1">
                        <option>Editor</option>
                        <option>Admin</option>
                        <option>Viewer</option>
                      </select>
                      <button className="text-red-400 hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Sharing Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Report Access</label>
                    <select className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Team Only</option>
                      <option>Anyone with Link</option>
                      <option>Private (Only Me)</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" defaultChecked />
                      <span>Enable document owner watermarks</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration Settings Tab */}
          {activeTab === 'integration' && (
            <div className="space-y-6">
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Connected Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-indigo-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center mr-3">
                        <span className="text-indigo-900 font-bold">G</span>
                      </div>
                      <div>
                        <p className="font-medium">Google Drive</p>
                        <p className="text-sm text-indigo-400">Import documents directly from Drive</p>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">Connected</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-indigo-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white flex items-center justify-center mr-3">
                        <span className="text-indigo-900 font-bold">S</span>
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-indigo-400">Share results directly to channels</p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-indigo-800 hover:bg-indigo-700 px-3 py-1 rounded-md text-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Webhooks</h3>
                <p className="text-indigo-300 mb-4">Configure webhooks to notify your systems when analysis is complete</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Endpoint URL</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-indigo-800 rounded-md border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://your-api.example.com/webhook"
                    />
                  </div>
                  <button className="bg-indigo-800 hover:bg-indigo-700 px-4 py-2 rounded-md">
                    Save Webhook
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;