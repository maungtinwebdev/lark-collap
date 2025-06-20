import React, { useState } from 'react';
import UserSelector from './UserSelector';

const TaskForm = ({ onSave, users, initialTask, onCancel }: any) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [assignee, setAssignee] = useState(initialTask?.assignee || users[0]);
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...initialTask,
      title,
      description,
      assignee,
      dueDate,
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
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
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