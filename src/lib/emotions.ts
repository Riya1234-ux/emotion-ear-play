export type Emotion = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral' | 'fearful' | 'disgusted';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
}

export interface EmotionPlaylist {
  emotion: Emotion;
  label: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  tracks: Track[];
}

// Map of model labels to our emotion types
export const emotionLabelMap: Record<string, Emotion> = {
  'happy': 'happy',
  'joy': 'happy',
  'sad': 'sad',
  'sadness': 'sad',
  'angry': 'angry',
  'anger': 'angry',
  'surprise': 'surprised',
  'surprised': 'surprised',
  'neutral': 'neutral',
  'fear': 'fearful',
  'fearful': 'fearful',
  'disgust': 'disgusted',
  'disgusted': 'disgusted',
};

export const emotionPlaylists: EmotionPlaylist[] = [
  {
    emotion: 'happy',
    label: 'Happy',
    description: 'Upbeat and joyful tracks to match your mood',
    color: 'hsl(45, 100%, 60%)',
    gradient: 'from-yellow-400 to-orange-500',
    icon: '😊',
    tracks: [
      { id: 'h1', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', coverUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'h2', title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'h3', title: 'Good Vibrations', artist: 'The Beach Boys', duration: '3:36', coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'h4', title: 'Dancing Queen', artist: 'ABBA', duration: '3:51', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'sad',
    label: 'Melancholy',
    description: 'Soothing melodies for reflective moments',
    color: 'hsl(220, 80%, 55%)',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '😢',
    tracks: [
      { id: 's1', title: 'Someone Like You', artist: 'Adele', duration: '4:45', coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 's2', title: 'Fix You', artist: 'Coldplay', duration: '4:54', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 's3', title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', coverUrl: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 's4', title: 'Mad World', artist: 'Gary Jules', duration: '3:08', coverUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'angry',
    label: 'Intense',
    description: 'Powerful tracks to channel your energy',
    color: 'hsl(0, 90%, 55%)',
    gradient: 'from-red-500 to-rose-600',
    icon: '😠',
    tracks: [
      { id: 'a1', title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:46', coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'a2', title: 'Killing in the Name', artist: 'Rage Against the Machine', duration: '5:13', coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'a3', title: 'Bodies', artist: 'Drowning Pool', duration: '3:24', coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'a4', title: 'Chop Suey!', artist: 'System of a Down', duration: '3:30', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'surprised',
    label: 'Energetic',
    description: 'Exciting beats that match your surprise',
    color: 'hsl(35, 100%, 55%)',
    gradient: 'from-orange-400 to-amber-500',
    icon: '😮',
    tracks: [
      { id: 'su1', title: 'Pump It', artist: 'Black Eyed Peas', duration: '3:33', coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'su2', title: 'Levels', artist: 'Avicii', duration: '3:19', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'su3', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'su4', title: 'Wake Me Up', artist: 'Avicii', duration: '4:07', coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'neutral',
    label: 'Chill',
    description: 'Relaxed vibes for your calm state',
    color: 'hsl(240, 10%, 50%)',
    gradient: 'from-slate-400 to-slate-600',
    icon: '😐',
    tracks: [
      { id: 'n1', title: 'Weightless', artist: 'Marconi Union', duration: '8:09', coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'n2', title: 'Intro', artist: 'The xx', duration: '2:07', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'n3', title: 'Sunset Lover', artist: 'Petit Biscuit', duration: '3:29', coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'n4', title: 'Breathe', artist: 'Télépopmusik', duration: '4:37', coverUrl: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'fearful',
    label: 'Atmospheric',
    description: 'Ambient sounds for uncertain moments',
    color: 'hsl(270, 70%, 50%)',
    gradient: 'from-purple-500 to-violet-600',
    icon: '😨',
    tracks: [
      { id: 'f1', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', coverUrl: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'f2', title: 'Portishead', artist: 'Wandering Star', duration: '4:52', coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'f3', title: 'Angel', artist: 'Massive Attack', duration: '6:18', coverUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'f4', title: 'Only Time', artist: 'Enya', duration: '3:38', coverUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
  {
    emotion: 'disgusted',
    label: 'Grunge',
    description: 'Raw and authentic sounds',
    color: 'hsl(120, 50%, 40%)',
    gradient: 'from-green-600 to-emerald-700',
    icon: '🤢',
    tracks: [
      { id: 'd1', title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01', coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'd2', title: 'Black Hole Sun', artist: 'Soundgarden', duration: '5:18', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'd3', title: 'Creep', artist: 'Radiohead', duration: '3:56', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', audioUrl: '' },
      { id: 'd4', title: 'Zombie', artist: 'The Cranberries', duration: '5:06', coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', audioUrl: '' },
    ],
  },
];

export const getPlaylistByEmotion = (emotion: Emotion): EmotionPlaylist => {
  return emotionPlaylists.find(p => p.emotion === emotion) || emotionPlaylists[4]; // Default to neutral
};
