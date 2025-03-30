import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqqhgusjtatzabigizfv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWhndXNqdGF0emFiaWdpemZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MzczNTgsImV4cCI6MjA1NjIxMzM1OH0.x5dSPFDUXyw2hzm8p08UsjUlb7lYRgx7yApd8WwMqBE';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize the events table
const initializeEventsTable = async () => {
  const { error } = await supabase
    .from('events')
    .select()
    .limit(1);

  if (error && error.code === '42P01') {
    // Table doesn't exist, create it
    const { error: createError } = await supabase
      .rpc('create_events_table');

    if (createError) {
      console.error('Error creating events table:', createError);
    }
  }
};

// Call initialization
initializeEventsTable();

// Create team_members table directly with SQL
const createTeamMembersTable = async () => {
  try {
    const { error } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS team_members (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          position TEXT NOT NULL,
          "order" INTEGER NOT NULL,
          "imageUrl" TEXT
        );
      `
    });
    
    if (error) {
      console.error('Error creating team_members table with SQL:', error);
    } else {
      console.log('Team members table created or already exists');
    }
  } catch (err) {
    console.error('Failed to run SQL for team_members table:', err);
  }
};

// Create team_images storage bucket if it doesn't exist
const createTeamImagesBucket = async () => {
  try {
    // First check if the bucket exists
    const { data: buckets, error: listError } = await supabase.storage
      .listBuckets();
      
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    // Check if team_images bucket exists
    const teamImagesBucket = buckets.find(bucket => bucket.name === 'team_images');
    
    // If bucket doesn't exist, create it
    if (!teamImagesBucket) {
      const { error: createError } = await supabase.storage
        .createBucket('team_images', {
          public: true // Make it public so images are accessible
        });
        
      if (createError) {
        console.error('Error creating team_images bucket:', createError);
      } else {
        console.log('Created team_images bucket');
      }
    }
  } catch (err) {
    console.error('Error setting up team_images bucket:', err);
  }
};

// Initialize team members functionality
const initializeTeam = async () => {
  await createTeamMembersTable();
  await createTeamImagesBucket();
};

// Call initialization for team
initializeTeam();
