import React from 'react';
import { motion } from 'framer-motion';

/**
 * PlaybackControls Component - Web Cassette Style
 * 
 * Authentic cassette deck controls inspired by Klevgrand's Web Cassette
 * Features realistic button styling and vintage aesthetics
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
      scale: 1.05,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
    },
    tap: { 
      scale: 0.98 
    }
  };

  // Play/Pause button specific animation
  const playPauseVariants = {
    playing: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)"
    },
    paused: {
      scale: 1,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center space-x-4 mt-6"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      
      {/* Previous Track Button */}
      <motion.button
        className={`
          relative w-12 h-12 rounded-lg border-2 border-gray-500
          flex items-center justify-center text-gray-700
          ${canGoPrevious ? 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200' : 'bg-gray-400 cursor-not-allowed'}
          shadow-lg active:shadow-inner
        `}
        variants={buttonVariants}
        whileHover={canGoPrevious ? "hover" : {}}
        whileTap={canGoPrevious ? "tap" : {}}
        onClick={canGoPrevious ? onPrevious : undefined}
        disabled={!canGoPrevious}
        style={{
          borderTopColor: '#9ca3af',
          borderLeftColor: '#9ca3af',
          borderBottomColor: '#6b7280',
          borderRightColor: '#6b7280'
        }}
      >
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
        </svg>
      </motion.button>

      {/* Stop Button */}
      <motion.button
        className="relative w-12 h-12 rounded-lg border-2 border-gray-500 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 flex items-center justify-center text-gray-700 shadow-lg active:shadow-inner"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        style={{
          borderTopColor: '#9ca3af',
          borderLeftColor: '#9ca3af',
          borderBottomColor: '#6b7280',
          borderRightColor: '#6b7280'
        }}
      >
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
      </motion.button>

      {/* Play/Pause Button */}
      <motion.button
        className={`
          relative w-16 h-16 rounded-lg border-2 border-gray-500
          flex items-center justify-center text-white
          ${isPlaying ? 'bg-gradient-to-b from-green-400 to-green-500 shadow-green-400/50' : 'bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500'}
          shadow-lg active:shadow-inner
        `}
        variants={playPauseVariants}
        animate={isPlaying ? "playing" : "paused"}
        whileHover="hover"
        whileTap="tap"
        onClick={onPlayPause}
        style={{
          borderTopColor: '#9ca3af',
          borderLeftColor: '#9ca3af',
          borderBottomColor: '#6b7280',
          borderRightColor: '#6b7280'
        }}
      >
        {isPlaying ? (
          // Pause Icon
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-white rounded"></div>
            <div className="w-1 h-6 bg-white rounded"></div>
          </div>
        ) : (
          // Play Icon
          <div className="ml-1">
            <svg 
              className="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
            </svg>
          </div>
        )}
      </motion.button>

      {/* Record Button */}
      <motion.button
        className="relative w-12 h-12 rounded-lg border-2 border-gray-500 bg-gradient-to-b from-red-200 to-red-300 hover:from-red-100 hover:to-red-200 flex items-center justify-center text-red-700 shadow-lg active:shadow-inner"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        style={{
          borderTopColor: '#9ca3af',
          borderLeftColor: '#9ca3af',
          borderBottomColor: '#6b7280',
          borderRightColor: '#6b7280'
        }}
      >
        <div className="w-4 h-4 bg-red-600 rounded-full"></div>
      </motion.button>

      {/* Next Track Button */}
      <motion.button
        className={`
          relative w-12 h-12 rounded-lg border-2 border-gray-500
          flex items-center justify-center text-gray-700
          ${canGoNext ? 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200' : 'bg-gray-400 cursor-not-allowed'}
          shadow-lg active:shadow-inner
        `}
        variants={buttonVariants}
        whileHover={canGoNext ? "hover" : {}}
        whileTap={canGoNext ? "tap" : {}}
        onClick={canGoNext ? onNext : undefined}
        disabled={!canGoNext}
        style={{
          borderTopColor: '#9ca3af',
          borderLeftColor: '#9ca3af',
          borderBottomColor: '#6b7280',
          borderRightColor: '#6b7280'
        }}
      >
        <svg 
          className="w-5 h-5" 
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
