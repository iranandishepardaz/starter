import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qxdvfudxfzauqvcdaemd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZHZmdWR4ZnphdXF2Y2RhZW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMTg3NTUsImV4cCI6MjA3MzY5NDc1NX0.7dN-AKQIrHMMprW0GNtdjF9w5a1o_ZSzE4F7xsiVWlM';

export const supabase = createClient(supabaseUrl, supabaseKey);
