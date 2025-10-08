import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { SpeechProvider } from '@/contexts/SpeechContext';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Resources from '@/pages/Resources';
import Progress from '@/pages/Progress';
import Contact from '@/pages/Contact';
import TeacherDashboard from '@/pages/TeacherDashboard';
import Login from '@/pages/Login';
import NotesAboutAlphabet from '@/pages/lessons/NotesAboutAlphabet';
import AlphabetLesson from '@/pages/lessons/AlphabetLesson.jsx';
import CvcShortA from '@/pages/lessons/CvcShortA.jsx';
import AuthCallback from '@/pages/AuthCallback';
import CvcShortE from '@/pages/lessons/CvcShortE';
import CvcShortI from '@/pages/lessons/CvcShortI';
import CvcShortU from '@/pages/lessons/CvcShortU';
import CvcShortO from '@/pages/lessons/CvcShortO';
import PhonicsTips from '@/pages/lessons/PhonicsTips';
import PictureReadingLesson from '@/pages/lessons/PictureReadingLesson';
import ReviewLesson from '@/pages/lessons/ReviewLesson';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <SpeechProvider>
            <div className="min-h-screen">
              <Helmet>
                <title>ReadNow - Adult Literacy Learning Platform</title>
                <meta name="description" content="Free adult literacy resources with progress tracking. Learn to read at your own pace with personalized guidance and one-on-one tutoring options." />
                <meta property="og:title" content="ReadNow - Adult Literacy Learning Platform" />
                <meta property="og:description" content="Free adult literacy resources with progress tracking. Learn to read at your own pace with personalized guidance and one-on-one tutoring options." />
              </Helmet>
              
              <Navbar />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/lessons/notes-about-alphabet" element={<NotesAboutAlphabet />} />
                <Route path="/lessons/alphabet" element={<AlphabetLesson />} />
                <Route path="/lessons/cvc-short-a" element={<CvcShortA />} />
                <Route path="/lessons/cvc-short-e" element={<CvcShortE />} />
                <Route path="/lessons/cvc-short-i" element={<CvcShortI />} />
                <Route path="/lessons/cvc-short-u" element={<CvcShortU />} />
                <Route path="/lessons/cvc-short-o" element={<CvcShortO />} />
                <Route path="/lessons/phonics-tips" element={<PhonicsTips />} />
                <Route path="/lessons/picture-reading" element={<PictureReadingLesson />} />
                <Route path="/lessons/review" element={<ReviewLesson />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>
              
              <Toaster />
            </div>
          </SpeechProvider>
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;