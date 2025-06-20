"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';
import { supabase } from '../utils/supabaseClient';

const initialUsers = [
  {
    id: 'e1cbe6b7-1234-4a7e-bc28-1234567890ab',
      email: 'alice@example.com',
      full_name: 'Alice',
      role: 'owner',
      avatar_url: null
    },
    {
      id: 'a2bce6b7-5678-4a7e-bc28-0987654321cd',
      email: 'bob@example.com',
      full_name: 'Bob',
      role: 'admin',
      avatar_url: null
    },
    {
      id: 'c3def6b7-9012-4a7e-bc28-567890abcdef',
      email: 'carol@example.com',
      full_name: 'Carol',
      role: 'member',
      avatar_url: null
  }
];

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  due_date: string;
  status: string;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
      if (!error && data) setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  // Add or update task in Supabase
  const handleSaveTask = async (task: Partial<Task>) => {
    setLoading(true);
    if (task.id) {
      await supabase.from('tasks').update({
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        due_date: task.due_date,
        status: task.status,
      }).eq('id', task.id);
    } else {
      await supabase.from('tasks').insert([
        {
          title: task.title,
          description: task.description,
          assignee: task.assignee,
          due_date: task.due_date,
          status: task.status || 'todo',
        },
      ]);
    }
    // Re-fetch tasks
    const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    setTasks(data || []);
    setShowForm(false);
    setEditTask(null);
    setSelectedTask(null);
    setLoading(false);
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
    setSelectedTask(null);
  };

  const handleNewTask = () => {
    setEditTask(null);
    setShowForm(true);
    setSelectedTask(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <h1 className="text-2xl font-bold">Task Assign</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleNewTask}
            disabled={loading}
          >
            + New Task
          </button>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <TaskList tasks={tasks} onSelectTask={handleSelectTask} />
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <TaskForm
                onSave={handleSaveTask}
                users={initialUsers}
                initialTask={editTask}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
          {selectedTask && (
            <TaskDetails
              task={selectedTask}
              onEdit={handleEditTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
