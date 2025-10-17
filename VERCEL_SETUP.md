# 🚀 Vercel Environment Variables Setup

Your app is deployed at: **https://mixtape-animation-rm1fdigc2-tejasvisois-projects.vercel.app**

## 🔧 Required Environment Variables in Vercel:

Go to your Vercel dashboard → Project Settings → Environment Variables and add:

### **Environment Variables:**
```
REACT_APP_SPOTIFY_CLIENT_ID=974425ac66744974a11a42a9c9c9608f
REACT_APP_SPOTIFY_CLIENT_SECRET=879bec48ef484cd1926625b5634cda17
REACT_APP_SPOTIFY_REDIRECT_URI=https://mixtape-animation-rm1fdigc2-tejasvisois-projects.vercel.app
REACT_APP_SPOTIFY_PLAYLIST_ID=your_playlist_id_here
```

## 🎯 Spotify Developer Dashboard Update:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Click "Settings"
4. Add these Redirect URIs:
   - `http://localhost:3000` (for local development)
   - `https://mixtape-animation-rm1fdigc2-tejasvisois-projects.vercel.app` (for production)

## ✅ After Setup:

1. **Redeploy** your Vercel app (it will automatically redeploy when you push to GitHub)
2. **Test** your live app at the Vercel URL
3. **Click "Connect Spotify"** - it should work without redirect URI errors!

## 🎵 Ready to Rock!

Once configured, your retro tape player will be live and ready to play music from your Spotify playlists! 🎵✨
