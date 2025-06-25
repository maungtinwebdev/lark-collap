import React from 'react';

type User = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
};

interface UserSelectorProps {
  users: User[];
  value: string;
  onChange: (id: string) => void;
}

const UserSelector = ({ users, value, onChange }: UserSelectorProps) => (
  <>
    <label htmlFor="user-selector" className="sr-only">Select user</label>
    <select
      id="user-selector"
      className="w-full border rounded px-3 py-2"
      value={value}
      onChange={e => onChange(e.target.value)}
      title="Select user"
    >
      {users.map((user: User) => (
        <option key={user.id} value={user.id}>{user.full_name}</option>
      ))}
    </select>
  </>
);

export default UserSelector; 