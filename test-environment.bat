@echo off
REM 🎵 Song Snippetly - Windows Testing Script
REM This script runs comprehensive tests on your app for Windows

echo 🎵 Starting Song Snippetly Testing Suite...

set PASSED=0
set FAILED=0

echo.
echo ================================
echo 🔧 ENVIRONMENT CHECKS
echo ================================

REM Test 1: Check if Node.js is installed
echo Testing: Node.js Installation
node --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: Node.js is installed
    set /a PASSED+=1
) else (
    echo ❌ FAILED: Node.js not found
    set /a FAILED+=1
)

REM Test 2: Check if npm is available
echo Testing: npm Installation
npm --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: npm is available
    set /a PASSED+=1
) else (
    echo ❌ FAILED: npm not found
    set /a FAILED+=1
)

REM Test 3: Check backend dependencies
echo Testing: Backend Dependencies
cd backend
npm list express >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: Backend dependencies installed
    set /a PASSED+=1
) else (
    echo ❌ FAILED: Backend dependencies missing - run 'npm install' in backend folder
    set /a FAILED+=1
)
cd ..

REM Test 4: Check frontend dependencies
echo Testing: Frontend Dependencies
cd frontend
npm list react >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: Frontend dependencies installed
    set /a PASSED+=1
) else (
    echo ❌ FAILED: Frontend dependencies missing - run 'npm install' in frontend folder
    set /a FAILED+=1
)
cd ..

REM Test 5: Check if MongoDB is running
echo Testing: MongoDB Connection
mongosh --eval "db.runCommand({hello:1})" --quiet >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: MongoDB is accessible
    set /a PASSED+=1
) else (
    echo ⚠️  WARNING: MongoDB not accessible - make sure MongoDB is running
)

REM Test 6: Check Android environment
echo Testing: Android SDK
if defined ANDROID_HOME (
    echo ✅ PASSED: ANDROID_HOME is set
    set /a PASSED+=1
) else (
    echo ❌ FAILED: ANDROID_HOME not set - install Android Studio and set environment variable
    set /a FAILED+=1
)

REM Test 7: Check ADB
echo Testing: ADB (Android Debug Bridge)
adb version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: ADB is available
    set /a PASSED+=1
) else (
    echo ❌ FAILED: ADB not found - install Android SDK platform-tools
    set /a FAILED+=1
)

echo.
echo ================================
echo 🧪 FUNCTIONAL TESTS
echo ================================

REM Test 8: Build frontend
echo Testing: React App Build
cd frontend
call npm run build >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: React app builds successfully
    set /a PASSED+=1
) else (
    echo ❌ FAILED: React app build failed
    set /a FAILED+=1
)
cd ..

REM Test 9: Check Capacitor
echo Testing: Capacitor CLI
cd frontend
npx cap --version >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ PASSED: Capacitor CLI is available
    set /a PASSED+=1
) else (
    echo ❌ FAILED: Capacitor CLI not found - run 'npm install @capacitor/cli'
    set /a FAILED+=1
)
cd ..

REM Test 10: Check for Android devices
echo Testing: Connected Android Devices
adb devices | find "device" | find /c "device" >nul
if %ERRORLEVEL% == 0 (
    echo ✅ INFO: Android devices connected
) else (
    echo ⚠️  WARNING: No Android devices detected - connect device or start emulator for testing
)

echo.
echo ================================
echo 🎵 SONG SNIPPETLY TEST RESULTS
echo ================================
echo ✅ Passed: %PASSED% tests
echo ❌ Failed: %FAILED% tests
echo.

if %FAILED% == 0 (
    echo 🎉 All tests passed! Your environment is ready for Song Snippetly development.
    echo.
    echo 📋 Next steps:
    echo 1. Start MongoDB service
    echo 2. Open terminal: cd backend ^&^& npm run dev
    echo 3. Open new terminal: cd frontend ^&^& npm start
    echo 4. Build Android APK: cd frontend ^&^& npm run build ^&^& npx cap sync ^&^& npx cap run android
) else (
    echo ⚠️  Some tests failed. Please fix the issues above before proceeding.
    echo.
    echo 🔧 Common fixes:
    echo - Install Node.js from nodejs.org
    echo - Run 'npm install' in backend and frontend folders
    echo - Install MongoDB Community Server
    echo - Install Android Studio and set ANDROID_HOME
    echo - Connect Android device or start emulator
)

echo.
echo 📱 Ready to build your Song Snippetly app!
pause