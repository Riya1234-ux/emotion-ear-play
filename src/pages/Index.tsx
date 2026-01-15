import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { EmotionCamera } from '@/components/EmotionCamera';
import { EmotionSelector } from '@/components/EmotionSelector';
import { MusicPlayer } from '@/components/MusicPlayer';
import { PlaylistView } from '@/components/PlaylistView';
import { BackgroundVisuals } from '@/components/BackgroundVisuals';
import { Emotion, getPlaylistByEmotion, Track } from '@/lib/emotions';

type View = 'detect' | 'playlist';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('detect');
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleEmotionDetected = useCallback((emotion: Emotion, conf: number) => {
    setDetectedEmotion(emotion);
    setConfidence(conf);
    setCurrentTrackIndex(0);
    
    // Auto-transition to playlist after a short delay
    setTimeout(() => {
      setCurrentView('playlist');
    }, 1500);
  }, []);

  const handleManualSelect = useCallback((emotion: Emotion) => {
    setDetectedEmotion(emotion);
    setConfidence(100);
    setCurrentTrackIndex(0);
    setCurrentView('playlist');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('detect');
    setDetectedEmotion(null);
    setConfidence(0);
  }, []);

  const handleTrackSelect = useCallback((track: Track, index: number) => {
    setCurrentTrackIndex(index);
  }, []);

  const playlist = detectedEmotion ? getPlaylistByEmotion(detectedEmotion) : null;

  return (
    <div className="min-h-screen relative">
      <BackgroundVisuals emotion={detectedEmotion} />
      <Header />

      <main className="px-4 pb-8">
        <AnimatePresence mode="wait">
          {currentView === 'detect' ? (
            <motion.div
              key="detect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto space-y-12"
            >
              {/* Hero Section */}
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm">AI-Powered Emotion Detection</span>
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
                  Music That <span className="gradient-text">Feels You</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Let AI detect your emotions through your camera and discover the perfect playlist 
                  to match your mood. Your feelings, your music.
                </p>
              </div>

              {/* Camera Section */}
              <EmotionCamera onEmotionDetected={handleEmotionDetected} />

              {/* Manual Selection */}
              <div className="pt-8 border-t border-border/30">
                <EmotionSelector 
                  selectedEmotion={detectedEmotion} 
                  onSelect={handleManualSelect} 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="playlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Detect Again
              </Button>

              {/* Detected Emotion Banner */}
              {detectedEmotion && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {confidence === 100 ? 'Selected mood' : `Detected with ${confidence.toFixed(0)}% confidence`}
                  </p>
                  <h2 className="text-2xl font-display font-bold">
                    Feeling <span className="gradient-text capitalize">{detectedEmotion}</span> Today
                  </h2>
                </motion.div>
              )}

              {/* Player & Playlist Grid */}
              {playlist && (
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <MusicPlayer 
                    playlist={playlist}
                  />
                  <PlaylistView
                    playlist={playlist}
                    currentTrackId={playlist.tracks[currentTrackIndex]?.id}
                    onTrackSelect={handleTrackSelect}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
