import { motion } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-6 px-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold gradient-text">MoodTunes</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Music</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Powered by ML</span>
        </div>
      </div>
    </motion.header>
  );
};
