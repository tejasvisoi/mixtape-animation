import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TapePlayer from './components/TapePlayer';
import PlaybackControls from './components/PlaybackControls';
import DemoMode from './components/DemoMode';
import useSpotify from './hooks/useSpotify';
import useBeatDetection from './hooks/useBeatDetection';

/**
 * Main App Component
 * 
 * This is the root component that orchestrates the entire mixtape player experience.
 * It integrates Spotify authentication, beat detection, and all UI components.
 * 
 * Features:
 * - Spotify authentication and playback control
 * - Beat-reactive tape reel animations
 * - Vintage 80s cassette deck aesthetic
 * - Responsive design with warm, nostalgic colors
 */
function App() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const {
    isAuthenticated,
    isLoading,
    currentTrack,
    isPlaying,
    error,
    login,
    logout,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    playPlaylist
  } = useSpotify();

  // Beat detection for reactive animations
  const { beatIntensity } = useBeatDetection(isPlaying, currentTrack);

  // Show demo mode if selected
  if (isDemoMode) {
    return <DemoMode onExitDemo={() => setIsDemoMode(false)} />;
  }

  // Handle login with playlist playback
  const handleLogin = () => {
    login();
  };

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  // Handle play/pause with automatic playlist loading
  const handleTogglePlayback = async () => {
    if (!isAuthenticated) {
      handleLogin();
      return;
    }

    // If no track is playing and we have a playlist, start playing it
    if (!currentTrack && playPlaylist) {
      await playPlaylist();
    } else {
      togglePlayback();
    }
  };

  // Get current track info for display
  const getCurrentTrackInfo = () => {
    if (!currentTrack) {
      return {
        title: "Ready to play your mixtape",
        artist: "Connect to Spotify to begin"
      };
    }

    return {
      title: currentTrack.name || "Unknown Track",
      artist: currentTrack.artists?.[0]?.name || "Unknown Artist"
    };
  };

  const trackInfo = getCurrentTrackInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Header */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-10 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          
          {/* App Title */}
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎵 Mixtape Player
          </motion.h1>
          
          {/* Authentication Buttons */}
          <div className="flex space-x-3">
            <AnimatePresence mode="wait">
              {isAuthenticated ? (
                  <motion.button
                    key="logout"
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-colors"
                    onClick={handleLogout}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
              ) : (
                <>
                  <motion.button
                    key="demo"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-colors"
                    onClick={() => setIsDemoMode(true)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Demo
                  </motion.button>
                  <motion.button
                    key="login"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-500 transition-colors"
                    onClick={handleLogin}
                    disabled={isLoading}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? "Connecting..." : "Connect Spotify"}
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8">
        
        {/* Tape Player */}
        <TapePlayer
          isPlaying={isPlaying}
          beatIntensity={beatIntensity}
          songTitle={trackInfo.title}
          artist={trackInfo.artist}
        />

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={handleTogglePlayback}
          onPrevious={skipToPrevious}
          onNext={skipToNext}
          canGoPrevious={isAuthenticated && currentTrack}
          canGoNext={isAuthenticated && currentTrack}
        />

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 max-w-md mx-auto p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 font-retro text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Setup Instructions */}
        {!isAuthenticated && (
          <motion.div
            className="mt-8 max-w-2xl mx-auto p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-vintage-brown/20 shadow-vintage"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold text-vintage-brown font-retro mb-4">
              🎧 Setup Instructions
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>1. Click "Connect Spotify" to authenticate with your Spotify account</p>
              <p>2. Make sure you have Spotify Premium (required for Web Playback SDK)</p>
              <p>3. The app will automatically play from your configured playlist</p>
              <p>4. Watch the tape reels spin and react to the music!</p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        className="absolute bottom-0 left-0 right-0 p-4 text-center text-xs text-gray-500 font-retro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <p>Built with React, Tailwind CSS, Framer Motion & Spotify Web Playback SDK</p>
        <p className="mt-1">Vintage vibes for the digital age 🎵</p>
      </motion.footer>
    </div>
  );
}

export default App;
