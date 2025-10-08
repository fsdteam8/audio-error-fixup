import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Free Learning Resources',
      description: 'Access comprehensive reading materials designed specifically for adult learners'
    },
    {
      icon: Users,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress reports and achievements'
    },
    {
      icon: Award,
      title: 'Personalized Learning',
      description: 'Adaptive content that adjusts to your reading level and learning pace'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace, anytime and anywhere that works for you'
    }
  ];

  return (
    <div className="pt-16 text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Adults sitting at a table learning to read together in a bright, welcoming room"
           src="https://images.unsplash.com/photo-1659439267688-71cc201d09db" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn to Read with
              <span className="block text-white drop-shadow-lg">Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Free adult literacy resources with personalized progress tracking. 
              Start your reading journey today with expert guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-3">
                  Get Personal Tutoring
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ReadNow?
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              We provide everything you need to succeed in your reading journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-card h-full text-center p-6 hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <feature.icon className="h-12 w-12 text-primary mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-card-foreground/80">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Dive in and improve your reading capabilities with ReadNow
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Join thousands of adults who have improved their reading skills with ReadNow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-3">
                  Access Free Resources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-foreground border-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;