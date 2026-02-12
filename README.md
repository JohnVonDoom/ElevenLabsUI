# ElevenLabs TTS UI

A self-hosted text-to-speech interface for ElevenLabs API. Run locally on your device with full control over your data and API key.

## Features

- 100% local and private - your API key never leaves your device
- Access all your ElevenLabs voices (pre-made and cloned)
- Support for all ElevenLabs models (v3, Turbo, Flash, etc.)
- Clean, modern Bootstrap-based interface
- Works on desktop and Android (via Termux)
- Open source and fully transparent

## Security and Privacy

Your API key is stored locally in your browser's localStorage. Requests are proxied through your own local server — no third-party servers are involved. No tracking, no analytics, no telemetry.

## Requirements

- Node.js version 16 or higher
- npm (comes with Node.js)
- ElevenLabs API key (get one at https://elevenlabs.io)

For Android/Termux:
- Termux app from F-Droid
- Storage access permission

## Installation (Desktop)

```bash
cd ElevenLabsUI

# Run the installation script
bash install.sh

# Or install manually:
cd backend
npm install
cd ../elevenlabsui
npm install
npm run build
```

## Usage (Desktop)

```bash
# Start the server
bash start.sh

# Or start manually:
cd backend
npm start
```

Open your browser to: http://localhost:3001

## Installation (Android via Termux)

### One-Time Setup

1. Install Termux from F-Droid

2. Open Termux and run these commands:

```bash
# Update packages
pkg update && pkg upgrade

# Install Node.js and git
pkg install nodejs git

# Allow storage access
termux-setup-storage

# Clone this repository
git clone https://github.com/JohnVonDoom/ElevenLabsUI.git
cd ElevenLabsUI

# Install dependencies
bash install.sh
```

### Daily Use

```bash
# Open Termux
cd ElevenLabsUI

# Start server
bash start.sh

# Open your browser and go to:
# http://localhost:3001
```

Keep Termux running in the background while using the app.

## Updating to Latest Version

When updates are available, you can update your installation easily.

### Using the Update Script (Recommended)

```bash
cd ElevenLabsUI
bash update.sh
```

The script will automatically:
- Pull latest changes from GitHub
- Update backend dependencies
- Update frontend dependencies
- Rebuild the frontend

### Manual Update

```bash
cd ElevenLabsUI

# Pull latest changes
git pull origin master

# Update backend
cd backend
npm install
cd ..

# Update and rebuild frontend
cd elevenlabsui
npm install
npm run build
cd ..

# Restart server
bash start.sh
```

### If You Have Local Modifications

If you've made changes to the code and git pull fails:

```bash
# Save your changes
git stash

# Update
bash update.sh

# Reapply your changes (optional)
git stash pop
```

## How to Use

1. Start the server (see above)
2. Open browser to http://localhost:3001
3. Create or select an API profile at the top of the page
4. Enter/update the API key for the selected profile
5. Type your text in the text area
6. Choose a model (eleven_v3 recommended)
7. Select a voice from the dropdown
8. Click Generate to create speech

### Model Options

- eleven_v3: Most expressive, 70+ languages, supports emotions
- eleven_turbo_v2_5: Fast, 32 languages, low latency
- eleven_flash_v2_5: Ultra fast, 32 languages
- eleven_multilingual_v2: 29 languages, emotional and rich

### Using Emotions (v3 model only)

Use brackets for emotions: [laugh], [sigh], [gasp], [whisper]

Example: "Hello [laugh] this is amazing!"

## Project Structure

```
ElevenLabsUI/
├── backend/                   Express server
│   ├── server.js             Main server file
│   ├── package.json
│   └── .env                  Optional API key fallback
├── elevenlabsui/              React frontend
│   ├── src/
│   │   ├── App.js            Main app component
│   │   ├── App.css           Custom styles
│   │   ├── index.js          Entry point
│   │   └── components/
│   │       ├── ApiKeyInput.js    API key input with show/hide
│   │       ├── TextInput.js      Text area for input
│   │       ├── ModelSelect.js    Model dropdown selector
│   │       ├── VoiceSelect.js    Voice dropdown selector
│   │       ├── GenerateButton.js Generate button with spinner
│   │       ├── ErrorAlert.js     Error alert banner
│   │       ├── AudioPlayer.js    Audio playback player
│   │       ├── TTSGuideModal.js  TTS models/tips guide modal
│   │       └── CreateProfileModal.js Profile creation modal with validation
│   ├── public/
│   ├── build/                Built frontend (served by backend)
│   └── package.json
├── install.sh                Setup script
├── start.sh                  Start server script
├── update.sh                 Update script
└── README.md
```

## Development Mode

Terminal 1 - Backend:
```bash
cd backend
npm start
```

Terminal 2 - Frontend:
```bash
cd elevenlabsui
npm start
```

Frontend dev server runs on http://localhost:3000

## Building for Production

```bash
cd elevenlabsui
npm run build
```

The backend serves the built frontend automatically.

## Troubleshooting

### Cannot find module errors

```bash
cd backend && npm install
cd ../elevenlabsui && npm install
```

### Port 3001 already in use

Windows:
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

Linux/Mac/Termux:
```bash
lsof -ti:3001 | xargs kill -9
```

### Voices not loading

- Check your API key is correct
- Check internet connection
- View browser console for errors (press F12)

### Android/Termux Issues

If Termux crashes or server stops:
- Go to Settings → Battery → Set to Unrestricted
- Keep Termux in foreground or use tmux

If you cannot access localhost:
- Use http://localhost:3001 (not 127.0.0.1)
- Check firewall settings

## Contributing

Contributions welcome. Feel free to report bugs, suggest features, or submit pull requests.

## License

[Add your license here - MIT, GPL v3, etc.]

## Disclaimer

This is an unofficial client for ElevenLabs. You need your own ElevenLabs API key and account. Respect ElevenLabs' terms of service and rate limits.

## Credits

Built with React, Bootstrap, and Express. Uses ElevenLabs API. Designed for privacy and self-hosting.
