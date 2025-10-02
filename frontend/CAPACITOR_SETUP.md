# Song Snippetly - Capacitor Setup

## Additional Capacitor Dependencies

Add these to your frontend package.json:

```json
{
  "devDependencies": {
    "@capacitor/cli": "^5.4.0"
  },
  "dependencies": {
    "@capacitor/android": "^5.4.0",
    "@capacitor/core": "^5.4.0",
    "@capacitor/share": "^5.0.0",
    "@capacitor/filesystem": "^5.1.0",
    "@capacitor/preferences": "^5.0.0"
  }
}
```

## Capacitor Commands

### Initial Setup
```bash
# Initialize Capacitor
npx cap init song-snippetly com.yourname.songsnippetly

# Add Android platform
npx cap add android

# Install Capacitor plugins
npm install @capacitor/share @capacitor/filesystem @capacitor/preferences
```

### Development Workflow
```bash
# Build React app
npm run build

# Sync with Capacitor
npx cap sync

# Open Android Studio (for first time setup)
npx cap open android

# Run on Android device/emulator
npx cap run android
```

## Android Studio Setup

1. **Install Android Studio**
2. **Install Android SDK** (API level 33 or higher)
3. **Create AVD (Android Virtual Device)** for testing
4. **Connect physical device** with USB debugging enabled

## Troubleshooting

### Common Issues:
1. **ANDROID_HOME not set**: Add to your system PATH
2. **Gradle build failed**: Update Android SDK and build tools
3. **Device not detected**: Enable Developer Options and USB Debugging
4. **App crashes**: Check logcat in Android Studio

### Testing on Real Device:
1. Enable Developer Options
2. Enable USB Debugging
3. Connect via USB
4. Run `npx cap run android --target=<device-id>`

## Production Build
```bash
# Build for production
npm run build

# Sync
npx cap sync

# Generate signed APK in Android Studio
# Build > Generate Signed Bundle / APK
```