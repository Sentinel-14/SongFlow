import React, { useState, useRef, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import ShareButton from './ShareButton';

const SnippetCard = ({ snippet, onShare }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef(null);

  // Update current lyric based on audio time
  useEffect(() => {
    if (snippet && snippet.timings) {
      const index = snippet.timings.findIndex((timing, i) => {
        const nextTiming = snippet.timings[i + 1];
        return currentTime >= timing && (nextTiming ? currentTime < nextTiming : true);
      });
      
      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
      }
    }
  }, [currentTime, snippet, currentLyricIndex]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!snippet) return null;

  return (
    <Card className="snippet-card snippet-card-container">
      <Card.Body>
        <Row>
          {/* Album Cover */}
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <img
              src={snippet.coverImage}
              alt={`${snippet.title} by ${snippet.artist}`}
              className="album-cover img-fluid"
              style={{ maxWidth: '200px', width: '100%' }}
            />
          </Col>

          {/* Song Details & Lyrics */}
          <Col xs={12} md={8}>
            {/* Song Info */}
            <div className="mb-3">
              <h3 className="mb-1">{snippet.title}</h3>
              <h5 className="text-muted mb-2">{snippet.artist}</h5>
              <div className="d-flex flex-wrap gap-1 mb-2">
                {snippet.mood.map((mood, index) => (
                  <span 
                    key={index}
                    className="badge bg-primary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>

            {/* Lyrics Display */}
            <div className="lyric-display mb-3">
              <h6 className="text-muted mb-2">
                <i className="fas fa-quote-left me-1"></i>
                Lyrics Preview:
              </h6>
              {snippet.lyricLines.map((line, index) => (
                <div
                  key={index}
                  className={`lyric-line ${index === currentLyricIndex && isPlaying ? 'active' : ''}`}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: index === currentLyricIndex && isPlaying ? 
                      'rgba(102, 126, 234, 0.1)' : 'transparent'
                  }}
                >
                  "{line}"
                </div>
              ))}
            </div>

            {/* Audio Controls */}
            <div className="audio-controls">
              <div className="d-flex align-items-center gap-3 mb-2">
                <Button
                  className="play-btn"
                  onClick={handlePlayPause}
                  disabled={!snippet.audioPreviewUrl}
                >
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </Button>
                
                <div className="flex-grow-1">
                  <div className="audio-progress">
                    <div 
                      className="audio-progress-bar"
                      style={{ 
                        width: `${(currentTime / (snippet.duration || 30)) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between small text-muted">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(snippet.duration || 30)}</span>
                  </div>
                </div>
              </div>

              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={snippet.audioPreviewUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnd}
                onLoadedMetadata={() => setCurrentTime(0)}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline-primary"
                size="sm"
                href={snippet.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-spotify me-1"></i>
                Open in Spotify
              </Button>
              
              <ShareButton snippet={snippet} onShare={onShare} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SnippetCard;