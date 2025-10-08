// src/pages/AuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/utils'; // Adjust path if your Supabase client is elsewhere

const AuthCallback = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      // Parse URL hash (e.g., #access_token=...&refresh_token=...)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      const error = params.get('error');
      const error_description = params.get('error_description');

      // Handle errors
      if (error) {
        console.error('Auth error:', error, error_description);
        toast({
          title: 'Authentication Error',
          description: error_description || 'Failed to sign in. Please try again.',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }

      // Set Supabase session if tokens are present
      if (access_token && refresh_token) {
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          console.error('Session set error:', sessionError.message);
          toast({
            title: 'Authentication Error',
            description: sessionError.message || 'Failed to set session.',
            variant: 'destructive',
          });
          navigate('/login');
          return;
        }
      } else {
        console.error('Missing tokens in callback URL');
        toast({
          title: 'Authentication Error',
          description: 'No authentication tokens found.',
          variant: 'destructive',
        });
        navigate('/login');
      }

      // Clear hash from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    };

    // Run callback handler
    handleCallback();
  }, [navigate, toast]);

  // Redirect if session exists (set by SupabaseAuthContext)
  useEffect(() => {
    if (session) {
      navigate('/resources');
    }
  }, [session, navigate]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white">Signing you in...</h1>
        <p className="text-white/80">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default AuthCallback;