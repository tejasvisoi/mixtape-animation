import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * DemoMode Component
 * 
 * Provides a demo mode for testing the tape player animation
 * without requiring Spotify authentication. Simulates music playback
 * with mock track data and beat detection.
 */
const DemoMode = ({ onExitDemo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatIntensity, setBeatIntensity] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({
    name: "Demo Track - Retro Vibes",
    artist: "Mixtape Player Demo"
  });

  // Simulate beat detection
  useEffect(() => {
    if (!isPlaying) {
      setBeatIntensity(0);
      return;
    }

    const interval = setInterval(() => {
      setBeatIntensity(Math.random() * 0.8 + 0.2);
      setTimeout(() => setBeatIntensity(beatIntensity * 0.3), 100);
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, beatIntensity]);

  // Cycle through demo tracks
  useEffect(() => {
    const tracks = [
      { name: "Demo Track - Retro Vibes", artist: "Mixtape Player Demo" },
      { name: "Synthwave Dreams", artist: "80s Nostalgia" },
      { name: "Tape Deck Memories", artist: "Vintage Sounds" },
      { name: "Analog Love", artist: "Retro Revival" }
    ];

    let trackIndex = 0;
    const trackInterval = setInterval(() => {
      if (isPlaying) {
        trackIndex = (trackIndex + 1) % tracks.length;
        setCurrentTrack(tracks[trackIndex]);
      }
    }, 10000); // Change track every 10 seconds

    return () => clearInterval(trackInterval);
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const skipToNext = () => {
    const tracks = [
      { name: "Demo Track - Retro Vibes", artist: "Mixtape Player Demo" },
      { name: "Synthwave Dreams", artist: "80s Nostalgia" },
      { name: "Tape Deck Memories", artist: "Vintage Sounds" },
      { name: "Analog Love", artist: "Retro Revival" }
    ];
    const currentIndex = tracks.findIndex(track => track.name === currentTrack.name);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  const skipToPrevious = () => {
    const tracks = [
      { name: "Demo Track - Retro Vibes", artist: "Mixtape Player Demo" },
      { name: "Synthwave Dreams", artist: "80s Nostalgia" },
      { name: "Tape Deck Memories", artist: "Vintage Sounds" },
      { name: "Analog Love", artist: "Retro Revival" }
    ];
    const currentIndex = tracks.findIndex(track => track.name === currentTrack.name);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-cream via-vintage-cream to-yellow-50 vintage-texture">
      
      {/* Demo Header */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-10 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          
          <motion.h1 
            className="text-3xl font-bold text-vintage-brown font-retro"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎵 Mixtape Player - Demo Mode
          </motion.h1>
          
          <motion.button
            className="vintage-button bg-vintage-gold text-vintage-brown px-6 py-2 rounded-full font-retro shadow-vintage"
            onClick={onExitDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Exit Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Demo Notice */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 max-w-md mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-yellow-800 font-retro text-sm text-center">
          🎧 Demo Mode - This is a preview of the tape player animation
          <br />
          Connect Spotify to play real music from your playlists
        </div>
      </motion.div>

      {/* Main Demo Content */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-32 pb-8">
        
        {/* Tape Player */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          {/* Main Tape Player Container */}
          <motion.div 
            className="relative bg-gradient-to-b from-vintage-brown to-gray-800 rounded-2xl p-8 shadow-vintage"
            style={{ width: '400px', height: '300px' }}
          >
            
            {/* Tape Player Face */}
            <div className="relative w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl border-2 border-gray-600">
              
              {/* Brand Label */}
              <div className="absolute top-4 left-4 bg-vintage-gold text-vintage-brown px-3 py-1 rounded text-xs font-bold font-retro">
                DEMO
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
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              >
                <motion.div 
                  className="relative"
                  animate={isPlaying && beatIntensity > 0 ? { scale: 1 + (beatIntensity * 0.1) } : { scale: 1 }}
                  transition={{ duration: 0.1 }}
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
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              >
                <motion.div 
                  className="relative"
                  animate={isPlaying && beatIntensity > 0 ? { scale: 1 + (beatIntensity * 0.1) } : { scale: 1 }}
                  transition={{ duration: 0.1 }}
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
              
              {/* Tape Path */}
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
            key={currentTrack.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentTrack.name}
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 font-retro"
            key={currentTrack.artist}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentTrack.artist}
          </motion.p>
          
          {/* Visualizer Bars */}
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

        {/* Demo Controls */}
        <motion.div 
          className="flex items-center justify-center space-x-6 mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          
          {/* Previous Track Button */}
          <motion.button
            className="vintage-button w-12 h-12 rounded-full border-2 border-vintage-brown bg-vintage-cream hover:bg-vintage-gold flex items-center justify-center text-vintage-brown shadow-vintage"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipToPrevious}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
            </svg>
          </motion.button>

          {/* Play/Pause Button */}
          <motion.button
            className={`vintage-button w-16 h-16 rounded-full border-2 border-vintage-red flex items-center justify-center text-white shadow-vintage ${
              isPlaying ? 'bg-vintage-red glow' : 'bg-vintage-red hover:bg-red-600'
            }`}
            animate={isPlaying ? { scale: 1.1 } : { scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
              </svg>
            )}
          </motion.button>

          {/* Next Track Button */}
          <motion.button
            className="vintage-button w-12 h-12 rounded-full border-2 border-vintage-brown bg-vintage-cream hover:bg-vintage-gold flex items-center justify-center text-vintage-brown shadow-vintage"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipToNext}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
            </svg>
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-500 font-retro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <p>Demo Mode - Built with React, Tailwind CSS & Framer Motion</p>
        <p className="mt-1">Connect Spotify for real music playback 🎵</p>
      </motion.footer>
    </div>
  );
};

export default DemoMode;
