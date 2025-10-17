/**
 * Spotify Configuration
 * 
 * This file contains placeholder Spotify credentials and configuration.
 * 
 * TO SETUP YOUR SPOTIFY INTEGRATION:
 * 
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create a new app
 * 3. Add "http://localhost:3000" to Redirect URIs in app settings
 * 4. Replace the placeholder values below with your actual credentials
 * 5. For production, add your production domain to Redirect URIs
 * 
 * IMPORTANT SECURITY NOTES:
 * - Never commit real credentials to version control
 * - Use environment variables for production
 * - The client ID can be public, but keep the client secret secure
 */

// Spotify App Credentials
// Uses environment variables for security in production
export const SPOTIFY_CONFIG = {
  // Your Spotify App Client ID (public)
  CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID || '974425ac66744974a11a42a9c9c9608f',
  
  // Your Spotify App Client Secret (keep this secure!)
  CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || '879bec48ef484cd1926625b5634cda17',
  
  // Redirect URI (must match what you set in Spotify Dashboard)
  REDIRECT_URI: process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://mixtape-animation-rm1fdigc2-tejasvisois-projects.vercel.app' 
      : 'http://localhost:3000'),
  
  // Scopes required for playback
  SCOPES: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' '),
  
  // Your Spotify Playlist ID (found in the playlist URL)
  // Example: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
  // The playlist ID is: 37i9dQZF1DXcBWIGoYBM5M
  PLAYLIST_ID: process.env.REACT_APP_SPOTIFY_PLAYLIST_ID || 'YOUR_PLAYLIST_ID_HERE'
};

// Spotify API endpoints
export const SPOTIFY_API = {
  AUTH: 'https://accounts.spotify.com/authorize',
  TOKEN: 'https://accounts.spotify.com/api/token',
  BASE: 'https://api.spotify.com/v1',
  PLAYER: 'https://sdk.scdn.co/spotify-player.js'
};

// Helper function to generate Spotify auth URL
export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
    show_dialog: 'true'
  });
  
  return `${SPOTIFY_API.AUTH}?${params.toString()}`;
};

// Helper function to exchange authorization code for access token
export const exchangeCodeForToken = async (code) => {
  const response = await fetch(SPOTIFY_API.TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }
  
  return response.json();
};

// Helper function to refresh access token
export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(SPOTIFY_API.TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  
  return response.json();
};
