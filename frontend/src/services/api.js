import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || error.response.data?.message || 'Server error';
      throw new Error(message);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error('Something went wrong');
    }
  }
);

// API Functions
export const fetchSnippetsByMood = async (mood, limit = 10) => {
  try {
    const response = await api.get(`/snippets/mood/${mood}?limit=${limit}`);
    return response;
  } catch (error) {
    console.error(`Error fetching ${mood} snippets:`, error);
    throw error;
  }
};

export const fetchRandomSnippet = async () => {
  try {
    const response = await api.get('/snippets/random');
    return response;
  } catch (error) {
    console.error('Error fetching random snippet:', error);
    throw error;
  }
};

export const fetchAllSnippets = async () => {
  try {
    const response = await api.get('/snippets');
    return response;
  } catch (error) {
    console.error('Error fetching all snippets:', error);
    throw error;
  }
};

export const fetchSnippetById = async (id) => {
  try {
    const response = await api.get(`/snippets/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching snippet ${id}:`, error);
    throw error;
  }
};

export const fetchAvailableMoods = async () => {
  try {
    const response = await api.get('/snippets/moods/list');
    return response;
  } catch (error) {
    console.error('Error fetching available moods:', error);
    throw error;
  }
};

// Health check function
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/');
    return response;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};

// Future: Create snippet (for admin functionality)
export const createSnippet = async (snippetData) => {
  try {
    const response = await api.post('/snippets', snippetData);
    return response;
  } catch (error) {
    console.error('Error creating snippet:', error);
    throw error;
  }
};

export default api;