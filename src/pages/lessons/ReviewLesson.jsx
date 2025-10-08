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

const lessonContent = [
  {
    type: 'qna',
    title: 'Speech Sounds',
    items: [
      { q: "What are speech sounds?", a: "Speech sounds are the sounds we make when we talk, like the 'b' in 'ball' or the 's' in 'sun'." },
      { q: "Why is it important to pronounce speech sounds correctly?", a: "It helps people understand us clearly when we talk." },
      { q: "What is a vowel sound? Can you name all five vowels?", a: "Vowel sounds are made with an open mouth and no significant blockage of air. The five vowels are A, E, I, O, and U." },
      { q: "What is a consonant sound? Can you give an example?", a: "Consonant sounds are made when we use our lips, tongue, or teeth to block or restrict airflow. An example is the 't' in 'toy'." },
      { q: "How can practicing speech sounds help you become a better speaker?", a: "Practicing can help you say words more clearly and be understood easily by others." }
    ]
  },
  {
    type: 'image',
    title: 'Alphabet Practice',
    img: 'https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/5405838fe349f400e7b832da7f36c41a.jpg',
    alt: 'Alphabet picture matching worksheet'
  },
  {
    type: 'image',
    title: 'Things in the Classroom',
    img: 'https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/a88b9c340925117974ce40b5ced71b34.jpg',
    alt: 'Things in the classroom worksheet'
  },
  {
    type: 'image',
    title: 'My Classroom Vocabulary',
    img: 'https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/1b42fa8a72818f4b4e69b3bf2dc1b6c9.jpg',
    alt: 'My classroom vocabulary'
  },
  {
    type: 'reading',
    title: 'Read English Books!',
    text: "Reading is a great way to learn. I read easy English books. I start with short stories. I learn new words as I read. I write down difficult words. Later, I check their meanings. Reading helps me understand grammar and sentence structure. The more I read, the better my English gets.",
    img: 'https://horizons-cdn.hostinger.com/7be0f05b-4d23-4fa0-82de-0e43a84c8f29/23a32287931ca00c9a9f0576b9995768.jpg',
    alt: 'Illustration of a person reading a book'
  }
];

const ReviewLesson = () => {
  const navigate = useNavigate();
  const { updateProgress } = useProgress();
  const lessonId = 24;
  const lessonDuration = 25;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useSpeechSynthesis();

  const handleCompleteLesson = () => {
    updateProgress(lessonId, lessonDuration);
    toast({
      title: "Lesson completed! 🎉",
      description: 'Great job on the "Review" lesson. Your progress is saved.',
    });
    navigate('/resources');
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev === lessonContent.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? lessonContent.length - 1 : prev - 1));

  const currentItem = lessonContent[currentIndex];

  const renderContent = () => {
    switch (currentItem.type) {
      case 'qna':
        return (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
            {currentItem.items.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/10">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-white">{item.q}</p>
                  <Button variant="ghost" size="icon" onClick={() => speak(item.q)}>
                    <Volume2 className="h-5 w-5 text-white/80" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-white/90">{item.a}</p>
                  <Button variant="ghost" size="icon" onClick={() => speak(item.a)}>
                    <Volume2 className="h-5 w-5 text-white/80" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'reading':
        return (
          <div className="text-center">
            <img src={currentItem.img} alt={currentItem.alt} className="max-w-xs mx-auto rounded-lg mb-6" />
            <p className="text-lg text-white/90 leading-relaxed mb-6">{currentItem.text}</p>
            <Button onClick={() => speak(currentItem.text)} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Volume2 className="h-5 w-5 mr-2" />
              Read Aloud
            </Button>
          </div>
        );
      case 'image':
      default:
        return <img src={currentItem.img} alt={currentItem.alt} className="rounded-lg w-full object-contain max-h-[500px]" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Review Lesson - ReadNow</title>
        <meta name="description" content="Review key literacy concepts with interactive exercises and activities." />
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
              <CardTitle className="text-3xl text-white text-center">{currentItem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[500px] flex items-center justify-center"
                  >
                    {renderContent()}
                  </motion.div>
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
                  {currentIndex + 1} / {lessonContent.length}
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

export default ReviewLesson;