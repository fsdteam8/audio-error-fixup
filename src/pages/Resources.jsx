import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, BarChart2, Users, Mic, FileText, Grid, Image, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

const beginnerLessons = [
  {
    title: 'The Alphabet',
    description: 'Learn to recognize and pronounce all 26 letters of the alphabet.',
    link: '/lessons/alphabet',
    icon: <BookOpen className="h-8 w-8 text-blue-400" />,
    duration: 5,
    id: 15,
  },
  {
    title: 'Notes About the Alphabet',
    description: 'Explore the different sounds letters can make.',
    link: '/lessons/notes-about-alphabet',
    icon: <FileText className="h-8 w-8 text-yellow-400" />,
    duration: 20,
    id: 16,
  },
  {
    title: 'CVC Words: Short "a"',
    description: 'Practice words with the short "a" sound like "cat" and "bat".',
    link: '/lessons/cvc-short-a',
    icon: <Mic className="h-8 w-8 text-green-400" />,
    duration: 15,
    id: 17,
  },
  {
    title: 'CVC Words: Short "e"',
    description: 'Practice words with the short "e" sound like "bed" and "hen".',
    link: '/lessons/cvc-short-e',
    icon: <Mic className="h-8 w-8 text-green-400" />,
    duration: 15,
    id: 18,
  },
  {
    title: 'CVC Words: Short "i"',
    description: 'Practice words with the short "i" sound like "pin" and "sit".',
    link: '/lessons/cvc-short-i',
    icon: <Mic className="h-8 w-8 text-green-400" />,
    duration: 15,
    id: 19,
  },
  {
    title: 'CVC Words: Short "o"',
    description: 'Learn words with the short "o" sound like "dog" and "pot".',
    link: '/lessons/short-o-sound',
    icon: <Mic className="h-8 w-8 text-green-400" />,
    duration: 10,
    id: 21,
  },
  {
    title: 'CVC Words: Short "u"',
    description: 'Practice words with the short "u" sound like "sun" and "bug".',
    link: '/lessons/cvc-short-u',
    icon: <Mic className="h-8 w-8 text-green-400" />,
    duration: 15,
    id: 20,
  },
  {
    title: 'Phonics Tips',
    description: 'Visual guides to essential phonics rules.',
    link: '/lessons/phonics-tips',
    icon: <Grid className="h-8 w-8 text-purple-400" />,
    duration: 10,
    id: 22,
  },
  {
    title: 'Picture Reading',
    description: 'Learn vocabulary for body parts with diagrams.',
    link: '/lessons/picture-reading',
    icon: <Image className="h-8 w-8 text-pink-400" />,
    duration: 20,
    id: 23,
  },
  {
    title: 'Review',
    description: 'Review key concepts with various exercises.',
    link: '/lessons/review',
    icon: <Star className="h-8 w-8 text-orange-400" />,
    duration: 25,
    id: 24,
  },
];

const LessonCard = ({ lesson, className = '' }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`h-full ${className}`}
  >
    <Link to={lesson.link} className="block h-full">
      <Card className="reading-card h-full flex flex-col hover:border-blue-400 transition-all duration-300">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center">
            {lesson.icon}
          </div>
          <div>
            <CardTitle className="text-black text-lg">{lesson.title}</CardTitle>
            <CardDescription className="text-black text-sm mt-1">{lesson.duration} min</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-black">{lesson.description}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

const Resources = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const reorderAndRenameLessons = (lessons) => {
    const lessonsCopy = [...lessons];
    const shortOIndex = lessonsCopy.findIndex(lesson => lesson.id === 21);
    const shortUIndex = lessonsCopy.findIndex(lesson => lesson.id === 20);

    if (shortOIndex !== -1) {
      const shortOLesson = { ...lessonsCopy[shortOIndex], title: 'CVC Words: Short "o"' };
      lessonsCopy.splice(shortOIndex, 1);
      
      const newShortUIndex = lessonsCopy.findIndex(lesson => lesson.id === 20);
      if (newShortUIndex !== -1) {
        lessonsCopy.splice(newShortUIndex, 0, shortOLesson);
      } else {
        lessonsCopy.push(shortOLesson);
      }
    }
    return lessonsCopy;
  };

  const finalLessons = reorderAndRenameLessons(beginnerLessons);

  return (
    <>
      <Helmet>
        <title>Learning Resources - ReadNow</title>
        <meta name="description" content="Explore a wide range of free literacy lessons and resources for adult learners. Start with beginner lessons and advance at your own pace." />
      </Helmet>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learning Resources
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              A curated collection of lessons and tools to guide you on your reading journey. Start with the basics and build your confidence.
            </p>
          </motion.div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Beginner Lessons</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {finalLessons.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  className={lesson.id === 24 ? 'lg:col-start-2' : ''}
                />
              ))}
            </motion.div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div whileHover={{ y: -5 }}>
                <Link to="/progress">
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-green-400 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <BarChart2 className="h-8 w-8 text-green-400" />
                        </div>
                        <div>
                          <CardTitle className="text-gray-900">Track Your Progress</CardTitle>
                          <CardDescription className="text-gray-600">See how far you've come and what to learn next.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <Link to="/contact">
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <Users className="h-8 w-8 text-purple-400" />
                        </div>
                        <div>
                          <CardTitle className="text-gray-900">One-on-One Tutoring</CardTitle>
                          <CardDescription className="text-gray-600">Connect with a tutor for personalized guidance.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;