import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const VowelSoundsLesson = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProgress } = useProgress();
  const { speak } = useSpeechSynthesis();
  const lessonId = 1;
  const lessonDuration = 15;

  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const pronounceLetter = (letter) => {
    speak(letter);
  };

  const handleCompleteLesson = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your progress.",
      });
      navigate('/login');
      return;
    }
    updateProgress(lessonId, lessonDuration);
    toast({
      title: "Lesson completed! 🎉",
      description: 'Great job on "Letter Recognition". Your progress is saved.',
    });
    navigate('/resources');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>

        <Card className="reading-card">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center">The Vowels</CardTitle>
            <p className="text-center text-white/80 mt-2">Click on a letter to hear its name.</p>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {vowels.map((vowel) => (
                <motion.div key={vowel} variants={itemVariants}>
                  <button
                    onClick={() => pronounceLetter(vowel)}
                    className="w-full aspect-square bg-white/10 rounded-lg flex flex-col items-center justify-center group transition-all duration-300 hover:bg-orange-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <span className="text-6xl md:text-8xl font-bold text-white transition-transform group-hover:scale-110">
                      {vowel}
                    </span>
                    <span className="text-4xl md:text-6xl font-bold text-white/70 transition-transform group-hover:scale-110">
                      {vowel.toLowerCase()}
                    </span>
                    <Volume2 className="h-8 w-8 text-yellow-200 absolute bottom-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={handleCompleteLesson} size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            <Check className="h-5 w-5 mr-2" />
            Mark as Completed
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VowelSoundsLesson;