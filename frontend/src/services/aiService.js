// AI Service for chat analysis and response generation
// This simulates the AI analysis until real NLP integration

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock AI Analysis Function
export const analyzeChatMessage = async (message, language = 'auto') => {
  // Simulate API delay
  await sleep(1500 + Math.random() * 1000);

  // Simple keyword-based analysis for demo
  const lowerMessage = message.toLowerCase();
  
  // Language detection
  const hasHindi = /[\u0900-\u097F]/.test(message);
  const hasEnglish = /[a-zA-Z]/.test(message);
  const detectedLanguage = language === 'auto' ? 
    (hasHindi && hasEnglish ? 'hinglish' : hasHindi ? 'hindi' : 'english') : 
    language;

  // Mood analysis
  let mood = 'neutral';
  let sentiment = 'neutral';
  
  if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('😊') || lowerMessage.includes('🎉')) {
    mood = 'happy';
    sentiment = 'positive';
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('disappointed') || lowerMessage.includes('😢')) {
    mood = 'sad';
    sentiment = 'negative';
  } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('😡')) {
    mood = 'angry';
    sentiment = 'negative';
  } else if (lowerMessage.includes('love') || lowerMessage.includes('❤️') || lowerMessage.includes('romantic')) {
    mood = 'romantic';
    sentiment = 'positive';
  } else if (lowerMessage.includes('work') || lowerMessage.includes('meeting') || lowerMessage.includes('professional')) {
    mood = 'professional';
    sentiment = 'neutral';
  }

  // Tone analysis
  let tone = 'casual';
  if (lowerMessage.includes('please') || lowerMessage.includes('thank you') || lowerMessage.includes('sir') || lowerMessage.includes('madam')) {
    tone = 'formal';
  } else if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('immediately')) {
    tone = 'urgent';
  } else if (lowerMessage.includes('hey') || lowerMessage.includes('bro') || lowerMessage.includes('dude')) {
    tone = 'friendly';
  }

  // Extract keywords
  const commonWords = ['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was', 'but', 'or', 'have', 'from', 'this', 'that', 'will', 'can', 'would', 'could', 'should'];
  const keywords = message
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5);

  // Generate emotions array
  const emotions = [];
  if (sentiment === 'positive') {
    emotions.push({ name: 'joy', score: 0.8 }, { name: 'excitement', score: 0.6 });
  } else if (sentiment === 'negative') {
    emotions.push({ name: 'sadness', score: 0.7 }, { name: 'frustration', score: 0.5 });
  } else {
    emotions.push({ name: 'neutral', score: 0.9 });
  }

  // Context analysis
  const context = {
    type: mood === 'professional' ? 'business' : mood === 'romantic' ? 'personal' : 'casual',
    relationship: tone === 'formal' ? 'professional' : tone === 'friendly' ? 'close friend' : 'acquaintance',
    urgency: tone === 'urgent' ? 'high' : 'normal'
  };

  // Generate response hints
  const responseHints = [
    `The message shows ${mood} mood, consider responding with ${sentiment} energy`,
    `Detected ${detectedLanguage} language mixing, maintain similar language style`,
    `Conversation appears ${tone}, match the formality level`,
    keywords.length > 0 ? `Key topics: ${keywords.join(', ')} - address these in your response` : null
  ].filter(Boolean);

  return {
    mood,
    sentiment,
    language: detectedLanguage,
    tone,
    emotions,
    keywords,
    confidence: Math.random() * 0.4 + 0.6, // Random confidence between 0.6-1.0
    context,
    responseHints
  };
};

