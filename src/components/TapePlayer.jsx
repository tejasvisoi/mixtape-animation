import React from 'react';
import { motion } from 'framer-motion';

/**
 * TapePlayer Component
 * 
 * A retro-style tape recorder animation with spinning reels that react to music playback.
 * Features vintage 80s cassette deck aesthetic with warm colors and tactile shadows.
 * 
 * Props:
 * @param {boolean} isPlaying - Whether music is currently playing
 * @param {number} beatIntensity - Beat intensity for reactive animations (0-1)
 * @param {string} songTitle - Current song title
 * @param {string} artist - Current artist name
 */
const TapePlayer = ({ isPlaying, beatIntensity = 0, songTitle = "No song playing", artist = "Unknown artist" }) => {
  
  // Animation variants for the tape reels
  const reelVariants = {
    playing: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    },
    paused: {
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Beat-reactive animation for the reels
  const beatVariants = {
    pulse: {
      scale: 1 + (beatIntensity * 0.1),
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 vintage-texture">
      
      {/* Main Tape Player Container */}
      <motion.div 
        className="relative bg-gradient-to-b from-vintage-brown to-gray-800 rounded-2xl p-8 shadow-vintage"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: '400px', height: '300px' }}
      >
        
        {/* Tape Player Face */}
        <div className="relative w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl border-2 border-gray-600">
          
          {/* Brand Label */}
          <div className="absolute top-4 left-4 bg-vintage-gold text-vintage-brown px-3 py-1 rounded text-xs font-bold font-retro">
            MIXTAPE
          </div>
          
          {/* Status LED */}
          <motion.div 
            className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
              isPlaying ? 'bg-vintage-red glow' : 'bg-gray-500'
            }`}
            animate={isPlaying ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Left Tape Reel */}
          <motion.div 
            className="absolute left-12 top-1/2 transform -translate-y-1/2"
            variants={reelVariants}
            animate={isPlaying ? "playing" : "paused"}
          >
            <motion.div 
              className="relative"
              variants={beatVariants}
              animate={isPlaying && beatIntensity > 0 ? "pulse" : {}}
            >
              {/* Reel Outer Ring */}
              <div className="w-20 h-20 border-4 border-gray-400 rounded-full bg-gray-600 shadow-tape"></div>
              
              {/* Reel Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-500"></div>
              
              {/* Reel Spokes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div
                  key={angle}
                  className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 origin-bottom"
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                ></div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Tape Reel */}
          <motion.div 
            className="absolute right-12 top-1/2 transform -translate-y-1/2"
            variants={reelVariants}
            animate={isPlaying ? "playing" : "paused"}
          >
            <motion.div 
              className="relative"
              variants={beatVariants}
              animate={isPlaying && beatIntensity > 0 ? "pulse" : {}}
            >
              {/* Reel Outer Ring */}
              <div className="w-20 h-20 border-4 border-gray-400 rounded-full bg-gray-600 shadow-tape"></div>
              
              {/* Reel Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-500"></div>
              
              {/* Reel Spokes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div
                  key={angle}
                  className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 origin-bottom"
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                ></div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Tape Path (Visual representation of tape moving between reels) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gray-400 rounded"
            animate={isPlaying ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Play Head */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-vintage-gold rounded-sm shadow-lg"></div>
          
          {/* Control Labels */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-300 font-retro">
            L
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-gray-300 font-retro">
            R
          </div>
        </div>
      </motion.div>
      
      {/* Song Information Display */}
      <motion.div 
        className="mt-8 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.h2 
          className="text-xl font-bold text-vintage-brown font-retro mb-2"
          key={songTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {songTitle}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 font-retro"
          key={artist}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {artist}
        </motion.p>
        
        {/* Visualizer Bars (simulated beat visualization) */}
        <div className="flex justify-center items-end space-x-1 mt-4 h-8">
          {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.4, 0.6].map((height, index) => (
            <motion.div
              key={index}
              className="w-1 bg-vintage-red rounded-t"
              animate={isPlaying ? { 
                height: `${height * 100 * (1 + beatIntensity)}%`,
                opacity: [0.4, 1, 0.4]
              } : { 
                height: `${height * 30}%`,
                opacity: 0.4
              }}
              transition={{ 
                duration: 0.5 + (index * 0.1),
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TapePlayer;
