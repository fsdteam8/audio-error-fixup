import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createClient } from '@supabase/supabase-js';

// Class name utility for Tailwind
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Supabase client initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://krwntcroxrqylmnumrd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);