// Mock Response Generation Function
export const generateResponses = async (analysis, chatMessage) => {
  // Simulate API delay
  await sleep(2000 + Math.random() * 1000);

  const responses = [];
  const { mood, sentiment, language, tone } = analysis;

  // Generate text responses
  const textResponses = getTextResponses(mood, sentiment, tone, language);
  responses.push(...textResponses.map((text, index) => ({
    id: `text_${index}`,
    type: 'text',
    text,
    language,
    confidence: Math.random() * 0.3 + 0.7,
    context: `Perfect for ${mood} conversations`
  })));

  // Generate song suggestions
  const songResponses = getSongResponses(mood, sentiment);
  responses.push(...songResponses.map((song, index) => ({
    id: `song_${index}`,
    type: 'song',
    title: song.title,
    artist: song.artist,
    text: song.lyrics,
    lyrics: song.lyrics,
    coverImage: song.coverImage,
    spotifyUrl: song.spotifyUrl,
    language,
    confidence: Math.random() * 0.2 + 0.8,
    context: `Matches the ${mood} vibe perfectly`
  })));

  // Generate poetry responses
  if (mood === 'romantic' || mood === 'sad' || sentiment === 'positive') {
    const poetryResponses = getPoetryResponses(mood, language);
    responses.push(...poetryResponses.map((poetry, index) => ({
      id: `poetry_${index}`,
      type: 'poetry',
      text: poetry.text,
      author: poetry.author,
      language,
      confidence: Math.random() * 0.25 + 0.75,
      context: `Beautiful ${mood} poetry to express feelings`
    })));
  }

  // Generate taglines/one-liners
  const taglineResponses = getTaglineResponses(mood, language);
  responses.push(...taglineResponses.map((tagline, index) => ({
    id: `tagline_${index}`,
    type: 'tagline',
    text: tagline,
    language,
    confidence: Math.random() * 0.3 + 0.7,
    context: `Short and impactful for ${mood} moments`
  })));

  return responses.slice(0, 8); // Limit to 8 responses
};

// Helper functions for generating different types of responses

const getTextResponses = (mood, sentiment, tone, language) => {
  const responses = {
    english: {
      happy: [
        "That's amazing! I'm so happy for you! 🎉",
        "Wow, that sounds incredible! Tell me more!",
        "Your happiness is contagious! 😊"
      ],
      sad: [
        "I'm sorry to hear that. I'm here if you need to talk.",
        "That sounds really tough. Sending you lots of love ❤️",
        "Take your time to feel better. You're not alone in this."
      ],
      angry: [
        "I can understand why you'd feel that way.",
        "That does sound frustrating. Want to talk about it?",
        "Take a deep breath. We'll figure this out together."
      ],
      romantic: [
        "That's so sweet! You two are perfect together ❤️",
        "Love is in the air! 💕",
        "Aww, that made my heart flutter! 🦋"
      ],
      professional: [
        "Thank you for the update. I'll review this shortly.",
        "I appreciate your professional approach to this matter.",
        "Let's schedule a meeting to discuss this further."
      ],
      neutral: [
        "Thanks for sharing that with me.",
        "I see what you mean.",
        "That's interesting. What do you think about it?"
      ]
    },
    hindi: {
      happy: [
        "वाह! यह तो बहुत खुशी की बात है! 🎉",
        "बहुत बढ़िया! मुझे बहुत खुशी हुई।",
        "आपकी खुशी देखकर मेरा भी दिल खुश हो गया! 😊"
      ],
      sad: [
        "यह सुनकर बहुत दुख हुआ। मैं आपके साथ हूं।",
        "बहुत कठिन समय है। हिम्मत रखिए। ❤️",
        "समय लगेगा लेकिन सब ठीक हो जाएगा।"
      ],
      neutral: [
        "आपकी बात समझ में आई।",
        "धन्यवाद, यह जानकारी देने के लिए।",
        "इस बारे में आप क्या सोचते हैं?"
      ]
    },
    hinglish: {
      happy: [
        "Yaar, that's so awesome! Main kitna khush hun! 🎉",
        "Wow bhai, bahut badhiya news hai ye!",
        "Arre wah! Your happiness dekh kar mera bhi mood up ho gaya! 😊"
      ],
      sad: [
        "Yaar, bahut sad feel ho raha hai ye sun kar. I'm here for you.",
        "Bro, tough time hai but sab theek ho jayega. Don't worry ❤️",
        "Take care yaar. Kabhi bhi need ho toh message kar dena."
      ],
      neutral: [
        "Hmm, samajh gaya. Thanks for sharing!",
        "Acha, interesting perspective hai ye.",
        "Cool, tumhara kya opinion hai iske baare mein?"
      ]
    }
  };

  const moodResponses = responses[language]?.[mood] || responses[language]?.neutral || responses.english.neutral;
  return moodResponses.slice(0, 3);
};

