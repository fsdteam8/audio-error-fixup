import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Volume2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSpeech } from '@/contexts/SpeechContext';

const AlphabetLesson = () => {
  const [activeLetter, setActiveLetter] = useState(null);
  const navigate = useNavigate();
  const { speak, speaking } = useSpeech();

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const playSound = (letter) => {
    setActiveLetter(letter);
    speak(letter);
  };

  const letterVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -5, transition: { type: 'spring', stiffness: 300 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Alphabet</h1>
          <p className="text-xl text-white/80">Click on each letter to hear its name.</p>
        </motion.div>

        <Card className="reading-card">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4">
              {alphabet.map((letter) => (
                <motion.div key={letter} variants={letterVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Button
                    onClick={() => playSound(letter)}
                    className={`w-full h-20 md:h-24 text-2xl md:text-3xl font-bold flex flex-col items-center justify-center transition-all duration-300
                      ${speaking && activeLetter === letter ? 'bg-orange-500 text-white scale-110 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}
                    `}
                  >
                    <span>{letter}</span>
                    <span className="text-lg">{letter.toLowerCase()}</span>
                    {speaking && activeLetter === letter && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-1">
                        <Volume2 className="h-5 w-5" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlphabetLesson;