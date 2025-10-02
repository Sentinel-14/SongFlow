# 🌊 SongFlow - AI-Powered Chat Assistant

> Never worry about "what should I reply" again!

SongFlow is an intelligent chat assistant that analyzes conversations and suggests perfect responses including text messages, songs, poetry, and taglines. It supports English, Hindi, and Hinglish languages.

## 🎯 Features
- Mood-based song snippet suggestions (Happy, Sad, Love, Party, Motivational)
- Audio preview playback (30s Spotify snippets)
- Real-time lyric synchronization during playback
- Share snippets to WhatsApp, Telegram, Instagram
- Mobile-responsive UI with Bootstrap

## 🛠 Tech Stack
- **Frontend**: React, Bootstrap, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Mobile**: Capacitor (Hybrid Android App)
- **APIs**: Spotify API, Genius API

## 📁 Project Structure
```
song-snippetly/
├── frontend/          # React app
├── backend/           # Node.js API server
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Android Studio (for SDK & Emulator)
- VS Code (recommended IDE)

### Quick Start (Windows)
```bash
# Run automated environment test
test-environment.bat

# If all tests pass, start development:
cd backend && npm install && node seedDatabase.js && npm run dev &
cd frontend && npm install && npm start
```

### Manual Setup Steps

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   node seedDatabase.js  # Populate sample data
   npm run dev          # Start API server
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start           # Start React app (http://localhost:3000)
   ```

3. **Android Build**
   ```bash
   cd frontend
   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/share
   npx cap init song-snippetly com.yourname.songsnippetly
   npx cap add android
   npm run build && npx cap sync && npx cap run android
   ```

### 📚 Documentation
- [`QUICK_START.md`](QUICK_START.md) - Essential commands
- [`TESTING_GUIDE.md`](TESTING_GUIDE.md) - Comprehensive testing
- [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) - Demo scenarios
- [`BUILD_GUIDE.md`](BUILD_GUIDE.md) - Detailed development guide

## 📱 Development Workflow
1. Develop React app in `frontend/`
2. Test backend APIs in `backend/`
3. Build with Capacitor for Android
4. Test on emulator/device

## 🎵 Demo Flow
1. User opens app
2. Selects mood (😊 Happy, 😢 Sad, ❤️ Love, 🎉 Party, 💪 Motivational)
3. App shows snippet card with lyrics + audio
4. User plays 30s preview with synced lyrics
5. Shares snippet to social apps

---
**Next Steps**: Follow the step-by-step guide to build each component!