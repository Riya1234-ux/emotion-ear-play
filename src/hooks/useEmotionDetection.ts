import { useState, useCallback, useRef, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Emotion, emotionLabelMap } from '@/lib/emotions';

interface EmotionResult {
  emotion: Emotion;
  confidence: number;
  allEmotions: { emotion: string; confidence: number }[];
}

interface ClassificationResult {
  label: string;
  score: number;
}

export const useEmotionDetection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoadProgress, setModelLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmotionResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const classifierRef = useRef<any>(null);

  const loadModel = useCallback(async () => {
    if (classifierRef.current) return;
    
    setIsModelLoading(true);
    setModelLoadProgress(0);
    setError(null);
    
    try {
      console.log('Loading emotion detection model...');
      
      // Using a facial emotion recognition model
      const classifier = await pipeline(
        'image-classification',
        'Xenova/facial_emotions_image_detection',
        {
          progress_callback: (progress) => {
            if (progress && typeof progress === 'object' && 'progress' in progress) {
              const progressValue = (progress as { progress?: number }).progress;
              if (progressValue !== undefined) {
                setModelLoadProgress(Math.round(progressValue));
              }
            }
          },
        }
      );
      
      classifierRef.current = classifier;
      console.log('Model loaded successfully!');
    } catch (err) {
      console.error('Error loading model:', err);
      setError('Failed to load emotion detection model. Please try again.');
    } finally {
      setIsModelLoading(false);
    }
  }, []);

  const detectEmotion = useCallback(async (imageData: string | Blob): Promise<EmotionResult | null> => {
    if (!classifierRef.current) {
      setError('Model not loaded. Please wait for the model to load.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Detecting emotion...');
      
      // Run the classification
      const predictions = await classifierRef.current(imageData);
      
      console.log('Predictions:', predictions);

      if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
        setError('No emotion detected. Please try again with a clearer image.');
        return null;
      }

      // Flatten if nested array
      const flatPredictions: ClassificationResult[] = Array.isArray(predictions[0]) 
        ? predictions[0] 
        : predictions;

      // Map predictions to our emotion types
      const mappedEmotions = flatPredictions.map((pred: ClassificationResult) => {
        const normalizedLabel = pred.label.toLowerCase();
        const mappedEmotion = emotionLabelMap[normalizedLabel] || 'neutral';
        return {
          emotion: mappedEmotion,
          confidence: pred.score * 100,
        };
      });

      // Get the top emotion
      const topPrediction = flatPredictions[0];
      const normalizedLabel = topPrediction.label.toLowerCase();
      const detectedEmotion = emotionLabelMap[normalizedLabel] || 'neutral';

      const emotionResult: EmotionResult = {
        emotion: detectedEmotion,
        confidence: topPrediction.score * 100,
        allEmotions: mappedEmotions,
      };

      setResult(emotionResult);
      return emotionResult;
    } catch (err) {
      console.error('Error detecting emotion:', err);
      setError('Failed to detect emotion. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-load model on mount
  useEffect(() => {
    loadModel();
  }, [loadModel]);

  return {
    detectEmotion,
    loadModel,
    isLoading,
    isModelLoading,
    modelLoadProgress,
    error,
    result,
    isModelReady: !!classifierRef.current,
  };
};
