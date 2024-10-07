// src/components/Sidebar.js

import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <ul className='flex flex-col pl-5'>
          <li>
            <button 
              className={`block p-3 rounded-md ${activeTab === 'overview' ? 'bg-blue-500' : 'hover:bg-gray-700'}`} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li>
            <button 
              className={`block p-3 rounded-md ${activeTab === 'users' ? 'bg-blue-500' : 'hover:bg-gray-700'}`} 
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </li>
          <li>
            <button 
              className={`block p-3 rounded-md ${activeTab === 'places' ? 'bg-blue-500' : 'hover:bg-gray-700'}`} 
              onClick={() => setActiveTab('places')}
            >
              Places
            </button>
          </li>
          <li>
            <button 
              className={`block p-3 rounded-md ${activeTab === 'events' ? 'bg-blue-500' : 'hover:bg-gray-700'}`} 
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
