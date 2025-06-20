import { supabase } from '../lib/supabaseClient';
import { Task } from '../lib/types';

export async function getTasksByProject(projectId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('due_date', { ascending: true });
  if (error) throw error;
  return data as Task[];
}

export async function createTask(task: Partial<Task>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();
  if (error) throw error;
  return data as Task;
} 