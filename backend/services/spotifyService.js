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
      
      // Refresh token before it expires (refresh 1 minute early)
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
      happy: 'genre:pop mood:happy energy:0.7..1.0 danceability:0.6..1.0',
      sad: 'genre:pop mood:sad energy:0.0..0.4 valence:0.0..0.3',
      love: 'genre:pop mood:romantic love "love song" valence:0.4..0.8',
      party: 'genre:dance genre:electronic genre:hip-hop energy:0.8..1.0 danceability:0.7..1.0',
      motivational: 'genre:pop workout motivation energy:0.7..1.0 "pump up" "motivation"'
    };

    try {
      const searchQuery = moodQueries[mood] || `mood:${mood}`;
      const data = await this.spotifyApi.searchTracks(searchQuery, { 
        limit,
        market: 'US' // Ensures we get preview URLs
      });
      
      return data.body.tracks.items
        .filter(track => track.preview_url) // Only include tracks with previews
        .map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          coverImage: track.album.images[0]?.url || track.album.images[1]?.url,
          previewUrl: track.preview_url,
          spotifyUrl: track.external_urls.spotify,
          duration: Math.floor(track.duration_ms / 1000),
          popularity: track.popularity,
          mood: [mood], // Add mood tag
          // Generate simple lyric placeholder for demo
          lyricLines: this.generateLyricPlaceholder(track.name, track.artists[0].name),
          timings: [0, 5, 10, 15, 20, 25] // Default timing for 6 lines
        }));
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
    }
  }

  generateLyricPlaceholder(title, artist) {
    // Generate demo lyrics that comply with fair use
    const templates = [
      [
        `♫ ${title} ♫`,
        `by ${artist}`,
        "🎵 Music brings us together",
        "🎶 Feel the rhythm flow",
        "✨ Let the melody guide you",
        "🎵 This is just a preview..."
      ],
      [
        `🎵 "${title}"`,
        `Artist: ${artist}`,
        "🎶 Every song tells a story",
        "✨ Music speaks what words cannot",
        "🎵 Feel the beat in your heart",
        "🎶 Preview available on Spotify"
      ],
      [
        `♫ Now playing: ${title}`,
        `🎤 ${artist}`,
        "🎵 Music is the universal language",
        "🎶 Let the sound take you away",
        "✨ Experience the full song",
        "🎵 Listen on Spotify for more"
      ]
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
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
        coverImage: track.album.images[0]?.url || track.album.images[1]?.url,
        previewUrl: track.preview_url,
        spotifyUrl: track.external_urls.spotify,
        duration: Math.floor(track.duration_ms / 1000),
        popularity: track.popularity,
        lyricLines: this.generateLyricPlaceholder(track.name, track.artists[0].name),
        timings: [0, 5, 10, 15, 20, 25]
      };
    } catch (error) {
      console.error('Error getting track details:', error);
      throw error;
    }
  }

  async getRecommendationsByMood(mood, limit = 10) {
    const seedGenres = {
      happy: ['pop', 'dance', 'funk'],
      sad: ['indie', 'alternative', 'acoustic'],
      love: ['pop', 'r-n-b', 'soul'],
      party: ['dance', 'electronic', 'hip-hop'],
      motivational: ['pop', 'rock', 'hip-hop']
    };

    const audioFeatures = {
      happy: { valence: 0.8, energy: 0.7, danceability: 0.6 },
      sad: { valence: 0.2, energy: 0.3, acousticness: 0.5 },
      love: { valence: 0.6, energy: 0.5, acousticness: 0.3 },
      party: { valence: 0.8, energy: 0.9, danceability: 0.8 },
      motivational: { valence: 0.7, energy: 0.8, danceability: 0.5 }
    };

    try {
      const genres = seedGenres[mood] || ['pop'];
      const features = audioFeatures[mood] || {};
      
      const data = await this.spotifyApi.getRecommendations({
        seed_genres: genres,
        limit,
        market: 'US',
        ...features
      });

      return data.body.tracks
        .filter(track => track.preview_url)
        .map(track => ({
          id: track.id,
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          coverImage: track.album.images[0]?.url || track.album.images[1]?.url,
          previewUrl: track.preview_url,
          spotifyUrl: track.external_urls.spotify,
          duration: Math.floor(track.duration_ms / 1000),
          popularity: track.popularity,
          mood: [mood],
          lyricLines: this.generateLyricPlaceholder(track.name, track.artists[0].name),
          timings: [0, 5, 10, 15, 20, 25]
        }));
    } catch (error) {
      console.error('Error getting Spotify recommendations:', error);
      throw error;
    }
  }

  // Health check method
  async checkConnection() {
    try {
      await this.spotifyApi.getMe();
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new SpotifyService();