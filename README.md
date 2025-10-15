# 🎵 Mixtape Player

A modern, nostalgic web app that brings the warmth of 80s cassette decks to your Spotify listening experience. Built with React, Tailwind CSS, and Framer Motion, featuring smooth animations and beat-reactive tape reel effects.

![Mixtape Player Demo](https://via.placeholder.com/800x400/f7f3e9/8b4513?text=Mixtape+Player+Demo)

## ✨ Features

- **Retro Tape Animation**: Smoothly spinning tape reels that react to music
- **Spotify Integration**: Full playback control with your personal playlists
- **Beat Detection**: Tape reels subtly pulse and react to the music rhythm
- **Vintage Aesthetic**: Warm, nostalgic 80s cassette deck design
- **Responsive Design**: Works beautifully on desktop and mobile
- **Modern Tech Stack**: React 18, Tailwind CSS, Framer Motion

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Spotify Premium account
- Spotify Developer App (see setup instructions below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mixtape-animation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Spotify credentials** (see Spotify Setup section)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser** to `http://localhost:3000`

## 🎧 Spotify Setup

### Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the app details:
   - **App name**: Mixtape Player
   - **App description**: Retro tape player with Spotify integration
   - **Website**: `http://localhost:3000` (for development)
   - **Redirect URI**: `http://localhost:3000`
4. Click "Save"

### Step 2: Get Your Credentials

1. In your app settings, find:
   - **Client ID** (public)
   - **Client Secret** (keep this secure!)
2. Copy these values

### Step 3: Configure the App

1. Open `src/utils/spotifyConfig.js`
2. Replace the placeholder values:

```javascript
export const SPOTIFY_CONFIG = {
  CLIENT_ID: 'your_actual_client_id_here',
  CLIENT_SECRET: 'your_actual_client_secret_here',
  REDIRECT_URI: 'http://localhost:3000',
  PLAYLIST_ID: 'your_spotify_playlist_id_here'
};
```

### Step 4: Get Your Playlist ID

1. Open Spotify and find your playlist
2. Copy the playlist URL (e.g., `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`)
3. The playlist ID is the part after `/playlist/` (e.g., `37i9dQZF1DXcBWIGoYBM5M`)
4. Paste this ID in the `PLAYLIST_ID` field

### Step 5: Test the Integration

1. Start the app: `npm start`
2. Click "Connect Spotify"
3. Authorize the app with your Spotify account
4. Your playlist should start playing automatically!

## 🌐 Deployment to Vercel

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure build settings:
     - **Framework Preset**: Create React App
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Add Environment Variables**
   In Vercel dashboard, go to your project settings and add:
   ```
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

4. **Update Spotify App Settings**
   - Go back to Spotify Developer Dashboard
   - Add your Vercel domain to Redirect URIs:
     - `https://your-app-name.vercel.app`
   - Update `spotifyConfig.js`:
   ```javascript
   REDIRECT_URI: process.env.NODE_ENV === 'production' 
     ? 'https://your-app-name.vercel.app' 
     : 'http://localhost:3000',
   ```

5. **Deploy**
   - Click "Deploy" in Vercel
   - Your app will be live at `https://your-app-name.vercel.app`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts** and configure your environment variables

## 🔧 Configuration Options

### Customizing the Playlist

Edit `src/utils/spotifyConfig.js`:

```javascript
// Your playlist ID
PLAYLIST_ID: 'your_playlist_id_here',

// Or use a different Spotify URI
PLAYLIST_URI: 'spotify:playlist:your_playlist_id_here',
```

### Customizing the Aesthetic

Edit `tailwind.config.js` to modify colors:

```javascript
theme: {
  extend: {
    colors: {
      'vintage-cream': '#your_color',
      'vintage-brown': '#your_color',
      // ... other colors
    }
  }
}
```

### Adjusting Beat Detection

Modify `src/hooks/useBeatDetection.js` to customize:

- Beat intensity sensitivity
- Animation timing
- BPM estimation algorithms

## 🎨 Design Features

### Vintage Aesthetic Elements

- **Color Palette**: Warm creams, vintage browns, and gold accents
- **Typography**: Courier New monospace font for retro feel
- **Shadows**: Soft, tactile shadows with inset highlights
- **Animations**: Smooth, spring-based transitions
- **Textures**: Subtle dot pattern overlay for vintage feel

### Animation Details

- **Tape Reels**: Continuous rotation with beat-reactive scaling
- **LED Indicator**: Pulsing red light when playing
- **Button Interactions**: Hover effects with scale and shadow changes
- **Page Transitions**: Staggered animations for smooth loading
- **Visualizer**: Beat-reactive bars below track info

## 🔍 Troubleshooting

### Common Issues

**"Authentication failed"**
- Check your Client ID and Client Secret
- Ensure Redirect URI matches exactly in Spotify Dashboard
- Make sure you're using Spotify Premium

**"Playback error"**
- Verify your playlist ID is correct
- Check that the playlist is public or you have access
- Ensure Spotify Web Playback SDK is loading

**"Player not connecting"**
- Check browser console for errors
- Ensure you're using HTTPS in production
- Try refreshing the page and re-authenticating

### Debug Mode

Enable debug logging by adding to your browser console:

```javascript
localStorage.setItem('debug', 'true');
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

**Note**: Spotify Web Playback SDK requires a modern browser with Web Audio API support.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://reactjs.org/) for the component architecture

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the Spotify Developer documentation
3. Open an issue on GitHub with detailed error information

---

**Happy listening! 🎵✨**

*Built with ❤️ for the love of music and nostalgia*
