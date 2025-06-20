import React from 'react';

const UserSelector = ({ users, value, onChange }: any) => {
  return (
    <select
      className="w-full border rounded px-3 py-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {users.map((user: string) => (
        <option key={user.id} value={user.id}>{user.full_name}</option>
      ))}
    </select>
  );
};

export default UserSelector; 