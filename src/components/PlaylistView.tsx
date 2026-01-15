import { motion } from 'framer-motion';
import { Play, Clock, Music } from 'lucide-react';
import { EmotionPlaylist, Track } from '@/lib/emotions';

interface PlaylistViewProps {
  playlist: EmotionPlaylist;
  currentTrackId?: string;
  onTrackSelect: (track: Track, index: number) => void;
}

export const PlaylistView = ({ playlist, currentTrackId, onTrackSelect }: PlaylistViewProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Playlist Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-start gap-6">
          <div 
            className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${playlist.gradient} flex items-center justify-center text-6xl shadow-lg`}
          >
            {playlist.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Emotion Playlist
            </p>
            <h2 className="text-3xl font-display font-bold mb-2">{playlist.label}</h2>
            <p className="text-muted-foreground mb-4">{playlist.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                {playlist.tracks.length} tracks
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {calculateTotalDuration(playlist.tracks)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Track List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center text-xs uppercase tracking-widest text-muted-foreground">
            <span className="w-12 text-center">#</span>
            <span className="flex-1">Title</span>
            <span className="w-20 text-right">Duration</span>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {playlist.tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTrackSelect(track, index)}
              className={`flex items-center p-4 hover:bg-muted/30 cursor-pointer transition-colors group ${
                currentTrackId === track.id ? 'bg-primary/10' : ''
              }`}
            >
              <div className="w-12 text-center">
                <span className={`group-hover:hidden ${currentTrackId === track.id ? 'hidden' : ''}`}>
                  {index + 1}
                </span>
                <Play 
                  className={`w-4 h-4 mx-auto ${
                    currentTrackId === track.id ? 'block text-primary' : 'hidden group-hover:block'
                  }`} 
                />
              </div>
              
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className={`font-medium truncate ${
                    currentTrackId === track.id ? 'text-primary' : ''
                  }`}>
                    {track.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </div>

              <div className="w-20 text-right text-sm text-muted-foreground">
                {track.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

function calculateTotalDuration(tracks: Track[]): string {
  let totalSeconds = 0;
  
  tracks.forEach(track => {
    const [mins, secs] = track.duration.split(':').map(Number);
    totalSeconds += mins * 60 + secs;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}
