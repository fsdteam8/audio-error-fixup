import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from '@/components/ui/use-toast';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const ShortOSound = () => {
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const lessonId = 21;
  const lessonDuration = 10;
  const [activeWord, setActiveWord] = useState(null);
  const { speak, speaking } = useSpeechSynthesis();

  const words = [
    { word: 'dog', imgAlt: 'A cartoon dog' },
    { word: 'fox', imgAlt: 'A cartoon fox' },
    { word: 'pot', imgAlt: 'A cooking pot' },
    { word: 'log', imgAlt: 'A wooden log' },
    { word: 'cow', imgAlt: 'A cartoon cow' },
    { word: 'rock', imgAlt: 'A pile of rocks' },
    { word: 'top', imgAlt: 'A spinning top toy' },
    { word: 'doll', imgAlt: 'A cartoon doll' },
    { word: 'cob', imgAlt: 'A corn on the cob' },
  ];

  const playSound = (word) => {
    setActiveWord(word);
    speak(word);
  };

  const handleCompleteLesson = () => {
    updateProgress(lessonId, lessonDuration);
    toast({
      title: "Lesson completed! 🎉",
      description: 'Great job on "CVC Words: Short O". Your progress is saved.',
    });
    navigate('/resources');
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      borderColor: "#FBBF24"
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>
        <Card className="reading-card">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center">CVC Words: Short 'o'</CardTitle>
            <p className="text-center text-white/80 mt-2">Click a card to hear the word.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {words.map(({ word, imgAlt }, index) => (
                <motion.div
                  key={word}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => playSound(word)}
                  className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === word ? '!border-orange-500 scale-105' : ''}`}
                >
                  <img  alt={imgAlt} className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <p className="text-2xl font-bold text-white capitalize">{word}</p>
                </motion.div>
              ))}
            </div>
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

export default ShortOSound;