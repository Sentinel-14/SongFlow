# 📱 Song Snippetly - Android Development Commands

## 🚀 Quick Commands Reference

### Backend Setup
```bash
cd backend
npm install
npm run dev                    # Start development server
node seedDatabase.js          # Populate with sample data
```

### Frontend Development
```bash
cd frontend
npm install
npm start                     # Start React dev server (http://localhost:3000)
npm run build                 # Build for production
```

### Capacitor Android Commands
```bash
cd frontend

# Initial setup (run once)
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/share @capacitor/filesystem @capacitor/preferences
npx cap init song-snippetly com.yourname.songsnippetly
npx cap add android

# Development workflow (repeat as needed)
npm run build                 # Build React app
npx cap sync                  # Sync web assets to native project
npx cap run android          # Build and run on device/emulator

# Alternative: Open in Android Studio
npx cap open android         # Opens Android Studio for manual build
```

### Debugging Commands
```bash
# Check Capacitor setup
npx cap doctor

# Live reload on device (for development)
npx cap run android --livereload --external

# View device logs
adb logcat | grep -i "songsnippetly"

# List connected devices
adb devices

# Install APK manually
adb install path/to/your/app.apk
```

### Production Build Commands
```bash
# Build optimized React app
cd frontend
npm run build

# Sync to Capacitor
npx cap sync

# Open Android Studio for signed APK generation
npx cap open android
# Then: Build → Generate Signed Bundle / APK
```

## 🎯 Testing Commands

### API Testing
```bash
# Test backend endpoints
curl http://localhost:5000/
curl http://localhost:5000/api/snippets/mood/happy
curl http://localhost:5000/api/snippets/random
curl http://localhost:5000/api/snippets/moods/list
```

### Database Commands
```bash
cd backend
node seedDatabase.js          # Populate sample data
# Or connect to MongoDB directly:
mongosh song-snippetly
db.snippets.find()           # View all snippets
db.snippets.countDocuments() # Count total snippets
```

## 🔧 Troubleshooting Commands

### Clear Cache & Rebuild
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
npx cap sync
```

### Reset Capacitor
```bash
cd frontend
rm -rf android/
npx cap add android
npm run build
npx cap sync
```

### Check Android Environment
```bash
# Check ANDROID_HOME
echo $ANDROID_HOME

# Check Java version
java -version

# Check Gradle version
gradle --version

# List Android SDK packages
sdkmanager --list
```

## 📝 Development Workflow

### Daily Development Loop
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`
3. Make changes to React components
4. Test in browser first
5. Build and test on Android: `npm run build && npx cap sync && npx cap run android`

### Adding New Features
1. Update React components in `frontend/src/`
2. Update API endpoints in `backend/routes/`
3. Update database schema in `backend/models/` if needed
4. Test in browser
5. Build and test on Android

---

## ⚡ One-Command Setup

Run this to set up everything from scratch:

```bash
# Backend
cd backend && npm install && node seedDatabase.js && npm run dev &

# Frontend (in new terminal)
cd frontend && npm install && npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/share && npx cap init song-snippetly com.yourname.songsnippetly && npx cap add android && npm start
```

Your Song Snippetly app will be ready for development! 🎵