import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import TeacherAuthGuard from '@/components/teacher/TeacherAuthGuard';
import MaterialsTab from '@/components/teacher/MaterialsTab';
import StudentsTab from '@/components/teacher/StudentsTab';
import AnalyticsTab from '@/components/teacher/AnalyticsTab';

const TeacherDashboard = () => {
  const { user, profile } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedMaterials = localStorage.getItem('teacher_materials');
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials));
    }

    const mockStudents = [
      { id: 1, name: 'John Smith', level: 'beginner', progress: 25, lastActive: '2025-08-25' },
      { id: 2, name: 'Maria Garcia', level: 'intermediate', progress: 60, lastActive: '2025-08-28' },
      { id: 3, name: 'David Johnson', level: 'beginner', progress: 40, lastActive: '2025-08-22' },
      { id: 4, name: 'Lisa Chen', level: 'advanced', progress: 85, lastActive: '2025-08-30' }
    ];
    setStudents(mockStudents);
  }, []);

  return (
    <TeacherAuthGuard>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Teacher Dashboard
            </h1>
            <p className="text-xl text-white/80">
              Welcome back, {profile?.name || user?.email}! Manage your learning materials and track student progress.
            </p>
          </motion.div>

          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10">
              <TabsTrigger value="materials" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                <FileText className="h-4 w-4 mr-2" /> Materials
              </TabsTrigger>
              <TabsTrigger value="students" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                <Users className="h-4 w-4 mr-2" /> Students
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white data-[state=active]:text-orange-600">
                <BarChart3 className="h-4 w-4 mr-2" /> Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="materials">
              <MaterialsTab materials={materials} setMaterials={setMaterials} user={user} />
            </TabsContent>

            <TabsContent value="students">
              <StudentsTab students={students} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTab students={students} materials={materials} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TeacherAuthGuard>
  );
};

export default TeacherDashboard;