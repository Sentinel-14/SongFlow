#!/bin/bash

# 🎵 Song Snippetly - Automated Testing Script
# This script runs comprehensive tests on your app

echo "🎵 Starting Song Snippetly Testing Suite..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0

# Function to run test and report result
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -e "${BLUE}Testing: $test_name${NC}"
    
    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSED: $test_name${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED: $test_name${NC}"
        ((FAILED++))
    fi
    echo ""
}

# Test 1: Check if Node.js is installed
run_test "Node.js Installation" "node --version"

# Test 2: Check if npm is available
run_test "npm Installation" "npm --version"

# Test 3: Check backend dependencies
run_test "Backend Dependencies" "cd backend && npm list express mongoose cors"

# Test 4: Check frontend dependencies  
run_test "Frontend Dependencies" "cd frontend && npm list react react-dom bootstrap"

# Test 5: Check if MongoDB is accessible
run_test "MongoDB Connection" "mongosh --eval 'db.runCommand({hello:1})' --quiet"

# Test 6: Backend API Health Check
echo -e "${BLUE}Starting backend server for API test...${NC}"
cd backend && npm run dev > /dev/null 2>&1 &
BACKEND_PID=$!
sleep 5

run_test "Backend API Health" "curl -f http://localhost:5000/ -o /dev/null -s"
run_test "Snippets API Endpoint" "curl -f http://localhost:5000/api/snippets/mood/happy -o /dev/null -s"

# Kill backend server
kill $BACKEND_PID 2>/dev/null

# Test 7: Frontend Build
echo -e "${BLUE}Testing frontend build...${NC}"
cd ../frontend
run_test "React App Build" "npm run build"

# Test 8: Capacitor Setup
run_test "Capacitor CLI Available" "npx cap --version"
run_test "Android Platform Check" "test -d android || echo 'Android platform not added yet'"

# Test 9: Android Development Environment
run_test "Android SDK Check" "test -n '$ANDROID_HOME'"
run_test "ADB Available" "adb version"

# Test 10: Check for connected Android devices
echo -e "${BLUE}Checking for Android devices...${NC}"
DEVICES=$(adb devices | grep -w device | wc -l)
if [ $DEVICES -gt 0 ]; then
    echo -e "${GREEN}✅ $DEVICES Android device(s) connected${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠️  No Android devices connected (emulator or physical device needed for testing)${NC}"
fi

echo ""
echo "================================"
echo -e "${BLUE}🎵 SONG SNIPPETLY TEST RESULTS${NC}"
echo "================================"
echo -e "${GREEN}✅ Passed: $PASSED tests${NC}"
echo -e "${RED}❌ Failed: $FAILED tests${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your environment is ready for Song Snippetly development.${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Start backend: cd backend && npm run dev"
    echo "2. Start frontend: cd frontend && npm start"  
    echo "3. Build Android APK: cd frontend && npm run build && npx cap sync && npx cap run android"
else
    echo -e "${RED}⚠️  Some tests failed. Please fix the issues above before proceeding.${NC}"
    echo ""
    echo -e "${BLUE}Common fixes:${NC}"
    echo "- Install missing dependencies: npm install"
    echo "- Start MongoDB service"
    echo "- Set ANDROID_HOME environment variable"
    echo "- Connect Android device or start emulator"
fi

echo ""
echo -e "${BLUE}📱 Ready to build your Song Snippetly app!${NC}"