import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock, BookOpen, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';

const ProgressPage = () => {
  const { user, profile } = useAuth();
  const { progress, getProgressPercentage } = useProgress();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Track Your Progress
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Sign in to view your learning progress, achievements, and statistics.
            </p>
            <Card 
              className="reading-card max-w-md mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/login')}
            >
              <CardContent className="p-8">
                <BookOpen className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">
                  Start Tracking Today
                </h3>
                <p className="text-white/80">
                  Create an account to monitor your reading journey and celebrate your achievements.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: BookOpen,
      title: 'Lessons Completed',
      value: progress.completedLessons.length,
      total: 30,
      color: 'text-yellow-300'
    },
    {
      icon: Clock,
      title: 'Time Spent Learning',
      value: `${Math.floor(progress.totalTimeSpent / 60)}h ${progress.totalTimeSpent % 60}m`,
      color: 'text-green-400'
    },
    {
      icon: TrendingUp,
      title: 'Current Level',
      value: progress.currentLevel.charAt(0).toUpperCase() + progress.currentLevel.slice(1),
      color: 'text-pink-400'
    },
    {
      icon: Target,
      title: 'Overall Progress',
      value: `${getProgressPercentage()}%`,
      color: 'text-orange-400'
    }
  ];

  const achievements = [
    { 
      title: 'First Steps', 
      description: 'Complete your first lesson', 
      earned: progress.completedLessons.length >= 1,
      icon: '🎯'
    },
    { 
      title: 'Getting Started', 
      description: 'Complete 5 lessons', 
      earned: progress.completedLessons.length >= 5,
      icon: '📚'
    },
    { 
      title: 'Dedicated Learner', 
      description: 'Complete 10 lessons', 
      earned: progress.completedLessons.length >= 10,
      icon: '⭐'
    },
    { 
      title: 'Reading Champion', 
      description: 'Complete 20 lessons', 
      earned: progress.completedLessons.length >= 20,
      icon: '🏆'
    },
    { 
      title: 'Time Investment', 
      description: 'Spend 5+ hours learning', 
      earned: progress.totalTimeSpent >= 300,
      icon: '⏰'
    },
    { 
      title: 'Level Up', 
      description: 'Reach intermediate level', 
      earned: progress.currentLevel !== 'beginner',
      icon: '🚀'
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Learning Progress
          </h1>
          <p className="text-xl text-white/80">
            Track your reading journey and celebrate your achievements, {profile?.name || user.email}!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="reading-card">
            <CardHeader>
              <CardTitle className="text-white text-center">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {getProgressPercentage()}%
                  </div>
                  <p className="text-white/80">Complete</p>
                </div>
                <Progress 
                  value={getProgressPercentage()} 
                  className="h-4 progress-glow"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>{progress.completedLessons.length} lessons completed</span>
                  <span>30 total lessons</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="reading-card text-center">
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-white/80 text-sm">{stat.title}</p>
                  {stat.total && (
                    <div className="mt-2">
                      <Progress 
                        value={(stat.value / stat.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Card className={`reading-card ${achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-60'}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <div className="flex items-center justify-center text-yellow-400">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Earned!</span>
                      </div>
                    ) : (
                      <div className="text-white/60 text-sm">
                        Not yet earned
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {progress.lastActivity && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12"
          >
            <Card className="reading-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-yellow-300" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">
                  Last lesson completed: {new Date(progress.lastActivity).toLocaleDateString()}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Keep up the great work! Consistency is key to improving your reading skills.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;