import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from '@/components/ui/use-toast';
import { useSpeech } from '@/contexts/SpeechContext';

const CvcShortO = () => {
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const { speak, speaking } = useSpeech();
  const lessonId = 'cvc-short-o';
  const lessonDuration = 10;
  const [activeWord, setActiveWord] = useState(null);

  const words = [
    { word: 'dog', imgAlt: 'A friendly cartoon dog' },
    { word: 'fox', imgAlt: 'A clever cartoon fox' },
    { word: 'pot', imgAlt: 'A shiny cooking pot' },
    { word: 'log', imgAlt: 'A brown wooden log' },
    { word: 'cow', imgAlt: 'A happy cartoon cow' },
    { word: 'rock', imgAlt: 'A gray cartoon rock' },
    { word: 'top', imgAlt: 'A colorful spinning top toy' },
    { word: 'doll', imgAlt: 'A cute cartoon doll' },
    { word: 'cob', imgAlt: 'A yellow corn on the cob' },
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
              <motion.div
                key="dog"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('dog')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'dog' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A friendly cartoon dog" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1647179924662-13b7bc73a886" />
                <p className="text-2xl font-bold text-white capitalize">dog</p>
              </motion.div>
              <motion.div
                key="fox"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('fox')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'fox' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A clever cartoon fox" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1677144649437-df063a3e8fc4" />
                <p className="text-2xl font-bold text-white capitalize">fox</p>
              </motion.div>
              <motion.div
                key="pot"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('pot')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'pot' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A shiny cooking pot" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1693038603562-bb6191269ecc" />
                <p className="text-2xl font-bold text-white capitalize">pot</p>
              </motion.div>
              <motion.div
                key="log"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('log')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'log' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A brown wooden log" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1593696369816-16550779ff1d" />
                <p className="text-2xl font-bold text-white capitalize">log</p>
              </motion.div>
              <motion.div
                key="cow"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('cow')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'cow' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A happy cartoon cow" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1689763751032-55c611d45753" />
                <p className="text-2xl font-bold text-white capitalize">cow</p>
              </motion.div>
              <motion.div
                key="rock"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('rock')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'rock' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A gray cartoon rock" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1618695497554-6fdbb916806b" />
                <p className="text-2xl font-bold text-white capitalize">rock</p>
              </motion.div>
              <motion.div
                key="top"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('top')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'top' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A colorful spinning top toy" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1503006422681-88414934d5a0" />
                <p className="text-2xl font-bold text-white capitalize">top</p>
              </motion.div>
              <motion.div
                key="doll"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('doll')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'doll' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A cute cartoon doll" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1661634376952-0ecd44a6ef9d" />
                <p className="text-2xl font-bold text-white capitalize">doll</p>
              </motion.div>
              <motion.div
                key="cob"
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => playSound('cob')}
                className={`bg-white/10 p-4 rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center ${speaking && activeWord === 'cob' ? '!border-orange-500 scale-105' : ''}`}
              >
                <img alt="A yellow corn on the cob" className="h-24 w-24 object-contain mb-3" src="https://images.unsplash.com/photo-1699805135948-3dba0efc047a" />
                <p className="text-2xl font-bold text-white capitalize">cob</p>
              </motion.div>
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

export default CvcShortO;