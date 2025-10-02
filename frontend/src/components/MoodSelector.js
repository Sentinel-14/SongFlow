import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const MoodSelector = ({ onMoodSelect }) => {
  const moods = [
    { 
      name: 'happy', 
      emoji: '😊', 
      label: 'Happy',
      color: '#ffd93d',
      description: 'Upbeat & joyful vibes'
    },
    { 
      name: 'sad', 
      emoji: '😢', 
      label: 'Sad',
      color: '#6c9bd1',
      description: 'Melancholic & emotional'
    },
    { 
      name: 'love', 
      emoji: '❤️', 
      label: 'Love',
      color: '#ff6b6b',
      description: 'Romantic & heartfelt'
    },
    { 
      name: 'party', 
      emoji: '🎉', 
      label: 'Party',
      color: '#51cf66',
      description: 'Energetic & dance-worthy'
    },
    { 
      name: 'motivational', 
      emoji: '💪', 
      label: 'Motivational',
      color: '#ff8c42',
      description: 'Inspiring & empowering'
    }
  ];

  return (
    <div className="mood-selector-container">
      <div className="text-center mb-4">
        <h2 className="mb-3">
          <i className="fas fa-heart me-2"></i>
          How are you feeling?
        </h2>
        <p className="text-muted">
          Choose your mood and discover the perfect song snippet
        </p>
      </div>

      <Row className="g-3">
        {moods.map((mood) => (
          <Col xs={12} sm={6} key={mood.name}>
            <Button
              className="mood-btn w-100 d-flex align-items-center justify-content-start p-3"
              style={{
                backgroundColor: mood.color,
                borderColor: mood.color,
                color: '#fff',
                textAlign: 'left'
              }}
              onClick={() => onMoodSelect(mood.name)}
            >
              <span 
                className="emoji me-3" 
                style={{ fontSize: '2.5rem' }}
              >
                {mood.emoji}
              </span>
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>
                  {mood.label}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                  {mood.description}
                </div>
              </div>
            </Button>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Each mood has carefully curated song snippets with synchronized lyrics
        </small>
      </div>
    </div>
  );
};

export default MoodSelector;