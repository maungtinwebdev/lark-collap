import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Lark Tasks</h2>
      {/* Navigation and user info will go here */}
      <nav className="flex-1">
        <ul>
          <li className="mb-4 font-semibold text-blue-600">All Tasks</li>
          <li className="mb-4 text-gray-600">My Tasks</li>
        </ul>
      </nav>
      <div className="mt-auto text-sm text-gray-500">User: Alice</div>
    </aside>
  );
};

export default Sidebar; 