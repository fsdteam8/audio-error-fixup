import { useContext } from 'react';
import { SpeechContext } from '@/contexts/SpeechContext'; // Correctly import SpeechContext

export const useSpeechSynthesis = () => {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeechSynthesis must be used within a SpeechProvider');
  }
  return context;
};