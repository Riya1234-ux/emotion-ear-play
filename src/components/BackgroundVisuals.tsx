import { motion } from 'framer-motion';
import { Emotion } from '@/lib/emotions';

interface BackgroundVisualsProps {
  emotion: Emotion | null;
}

const emotionGradients: Record<Emotion, string> = {
  happy: 'from-yellow-500/20 via-orange-500/10 to-transparent',
  sad: 'from-blue-600/20 via-indigo-500/10 to-transparent',
  angry: 'from-red-600/20 via-rose-500/10 to-transparent',
  surprised: 'from-orange-500/20 via-amber-500/10 to-transparent',
  neutral: 'from-slate-500/20 via-gray-500/10 to-transparent',
  fearful: 'from-purple-600/20 via-violet-500/10 to-transparent',
  disgusted: 'from-green-600/20 via-emerald-500/10 to-transparent',
};

export const BackgroundVisuals = ({ emotion }: BackgroundVisualsProps) => {
  const gradient = emotion ? emotionGradients[emotion] : 'from-primary/10 via-secondary/5 to-transparent';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Animated gradient orbs */}
      <motion.div
        key={emotion || 'default'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <motion.div
          className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial ${gradient} blur-3xl`}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial ${gradient} blur-3xl`}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
};
