#!/bin/bash

# Mixtape Player - Auto Push to GitHub Script
# This script will help you push your code to GitHub automatically

echo "🎵 Mixtape Player - GitHub Push Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding all files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit."
else
    echo "Committing changes..."
    git commit -m "Update: Mixtape Player with Spotify integration

- Retro tape player animation with spinning reels
- Spotify Web Playback SDK integration  
- Beat-reactive animations and visualizations
- Vintage 80s cassette deck aesthetic
- Demo mode for testing without Spotify
- Production-ready deployment configuration
- Complete documentation and setup guides"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "⚠️  No GitHub remote configured yet!"
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to https://github.com and create a new repository"
    echo "2. Name it: mixtape-player (or any name you prefer)"
    echo "3. Make it PUBLIC (required for free Vercel deployment)"
    echo "4. Don't initialize with README (we already have one)"
    echo "5. Copy the repository URL (e.g., https://github.com/YOUR_USERNAME/mixtape-player.git)"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    
    if [ -n "$REPO_URL" ]; then
        echo "Adding remote origin..."
        git remote add origin "$REPO_URL"
    else
        echo "❌ No repository URL provided. Exiting."
        exit 1
    fi
fi

# Push to GitHub
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Your Mixtape Player has been pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Import your GitHub repository"
    echo "3. Add these environment variables:"
    echo "   - REACT_APP_SPOTIFY_CLIENT_ID: 974425ac66744974a11a42a9c9c9608f"
    echo "   - REACT_APP_SPOTIFY_CLIENT_SECRET: 879bec48ef484cd1926625b5634cda17"
    echo "   - REACT_APP_SPOTIFY_PLAYLIST_ID: your_playlist_id_here"
    echo "4. Deploy and enjoy your retro tape player! 🎵"
else
    echo "❌ Failed to push to GitHub. Please check your repository URL and try again."
fi
