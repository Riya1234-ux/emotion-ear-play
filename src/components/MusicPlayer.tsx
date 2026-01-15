import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Track, EmotionPlaylist } from '@/lib/emotions';

interface MusicPlayerProps {
  playlist: EmotionPlaylist;
  onTrackChange?: (track: Track) => void;
}

export const MusicPlayer = ({ playlist, onTrackChange }: MusicPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(70);

  const currentTrack = playlist.tracks[currentTrackIndex];

  useEffect(() => {
    if (onTrackChange && currentTrack) {
      onTrackChange(currentTrack);
    }
  }, [currentTrack, onTrackChange]);

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => 
      prev === 0 ? playlist.tracks.length - 1 : prev - 1
    );
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => 
      prev === playlist.tracks.length - 1 ? 0 : prev + 1
    );
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Generate visualizer bars
  const visualizerBars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    height: Math.random() * 60 + 20,
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        className="glass-card p-6 space-y-6"
        layout
      >
        {/* Album Art with Visualizer */}
        <div className="relative">
          <motion.div
            className="aspect-square rounded-2xl overflow-hidden relative"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </motion.div>

          {/* Vinyl hole effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm border-4 border-muted" />
          </div>

          {/* Glow effect */}
          <div 
            className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl -z-10"
            style={{ background: playlist.color }}
          />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-1">
          <motion.h3
            key={currentTrack.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-display font-bold truncate"
          >
            {currentTrack.title}
          </motion.h3>
          <motion.p
            key={`${currentTrack.id}-artist`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            {currentTrack.artist}
          </motion.p>
        </div>

        {/* Visualizer */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-end justify-center gap-1 h-16"
            >
              {visualizerBars.map(bar => (
                <motion.div
                  key={bar.id}
                  className="w-1.5 rounded-full bg-gradient-to-t from-primary to-secondary"
                  animate={{
                    height: isPlaying 
                      ? [bar.height * 0.3, bar.height, bar.height * 0.5, bar.height * 0.8, bar.height * 0.3]
                      : 4,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: bar.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(progress * 2.4)}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Shuffle className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="hover:text-primary"
          >
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="hover:text-primary"
          >
            <SkipForward className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Repeat className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume & Like */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? 'text-accent' : 'text-muted-foreground'}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={([v]) => setVolume(v)}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
