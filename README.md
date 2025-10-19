# Echoes of You - Vintage Cassette Player

A beautiful, nostalgic HTML5 cassette player with a modern web interface. This project recreates the vintage cassette tape experience with realistic animations and controls.

## 🎵 Features

- **Realistic Cassette Player**: Interactive cassette tape that flips between sides A and B
- **Custom Playlist**: Curated selection of indie and alternative tracks
- **Volume Control**: Interactive volume knob with visual feedback
- **Side Switching**: Flip between cassette sides with 3D animation
- **Current Song Display**: Shows the currently playing track and side
- **Responsive Design**: Works on desktop and mobile devices
- **Vintage Aesthetic**: Beautiful typography and nostalgic design

## 🎶 Playlist

### Side A
1. Yuuf - Iman
2. Slowdive - Sugar For The Pill
3. Perfect Blue - Elle Valenci
4. Nation of Language - On Division St
5. Cannons - Afterglow

### Side B
1. Tokyo Tea Room - Things Are Changing
2. Si tu vas - Fred Nevche
3. Kid Francescoli - Les Vitrines
4. L'Impératrice AGITATIONS TROPICALES
5. mehro - chance with you
6. John Mayer - Carry Me Away

## 🚀 Live Demo

Visit the live application: [Your Vercel URL will be here]

## 🛠️ Technologies Used

- **HTML5 Audio API**: For music playback
- **CSS3 Animations**: For tape flipping and wheel rotation
- **jQuery**: For DOM manipulation and interactions
- **KnobKnob Plugin**: For the volume control knob
- **Modernizr**: For feature detection

## 📁 Project Structure

```
CassettePlayer/
├── css/
│   ├── demo.css          # Main styling
│   ├── style.css         # Cassette player styles
│   ├── knobKnob.css      # Volume knob styles
│   └── normalize.css     # CSS reset
├── js/
│   ├── jquery.cassette.js # Main player logic
│   ├── knobKnob.jquery.js # Volume knob plugin
│   ├── transform.js      # CSS transform utilities
│   └── modernizr.custom.69142.js # Feature detection
├── images/
│   ├── DSCF1779.JPG      # Background image
│   ├── cs_front.png      # Cassette front side
│   ├── cs_back.png       # Cassette back side
│   └── cs_wheel.png      # Tape wheels
├── songs/                # Audio files
└── index.html           # Main HTML file
```

## 🎮 Controls

- **Play**: Start/pause playback
- **Rew**: Rewind through tracks
- **FF**: Fast forward through tracks
- **Stop**: Stop playback
- **Switch**: Flip cassette to other side
- **Volume Knob**: Adjust playback volume

## 🎨 Customization

The player can be easily customized by modifying:

- **Songs**: Update the playlist in `js/jquery.cassette.js`
- **Styling**: Modify colors and fonts in `css/demo.css`
- **Background**: Replace `images/DSCF1779.JPG` with your own image
- **Text**: Update the title and subtitle in `index.html`

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is for personal use. Please respect the copyrights of the included music tracks.

## 🙏 Credits

- Cassette tape PSD by [Mauricio Estrella](http://manicho.deviantart.com/art/Cassette-PSD-File-86548493)
- KnobKnob plugin by [Martin Angelov](https://github.com/martinaglv/KnobKnob)
- Original cassette player concept inspired by vintage audio equipment
