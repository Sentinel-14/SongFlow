import React from 'react';
import { Card, Badge, ProgressBar, Alert } from 'react-bootstrap';
import './ChatAnalyzer.css';

const ChatAnalyzer = ({ analysis }) => {
  const {
    mood,
    sentiment,
    language,
    tone,
    emotions,
    keywords,
    confidence,
    context,
    responseHints
  } = analysis;

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: 'success',
      excited: 'warning',
      sad: 'info',
      angry: 'danger',
      neutral: 'secondary',
      romantic: 'danger',
      friendly: 'success',
      professional: 'primary',
      casual: 'info'
    };
    return moodColors[mood?.toLowerCase()] || 'secondary';
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'fas fa-smile text-success';
      case 'negative': return 'fas fa-frown text-danger';
      case 'neutral': return 'fas fa-meh text-warning';
      default: return 'fas fa-question text-muted';
    }
  };

  const getLanguageFlag = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'english': return '🇺🇸';
      case 'hindi': return '🇮🇳';
      case 'hinglish': return '🇮🇳🇺🇸';
      default: return '🌍';
    }
  };

  return (
    <div className="chat-analyzer fade-in">
      {/* Core Analysis */}
      <div className="analysis-grid mb-3">
        <div className="analysis-item">
          <div className="analysis-label">Mood</div>
          <Badge bg={getMoodColor(mood)} className="analysis-value">
            {mood || 'Unknown'}
          </Badge>
        </div>

        <div className="analysis-item">
          <div className="analysis-label">Sentiment</div>
          <div className="analysis-value">
            <i className={getSentimentIcon(sentiment)} /> {sentiment || 'Unknown'}
          </div>
        </div>

        <div className="analysis-item">
          <div className="analysis-label">Language</div>
          <div className="analysis-value">
            {getLanguageFlag(language)} {language || 'Unknown'}
          </div>
        </div>

        <div className="analysis-item">
          <div className="analysis-label">Tone</div>
          <Badge bg="outline-primary" className="analysis-value">
            {tone || 'Neutral'}
          </Badge>
        </div>
      </div>

      {/* Confidence Score */}
      {confidence && (
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">Analysis Confidence</small>
            <small className="text-muted">{Math.round(confidence * 100)}%</small>
          </div>
          <ProgressBar 
            now={confidence * 100} 
            variant={confidence > 0.8 ? 'success' : confidence > 0.6 ? 'warning' : 'danger'}
            style={{ height: '6px' }}
          />
        </div>
      )}

      {/* Emotions */}
      {emotions && emotions.length > 0 && (
        <div className="mb-3">
          <div className="analysis-label mb-2">Detected Emotions</div>
          <div className="d-flex flex-wrap gap-1">
            {emotions.map((emotion, index) => (
              <Badge 
                key={index}
                bg="outline-secondary" 
                className="emotion-badge"
              >
                {emotion.name} ({Math.round(emotion.score * 100)}%)
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className="mb-3">
          <div className="analysis-label mb-2">Key Words & Phrases</div>
          <div className="d-flex flex-wrap gap-1">
            {keywords.map((keyword, index) => (
              <Badge 
                key={index}
                bg="light" 
                text="dark"
                className="keyword-badge"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Context Understanding */}
      {context && (
        <div className="mb-3">
          <div className="analysis-label mb-2">Context Analysis</div>
          <Alert variant="info" className="context-alert">
            <div className="small">
              <strong>Conversation Type:</strong> {context.type || 'General'}<br />
              <strong>Relationship:</strong> {context.relationship || 'Unknown'}<br />
              <strong>Urgency:</strong> {context.urgency || 'Normal'}
            </div>
          </Alert>
        </div>
      )}

      {/* Response Hints */}
      {responseHints && responseHints.length > 0 && (
        <div className="mb-0">
          <div className="analysis-label mb-2">AI Insights</div>
          <div className="response-hints">
            {responseHints.map((hint, index) => (
              <div key={index} className="hint-item d-flex align-items-start mb-2">
                <i className="fas fa-lightbulb text-warning me-2 mt-1"></i>
                <small className="text-muted">{hint}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAnalyzer;