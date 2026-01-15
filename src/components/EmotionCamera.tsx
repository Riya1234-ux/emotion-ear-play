import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Loader2, Video, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEmotionDetection } from '@/hooks/useEmotionDetection';
import { Emotion } from '@/lib/emotions';

interface EmotionCameraProps {
  onEmotionDetected: (emotion: Emotion, confidence: number) => void;
}

export const EmotionCamera = ({ onEmotionDetected }: EmotionCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const {
    detectEmotion,
    isLoading,
    isModelLoading,
    modelLoadProgress,
    error,
    result,
    isModelReady,
  } = useEmotionDetection();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
        setCapturedImage(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  }, []);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);

    const emotionResult = await detectEmotion(imageDataUrl);
    
    if (emotionResult) {
      onEmotionDetected(emotionResult.emotion, emotionResult.confidence);
    }
  }, [detectEmotion, onEmotionDetected]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card p-6 space-y-6">
        {/* Camera/Image Display */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          <AnimatePresence mode="wait">
            {isModelLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Loading AI Model...</p>
                  <p className="text-xs text-muted-foreground mt-1">{modelLoadProgress}%</p>
                  <div className="w-48 h-2 bg-muted rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${modelLoadProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : capturedImage ? (
              <motion.img
                key="captured"
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : isCameraOn ? (
              <motion.video
                key="video"
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
                style={{ transform: 'scaleX(-1)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center px-4">
                  Enable camera to detect your emotion
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanning overlay */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          )}

          {/* Corner brackets */}
          {isCameraOn && !capturedImage && (
            <>
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg" />
            </>
          )}
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Error display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
          >
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}

        {/* Result display */}
        <AnimatePresence>
          {result && capturedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Detected Emotion</p>
                  <p className="text-2xl font-display font-bold gradient-text capitalize">
                    {result.emotion}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-xl font-bold text-primary">
                    {result.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex gap-3">
          {!isCameraOn && !capturedImage ? (
            <Button
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground"
              onClick={startCamera}
              disabled={!isModelReady}
            >
              <Video className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
          ) : capturedImage ? (
            <>
              <Button
                variant="outline"
                className="flex-1 border-primary/30 hover:bg-primary/10"
                onClick={retake}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
                onClick={stopCamera}
              >
                <VideoOff className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground animate-pulse-glow"
                onClick={captureAndAnalyze}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture & Analyze
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
                onClick={stopCamera}
              >
                <VideoOff className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
