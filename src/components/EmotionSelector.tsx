import { motion } from 'framer-motion';
import { emotionPlaylists, Emotion } from '@/lib/emotions';

interface EmotionSelectorProps {
  selectedEmotion: Emotion | null;
  onSelect: (emotion: Emotion) => void;
}

export const EmotionSelector = ({ selectedEmotion, onSelect }: EmotionSelectorProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-lg text-muted-foreground mb-2">Or select a mood manually</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {emotionPlaylists.map((playlist, index) => (
          <motion.button
            key={playlist.emotion}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(playlist.emotion)}
            className={`relative p-4 rounded-2xl border transition-all duration-300 ${
              selectedEmotion === playlist.emotion
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">{playlist.icon}</span>
              <span className="text-sm font-medium">{playlist.label}</span>
            </div>

            {selectedEmotion === playlist.emotion && (
              <motion.div
                layoutId="emotion-highlight"
                className="absolute inset-0 border-2 border-primary rounded-2xl"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
