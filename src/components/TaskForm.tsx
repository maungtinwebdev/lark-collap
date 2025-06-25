import React, { useState } from 'react';
import UserSelector from './UserSelector';
import { Task } from '../lib/types';

type User = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
};

interface TaskFormProps {
  onSave: (task: Partial<Task>) => void;
  users: User[];
  initialTask?: Partial<Task>;
  onCancel?: () => void;
}

const TaskForm = ({ onSave, users, initialTask, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [assignee, setAssignee] = useState(initialTask?.assigned_to || users[0].id);
  const [dueDate, setDueDate] = useState(initialTask?.due_date || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...initialTask,
      title,
      description,
      assigned_to: assignee,
      due_date: dueDate,
      status: initialTask?.status || 'todo',
    });
  };

  return (
    <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold mb-4">{initialTask ? 'Edit Task' : 'New Task'}</h3>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="Task title"
          title="Task title"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task description"
          title="Task description"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Assignee</label>
        <UserSelector users={users} value={assignee} onChange={setAssignee} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Due Date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          placeholder="Due date"
          title="Due date"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        {onCancel && (
          <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default TaskForm; 