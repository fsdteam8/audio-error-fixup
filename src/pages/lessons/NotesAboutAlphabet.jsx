import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSpeech } from '@/contexts/SpeechContext';

const NotesAboutAlphabet = () => {
  const navigate = useNavigate();
  const { speak, speaking } = useSpeech();

  const playSound = (text) => {
    // Clean the text to remove special characters for speech synthesis
    const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
    speak(cleanedText);
  };

  const vowelSounds = [
    { label: 'a/ant', sound: 'ant' },
    { label: 'ā/apron', sound: 'apron' },
    { label: 'ä/all', sound: 'all' },
    { label: 'a/are', sound: 'are' },
    { label: 'e/egg', sound: 'egg' },
    { label: 'ē/emu', sound: 'emu' },
    { label: 'ë/ballet', sound: 'ballet' },
    { label: 'i/in', sound: 'in' },
    { label: 'ī/island', sound: 'island' },
    { label: 'ï/pizza', sound: 'pizza' },
    { label: 'o/on', sound: 'on' },
    { label: 'ō/over', sound: 'over' },
    { label: 'ö/to', sound: 'to' },
    { label: 'u/up', sound: 'up' },
    { label: 'ū/uniform', sound: 'uniform' },
    { label: 'ü/put', sound: 'put' },
  ];

  const longVowelExamples = [
    { sound: 'apron', label: 'apron' }, { sound: 'rain', label: 'rain' }, { sound: 'play', label: 'play' },
    { sound: 'safe', label: 'safe' }, { sound: 'prey', label: 'prey' }, { sound: 'great', label: 'great' },
    { sound: 'Eve', label: 'Eve' }, { sound: 'each', label: 'each' }, { sound: 'seed', label: 'seed' },
    { sound: 'key', label: 'key' }, { sound: 'egg', label: 'egg' }, { sound: 'bread', label: 'bread' },
    { sound: 'I', label: 'I' }, { sound: 'eye', label: 'eye' }, { sound: 'pie', label: 'pie' },
    { sound: 'sigh', label: 'sigh' }, { sound: 'sign', label: 'sign' }, { sound: 'Reich', label: 'Reich' },
    { sound: 'open', label: 'open' }, { sound: 'go', label: 'go' }, { sound: 'goat', label: 'goat' },
    { sound: 'foe', label: 'foe' }, { sound: 'snow', label: 'snow' }, { sound: 'universe', label: 'universe' },
    { sound: 'Europe', label: 'Europe' }, { sound: 'value', label: 'value' }, { sound: 'new', label: 'new' },
  ];

  const rControlledVowelExamples = [
    { sound: 'are', label: 'are' }, { sound: 'car', label: 'car' }, { sound: 'dollar', label: 'dollar' },
    { sound: 'her', label: 'her' }, { sound: 'bird', label: 'bird' }, { sound: 'worm', label: 'worm' },
    { sound: 'actor', label: 'actor' }, { sound: 'turtle', label: 'turtle' }, { sound: 'earth', label: 'earth' },
    { sound: 'early', label: 'early' }, { sound: 'earn', label: 'earn' }, { sound: 'urn', label: 'urn' },
    { sound: 'journal', label: 'journal' }, { sound: 'journey', label: 'journey' }, { sound: 'ore', label: 'ore' },
    { sound: 'horse', label: 'horse' }, { sound: 'our', label: 'our' }, { sound: 'hour', label: 'hour' },
  ];

  const vowelPairsExamples = [
    { sound: 'auto', label: 'auto' }, { sound: 'awesome', label: 'awesome' }, { sound: 'ouch', label: 'ouch' },
    { sound: 'cow', label: 'cow' }, { sound: 'soul', label: 'soul' }, { sound: 'snow', label: 'snow' },
    { sound: 'soup', label: 'soup' }, { sound: 'moon', label: 'moon' }, { sound: 'our', label: 'our' },
    { sound: 'sour', label: 'sour' }, { sound: 'due', label: 'due' }, { sound: 'dew', label: 'dew' },
    { sound: 'oil', label: 'oil' }, { sound: 'boy', label: 'boy' },
  ];

  const consonantExamples = [
    { sound: 'fan', label: 'fan' }, { sound: 'face', label: 'face' }, { sound: 'phone', label: 'phone' },
    { sound: 'graph', label: 'graph' }, { sound: 'laugh', label: 'laugh' }, { sound: 'enough', label: 'enough' },
  ];

  const complexSoundExamples = [
    { label: 'c: cat', sound: 'cat' }, { label: 'c: cot', sound: 'cot' }, { label: 'c: cup', sound: 'cup' },
    { label: 'c: cent', sound: 'cent' }, { label: 'c: cinema', sound: 'cinema' }, { label: 'c: cinnamon', sound: 'cinnamon' },
    { label: 'g: Gad', sound: 'Gad' }, { label: 'g: gum', sound: 'gum' }, { label: 'g: got', sound: 'got' },
    { label: 'g: gem', sound: 'gem' }, { label: 'g: gin', sound: 'gin' }, { label: 'g: gym', sound: 'gym' },
    { label: 'j: jam', sound: 'jam' }, { label: 'j: jet', sound: 'jet' }, { label: 'j: Jim', sound: 'Jim' },
    { label: 'j: jot', sound: 'jot' }, { label: 'j: jut', sound: 'jut' }, { label: 'x: box', sound: 'box' },
    { label: 'x: Xerox', sound: 'Xerox' }, { label: 'x: xylophone', sound: 'xylophone' }, { label: 'x: Xavier', sound: 'Xavier' },
  ];

  const consonantDigraphs = [
    { label: 'ch: chicken', sound: 'chicken' }, { label: 'ch: church', sound: 'church' }, { label: 'ch: Christmas', sound: 'Christmas' },
    { label: 'ch: chlorine', sound: 'chlorine' }, { label: 'ch: chef', sound: 'chef' }, { label: 'ch: champagne', sound: 'champagne' },
    { label: 'f/gh/ph: laugh', sound: 'laugh' }, { label: 'f/gh/ph: graph', sound: 'graph' },
    { label: 'sh: ship', sound: 'ship' }, { label: 'sh: shoe', sound: 'shoe' },
    { label: 'th: thumb', sound: 'thumb' }, { label: 'th: thing', sound: 'thing' }, { label: 'th: think', sound: 'think' },
    { label: 'wh: what', sound: 'what' }, { label: 'wh: where', sound: 'where' }, { label: 'wh: when', sound: 'when' },
    { label: 'wh: why', sound: 'why' }, { label: 'wh: which', sound: 'which' },
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/resources')} className="text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </div>
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-800 text-center font-bold">Notes About the Alphabet</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-yellow-500 mb-2">Beyond the Basic Alphabet</h2>
              <p className="text-black">
                There are over 41 sounds in the English language, but the alphabet has only 26 letters. This means that students cannot just study the alphabet when learning to read. It is also necessary for students to learn the "Beyond the Alphabet" sounds, which include long vowel sounds short vowel sounds, dotted/variant vowel sounds, r-controlled vowel sounds, as well as, vowel and consonant digraph sounds.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-yellow-500 mb-2">VOWELS</h2>
              <p className="text-black">Each vowel can represent more than one sound.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Vowel Sounds (short, long, dotted/ variant)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {vowelSounds.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center justify-center space-x-2 bg-white"
                    onClick={() => playSound(item.sound)}
                    disabled={speaking}
                  >
                    <span>{item.label}</span>
                    <Volume2 className="h-4 w-4 text-gray-500" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">A particular vowel sound can have more than one letter pattern.</h3>
              <p className="text-black mb-2">Listen to the vowel sound in the sets of words.</p>
              <div className="space-y-2">
                <p className="text-blue-600 font-semibold">LONG A sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(0, 6).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold">LONG E sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(6, 10).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold">SHORT E sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(10, 12).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold">LONG I sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(12, 18).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold">LONG O sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(18, 23).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold">LONG U sound:</p>
                <div className="flex flex-wrap gap-2">
                  {longVowelExamples.slice(23, 27).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">R - controlled vowel sounds</h3>
              <p className="text-black mb-2">The letter <span className="font-bold">r</span> after a vowel affects its sound.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {rControlledVowelExamples.map((item, index) => (
                  <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Study the sounds for these vowel-pairs and vowel-consonants (digraphs / diphthongs - multiple sounds)</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">au/aw:</span>
                  {vowelPairsExamples.slice(0, 2).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ou/ow:</span>
                  {vowelPairsExamples.slice(2, 4).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ou/ow:</span>
                  {vowelPairsExamples.slice(4, 6).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ou/oo:</span>
                  {vowelPairsExamples.slice(6, 8).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ou/our:</span>
                  {vowelPairsExamples.slice(8, 10).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ue/ee:</span>
                  {vowelPairsExamples.slice(10, 12).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">oi/oy:</span>
                  {vowelPairsExamples.slice(12, 14).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-yellow-500 mb-2">CONSONANTS</h2>
              <p className="text-black mb-2">Note the letter patterns for selected consonants sounds:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {consonantExamples.map((item, index) => (
                  <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Here are some complex sound representations - Note beginning sounds and vowel patterns</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {complexSoundExamples.map((item, index) => (
                  <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Study the sounds for common consonant digraphs</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">ch (3 sounds):</span>
                  {consonantDigraphs.slice(0, 6).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label.split(': ')[1]}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">f/gh/ph:</span>
                  {consonantDigraphs.slice(6, 8).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label.split(': ')[1]}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">sh:</span>
                  {consonantDigraphs.slice(8, 10).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label.split(': ')[1]}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">th:</span>
                  {consonantDigraphs.slice(10, 13).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label.split(': ')[1]}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold">wh:</span>
                  {consonantDigraphs.slice(13, 18).map((item, index) => (
                    <Button key={index} variant="ghost" className="text-black hover:bg-gray-200" onClick={() => playSound(item.sound)} disabled={speaking}>
                      {item.label.split(': ')[1]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotesAboutAlphabet;