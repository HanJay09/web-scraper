// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otdhyixbxugmikkfbbkr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90ZGh5aXhieHVnbWlra2ZiYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MDk0OTgsImV4cCI6MjA0NDE4NTQ5OH0.y6qAW2wx2dMA6CJNxVlo9YirWBze6zCyJXuchjd3fD8'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
