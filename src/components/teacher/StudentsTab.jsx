import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentsTab = ({ students }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="reading-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-400" />
            Student Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {students.map((student) => (
              <div key={student.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold">{student.name}</h3>
                <p className="text-white/70 text-sm capitalize">{student.level} Level</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-white/60 mb-1">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-2">
                  Last active: {new Date(student.lastActive).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentsTab;