import { Task } from '../lib/types';

export default function TaskCard({ task, onClick }: { task: Task, onClick?: () => void }) {
  return (
    <div className="p-4 bg-white rounded shadow mb-2 cursor-pointer" onClick={onClick}>
      <div className="font-bold">{task.title}</div>
      <div className="text-sm text-gray-500">{task.status}</div>
      <div className="text-xs text-gray-400">Due: {task.due_date}</div>
    </div>
  );
} 