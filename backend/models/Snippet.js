const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  mood: [{
    type: String,
    enum: ['happy', 'sad', 'love', 'party', 'motivational'],
    required: true
  }],
  lyricLines: [{
    type: String,
    required: true
  }],
  timings: [{
    type: Number, // Time in seconds when each lyric line should appear
    required: true
  }],
  audioPreviewUrl: {
    type: String,
    required: true // Spotify 30s preview URL
  },
  spotifyUrl: {
    type: String,
    required: true // Full Spotify track URL
  },
  coverImage: {
    type: String,
    required: true // Album/track cover image URL
  },
  duration: {
    type: Number,
    default: 30 // Preview duration in seconds
  },
  genre: {
    type: String,
    default: 'Pop'
  },
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster mood-based queries
snippetSchema.index({ mood: 1 });
snippetSchema.index({ popularity: -1 });

// Virtual for snippet preview (first 50 chars of first lyric)
snippetSchema.virtual('preview').get(function() {
  return this.lyricLines[0] ? this.lyricLines[0].substring(0, 50) + '...' : '';
});

// Method to get snippet by mood with random selection
snippetSchema.statics.getByMood = function(mood, limit = 10) {
  return this.aggregate([
    { $match: { mood: mood } },
    { $sample: { size: limit } }
  ]);
};

// Method to get random snippet
snippetSchema.statics.getRandom = function() {
  return this.aggregate([
    { $sample: { size: 1 } }
  ]);
};

module.exports = mongoose.model('Snippet', snippetSchema);