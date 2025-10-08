import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const TeacherAuthGuard = ({ children }) => {
  const { user, profile } = useAuth();

  if (!user || !profile?.is_teacher) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Teacher Access Required
            </h1>
            <p className="text-xl text-white/80 mb-8">
              This area is restricted to registered teachers and educators.
            </p>
            <Card className="reading-card max-w-md mx-auto">
              <CardContent className="p-8">
                <Users className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">
                  Become a Teacher
                </h3>
                <p className="text-white/80">
                  Register as a teacher to access the dashboard and upload learning materials.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return children;
};

export default TeacherAuthGuard;