const getSongResponses = (mood, sentiment) => {
  const songs = {
    happy: [
      {
        title: "Happy",
        artist: "Pharrell Williams",
        lyrics: "Because I'm happy, clap along if you feel like a room without a roof",
        coverImage: "https://via.placeholder.com/300x300/FFD700/000000?text=Happy",
        spotifyUrl: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH"
      },
      {
        title: "Good as Hell",
        artist: "Lizzo",
        lyrics: "I do my hair toss, check my nails, baby how you feelin'?",
        coverImage: "https://via.placeholder.com/300x300/FF69B4/000000?text=Good+as+Hell",
        spotifyUrl: "https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI"
      }
    ],
    sad: [
      {
        title: "Someone Like You",
        artist: "Adele",
        lyrics: "Never mind, I'll find someone like you, I wish nothing but the best for you too",
        coverImage: "https://via.placeholder.com/300x300/4682B4/FFFFFF?text=Someone+Like+You",
        spotifyUrl: "https://open.spotify.com/track/4y4VO05kYgAA6Qw84sp7Ks"
      }
    ],
    romantic: [
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        lyrics: "Baby, I'm dancing in the dark with you between my arms",
        coverImage: "https://via.placeholder.com/300x300/FF1493/FFFFFF?text=Perfect",
        spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"
      }
    ],
    neutral: [
      {
        title: "Counting Stars",
        artist: "OneRepublic",
        lyrics: "Lately I've been losing sleep, dreaming about the things that we could be",
        coverImage: "https://via.placeholder.com/300x300/32CD32/000000?text=Counting+Stars",
        spotifyUrl: "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1"
      }
    ]
  };

  return songs[mood] || songs.neutral;
};

const getPoetryResponses = (mood, language) => {
  const poetry = {
    english: {
      romantic: [
        {
          text: "You are my sun, my moon, and all my stars.\nIn your eyes, I find my home,\nIn your heart, I find my peace.",
          author: "Anonymous"
        }
      ],
      sad: [
        {
          text: "The wound is the place where the Light enters you.\nEven in darkness, there is hope,\nEven in sorrow, there is beauty.",
          author: "Rumi"
        }
      ],
      happy: [
        {
          text: "Life is a beautiful adventure,\nFilled with moments of pure joy,\nEmbrace each smile, each laugh, each tear.",
          author: "Anonymous"
        }
      ]
    },
    hindi: {
      romantic: [
        {
          text: "तुम हो तो जहां में बहार है,\nतुम्हारे बिना सब बेकार है,\nमोहब्बत में तुम्हारी मेरा क्या कसूर है।",
          author: "अज्ञात"
        }
      ]
    }
  };

  const moodPoetry = poetry[language]?.[mood] || poetry.english[mood] || [];
  return moodPoetry.slice(0, 2);
};

const getTaglineResponses = (mood, language) => {
  const taglines = {
    english: {
      happy: [
        "Life is good! 🌟",
        "Happiness looks good on you!",
        "Keep shining bright! ✨"
      ],
      sad: [
        "This too shall pass 💙",
        "You're stronger than you know",
        "Tomorrow is a new day 🌅"
      ],
      romantic: [
        "Love wins everything ❤️",
        "You're my favorite person 💕",
        "Together is my favorite place to be"
      ],
      neutral: [
        "Keep going! 💪",
        "You've got this!",
        "One step at a time 🚶‍♂️"
      ]
    },
    hinglish: {
      happy: [
        "Life mein sab kuch perfect hai! ✨",
        "Khushi ki ye baat! 🎉",
        "Zindagi beautiful hai yaar! 🌈"
      ],
      sad: [
        "Sab theek ho jayega, tension mat lo 💙",
        "Time heal kar deta hai sab kuch",
        "Strong rehna, main hun na! 💪"
      ]
    }
  };

  const moodTaglines = taglines[language]?.[mood] || taglines.english[mood] || taglines.english.neutral;
  return moodTaglines.slice(0, 3);
};