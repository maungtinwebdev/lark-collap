import React from 'react';
import { Task } from '../lib/types';

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const TaskList = ({ tasks, onSelectTask }: TaskListProps) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Tasks</h3>
      <ul>
        {tasks.length === 0 ? (
          <li className="text-gray-400">No tasks yet.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white rounded shadow p-4 mb-4 cursor-pointer hover:bg-blue-50"
              onClick={() => onSelectTask(task)}
            >
              <div className="font-bold">{task.title}</div>
              <div className="text-sm text-gray-500">Assigned to: {task.assigned_to}</div>
              <div className="text-xs text-gray-400">Due: {task.due_date}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList; 