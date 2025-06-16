import React from 'react';
import { LogOut, User, Book, Users, BarChart3, MessageSquare, FileCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { userProfile, logout } = useAuth();

  const facultyTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { id: 'students', label: 'Students', icon: Users, color: 'text-green-600' },
    { id: 'experiments', label: 'Experiments', icon: Book, color: 'text-purple-600' },
    { id: 'viva-questions', label: 'Viva Questions', icon: MessageSquare, color: 'text-orange-600' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, color: 'text-teal-600' },
    { id: 'profile', label: 'My Profile', icon: User, color: 'text-gray-600' },
  ];

  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { id: 'experiments', label: 'Experiments', icon: Book, color: 'text-purple-600' },
    { id: 'profile', label: 'My Profile', icon: User, color: 'text-gray-600' },
  ];

  const tabs = userProfile?.role === 'faculty' ? facultyTabs : studentTabs;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Book className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  NBKR Institute of Science and Technology
                </h1>
                <p className="text-sm text-gray-600">Computer Networks Lab Evaluation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  Welcome, {userProfile?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userProfile?.role}
                  {userProfile?.role === 'student' && userProfile?.rollNo && ` • ${userProfile.rollNo}`}
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex space-x-8 min-h-full">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                <ul className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => onTabChange(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600' : tab.color}`} />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>

      {/* Footer - Fixed to bottom */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              Designed and Developed by <span className="font-semibold text-blue-400">IEEE-NBKRIST</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Computer Networks Lab Evaluation System © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;