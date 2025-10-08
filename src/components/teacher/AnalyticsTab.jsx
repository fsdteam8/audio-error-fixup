import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsTab = ({ students, materials }) => {
  const averageProgress = students.length > 0
    ? Math.round(students.reduce((acc, student) => acc + student.progress, 0) / students.length)
    : 0;

  const stats = [
    {
      icon: Users,
      title: 'Total Students',
      value: students.length,
      description: 'Active learners',
      color: 'text-blue-400'
    },
    {
      icon: FileText,
      title: 'Materials Created',
      value: materials.length,
      description: 'Learning resources',
      color: 'text-green-400'
    },
    {
      icon: BarChart3,
      title: 'Average Progress',
      value: `${averageProgress}%`,
      description: 'Across all students',
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="reading-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <stat.icon className={`h-5 w-5 mr-2 ${stat.color}`} />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalyticsTab;