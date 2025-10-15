import { useState, useEffect, useCallback } from 'react';
import { SPOTIFY_CONFIG, SPOTIFY_API, getSpotifyAuthUrl, exchangeCodeForToken } from '../utils/spotifyConfig';

/**
 * Custom Hook for Spotify Integration
 * 
 * This hook manages Spotify authentication, token management, and playback state.
 * It provides a clean interface for the main app to interact with Spotify Web Playback SDK.
 * 
 * Returns:
 * - isAuthenticated: boolean indicating if user is logged in
 * - isLoading: boolean indicating if authentication is in progress
 * - player: Spotify Web Playback SDK player instance
 * - currentTrack: current playing track info
 * - isPlaying: boolean indicating if music is playing
 * - login: function to initiate Spotify login
 * - logout: function to logout user
 * - togglePlayback: function to play/pause music
 * - skipToNext: function to skip to next track
 * - skipToPrevious: function to skip to previous track
 * - error: any error that occurred during Spotify operations
 */
const useSpotify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = SPOTIFY_API.PLAYER;
    script.async = true;
    
    // Only add script if it doesn't already exist
    if (!document.querySelector(`script[src="${SPOTIFY_API.PLAYER}"]`)) {
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready');
    };

    return () => {
      const existingScript = document.querySelector(`script[src="${SPOTIFY_API.PLAYER}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Initialize Spotify Player
  const initializePlayer = useCallback(async (token) => {
    if (!window.Spotify) {
      console.error('Spotify Web Playback SDK not loaded');
      return;
    }

    try {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Mixtape Player',
        getOAuthToken: cb => cb(token),
        volume: 0.5
      });

      // Player ready
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Player is ready with Device ID:', device_id);
        setPlayer(spotifyPlayer);
      });

      // Player state changed
      spotifyPlayer.addListener('player_state_changed', state => {
        if (state) {
          setCurrentTrack(state.track_window.current_track);
          setIsPlaying(!state.paused);
        }
      });

      // Authentication error
      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
        setError('Authentication failed. Please login again.');
        logout();
      });

      // Account error
      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
        setError('Account error. Please check your Spotify account.');
      });

      // Playback error
      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
        setError('Playback error: ' + message);
      });

      // Connect to the player
      const success = await spotifyPlayer.connect();
      if (success) {
        console.log('Successfully connected to Spotify');
      }
    } catch (err) {
      console.error('Failed to initialize Spotify player:', err);
      setError('Failed to initialize Spotify player');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('spotify_access_token');
      const refreshToken = localStorage.getItem('spotify_refresh_token');
      
      if (token && refreshToken) {
        setIsAuthenticated(true);
        await initializePlayer(token);
      }
    };
    
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login function
  const login = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    // Check if we're returning from Spotify auth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setError('Spotify authentication was cancelled');
      setIsLoading(false);
      return;
    }

    if (code) {
      // Exchange code for token
      exchangeCodeForToken(code)
        .then(data => {
          localStorage.setItem('spotify_access_token', data.access_token);
          localStorage.setItem('spotify_refresh_token', data.refresh_token);
          setIsAuthenticated(true);
          setIsLoading(false);
          initializePlayer(data.access_token);
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(err => {
          console.error('Token exchange failed:', err);
          setError('Authentication failed');
          setIsLoading(false);
        });
    } else {
      // Redirect to Spotify auth
      window.location.href = getSpotifyAuthUrl();
    }
  }, [initializePlayer]);

  // Logout function
  const logout = useCallback(() => {
    if (player) {
      player.disconnect();
      setPlayer(null);
    }
    
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    setIsAuthenticated(false);
    setCurrentTrack(null);
    setIsPlaying(false);
    setError(null);
  }, [player]);

  // Toggle playback
  const togglePlayback = useCallback(async () => {
    if (!player) return;

    try {
      await player.togglePlay();
    } catch (err) {
      console.error('Toggle playback failed:', err);
      setError('Failed to toggle playback');
    }
  }, [player]);

  // Skip to next track
  const skipToNext = useCallback(async () => {
    if (!player) return;

    try {
      await player.nextTrack();
    } catch (err) {
      console.error('Skip to next failed:', err);
      setError('Failed to skip to next track');
    }
  }, [player]);

  // Skip to previous track
  const skipToPrevious = useCallback(async () => {
    if (!player) return;

    try {
      await player.previousTrack();
    } catch (err) {
      console.error('Skip to previous failed:', err);
      setError('Failed to skip to previous track');
    }
  }, [player]);

  // Play specific playlist
  const playPlaylist = useCallback(async () => {
    if (!player || !SPOTIFY_CONFIG.PLAYLIST_ID) return;

    try {
      const token = localStorage.getItem('spotify_access_token');
      const response = await fetch(
        `${SPOTIFY_API.BASE}/me/player/play?device_id=${player._options.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            context_uri: `spotify:playlist:${SPOTIFY_CONFIG.PLAYLIST_ID}`
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to play playlist');
      }
    } catch (err) {
      console.error('Play playlist failed:', err);
      setError('Failed to play playlist');
    }
  }, [player]);

  return {
    isAuthenticated,
    isLoading,
    player,
    currentTrack,
    isPlaying,
    error,
    login,
    logout,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    playPlaylist
  };
};

export default useSpotify;
