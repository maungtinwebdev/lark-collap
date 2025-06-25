import React from 'react';

interface SidebarProps {
  user?: { email?: string } | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
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
      <div className="mt-auto text-sm text-gray-500">User: {user?.email || 'Guest'}</div>
    </aside>
  );
};

export default Sidebar; 