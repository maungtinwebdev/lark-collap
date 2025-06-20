// scripts/seed.js
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  'https://oplccdvrpvpidjzilzbf.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbGNjZHZycHZwaWRqemlsemJmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQyMzE3OCwiZXhwIjoyMDY1OTk5MTc4fQ.OOIMwX2v3XUGyTKE_39w3uoTmpitkka5FN2R3tKbHmU'
)

async function seed() {
  console.log('🌱 Seeding Supabase data...')

  // --- Seed Users ---
  const users = [
    { email: 'alice@example.com', password: 'password123' },
    { email: 'bob@example.com', password: 'password123' },
    { email: 'carol@example.com', password: 'password123' }
  ]

  const userIds = {}

  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    })
    if (error) {
      console.error(`❌ Failed to create ${user.email}:`, error.message)
    } else {
      console.log(`✅ Created user: ${user.email}`)
      userIds[user.email] = data.user.id
    }
  }

  // --- Seed Team ---
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert({
      name: 'Dev Team',
      created_by: userIds['alice@example.com']
    })
    .select()
    .single()

  if (teamError) {
    console.error('❌ Failed to create team:', teamError.message)
    return
  }

  console.log('✅ Created team:', team.name)

  // --- Seed Team Members ---
  const members = [
    { email: 'alice@example.com', user_id: userIds['alice@example.com'], role: 'owner' },
    { email: 'bob@example.com', user_id: userIds['bob@example.com'], role: 'admin' },
    { email: 'carol@example.com', user_id: userIds['carol@example.com'], role: 'member' }
  ]

  await Promise.all(
    members.map((member) =>
      supabase.from('team_members').insert({
        team_id: team.id,
        email: member.email,
        user_id: member.user_id,
        role: member.role
      })
    )
  )

  console.log('✅ Seeded team members')

  // --- Seed Project ---
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      name: 'Next.js Rebuild',
      description: 'Rebuild the app in Next.js',
      team_id: team.id,
      created_by: userIds['alice@example.com']
    })
    .select()
    .single()

  if (projectError) {
    console.error('❌ Failed to create project:', projectError.message)
    return
  }

  console.log('✅ Created project:', project.name)

  // --- Seed Tasks ---
  const taskTitles = ['Setup project repo', 'Configure Supabase auth', 'Build UI']
  const statuses = ['todo', 'in_progress', 'done']

  for (let i = 0; i < taskTitles.length; i++) {
    await supabase.from('tasks').insert({
      project_id: project.id,
      title: taskTitles[i],
      description: `Task: ${taskTitles[i]}`,
      due_date: new Date(Date.now() + (i + 1) * 86400000).toISOString(),
      assigned_to: userIds['carol@example.com'],
      status: statuses[i],
      created_by: userIds['alice@example.com']
    })
  }

  console.log('✅ Seeded tasks')
}

seed().then(() => {
  console.log('🎉 Seeding complete!')
  process.exit(0)
})