import React from 'react';
import { Task } from '../lib/types';

interface TaskDetailsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onClose: () => void;
}

const TaskDetails = ({ task, onEdit, onClose }: TaskDetailsProps) => {
  if (!task) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400" onClick={onClose}>&times;</button>
        <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
        <div className="mb-2 text-gray-600">{task.description}</div>
        <div className="mb-2 text-sm text-gray-500">Assigned to: {task.assigned_to}</div>
        <div className="mb-2 text-sm text-gray-500">Due: {task.due_date}</div>
        <div className="mb-4 text-xs text-gray-400">Status: {task.status}</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onEdit(task)}>Edit</button>
      </div>
    </div>
  );
};

export default TaskDetails; 