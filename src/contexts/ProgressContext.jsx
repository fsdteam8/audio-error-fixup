import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    completedLessons: [],
    currentLevel: 'beginner',
    totalTimeSpent: 0,
    streakDays: 0,
    lastActivity: null
  });

  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`readwell_progress_${user.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [user]);

  const updateProgress = (lessonId, timeSpent = 0) => {
    if (!user) return;

    const newProgress = {
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, lessonId])],
      totalTimeSpent: progress.totalTimeSpent + timeSpent,
      lastActivity: new Date().toISOString()
    };

    const completedCount = newProgress.completedLessons.length;
    if (completedCount >= 20) {
      newProgress.currentLevel = 'advanced';
    } else if (completedCount >= 10) {
      newProgress.currentLevel = 'intermediate';
    }

    setProgress(newProgress);
    localStorage.setItem(`readwell_progress_${user.id}`, JSON.stringify(newProgress));
  };

  const getProgressPercentage = () => {
    const totalLessons = 30; // Total available lessons
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  const value = {
    progress,
    updateProgress,
    getProgressPercentage
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};