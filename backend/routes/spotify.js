const express = require('express');
const router = express.Router();
const spotifyService = require('../services/spotifyService');

// GET /api/spotify/search/:mood - Search tracks by mood using Spotify API
router.get('/search/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    // Validate mood
    const validMoods = ['happy', 'sad', 'love', 'party', 'motivational'];
    if (!validMoods.includes(mood.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid mood. Valid moods: ${validMoods.join(', ')}`
      });
    }
    
    const tracks = await spotifyService.searchTrackByMood(mood.toLowerCase(), limit);
    
    res.json({
      success: true,
      mood: mood.toLowerCase(),
      count: tracks.length,
      data: tracks,
      source: 'spotify'
    });
  } catch (error) {
    console.error('Spotify search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search Spotify tracks',
      details: error.message
    });
  }
});

// GET /api/spotify/recommendations/:mood - Get Spotify recommendations by mood
router.get('/recommendations/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const validMoods = ['happy', 'sad', 'love', 'party', 'motivational'];
    if (!validMoods.includes(mood.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: `Invalid mood. Valid moods: ${validMoods.join(', ')}`
      });
    }
    
    const tracks = await spotifyService.getRecommendationsByMood(mood.toLowerCase(), limit);
    
    res.json({
      success: true,
      mood: mood.toLowerCase(),
      count: tracks.length,
      data: tracks,
      source: 'spotify_recommendations'
    });
  } catch (error) {
    console.error('Spotify recommendations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get Spotify recommendations',
      details: error.message
    });
  }
});

// GET /api/spotify/track/:id - Get specific track details
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Track ID is required'
      });
    }
    
    const track = await spotifyService.getTrackDetails(id);
    
    res.json({
      success: true,
      data: track,
      source: 'spotify'
    });
  } catch (error) {
    console.error('Spotify track error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get track details',
      details: error.message
    });
  }
});

// GET /api/spotify/health - Health check for Spotify API
router.get('/health', async (req, res) => {
  try {
    const isConnected = await spotifyService.checkConnection();
    
    res.json({
      success: true,
      connected: isConnected,
      message: isConnected ? 'Spotify API is connected' : 'Spotify API connection failed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Spotify health check error:', error);
    res.status(500).json({
      success: false,
      connected: false,
      error: 'Health check failed',
      details: error.message
    });
  }
});

// GET /api/spotify/moods - Get available moods with descriptions
router.get('/moods', (req, res) => {
  const moods = [
    { 
      name: 'happy', 
      emoji: '😊', 
      description: 'Upbeat and joyful songs that lift your spirits',
      searchTerms: ['pop', 'dance', 'funk', 'uplifting']
    },
    { 
      name: 'sad', 
      emoji: '😢', 
      description: 'Melancholic and emotional songs for reflection',
      searchTerms: ['indie', 'alternative', 'acoustic', 'melancholy']
    },
    { 
      name: 'love', 
      emoji: '❤️', 
      description: 'Romantic and heartfelt songs about love',
      searchTerms: ['romantic', 'r&b', 'soul', 'ballad']
    },
    { 
      name: 'party', 
      emoji: '🎉', 
      description: 'Energetic and dance-worthy songs for celebration',
      searchTerms: ['dance', 'electronic', 'hip-hop', 'party']
    },
    { 
      name: 'motivational', 
      emoji: '💪', 
      description: 'Inspiring and empowering songs to boost motivation',
      searchTerms: ['rock', 'hip-hop', 'workout', 'inspirational']
    }
  ];
  
  res.json({
    success: true,
    data: moods,
    source: 'spotify_moods'
  });
});

module.exports = router;