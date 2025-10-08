import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from '@/components/ui/use-toast';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const CvcShortU = () => {
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const lessonId = 20;
  const lessonDuration = 15;
  const [activeWord, setActiveWord] = useState(null);
  const { speak, speaking } = useSpeechSynthesis();

  const wordGroups = {
    '-um': ['gum', 'hum', 'sum'],
    '-un': ['bun', 'fun', 'nun', 'pun', 'run', 'sun'],
    '-ug': ['bug', 'hug', 'lug', 'rug', 'tug'],
    '-up': ['cup', 'pup', 'sup'],
  };

  const playSound = (word) => {
    setActiveWord(word);
    speak(word);
  };

  const handleCompleteLesson = () => {
    updateProgress(lessonId, lessonDuration);
    toast({
      title: "Lesson completed! 🎉",
      description: 'Great job on "CVC Words with Short U". Your progress is saved.',
    });
    navigate('/resources');
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>
        <Card className="reading-card">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center">CVC Words with Short 'u'</CardTitle>
            <p className="text-center text-white/80 mt-2">Click a word to hear it pronounced.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(wordGroups).map(([group, words]) => (
                <div key={group}>
                  <h3 className="text-2xl font-bold text-yellow-200 text-center mb-4">{group}</h3>
                  <div className="space-y-3">
                    {words.map((word) => (
                      <motion.div key={word} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          onClick={() => playSound(word)}
                          className={`w-full h-14 text-xl font-semibold flex items-center justify-center transition-all duration-200 ${speaking && activeWord === word ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                        >
                          {word}
                          {speaking && activeWord === word && <Volume2 className="h-5 w-5 ml-3" />}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
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

export default CvcShortU;