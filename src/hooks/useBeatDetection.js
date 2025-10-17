import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook for Beat Detection and Simulation
 * 
 * This hook provides beat detection functionality for the tape player animation.
 * Since Spotify Web Playback SDK doesn't provide direct audio analysis,
 * we simulate beat detection based on playback state and timing.
 * 
 * Returns:
 * - beatIntensity: number between 0-1 representing current beat intensity
 * - isBeating: boolean indicating if we're currently in a beat
 */
const useBeatDetection = (isPlaying, currentTrack) => {
  const [beatIntensity, setBeatIntensity] = useState(0);
  const [isBeating, setIsBeating] = useState(false);
  const beatIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Simulate beat detection based on music tempo
  useEffect(() => {
    if (!isPlaying || !currentTrack) {
      setBeatIntensity(0);
      setIsBeating(false);
      return;
    }

    // Estimate BPM from track duration and genre (simplified simulation)
    const estimatedBPM = estimateBPM(currentTrack);
    const beatInterval = 60000 / estimatedBPM; // Convert BPM to milliseconds per beat

    // Create beat pattern
    const createBeatPattern = () => {
      let beatCount = 0;
      const maxBeats = 4; // 4/4 time signature

      beatIntervalRef.current = setInterval(() => {
        beatCount = (beatCount + 1) % maxBeats;
        
        // Strong beat on 1, medium on 3, weak on 2 and 4
        const beatStrength = beatCount === 0 ? 1 : beatCount === 2 ? 0.7 : 0.4;
        
        setIsBeating(true);
        setBeatIntensity(beatStrength);
        
        // Reset beat after short duration
        setTimeout(() => {
          setIsBeating(false);
          setBeatIntensity(beatIntensity * 0.3);
        }, 100);
        
      }, beatInterval);
    };

    // Animate beat intensity decay
    const animateBeatDecay = () => {
      const animate = () => {
        setBeatIntensity(prev => {
          const newIntensity = prev * 0.95;
          return newIntensity < 0.01 ? 0 : newIntensity;
        });
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    };

    createBeatPattern();
    animateBeatDecay();

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentTrack, beatIntensity]);

  return { beatIntensity, isBeating };
};

/**
 * Estimate BPM based on track characteristics
 * This is a simplified simulation since we don't have direct audio analysis
 */
const estimateBPM = (track) => {
  if (!track) return 120;

  // Basic BPM estimation based on track name and artist (very simplified)
  const trackName = track.name.toLowerCase();
  const artistName = track.artist?.toLowerCase() || '';
  const fullText = `${trackName} ${artistName}`;

  // Genre-based BPM estimation (simplified)
  if (fullText.includes('rock') || fullText.includes('metal')) {
    return 140;
  }
  if (fullText.includes('pop') || fullText.includes('dance')) {
    return 128;
  }
  if (fullText.includes('jazz') || fullText.includes('blues')) {
    return 100;
  }
  if (fullText.includes('ballad') || fullText.includes('slow')) {
    return 80;
  }
  if (fullText.includes('rap') || fullText.includes('hip hop')) {
    return 95;
  }
  if (fullText.includes('electronic') || fullText.includes('edm')) {
    return 130;
  }

  // Default BPM based on track duration (simplified heuristic)
  const duration = track.duration_ms || 180000; // Default 3 minutes
  const durationMinutes = duration / 60000;
  
  if (durationMinutes < 2.5) {
    return 140; // Likely upbeat
  } else if (durationMinutes > 4) {
    return 100; // Likely slower
  }
  
  return 120; // Default moderate tempo
};

/**
 * Advanced beat detection hook for more sophisticated animations
 * This could be enhanced with Web Audio API for real audio analysis
 */
export const useAdvancedBeatDetection = (isPlaying) => {
  // eslint-disable-next-line no-unused-vars
  const [audioContext, setAudioContext] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [analyser, setAnalyser] = useState(null);
  const [beatIntensity, setBeatIntensity] = useState(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      setBeatIntensity(0);
      return;
    }

    // Note: This is a placeholder for real audio analysis
    // In a real implementation, you would:
    // 1. Get audio stream from Spotify (requires additional permissions)
    // 2. Use Web Audio API to analyze frequency data
    // 3. Implement beat detection algorithms
    
    console.log('Advanced beat detection would require additional audio permissions');
    
    // For now, we'll use the simplified simulation
    const simulateBeatDetection = () => {
      const animate = () => {
        // Simulate varying beat intensity
        const time = Date.now() * 0.005;
        const intensity = Math.abs(Math.sin(time)) * 0.5 + Math.random() * 0.3;
        setBeatIntensity(Math.min(intensity, 1));
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
    };

    simulateBeatDetection();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return { beatIntensity };
};

export default useBeatDetection;
