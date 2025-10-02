# 🧪 Testing & Deployment Guide

## Pre-Testing Checklist

### ✅ Environment Setup
- [ ] Node.js installed (v16+)
- [ ] MongoDB running (local or Atlas)
- [ ] Android Studio installed
- [ ] Android SDK (API 33+) installed
- [ ] Android device/emulator ready

### ✅ Dependencies Check
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies  
cd frontend && npm install

# Capacitor dependencies
cd frontend && npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/share
```

## 🔧 Testing Workflow

### 1. Test Backend API
```bash
cd backend
npm run dev

# Test endpoints:
curl http://localhost:5000/
curl http://localhost:5000/api/snippets/mood/happy
curl http://localhost:5000/api/snippets/random
```

### 2. Test Frontend Web App
```bash  
cd frontend
npm start

# Open browser: http://localhost:3000
# Test all moods and features
```

### 3. Build & Test Android APK

#### Initial Setup
```bash
cd frontend
npx cap init song-snippetly com.yourname.songsnippetly
npx cap add android
```

#### Build Process
```bash
# Build React app
npm run build

# Sync with Capacitor
npx cap sync

# Open in Android Studio
npx cap open android

# OR run directly on device/emulator
npx cap run android
```

## 📱 Testing Checklist

### Core Functionality
- [ ] App launches without crashes
- [ ] All 5 mood buttons work (😊😢❤️🎉💪)
- [ ] Snippets load for each mood
- [ ] Audio plays correctly
- [ ] Lyrics sync with audio timing
- [ ] Back navigation works
- [ ] Multiple snippets display per mood

### Mobile-Specific Features
- [ ] Touch interactions work smoothly
- [ ] Responsive design on different screen sizes
- [ ] App works in portrait/landscape modes
- [ ] No zoom issues on double-tap
- [ ] Native sharing works (WhatsApp, Telegram, etc.)
- [ ] App icon displays correctly
- [ ] Splash screen shows on launch

### Performance Tests
- [ ] App loads within 3 seconds
- [ ] Audio playback is smooth
- [ ] No memory leaks during use
- [ ] Smooth animations and transitions
- [ ] Network requests don't block UI

### Error Handling
- [ ] Graceful handling when backend is offline
- [ ] Error messages display properly
- [ ] App doesn't crash on network errors
- [ ] Loading states show during API calls

## 🔍 Debugging Tools

### Android Studio Logcat
```bash
# View app logs
adb logcat | grep -i "songsnippetly"

# View all logs
adb logcat
```

### Chrome DevTools (for web testing)
- Open Developer Tools (F12)
- Test in mobile view
- Check Network tab for API calls
- Monitor Console for errors

### Capacitor Debugging
```bash
# Debug on device
npx cap run android --external

# Live reload during development
npx cap run android --livereload --external
```

## 🚀 Production Deployment

### 1. Prepare for Production
```bash
# Update API URLs in frontend
# Set REACT_APP_API_URL=https://your-api-domain.com

# Build optimized version
cd frontend
npm run build
npx cap sync
```

### 2. Generate Signed APK
1. Open Android Studio
2. Build → Generate Signed Bundle / APK
3. Choose APK
4. Create new keystore or use existing
5. Build release APK

### 3. Testing Signed APK
```bash
# Install on device
adb install app-release.apk

# Check installation
adb shell pm list packages | grep songsnippetly
```

## 🐛 Common Issues & Solutions

### Issue: "Command failed: npx cap sync"
**Solution:** 
```bash
npx cap doctor
npm run build
npx cap sync --deployment
```

### Issue: App crashes on Android
**Solution:**
- Check logcat for errors
- Verify all plugins are properly installed
- Clear app data and reinstall

### Issue: Audio not playing
**Solution:**
- Check network permissions in AndroidManifest.xml
- Verify audio URLs are accessible
- Test with actual Spotify preview URLs

### Issue: Sharing not working
**Solution:**
```bash
# Reinstall share plugin
npm uninstall @capacitor/share
npm install @capacitor/share
npx cap sync
```

## 📊 Performance Optimization

### Bundle Size Optimization
```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### Audio Optimization
- Use compressed audio formats
- Implement audio caching
- Preload next snippet audio

### Network Optimization
- Implement API response caching
- Use service workers for offline functionality
- Compress images and assets

## ✅ Final Deployment Checklist

### Pre-Release
- [ ] All tests passing
- [ ] Performance meets requirements
- [ ] App icons and metadata correct
- [ ] Privacy policy and terms ready
- [ ] Backend deployed and stable

### Google Play Store Preparation
- [ ] Signed APK generated
- [ ] App screenshots prepared
- [ ] Store listing description written
- [ ] Privacy policy URL ready
- [ ] Age rating completed

### Post-Release Monitoring
- [ ] Crash reporting setup (Firebase Crashlytics)
- [ ] Analytics implementation
- [ ] User feedback collection
- [ ] Performance monitoring

---

## 🎯 Ready to Test!

Your Song Snippetly app is now ready for comprehensive testing. Follow this guide step-by-step to ensure everything works perfectly before release!