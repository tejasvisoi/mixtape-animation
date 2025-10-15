import React from 'react';
import { motion } from 'framer-motion';

/**
 * PlaybackControls Component
 * 
 * Vintage-style playback controls for the tape player.
 * Features tactile buttons with hover effects and vintage styling.
 * 
 * Props:
 * @param {boolean} isPlaying - Whether music is currently playing
 * @param {function} onPlayPause - Callback for play/pause button
 * @param {function} onPrevious - Callback for previous track button
 * @param {function} onNext - Callback for next track button
 * @param {boolean} canGoPrevious - Whether previous button should be enabled
 * @param {boolean} canGoNext - Whether next button should be enabled
 */
const PlaybackControls = ({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext, 
  canGoPrevious = true, 
  canGoNext = true 
}) => {
  
  // Button animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.1,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
    },
    tap: { 
      scale: 0.95 
    }
  };

  // Play/Pause button specific animation
  const playPauseVariants = {
    playing: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(220, 20, 60, 0.4)"
    },
    paused: {
      scale: 1,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center space-x-6 mt-8"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      
      {/* Previous Track Button */}
      <motion.button
        className={`
          vintage-button w-12 h-12 rounded-full border-2 border-vintage-brown
          flex items-center justify-center text-vintage-brown
          ${canGoPrevious ? 'bg-vintage-cream hover:bg-vintage-gold' : 'bg-gray-300 cursor-not-allowed'}
          shadow-vintage
        `}
        variants={buttonVariants}
        whileHover={canGoPrevious ? "hover" : {}}
        whileTap={canGoPrevious ? "tap" : {}}
        onClick={canGoPrevious ? onPrevious : undefined}
        disabled={!canGoPrevious}
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
        </svg>
      </motion.button>

      {/* Play/Pause Button */}
      <motion.button
        className={`
          vintage-button w-16 h-16 rounded-full border-2 border-vintage-red
          flex items-center justify-center text-white
          ${isPlaying ? 'bg-vintage-red glow' : 'bg-vintage-red hover:bg-red-600'}
          shadow-vintage
        `}
        variants={playPauseVariants}
        animate={isPlaying ? "playing" : "paused"}
        whileHover="hover"
        whileTap="tap"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          // Pause Icon
          <svg 
            className="w-8 h-8" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
        ) : (
          // Play Icon
          <svg 
            className="w-8 h-8" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
          </svg>
        )}
      </motion.button>

      {/* Next Track Button */}
      <motion.button
        className={`
          vintage-button w-12 h-12 rounded-full border-2 border-vintage-brown
          flex items-center justify-center text-vintage-brown
          ${canGoNext ? 'bg-vintage-cream hover:bg-vintage-gold' : 'bg-gray-300 cursor-not-allowed'}
          shadow-vintage
        `}
        variants={buttonVariants}
        whileHover={canGoNext ? "hover" : {}}
        whileTap={canGoNext ? "tap" : {}}
        onClick={canGoNext ? onNext : undefined}
        disabled={!canGoNext}
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default PlaybackControls;
