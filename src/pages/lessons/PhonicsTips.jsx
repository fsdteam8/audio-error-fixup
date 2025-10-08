import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { X, Volume2, Loader2, ChevronLeft } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const phonicsTipsData = [
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/80eb9d9630590dd8cd90752c2bc5e29f.jpg",
    alt: "Phonics Tip 1: Short a sound",
    audioText: "Short a sound, as in cat."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/ab280ce07c9c01a47cedc3fbc6901204.jpg",
    alt: "Phonics Tip 2: Short e sound",
    audioText: "Short e sound, as in bed."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/7922cac1b9cf344903212c1ac50426f6.jpg",
    alt: "Phonics Tip 3: Short i sound",
    audioText: "Short i sound, as in sit."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/2114c04c2aa405f8a4d24071e3853d4e.jpg",
    alt: "Phonics Tip 4: Short o sound",
    audioText: "Short o sound, as in top."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/fa3c2b17d2e8ea132eedaf7d4a4dd2c9.jpg",
    alt: "Phonics Tip 5: Short u sound",
    audioText: "Short u sound, as in sun."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/68913eede4a2f39c77fc2f33b6f72655.jpg",
    alt: "Phonics Tip 6: CVC words",
    audioText: "CVC words. Consonant, Vowel, Consonant."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/7cf21402b1f83105fc425261fbd51c91.jpg",
    alt: "Phonics Tip 7: Digraphs",
    audioText: "Digraphs. Two letters that make one sound, like sh, ch, th."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/057185d9334bc6b5e83165c88a960392.jpg",
    alt: "Phonics Tip 8: Every syllable will have at least one vowel sound.",
    audioText: "Every syllable will have at least one vowel sound. A vowel can stand alone in the word or be surrounded by consonants. Example: u/nit, jet, fam/i/ly."
  },
  {
    src: "https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/f0984ee0fd32df3af4f8f510b4fa2376.jpg",
    alt: "Phonics Tip 9: When the letter w is before or, the or says er.",
    audioText: "When the letter w is before or, the or says er. Examples: worm, word."
  }
];

const PhonicsTips = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handlePlayAudio = (text) => {
    if (speaking) {
      cancel();
    } else {
      speak(text);
    }
  };
  
  const handleCloseModal = () => {
    cancel();
    setSelectedImage(null);
  }

  return (
    <>
      <Helmet>
        <title>Phonics Tips - ReadNow</title>
        <meta name="description" content="Helpful phonics tips to improve your reading skills." />
      </Helmet>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/resources')} className="text-foreground hover:bg-foreground/10">
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Phonics Tips
            </h1>
            <p className="text-xl text-foreground/80">
              Click on an image to enlarge it and hear the sound.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {phonicsTipsData.map((tip, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants} 
                onClick={() => setSelectedImage(tip)}
                className="cursor-pointer"
                layoutId={`card-${index}`}
              >
                <Card className="overflow-hidden bg-card hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <img 
                      src={tip.src} 
                      alt={tip.alt} 
                      className="w-full h-auto object-cover"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative"
              layoutId={`card-${phonicsTipsData.findIndex(item => item.src === selectedImage.src)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                 <Button 
                  onClick={() => handlePlayAudio(selectedImage.audioText)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-36"
                  disabled={speaking}
                >
                  {speaking ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Volume2 className="mr-2 h-5 w-5" />
                  )}
                  {speaking ? 'Playing...' : 'Play Sound'}
                </Button>
              </div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              onClick={handleCloseModal}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhonicsTips;