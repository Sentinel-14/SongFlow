const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// GET /api/snippets - Get all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find()
      .sort({ popularity: -1, createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      count: snippets.length,
      data: snippets
    });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching snippets'
    });
  }
});

// GET /api/snippets/mood/:mood - Get snippets by mood
router.get('/mood/:mood', async (req, res) => {
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
    
    const snippets = await Snippet.getByMood(mood.toLowerCase(), limit);
    
    if (snippets.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No snippets found for mood: ${mood}`
      });
    }
    
    res.json({
      success: true,
      mood: mood.toLowerCase(),
      count: snippets.length,
      data: snippets
    });
  } catch (error) {
    console.error('Error fetching snippets by mood:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching snippets by mood'
    });
  }
});

// GET /api/snippets/random - Get random snippet
router.get('/random', async (req, res) => {
  try {
    const snippet = await Snippet.getRandom();
    
    if (snippet.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No snippets found'
      });
    }
    
    res.json({
      success: true,
      data: snippet[0]
    });
  } catch (error) {
    console.error('Error fetching random snippet:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching random snippet'
    });
  }
});

// GET /api/snippets/:id - Get specific snippet by ID
router.get('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    
    if (!snippet) {
      return res.status(404).json({
        success: false,
        error: 'Snippet not found'
      });
    }
    
    res.json({
      success: true,
      data: snippet
    });
  } catch (error) {
    console.error('Error fetching snippet by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching snippet'
    });
  }
});

// POST /api/snippets - Create new snippet (for development/admin)
router.post('/', async (req, res) => {
  try {
    const {
      title,
      artist,
      mood,
      lyricLines,
      timings,
      audioPreviewUrl,
      spotifyUrl,
      coverImage,
      duration,
      genre,
      popularity
    } = req.body;
    
    // Validation
    if (!title || !artist || !mood || !lyricLines || !timings || !audioPreviewUrl || !spotifyUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, artist, mood, lyricLines, timings, audioPreviewUrl, spotifyUrl'
      });
    }
    
    if (lyricLines.length !== timings.length) {
      return res.status(400).json({
        success: false,
        error: 'lyricLines and timings arrays must have the same length'
      });
    }
    
    const newSnippet = new Snippet({
      title,
      artist,
      mood,
      lyricLines,
      timings,
      audioPreviewUrl,
      spotifyUrl,
      coverImage: coverImage || 'https://via.placeholder.com/300x300?text=No+Cover',
      duration: duration || 30,
      genre: genre || 'Pop',
      popularity: popularity || 0
    });
    
    const savedSnippet = await newSnippet.save();
    
    res.status(201).json({
      success: true,
      message: 'Snippet created successfully',
      data: savedSnippet
    });
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating snippet'
    });
  }
});

// GET /api/snippets/moods/list - Get available moods
router.get('/moods/list', (req, res) => {
  const moods = [
    { name: 'happy', emoji: '😊', description: 'Upbeat and joyful songs' },
    { name: 'sad', emoji: '😢', description: 'Melancholic and emotional songs' },
    { name: 'love', emoji: '❤️', description: 'Romantic and heartfelt songs' },
    { name: 'party', emoji: '🎉', description: 'Energetic and dance-worthy songs' },
    { name: 'motivational', emoji: '💪', description: 'Inspiring and empowering songs' }
  ];
  
  res.json({
    success: true,
    data: moods
  });
});

module.exports = router;