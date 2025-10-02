# 🚀 SongFlow Deployment Guide - Vercel

## Prerequisites
1. GitHub account
2. Vercel account (free): https://vercel.com
3. Your SongFlow project ready

## Step 1: Prepare for Deployment

### A. Create vercel.json for backend API routes
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/build/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ],
  "functions": {
    "backend/server.js": {
      "includeFiles": "backend/**"
    }
  }
}
```

### B. Update package.json scripts
Frontend package.json needs build script:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "start": "react-scripts start"
  }
}
```

Backend package.json needs start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

## Step 2: Repository Setup

1. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository: `songflow-app`
   - Make it public
   - Don't initialize with README (we have existing code)

2. **Push Your Code**
   ```bash
   cd C:\Users\ASUS\Downloads\Documents\dream\song-snippetly
   git init
   git add .
   git commit -m "Initial SongFlow app commit"
   git remote add origin https://github.com/yourusername/songflow-app.git
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. **Sign up at Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your `songflow-app` repository
   - Configure:
     - Framework: Create React App
     - Root Directory: `/` (leave default)
     - Build Command: `cd frontend && npm run build`
     - Output Directory: `frontend/build`
     - Install Command: `cd frontend && npm install && cd ../backend && npm install`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-cluster/songflow
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=https://your-app.vercel.app/callback
   ```

## Step 4: Your Secure URLs

After deployment, you'll get:
- **Frontend:** `https://songflow-app-yourusername.vercel.app`
- **Backend API:** `https://songflow-app-yourusername.vercel.app/api`

## Step 5: Spotify Configuration

Use these URLs in your Spotify app:
- **Website:** `https://songflow-app-yourusername.vercel.app`
- **Redirect URI:** `https://songflow-app-yourusername.vercel.app/callback`

## Alternative: Quick Deploy with Railway

If Vercel seems complex, Railway is simpler:

1. Go to https://railway.app
2. Connect GitHub repository
3. Deploy both services (frontend + backend)
4. Get secure URLs automatically

## Next Steps

1. Choose deployment platform
2. Create GitHub repository
3. Push code and deploy
4. Get secure HTTPS URLs
5. Configure Spotify API with secure URLs
6. Test the deployed app

Would you like to proceed with Vercel or try Railway instead?