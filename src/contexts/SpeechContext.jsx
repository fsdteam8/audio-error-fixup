// import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// import { toast } from '@/components/ui/use-toast';

// export const SpeechContext = createContext(); // Export SpeechContext here

// export const useSpeech = () => {
//   const context = useContext(SpeechContext);
//   if (context === undefined) {
//     throw new Error('useSpeech must be used within a SpeechProvider');
//   }
//   return context;
// };

// export const SpeechProvider = ({ children }) => {
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [speaking, setSpeaking] = useState(false);
//   const [supported, setSupported] = useState(false);
//   const isMounted = useRef(false);

//   useEffect(() => {
//     isMounted.current = true;
//     if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
//       setSupported(true);
//     } else {
//       console.warn("Speech synthesis not supported by this browser.");
//     }
//     return () => {
//       isMounted.current = false;
//       if (window.speechSynthesis) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   const processVoices = useCallback(() => {
//     if (!supported || !isMounted.current) return;
//     const voiceList = window.speechSynthesis.getVoices();
//     if (voiceList.length === 0) return;
    
//     setVoices(voiceList);

//     if (!selectedVoice) {
//       const caribbeanVoice = voiceList.find(
//         (voice) => voice.lang.startsWith('en') && (voice.name.includes('Jamaica') || voice.name.includes('Caribbean'))
//       );
//       if (caribbeanVoice) {
//         setSelectedVoice(caribbeanVoice);
//         return;
//       }

//       const femaleVoice = voiceList.find(
//         (voice) => voice.gender === 'female' && voice.lang.startsWith('en')
//       );
//       if (femaleVoice) {
//         setSelectedVoice(femaleVoice);
//         return;
//       }

//       const defaultVoice = voiceList.find(voice => voice.lang === 'en-US');
//       setSelectedVoice(defaultVoice || voiceList[0]);
//     }
//   }, [supported, selectedVoice]);

//   useEffect(() => {
//     if (supported) {
//       if (window.speechSynthesis.getVoices().length > 0) {
//         processVoices();
//       }
//       window.speechSynthesis.onvoiceschanged = processVoices;

//       return () => {
//         if (window.speechSynthesis) {
//           window.speechSynthesis.onvoiceschanged = null;
//         }
//       };
//     }
//   }, [supported, processVoices]);

//   const speak = useCallback((text) => {
//     if (!supported) {
//       toast({ variant: "destructive", title: "Audio Error", description: "Speech synthesis is not supported in your browser." });
//       return;
//     }
//     if (!selectedVoice) {
//       toast({ variant: "destructive", title: "Audio Not Ready", description: "The voice for audio playback is not yet available. Please try again shortly." });
//       // Attempt to load voices again
//       if (window.speechSynthesis.getVoices().length > 0) {
//         processVoices();
//       }
//       return;
//     }

//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = selectedVoice;
//     utterance.lang = selectedVoice.lang;
//     utterance.onstart = () => { if(isMounted.current) setSpeaking(true); };
//     utterance.onend = () => { if(isMounted.current) setSpeaking(false); };
//     utterance.onerror = (event) => {
//       if(isMounted.current) setSpeaking(false);
//       console.error("Speech synthesis error:", event.error);
//       if (event.error !== 'interrupted' && event.error !== 'canceled') {
//         toast({ variant: "destructive", title: "Audio Playback Error", description: "Could not play the requested sound." });
//       }
//     };

//     window.speechSynthesis.speak(utterance);
//   }, [supported, selectedVoice, processVoices]);

//   const cancel = useCallback(() => {
//     if (supported && window.speechSynthesis.speaking) {
//       window.speechSynthesis.cancel();
//       if(isMounted.current) setSpeaking(false);
//     }
//   }, [supported]);

//   const value = { speak, cancel, speaking, supported };

//   return (
//     <SpeechContext.Provider value={value}>
//       {children}
//     </SpeechContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

export const SpeechContext = createContext();

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};

export const SpeechProvider = ({ children }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);

      // Wait for voices to load on mobile (it’s often delayed)
      const handleVoicesChanged = () => {
        const list = window.speechSynthesis.getVoices();
        if (list.length > 0) {
          setVoices(list);
          if (!selectedVoice) {
            const englishVoice =
              list.find((v) => v.lang.startsWith('en') && v.name.includes('Google')) ||
              list.find((v) => v.lang.startsWith('en')) ||
              list[0];
            setSelectedVoice(englishVoice);
          }
        }
      };

      handleVoicesChanged();
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    } else {
      console.warn('Speech synthesis not supported by this browser.');
    }

    // Detect user interaction (needed for mobile)
    const handleUserGesture = () => setUserInteracted(true);
    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true });

    return () => {
      isMounted.current = false;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, [selectedVoice]);

  const speak = useCallback(
    (text) => {
      if (!supported) {
        toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: 'Speech synthesis is not supported in your browser.',
        });
        return;
      }

      if (!userInteracted) {
        toast({
          variant: 'destructive',
          title: 'Tap Required',
          description: 'Please tap the screen once to enable sound playback.',
        });
        return;
      }

      if (!selectedVoice) {
        toast({
          variant: 'destructive',
          title: 'Audio Not Ready',
          description: 'The voice for playback is not available yet. Try again.',
        });
        return;
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || 'en-US';
        utterance.onstart = () => isMounted.current && setSpeaking(true);
        utterance.onend = () => isMounted.current && setSpeaking(false);
        utterance.onerror = (event) => {
          isMounted.current && setSpeaking(false);
          console.error('Speech synthesis error:', event.error);
          toast({
            variant: 'destructive',
            title: 'Audio Playback Error',
            description:
              event.error === 'not-allowed'
                ? 'Playback blocked. Please interact with the page first.'
                : 'Could not play the requested sound.',
          });
        };
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error(err);
        toast({
          variant: 'destructive',
          title: 'Playback Error',
          description: 'Speech playback failed. Please try again.',
        });
      }
    },
    [supported, selectedVoice, userInteracted]
  );

  const cancel = useCallback(() => {
    if (supported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isMounted.current && setSpeaking(false);
    }
  }, [supported]);

  const value = { speak, cancel, speaking, supported };

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
};
