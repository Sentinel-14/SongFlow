# 🚀 Quick Start Commands

## 1. Backend Setup
```bash
cd backend
npm install
# Start MongoDB locally or update .env with MongoDB Atlas URL
npm run dev
# In another terminal, seed the database:
node seedDatabase.js
```

## 2. Frontend Setup  
```bash
cd frontend
npm install
npm start
```

## 3. Capacitor Android Setup
```bash
cd frontend
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/share @capacitor/filesystem @capacitor/preferences
npx cap init song-snippetly com.yourname.songsnippetly
npx cap add android
npm run build
npx cap sync
npx cap run android
```

## 4. Development Workflow
1. Make changes to React app
2. Run `npm run build` 
3. Run `npx cap sync`
4. Run `npx cap run android` to test on emulator/device

## 5. Testing URLs
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- API Test: http://localhost:5000/api/snippets/mood/happy

---

Your Song Snippetly app is ready! 🎵