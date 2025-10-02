# 🎵 Song Snippetly - Complete Build Guide

## Step-by-Step Development Process

### Phase 1: Backend Setup (Node.js + Express + MongoDB)

#### 1.1 Initialize Backend
```bash
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install -D nodemon
```

#### 1.2 Create Server Structure
- `server.js` - Main Express server
- `models/` - MongoDB schemas
- `routes/` - API endpoints
- `data/` - Sample snippet data

#### 1.3 Sample API Endpoints
- `GET /api/snippets/mood/:mood` - Get snippets by mood
- `GET /api/snippets/random` - Random snippet
- `POST /api/snippets` - Add new snippet (admin)

### Phase 2: Frontend Setup (React + Bootstrap)

#### 2.1 Create React App
```bash
cd frontend
npx create-react-app .
npm install bootstrap react-bootstrap axios
```

#### 2.2 Key Components
- `MoodSelector.js` - Mood buttons (😊😢❤️🎉💪)
- `SnippetCard.js` - Display lyric + audio player
- `AudioPlayer.js` - Custom audio with lyric sync
- `ShareButton.js` - Social sharing functionality

#### 2.3 Mobile-First Design
- Bootstrap responsive grid
- Touch-friendly buttons
- Swipe gestures for snippets

### Phase 3: Audio & Lyric Sync

#### 3.1 HTML5 Audio Implementation
```javascript
const audio = new Audio(snippetUrl);
const lyrics = ["Line 1", "Line 2", "Line 3"];
const timings = [0, 5, 10]; // seconds

audio.ontimeupdate = () => {
  // Update lyric display based on current time
};
```

#### 3.2 Lyric Animation
- Fade in/out effects
- Highlight current line
- Smooth transitions

### Phase 4: Capacitor Android Setup

#### 4.1 Install Capacitor
```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init song-snippetly com.yourname.songsnippetly
```

#### 4.2 Add Android Platform
```bash
npx cap add android
npx cap sync
```

#### 4.3 Required Plugins
```bash
npm install @capacitor/share @capacitor/filesystem @capacitor/preferences
```

### Phase 5: Database Schema & Sample Data

#### 5.1 MongoDB Collection: `snippets`
```javascript
{
  _id: ObjectId,
  title: "Song Title",
  artist: "Artist Name",
  mood: ["happy", "love"],
  lyricLines: ["Line 1", "Line 2", "Line 3"],
  timings: [0, 5, 10],
  audioPreviewUrl: "https://spotify-preview.mp3",
  spotifyUrl: "https://open.spotify.com/track/...",
  coverImage: "https://image-url.jpg",
  duration: 30
}
```

### Phase 6: Deployment & Testing

#### 6.1 Build Commands
```bash
# Build React app
cd frontend
npm run build

# Sync with Capacitor
npx cap sync

# Build Android APK
npx cap run android
```

#### 6.2 Testing Checklist
- [ ] Mood selection works
- [ ] Audio playback functions
- [ ] Lyrics sync properly
- [ ] Sharing to WhatsApp/Telegram
- [ ] Responsive on different screen sizes
- [ ] Offline caching (optional)

## 🔧 Development Tools Needed

### Required Software
1. **VS Code** - Main development IDE
2. **Node.js** (v16+) - Runtime for backend
3. **MongoDB** - Database (local or Atlas)
4. **Android Studio** - Android SDK + Emulator
5. **Chrome** - Testing & debugging

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Thunder Client (API testing)
- MongoDB for VS Code
- Android iOS Emulator

### Optional Tools
- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **Spotify Developer Dashboard** - API keys

## 🎯 MVP Features Priority

### Must Have (Week 1)
1. ✅ Basic mood selection (5 moods)
2. ✅ Display snippet with audio
3. ✅ Play 30s preview
4. ✅ Simple lyric display
5. ✅ Generate Android APK

### Nice to Have (Week 2)
1. 🔄 Lyric-audio synchronization
2. 🔄 Share to social apps
3. 🔄 Smooth animations
4. 🔄 Offline caching
5. 🔄 User favorites

### Future Enhancements
1. 🚀 Voice mood detection
2. 🚀 Multi-language support
3. 🚀 Personal playlists
4. 🚀 AR lyric overlay
5. 🚀 Social features

---

**Ready to start coding?** Let's begin with the backend setup!