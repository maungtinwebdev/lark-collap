export type Team = { id: string; name: string; created_at: string; };
export type TeamMember = { id: string; team_id: string; user_id: string | null; email: string; role: string; invited_at: string; };
export type Project = { id: string; team_id: string; name: string; owner_id: string; status: string; created_at: string; };
export type Task = { id: string; project_id: string; title: string; description: string; due_date: string; assigned_to: string; status: string; created_at: string; }; 