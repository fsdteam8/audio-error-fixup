import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krwntcroxrqylmznumrd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd250Y3JveHJxeWxtem51bXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTY0ODgsImV4cCI6MjA3NTA5MjQ4OH0.pirASDYJsZvgEFQkh9hIJbegDVsCOwLhWyKuPV0RDMI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);