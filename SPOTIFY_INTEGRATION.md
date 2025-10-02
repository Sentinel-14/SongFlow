# 🎵 Spotify API Integration Guide

## 1. Setup Spotify Developer Account

### Step 1: Create Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in details:
   - **App Name**: Song Snippetly
   - **App Description**: Mood-based song snippet sharing app
   - **Website**: https://your-domain.com (or localhost for testing)
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
   - **APIs Used**: Web API

### Step 2: Get Credentials
```bash
# After creating the app, you'll get:
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
```

## 2. Update Backend for Spotify Integration

### Install Spotify Web API SDK
```bash
cd backend
npm install spotify-web-api-node axios
```

### Update .env file
```bash
# Add to backend/.env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```

### Create Spotify Service
```javascript
// backend/services/spotifyService.js
const SpotifyWebApi = require('spotify-web-api-node');

class SpotifyService {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });
    
    this.initializeClientCredentials();
  }

  async initializeClientCredentials() {
    try {
      const data = await this.spotifyApi.clientCredentialsGrant();
      this.spotifyApi.setAccessToken(data.body['access_token']);
      
      // Refresh token before it expires
      setTimeout(() => {
        this.initializeClientCredentials();
      }, (data.body['expires_in'] - 60) * 1000);
      
      console.log('✅ Spotify API connected successfully');
    } catch (error) {
      console.error('❌ Spotify API connection failed:', error);
    }
  }

  async searchTrackByMood(mood, limit = 10) {
    const moodQueries = {
      happy: 'genre:pop mood:happy energy:0.7..1.0',
      sad: 'genre:pop mood:sad energy:0.0..0.4',
      love: 'genre:pop mood:romantic love',
      party: 'genre:dance genre:electronic energy:0.8..1.0',
      motivational: 'genre:pop workout motivation energy:0.7..1.0'
    };

    try {
      const searchQuery = moodQueries[mood] || `mood:${mood}`;
      const data = await this.spotifyApi.searchTracks(searchQuery, { limit });
      
      return data.body.tracks.items.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        coverImage: track.album.images[0]?.url,
        previewUrl: track.preview_url,
        spotifyUrl: track.external_urls.spotify,
        duration: Math.floor(track.duration_ms / 1000),
        popularity: track.popularity
      }));
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
    }
  }

  async getTrackDetails(trackId) {
    try {
      const data = await this.spotifyApi.getTrack(trackId);
      const track = data.body;
      
      return {
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        coverImage: track.album.images[0]?.url,
        previewUrl: track.preview_url,
        spotifyUrl: track.external_urls.spotify,
        duration: Math.floor(track.duration_ms / 1000),
        popularity: track.popularity
      };
    } catch (error) {
      console.error('Error getting track details:', error);
      throw error;
    }
  }
}

module.exports = new SpotifyService();
```

### Update Routes to Use Spotify
```javascript
// backend/routes/spotify.js
const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');

// GET /api/spotify/search/:mood
router.get('/search/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const tracks = await spotifyService.searchTrackByMood(mood, limit);
    
    res.json({
      success: true,
      mood,
      count: tracks.length,
      data: tracks
    });
  } catch (error) {
    console.error('Spotify search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search Spotify tracks'
    });
  }
});

// GET /api/spotify/track/:id
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const track = await spotifyService.getTrackDetails(id);
    
    res.json({
      success: true,
      data: track
    });
  } catch (error) {
    console.error('Spotify track error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get track details'
    });
  }
});

module.exports = router;
```

### Update Main Server
```javascript
// Add to backend/server.js
app.use('/api/spotify', require('./routes/spotify'));
```

## 3. Update Frontend for Real Spotify Data

### Update API Service
```javascript
// frontend/src/services/api.js - Add these functions

export const fetchSpotifyTracksByMood = async (mood, limit = 10) => {
  try {
    const response = await api.get(`/spotify/search/${mood}?limit=${limit}`);
    return response;
  } catch (error) {
    console.error(`Error fetching Spotify ${mood} tracks:`, error);
    throw error;
  }
};

export const fetchSpotifyTrackById = async (trackId) => {
  try {
    const response = await api.get(`/spotify/track/${trackId}`);
    return response;
  } catch (error) {
    console.error(`Error fetching Spotify track ${trackId}:`, error);
    throw error;
  }
};
```

### Update App to Use Spotify Data
```javascript
// frontend/src/App.js - Update loadSnippets function

const loadSnippets = async (mood) => {
  setLoading(true);
  setError(null);
  
  try {
    // Try Spotify first, fallback to local data
    let data;
    try {
      data = await fetchSpotifyTracksByMood(mood, 5);
      // Transform Spotify data to our snippet format
      const spotifySnippets = data.data.map(track => ({
        _id: track.id,
        title: track.title,
        artist: track.artist,
        mood: [mood],
        lyricLines: [
          `♫ ${track.title} ♫`,
          `by ${track.artist}`,
          "🎵 Preview available on Spotify"
        ],
        timings: [0, 3, 6],
        audioPreviewUrl: track.previewUrl,
        spotifyUrl: track.spotifyUrl,
        coverImage: track.coverImage || 'https://via.placeholder.com/300x300?text=No+Cover',
        duration: 30,
        popularity: track.popularity || 0
      }));
      
      setSnippets(spotifySnippets);
    } catch (spotifyError) {
      console.log('Spotify API failed, using local data:', spotifyError);
      // Fallback to local snippet data
      data = await fetchSnippetsByMood(mood);
      setSnippets(data.data || []);
    }
    
    // Auto-select first snippet
    if (snippets.length > 0) {
      setCurrentSnippet(snippets[0]);
    }
  } catch (err) {
    setError('Failed to load snippets. Please try again.');
    console.error('Error loading snippets:', err);
  } finally {
    setLoading(false);
  }
};
```

## 4. Legal Compliance for Testing

### Safe Testing Practices
```javascript
// Add disclaimer component
// frontend/src/components/DisclaimerBanner.js

import React from 'react';
import { Alert } from 'react-bootstrap';

const DisclaimerBanner = () => {
  return (
    <Alert variant="info" className="mb-3" style={{ fontSize: '0.9rem' }}>
      <Alert.Heading className="h6">
        <i className="fas fa-info-circle me-2"></i>
        Demo Version
      </Alert.Heading>
      <p className="mb-0">
        This is a prototype for testing purposes only. 
        Music previews provided by Spotify API. 
        Not for commercial distribution.
      </p>
    </Alert>
  );
};

export default DisclaimerBanner;
```

## 5. Testing Commands

### Start Development with Spotify
```bash
# Backend with Spotify API
cd backend
npm install spotify-web-api-node
npm run dev

# Test Spotify endpoints
curl "http://localhost:5000/api/spotify/search/happy"
curl "http://localhost:5000/api/spotify/track/TRACK_ID"

# Frontend
cd frontend
npm start
```

## 6. Next Steps - Firebase App Distribution

Once Spotify integration is working:

1. **Build APK**: `npm run build && npx cap sync && npx cap build android`
2. **Setup Firebase**: Create project at console.firebase.google.com
3. **Upload APK**: Use Firebase App Distribution
4. **Invite Testers**: Add email addresses for beta testing

---

## 🎯 Ready to Implement

This setup gives you:
- ✅ **Real Spotify previews** (30-second clips)
- ✅ **Legal compliance** for testing
- ✅ **Fallback to local data** if Spotify fails
- ✅ **Professional music discovery**
- ✅ **Safe testing environment**

Would you like me to create the **Firebase App Distribution** guide next, or help you implement any specific part of the Spotify integration?