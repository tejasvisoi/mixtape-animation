import React from 'react';
import { motion } from 'framer-motion';

/**
 * TapePlayer Component - Web Cassette Style
 * 
 * Authentic cassette deck design inspired by Klevgrand's Web Cassette
 * Features realistic tape mechanism, vintage controls, and authentic styling
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
        duration: 3,
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
      scale: 1 + (beatIntensity * 0.05),
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Main Cassette Deck */}
      <motion.div 
        className="relative bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: '500px', height: '350px' }}
      >
        
        {/* Cassette Deck Face */}
        <div className="relative w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg border-4 border-gray-500">
          
          {/* Brand Label - Top */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-4 py-1 rounded text-sm font-bold shadow-lg">
              MIXTAPE PLAYER
            </div>
          </div>
          
          {/* Tape Compartment */}
          <div className="absolute top-16 left-8 right-8 bottom-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg border-2 border-gray-500">
            
            {/* Tape Window */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-black rounded border border-gray-600">
              
              {/* Left Reel */}
              <motion.div 
                className="absolute left-6 top-1/2 transform -translate-y-1/2"
                variants={reelVariants}
                animate={isPlaying ? "playing" : "paused"}
              >
                <motion.div 
                  className="relative"
                  variants={beatVariants}
                  animate={isPlaying && beatIntensity > 0 ? "pulse" : {}}
                >
                  {/* Reel Base */}
                  <div className="w-16 h-16 bg-gray-300 rounded-full border-2 border-gray-400 shadow-inner"></div>
                  
                  {/* Reel Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-600 rounded-full border border-gray-500"></div>
                  
                  {/* Reel Spokes */}
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-gray-400 transform -translate-x-1/2 -translate-y-1/2 origin-bottom"
                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                    ></div>
                  ))}
                  
                  {/* Tape Spool */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-gray-500 rounded-full"></div>
                </motion.div>
              </motion.div>
              
              {/* Right Reel */}
              <motion.div 
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
                variants={reelVariants}
                animate={isPlaying ? "playing" : "paused"}
              >
                <motion.div 
                  className="relative"
                  variants={beatVariants}
                  animate={isPlaying && beatIntensity > 0 ? "pulse" : {}}
                >
                  {/* Reel Base */}
                  <div className="w-16 h-16 bg-gray-300 rounded-full border-2 border-gray-400 shadow-inner"></div>
                  
                  {/* Reel Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-600 rounded-full border border-gray-500"></div>
                  
                  {/* Reel Spokes */}
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-gray-400 transform -translate-x-1/2 -translate-y-1/2 origin-bottom"
                      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                    ></div>
                  ))}
                  
                  {/* Tape Spool */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-gray-500 rounded-full"></div>
                </motion.div>
              </motion.div>
              
              {/* Tape Path */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gray-400"
                animate={isPlaying ? { 
                  opacity: [0.2, 0.8, 0.2],
                  scaleX: [0.8, 1.2, 0.8]
                } : { 
                  opacity: 0.2,
                  scaleX: 1
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Play Head */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-yellow-400 rounded-sm shadow-lg"></div>
              
              {/* Tape Guides */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            
            {/* Status Indicators */}
            <div className="absolute top-2 left-2 flex space-x-2">
              <motion.div 
                className={`w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-green-400' : 'bg-gray-500'
                }`}
                animate={isPlaying ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            </div>
            
            {/* Channel Labels */}
            <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-mono">
              L
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-mono">
              R
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="absolute bottom-4 left-4 right-4 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded border border-gray-600 flex items-center justify-between px-4">
            
            {/* VU Meters */}
            <div className="flex space-x-1">
              {[0.3, 0.6, 0.4, 0.8, 0.5].map((height, index) => (
                <motion.div
                  key={index}
                  className="w-1 bg-gradient-to-t from-red-500 to-yellow-400 rounded-t"
                  animate={isPlaying ? { 
                    height: `${height * 100 * (1 + beatIntensity)}%`,
                    opacity: [0.4, 1, 0.4]
                  } : { 
                    height: `${height * 30}%`,
                    opacity: 0.4
                  }}
                  transition={{ 
                    duration: 0.3 + (index * 0.1),
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ height: '20px' }}
                />
              ))}
            </div>
            
            {/* Center Info */}
            <div className="text-center text-xs text-gray-300 font-mono">
              <div className="truncate max-w-32">{songTitle}</div>
              <div className="text-gray-400 truncate max-w-32">{artist}</div>
            </div>
            
            {/* Time Display */}
            <div className="text-xs text-gray-400 font-mono">
              00:00
            </div>
          </div>
        </div>
        
        {/* Cassette Deck Shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black opacity-20 rounded-b-lg"></div>
      </motion.div>
      
      {/* Song Information Display */}
      <motion.div 
        className="mt-8 text-center max-w-lg bg-white bg-opacity-90 rounded-lg p-6 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-2"
          key={songTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {songTitle}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600"
          key={artist}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {artist}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default TapePlayer;
