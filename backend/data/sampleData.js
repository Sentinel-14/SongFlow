// Sample data for testing the app
// In production, you'll populate this from Spotify API + Genius API

const sampleSnippets = [
  // Happy Songs
  {
    title: "Happy",
    artist: "Pharrell Williams",
    mood: ["happy", "party"],
    lyricLines: [
      "Because I'm happy",
      "Clap along if you feel like a room without a roof",
      "Because I'm happy"
    ],
    timings: [0, 3, 8],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-happy.mp3", // Replace with real Spotify preview
    spotifyUrl: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273e318ddb17b522c8d3e99bb94",
    duration: 30,
    genre: "Pop",
    popularity: 95
  },
  {
    title: "Good as Hell",
    artist: "Lizzo",
    mood: ["happy", "motivational"],
    lyricLines: [
      "I do my hair toss, check my nails",
      "Baby, how you feelin'?",
      "Feeling good as hell"
    ],
    timings: [0, 4, 7],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-good-as-hell.mp3",
    spotifyUrl: "https://open.spotify.com/track/1PckUlxKqWQs3RlWXVBLw7",
    coverImage: "https://i.scdn.co/image/ab67616d0000b27353378d63903677cf6d8b4e0b",
    duration: 30,
    genre: "Pop",
    popularity: 88
  },

  // Sad Songs
  {
    title: "Someone Like You",
    artist: "Adele",
    mood: ["sad", "love"],
    lyricLines: [
      "Never mind, I'll find someone like you",
      "I wish nothing but the best for you too",
      "Don't forget me, I beg"
    ],
    timings: [0, 5, 10],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-someone-like-you.mp3",
    spotifyUrl: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273372eb75617a40e87e0ebc5dc",
    duration: 30,
    genre: "Pop",
    popularity: 92
  },
  {
    title: "Hurt",
    artist: "Johnny Cash",
    mood: ["sad"],
    lyricLines: [
      "I hurt myself today",
      "To see if I still feel",
      "I focus on the pain"
    ],
    timings: [0, 4, 8],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-hurt.mp3",
    spotifyUrl: "https://open.spotify.com/track/2LHJcMHFtoAGjd9t2gp3zF",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273d065df4b012ec4903bbfadf9",
    duration: 30,
    genre: "Country",
    popularity: 85
  },

  // Love Songs
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    mood: ["love"],
    lyricLines: [
      "Baby, I'm dancing in the dark",
      "With you between my arms",
      "Barefoot on the grass"
    ],
    timings: [0, 3, 6],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-perfect.mp3",
    spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    duration: 30,
    genre: "Pop",
    popularity: 94
  },
  {
    title: "All of Me",
    artist: "John Legend",
    mood: ["love"],
    lyricLines: [
      "All of me loves all of you",
      "Love your curves and all your edges",
      "All your perfect imperfections"
    ],
    timings: [0, 4, 8],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-all-of-me.mp3",
    spotifyUrl: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI28yR",
    coverImage: "https://i.scdn.co/image/ab67616d0000b2733c65085dd9c2d03be4b29e6d",
    duration: 30,
    genre: "R&B",
    popularity: 89
  },

  // Party Songs
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    mood: ["party", "happy"],
    lyricLines: [
      "This hit, that ice cold",
      "Michelle Pfeiffer, that white gold",
      "This one for them hood girls"
    ],
    timings: [0, 3, 6],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-uptown-funk.mp3",
    spotifyUrl: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2",
    duration: 30,
    genre: "Funk",
    popularity: 96
  },
  {
    title: "Can't Stop the Feeling!",
    artist: "Justin Timberlake",
    mood: ["party", "happy"],
    lyricLines: [
      "I got that sunshine in my pocket",
      "Got that good soul in my feet",
      "I feel that hot blood in my body when it drops"
    ],
    timings: [0, 4, 8],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-cant-stop.mp3",
    spotifyUrl: "https://open.spotify.com/track/6kVPOeRuiOiJCHEWPH9RiP",
    coverImage: "https://i.scdn.co/image/ab67616d0000b273d6038452c0eb0e7ad8d8a4cb",
    duration: 30,
    genre: "Pop",
    popularity: 91
  },

  // Motivational Songs
  {
    title: "Stronger",
    artist: "Kelly Clarkson",
    mood: ["motivational", "happy"],
    lyricLines: [
      "What doesn't kill you makes you stronger",
      "Stand a little taller",
      "Doesn't mean I'm lonely when I'm alone"
    ],
    timings: [0, 3, 7],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-stronger.mp3",
    spotifyUrl: "https://open.spotify.com/track/0CzgapPKhTiDDFrMYOAP4h",
    coverImage: "https://i.scdn.co/image/ab67616d0000b2734dd6521f2cfe2c2ba2e14eb1",
    duration: 30,
    genre: "Pop",
    popularity: 87
  },
  {
    title: "Fight Song",
    artist: "Rachel Platten",
    mood: ["motivational"],
    lyricLines: [
      "This is my fight song",
      "Take back my life song",
      "Prove I'm alright song"
    ],
    timings: [0, 3, 6],
    audioPreviewUrl: "https://p.scdn.co/mp3-preview/sample-fight-song.mp3",
    spotifyUrl: "https://open.spotify.com/track/7vx2mBYSK0GQGW6hRdm9Km",
    coverImage: "https://i.scdn.co/image/ab67616d0000b2731b55ff31b8de5f5ad6c9c3cb",
    duration: 30,
    genre: "Pop",
    popularity: 84
  }
];

module.exports = sampleSnippets;