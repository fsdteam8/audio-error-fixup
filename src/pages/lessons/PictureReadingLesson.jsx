import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const lessonData = [
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/df17c2f1eca210df23f9167d23c675bb.jpg",
    alt: "Diagram of the human body",
    words: ["hair", "head", "ear", "neck", "shoulder", "chest", "arm", "nipple", "stomach", "navel", "waist", "groin", "knee", "shin", "toenail", "big toe", "sole", "foot", "ankle", "instep", "leg", "thigh", "buttocks", "hip", "small of the back", "forearm", "elbow", "back", "armpit", "calf", "heel", "arch of the foot", "ball of the foot"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/1dea543e8071fff2ad03450f7db7c12e.jpg",
    alt: "Diagram of the leg",
    words: ["thigh", "knee", "shin", "toe", "calf", "ankle", "heel"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/e79a87ace292bb3fa410efeb5a653870.jpg",
    alt: "Diagram of internal organs",
    words: ["brain", "vein", "artery", "lung", "liver", "kidney", "small intestine", "large intestine", "throat", "heart", "stomach", "fatty tissue", "muscle"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/8211570f71b222584014086820382ca3.jpg",
    alt: "Diagram of the back of the human body",
    words: ["hair", "nape", "shoulder blade", "back", "elbow", "waist", "forearm", "wrist", "hand", "thigh", "calf", "heel", "head", "neck", "trunk", "hip", "loin", "buttock", "leg", "foot"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/d91bc2565e80ac601351c45caf26eb0b.jpg",
    alt: "Diagram of internal organs with respiratory system",
    words: ["brain", "epiglottis", "larynx", "trachea", "aorta", "heart", "liver", "kidney", "gall bladder", "duodenum", "colon", "appendix", "spinal cord", "uvula", "esophagus", "lung", "capillaries", "stomach", "spleen", "pancreas", "large intestine", "small intestine"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/122ee36d5bc0e7ed235940fc09a0a003.jpg",
    alt: "Diagram of body parts on a female figure",
    words: ["hand", "shoulder", "head", "neck", "finger", "thumb", "wrist", "elbow", "breast", "belly", "thigh", "knee", "lower leg", "toe", "calf", "ankle", "foot", "bottom", "back", "upper arm", "forearm"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/ccb8449fc24b606f25531bc25a1e46e5.jpg",
    alt: "Diagram of the arm and hand",
    words: ["knuckle", "fist", "fingernail", "shoulder", "armpit", "bicep", "upper arm", "elbow", "forearm", "wrist", "thumb", "index finger", "middle finger", "ring finger", "little finger", "palm"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/532e4ecad86ca26005ea1bdfc8fcf7f7.jpg",
    alt: "Diagram of the face",
    words: ["forehead", "temple", "eyelash", "earlobe", "nose", "nostril", "mouth", "jaw", "chin", "teeth", "lip", "cheek", "ear", "eye", "eyebrow", "hair"]
  },
  {
    img: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/26fafe6e1967dc9f5474964357a8e15d.jpg",
    alt: "CVC Word List with Pictures",
    words: ["cat", "van", "jam", "rag", "mat", "mad", "nap", "dad", "bat", "tap", "map", "hat", "ham", "fan", "can", "sad", "jet", "pet", "leg", "set", "web", "hen", "wet", "vet", "ten", "pen", "men", "red", "bed", "net", "fed", "wed", "lip", "rip", "fix", "wig", "sit", "sip", "pin", "bin", "six", "fin", "hit", "dig", "dip", "rib", "pig", "pit", "bot", "job", "mob", "box", "hog", "cop", "mop", "fox", "fog", "rob", "dot", "pop", "log", "pot", "mom", "jog", "bug", "mug", "pug", "sun", "nut", "rug", "cut", "fun", "gum", "tug", "cup", "pup", "mud", "tub", "run"]
  }
];

const PictureReadingLesson = () => {
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const lessonId = 23;
  const lessonDuration = 20;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeWord, setActiveWord] = useState(null);
  const { speak, speaking } = useSpeechSynthesis();

  const playSound = (word) => {
    setActiveWord(word);
    speak(word);
  };

  const handleCompleteLesson = () => {
    updateProgress(lessonId, lessonDuration);
    toast({
      title: "Lesson completed! 🎉",
      description: 'Great job on "Picture Reading". Your progress is saved.',
    });
    navigate('/resources');
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === lessonData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? lessonData.length - 1 : prev - 1));
  };

  const currentSlide = lessonData[currentIndex];

  return (
    <>
      <Helmet>
        <title>Picture Reading - ReadNow</title>
        <meta name="description" content="Learn new vocabulary by reading diagrams of the human body." />
      </Helmet>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
          </div>

          <Card className="reading-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center">Picture Reading</CardTitle>
              <p className="text-center text-white/80 mt-2">Click a word to hear it pronounced.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={currentSlide.img}
                      alt={currentSlide.alt}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-lg w-full object-contain"
                    />
                  </AnimatePresence>
                  <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                    <Button onClick={prevSlide} variant="outline" size="icon" className="bg-black/50 text-white hover:bg-black/70 border-none">
                      <ChevronLeft />
                    </Button>
                    <Button onClick={nextSlide} variant="outline" size="icon" className="bg-black/50 text-white hover:bg-black/70 border-none">
                      <ChevronRight />
                    </Button>
                  </div>
                   <div className="text-center mt-4 text-white/70">
                    {currentIndex + 1} / {lessonData.length}
                  </div>
                </div>

                <div className="max-h-[500px] overflow-y-auto pr-2">
                  <div className="flex flex-wrap gap-3">
                    {currentSlide.words.map((word) => (
                      <motion.div key={word} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          onClick={() => playSound(word)}
                          className={`capitalize transition-all duration-200
                            ${speaking && activeWord === word 
                              ? 'bg-orange-500 text-white border-orange-500' 
                              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}
                          `}
                        >
                          {word}
                          {speaking && activeWord === word && <Volume2 className="h-4 w-4 ml-2" />}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
    </>
  );
};

export default PictureReadingLesson;