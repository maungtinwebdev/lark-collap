"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@supabase/supabase-js';
import { Task } from '../lib/types';

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

type RawTask = {
  id: string;
  project_id?: string;
  title: string;
  description: string;
  due_date: string;
  assigned_to: string;
  status: string;
  created_at?: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Partial<Task> | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
      if (!data.user) router.push('/');
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) router.push('/');
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
      if (!error && data) {
        // Ensure all required Task fields are present
        const tasksWithDefaults = data.map((task: RawTask) => ({
          id: task.id,
          project_id: task.project_id || 'default',
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          assigned_to: task.assigned_to,
          status: task.status,
          created_at: task.created_at || new Date().toISOString(),
        }));
        setTasks(tasksWithDefaults);
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleSaveTask = async (task: Partial<Task>) => {
    setLoading(true);
    if (task.id) {
      await supabase.from('tasks').update({
        title: task.title,
        description: task.description,
        assigned_to: task.assigned_to,
        due_date: task.due_date,
        status: task.status,
      }).eq('id', task.id);
    } else {
      await supabase.from('tasks').insert([
        {
          project_id: task.project_id || 'default',
          title: task.title,
          description: task.description,
          assigned_to: task.assigned_to,
          due_date: task.due_date,
          status: task.status || 'todo',
          created_at: new Date().toISOString(),
        },
      ]);
    }
    const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true });
    setTasks(data || []);
    setShowForm(false);
    setEditTask(undefined);
    setSelectedTask(undefined);
    setLoading(false);
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
    setSelectedTask(undefined);
  };

  const handleNewTask = () => {
    setEditTask(undefined);
    setShowForm(true);
    setSelectedTask(undefined);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
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
              onClose={() => setSelectedTask(undefined)}
            />
          )}
        </div>
      </main>
    </div>
  );
} 